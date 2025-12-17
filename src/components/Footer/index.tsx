import { Activity } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-slate-900 bg-slate-950 py-12 px-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <Activity className="text-emerald-600 w-6 h-6" />
                    <span className="text-lg font-bold text-slate-500">Valor Deportivo Bot</span>
                </div>
                <p className="text-slate-600 text-sm">© 2025 Valor Deportivo. Apuesta responsablemente (+18).</p>
            </div>
        </footer>
    );
}
