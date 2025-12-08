"use client";

import { useRef, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const data = [
    { name: "Ene", profit: 1200 },
    { name: "Feb", profit: 1900 },
    { name: "Mar", profit: 1500 },
    { name: "Abr", profit: 2800 },
    { name: "May", profit: 3200 },
    { name: "Jun", profit: 4500 },
    { name: "Jul", profit: 4100 },
    { name: "Ago", profit: 5800 },
];

export default function StatsSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".stat-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="stats" ref={sectionRef} className="py-20 lg:py-28 px-5 sm:px-8 relative">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent -z-10" />

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 lg:mb-16">
                    <span className="inline-block bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-green-500/20">
                        RESULTADOS VERIFICABLES
                    </span>
                    <h2 className="text-fluid-h2 font-bold mb-4">Resultados que <span className="text-gradient-primary">Hablan</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-base lg:text-lg">Nuestro algoritmo aprende y mejora constantemente. Mira el rendimiento acumulado en los últimos meses.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Chart Card */}
                    <div className="lg:col-span-2 glass-card p-6 min-h-[400px] stat-card">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-primary rounded-full"></span>
                            Crecimiento de Bank (Unidades)
                        </h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ccff00" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#ccff00" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                        itemStyle={{ color: '#ccff00' }}
                                    />
                                    <Area type="monotone" dataKey="profit" stroke="#ccff00" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Key Metrics Cards */}
                    <div className="flex flex-col gap-6">
                        <div className="glass-card p-8 flex-1 flex flex-col justify-center stat-card relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-primary/20"></div>
                            <h4 className="text-gray-400 uppercase text-sm font-semibold mb-2">Rentabilidad Promedio</h4>
                            <div className="text-5xl font-bold text-white mb-2">+24.5%</div>
                            <p className="text-green-400 flex items-center gap-1 text-sm">
                                <span className="bg-green-500/20 px-2 py-0.5 rounded text-green-400">Mensual</span>
                                Consistente durante 8 meses
                            </p>
                        </div>

                        <div className="glass-card p-8 flex-1 flex flex-col justify-center stat-card relative overflow-hidden group">
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -mr-10 -mb-10 transition-all group-hover:bg-secondary/20"></div>
                            <h4 className="text-gray-400 uppercase text-sm font-semibold mb-2">Yield Total</h4>
                            <div className="text-5xl font-bold text-white mb-2">18.2%</div>
                            <p className="text-gray-400 text-sm">
                                Retorno sobre inversión superior al mercado
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
