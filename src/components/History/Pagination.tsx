'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    currentStart: number;
    currentEnd: number;
    totalItems: number;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    currentStart,
    currentEnd,
    totalItems
}: PaginationProps) {
    if (totalItems === 0) return null;

    return (
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/30 flex items-center justify-between">
            <div className="text-sm text-slate-500">
                Mostrando <span className="font-medium text-slate-300">{currentStart}</span> a <span className="font-medium text-slate-300">{currentEnd}</span> de <span className="font-medium text-slate-300">{totalItems}</span>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-300"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-medium text-slate-400 px-2">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-slate-300"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
