'use client';

import { useEffect, useRef } from 'react';
import { Target, Lock, Zap } from 'lucide-react';
import gsap from 'gsap';

interface HeroSectionProps {
    onOpenModal: () => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (heroRef.current) {
                gsap.fromTo(heroRef.current.children,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>
            </div>

            <div className="container mx-auto text-center max-w-5xl" ref={heroRef}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    IA + Matemáticas en tiempo real
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                    Deja de Apostar por Suerte. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Invierte con Matemáticas.</span>
                </h1>

                <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Nuestro bot analiza miles de eventos usando el <strong>Patrón Strategy</strong>. Solo notificamos cuando la probabilidad matemática supera a la casa de apuestas.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                        href="https://t.me/+D6DgDcdEazY0ZDAx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative px-8 py-4 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2"
                    >
                        <Target className="w-5 h-5" />
                        Probar Alertas Gratis
                    </a>
                    <button
                        onClick={onOpenModal}
                        className="px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-center gap-2"
                    >
                        <Lock className="w-5 h-5 text-slate-400" />
                        Ver Planes Premium
                    </button>
                </div>
            </div>
        </header>
    );
}
