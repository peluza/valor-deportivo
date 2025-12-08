"use client";

import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        name: "Carlos M.",
        role: "Trader Deportivo",
        avatar: "CM",
        rating: 5,
        text: "Llevaba años apostando por mi cuenta sin consistencia. Con las señales del bot llevo 3 meses en positivo. La gestión de bank es clave.",
        profit: "+340 units",
    },
    {
        name: "Laura G.",
        role: "Inversora",
        avatar: "LG",
        rating: 5,
        text: "Al principio era escéptica, pero los resultados hablan. El bot me ahorra horas de análisis y las alertas llegan justo a tiempo.",
        profit: "+180 units",
    },
    {
        name: "Miguel Á.",
        role: "Apostador",
        avatar: "MA",
        rating: 5,
        text: "Lo mejor es que explican el por qué de cada apuesta. No es solo copy-paste, aprendes mientras ganas.",
        profit: "+520 units",
    },
    {
        name: "Andrea S.",
        role: "Estudiante",
        avatar: "AS",
        rating: 4,
        text: "Empecé con un bank pequeño y lo he triplicado en 4 meses. El soporte responde rápido cualquier duda.",
        profit: "+95 units",
    },
];

export default function TestimonialsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".testimonial-header", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section
            ref={sectionRef}
            className="py-24 lg:py-32 px-6 relative overflow-hidden bg-black/50"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10" />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="testimonial-header text-center mb-16">
                    <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6 border border-primary/20">
                        TESTIMONIOS
                    </span>
                    <h2 className="text-fluid-h2 font-bold mb-6">
                        Lo Que Dicen <span className="text-gradient-primary">Nuestros Usuarios</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Cientos de personas ya están generando ingresos extra con nuestras señales.
                    </p>
                </div>

                {/* Testimonials Grid - Desktop */}
                <div className="hidden lg:grid grid-cols-2 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
                        >
                            {/* Quote Icon */}
                            <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5 group-hover:text-primary/10 transition-colors" />

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < testimonial.rating
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-600"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                                "{testimonial.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-black font-bold">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">{testimonial.name}</p>
                                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-green-400">{testimonial.profit}</p>
                                    <p className="text-xs text-gray-500">Beneficio</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Testimonials Carousel - Mobile */}
                <div className="lg:hidden relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="w-full flex-shrink-0 px-2">
                                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                                        <div className="flex gap-1 mb-4">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < testimonial.rating
                                                            ? "text-yellow-400 fill-yellow-400"
                                                            : "text-gray-600"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-gray-300 mb-6">"{testimonial.text}"</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-black font-bold text-sm">
                                                    {testimonial.avatar}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white text-sm">{testimonial.name}</p>
                                                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                                                </div>
                                            </div>
                                            <p className="text-xl font-bold text-green-400">{testimonial.profit}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={prevSlide}
                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-4">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-primary w-6" : "bg-white/30"
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
