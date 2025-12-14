'use client';

import PieChart from './PieChart';
import { SportStat } from '@/hooks/useMatchesData';

interface StatsSectionProps {
    stats: SportStat[];
    loading: boolean;
}

export default function StatsSection({ stats, loading }: StatsSectionProps) {
    return (
        <section className="py-20 px-6 bg-slate-900/40">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Rendimiento Histórico</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Transparencia total en nuestros resultados. Tasas de acierto verificadas por deporte.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-10">
                    {stats.map((stat, i) => {
                        // Logic: Green if >= 50%, Red if < 50%
                        const color = stat.rate >= 50 ? "#4ade80" : "#f87171";

                        return (
                            <div key={i} className="flex flex-col items-center bg-slate-900 p-6 rounded-2xl border border-slate-800 w-48 hover:border-slate-600 transition-all">
                                <h3 className="text-lg font-bold text-slate-300 mb-4">{stat.sport}</h3>
                                <PieChart percentage={stat.rate} color={color} />
                                <span className="text-xs text-slate-500 mt-4 font-mono">{stat.total} Picks</span>
                            </div>
                        )
                    })}
                    {loading && <div className="text-slate-500">Cargando estadísticas...</div>}
                </div>
            </div>
        </section>
    );
}
