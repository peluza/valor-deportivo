
'use client'

import React from 'react'
import { useRealtimeBets } from '@/hooks/useRealtimeBets'
import { useMatchNotifications } from '@/hooks/useMatchNotifications'
import { Trophy, TrendingUp, Clock, Zap } from 'lucide-react'

// Premium Card Component
const BetCard = ({ bet }: { bet: any }) => (
    <div className="relative group bg-zinc-900/50 hover:bg-zinc-800/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/10">
        <div className="absolute top-0 right-0 p-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${bet.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500' :
                bet.status === 'WON' ? 'bg-green-500/10 text-green-500' :
                    'bg-red-500/10 text-red-500'
                }`}>
                {bet.status}
            </span>
        </div>

        <div className="flex items-center gap-2 mb-4 text-zinc-400 text-sm font-medium uppercase tracking-wider">
            <Trophy size={14} className="text-zinc-500" />
            {bet.league}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Teams */}
            <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                    {bet.home_team} <span className="text-zinc-500 text-base font-normal">vs</span> {bet.away_team}
                </h3>
                <div className="flex items-center gap-3 text-zinc-400 text-sm">
                    <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {bet.time} UTC
                    </span>
                    <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                    <span>{bet.date}</span>
                </div>
            </div>

            {/* Stats / Strategy */}
            <div className="flex flex-col items-end gap-2">
                <div className="bg-white/5 px-4 py-2 rounded-xl flex flex-col items-end border border-white/5">
                    <span className="text-xs text-zinc-500 font-medium">ESTRATEGIA</span>
                    <span className="text-indigo-300 font-bold flex items-center gap-1">
                        <Zap size={14} /> {bet.strategy}
                    </span>
                </div>

                <div className="flex gap-3">
                    <div className="text-right">
                        <div className="text-xs text-zinc-500">PROB.</div>
                        <div className="text-green-400 font-bold text-lg">{bet.prob_1?.toFixed(1)}%</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-zinc-500">CUOTA</div>
                        <div className="text-white font-bold text-lg">{bet.odds}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default function BetsFeed() {
    const { bets, loading } = useRealtimeBets()

    // Activate notifications
    useMatchNotifications(bets)

    if (loading) {
        return (
            <div className="w-full flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        )
    }

    // Group by Sport or Strategy? For now specific simple list.
    return (
        <div className="w-full max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <TrendingUp className="text-indigo-500" />
                    Live Feed
                </h2>
                <div className="bg-zinc-800 px-3 py-1 rounded-full text-xs text-zinc-400">
                    {bets.length} Picks Today
                </div>
            </div>

            {bets.length === 0 ? (
                <div className="text-center py-20 text-zinc-500">
                    No bets available for today yet. Waiting for 5:00 AM ingestion...
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {bets.map((bet) => (
                        <BetCard key={bet.id} bet={bet} />
                    ))}
                </div>
            )}
        </div>
    )
}
