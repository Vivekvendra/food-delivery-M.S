import React, { useState } from 'react';
import { 
  Plus, 
  Store, 
  UtensilsCrossed, 
  Tag, 
  BarChart3, 
  X, 
  Check, 
  Percent,
  Upload
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function QuickActions() {
  const [activeModal, setActiveModal] = useState(null); // 'restaurant' | 'menu' | 'coupon' | 'report' | null

  // Local form states
  const [restaurantName, setRestaurantName] = useState('');
  const [cuisine, setCuisine] = useState('Indian');
  const [rating, setRating] = useState('4.5');

  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('Biryani');
  const [itemPrice, setItemPrice] = useState('');
  const [isVeg, setIsVeg] = useState(false);

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState('20');

  const handleAddRestaurant = (e) => {
    e.preventDefault();
    if (!restaurantName.trim()) {
      toast.error('Please enter restaurant name');
      return;
    }
    toast.success(`Restaurant "${restaurantName}" added successfully!`);
    setRestaurantName('');
    setActiveModal(null);
  };

  const handleAddMenuItem = (e) => {
    e.preventDefault();
    if (!itemName.trim() || !itemPrice) {
      toast.error('Please enter item name and price');
      return;
    }
    toast.success(`Menu item "${itemName}" (₹${itemPrice}) added successfully!`);
    setItemName('');
    setItemPrice('');
    setActiveModal(null);
  };

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }
    toast.success(`Coupon code "${couponCode.toUpperCase()}" with ${discountPercent}% discount activated!`);
    setCouponCode('');
    setActiveModal(null);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
      <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mb-4">
        Quick Actions
      </h2>

      {/* 2x2 Grid of Actions matching screenshot buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto">
        {/* Add Restaurant */}
        <button
          onClick={() => setActiveModal('restaurant')}
          className="flex items-center gap-2.5 p-3.5 rounded-xl border border-orange-200/80 bg-orange-50/50 hover:bg-orange-100/70 text-orange-700 transition duration-150 active:scale-[0.98] text-left cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
            <Plus className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-bold">Add Restaurant</span>
        </button>

        {/* Add Menu Item */}
        <button
          onClick={() => setActiveModal('menu')}
          className="flex items-center gap-2.5 p-3.5 rounded-xl border border-emerald-200/80 bg-emerald-50/50 hover:bg-emerald-100/70 text-emerald-700 transition duration-150 active:scale-[0.98] text-left cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
            <UtensilsCrossed className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-bold">Add Menu Item</span>
        </button>

        {/* Create Coupon */}
        <button
          onClick={() => setActiveModal('coupon')}
          className="flex items-center gap-2.5 p-3.5 rounded-xl border border-purple-200/80 bg-purple-50/50 hover:bg-purple-100/70 text-purple-700 transition duration-150 active:scale-[0.98] text-left cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
            <Tag className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-bold">Create Coupon</span>
        </button>

        {/* View Reports */}
        <button
          onClick={() => setActiveModal('report')}
          className="flex items-center gap-2.5 p-3.5 rounded-xl border border-sky-200/80 bg-sky-50/50 hover:bg-sky-100/70 text-sky-700 transition duration-150 active:scale-[0.98] text-left cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
            <BarChart3 className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-bold">View Reports</span>
        </button>
      </div>

      {/* Modal 1: Add Restaurant */}
      {activeModal === 'restaurant' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-black text-slate-900">Add New Restaurant</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRestaurant} className="py-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Restaurant Name</label>
                <input
                  type="text"
                  placeholder="e.g. Royal Spice Kitchen"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cuisine Type</label>
                <select
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                >
                  <option value="Indian">Indian (Biryani, North & South)</option>
                  <option value="Italian">Italian (Pizza, Pasta)</option>
                  <option value="Chinese">Chinese (Noodles, Dimsum)</option>
                  <option value="American">American (Burgers, Fast Food)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Initial Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Time</label>
                  <input
                    type="text"
                    defaultValue="30-40 min"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-xs transition shadow-md shadow-orange-600/20"
                >
                  Save Restaurant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Add Menu Item */}
      {activeModal === 'menu' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-black text-slate-900">Add Menu Item</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMenuItem} className="py-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Item Name</label>
                <input
                  type="text"
                  placeholder="e.g. Special Hyderabadi Dum Biryani"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="Biryani">Biryani</option>
                    <option value="Starters">Starters</option>
                    <option value="Curries">Curries</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    placeholder="249"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVeg}
                    onChange={(e) => setIsVeg(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 accent-emerald-600"
                  />
                  <span className="text-xs font-semibold text-slate-700">Vegetarian Item</span>
                </label>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition shadow-md shadow-emerald-600/20"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Create Coupon */}
      {activeModal === 'coupon' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-black text-slate-900">Create Discount Coupon</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="py-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Coupon Code</label>
                <input
                  type="text"
                  placeholder="e.g. FOOD50, FESTIVE30"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold tracking-wider"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Discount Percentage (%)</label>
                <input
                  type="number"
                  min="5"
                  max="80"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  required
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs transition shadow-md shadow-purple-600/20"
                >
                  Activate Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 4: Reports Summary */}
      {activeModal === 'report' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-sky-600" />
                <h3 className="text-lg font-black text-slate-900">Performance Reports</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-semibold">Average Order Value</p>
                  <p className="text-lg font-black text-slate-900">₹348.50</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  ▲ +6.2%
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-semibold">Average Delivery Time</p>
                  <p className="text-lg font-black text-slate-900">28 mins</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  ▼ 4 mins faster
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 font-semibold">Customer Retention Rate</p>
                  <p className="text-lg font-black text-slate-900">84.2%</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  ▲ +3.8%
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-bold text-xs transition cursor-pointer"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
