"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, MessageCircle, Send, Sparkles, Users, Clock, Shield } from "lucide-react";

const benefits = [
    "Picks de Fútbol, NBA, NHL, NFL, Tenis y MMA",
    "Notificaciones instantáneas en Telegram",
    "Gestión de Bank personalizada",
    "Historial de resultados verificable",
    "Soporte 24/7 en el canal",
];

const stats = [
    { icon: Users, value: "500+", label: "Miembros activos" },
    { icon: Clock, value: "24/7", label: "Señales diarias" },
    { icon: Shield, value: "72%+", label: "Win Rate histórico" },
];

export default function CTASection() {
    const [selectedPlan, setSelectedPlan] = useState<"monthly" | "quarterly">("monthly");

    const plans = {
        monthly: { price: 29, period: "mes", save: null },
        quarterly: { price: 69, period: "trimestre", save: "Ahorra 20%" },
    };

    const currentPlan = plans[selectedPlan];

    return (
        <section id="cta" className="py-20 lg:py-28 px-5 sm:px-8 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-primary/[0.06] -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 blur-[160px] rounded-full -z-10" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-10 lg:mb-12">
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/15 to-secondary/10 text-primary px-4 py-2.5 rounded-full text-sm font-bold mb-6 border border-primary/25">
                        <Sparkles className="w-4 h-4" />
                        ÚNETE AHORA
                    </span>
                    <h2 className="text-fluid-h2 font-bold mb-4">
                        ¿Listo para <span className="text-gradient-primary">Ganar</span>?
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
                        Únete a cientos de miembros que ya generan ingresos extra con nuestras señales.
                    </p>
                </div>

                {/* Main CTA Card */}
                <div className="max-w-2xl mx-auto">
                    <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/20 rounded-[2rem] p-8 md:p-10 backdrop-blur-xl relative overflow-hidden">
                        {/* Glow Effect */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 blur-[100px] rounded-full" />

                        {/* Plan Toggle */}
                        <div className="flex justify-center mb-8">
                            <div className="inline-flex bg-black/50 rounded-full p-1 border border-white/10">
                                <button
                                    onClick={() => setSelectedPlan("monthly")}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedPlan === "monthly"
                                        ? "bg-primary text-black"
                                        : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    Mensual
                                </button>
                                <button
                                    onClick={() => setSelectedPlan("quarterly")}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${selectedPlan === "quarterly"
                                        ? "bg-primary text-black"
                                        : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    Trimestral
                                    {currentPlan.save && selectedPlan !== "quarterly" && (
                                        <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs">
                                            -20%
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Price Display */}
                        <div className="text-center mb-8">
                            <div className="flex items-end justify-center gap-2">
                                <span className="text-6xl md:text-7xl font-bold text-white">
                                    ${currentPlan.price}
                                </span>
                                <span className="text-xl text-gray-400 mb-3">
                                    /{currentPlan.period}
                                </span>
                            </div>
                            {currentPlan.save && (
                                <span className="inline-block mt-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                                    {currentPlan.save}
                                </span>
                            )}
                        </div>

                        {/* Benefits List */}
                        <ul className="space-y-4 mb-8">
                            {benefits.map((benefit, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span className="text-gray-200">{benefit}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Buttons */}
                        <div className="space-y-4">
                            <a
                                href="https://t.me/valordeportivo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full btn-premium flex justify-center items-center gap-3 group py-4 text-lg"
                            >
                                <Send className="w-5 h-5" />
                                Unirme via Telegram
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="https://wa.me/1234567890?text=Hola,%20quiero%20información%20sobre%20Valor%20Deportivo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all font-medium flex justify-center items-center gap-3"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Contactar por WhatsApp
                            </a>
                        </div>

                        {/* Trust Note */}
                        <p className="text-center text-gray-500 text-sm mt-6">
                            Sin permanencia. Cancela cuando quieras.
                        </p>
                    </div>
                </div>

                {/* Mini Stats */}
                <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                            <p className="text-xs text-gray-500">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
