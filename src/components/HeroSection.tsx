"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Play, Shield, Clock, CheckCircle, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const visualsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(".hero-text-element", {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.08,
            }).from(
                visualsRef.current,
                {
                    x: 60,
                    opacity: 0,
                    duration: 1.2,
                    scale: 0.95,
                },
                "-=0.8"
            );

            gsap.to(visualsRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
                },
                y: 100,
                scale: 1.02,
            });

            gsap.to(".floating-card", {
                y: "-=10",
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: {
                    each: 0.5,
                    from: "random",
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between px-5 sm:px-8 lg:px-16 xl:px-24 pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-background to-background -z-10" />
            <div className="absolute top-[-30%] left-[-15%] w-[70%] h-[70%] bg-primary/10 blur-[180px] rounded-full" />
            <div className="absolute bottom-[-25%] right-[-15%] w-[50%] h-[50%] bg-secondary/10 blur-[150px] rounded-full" />

            {/* Left Column: Typography & CTA */}
            <div ref={textRef} className="w-full lg:w-[55%] z-10 flex flex-col gap-5 lg:gap-6 mb-10 lg:mb-0">
                {/* Badge */}
                <div className="hero-text-element">
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/15 to-secondary/10 border border-primary/25 text-primary px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider">
                        <Sparkles className="w-4 h-4" />
                        Impulsado por Inteligencia Artificial
                    </span>
                </div>

                {/* Headline */}
                <h1 className="hero-text-element text-fluid-h1 text-white font-display">
                    Gana Dinero{" "}
                    <span className="text-gradient-primary">Apostando</span>
                    <br />
                    <span className="text-gradient-primary">con Inteligencia</span>
                </h1>

                {/* Subheadline */}
                <p className="hero-text-element text-fluid-p text-gray-400 max-w-lg lg:max-w-xl leading-relaxed">
                    Recibe señales de apuestas <strong className="text-white font-medium">analizadas por IA</strong> directamente en tu Telegram.
                    Gestión de riesgo incluida para maximizar ganancias a largo plazo.
                </p>

                {/* Trust Badges */}
                <div className="hero-text-element flex flex-wrap gap-3 sm:gap-5 text-xs sm:text-sm text-gray-400">
                    <span className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full border border-white/10">
                        <Shield className="w-4 h-4 text-primary" />
                        Sin permanencia
                    </span>
                    <span className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full border border-white/10">
                        <Clock className="w-4 h-4 text-secondary" />
                        Alertas 24/7
                    </span>
                    <span className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full border border-white/10">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Verificable
                    </span>
                </div>

                {/* CTAs */}
                <div className="hero-text-element flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
                    <button
                        onClick={() => scrollToSection("cta")}
                        className="btn-premium flex items-center justify-center gap-3 text-black w-full sm:w-auto"
                    >
                        Comenzar Ahora <ArrowRight className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scrollToSection("how-it-works")}
                        className="flex items-center justify-center gap-3 px-6 py-4 rounded-full border border-white/15 text-white hover:bg-white/5 hover:border-white/25 transition-all font-medium w-full sm:w-auto"
                    >
                        <Play className="w-4 h-4" /> Cómo Funciona
                    </button>
                </div>

                {/* Mini Stats */}
                <div className="hero-text-element grid grid-cols-3 gap-4 sm:gap-8 mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-white/10">
                    <div className="text-center sm:text-left">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">+72%</h3>
                        <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mt-1">
                            Win Rate
                        </p>
                    </div>
                    <div className="text-center sm:text-left">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">6</h3>
                        <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mt-1">
                            Deportes
                        </p>
                    </div>
                    <div className="text-center sm:text-left">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">24/7</h3>
                        <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mt-1">
                            Monitoreo
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Column: Visual */}
            <div
                ref={visualsRef}
                className="w-full lg:w-[45%] relative h-[350px] sm:h-[400px] lg:h-[600px] flex items-center justify-center"
            >
                {/* Main Visual */}
                <div className="relative w-full h-full max-w-[450px] lg:max-w-[500px] max-h-[450px] lg:max-h-[500px]">
                    <Image
                        src="/assets/hero-3d-new.png"
                        alt="AI Sports Analytics - Sistema de análisis deportivo"
                        fill
                        className="object-contain drop-shadow-[0_20px_60px_rgba(200,230,0,0.15)]"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* Floating Cards */}
                <div className="floating-card absolute top-8 sm:top-12 right-2 sm:right-6 lg:right-4 bento-card !p-3 sm:!p-4 !bg-black/80 border-green-500/30">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                        </div>
                        <div>
                            <p className="text-[10px] sm:text-xs text-gray-400">Señal Ganadora</p>
                            <p className="text-xs sm:text-sm font-bold text-green-400">+2.15 Units</p>
                        </div>
                    </div>
                </div>

                <div className="floating-card absolute bottom-24 sm:bottom-28 left-0 sm:left-2 lg:left-4 bento-card !p-3 sm:!p-4 !bg-black/80 border-secondary/30">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                            <span className="text-base sm:text-lg">⚽</span>
                        </div>
                        <div>
                            <p className="text-[10px] sm:text-xs text-gray-400">Live Signal</p>
                            <p className="text-xs sm:text-sm font-bold text-white">Real Madrid ML</p>
                        </div>
                    </div>
                </div>

                <div className="floating-card absolute bottom-4 sm:bottom-6 right-4 sm:right-10 lg:right-12 bento-card !p-2 sm:!p-3 !bg-black/80 border-white/15">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-lg sm:text-xl">🎾</span>
                        <span className="text-lg sm:text-xl">🏀</span>
                        <span className="text-lg sm:text-xl">🏈</span>
                        <span className="text-lg sm:text-xl">🥊</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
