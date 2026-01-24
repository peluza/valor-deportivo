import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, addMonths, subMonths, isSameMonth, isSameDay, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
    value?: Date | null;
    onChange: (date: Date) => void;
    onClose: () => void;
}

export default function Calendar({ value, onChange, onClose }: CalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(value || new Date());

    const days = eachDayOfInterval({
        start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 }), // Lunes
        end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 })
    });

    const weekDays = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

    const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    const handleDateClick = (date: Date) => {
        onChange(date);
        onClose();
    };

    return (
        <div className="absolute top-full left-0 mt-2 z-50 w-72 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50">
                <button
                    onClick={handlePrevMonth}
                    className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-semibold text-white capitalize">
                    {format(currentMonth, 'MMMM yyyy', { locale: es })}
                </span>
                <button
                    onClick={handleNextMonth}
                    className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Grid */}
            <div className="p-4 grid grid-cols-7 gap-1">
                {/* Weekday Headers */}
                {weekDays.map(day => (
                    <div key={day} className="text-center text-xs font-semibold text-slate-500 py-1">
                        {day}
                    </div>
                ))}

                {/* Days */}
                {days.map((day, dayIdx) => {
                    const isSelected = value && isSameDay(day, value);
                    const isCurrentMonth = isSameMonth(day, currentMonth);
                    const isTodayDate = isToday(day);

                    return (
                        <button
                            key={day.toString()}
                            onClick={() => handleDateClick(day)}
                            className={`
                                h-8 w-8 rounded-lg flex items-center justify-center text-sm font-medium transition-all
                                ${!isCurrentMonth ? 'text-slate-700' : ''}
                                ${isSelected
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                                    : 'hover:bg-slate-800 text-slate-300'}
                                ${isTodayDate && !isSelected ? 'text-emerald-400 font-bold border border-emerald-500/30' : ''}
                            `}
                        >
                            {format(day, 'd')}
                        </button>
                    );
                })}
            </div>

            {/* Footer / Today Shortcut */}
            <div className="p-3 border-t border-slate-800 bg-slate-900/30 flex justify-between">
                <button
                    onClick={() => { onChange(new Date()); onClose(); }}
                    className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                    Hoy
                </button>
                <button
                    onClick={onClose}
                    className="text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}
