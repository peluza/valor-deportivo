'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Target, Trophy, ShieldCheck, Zap, Activity, Lock, ChevronRight, CheckCircle2, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin outside of component to avoid re-registration issues
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Mock Data based on the README strategies and "filtered_matches" sheet concept
  const liveMatches = [
    { sport: "🏒 Hockey", match: "Bruins vs Leafs", pick: "Bruins (OT)", prob: "82%", status: "WIN", strategy: "Zona de Oro" },
    { sport: "⚽ Fútbol", match: "Real Madrid vs Betis", pick: "Local", prob: "65%", status: "WIN", strategy: "1X2 Value" },
    { sport: "🎾 Tenis", match: "Alcaraz vs Sinner", pick: "Alcaraz", prob: "74%", status: "PENDING", strategy: "Rango 70-76" },
    { sport: "🏀 NBA", match: "Lakers vs Celtics", pick: "Celtics", prob: "72%", status: "WIN", strategy: "Elite Basket" },
    { sport: "🥊 MMA", match: "Pereira vs Hill", pick: "Pereira", prob: "68%", status: "WIN", strategy: "Fight Night" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      if (heroRef.current) {
        gsap.fromTo(heroRef.current.children,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
        );
      }

      // Features Cards Animation
      const cards = gsap.utils.toArray('.strategy-card') as HTMLElement[];
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1
          }
        );
      });

      // Stats Table Animation
      if (statsRef.current) {
        gsap.fromTo(statsRef.current,
          { scale: 0.9, opacity: 0 },
          {
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
            },
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
          }
        );
      }
    });

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="text-emerald-400 w-8 h-8" />
            <span className="text-xl font-bold tracking-tighter">VALOR <span className="text-emerald-400">DEPORTIVO</span></span>
          </div>
          <a
            href="https://t.me/TuGrupoDeTelegram"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-full transition-all border border-slate-700 hover:border-emerald-500/50"
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            Unirse Gratis
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>
        </div>

        <div className="container mx-auto text-center max-w-5xl" ref={heroRef}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            IA + Matemáticas en tiempo real
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Deja de Apostar por Suerte. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Invierte con Matemáticas.</span>
          </h1>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Nuestro bot analiza miles de eventos usando el <strong>Patrón Strategy</strong>. Solo notificamos cuando la probabilidad matemática supera a la casa de apuestas.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://t.me/TuGrupoDeTelegram"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2"
            >
              <Target className="w-5 h-5" />
              Entrar al Canal VIP Gratis
            </a>
            <button
              onClick={openModal}
              className="px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5 text-slate-400" />
              Ver Planes Premium
            </button>
          </div>
        </div>
      </header>

      {/* Live Ticker Section */}
      <div className="w-full bg-slate-900/50 border-y border-slate-800 overflow-hidden py-3">
        <div className="flex animate-marquee whitespace-nowrap gap-8 text-sm font-mono text-slate-300">
          {[...liveMatches, ...liveMatches].map((match, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-emerald-400">●</span>
              <span className="font-bold text-white">{match.sport}</span>: {match.match}
              <span className="bg-slate-800 px-2 py-0.5 rounded text-xs border border-slate-700">Prob: {match.prob}</span>
              {match.status === 'WIN' && <span className="text-emerald-400 font-bold">GANADA ✅</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Value Proposition / Strategies */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Estrategias Modulares</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              No disparamos a todo. Nuestro código filtra el ruido y busca exclusivamente el valor matemático en rangos probados.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" ref={featuresRef}>
            {/* Strategy: Hockey */}
            <div className="strategy-card p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] group">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-950 transition-colors">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Hockey Ice Cold</h3>
              <p className="text-slate-400 mb-4 text-sm">Detectamos la "Zona de Oro". Favoritos sólidos con probabilidad calculada del <strong className="text-emerald-400">80-90%</strong>.</p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Alta fiabilidad</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Evitamos trampas de varianza</li>
              </ul>
            </div>

            {/* Strategy: Tennis */}
            <div className="strategy-card p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] group">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-950 transition-colors">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Tenis Sniper</h3>
              <p className="text-slate-400 mb-4 text-sm">Algoritmo calibrado para el rango <strong className="text-blue-400">70-76%</strong>. Donde los favoritos cumplen sin pagar cuotas ridículas.</p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Mercado Ganador del Partido</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Filtrado de valor excesivo</li>
              </ul>
            </div>

            {/* Strategy: NFL */}
            <div className="strategy-card p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] group">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-950 transition-colors">
                <Trophy className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">NFL Visitor Edge</h3>
              <p className="text-slate-400 mb-4 text-sm">Explotamos la ineficiencia del mercado en favoritos visitantes con probabilidad <strong className="text-orange-400">70-85%</strong>.</p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-600" /> Stake Alto en visitantes fuertes</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-600" /> Análisis de Moneyline</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Live Data / Verification Section */}
      <section className="py-24 bg-slate-900/30 px-6 border-y border-slate-900">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Transparencia Total: <br /> Hoja de Cálculo en Tiempo Real</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Cada predicción se registra automáticamente. Nuestro bot realiza el ciclo completo: Scraping, Filtrado por Estrategia, Notificación y Verificación de Resultados. Nada se borra.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-emerald-900/30 rounded border border-emerald-500/20 mt-1">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Infraestructura Anti-Bloqueo</h4>
                  <p className="text-sm text-slate-500">Operamos con red Dockerizada + Proxies residenciales para obtener las cuotas reales antes que nadie.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-900/30 rounded border border-blue-500/20 mt-1">
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Reportes Diarios</h4>
                  <p className="text-sm text-slate-500">Automatización completa. Estadísticas y rendimientos enviados directamente a tu móvil.</p>
                </div>
              </div>
            </div>

            {/* <div className="mt-10">
              <a
                href="https://docs.google.com/spreadsheets/d/1MMfzYOEgcbYY-nEGiiXha8cFlBMX-Cv64DLGnoMFSYk/edit?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-2 group"
              >
                Ver Hoja de Cálculo Oficial
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div> */}
          </div>

          <div className="lg:w-1/2 w-full" ref={statsRef}>
            <div className="bg-slate-950 rounded-xl border border-slate-800 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"></div>
              <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs font-mono text-slate-500">filtered_matches.csv</span>
              </div>
              <div className="p-6 overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-900/50">
                    <tr>
                      <th className="px-4 py-3 rounded-l-lg">Deporte</th>
                      <th className="px-4 py-3">Partido</th>
                      <th className="px-4 py-3">Pick</th>
                      <th className="px-4 py-3">Prob. IA</th>
                      <th className="px-4 py-3 rounded-r-lg">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {liveMatches.map((match, i) => (
                      <tr key={i} className="hover:bg-slate-900/30 transition-colors">
                        <td className="px-4 py-4 font-medium text-slate-300">{match.sport}</td>
                        <td className="px-4 py-4 text-slate-400">{match.match}</td>
                        <td className="px-4 py-4 font-bold text-white">{match.pick}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${parseInt(match.prob) > 75 ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-blue-950 text-blue-400 border border-blue-500/30'
                            }`}>
                            {match.prob}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          {match.status === 'WIN' ? (
                            <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Ganada</span>
                          ) : (
                            <span className="text-slate-500 flex items-center gap-1"><Activity className="w-3 h-3" /> En Juego</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Listo para ganar con datos?</h2>
          <p className="text-xl text-slate-400 mb-10">Únete al grupo de Telegram ahora. Las predicciones se envían automáticamente 30 minutos antes de cada evento.</p>
          <a
            href="https://t.me/TuGrupoDeTelegram"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-emerald-400 text-slate-950 font-extrabold text-lg rounded-full hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-1"
          >
            <Target className="w-6 h-6" />
            UNIRME AL GRUPO VIP
          </a>
          <p className="mt-6 text-sm text-slate-600">Acceso gratuito por tiempo limitado.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Activity className="text-emerald-600 w-6 h-6" />
            <span className="text-lg font-bold text-slate-500">Valor Deportivo Bot</span>
          </div>
          <p className="text-slate-600 text-sm">© 2024 Valor Deportivo. Apuesta responsablemente (+18).</p>
        </div>
      </footer>

      {/* Membership Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full relative shadow-2xl transform animate-in zoom-in-95 duration-200">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Membresía Premium</h3>
              <p className="text-slate-400 mb-6">
                Estamos finalizando la integración de pagos automatizados para el acceso a las señales exclusivas de Hockey y NFL "Stake Alto".
              </p>

              <div className="bg-slate-950 rounded-lg p-4 mb-6 border border-slate-800 text-left">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-300">Progreso del desarrollo</span>
                  <span className="text-xs text-emerald-400 font-mono">92%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full w-[92%] relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_1s_infinite]"></div>
                  </div>
                </div>
              </div>

              <button
                onClick={closeModal}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors"
              >
                Entendido, esperaré
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
