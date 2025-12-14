'use client';

import { useEffect, useRef } from 'react';
import { Sparkles, Brain, Shield, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MatchesTable from './MatchesTable';
import { MatchData } from '@/hooks/useMatchesData';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface TransparencySectionProps {
    matches: MatchData[];
    loading: boolean;
}

export default function TransparencySection({ matches, loading }: TransparencySectionProps) {
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (statsRef.current) {
                gsap.fromTo(statsRef.current,
                    { scale: 0.9, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: "top 80%",
                        },
                        scale: 1,
                        opacity: 1,
                        duration: 0.8,
                        ease: "back.out(1.7)"
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="py-24 bg-slate-900/30 px-6 border-y border-slate-900">
            <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Resultados Verificables <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Sin Trucos, Solo Datos</span></h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Cada predicción queda registrada de forma inmutable. Mostramos los resultados tal como sucedieron — las victorias y las derrotas. Transparencia absoluta.
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-emerald-900/30 rounded border border-emerald-500/20 mt-1">
                                <Brain className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Algoritmo Propietario</h4>
                                <p className="text-sm text-slate-500">Nuestro sistema analiza cientos de variables en milisegundos para identificar oportunidades de valor.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-blue-900/30 rounded border border-blue-500/20 mt-1">
                                <TrendingUp className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Alertas Instantáneas</h4>
                                <p className="text-sm text-slate-500">Recibe notificaciones directamente en Telegram cuando detectamos una apuesta con valor matemático.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/2 w-full" ref={statsRef}>
                    <div className="bg-slate-950 rounded-xl border border-slate-800 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"></div>
                        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-emerald-400" />
                                picks_del_dia.live
                            </span>
                        </div>
                        <div className="p-6 overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-900/50">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg">Deporte</th>
                                        <th className="px-4 py-3">Fecha</th>
                                        <th className="px-4 py-3">Partido</th>
                                        <th className="px-4 py-3">Pick</th>
                                        <th className="px-4 py-3">Confianza</th>
                                        <th className="px-4 py-3 rounded-r-lg">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    <MatchesTable matches={matches} loading={loading} />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
