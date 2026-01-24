
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Bet } from './useRealtimeBets';
import { useMatchNotifications } from './useMatchNotifications';

export interface MatchData {
  originalSport: string;
  date: string;
  time: string;
  match: string;
  pick: string;
  prob: string;
  status: string;
  strategy: string;
  league: string;
  sport?: string;
}

export interface SportStat {
  sport: string;
  rate: number;
  total: number;
}

export interface ProfitabilityData {
  date: string;
  totalBets: number;
  totalWagered: number;
  totalReturn: number;
  netProfit: number;
  yield: number;
  matches: {
    sport: string;
    match: string;
    strategy: string;
    odds: number;
    result: string;
    investment: number;
    returnAmount: number;
    profit: number;
  }[];
}

export interface SportProfitability {
  sport: string;
  totalBets: number;
  totalWagered: number;
  totalReturn: number;
  netProfit: number;
  yield: number;
  wins: number;
  losses: number;
}

export interface MonthlyProfitabilityData {
  startDate: string;
  endDate: string;
  daysWithData: number;
  sports: SportProfitability[];
  totals: {
    totalBets: number;
    totalWagered: number;
    totalReturn: number;
    netProfit: number;
    yield: number;
  };
}

// Get display name for sport
export const getSportDisplayName = (sport: string): string => {
  const s = sport.toLowerCase();
  if (s === 'futbol' || s === 'football') return "⚽ Fútbol";
  if (s === 'hockey') return "🏒 Hockey";
  if (s === 'tenis' || s === 'tennis') return "🎾 Tenis";
  if (s === 'nba' || s === 'basket' || s === 'basketball') return "🏀 Basket";
  if (s === 'mma') return "🥊 MMA";
  if (s === 'nfl' || s === 'american_football') return "🏈 NFL";
  return sport;
};

