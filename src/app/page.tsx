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
import DailyPredictionsSection from '@/components/DailyPredictionsSection';
import HistorySection from '@/components/HistorySection';
import AdBanner from '@/components/AdBanner';
import PredictionDetailsModal from '@/components/PredictionDetailsModal';

export default function LandingPage() {
  const { liveMatches, tickerMatches, sportStats, profitability, monthlyProfitability, loading, dailyPredictions, todayBets } = useMatchesData();

  // Modal State
  const [selectedPrediction, setSelectedPrediction] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Notifications
  const handleOpenDetails = (prediction: any) => {
    setSelectedPrediction(prediction);
    setIsDetailsOpen(true);
  };

  // We need to call useMatchNotifications here to pass the handler
  // Note: We need to import useMatchNotifications from hook file in this file first
  // But wait, hooks rules. I need to import it properly.
  // The hook is inside useMatchesData file? No, separate file.

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden">
      <Navbar />
      <HeroSection onOpenModal={() => {
        // Scroll to Daily Predictions instead of Modal
        document.getElementById('daily-predictions')?.scrollIntoView({ behavior: 'smooth' });
      }} />
      <LiveTicker matches={tickerMatches} />

      <DailyPredictionsSection
        predictions={dailyPredictions}
        onViewDetails={handleOpenDetails}
        loading={loading}
      />

      <div className="container mx-auto px-4 py-8">
        <AdBanner className="max-w-4xl mx-auto" />
      </div>

      <StatsSection stats={sportStats} loading={loading} />
      <ProfitabilitySection data={profitability} loading={loading} />
      <MonthlyProfitabilitySection data={monthlyProfitability} loading={loading} />

      <HistorySection initialHistory={liveMatches} loading={loading} />
      {/* <TransparencySection matches={liveMatches} loading={loading} /> Replaced by HistorySection essentially but kept Logic clean */}

      <CTASection />
      <Footer />

      <PredictionDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        prediction={selectedPrediction}
      />

      <NotificationHandler bets={todayBets} onOpenDetails={handleOpenDetails} />
    </div>
  );
}

// Helper to call hook conditionally or just keep it clean
import { useMatchNotifications } from '@/hooks/useMatchNotifications';

function NotificationHandler({ bets, onOpenDetails }: { bets: any[], onOpenDetails: (bet: any) => void }) {
  useMatchNotifications(bets, onOpenDetails);
  return null;
}

