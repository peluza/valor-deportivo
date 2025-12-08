"use client";

import { useEffect, useRef } from "react";
import { Zap, Brain, Shield, Clock, Smartphone, LineChart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        title: "Señales en Tiempo Real",
        description: "Alertas inmediatas vía Telegram. Sin retrasos, sin oportunidades perdidas.",
        icon: <Zap className="w-6 h-6 text-primary" />,
        className: "md:col-span-2",
    },
    {
        title: "Análisis Profundo con IA",
        description: "Algoritmos que procesan +5000 puntos de datos por partido para encontrar valor real.",
        icon: <Brain className="w-6 h-6 text-secondary" />,
        className: "md:col-span-1",
    },
    {
        title: "Bankroll Inteligente",
        description: "Gestión de riesgo automática. Te decimos exactamente cuánto apostar para maximizar el crecimiento a largo plazo.",
        icon: <LineChart className="w-6 h-6 text-accent" />,
        className: "md:col-span-1",
    },
    {
        title: "Cobertura 24/7",
        description: "El mercado nunca duerme, nosotros tampoco. Fútbol, Tenis, Basket y más.",
        icon: <Clock className="w-6 h-6 text-white" />,
        className: "md:col-span-2",
    },
];

export default function FeatureSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".bento-item", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                y: 100,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
                ease: "power4.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="features" ref={sectionRef} className="py-20 lg:py-28 px-5 sm:px-8 relative overflow-hidden">
            <div className="max-w-6xl mx-auto z-10 relative">
                <div className="text-center mb-12 lg:mb-16">
                    <span className="inline-block bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-purple-500/20">
                        CARACTERÍSTICAS
                    </span>
                    <h2 className="text-fluid-h2 font-bold mb-4">
                        Poder <span className="text-gradient-primary">Institucional</span>
                        <br className="hidden sm:block" /> en tus Manos
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-base lg:text-lg">
                        No es suerte, es tecnología. Accede a herramientas de análisis profesional.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 auto-rows-[minmax(220px,auto)]">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={cn(
                                "bento-item group relative p-6 lg:p-8 rounded-2xl lg:rounded-3xl border border-white/8 bg-gradient-to-br from-white/[0.04] to-transparent overflow-hidden hover:border-white/15 transition-all duration-500",
                                feature.className
                            )}
                        >
                            {/* Hover Glow Effect */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[inherit] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

                            <div className="h-full flex flex-col justify-between relative z-10">
                                <div className="mb-6 w-12 h-12 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">{feature.title}</h3>
                                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>

                            {/* Decorative Abstract BG Image (Subtle) */}
                            <div className="absolute right-[-20%] bottom-[-20%] w-[80%] h-[80%] opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                                <img src="/assets/feature-bg.png" alt="" className="w-full h-full object-contain" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