export function useMatchesData() {
  const [liveMatches, setLiveMatches] = useState<MatchData[]>([]);
  const [tickerMatches, setTickerMatches] = useState<MatchData[]>([]);
  const [sportStats, setSportStats] = useState<SportStat[]>([]);
  const [profitability, setProfitability] = useState<ProfitabilityData | null>(null);
  const [monthlyProfitability, setMonthlyProfitability] = useState<MonthlyProfitabilityData | null>(null);
  const [loading, setLoading] = useState(true);

  // Internal state for notifications usage
  const [todayBets, setTodayBets] = useState<Bet[]>([]);

  // Activate notifications
  // Activate notifications - MOVED TO COMPONENT
  // useMatchNotifications(todayBets);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const today = new Date().toISOString().split('T')[0];

        // 1. Fetch ALL data (Filtered Matches)
        // Optimization: In real prod, splitting active vs history queries is better.
        // For now, we fetch all to calculate stats client-side same as before.
        const { data: allRows, error } = await supabase
          .from('filtered_matches')
          .select('*')
          .order('date', { ascending: false });

        if (error) throw error;
        if (!allRows) return;

        // --- Process Live/Today Matches ---
        const todayRows = allRows.filter((r) => r.date === today && r.status === 'PENDING');
        setTodayBets(todayRows as unknown as Bet[]);

        // --- History Rows (Completed) ---
        // Exclude today from history stats generally, or include if status is WON/LOST
        const historyRows = allRows.filter((r) => r.status === 'WON' || r.status === 'LOST');

        // Find latest date with history
        const uniqueDates = [...new Set(historyRows.map(r => r.date))].sort((a, b) => b.localeCompare(a));
        const latestDate = uniqueDates.length > 0 ? uniqueDates[0] : null;

        // --- Live Matches / Transparency Section (Show LATEST COMPLETED DAY or TODAY) ---
        // If we want transparency to show RESULTS, use latestDate. 
        // If we want it to show Live Feed, use today.
        // The user screenshot shows "Resultados Verificables" with "Programado" (Scheduled), so it seems they want live/pending there.
        // But the previous "Resultados Verificables" logic implied completed matches ("Sin Trucos, Solo Datos... registrada de forma inmutable").
        // Let's stick to LATEST COMPLETED for "Resultados Verificables" (Transparency) to show proof of winning.
        // AND use "Live Feed" component (BetsFeed.tsx) for today's bets.

        const transparentRows = latestDate ? historyRows.filter(r => r.date === latestDate) : [];

        const transparencyMatches = transparentRows.map((r) => ({
          originalSport: r.sport,
          date: r.date,
          time: r.time,
          match: `${r.home_team} vs ${r.away_team}`,
          pick: r.strategy,
          prob: `${r.prob_1 || 0}%`,
          status: mapStatus(r.status),
          strategy: r.strategy,
          league: r.league,
          sport: getSportDisplayName(r.sport)
        }));
        setLiveMatches(transparencyMatches);


        // --- Ticker Matches ---
        setTickerMatches(transparencyMatches);


        // --- Sport Stats (All Time) ---
        const statsBySport: Record<string, { total: number; wins: number }> = {};
        historyRows.forEach(r => {
          if (!statsBySport[r.sport]) statsBySport[r.sport] = { total: 0, wins: 0 };
          statsBySport[r.sport].total++;
          if (r.status === 'WON') statsBySport[r.sport].wins++;
        });

        const statsArray: SportStat[] = Object.entries(statsBySport).map(([sport, data]) => ({
          sport: getSportDisplayName(sport),
          total: data.total,
          rate: data.total > 0 ? Math.round((data.wins / data.total) * 100) : 0
        })).sort((a, b) => b.total - a.total);
        setSportStats(statsArray);


        // --- Daily Profitability (Latest Date) ---
        if (latestDate) {
          const latestRows = historyRows.filter(r => r.date === latestDate);
          const profitMatches = latestRows.map(r => {
            const investment = 100; // Assuming fixed unit
            const ret = r.status === 'WON' ? investment * r.odds : 0;
            return {
              sport: getSportDisplayName(r.sport),
              match: `${r.home_team} vs ${r.away_team}`,
              strategy: r.strategy,
              odds: r.odds,
              result: r.status === 'WON' ? 'GANADA' : 'PERDIDA',
              investment,
              returnAmount: ret,
              profit: ret - investment
            };
          });

          const totalWagered = profitMatches.reduce((sum, m) => sum + m.investment, 0);
          const totalReturn = profitMatches.reduce((sum, m) => sum + m.returnAmount, 0);

          setProfitability({
            date: latestDate,
            totalBets: profitMatches.length,
            totalWagered,
            totalReturn,
            netProfit: totalReturn - totalWagered,
            yield: totalWagered > 0 ? Math.round(((totalReturn - totalWagered) / totalWagered) * 10000) / 100 : 0,
            matches: profitMatches
          });
        }

        // --- Monthly Profitability (Last 30 Days) ---
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];

        // Filter rows for last 30 days excluding today (or including if you want live monthly stats)
        // Usually stats are for closed periods or "running"
        const monthlyRows = historyRows.filter(r => r.date >= thirtyDaysAgoStr && r.date <= today && (r.status === 'WON' || r.status === 'LOST'));

        if (monthlyRows.length > 0) {
          // Group by sport
          const sportMap: Record<string, { bets: number; wagered: number; returned: number; wins: number; losses: number }> = {};

          for (const r of monthlyRows) {
            const sportKey = r.sport;
            if (!sportMap[sportKey]) sportMap[sportKey] = { bets: 0, wagered: 0, returned: 0, wins: 0, losses: 0 };

            const investment = 100;
            const ret = r.status === 'WON' ? investment * r.odds : 0;

            sportMap[sportKey].bets++;
            sportMap[sportKey].wagered += investment;
            sportMap[sportKey].returned += ret;
            if (r.status === 'WON') sportMap[sportKey].wins++;
            else sportMap[sportKey].losses++;
          }

          const sportsData: SportProfitability[] = Object.entries(sportMap).map(([sport, data]) => {
            const netProfit = data.returned - data.wagered;
            return {
              sport: getSportDisplayName(sport),
              totalBets: data.bets,
              totalWagered: data.wagered,
              totalReturn: data.returned,
              netProfit: netProfit,
              yield: data.wagered > 0 ? Math.round((netProfit / data.wagered) * 10000) / 100 : 0,
              wins: data.wins,
              losses: data.losses
            };
          }).sort((a, b) => b.netProfit - a.netProfit);

          // Calculate totals
          const totalWagered = monthlyRows.reduce((acc, r) => acc + 100, 0);
          const totalReturn = monthlyRows.reduce((acc, r) => acc + (r.status === 'WON' ? 100 * r.odds : 0), 0);
          const netProfit = totalReturn - totalWagered;

          const monthlyDates = [...new Set(monthlyRows.map(r => r.date))].sort();

          setMonthlyProfitability({
            startDate: monthlyDates[0],
            endDate: monthlyDates[monthlyDates.length - 1],
            daysWithData: monthlyDates.length,
            sports: sportsData,
            totals: {
              totalBets: monthlyRows.length,
              totalWagered,
              totalReturn,
              netProfit: netProfit,
              yield: totalWagered > 0 ? Math.round((netProfit / totalWagered) * 10000) / 100 : 0
            }
          });
        } else {
          setMonthlyProfitability(null);
        }

        // --- Daily Predictions (Today's Pending) ---
        const dailyPredictionsData = todayRows.map((r) => ({
          originalSport: r.sport,
          date: r.date,
          time: r.time,
          match: `${r.home_team} vs ${r.away_team}`,
          pick: r.strategy,
          prob: `${r.prob_1 || 0}%`,
          status: mapStatus(r.status),
          strategy: r.strategy,
          league: r.league,
          sport: getSportDisplayName(r.sport),
          odds: r.odds,  // Ensure odds are passed
          home_team: r.home_team,
          away_team: r.away_team
        }));


      } catch (err) {
        console.error("Error fetching match data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Realtime Subscription
    const channel = supabase
      .channel('public:filtered_matches:main')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'filtered_matches' },
        (payload) => {
          console.log('Realtime update:', payload);
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, []);

  // Prepare dailyPredictions for return, mapping todayBets if needed, 
  // but better to state variable if we want it calculated inside useEffect
  // For now, let's derive it from todayBets since we set it in useEffect
  const dailyPredictions = todayBets.map((r: any) => ({
    originalSport: r.sport,
    date: r.date,
    time: r.time,
    match: `${r.home_team} vs ${r.away_team}`,
    pick: r.strategy,
    prob: `${r.prob_1 || 0}%`,
    status: mapStatus(r.status),
    strategy: r.strategy,
    league: r.league,
    sport: getSportDisplayName(r.sport),
    odds: r.odds
  }));

  // --- MOCK DATA FOR DEMOGRAPHICS (Iterative Design Phase) ---
  // If no predictions today, show some mocks to demonstrate the UI
  const displayPredictions = dailyPredictions.length > 0 ? dailyPredictions : [
    {
      originalSport: 'soccer',
      date: new Date().toISOString().split('T')[0],
      time: '20:45',
      match: 'Real Madrid vs Barcelona',
      pick: 'Over 2.5 Goals',
      prob: '78%',
      status: 'PENDING',
      strategy: 'El Clásico Value',
      league: 'La Liga',
      sport: '⚽ Fútbol',
      odds: 1.85,
      home_team: 'Real Madrid',
      away_team: 'Barcelona'
    },
    {
      originalSport: 'nba',
      date: new Date().toISOString().split('T')[0],
      time: '22:00',
      match: 'Lakers vs Warriors',
      pick: 'Lakers -5.5',
      prob: '65%',
      status: 'PENDING',
      strategy: 'NBA Trends',
      league: 'NBA',
      sport: '🏀 Basket',
      odds: 1.90,
      home_team: 'Lakers',
      away_team: 'Warriors'
    },
    {
      originalSport: 'tennis',
      date: new Date().toISOString().split('T')[0],
      time: '14:00',
      match: 'Alcaraz vs Sinner',
      pick: 'Alcaraz Win',
      prob: '82%',
      status: 'PENDING',
      strategy: 'Grand Slam',
      league: 'ATP',
      sport: '🎾 Tenis',
      odds: 1.72,
      home_team: 'Alcaraz',
      away_team: 'Sinner'
    }
  ];

  return { liveMatches, tickerMatches, sportStats, profitability, monthlyProfitability, loading, dailyPredictions: displayPredictions, todayBets };
}

function mapStatus(status: string) {
  if (status === 'WON') return 'WIN';
  if (status === 'LOST') return 'LOSS';
  if (status === 'VOID') return 'CANCELLED';
  return 'PENDING';
}
