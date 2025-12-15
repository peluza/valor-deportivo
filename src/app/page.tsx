'use client';

import { useState } from 'react';
import { useMatchesData } from '@/hooks/useMatchesData';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LiveTicker from '@/components/LiveTicker';
import StatsSection from '@/components/StatsSection';
import ProfitabilitySection from '@/components/ProfitabilitySection';
import MonthlyProfitabilitySection from '@/components/MonthlyProfitabilitySection';
import TransparencySection from '@/components/TransparencySection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import MembershipModal from '@/components/MembershipModal';

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { liveMatches, tickerMatches, sportStats, profitability, monthlyProfitability, loading } = useMatchesData();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden">
      <Navbar />
      <HeroSection onOpenModal={openModal} />
      <LiveTicker matches={tickerMatches} />
      <StatsSection stats={sportStats} loading={loading} />
      <ProfitabilitySection data={profitability} loading={loading} />
      <MonthlyProfitabilitySection data={monthlyProfitability} loading={loading} />
      <TransparencySection matches={liveMatches} loading={loading} />
      <CTASection />
      <Footer />
      <MembershipModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

