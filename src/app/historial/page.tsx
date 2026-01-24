'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Trophy } from 'lucide-react';
import { Match } from '@/components/History/constants';
import HistoryFilters from '@/components/History/HistoryFilters';
import ResultsTable from '@/components/History/ResultsTable';

const ITEMS_PER_PAGE = 15;

export default function HistoryPage() {
    // Data State
    const [matches, setMatches] = useState<Match[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);

    // Filter Logic States
    const [uniqueSports, setUniqueSports] = useState<string[]>([]);
    const [strategyMap, setStrategyMap] = useState<Record<string, string[]>>({}); // sport -> strategies
    const [leagueMap, setLeagueMap] = useState<Record<string, string[]>>({}); // sport -> leagues

    // Selected Filters
    const [selectedSport, setSelectedSport] = useState<string>('all');
    const [selectedLeague, setSelectedLeague] = useState<string>('all');
    const [selectedStrategy, setSelectedStrategy] = useState<string>('all');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);

    // 1. Fetch Filter Metadata (Distinct Sports & Strategies)
    // We fetch this ONCE to populate the dropdowns. 
    // Optimization: In a real "Big Data" scenario, this might need a dedicated efficient endpoint/RPC.
    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                // Fetch only necessary columns to build filters
                const { data, error } = await supabase
                    .from('filtered_matches')
                    .select('sport, strategy, league');

                if (error) throw error;

                if (data) {
                    const sports = new Set<string>();
                    const sMap: Record<string, Set<string>> = {};
                    const lMap: Record<string, Set<string>> = {};

                    data.forEach((row: any) => {
                        sports.add(row.sport);

                        if (!sMap[row.sport]) sMap[row.sport] = new Set();
                        sMap[row.sport].add(row.strategy);

                        if (!lMap[row.sport]) lMap[row.sport] = new Set();
                        lMap[row.sport].add(row.league);
                    });

                    setUniqueSports(Array.from(sports));

                    const finalSMap: Record<string, string[]> = {};
                    Object.keys(sMap).forEach(k => {
                        finalSMap[k] = Array.from(sMap[k]);
                    });
                    setStrategyMap(finalSMap);

                    const finalLMap: Record<string, string[]> = {};
                    Object.keys(lMap).forEach(k => {
                        finalLMap[k] = Array.from(lMap[k]);
                    });
                    setLeagueMap(finalLMap);
                }
            } catch (err) {
                console.error("Error fetching metadata:", err);
            }
        };

        fetchMetadata();
    }, []);

    // 2. Fetch Matches (Server-Side Pagination)
    const fetchMatches = useCallback(async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('filtered_matches')
                .select('*', { count: 'exact' });

            // Apply Filters
            if (selectedSport !== 'all') {
                query = query.eq('sport', selectedSport);
            }
            if (selectedLeague !== 'all') {
                query = query.eq('league', selectedLeague);
            }
            if (selectedStrategy !== 'all') {
                query = query.eq('strategy', selectedStrategy);
            }
            if (selectedStatus !== 'all') {
                // Map 'LOST' from UI to DB if needed, but we aligned them to 'LOST' in UI now.
                // Assuming DB uses 'LOST' based on previous check.
                query = query.eq('status', selectedStatus);
            }

            // Pagination
            const from = (currentPage - 1) * ITEMS_PER_PAGE;
            const to = from + ITEMS_PER_PAGE - 1;

            const { data, count, error } = await query
                .order('date', { ascending: false })
                .range(from, to);

            if (error) throw error;

            setMatches((data as Match[]) || []);
            setTotalCount(count || 0);

        } catch (err) {
            console.error("Error fetching matches:", err);
        } finally {
            setLoading(false);
        }
    }, [selectedSport, selectedLeague, selectedStrategy, selectedStatus, currentPage]);

    // Trigger fetch when params change
    useEffect(() => {
        fetchMatches();
    }, [fetchMatches]);

    // Reset Page on Filter Change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedSport, selectedLeague, selectedStrategy, selectedStatus]);

    // Reset Strategy and League when Sport changes
    useEffect(() => {
        setSelectedStrategy('all');
        setSelectedLeague('all');
    }, [selectedSport]);

    const handleReset = () => {
        setSelectedSport('all');
        setSelectedLeague('all');
        setSelectedStrategy('all');
        setSelectedStatus('all');
        setCurrentPage(1);
    };

    // Get available strategies and leagues for current sport
    const availableStrategies = selectedSport === 'all' ? [] : (strategyMap[selectedSport] || []);
    const availableLeagues = selectedSport === 'all' ? [] : (leagueMap[selectedSport] || []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                            <Trophy className="text-emerald-400 w-8 h-8" />
                            Historial de Predicciones
                        </h1>
                        <p className="text-slate-400 mt-2">Consulta el archivo histórico de todas las predicciones generadas por la IA.</p>
                    </div>
                    <div className="bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-800 flex items-center gap-2">
                        <span className="text-slate-400 text-sm">Total Registros:</span>
                        <span className="text-emerald-400 font-mono font-bold">{totalCount}</span>
                    </div>
                </div>

                {/* Components */}
                <HistoryFilters
                    selectedSport={selectedSport}
                    onSportChange={setSelectedSport}
                    selectedLeague={selectedLeague}
                    onLeagueChange={setSelectedLeague}
                    selectedStrategy={selectedStrategy}
                    onStrategyChange={setSelectedStrategy}
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                    uniqueSports={uniqueSports}
                    uniqueLeagues={availableLeagues}
                    availableStrategies={availableStrategies}
                    onReset={handleReset}
                />

                <ResultsTable
                    matches={matches}
                    loading={loading}
                    totalItems={totalCount}
                    currentPage={currentPage}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={setCurrentPage}
                />

            </div>
        </div>
    );
}
