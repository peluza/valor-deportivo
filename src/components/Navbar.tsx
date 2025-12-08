"use client";

import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Inicio", href: "#hero" },
        { label: "Cómo Funciona", href: "#how-it-works" },
        { label: "Resultados", href: "#stats" },
        { label: "Características", href: "#features" },
        { label: "Precios", href: "#cta" },
    ];

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                        ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-3"
                        : "bg-transparent py-6"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <a
                        href="#hero"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("#hero");
                        }}
                        className="flex items-center gap-2 group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Zap className="w-5 h-5 text-black" />
                        </div>
                        <span className="text-xl font-bold text-white">
                            Valor<span className="text-primary">Deportivo</span>
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(link.href);
                                }}
                                className="text-gray-300 hover:text-white transition-colors text-sm font-medium relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* CTA Button Desktop */}
                    <a
                        href="#cta"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("#cta");
                        }}
                        className="hidden lg:flex btn-premium text-sm py-3 px-6"
                    >
                        Únete Ahora
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-white"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(link.href);
                            }}
                            className="text-2xl font-bold text-white hover:text-primary transition-colors"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#cta"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("#cta");
                        }}
                        className="btn-premium mt-6"
                    >
                        Únete Ahora
                    </a>
                </div>
            </div>
        </>
    );
}
