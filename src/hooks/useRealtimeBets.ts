
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export interface Bet {
    id: number
    sport: string
    league: string
    home_team: string
    away_team: string
    date: string
    time: string
    strategy: string
    prob_1: number
    odds: number
    status: string
    created_at: string
}

export function useRealtimeBets() {
    const [bets, setBets] = useState<Bet[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // 1. Fetch initial bets for today (or recent)
        // We filter by date >= today to show upcoming or active
        // But user said "bets of the day".
        const fetchBets = async () => {
            const today = new Date().toISOString().split('T')[0]

            const { data, error } = await supabase
                .from('filtered_matches')
                .select('*')
                .eq('date', today)
                .order('time', { ascending: true })

            if (error) {
                console.error('Error fetching bets:', error)
            } else {
                setBets(data || [])
            }
            setLoading(false)
        }

        fetchBets()

        // 2. Subscribe to new bets (Realtime)
        const channel = supabase
            .channel('public:filtered_matches')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'filtered_matches',
                },
                (payload) => {
                    console.log('New bet received!', payload)
                    const newBet = payload.new as Bet

                    // Only add if it belongs to today (optional, but good for consistency)
                    const today = new Date().toISOString().split('T')[0]
                    if (newBet.date === today) {
                        setBets((prev) => [...prev, newBet].sort((a, b) => a.time.localeCompare(b.time)))
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    return { bets, loading }
}
