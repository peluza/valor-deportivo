import { Target } from 'lucide-react';

export default function CTASection() {
    return (
        <section className="py-20 px-6 text-center">
            <div className="container mx-auto max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Listo para ganar con datos?</h2>
                <p className="text-xl text-slate-400 mb-10">Únete al grupo de Telegram ahora. Las predicciones se envían automáticamente 30 minutos antes de cada evento.</p>
                <a
                    href="https://t.me/+D6DgDcdEazY0ZDAx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-emerald-400 text-slate-950 font-extrabold text-lg rounded-full hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-1"
                >
                    <Target className="w-6 h-6" />
                    PROBAR ALERTAS GRATIS
                </a>
                <p className="mt-6 text-sm text-slate-600">Canal demo con alertas codificadas. Hazte Premium para señales completas.</p>
            </div>
        </section>
    );
}
