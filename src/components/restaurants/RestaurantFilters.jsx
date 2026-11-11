import React from 'react';
import { ChevronDown, SlidersHorizontal, Check } from 'lucide-react';

export default function RestaurantFilters({
  totalCount,
  selectedCuisine,
  onCuisineChange,
  selectedRating,
  onRatingChange,
  sortBy,
  onSortChange,
  onlyOpen,
  onToggleOnlyOpen,
  onResetFilters,
  hasActiveFilters
}) {
  const cuisines = [
    'All',
    'Indian',
    'Italian',
    'Chinese',
    'American',
    'South Indian',
    'Fast Food'
  ];

  const ratingOptions = [
    { label: 'All Ratings', value: 'all' },
    { label: '4.5 & above ★', value: '4.5' },
    { label: '4.0 & above ★', value: '4.0' },
    { label: '3.5 & above ★', value: '3.5' },
  ];

  const sortOptions = [
    { label: 'Popularity', value: 'popularity' },
    { label: 'Rating: High to Low', value: 'rating' },
    { label: 'Delivery Time: Fastest', value: 'deliveryTime' },
    { label: 'Delivery Fee: Low to High', value: 'deliveryFee' },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 mb-6 border-b border-slate-200/80">
      
      {/* Total Count */}
      <div className="flex items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Restaurants <span className="text-slate-400 font-bold text-lg">({totalCount})</span>
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-xs font-bold text-[#FF5A1F] hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Filter Dropdowns matching screenshot */}
      <div className="flex flex-wrap items-center gap-2.5">
        
        {/* Open Now Toggle Pill */}
        <button
          onClick={onToggleOnlyOpen}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
            onlyOpen
              ? 'bg-emerald-500 text-white border-emerald-500 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          {onlyOpen && <Check className="w-3.5 h-3.5" />}
          <span>Open Now</span>
        </button>

        {/* Cuisine Dropdown */}
        <div className="relative">
          <select
            value={selectedCuisine}
            onChange={(e) => onCuisineChange(e.target.value)}
            className="appearance-none bg-white border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 py-1.5 pl-3 pr-7 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer shadow-2xs"
          >
            {cuisines.map(c => (
              <option key={c} value={c}>
                {c === 'All' ? 'Cuisine: All' : c}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Rating Dropdown */}
        <div className="relative">
          <select
            value={selectedRating}
            onChange={(e) => onRatingChange(e.target.value)}
            className="appearance-none bg-white border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 py-1.5 pl-3 pr-7 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer shadow-2xs"
          >
            {ratingOptions.map(r => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Sort By Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-white border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 py-1.5 pl-3 pr-7 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer shadow-2xs"
          >
            {sortOptions.map(s => (
              <option key={s.value} value={s.value}>
                Sort By: {s.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

      </div>

    </div>
  );
}
