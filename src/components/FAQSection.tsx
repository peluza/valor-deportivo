"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        question: "¿Cuánto necesito para empezar a apostar?",
        answer: "Recomendamos empezar con un bank mínimo de $100-200 USD para poder aplicar correctamente la gestión de riesgo y ver resultados consistentes. Sin embargo, puedes comenzar con menos y ajustar las unidades proporcionalmente.",
    },
    {
        question: "¿Cómo recibo las señales?",
        answer: "Las señales se envían directamente a nuestro canal privado de Telegram. Recibirás una notificación en tiempo real cada vez que detectemos una apuesta con valor. Cada señal incluye el evento, el pick recomendado, la cuota y las unidades a apostar.",
    },
    {
        question: "¿Garantizan ganancias?",
        answer: "No existe garantía de ganancias en las apuestas deportivas. Lo que ofrecemos es un análisis estadístico riguroso que identifica apuestas con expectativa positiva a largo plazo. Nuestro histórico muestra resultados positivos consistentes, pero el pasado no garantiza el futuro.",
    },
    {
        question: "¿Puedo cancelar cuando quiera?",
        answer: "Sí, puedes cancelar tu suscripción en cualquier momento. No hay permanencia ni penalizaciones. Tu acceso continuará activo hasta el final del período pagado.",
    },
    {
        question: "¿Es legal apostar en mi país?",
        answer: "La legalidad de las apuestas deportivas varía según el país y región. Es tu responsabilidad verificar las leyes locales antes de participar. Nuestro servicio proporciona análisis y recomendaciones, el uso que hagas de ellas es bajo tu responsabilidad.",
    },
    {
        question: "¿Qué deportes cubren?",
        answer: "Actualmente cubrimos: Fútbol (ligas principales de Europa y América), Tenis (ATP, WTA), Basketball (NBA), Hockey (NHL), MMA/UFC, y Fútbol Americano (NFL). Nuestro bot analiza +1000 partidos diarios.",
    },
    {
        question: "¿Cómo funciona la gestión de bank?",
        answer: "Cada señal incluye una recomendación de unidades a apostar (1-5 units). Esto se basa en la confianza del pick y el nivel de valor detectado. Siguiendo estas recomendaciones, proteges tu capital en las malas rachas y maximizas en las buenas.",
    },
];

export default function FAQSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".faq-item", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section
            ref={sectionRef}
            className="py-24 lg:py-32 px-6 relative overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent -z-10" />

            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 border border-white/10">
                        FAQ
                    </span>
                    <h2 className="text-fluid-h2 font-bold mb-6">
                        Preguntas <span className="text-gradient-primary">Frecuentes</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Todo lo que necesitas saber antes de empezar.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="faq-item rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300 hover:border-white/20"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-bold text-white pr-4">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96" : "max-h-0"
                                    }`}
                            >
                                <p className="px-6 pb-6 text-gray-400 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Help */}
                <div className="text-center mt-12 p-8 rounded-3xl bg-white/5 border border-white/10">
                    <p className="text-gray-400 mb-4">¿Tienes más preguntas?</p>
                    <a
                        href="https://t.me/valordeportivo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                    >
                        Contáctanos en Telegram →
                    </a>
                </div>
            </div>
        </section>
    );
}
