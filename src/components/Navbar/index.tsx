'use client';

import { Activity, Zap } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Activity className="text-emerald-400 w-8 h-8" />
                    <span className="text-xl font-bold tracking-tighter">VALOR <span className="text-emerald-400">DEPORTIVO</span></span>
                </div>
                <div className="hidden md:flex items-center gap-2 bg-slate-900/50 border border-emerald-500/30 px-4 py-2 rounded-full select-none">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-mono text-xs font-bold tracking-wider">BETA GRATUITA</span>
                </div>
            </div>
        </nav>
    );
}
