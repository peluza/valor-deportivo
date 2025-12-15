'use client';

import { useEffect, useRef } from 'react';
import { Calendar, DollarSign, Target, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MonthlyProfitabilityData } from '@/hooks/useMatchesData';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface MonthlyProfitabilitySectionProps {
    data: MonthlyProfitabilityData | null;
    loading: boolean;
}

export default function MonthlyProfitabilitySection({ data, loading }: MonthlyProfitabilitySectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.monthly-card') as HTMLElement[];
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

    // Format date range
    const formatDateRange = (startDate: string, endDate: string) => {
        const start = new Date(startDate + 'T12:00:00');
        const end = new Date(endDate + 'T12:00:00');
        const formatOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
        return `${start.toLocaleDateString('es-ES', formatOptions)} - ${end.toLocaleDateString('es-ES', formatOptions)}`;
    };

    if (loading) {
        return (
            <section className="py-16 px-6 relative" ref={sectionRef}>
                <div className="container mx-auto text-center">
                    <div className="animate-pulse text-slate-500">Cargando análisis mensual...</div>
                </div>
            </section>
        );
    }

    if (!data || data.sports.length === 0) {
        return (
            <section className="py-16 px-6 relative" ref={sectionRef}>
                <div className="container mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">Rendimiento por Deporte</h2>
                        <p className="text-slate-400 max-w-xl mx-auto text-sm">
                            No hay datos suficientes para el análisis mensual.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    const isPositive = data.totals.netProfit >= 0;

    return (
        <section className="py-16 px-6 relative" ref={sectionRef}>
            <div className="container mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/50 border border-blue-500/30 text-blue-400 text-xs font-medium mb-4">
                        <Calendar className="w-3.5 h-3.5" />
                        Backtesting Mensual ({data.daysWithData} días)
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Rendimiento por Deporte</h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-sm">
                        Análisis del <span className="text-blue-400 font-semibold">{formatDateRange(data.startDate, data.endDate)}</span>.
                        Identifica qué deportes generan mayor rentabilidad.
                    </p>
                </div>

                {/* Summary Cards - Compact Version */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                    <div className="monthly-card bg-slate-900 border border-slate-800 rounded-xl p-4 text-center hover:border-blue-500/30 transition-all">
                        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <Target className="w-5 h-5 text-blue-400" />
                        </div>
                        <p className="text-slate-500 text-xs uppercase tracking-wide mb-0.5">Apuestas</p>
                        <p className="text-2xl font-bold text-white">{data.totals.totalBets}</p>
                    </div>

                    <div className="monthly-card bg-slate-900 border border-slate-800 rounded-xl p-4 text-center hover:border-blue-500/30 transition-all">
                        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <DollarSign className="w-5 h-5 text-yellow-400" />
                        </div>
                        <p className="text-slate-500 text-xs uppercase tracking-wide mb-0.5">Inversión</p>
                        <p className="text-2xl font-bold text-white">{formatCurrency(data.totals.totalWagered)}</p>
                    </div>

                    <div className="monthly-card bg-slate-900 border border-slate-800 rounded-xl p-4 text-center hover:border-blue-500/30 transition-all">
                        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-3">
                            {isPositive ? (
                                <TrendingUp className="w-5 h-5 text-emerald-400" />
                            ) : (
                                <TrendingDown className="w-5 h-5 text-red-400" />
                            )}
                        </div>
                        <p className="text-slate-500 text-xs uppercase tracking-wide mb-0.5">Beneficio Neto</p>
                        <p className={`text-2xl font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                            {isPositive ? '+' : ''}{formatCurrency(data.totals.netProfit)}
                        </p>
                    </div>

                    <div className="monthly-card bg-slate-900 border border-slate-800 rounded-xl p-4 text-center hover:border-blue-500/30 transition-all">
                        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <BarChart3 className={`w-5 h-5 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`} />
                        </div>
                        <p className="text-slate-500 text-xs uppercase tracking-wide mb-0.5">Yield / ROI</p>
                        <p className={`text-2xl font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                            {isPositive ? '+' : ''}{data.totals.yield}%
                        </p>
                    </div>
                </div>

                {/* Sport Performance Table */}
                <div className="monthly-card bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-slate-800 bg-slate-900/80">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <span className="w-1.5 h-5 bg-blue-500 rounded-full"></span>
                            Desglose por Deporte
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-950/50">
                                <tr>
                                    <th className="px-5 py-3 text-left">Deporte</th>
                                    <th className="px-5 py-3 text-center">Apuestas</th>
                                    <th className="px-5 py-3 text-center">Ganadas / Perdidas</th>
                                    <th className="px-5 py-3 text-right">Inversión</th>
                                    <th className="px-5 py-3 text-right">Beneficio Neto</th>
                                    <th className="px-5 py-3 text-right">ROI</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {data.sports.map((sport, i) => {
                                    const sportPositive = sport.netProfit >= 0;
                                    return (
                                        <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="px-5 py-3.5 font-medium text-white">{sport.sport}</td>
                                            <td className="px-5 py-3.5 text-center text-slate-300">{sport.totalBets}</td>
                                            <td className="px-5 py-3.5 text-center">
                                                <span className="text-emerald-400 font-medium">{sport.wins}</span>
                                                <span className="text-slate-600 mx-1">/</span>
                                                <span className="text-red-400 font-medium">{sport.losses}</span>
                                            </td>
                                            <td className="px-5 py-3.5 text-right text-slate-300">{formatCurrency(sport.totalWagered)}</td>
                                            <td className={`px-5 py-3.5 text-right font-bold ${sportPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                                                {sportPositive ? '+' : ''}{formatCurrency(sport.netProfit)}
                                            </td>
                                            <td className="px-5 py-3.5 text-right">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold ${sportPositive
                                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                    }`}>
                                                    {sportPositive ? '+' : ''}{sport.yield}%
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot className="bg-slate-950/80 border-t-2 border-blue-500/30">
                                <tr>
                                    <td className="px-5 py-3.5 font-bold text-white uppercase">Total</td>
                                    <td className="px-5 py-3.5 text-center font-bold text-white">{data.totals.totalBets}</td>
                                    <td className="px-5 py-3.5 text-center font-bold text-slate-400">—</td>
                                    <td className="px-5 py-3.5 text-right font-bold text-white">{formatCurrency(data.totals.totalWagered)}</td>
                                    <td className={`px-5 py-3.5 text-right font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {isPositive ? '+' : ''}{formatCurrency(data.totals.netProfit)}
                                    </td>
                                    <td className="px-5 py-3.5 text-right">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold ${isPositive
                                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                            }`}>
                                            {isPositive ? '+' : ''}{data.totals.yield}%
                                        </span>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Disclaimer */}
                <p className="text-center text-slate-600 text-xs mt-6 max-w-xl mx-auto">
                    * Simulación basada en inversión fija de $1,000 USD por operación. Datos de los últimos {data.daysWithData} días con actividad registrada.
                </p>
            </div>
        </section>
    );
}
