'use client';

import { CheckCircle2, X, Activity } from 'lucide-react';
import { MatchData } from '@/hooks/useMatchesData';

interface LiveTickerProps {
    matches: MatchData[];
}

export default function LiveTicker({ matches }: LiveTickerProps) {
    const tickerData = matches.length > 0
        ? [...matches, ...matches]
        : Array(10).fill({ sport: "Cargando...", match: "...", prob: "...", status: "..." });

    return (
        <div className="w-full bg-slate-900/50 border-y border-slate-800 overflow-hidden py-3">
            <div className="flex animate-marquee whitespace-nowrap gap-8 text-sm font-mono text-slate-300">
                {tickerData.map((match, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="text-emerald-400">●</span>
                        <span className="font-bold text-white">{match.sport}</span>: {match.match}
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-xs border border-slate-700">Prob: {match.prob}</span>

                        {(match.status === 'WIN') && <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> GANADA</span>}
                        {(match.status === 'LOSS') && <span className="text-red-400 font-bold flex items-center gap-1"><X className="w-3 h-3" /> PERDIDA</span>}
                        {(match.status === 'CANCELLED') && <span className="text-slate-400 font-bold flex items-center gap-1"><Activity className="w-3 h-3" /> CANCELADA</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}
