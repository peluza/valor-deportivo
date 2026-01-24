'use client';

import { useEffect, useState } from 'react';
import { X, Trophy, Target, TrendingUp, Clock, Calendar } from 'lucide-react';
import { MatchData } from '@/hooks/useMatchesData';
import AdBanner from '@/components/AdBanner';

interface PredictionDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    prediction: MatchData | null;
}

export default function PredictionDetailsModal({ isOpen, onClose, prediction }: PredictionDetailsModalProps) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShow(true);
            document.body.style.overflow = 'hidden';
        } else {
            setTimeout(() => setShow(false), 300); // Wait for exit animation
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!show && !isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className={`relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>

                {/* Header */}
                <div className="relative h-32 bg-gradient-to-br from-emerald-600/20 via-slate-900 to-slate-900 p-6 flex flex-col justify-end">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-full text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-1">
                        <Trophy size={14} />
                        <span>{prediction?.sport}</span>
                        <span className="text-slate-600">•</span>
                        <span>{prediction?.league}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white leading-tight">
                        {prediction?.match}
                    </h2>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">

                    {/* Main Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                            <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                                <Target size={16} className="text-emerald-500" />
                                <span>Estrategia</span>
                            </div>
                            <div className="font-semibold text-white">{prediction?.strategy}</div>
                            <div className="text-xs text-slate-500 mt-1">Pick Recomendado</div>
                        </div>

                        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                            <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                                <TrendingUp size={16} className="text-emerald-500" />
                                <span>Cuota / Prob.</span>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-emerald-400">{(prediction as any)?.odds || '-'}</span>
                                <span className="text-sm text-slate-500 mb-1">{prediction?.prob}</span>
                            </div>
                        </div>
                    </div>

                    {/* Time Info */}
                    <div className="flex items-center justify-between text-sm text-slate-400 bg-slate-800/30 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{prediction?.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>{prediction?.time}</span>
                        </div>
                    </div>

                    {/* Ad Banner Inside Modal */}
                    <AdBanner format="rectangle" />
                </div>

                {/* Footer */}
                <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-center">
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-white text-sm transition-colors"
                    >
                        Cerrar Detalles
                    </button>
                </div>
            </div>
        </div>
    );
}
