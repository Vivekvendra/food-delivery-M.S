import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CustomerNavbar from '../../components/layout/CustomerNavbar';
import { getRestaurantById } from '../../services/restaurantService';
import { useCart } from '../../context/CartContext';
import { 
  Star, 
  Clock, 
  MapPin, 
  Bike, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Check, 
  AlertCircle,
  ShieldCheck,
  Heart
} from 'lucide-react';

export default function RestaurantDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQuantity } = useCart();

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState('Menu'); // 'Menu' | 'About' | 'Reviews'
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function loadRestaurant() {
      setLoading(true);
      setError(null);
      try {
        const res = await getRestaurantById(id);
        if (res.success) {
          setRestaurant(res.data);
        } else {
          setError(res.error || 'Restaurant not found');
        }
      } catch (err) {
        setError('Failed to load restaurant details.');
      } finally {
        setLoading(false);
      }
    }
    loadRestaurant();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <CustomerNavbar />
        <div className="max-w-5xl mx-auto px-4 py-8 animate-pulse space-y-6">
          <div className="h-64 bg-slate-200 rounded-3xl" />
          <div className="h-8 bg-slate-200 rounded-lg w-1/3" />
          <div className="h-12 bg-slate-200 rounded-2xl w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-36 bg-slate-200 rounded-2xl" />
            <div className="h-36 bg-slate-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <CustomerNavbar />
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Restaurant not found</h2>
          <p className="text-xs text-slate-500 mb-5">{error || "The requested restaurant could not be found."}</p>
          <Link
            to="/restaurants"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5A1F] text-white rounded-xl text-xs font-bold hover:bg-[#ea4e15] transition shadow-md shadow-orange-500/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Restaurants</span>
          </Link>
        </div>
      </div>
    );
  }

  // Filter menu items by selected category
  const filteredMenu = selectedCategory === 'All'
    ? restaurant.menu
    : restaurant.menu?.filter(item => item.category === selectedCategory);

  // Helper to get item count in cart
  const getItemQuantity = (dishId) => {
    const item = cartItems.find(i => i.id === dishId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      
      {/* Customer Top Navbar */}
      <CustomerNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6">
        
        {/* Back navigation button */}
        <div className="mb-4">
          <button
            onClick={() => navigate('/restaurants')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#FF5A1F] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Restaurants</span>
          </button>
        </div>

        {/* Hero Banner Card matching Card 6 */}
        <div className="relative rounded-3xl overflow-hidden shadow-md bg-slate-900 text-white mb-6">
          <div className="relative h-60 sm:h-72 w-full">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover filter brightness-75"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            {/* Open / Closed badge */}
            <div className="absolute top-4 right-4">
              {restaurant.isOpen ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Open Now
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-sm">
                  Closed
                </span>
              )}
            </div>

            {/* Banner Content */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
                {restaurant.name}
              </h1>

              {/* Meta Row: Rating, Cuisine, Time, Fee, Address */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-1 font-bold text-amber-400 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{restaurant.rating}</span>
                  <span className="text-slate-300 font-normal">({restaurant.reviewCount})</span>
                </div>

                <span>•</span>
                <span className="font-medium">{restaurant.cuisine}</span>

                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span>{restaurant.deliveryTime}</span>
                </div>

                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Bike className="w-4 h-4 text-orange-400" />
                  <span>{restaurant.deliveryFee === 0 ? 'Free Delivery' : `₹${restaurant.deliveryFee} Delivery`}</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-2.5">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>{restaurant.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation: Menu | About | Reviews */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-6 select-none">
          {['Menu', 'About', `Reviews (${restaurant.reviewCount})`].map((tab) => {
            const tabName = tab.startsWith('Reviews') ? 'Reviews' : tab;
            const isActive = activeTab === tabName;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tabName)}
                className={`py-3 px-5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#FF5A1F] text-[#FF5A1F]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* TAB 1: MENU */}
        {activeTab === 'Menu' && (
          <div>
            {/* Category Pills matching Card 6 */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none select-none">
              {restaurant.menuCategories?.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-[#FF5A1F] text-white shadow-sm shadow-orange-500/25'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Menu Items List */}
            <div className="space-y-4">
              {filteredMenu?.map((dish) => {
                const qty = getItemQuantity(dish.id);
                return (
                  <div
                    key={dish.id}
                    className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs hover:shadow-md transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    {/* Left: Dish image & info */}
                    <div className="flex items-start gap-4">
                      {/* Dish Image */}
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover flex-shrink-0 bg-slate-100"
                        loading="lazy"
                      />

                      {/* Details */}
                      <div>
                        {/* Veg / Non-Veg badge */}
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                              dish.isVeg ? 'border-emerald-600' : 'border-rose-600'
                            }`}
                            title={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                dish.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                              }`}
                            />
                          </span>
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            {dish.category}
                          </span>
                        </div>

                        {/* Dish Name */}
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          {dish.name}
                        </h4>

                        {/* Description */}
                        <p className="text-xs text-slate-500 mt-1 max-w-xl line-clamp-2">
                          {dish.description}
                        </p>

                        {/* Price */}
                        <div className="text-base sm:text-lg font-black text-slate-900 mt-2">
                          ₹{dish.price}
                        </div>
                      </div>
                    </div>

                    {/* Right: Quantity Selector / Add to Cart Button */}
                    <div className="self-end sm:self-center flex-shrink-0">
                      {qty === 0 ? (
                        <button
                          onClick={() => addToCart(dish, restaurant)}
                          className="px-5 py-2.5 rounded-xl bg-[#FF5A1F] hover:bg-[#ea4e15] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-sm shadow-orange-500/25 flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Plus className="w-4 h-4 stroke-[2.5]" />
                          <span>Add</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-3 bg-orange-50 border border-orange-200/80 rounded-xl px-3 py-1.5">
                          <button
                            onClick={() => updateQuantity(dish.id, -1)}
                            className="w-6 h-6 rounded-lg bg-white text-orange-700 flex items-center justify-center hover:bg-orange-100 transition active:scale-90"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                          <span className="text-sm font-extrabold text-orange-900 min-w-[16px] text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQuantity(dish.id, 1)}
                            className="w-6 h-6 rounded-lg bg-[#FF5A1F] text-white flex items-center justify-center hover:bg-[#ea4e15] transition active:scale-90"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: ABOUT */}
        {activeTab === 'About' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">About {restaurant.name}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {restaurant.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF5A1F] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase">Outlet Address</h4>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">{restaurant.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase">Hygiene & Safety</h4>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">Daily temperature checks & sanitized packaging</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REVIEWS */}
        {activeTab === 'Reviews' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex items-center gap-6">
              <div className="text-center pl-2">
                <div className="text-4xl font-black text-slate-900">{restaurant.rating}</div>
                <div className="flex items-center justify-center gap-0.5 my-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-xs text-slate-400">{restaurant.reviewCount} Reviews</div>
              </div>

              <div className="h-16 w-px bg-slate-200" />

              <div className="text-xs text-slate-500 space-y-1">
                <p className="font-semibold text-slate-700">★ 96% of customers recommend this restaurant</p>
                <p>Taste: 4.8/5 • Delivery: 4.7/5 • Packaging: 4.9/5</p>
              </div>
            </div>

            {/* Sample Reviews */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-slate-800">Suresh Verma</span>
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>5.0</span>
                </div>
              </div>
              <p className="text-xs text-slate-600">
                Super tasty food and delivered steaming hot within 25 minutes! Highly recommended.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-slate-800">Anita Rao</span>
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>4.5</span>
                </div>
              </div>
              <p className="text-xs text-slate-600">
                Portion size is very good for the price. The authentic flavors are spot on.
              </p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
