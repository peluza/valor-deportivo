'use client';

import { CheckCircle2, X, Activity } from 'lucide-react';
import { MatchData } from '@/hooks/useMatchesData';

interface MatchesTableProps {
    matches: MatchData[];
    loading: boolean;
}

export default function MatchesTable({ matches, loading }: MatchesTableProps) {
    if (loading) {
        return (
            <tr><td colSpan={6} className="text-center py-6 text-slate-500">Cargando datos en tiempo real...</td></tr>
        );
    }

    return (
        <>
            {matches.map((match, i) => {
                let StatusBadge;
                const statusUpper = match.status?.toUpperCase() || '';

                if (statusUpper === 'WIN') {
                    StatusBadge = <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Ganada</span>;
                } else if (statusUpper === 'LOSS') {
                    StatusBadge = <span className="text-red-400 flex items-center gap-1"><X className="w-3 h-3" /> Perdida</span>;
                } else if (statusUpper === 'CANCELLED') {
                    StatusBadge = <span className="text-orange-400 flex items-center gap-1"><Activity className="w-3 h-3" /> Cancelada</span>;
                } else {
                    const cleanTime = (match.time || '00:00').trim();
                    const formattedTime = cleanTime.includes(':') && cleanTime.length < 5 ? `0${cleanTime}` : cleanTime;
                    const matchDateTime = new Date(`${match.date}T${formattedTime}`);
                    const now = new Date();
                    const isFuture = matchDateTime > now;

                    if (isFuture) {
                        StatusBadge = <span className="text-blue-400 flex items-center gap-1"><Activity className="w-3 h-3" /> Programado</span>;
                    } else {
                        StatusBadge = <span className="text-slate-400 flex items-center gap-1"><Activity className="w-3 h-3" /> Pendiente</span>;
                    }
                }

                return (
                    <tr key={i} className="hover:bg-slate-900/30 transition-colors">
                        <td className="px-4 py-4 font-medium text-slate-300">{match.sport}</td>
                        <td className="px-4 py-4 text-xs text-slate-500">
                            {match.date} <br /> <span className="text-[10px] opacity-70">{match.time}</span>
                        </td>
                        <td className="px-4 py-4 text-slate-400">{match.match}</td>
                        <td className="px-4 py-4 font-bold text-white">{match.pick}</td>
                        <td className="px-4 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${parseInt(match.prob) > 75 ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-blue-950 text-blue-400 border border-blue-500/30'}`}>
                                {match.prob}
                            </span>
                        </td>
                        <td className="px-4 py-4">
                            {StatusBadge}
                        </td>
                    </tr>
                );
            })}
        </>
    );
}
