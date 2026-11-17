import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { fetchRestaurants } from '../../services/restaurantService';
import { 
  Store, 
  Plus, 
  Search, 
  Star, 
  Clock, 
  MapPin, 
  ExternalLink, 
  Pencil, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  Filter,
  Eye
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function AdminRestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Open' | 'Closed'
  const [cuisineFilter, setCuisineFilter] = useState('All');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    cuisine: 'Indian',
    rating: '4.5',
    deliveryTime: '25-35 min',
    deliveryCharges: 40,
    address: 'Visakhapatnam',
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=80'
  });

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await fetchRestaurants();
        if (res.success) {
          setRestaurants(res.data);
        }
      } catch (e) {
        toast.error('Failed to load restaurants.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const cuisines = useMemo(() => {
    const set = new Set(['All']);
    restaurants.forEach(r => {
      if (r.cuisine) set.add(r.cuisine);
    });
    return Array.from(set);
  }, [restaurants]);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(r => {
      const matchSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.cuisine?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.address?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'All' ? true : statusFilter === 'Open' ? r.isOpen : !r.isOpen;
      const matchCuisine = cuisineFilter === 'All' ? true : r.cuisine === cuisineFilter;
      return matchSearch && matchStatus && matchCuisine;
    });
  }, [restaurants, searchTerm, statusFilter, cuisineFilter]);

  // Toggle restaurant open/closed status
  const handleToggleStatus = (id) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id === id) {
        const nextState = !r.isOpen;
        toast.info(`${r.name} is now ${nextState ? 'OPEN for orders' : 'CLOSED'}`);
        return { ...r, isOpen: nextState };
      }
      return r;
    }));
  };

  // Delete restaurant
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from partner restaurants?`)) {
      setRestaurants(prev => prev.filter(r => r.id !== id));
      toast.success(`${name} removed successfully.`);
    }
  };

  // Add restaurant
  const handleSaveRestaurant = (e) => {
    e.preventDefault();
    if (!newRestaurant.name.trim()) {
      toast.error('Please enter restaurant name');
      return;
    }
    const created = {
      ...newRestaurant,
      id: `rest_${Date.now()}`,
      rating: parseFloat(newRestaurant.rating) || 4.2,
      deliveryCharges: parseInt(newRestaurant.deliveryCharges) || 40,
      totalOrders: 0
    };
    setRestaurants(prev => [created, ...prev]);
    setIsAddModalOpen(false);
    setNewRestaurant({
      name: '',
      cuisine: 'Indian',
      rating: '4.5',
      deliveryTime: '25-35 min',
      deliveryCharges: 40,
      address: 'Visakhapatnam',
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=80'
    });
    toast.success(`"${created.name}" added to partner network!`);
  };

  return (
    <DashboardLayout
      title="Restaurants Management"
      subtitle="Manage partner restaurants, update operating status, cuisines, and menus."
    >
      <div className="space-y-6">
        
        {/* Top Control Header */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Partner Restaurants
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Total {restaurants.length} partner outlets on FoodExpress
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/restaurants"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs sm:text-sm bg-white hover:bg-slate-50 transition"
            >
              <ExternalLink className="w-4 h-4 text-slate-400" />
              <span>Customer Storefront</span>
            </Link>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5A1F] hover:bg-[#ea4e15] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-orange-500/25 transition cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Restaurant</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by restaurant name, cuisine, address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 py-2 px-3 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="All">Status: All</option>
              <option value="Open">Status: Open</option>
              <option value="Closed">Status: Closed</option>
            </select>

            <select
              value={cuisineFilter}
              onChange={(e) => setCuisineFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 py-2 px-3 rounded-xl focus:outline-none cursor-pointer"
            >
              {cuisines.map(c => (
                <option key={c} value={c}>
                  {c === 'All' ? 'Cuisine: All' : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Restaurants Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-slate-200 rounded-3xl" />
            ))}
          </div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100">
            <Store className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No restaurants found</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Card Cover */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <button
                        onClick={() => handleToggleStatus(restaurant.id)}
                        className={`px-3 py-1 rounded-full text-xs font-black shadow-md flex items-center gap-1.5 transition cursor-pointer ${
                          restaurant.isOpen
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-900/80 backdrop-blur-md text-white'
                        }`}
                        title="Click to toggle status"
                      >
                        <span className={`w-2 h-2 rounded-full ${restaurant.isOpen ? 'bg-white' : 'bg-rose-400'}`} />
                        <span>{restaurant.isOpen ? 'OPEN' : 'CLOSED'}</span>
                      </button>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-black text-slate-900 shadow-md flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{restaurant.rating}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-black text-slate-900 text-lg leading-tight">
                          {restaurant.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#FF5A1F] mt-0.5">
                          {restaurant.cuisine}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>{restaurant.deliveryTime} • ₹{restaurant.deliveryCharges} Delivery Fee</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{restaurant.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                  <Link
                    to={`/restaurants/${restaurant.id}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#FF5A1F] transition"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Menu</span>
                  </Link>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleStatus(restaurant.id)}
                      className={`p-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                        restaurant.isOpen
                          ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                      title={restaurant.isOpen ? 'Set as Closed' : 'Set as Open'}
                    >
                      {restaurant.isOpen ? 'Close' : 'Open'}
                    </button>

                    <button
                      onClick={() => handleDelete(restaurant.id, restaurant.name)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      title="Delete restaurant"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Add Restaurant Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Store className="w-5 h-5 text-[#FF5A1F]" />
                <span>Add Partner Restaurant</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveRestaurant} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Restaurant Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Bawarchi Biryani"
                  value={newRestaurant.name}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cuisine Type</label>
                  <input
                    type="text"
                    placeholder="e.g. Biryani, Indian"
                    value={newRestaurant.cuisine}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, cuisine: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={newRestaurant.rating}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, rating: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Delivery Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 30-40 min"
                    value={newRestaurant.deliveryTime}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, deliveryTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Delivery Charges (₹)</label>
                  <input
                    type="number"
                    value={newRestaurant.deliveryCharges}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, deliveryCharges: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Address / Location</label>
                <input
                  type="text"
                  placeholder="e.g. Siripuram, Visakhapatnam"
                  value={newRestaurant.address}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={newRestaurant.image}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#FF5A1F] hover:bg-[#ea4e15] text-white font-bold rounded-xl shadow-md transition cursor-pointer"
                >
                  Save Restaurant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}
