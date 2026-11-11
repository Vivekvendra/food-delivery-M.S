import React, { useState, useEffect, useMemo } from 'react';
import CustomerNavbar from '../../components/layout/CustomerNavbar';
import RestaurantCard from '../../components/restaurants/RestaurantCard';
import RestaurantFilters from '../../components/restaurants/RestaurantFilters';
import RestaurantSkeleton from '../../components/restaurants/RestaurantSkeleton';
import Pagination from '../../components/restaurants/Pagination';
import { fetchRestaurants } from '../../services/restaurantService';
import { UtensilsCrossed, RefreshCw, AlertCircle } from 'lucide-react';

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [onlyOpen, setOnlyOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchRestaurants();
      if (res.success) {
        setRestaurants(res.data);
      } else {
        setError(res.error || 'Failed to fetch restaurants.');
      }
    } catch (err) {
      setError('An error occurred while loading restaurants.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered & Sorted list
  const filteredRestaurants = useMemo(() => {
    return restaurants
      .filter((rest) => {
        // Search filter
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchName = rest.name.toLowerCase().includes(query);
          const matchCuisine = rest.cuisine.toLowerCase().includes(query);
          const matchDish = rest.menu?.some(d => d.name.toLowerCase().includes(query));
          if (!matchName && !matchCuisine && !matchDish) return false;
        }

        // Cuisine filter
        if (selectedCuisine !== 'All') {
          if (!rest.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase())) {
            return false;
          }
        }

        // Rating filter
        if (selectedRating !== 'all') {
          const minRating = parseFloat(selectedRating);
          if (rest.rating < minRating) return false;
        }

        // Only Open filter
        if (onlyOpen && !rest.isOpen) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'deliveryTime') {
          return a.deliveryTimeMinutes - b.deliveryTimeMinutes;
        }
        if (sortBy === 'deliveryFee') {
          return a.deliveryFee - b.deliveryFee;
        }
        // default: popularity
        return b.popularity - a.popularity;
      });
  }, [restaurants, searchTerm, selectedCuisine, selectedRating, sortBy, onlyOpen]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCuisine, selectedRating, sortBy, onlyOpen]);

  // Paginated slice
  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);
  const paginatedRestaurants = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredRestaurants.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredRestaurants, currentPage, itemsPerPage]);

  const hasActiveFilters = searchTerm !== '' || selectedCuisine !== 'All' || selectedRating !== 'all' || onlyOpen;

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCuisine('All');
    setSelectedRating('all');
    setSortBy('popularity');
    setOnlyOpen(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      
      {/* Top Customer Navigation Bar */}
      <CustomerNavbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Filters Bar matching Card 5 */}
        <RestaurantFilters
          totalCount={filteredRestaurants.length}
          selectedCuisine={selectedCuisine}
          onCuisineChange={setSelectedCuisine}
          selectedRating={selectedRating}
          onRatingChange={setSelectedRating}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onlyOpen={onlyOpen}
          onToggleOnlyOpen={() => setOnlyOpen(!onlyOpen)}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Loading State: Skeletons */}
        {loading && <RestaurantSkeleton count={6} />}

        {/* Error State with Retry Button */}
        {!loading && error && (
          <div className="bg-white rounded-3xl p-8 border border-red-100 shadow-xs text-center max-w-md mx-auto my-12">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Failed to load restaurants</h3>
            <p className="text-xs text-slate-500 mb-4">{error}</p>
            <button
              onClick={loadData}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF5A1F] text-white rounded-xl text-xs font-bold hover:bg-[#ea4e15] transition cursor-pointer shadow-md shadow-orange-500/20"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Empty State when no results match filters */}
        {!loading && !error && filteredRestaurants.length === 0 && (
          <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xs text-center max-w-lg mx-auto my-10">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 text-[#FF5A1F] flex items-center justify-center mx-auto mb-4">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">No restaurants found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto mb-5">
              We couldn't find any restaurants matching your current search or filter criteria.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#FF5A1F] text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-[#ea4e15] transition cursor-pointer shadow-md shadow-orange-500/20"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Restaurant Cards Grid matching Card 5 */}
        {!loading && !error && paginatedRestaurants.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                />
              ))}
            </div>

            {/* Pagination matching ‹ 1 2 3 4 5 › */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

      </main>
    </div>
  );
}
