"use client";

import { Zap, Send, Mail, Instagram, Twitter } from "lucide-react";

const footerLinks = {
    producto: [
        { label: "Características", href: "#features" },
        { label: "Precios", href: "#cta" },
        { label: "Resultados", href: "#stats" },
        { label: "FAQ", href: "#faq" },
    ],
    legal: [
        { label: "Términos de Servicio", href: "#" },
        { label: "Política de Privacidad", href: "#" },
        { label: "Aviso Legal", href: "#" },
    ],
    social: [
        { label: "Telegram", href: "https://t.me/valordeportivo", icon: Send },
        { label: "Twitter", href: "#", icon: Twitter },
        { label: "Instagram", href: "#", icon: Instagram },
    ],
};

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (href: string) => {
        if (href.startsWith("#")) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <footer className="pt-20 pb-8 px-6 border-t border-white/10 bg-black">
            <div className="max-w-6xl mx-auto">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <a href="#hero" className="flex items-center gap-2 mb-6 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Zap className="w-5 h-5 text-black" />
                            </div>
                            <span className="text-xl font-bold text-white">
                                Valor<span className="text-primary">Deportivo</span>
                            </span>
                        </a>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Señales de apuestas deportivas impulsadas por inteligencia artificial.
                            Análisis profesional directamente en tu Telegram.
                        </p>
                        <div className="flex gap-3">
                            {footerLinks.social.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">
                            Producto
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.producto.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(link.href);
                                        }}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">
                            Legal
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">
                            Contacto
                        </h4>
                        <div className="space-y-4">
                            <a
                                href="https://t.me/valordeportivo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors text-sm"
                            >
                                <Send className="w-4 h-4" />
                                @valordeportivo
                            </a>
                            <a
                                href="mailto:contacto@valordeportivo.com"
                                className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors text-sm"
                            >
                                <Mail className="w-4 h-4" />
                                contacto@valordeportivo.com
                            </a>
                        </div>

                        {/* CTA Mini */}
                        <a
                            href="#cta"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection("#cta");
                            }}
                            className="inline-block mt-6 px-6 py-3 rounded-full bg-primary text-black font-bold text-sm hover:bg-primary/90 transition-colors"
                        >
                            Comenzar Ahora
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm text-center md:text-left">
                            © {currentYear} Valor Deportivo. Todos los derechos reservados.
                        </p>
                        <p className="text-gray-600 text-xs text-center md:text-right max-w-md">
                            Las apuestas deportivas implican riesgo. Apuesta solo lo que puedas permitirte perder.
                            +18 años. Juega con responsabilidad.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
