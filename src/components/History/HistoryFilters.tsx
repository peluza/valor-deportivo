'use client';

import { useState, useRef, useEffect } from 'react';

import { Activity, Zap, Filter, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { getSportDisplayName } from '@/hooks/useMatchesData';
import { getStrategyName } from './constants';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Calendar from './Calendar';

interface HistoryFiltersProps {
    selectedSport: string;
    onSportChange: (v: string) => void;
    selectedLeague: string;
    onLeagueChange: (v: string) => void;
    selectedDate: string;
    onDateChange: (v: string) => void;
    selectedStrategy: string;
    onStrategyChange: (v: string) => void;
    selectedStatus: string;
    onStatusChange: (v: string) => void;
    uniqueSports: string[];
    uniqueLeagues: string[];
    availableStrategies: string[];
    onReset: () => void;
}

export default function HistoryFilters({
    selectedSport,
    onSportChange,
    selectedLeague,
    onLeagueChange,
    selectedDate,
    onDateChange,
    selectedStrategy,
    onStrategyChange,
    selectedStatus,
    onStatusChange,
    uniqueSports,
    uniqueLeagues,
    availableStrategies,
    onReset
}: HistoryFiltersProps) {
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);

    // Close calendar when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setShowCalendar(false);
            }
        }
        if (showCalendar) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showCalendar]);

    const handleDateSelect = (date: Date) => {
        // Format to YYYY-MM-DD for consistency with parent state
        onDateChange(format(date, 'yyyy-MM-dd'));
        setShowCalendar(false);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/40 p-6 rounded-xl border border-slate-800/50 backdrop-blur-sm">

            {/* Sport Filter */}
            <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-3 h-3" /> Deporte
                </label>
                <select
                    value={selectedSport}
                    onChange={(e) => onSportChange(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all appearance-none"
                >
                    <option value="all">Todos los Deportes</option>
                    {uniqueSports.map(s => (
                        <option key={s} value={s}>{getSportDisplayName(s)}</option>
                    ))}
                </select>
            </div>

            {/* League Filter */}
            <div className="space-y-2">
                <label className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-2 ${selectedSport === 'all' ? 'text-slate-600' : 'text-slate-500'}`}>
                    <Filter className="w-3 h-3" /> Liga
                </label>
                <select
                    value={selectedLeague}
                    onChange={(e) => onLeagueChange(e.target.value)}
                    disabled={selectedSport === 'all'}
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none transition-all appearance-none
                        ${selectedSport === 'all'
                            ? 'bg-slate-900/50 border-slate-800 text-slate-600 cursor-not-allowed'
                            : 'bg-slate-950 border-slate-800 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 shadow-lg'
                        }`}
                >
                    <option value="all">Todas las Ligas</option>
                    {uniqueLeagues.map(l => (
                        <option key={l} value={l}>{l.replace(/_/g, ' ')}</option>
                    ))}
                </select>
            </div>

            {/* Date Filter */}
            <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <CalendarIcon className="w-3 h-3" /> Fecha
                </label>
                <div className="relative w-full" ref={calendarRef}>
                    <button
                        onClick={() => setShowCalendar(!showCalendar)}
                        className={`w-full bg-slate-950 border rounded-lg px-4 py-2.5 text-sm flex items-center justify-between text-left transition-all
                            ${showCalendar ? 'ring-2 ring-emerald-500/50 border-emerald-500' : 'border-slate-800 hover:border-slate-700'}`}
                    >
                        <span className={selectedDate ? 'text-white' : 'text-slate-400'}>
                            {selectedDate ? format(new Date(selectedDate + 'T12:00:00'), 'PPP', { locale: es }) : 'Todas las Fechas'}
                        </span>
                        <CalendarIcon className="w-4 h-4 text-slate-500" />
                    </button>

                    {showCalendar && (
                        <Calendar
                            value={selectedDate ? new Date(selectedDate + 'T12:00:00') : null}
                            onChange={handleDateSelect}
                            onClose={() => setShowCalendar(false)}
                        />
                    )}
                </div>
            </div>

            {/* Bet Type Filter */}
            <div className="space-y-2">
                <label className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-2 ${selectedSport === 'all' ? 'text-slate-600' : 'text-slate-500'}`}>
                    <Zap className="w-3 h-3" /> Tipo de Apuesta
                </label>
                <select
                    value={selectedStrategy}
                    onChange={(e) => onStrategyChange(e.target.value)}
                    disabled={selectedSport === 'all'}
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none transition-all appearance-none
                        ${selectedSport === 'all'
                            ? 'bg-slate-900/50 border-slate-800 text-slate-600 cursor-not-allowed'
                            : 'bg-slate-950 border-slate-800 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 shadow-lg'
                        }`}
                >
                    <option value="all">Todas las Apuestas</option>
                    {availableStrategies.map(s => (
                        <option key={s} value={s}>{getStrategyName(s)}</option>
                    ))}
                </select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <Filter className="w-3 h-3" /> Estado
                </label>
                <select
                    value={selectedStatus}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all appearance-none"
                >
                    <option value="all">Todos los Estados</option>
                    <option value="WON">Ganadas</option>
                    <option value="LOST">Perdidas</option>
                    <option value="PENDING">Pendientes</option>
                </select>
            </div>

            <div className="flex items-end md:col-span-3">
                <button
                    onClick={onReset}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2.5 px-4 rounded-lg transition-colors text-sm"
                >
                    Limpiar Filtros
                </button>
            </div>

        </div>
    );
}
