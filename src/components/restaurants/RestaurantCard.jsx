import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, Heart, Bike } from 'lucide-react';

export default function RestaurantCard({ restaurant }) {
  const [isFavorite, setIsFavorite] = useState(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('fdms_favorites') || '[]');
      return favs.includes(restaurant.id);
    } catch {
      return false;
    }
  });

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const favs = JSON.parse(localStorage.getItem('fdms_favorites') || '[]');
      let updated;
      if (isFavorite) {
        updated = favs.filter(id => id !== restaurant.id);
      } else {
        updated = [...favs, restaurant.id];
      }
      localStorage.setItem('fdms_favorites', JSON.stringify(updated));
      setIsFavorite(!isFavorite);
    } catch {
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <Link
      to={`/restaurants/${restaurant.id}`}
      className="group bg-white rounded-3xl border border-slate-100/90 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 overflow-hidden flex flex-col justify-between flex-1 cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-100">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Soft shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Status Badge: Open / Closed */}
        <div className="absolute top-3 left-3 z-10">
          {restaurant.isOpen ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Open
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Closed
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-400 hover:text-rose-500 hover:scale-110 active:scale-95 transition-all shadow-md cursor-pointer"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
            }`}
          />
        </button>

        {/* Delivery Time Pill overlay */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
          <Clock className="w-3.5 h-3.5 text-orange-400" />
          <span>{restaurant.deliveryTime}</span>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Restaurant Title & Rating */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#FF5A1F] transition line-clamp-1">
              {restaurant.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200/60 px-2 py-0.5 rounded-lg text-xs font-bold flex-shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{restaurant.rating}</span>
              <span className="text-[10px] text-amber-600 font-normal">({restaurant.reviewCount})</span>
            </div>
          </div>

          {/* Cuisine Type */}
          <p className="text-xs sm:text-sm font-medium text-slate-500 mb-3 line-clamp-1">
            {restaurant.cuisine}
          </p>
        </div>

        {/* Bottom Details: Fee & Address */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1 font-semibold text-slate-700">
            <Bike className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span>{restaurant.deliveryFee === 0 ? 'Free Delivery' : `₹${restaurant.deliveryFee} Delivery`}</span>
          </div>

          <div className="flex items-center gap-1 max-w-[170px] truncate text-slate-400">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{restaurant.address.split(',')[1]?.trim() || restaurant.address}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
