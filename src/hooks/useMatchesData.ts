'use client';

import { useState, useEffect } from 'react';

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


// Helper function to parse CSV line
const parseCSVLine = (line: string): string[] => {
  const result = [];
  let cell = '';
  let quote = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      quote = !quote;
    } else if (char === ',' && !quote) {
      result.push(cell);
      cell = '';
    } else {
      cell += char;
    }
  }
  result.push(cell);
  return result.map(c => c.replace(/^"|"$/g, '').trim());
};

// Get display name for sport
export const getSportDisplayName = (sport: string): string => {
  if (sport === 'futbol') return "⚽ Fútbol";
  if (sport === 'hockey') return "🏒 Hockey";
  if (sport === 'tenis') return "🎾 Tenis";
  if (sport === 'nba' || sport === 'basket' || sport === 'basketball') return "🏀 Basket";
  if (sport === 'mma') return "🥊 MMA";
  if (sport === 'nfl' || sport === 'american_football') return "🏈 NFL";
  return sport;
};

export function useMatchesData() {
  const [liveMatches, setLiveMatches] = useState<MatchData[]>([]);
  const [tickerMatches, setTickerMatches] = useState<MatchData[]>([]);
  const [sportStats, setSportStats] = useState<SportStat[]>([]);
  const [profitability, setProfitability] = useState<ProfitabilityData | null>(null);
  const [monthlyProfitability, setMonthlyProfitability] = useState<MonthlyProfitabilityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const sheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
        if (!sheetUrl) {
          console.error("NEXT_PUBLIC_GOOGLE_SHEET_URL is missing");
          setLoading(false);
          return;
        }
        const response = await fetch(sheetUrl);
        const text = await response.text();
        const lines = text.split('\n').filter(l => l.trim());

        // Skip header
        const data = lines.slice(1).map(parseCSVLine);

        // Process data
        const matchesBySport: Record<string, MatchData[]> = {};
        const allMatches: MatchData[] = [];

        // We will find the latest date with data after processing all matches
        // Use local timezone for consistent date comparison
        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        data.forEach(row => {
          if (row.length < 5) return;

          const sport = row[1];
          const home = row[3];
          const away = row[4];
          const date = row[5];
          const time = row[6];
          const strategy = row[7];
          const status = row[16];

          let pick = '';
          let prob = '';

          // Detect pick based on strategy type
          if (strategy.includes('OVER')) {
            pick = 'Over 2.5';
            prob = row[11];
          } else if (strategy.includes('UNDER')) {
            pick = 'Under 2.5';
            prob = row[12];
          } else if (strategy.includes('HOME') || strategy.includes('1X2') || strategy.includes('1X_')) {
            // HOME strategies, 1X2, or 1X_ -> bet on home team
            pick = home;
            prob = row[8];
          } else if (strategy.includes('AWAY')) {
            pick = away;
            prob = row[10];
          } else if (strategy.includes('MONEYLINE')) {
            // MONEYLINE strategies - determine by looking at which prob is higher
            const homeProb = parseFloat(row[8]) || 0;
            const awayProb = parseFloat(row[10]) || 0;
            if (homeProb >= awayProb) {
              pick = home;
              prob = row[8];
            } else {
              pick = away;
              prob = row[10];
            }
          } else {
            // Skip matches with unrecognized strategies
            return;
          }
          
          // Skip if probability is empty, zero, or invalid
          const probValue = parseFloat(prob) || 0;
          if (probValue <= 0 || pick === '') {
            return;
          }

          const matchObj: MatchData = {
            originalSport: sport,
            date,
            time,
            match: `${home} vs ${away}`,
            pick,
            prob: `${prob}%`,
            status: status === 'WON' ? 'WIN' : status === 'LOST' ? 'LOSS' : status === 'CANCELLED' ? 'CANCELLED' : 'PENDING',
            strategy: strategy.replace(/_/g, ' '),
            league: row[2]
          };

          allMatches.push(matchObj);

          if (!matchesBySport[sport]) matchesBySport[sport] = [];
          matchesBySport[sport].push(matchObj);
        });

        const stats: SportStat[] = Object.keys(matchesBySport).map(sport => {
          const matches = matchesBySport[sport];
          const completed = matches.filter(m => m.status === 'WIN' || m.status === 'LOSS');
          const wins = completed.filter(m => m.status === 'WIN').length;
          const total = completed.length;
          const rate = total > 0 ? Math.round((wins / total) * 100) : 0;

          return { sport: getSportDisplayName(sport), rate, total };
        });

        // Find the latest date with completed matches (not today)
        // This ensures we always show data even if yesterday had no events
        const completedMatches = allMatches.filter(m => 
          m.status === 'WIN' || m.status === 'LOSS'
        );
        const uniqueDates = [...new Set(completedMatches.map(m => m.date))]
          .filter(d => d < todayStr) // Only past dates (not today)
          .sort((a, b) => b.localeCompare(a)); // Sort descending (most recent first)
        
        const latestDateWithData = uniqueDates.length > 0 ? uniqueDates[0] : null;

        // Filter for Latest Date's Matches (Table) - ONE per sport, only completed (WIN/LOSS)
        const latestDayMatchesAll = latestDateWithData 
          ? allMatches.filter(m => m.date === latestDateWithData)
          : [];
        const latestDayMatchesBySport: Record<string, MatchData> = {};
        latestDayMatchesAll
          .filter(m => m.status === 'WIN' || m.status === 'LOSS') // Only completed matches
          .forEach(m => {
            // Only keep first match per sport (not overwrite)
            if (!latestDayMatchesBySport[m.originalSport]) {
              latestDayMatchesBySport[m.originalSport] = m;
            }
          });

        const latestDayMatches = Object.values(latestDayMatchesBySport).map((m) => ({
          ...m,
          sport: getSportDisplayName(m.originalSport)
        }));

        // Filter for Ticker - Latest date's completed matches only (WIN/LOSS)
        const tickerMatchesRaw = latestDateWithData
          ? allMatches.filter(m => m.date === latestDateWithData && (m.status === 'WIN' || m.status === 'LOSS'))
          : [];
        const latestMatches = tickerMatchesRaw.map((m) => ({
          ...m,
          sport: getSportDisplayName(m.originalSport)
        }));

        setLiveMatches(latestDayMatches);
        setTickerMatches(latestMatches);
        setSportStats(stats);

        // Fetch REAL Profitability Data from Simulacion_Rentabilidad sheet
        try {
          const profitResponse = await fetch('https://docs.google.com/spreadsheets/d/1MMfzYOEgcbYY-nEGiiXha8cFlBMX-Cv64DLGnoMFSYk/gviz/tq?tqx=out:csv&sheet=Simulacion_Rentabilidad');
          const profitText = await profitResponse.text();
          const profitLines = profitText.split('\n').filter(l => l.trim());
          
          // Find data rows (skip headers and summary rows)
          // Based on sheet structure: Row 8+ has the actual match data
          // Columns: A=Fecha, B=Deporte, C=Partido, D=Estrategia, E=Cuota, F=Estado, G=Inversión, H=Retorno, I=Ganancia/Pérdida
          
          let totalApostado = 0;
          let totalRetorno = 0;
          let netProfit = 0;
          let yieldPct = 0;
          const profitMatches: ProfitabilityData['matches'] = [];
          
          // Parse summary from rows 3-6 (0-indexed: 2-5)
          profitLines.forEach((line, idx) => {
            const cells = parseCSVLine(line);
            if (cells[0] === 'Total Apostado ($):') {
              totalApostado = parseFloat(cells[1]) || 0;
            }
            if (cells[0] === 'Total Retorno ($):') {
              totalRetorno = parseFloat(cells[1]) || 0;
            }
            if (cells[0] === 'Net Profit ($):') {
              netProfit = parseFloat(cells[1]) || 0;
            }
            if (cells[0] === 'Yield / ROI (%):') {
              yieldPct = parseFloat(cells[1]?.replace('%', '')) || 0;
            }
          });
          
          // Parse match data - detect by date pattern (YYYY-MM-DD)
          const datePattern = /^\d{4}-\d{2}-\d{2}$/;
          
          // First, collect all valid dates from profitability data
          const allProfitDates: string[] = [];
          interface ProfitMatchRow {
            date: string;
            sport: string;
            match: string;
            strategy: string;
            odds: number;
            status: string;
            investment: number;
            returnAmount: number;
            profit: number;
          }
          const allProfitRows: ProfitMatchRow[] = [];
          
          profitLines.forEach((line) => {
            const cells = parseCSVLine(line);
            
            // Skip if not enough columns or first cell isn't a date
            if (cells.length < 9) return;
            if (!cells[0] || !datePattern.test(cells[0].trim())) return;
            
            const matchDate = cells[0].trim();
            if (matchDate >= todayStr) return; // Skip today's matches
            
            allProfitDates.push(matchDate);
            allProfitRows.push({
              date: matchDate,
              sport: cells[1],
              match: cells[2],
              strategy: cells[3],
              odds: parseFloat(cells[4]) || 0,
              status: cells[5],
              investment: parseFloat(cells[6]) || 0,
              returnAmount: parseFloat(cells[7]) || 0,
              profit: parseFloat(cells[8]) || 0
            });
          });
          
          // Find the latest date with profitability data
          const uniqueProfitDates = [...new Set(allProfitDates)].sort((a, b) => b.localeCompare(a));
          const latestProfitDate = uniqueProfitDates.length > 0 ? uniqueProfitDates[0] : null;
          
          // Filter rows for the latest date
          if (latestProfitDate) {
            const latestRows = allProfitRows.filter(r => r.date === latestProfitDate);
            
            latestRows.forEach(row => {
              profitMatches.push({
                sport: getSportDisplayName(row.sport),
                match: row.match,
                strategy: row.strategy.replace(/_/g, ' '),
                odds: row.odds,
                result: row.status === 'WON' ? 'GANADA' : 'PERDIDA',
                investment: row.investment,
                returnAmount: row.returnAmount,
                profit: row.profit
              });
            });
          }
          
          // Calculate totals from latest day's matches
          if (profitMatches.length > 0 && latestProfitDate) {
            const latestWagered = profitMatches.reduce((acc, m) => acc + m.investment, 0);
            const latestReturn = profitMatches.reduce((acc, m) => acc + m.returnAmount, 0);
            const latestProfit = latestReturn - latestWagered;
            const latestYield = latestWagered > 0 ? Math.round((latestProfit / latestWagered) * 10000) / 100 : 0;
            
            setProfitability({
              date: latestProfitDate,
              totalBets: profitMatches.length,
              totalWagered: latestWagered,
              totalReturn: latestReturn,
              netProfit: latestProfit,
              yield: latestYield,
              matches: profitMatches
            });
          } else {
            // No matches found, set null
            setProfitability(null);
          }

          // ========== MONTHLY PROFITABILITY (Last 30 days, grouped by sport) ==========
          // Calculate the date 30 days ago
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          const thirtyDaysAgoStr = `${thirtyDaysAgo.getFullYear()}-${String(thirtyDaysAgo.getMonth() + 1).padStart(2, '0')}-${String(thirtyDaysAgo.getDate()).padStart(2, '0')}`;

          // Filter rows for last 30 days (excluding today)
          const monthlyRows = allProfitRows.filter(r => 
            r.date >= thirtyDaysAgoStr && r.date < todayStr
          );

          if (monthlyRows.length > 0) {
            // Group by sport
            const sportMap: Record<string, {
              bets: number;
              wagered: number;
              returned: number;
              wins: number;
              losses: number;
            }> = {};

            monthlyRows.forEach(row => {
              const sportKey = row.sport;
              if (!sportMap[sportKey]) {
                sportMap[sportKey] = { bets: 0, wagered: 0, returned: 0, wins: 0, losses: 0 };
              }
              sportMap[sportKey].bets++;
              sportMap[sportKey].wagered += row.investment;
              sportMap[sportKey].returned += row.returnAmount;
              if (row.status === 'WON') {
                sportMap[sportKey].wins++;
              } else {
                sportMap[sportKey].losses++;
              }
            });

            // Convert to SportProfitability array
            const sportsData: SportProfitability[] = Object.entries(sportMap).map(([sport, data]) => {
              const netProfit = data.returned - data.wagered;
              const yieldPct = data.wagered > 0 ? Math.round((netProfit / data.wagered) * 10000) / 100 : 0;
              return {
                sport: getSportDisplayName(sport),
                totalBets: data.bets,
                totalWagered: data.wagered,
                totalReturn: data.returned,
                netProfit,
                yield: yieldPct,
                wins: data.wins,
                losses: data.losses
              };
            });

            // Sort by netProfit descending (best performing first)
            sportsData.sort((a, b) => b.netProfit - a.netProfit);

            // Calculate totals
            const totalWagered = monthlyRows.reduce((acc, r) => acc + r.investment, 0);
            const totalReturn = monthlyRows.reduce((acc, r) => acc + r.returnAmount, 0);
            const totalNetProfit = totalReturn - totalWagered;
            const totalYield = totalWagered > 0 ? Math.round((totalNetProfit / totalWagered) * 10000) / 100 : 0;

            // Find date range
            const monthlyDates = [...new Set(monthlyRows.map(r => r.date))].sort();
            const startDate = monthlyDates[0];
            const endDate = monthlyDates[monthlyDates.length - 1];

            setMonthlyProfitability({
              startDate,
              endDate,
              daysWithData: monthlyDates.length,
              sports: sportsData,
              totals: {
                totalBets: monthlyRows.length,
                totalWagered,
                totalReturn,
                netProfit: totalNetProfit,
                yield: totalYield
              }
            });
          } else {
            setMonthlyProfitability(null);
          }
        } catch (profitError) {
          console.error("Error fetching profitability data:", profitError);
          setProfitability(null);
        }

        setLoading(false);

      } catch (error) {
        console.error("Error fetching matches:", error);
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return { liveMatches, tickerMatches, sportStats, profitability, monthlyProfitability, loading };
}
