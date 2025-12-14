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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/1MMfzYOEgcbYY-nEGiiXha8cFlBMX-Cv64DLGnoMFSYk/gviz/tq?tqx=out:csv&sheet=filtered_matches');
        const text = await response.text();
        const lines = text.split('\n').filter(l => l.trim());

        // Skip header
        const data = lines.slice(1).map(parseCSVLine);

        // Process data
        const matchesBySport: Record<string, MatchData[]> = {};
        const allMatches: MatchData[] = [];

        // Calculate Yesterday's Date
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

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

        // Filter for Yesterday's Matches (Table) - ONE per sport, only completed (WIN/LOSS)
        const yesterdaysMatchesAll = allMatches.filter(m => m.date === yesterdayStr);
        const yesterdaysMatchesBySport: Record<string, MatchData> = {};
        yesterdaysMatchesAll
          .filter(m => m.status === 'WIN' || m.status === 'LOSS') // Only completed matches
          .forEach(m => {
            // Only keep first match per sport (not overwrite)
            if (!yesterdaysMatchesBySport[m.originalSport]) {
              yesterdaysMatchesBySport[m.originalSport] = m;
            }
          });

        const yesterdaysMatches = Object.values(yesterdaysMatchesBySport).map((m) => ({
          ...m,
          sport: getSportDisplayName(m.originalSport)
        }));

        // Filter for Ticker - Yesterday's completed matches only (WIN/LOSS)
        const tickerMatchesRaw = allMatches
          .filter(m => m.date === yesterdayStr && (m.status === 'WIN' || m.status === 'LOSS'));
        const latestMatches = tickerMatchesRaw.map((m) => ({
          ...m,
          sport: getSportDisplayName(m.originalSport)
        }));

        setLiveMatches(yesterdaysMatches);
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
          
          profitLines.forEach((line) => {
            const cells = parseCSVLine(line);
            
            // Skip if not enough columns or first cell isn't a date
            if (cells.length < 9) return;
            if (!cells[0] || !datePattern.test(cells[0].trim())) return;
            
            // Check if this is yesterday's data
            const matchDate = cells[0].trim(); // Fecha
            if (matchDate !== yesterdayStr) return;
            
            const sport = cells[1]; // Deporte
            const match = cells[2]; // Partido
            const strategy = cells[3]; // Estrategia
            const odds = parseFloat(cells[4]) || 0; // Cuota (Odds)
            const status = cells[5]; // Estado (WON/LOST)
            const investment = parseFloat(cells[6]) || 0; // Inversión ($)
            const returnAmount = parseFloat(cells[7]) || 0; // Retorno ($)
            const profit = parseFloat(cells[8]) || 0; // Ganancia/Pérdida
            
            profitMatches.push({
              sport: getSportDisplayName(sport),
              match,
              strategy: strategy.replace(/_/g, ' '),
              odds,
              result: status === 'WON' ? 'GANADA' : 'PERDIDA',
              investment,
              returnAmount,
              profit
            });
          });
          
          // Calculate totals from yesterday's matches if no summary found
          if (profitMatches.length > 0) {
            const yesterdayWagered = profitMatches.reduce((acc, m) => acc + m.investment, 0);
            const yesterdayReturn = profitMatches.reduce((acc, m) => acc + m.returnAmount, 0);
            const yesterdayProfit = yesterdayReturn - yesterdayWagered;
            const yesterdayYield = yesterdayWagered > 0 ? Math.round((yesterdayProfit / yesterdayWagered) * 10000) / 100 : 0;
            
            setProfitability({
              date: yesterdayStr,
              totalBets: profitMatches.length,
              totalWagered: yesterdayWagered,
              totalReturn: yesterdayReturn,
              netProfit: yesterdayProfit,
              yield: yesterdayYield,
              matches: profitMatches
            });
          } else {
            // No matches for yesterday, set null
            setProfitability(null);
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

  return { liveMatches, tickerMatches, sportStats, profitability, loading };
}
