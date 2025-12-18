import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Configuration
const CACHE_FILE_PATH = path.join(process.cwd(), 'data', 'matches_cache.json');
const MATCHES_SHEET_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
const PROFITABILITY_SHEET_URL = process.env.GOOGLE_SHEET_PROFITABILITY_URL;
const UPDATE_HOUR = 6; // 6:00 AM

// Helper to parse CSV (Same as in hook)
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

async function fetchAndParseData() {
  if (!MATCHES_SHEET_URL || !PROFITABILITY_SHEET_URL) {
    throw new Error("Missing Google Sheets Configuration (Env Vars)");
  }

  try {
    const [matchesRes, profitRes] = await Promise.all([
      fetch(MATCHES_SHEET_URL),
      fetch(PROFITABILITY_SHEET_URL)
    ]);

    const matchesText = await matchesRes.text();
    const profitText = await profitRes.text();

    const matchesLines = matchesText.split('\n').filter(l => l.trim());
    const profitLines = profitText.split('\n').filter(l => l.trim());

    // Simple parsing - we return raw rows to frontend to maintain logic parity
    // or we can pre-parse. Let's return raw rows (array of arrays) to minimize frontend refactor risk.
    // Frontend expects: lines.slice(1).map(parseCSVLine)
    
    const matchesData = matchesLines.slice(1).map(parseCSVLine);
    const profitData = profitLines.map(parseCSVLine); // Frontend uses all lines and parses specifically

    return {
      matches: matchesData,
      profitability: profitData,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error("Error fetching from Google Sheets:", error);
    throw error;
  }
}

function shouldUpdate(lastUpdatedStr: string): boolean {
  if (!lastUpdatedStr) return true;

  const lastUpdate = new Date(lastUpdatedStr);
  const now = new Date();
  
  // Set target update time for TODAY at 6 AM
  const todaySixAM = new Date(now);
  todaySixAM.setHours(UPDATE_HOUR, 0, 0, 0);

  // If we are currently BEFORE 6 AM, we belong to yesterday's cycle.
  // The target is Yesterday 6 AM.
  if (now.getHours() < UPDATE_HOUR) {
    todaySixAM.setDate(todaySixAM.getDate() - 1);
  }

  // If cache is OLDER than the latest 6 AM checkpoint, we update.
  return lastUpdate < todaySixAM;
}

export async function GET() {
  try {
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let cachedData = null;
    let needsRefresh = true;

    if (fs.existsSync(CACHE_FILE_PATH)) {
      try {
        const fileContent = fs.readFileSync(CACHE_FILE_PATH, 'utf-8');
        cachedData = JSON.parse(fileContent);
        if (cachedData && cachedData.lastUpdated) {
          needsRefresh = shouldUpdate(cachedData.lastUpdated);
        }
      } catch (err) {
        console.error("Error reading cache:", err);
        needsRefresh = true;
      }
    }

    if (needsRefresh) {
      console.log("Cache expired or missing. Fetching new data from Google Sheets...");
      const newData = await fetchAndParseData();
      fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(newData));
      cachedData = newData;
    } else {
      console.log("Serving from cache...");
    }

    return NextResponse.json(cachedData);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
