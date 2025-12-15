'use client';

import { useEffect, useRef } from 'react';
import { TrendingUp, DollarSign, Target, BarChart3, CheckCircle2, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProfitabilityData } from '@/hooks/useMatchesData';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ProfitabilitySectionProps {
    data: ProfitabilityData | null;
    loading: boolean;
}

export default function ProfitabilitySection({ data, loading }: ProfitabilitySectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.profit-card') as HTMLElement[];
            cards.forEach((card, i) => {
                gsap.fromTo(card,
                    { y: 50, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                        },
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        delay: i * 0.1
                    }
                );
            });
        });

        return () => ctx.revert();
    }, []);

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Format date
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr + 'T12:00:00');
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        });
    };

    if (loading) {
        return (
            <section className="py-24 px-6 relative" ref={sectionRef}>
                <div className="container mx-auto text-center">
                    <div className="animate-pulse text-slate-500">Cargando simulación...</div>
                </div>
            </section>
        );
    }

    if (!data || data.totalBets === 0) {
        return (
            <section className="py-24 px-6 relative" ref={sectionRef}>
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Simulación de Rentabilidad</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            No hay datos disponibles para la simulación de rentabilidad.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    const isPositive = data.netProfit >= 0;

    return (
        <section className="py-24 px-6 relative" ref={sectionRef}>
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-6">
                        <BarChart3 className="w-4 h-4" />
                        Backtesting del último día publicado
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Simulación de Rentabilidad</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Análisis detallado del rendimiento del <span className="text-emerald-400 font-semibold capitalize">{formatDate(data.date)}</span>.
                        Resultados verificables y transparentes.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    <div className="profit-card bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center hover:border-emerald-500/30 transition-all">
                        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Target className="w-6 h-6 text-blue-400" />
                        </div>
                        <p className="text-slate-500 text-sm uppercase tracking-wide mb-1">Apuestas</p>
                        <p className="text-3xl font-bold text-white">{data.totalBets}</p>
                    </div>

                    <div className="profit-card bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center hover:border-emerald-500/30 transition-all">
                        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <DollarSign className="w-6 h-6 text-yellow-400" />
                        </div>
                        <p className="text-slate-500 text-sm uppercase tracking-wide mb-1">Inversión</p>
                        <p className="text-3xl font-bold text-white">{formatCurrency(data.totalWagered)}</p>
                    </div>

                    <div className="profit-card bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center hover:border-emerald-500/30 transition-all">
                        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <TrendingUp className={`w-6 h-6 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`} />
                        </div>
                        <p className="text-slate-500 text-sm uppercase tracking-wide mb-1">Beneficio Neto</p>
                        <p className={`text-3xl font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                            {isPositive ? '+' : ''}{formatCurrency(data.netProfit)}
                        </p>
                    </div>

                    <div className="profit-card bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center hover:border-emerald-500/30 transition-all">
                        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <BarChart3 className={`w-6 h-6 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`} />
                        </div>
                        <p className="text-slate-500 text-sm uppercase tracking-wide mb-1">Yield / ROI</p>
                        <p className={`text-3xl font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                            {isPositive ? '+' : ''}{data.yield}%
                        </p>
                    </div>
                </div>

                {/* Detailed Table */}
                <div className="profit-card bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-slate-800 bg-slate-900/80">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
                            Detalle de Operaciones
                        </h3>
                    </div>
                    <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                        <table className="w-full text-sm">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-950/50">
                                <tr>
                                    <th className="px-6 py-4 text-left">Deporte</th>
                                    <th className="px-6 py-4 text-left">Partido</th>
                                    <th className="px-6 py-4 text-center">Cuota</th>
                                    <th className="px-6 py-4 text-center">Resultado</th>
                                    <th className="px-6 py-4 text-right">Inversión</th>
                                    <th className="px-6 py-4 text-right">Retorno</th>
                                    <th className="px-6 py-4 text-right">Ganancia</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {data.matches.map((match, i) => (
                                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-300">{match.sport}</td>
                                        <td className="px-6 py-4 text-slate-400 max-w-[200px] truncate">{match.match}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="bg-slate-800 px-3 py-1 rounded text-xs font-mono border border-slate-700">
                                                {match.odds.toFixed(2)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {match.result === 'GANADA' ? (
                                                <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                                                    <CheckCircle2 className="w-4 h-4" /> Ganada
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-red-400 font-semibold">
                                                    <X className="w-4 h-4" /> Perdida
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right text-slate-400">{formatCurrency(match.investment)}</td>
                                        <td className="px-6 py-4 text-right text-slate-300">{formatCurrency(match.returnAmount)}</td>
                                        <td className={`px-6 py-4 text-right font-bold ${match.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {match.profit >= 0 ? '+' : ''}{formatCurrency(match.profit)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-slate-950/80 border-t-2 border-emerald-500/30">
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-right font-bold text-white uppercase">Total</td>
                                    <td className="px-6 py-4 text-right font-bold text-white">{formatCurrency(data.totalWagered)}</td>
                                    <td className="px-6 py-4 text-right font-bold text-white">{formatCurrency(data.totalReturn)}</td>
                                    <td className={`px-6 py-4 text-right font-bold text-lg ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {isPositive ? '+' : ''}{formatCurrency(data.netProfit)}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Disclaimer */}
                <p className="text-center text-slate-600 text-xs mt-8 max-w-2xl mx-auto">
                    * Simulación basada en inversión fija de $1,000 USD por operación. Los resultados pasados no garantizan rendimientos futuros. Apuesta responsablemente.
                </p>
            </div>
        </section>
    );
}
