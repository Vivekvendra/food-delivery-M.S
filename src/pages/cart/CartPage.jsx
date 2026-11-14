import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomerNavbar from '../../components/layout/CustomerNavbar';
import { useCart } from '../../context/CartContext';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  Tag, 
  Check, 
  ShoppingBag, 
  ArrowRight,
  ShieldCheck,
  Bike
} from 'lucide-react';

export default function CartPage() {
  const {
    cartItems,
    activeRestaurant,
    appliedCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    totalItemsCount,
    subtotal,
    deliveryCharges,
    discountAmount,
    totalAmount,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      
      {/* Customer Top Navbar */}
      <CustomerNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Cart Title & Clear Button matching Screen 8 */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>My Cart</span>
              <span className="text-slate-400 font-bold text-lg sm:text-xl">
                ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
              </span>
            </h1>
            {activeRestaurant && (
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Ordering from <span className="font-bold text-slate-800">{activeRestaurant.name}</span>
              </p>
            )}
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Cart</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center max-w-lg mx-auto shadow-xs border border-slate-100 my-8">
            <div className="w-20 h-20 rounded-3xl bg-orange-50 text-[#FF5A1F] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 stroke-[1.8]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto mb-6 leading-relaxed">
              Looks like you haven't added anything to your cart yet. Explore our delicious restaurants!
            </p>
            <Link
              to="/restaurants"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5A1F] hover:bg-[#ea4e15] active:scale-95 text-white font-bold text-sm rounded-xl shadow-md shadow-orange-500/25 transition cursor-pointer"
            >
              <span>Explore Restaurants</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Two Column Cart Layout matching Screen 8 */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition"
                  >
                    {/* Item Image & Info */}
                    <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover flex-shrink-0 bg-slate-100 border border-slate-200"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {item.restaurantName || activeRestaurant?.name}
                        </p>
                        <div className="text-sm sm:text-base font-black text-slate-900 mt-1">
                          ₹{item.price}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Selector & Delete Button matching Screen 8 */}
                    <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                      <div className="flex items-center gap-2 sm:gap-2.5 bg-slate-100 rounded-xl px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-lg bg-white text-slate-700 flex items-center justify-center hover:bg-slate-200 transition active:scale-90"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                        <span className="text-sm font-extrabold text-slate-900 min-w-[18px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-lg bg-white text-slate-700 flex items-center justify-center hover:bg-slate-200 transition active:scale-90"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>

                      {/* Remove Trash */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* "+ Add more items" Link matching Screen 8 */}
              <div className="pt-2">
                <Link
                  to="/restaurants"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#FF5A1F] hover:text-[#ea4e15] hover:underline transition"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add more items</span>
                </Link>
              </div>

            </div>

            {/* Right Column: Cart Summary Card matching Screen 8 */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-4">
              
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-md space-y-5">
                <h2 className="text-lg font-black text-slate-900 tracking-tight pb-3 border-b border-slate-100">
                  Cart Summary
                </h2>

                {/* Breakdown */}
                <div className="space-y-3 text-xs sm:text-sm">
                  {/* Items Subtotal */}
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Items ({totalItemsCount})</span>
                    <span className="font-bold text-slate-900">₹{subtotal}</span>
                  </div>

                  {/* Delivery Charges */}
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      <Bike className="w-3.5 h-3.5 text-slate-400" />
                      <span>Delivery Charges</span>
                    </span>
                    <span className="font-bold text-slate-900">₹{deliveryCharges}</span>
                  </div>

                  {/* Discount */}
                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-emerald-600 font-bold">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Discount ({appliedCoupon?.code})</span>
                      </span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                </div>

                {/* Coupon Code Input & Apply Box */}
                <div className="pt-3 border-t border-slate-100">
                  {!appliedCoupon ? (
                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Coupon code (e.g. COUPON50)"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                            className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold tracking-wider placeholder:font-sans placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400 pl-1">
                        Tip: Try <span className="font-bold text-[#FF5A1F]">COUPON50</span> or <span className="font-bold text-[#FF5A1F]">FOOD50</span>
                      </p>
                    </form>
                  ) : (
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-emerald-900 font-mono">{appliedCoupon.code}</p>
                          <p className="text-[10px] text-emerald-700">₹{discountAmount} savings applied</p>
                        </div>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Total Amount Line */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-base font-black text-slate-900">Total Amount</span>
                  <span className="text-2xl font-black text-slate-900">₹{totalAmount}</span>
                </div>

                {/* Proceed to Checkout Button matching Screen 8 */}
                <button
                  onClick={() => {
                    navigate('/checkout');
                  }}
                  className="w-full py-3.5 px-4 bg-[#FF5A1F] hover:bg-[#ea4e15] active:scale-[0.99] text-white font-bold rounded-xl shadow-md shadow-orange-500/25 text-sm sm:text-base flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Safe Checkout notice */}
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Safe and secure 256-bit encrypted checkout</span>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}
