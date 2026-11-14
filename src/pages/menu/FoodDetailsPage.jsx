import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CustomerNavbar from '../../components/layout/CustomerNavbar';
import { useMenu } from '../../context/MenuContext';
import { useCart } from '../../context/CartContext';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Plus, 
  Minus, 
  CheckCircle2, 
  AlertCircle, 
  UtensilsCrossed 
} from 'lucide-react';

export default function FoodDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMenuItemById } = useMenu();
  const { cartItems, addToCart, updateQuantity } = useCart();

  const item = getMenuItemById(id);

  if (!item) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <CustomerNavbar />
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="w-14 h-14 rounded-full bg-orange-50 text-[#FF5A1F] flex items-center justify-center mx-auto mb-3">
            <UtensilsCrossed className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Dish not found</h2>
          <p className="text-xs text-slate-500 mb-5">The requested food item does not exist or has been removed.</p>
          <Link
            to="/restaurants"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5A1F] text-white rounded-xl text-xs font-bold hover:bg-[#ea4e15] transition shadow-md shadow-orange-500/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore Menu</span>
          </Link>
        </div>
      </div>
    );
  }

  const cartItem = cartItems.find(i => i.id === item.id);
  const qty = cartItem ? cartItem.quantity : 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <CustomerNavbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#FF5A1F] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Food Details Main Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Dish Image */}
          <div className="md:w-1/2 relative bg-slate-100 h-64 md:h-auto min-h-[300px]">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            {/* Veg / Non-Veg badge */}
            <div className="absolute top-4 left-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md ${
                  item.isVeg ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                {item.isVeg ? 'Vegetarian' : 'Non-Veg'}
              </span>
            </div>
          </div>

          {/* Details Content */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category */}
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF5A1F]">
                {item.category}
              </span>

              {/* Title & Rating */}
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1 mb-2">
                {item.name}
              </h1>

              <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                <div className="flex items-center gap-1 font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{item.rating || 4.5}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-slate-600 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.prepTime || '20 mins'}</span>
                </div>
                <span>•</span>
                <span className={item.status === 'Available' ? 'text-emerald-600 font-bold' : 'text-rose-500 font-bold'}>
                  {item.status === 'Available' ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Price */}
              <div className="text-3xl font-black text-slate-900 mb-4">
                ₹{item.price}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Ingredients */}
              {item.ingredients && (
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                  <span className="font-bold text-slate-700 block mb-1">Key Ingredients:</span>
                  <span className="text-slate-600 leading-relaxed">{item.ingredients}</span>
                </div>
              )}
            </div>

            {/* Action Bottom */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Total Price</span>
                <div className="text-xl font-black text-slate-900">
                  ₹{item.price * Math.max(1, qty)}
                </div>
              </div>

              <div>
                {qty === 0 ? (
                  <button
                    onClick={() => addToCart(item)}
                    disabled={item.status !== 'Available'}
                    className="px-6 py-3 bg-[#FF5A1F] hover:bg-[#ea4e15] disabled:opacity-50 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md shadow-orange-500/25 flex items-center gap-2 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Add to Cart</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-3 bg-orange-50 border border-orange-200/80 rounded-xl px-4 py-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-white text-orange-700 flex items-center justify-center hover:bg-orange-100 transition active:scale-90"
                    >
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    </button>
                    <span className="text-base font-black text-orange-900 min-w-[20px] text-center">
                      {qty}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-[#FF5A1F] text-white flex items-center justify-center hover:bg-[#ea4e15] transition active:scale-90"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
