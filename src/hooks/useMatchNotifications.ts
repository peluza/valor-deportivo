
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { Bet } from './useRealtimeBets'

export function useMatchNotifications(bets: Bet[], onOpenDetails?: (bet: any) => void) {
    const notifiedIds = useRef<Set<number>>(new Set())

    useEffect(() => {
        const checkMatches = () => {
            const now = new Date()

            bets.forEach((bet) => {
                if (notifiedIds.current.has(bet.id)) return

                // Parse Match Time (Assuming Date=YYYY-MM-DD and Time=HH:MM in UTC or ISO)
                // If the DB stores strict UTC strings:
                const matchDateTimeStr = `${bet.date}T${bet.time}:00Z`
                const matchDate = new Date(matchDateTimeStr)

                // Diff in minutes
                const diffMs = matchDate.getTime() - now.getTime()
                const diffMins = diffMs / 1000 / 60

                // Notify if between 0 and 30 mins
                if (diffMins > 0 && diffMins <= 30) {
                    // Trigger Notification
                    toast(`🔥 Pick Cercano: ${bet.home_team} vs ${bet.away_team}`, {
                        description: `Estrategia: ${bet.strategy} | Cuota: ${bet.odds} | Inicia en ${Math.ceil(diffMins)} min`,
                        duration: 10000, // 10 seconds
                        action: {
                            label: 'Ver',
                            onClick: () => {
                                console.log('View match', bet.id);
                                if (onOpenDetails) onOpenDetails(bet);
                            }
                        }
                    })

                    // Mark as notified locally
                    notifiedIds.current.add(bet.id)
                }
            })
        }

        // Check immediately and then every minute
        checkMatches()
        const interval = setInterval(checkMatches, 60000)

        return () => clearInterval(interval)
    }, [bets])
}
