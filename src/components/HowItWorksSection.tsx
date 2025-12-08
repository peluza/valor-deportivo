"use client";

import { useEffect, useRef } from "react";
import { Smartphone, Bell, TrendingUp, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: "01",
        icon: <Smartphone className="w-8 h-8" />,
        title: "Únete al Canal",
        description: "Suscríbete y accede a nuestro canal privado de Telegram donde recibirás todas las señales.",
        color: "primary",
    },
    {
        number: "02",
        icon: <Bell className="w-8 h-8" />,
        title: "Recibe Alertas",
        description: "Nuestro bot IA analiza +1000 partidos diarios y te envía solo las apuestas con mayor valor esperado.",
        color: "secondary",
    },
    {
        number: "03",
        icon: <TrendingUp className="w-8 h-8" />,
        title: "Gana Consistentemente",
        description: "Sigue nuestra gestión de bank inteligente y observa cómo crece tu capital a largo plazo.",
        color: "green",
    },
];

export default function HowItWorksSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".step-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                y: 80,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power3.out",
            });

            gsap.from(".timeline-line", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                scaleX: 0,
                transformOrigin: "left",
                duration: 1.5,
                ease: "power2.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const getColorClasses = (color: string) => {
        switch (color) {
            case "primary":
                return "bg-primary/20 text-primary border-primary/30";
            case "secondary":
                return "bg-secondary/20 text-secondary border-secondary/30";
            case "green":
                return "bg-green-500/20 text-green-400 border-green-500/30";
            default:
                return "bg-white/20 text-white border-white/30";
        }
    };

    return (
        <section
            id="how-it-works"
            ref={sectionRef}
            className="py-24 lg:py-32 px-6 relative overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black -z-10" />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-bold mb-6 border border-secondary/20">
                        PROCESO SIMPLE
                    </span>
                    <h2 className="text-fluid-h2 font-bold mb-6">
                        ¿Cómo <span className="text-gradient-primary">Funciona</span>?
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        En solo 3 pasos estarás recibiendo señales de apuestas de alta calidad directamente en tu teléfono.
                    </p>
                </div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Timeline Line (Desktop) */}
                    <div className="timeline-line hidden lg:block absolute top-[100px] left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-primary via-secondary to-green-400 opacity-30" />

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="step-card relative group"
                            >
                                {/* Card */}
                                <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10">
                                    {/* Step Number */}
                                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-black border-2 border-white/20 flex items-center justify-center">
                                        <span className="text-sm font-bold text-white">{step.number}</span>
                                    </div>

                                    {/* Icon */}
                                    <div
                                        className={`w-16 h-16 rounded-2xl ${getColorClasses(step.color)} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        {step.icon}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-bold text-white mb-4">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {step.description}
                                    </p>

                                    {/* Arrow to next (Desktop) */}
                                    {index < steps.length - 1 && (
                                        <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center text-white/30">
                                            <ArrowRight className="w-6 h-6" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <p className="text-gray-400 mb-6">¿Listo para empezar a ganar?</p>
                    <a
                        href="#cta"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-3 btn-premium"
                    >
                        Comenzar Ahora <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
}
