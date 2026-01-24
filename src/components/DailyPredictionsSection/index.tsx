'use client';

import { MatchData } from '@/hooks/useMatchesData';
import { Target, TrendingUp, Trophy, Calendar, Clock, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';

interface DailyPredictionsSectionProps {
    predictions: MatchData[];
    onViewDetails: (prediction: MatchData) => void;
    loading: boolean;
}

export default function DailyPredictionsSection({ predictions, onViewDetails, loading }: DailyPredictionsSectionProps) {
    const [selectedSport, setSelectedSport] = useState<string>('all');

    // 1. Extract Unique Sports
    const sports = useMemo(() => {
        const uniqueSports = new Set(predictions.map(p => p.sport).filter((s): s is string => !!s));
        return Array.from(uniqueSports).sort();
    }, [predictions]);

    // 2. Filter Predictions by Sport
    const filteredRawPredictions = useMemo(() => {
        if (selectedSport === 'all') return predictions;
        return predictions.filter(p => p.sport === selectedSport);
    }, [predictions, selectedSport]);

    // 3. Group Predictions by Match (Home vs Away + Date) to combine strategies
    interface GroupedMatch {
        id: string; // unique key
        match: string;
        sport: string;
        league: string;
        time: string;
        date: string;
        predictions: MatchData[];
    }

    const groupedMatches = useMemo(() => {
        const groups: Record<string, GroupedMatch> = {};

        filteredRawPredictions.forEach(pred => {
            const key = `${pred.date}-${pred.match}`;
            if (!groups[key]) {
                groups[key] = {
                    id: key,
                    match: pred.match,
                    sport: pred.sport || 'Unknown',
                    league: pred.league,
                    time: pred.time,
                    date: pred.date,
                    predictions: []
                };
            }
            groups[key].predictions.push(pred);
        });

        // Convert to array and sort by time if needed, currently order defaults to input order
        return Object.values(groups);
    }, [filteredRawPredictions]);


    if (loading) {
        return (
            <section className="py-20 bg-slate-950">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">Predicciones del Día</h2>
                    <div className="flex justify-center mb-8">
                        <div className="h-1 w-20 bg-emerald-500 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-48 bg-slate-900 rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (predictions.length === 0) {
        return (
            <section className="py-20 bg-slate-950" id="daily-predictions">
                <div className="container mx-auto px-4 max-w-6xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Predicciones del Día</h2>
                    <div className="flex justify-center mb-8">
                        <div className="h-1 w-20 bg-emerald-500 rounded-full"></div>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 flex flex-col items-center">
                        <Trophy size={48} className="text-slate-600 mb-4" />
                        <h3 className="text-xl text-slate-400 font-medium">No hay predicciones pendientes para hoy</h3>
                        <p className="text-slate-500 mt-2">Vuelve más tarde o revisa el historial de resultados.</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-20 bg-slate-950 relative overflow-hidden" id="daily-predictions">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />


            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Predicciones del Día
                    </h2>
                    <div className="flex justify-center mb-6">
                        <div className="h-1 w-20 bg-emerald-500 rounded-full"></div>
                    </div>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Estrategias seleccionadas. Múltiples oportunidades de valor para hoy.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    <button
                        onClick={() => setSelectedSport('all')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSport === 'all'
                                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                            }`}
                    >
                        Todos
                    </button>
                    {sports.map(sport => (
                        <button
                            key={sport}
                            onClick={() => setSelectedSport(sport)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSport === sport
                                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                                }`}
                        >
                            {sport}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedMatches.map((group) => (
                        <div
                            key={group.id}
                            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 flex flex-col"
                        >
                            {/* Match Header */}
                            <div className="bg-slate-800/60 p-4 border-b border-slate-700/50">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                        <Trophy size={14} />
                                        {group.sport}
                                    </span>
                                    <span className="text-slate-500 text-xs font-mono bg-slate-900/50 px-2 py-1 rounded">
                                        {group.time}
                                    </span>
                                </div>
                                <h3 className="text-white font-bold text-lg leading-tight" title={group.match}>
                                    {group.match}
                                </h3>
                                <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                                    <span>{group.league}</span>
                                </div>
                            </div>

                            {/* Predictions List */}
                            <div className="p-4 flex-1 space-y-3">
                                {group.predictions.map((pred, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => onViewDetails(pred)}
                                        className="relative group/item cursor-pointer bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/30 rounded-lg p-3 transition-all"
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <div className="flex items-center gap-2 text-sm font-medium text-emerald-100">
                                                <Target size={14} className="text-emerald-500" />
                                                <span>{pred.strategy}</span>
                                            </div>
                                            <span className="text-emerald-400 font-bold text-sm">{(pred as any).odds || '-'}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-slate-500">
                                            <span>Prob: {pred.prob}</span>
                                            <div className="flex items-center gap-1 text-emerald-500/0 group-hover/item:text-emerald-500 transition-colors">
                                                Ver detalle <ChevronRight size={12} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
