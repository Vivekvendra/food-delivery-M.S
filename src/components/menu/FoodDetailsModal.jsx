import React from 'react';
import { X, Clock, Star, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function FoodDetailsModal({ isOpen, onClose, item }) {
  const { addToCart } = useCart();

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
        
        {/* Food Image Banner */}
        <div className="relative h-56 w-full bg-slate-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Veg / Non-Veg Pill */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md ${
                item.isVeg ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              {item.isVeg ? 'Vegetarian' : 'Non-Veg'}
            </span>

            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white shadow-md">
              {item.category}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          
          {/* Header: Title & Price */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-black text-slate-900 leading-tight">
                {item.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <div className="flex items-center gap-1 font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{item.rating || 4.5}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{item.prepTime || '20 mins'}</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="text-2xl font-black text-slate-900">
              ₹{item.price}
            </div>
          </div>

          {/* Description */}
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
            {item.description}
          </div>

          {/* Key Ingredients */}
          {item.ingredients && (
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs">
              <span className="font-bold text-slate-700 block mb-1">Key Ingredients:</span>
              <span className="text-slate-600">{item.ingredients}</span>
            </div>
          )}

          {/* Status info */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-500 font-medium">Availability:</span>
            <span
              className={`inline-flex items-center gap-1 font-bold ${
                item.status === 'Available' ? 'text-emerald-600' : 'text-rose-500'
              }`}
            >
              {item.status === 'Available' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>In Stock</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Out of Stock</span>
                </>
              )}
            </span>
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
            >
              Close
            </button>
            
            {item.status === 'Available' && (
              <button
                onClick={() => {
                  addToCart(item);
                  onClose();
                }}
                className="w-full py-2.5 bg-[#FF5A1F] hover:bg-[#ea4e15] active:scale-95 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/25 transition cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add to Cart</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
