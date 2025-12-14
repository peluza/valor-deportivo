'use client';

import { X, Star, Zap, CheckCircle2 } from 'lucide-react';

interface MembershipModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MembershipModal({ isOpen, onClose }: MembershipModalProps) {
    if (!isOpen) return null;

    const features = [
        "Acceso a todas las señales Premium",
        "Alertas de Hockey y NFL 'Stake Alto'",
        "Prioridad en notificaciones",
        "Soporte prioritario por Telegram",
        "Estadísticas exclusivas diarias"
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full relative shadow-2xl transform animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs font-medium mb-4">
                        <Zap className="w-3 h-3" />
                        Único Plan
                    </div>

                    {/* Header */}
                    <h3 className="text-2xl font-bold text-white mb-2">Membresía Premium</h3>

                    {/* Price */}
                    <div className="my-6">
                        <div className="flex items-center justify-center gap-2">
                            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                            <span className="text-5xl font-extrabold text-white">1,000</span>
                        </div>
                        <p className="text-slate-400 mt-1">Telegram Stars / mes</p>
                    </div>

                    {/* Features */}
                    <div className="bg-slate-950 rounded-lg p-4 mb-6 border border-slate-800 text-left">
                        <ul className="space-y-3">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA Button */}
                    <a
                        href="https://t.me/+D6DgDcdEazY0ZDAx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-400 text-slate-950 font-bold rounded-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all transform hover:scale-[1.02]"
                    >
                        Suscribirme Ahora
                    </a>

                    <p className="text-slate-600 text-xs mt-4">
                        El pago se realiza directamente en Telegram
                    </p>
                </div>
            </div>
        </div>
    );
}
