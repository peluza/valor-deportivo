import { NextResponse } from 'next/server';

// Configuration
const MATCHES_SHEET_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
const PROFITABILITY_SHEET_URL = process.env.GOOGLE_SHEET_PROFITABILITY_URL;
const REVALIDATE_SECONDS = 3600; // Cache for 1 hour

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
      fetch(MATCHES_SHEET_URL, { next: { revalidate: REVALIDATE_SECONDS } }),
      fetch(PROFITABILITY_SHEET_URL, { next: { revalidate: REVALIDATE_SECONDS } })
    ]);

    const matchesText = await matchesRes.text();
    const profitText = await profitRes.text();

    const matchesLines = matchesText.split('\n').filter(l => l.trim());
    const profitLines = profitText.split('\n').filter(l => l.trim());

    const matchesData = matchesLines.slice(1).map(parseCSVLine);
    const profitData = profitLines.map(parseCSVLine);

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

export async function GET() {
  try {
    const data = await fetchAndParseData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
