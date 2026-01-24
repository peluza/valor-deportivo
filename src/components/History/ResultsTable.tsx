'use client';

import { CheckCircle2, X as XIcon, Activity } from 'lucide-react';
import { getSportDisplayName } from '@/hooks/useMatchesData';
import { Match, getStrategyName } from './constants';
import Pagination from './Pagination';

interface ResultsTableProps {
    matches: Match[]; // Only the sliced matches
    loading: boolean;
    totalItems: number; // For pagination
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (p: number) => void;
}

export default function ResultsTable({
    matches,
    loading,
    totalItems,
    currentPage,
    itemsPerPage,
    onPageChange
}: ResultsTableProps) {

    // Derived helpers
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentStart = (currentPage - 1) * itemsPerPage + 1;
    const currentEnd = Math.min(currentPage * itemsPerPage, totalItems);

    const getPickDisplay = (match: Match) => {
        const s = match.strategy;
        if (s.includes('HOME')) return match.home_team;
        if (s.includes('AWAY')) return match.away_team;
        return getStrategyName(s);
    };

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden shadow-xl ring-1 ring-white/5">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950/50 border-b border-slate-800 text-xs uppercase text-slate-400 font-semibold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Deporte / Liga</th>
                            <th className="px-6 py-4">Fecha</th>
                            <th className="px-6 py-4">Evento</th>
                            <th className="px-6 py-4">Predicción</th>
                            <th className="px-6 py-4">Probabilidad</th>
                            <th className="px-6 py-4">Cuota</th>
                            <th className="px-6 py-4 text-right">Resultado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {loading ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-slate-500 animate-pulse">
                                    Cargando historial completo...
                                </td>
                            </tr>
                        ) : matches.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                                    No se encontraron predicciones con los filtros seleccionados.
                                </td>
                            </tr>
                        ) : (
                            matches.map((match) => {
                                const status = match.status?.toUpperCase();
                                return (
                                    <tr key={match.id} className="hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-slate-200">{getSportDisplayName(match.sport)}</span>
                                                <span className="text-[10px] text-slate-500 uppercase tracking-wide">{match.league || 'General'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                                            {match.date} <br />
                                            <span className="text-xs opacity-50">{match.time}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-slate-300 font-medium">{match.home_team}</div>
                                            <div className="text-slate-500 text-xs">vs {match.away_team}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                {getPickDisplay(match)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 font-mono">
                                            {match.prob_1 ? `${match.prob_1}%` : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 font-mono">
                                            {match.odds?.toFixed(2) || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {status === 'WON' && <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-xs"><CheckCircle2 className="w-4 h-4" /> GANADA</span>}
                                            {status === 'LOST' && <span className="inline-flex items-center gap-1.5 text-red-400 font-bold text-xs"><XIcon className="w-4 h-4" /> PERDIDA</span>}
                                            {status === 'PENDING' && <span className="inline-flex items-center gap-1.5 text-slate-500 font-bold text-xs"><Activity className="w-4 h-4" /> PENDIENTE</span>}
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {!loading && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    currentStart={currentStart}
                    currentEnd={currentEnd}
                    totalItems={totalItems}
                />
            )}
        </div>
    );
}
