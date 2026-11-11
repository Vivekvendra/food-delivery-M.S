import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-10 mb-6 select-none">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center transition cursor-pointer ${
              isActive
                ? 'bg-[#FF5A1F] text-white shadow-md shadow-orange-500/25 scale-105'
                : 'text-slate-600 hover:bg-slate-100 border border-transparent'
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
