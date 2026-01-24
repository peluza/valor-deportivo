'use client';

import { MatchData } from '@/hooks/useMatchesData';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface HistorySectionProps {
    initialHistory?: MatchData[]; // Could pass full history here
    loading?: boolean;
}

// Mock Data for illustration if hook doesn't provide easy full history list yet
// But we actually have `transparencyMatches` in hook which are history rows.
// We will reuse that structure but passed as props or re-fetched.
// Actually, `useMatchesData` returns `tickerMatches` which are transparency matches.
// We will assume parent passes `tickerMatches` or similar array here.

export default function HistorySection({ initialHistory = [], loading = false }: HistorySectionProps) {
    const [displayCount, setDisplayCount] = useState(6);

    // Filter only COMPLETED matches just in case
    const history = initialHistory.filter(m => m.status === 'WIN' || m.status === 'LOSS' || m.status === 'CANCELLED');
    const visibleHistory = history.slice(0, displayCount);

    if (loading && history.length === 0) return null; // Loading handled by parent skeleton usually or just hide

    return (
        <section className="py-20 bg-slate-900 border-t border-slate-800" id="historial">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Historial Reciente</h2>
                        <p className="text-slate-400">Total transparencia en nuestros resultados.</p>
                    </div>
                    {/* Optional Stats Summary could go here */}
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-12 bg-slate-900/50 p-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800 gap-2">
                        <div className="col-span-2 md:col-span-1">Fecha</div>
                        <div className="col-span-3 md:col-span-2">Deporte</div>
                        <div className="col-span-5 md:col-span-5">Partido</div>
                        <div className="col-span-2 md:col-span-2 text-center">Cuota</div>
                        <div className="col-span-12 md:col-span-2 text-right md:text-center mt-2 md:mt-0">Resultado</div>
                    </div>

                    <div className="divide-y divide-slate-800">
                        {visibleHistory.length > 0 ? (
                            visibleHistory.map((match, idx) => (
                                <div key={idx} className="grid grid-cols-12 p-4 items-center gap-2 hover:bg-slate-900/30 transition-colors">
                                    <div className="col-span-2 md:col-span-1 text-slate-400 text-sm font-mono">
                                        {match.date.split('-').slice(1).join('/')}
                                    </div>
                                    <div className="col-span-3 md:col-span-2 text-white text-sm font-medium truncate">
                                        {match.sport}
                                    </div>
                                    <div className="col-span-5 md:col-span-5 text-slate-300 text-sm truncate" title={match.match}>
                                        {match.match}
                                    </div>
                                    <div className="col-span-2 md:col-span-2 text-center text-emerald-400 font-mono text-sm">
                                        {(match as any).odds || '-'}
                                    </div>
                                    <div className="col-span-12 md:col-span-2 flex justify-end md:justify-center mt-2 md:mt-0">
                                        <StatusBadge status={match.status} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center text-slate-500">
                                No hay historial disponible.
                            </div>
                        )}
                    </div>
                </div>

                {history.length > displayCount && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setDisplayCount(prev => prev + 10)}
                            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                        >
                            Ver más resultados <ArrowRight size={16} />
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (status === 'WIN') {
        return (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                <CheckCircle2 size={12} /> GANADA
            </div>
        )
    }
    if (status === 'LOSS') {
        return (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
                <XCircle size={12} /> PERDIDA
            </div>
        )
    }
    return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-700/50 text-slate-400 text-xs font-bold border border-slate-700">
            PENDING
        </div>
    )
}
