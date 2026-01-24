import { Target } from 'lucide-react';

export default function CTASection() {
    return (
        <section className="py-20 px-6 text-center">
            <div className="container mx-auto max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Listo para ganar con datos?</h2>
                <p className="text-xl text-slate-400 mb-10">Accede a todas nuestras predicciones de forma gratuita y comprueba la eficacia de nuestro algoritmo.</p>
                <button
                    onClick={() => document.getElementById('daily-predictions')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-emerald-400 text-slate-950 font-extrabold text-lg rounded-full hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-1"
                >
                    <Target className="w-6 h-6" />
                    VER PREDICCIONES
                </button>
                <p className="mt-6 text-sm text-slate-600">Actualizamos diariamente con nuevas oportunidades de valor.</p>
            </div>
        </section>
    );
}
