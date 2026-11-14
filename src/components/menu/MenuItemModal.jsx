import React, { useState, useEffect } from 'react';
import { X, UtensilsCrossed, Upload, Image as ImageIcon } from 'lucide-react';

export default function MenuItemModal({ isOpen, onClose, onSave, item = null }) {
  const isEditing = !!item;

  const [formData, setFormData] = useState({
    name: '',
    category: 'Biryani',
    price: '',
    status: 'Available',
    isVeg: true,
    image: '',
    description: '',
    ingredients: '',
    prepTime: '20 mins',
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        category: item.category || 'Biryani',
        price: item.price || '',
        status: item.status || 'Available',
        isVeg: item.isVeg !== undefined ? item.isVeg : true,
        image: item.image || '',
        description: item.description || '',
        ingredients: item.ingredients || '',
        prepTime: item.prepTime || '20 mins',
      });
    } else {
      setFormData({
        name: '',
        category: 'Biryani',
        price: '',
        status: 'Available',
        isVeg: true,
        image: '',
        description: '',
        ingredients: '',
        prepTime: '20 mins',
      });
    }
  }, [item, isOpen]);

  if (!isOpen) return null;

  const categories = [
    'Biryani',
    'Starters',
    'Curries',
    'Rice',
    'Burgers',
    'Pizza',
    'Sides',
    'Desserts',
    'Beverages'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      return;
    }
    onSave({
      ...formData,
      price: parseFloat(formData.price),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#FF5A1F] flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 leading-tight">
                {isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {isEditing ? 'Update food dish details and price' : 'Add a delicious dish to the catalog'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Dish Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Food Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Special Hyderabadi Dum Biryani"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
              required
            />
          </div>

          {/* Category & Price (2 Columns) */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F] cursor-pointer"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Price (₹) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                step="1"
                min="1"
                placeholder="249"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
                required
              />
            </div>
          </div>

          {/* Status & Veg/Non-Veg (2 Columns) */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Availability Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F] cursor-pointer"
              >
                <option value="Available">Available</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Food Type
              </label>
              <div className="flex items-center gap-4 py-2.5">
                <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="radio"
                    name="isVeg"
                    checked={formData.isVeg === true}
                    onChange={() => setFormData({ ...formData, isVeg: true })}
                    className="w-4 h-4 text-emerald-600 accent-emerald-600 cursor-pointer"
                  />
                  <span className="text-emerald-700">🟢 Veg</span>
                </label>

                <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="radio"
                    name="isVeg"
                    checked={formData.isVeg === false}
                    onChange={() => setFormData({ ...formData, isVeg: false })}
                    className="w-4 h-4 text-rose-600 accent-rose-600 cursor-pointer"
                  />
                  <span className="text-rose-700">🔴 Non-Veg</span>
                </label>
              </div>
            </div>
          </div>

          {/* Image URL with Preview */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Food Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Description
            </label>
            <textarea
              rows="3"
              placeholder="Describe the aroma, taste, ingredients and specialty of this dish..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
            />
          </div>

          {/* Ingredients & Prep Time (2 Columns) */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Key Ingredients
              </label>
              <input
                type="text"
                placeholder="Rice, Spices, Ghee..."
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Prep Time
              </label>
              <input
                type="text"
                placeholder="20 mins"
                value={formData.prepTime}
                onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#FF5A1F] hover:bg-[#ea4e15] active:scale-[0.99] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-orange-500/25 transition cursor-pointer"
            >
              {isEditing ? 'Save Changes' : 'Add Item'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
