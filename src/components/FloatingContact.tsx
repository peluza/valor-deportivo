"use client";

import { Send, MessageCircle } from "lucide-react";

export default function FloatingContact() {
    return (
        <div className="floating-contact">
            <a
                href="https://t.me/valordeportivo"
                target="_blank"
                rel="noopener noreferrer"
                className="floating-btn telegram"
                aria-label="Contactar por Telegram"
            >
                <Send className="w-6 h-6" />
            </a>
            <a
                href="https://wa.me/1234567890?text=Hola,%20quiero%20información%20sobre%20Valor%20Deportivo"
                target="_blank"
                rel="noopener noreferrer"
                className="floating-btn whatsapp"
                aria-label="Contactar por WhatsApp"
            >
                <MessageCircle className="w-6 h-6" />
            </a>
        </div>
    );
}
