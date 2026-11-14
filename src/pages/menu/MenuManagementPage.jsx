import React, { useState, useMemo } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useMenu } from '../../context/MenuContext';
import MenuItemModal from '../../components/menu/MenuItemModal';
import FoodDetailsModal from '../../components/menu/FoodDetailsModal';
import DeleteConfirmModal from '../../components/menu/DeleteConfirmModal';
import Pagination from '../../components/restaurants/Pagination';
import { 
  Search, 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  ChevronDown, 
  SlidersHorizontal,
  UtensilsCrossed,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function MenuManagementPage() {
  const { 
    menuItems, 
    addMenuItem, 
    updateMenuItem, 
    deleteMenuItem, 
    toggleAvailability 
  } = useMenu();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [vegFilter, setVegFilter] = useState('All'); // 'All' | 'Veg' | 'NonVeg'
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'priceLow' | 'priceHigh'

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Selected row checkboxes
  const [selectedIds, setSelectedIds] = useState([]);

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [viewingItem, setViewingItem] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);

  const categories = [
    'All',
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

  // Filtering & Sorting
  const filteredItems = useMemo(() => {
    return menuItems
      .filter((item) => {
        // Search query
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchDesc = item.description?.toLowerCase().includes(q);
          const matchCat = item.category?.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat) return false;
        }

        // Category filter
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
          return false;
        }

        // Status filter
        if (selectedStatus !== 'All' && item.status !== selectedStatus) {
          return false;
        }

        // Veg / Non-Veg filter
        if (vegFilter === 'Veg' && !item.isVeg) return false;
        if (vegFilter === 'NonVeg' && item.isVeg) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priceLow') return a.price - b.price;
        if (sortBy === 'priceHigh') return b.price - a.price;
        return 0;
      });
  }, [menuItems, searchTerm, selectedCategory, selectedStatus, vegFilter, sortBy]);

  // Paginated items
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  // Handle Select All Checkbox
  const isAllSelected = paginatedItems.length > 0 && paginatedItems.every(i => selectedIds.includes(i.id));
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(prev => prev.filter(id => !paginatedItems.some(item => item.id === id)));
    } else {
      const pageIds = paginatedItems.map(i => i.id);
      setSelectedIds(prev => Array.from(new Set([...prev, ...pageIds])));
    }
  };

  const toggleSelectRow = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // Add & Edit Handlers
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setIsFormModalOpen(true);
  };

  const handleSaveItem = (itemData) => {
    if (editingItem) {
      updateMenuItem(editingItem.id, itemData);
    } else {
      addMenuItem(itemData);
    }
  };

  const handleOpenDeleteModal = (item) => {
    setDeletingItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleOpenDetails = (item) => {
    setViewingItem(item);
    setIsDetailsModalOpen(true);
  };

  return (
    <DashboardLayout
      title="Menu Management"
      subtitle="Manage food items, add, edit or remove menu items."
    >
      <div className="space-y-6">
        
        {/* Top Header Controls: Title & "+ Add Menu Item" matching Screen 7 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Menu Items Catalog
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Total {menuItems.length} dishes in system
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FF5A1F] hover:bg-[#ea4e15] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-orange-500/25 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Menu Item</span>
          </button>
        </div>

        {/* Search & Filter Toolbar matching Screen 7 */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F] transition"
            />
          </div>

          {/* Filters & Dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 py-2 pl-3 pr-7 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer shadow-2xs"
              >
                {categories.map(c => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'Category: All' : c}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 py-2 pl-3 pr-7 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer shadow-2xs"
              >
                <option value="All">Status: All</option>
                <option value="Available">Available</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Veg / Non-Veg Toggle Pills */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs font-bold text-slate-600">
              <button
                onClick={() => setVegFilter('All')}
                className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${
                  vegFilter === 'All' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setVegFilter('Veg')}
                className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                  vegFilter === 'Veg' ? 'bg-white text-emerald-700 shadow-2xs' : 'hover:text-emerald-700'
                }`}
              >
                <span>🟢</span>
                <span>Veg</span>
              </button>
              <button
                onClick={() => setVegFilter('NonVeg')}
                className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                  vegFilter === 'NonVeg' ? 'bg-white text-rose-700 shadow-2xs' : 'hover:text-rose-700'
                }`}
              >
                <span>🔴</span>
                <span>Non-Veg</span>
              </button>
            </div>

            {/* Sort by Price */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 py-2 pl-3 pr-7 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer shadow-2xs"
              >
                <option value="default">Sort: Default</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

          </div>

        </div>

        {/* Menu Items Table matching Screen 7 */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-wider bg-slate-50/50">
                  <th className="py-4 pl-6 pr-2 w-10">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-slate-300 text-[#FF5A1F] accent-[#FF5A1F] cursor-pointer"
                    />
                  </th>
                  <th className="py-4 px-3 font-semibold">Image</th>
                  <th className="py-4 px-4 font-semibold">Food Name</th>
                  <th className="py-4 px-4 font-semibold">Category</th>
                  <th className="py-4 px-4 font-semibold">Price</th>
                  <th className="py-4 px-4 font-semibold">Status</th>
                  <th className="py-4 pr-6 pl-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedItems.map((item) => {
                  const isChecked = selectedIds.includes(item.id);
                  const isAvailable = item.status === 'Available';

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/80 transition ${isChecked ? 'bg-orange-50/30' : ''}`}
                    >
                      {/* Checkbox */}
                      <td className="py-4 pl-6 pr-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectRow(item.id)}
                          className="w-4 h-4 rounded border-slate-300 text-[#FF5A1F] accent-[#FF5A1F] cursor-pointer"
                        />
                      </td>

                      {/* Image Thumbnail */}
                      <td className="py-4 px-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          onClick={() => handleOpenDetails(item)}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 cursor-pointer hover:scale-105 transition"
                          loading="lazy"
                        />
                      </td>

                      {/* Food Name + Veg Indicator */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-3 h-3 rounded-sm border flex items-center justify-center flex-shrink-0 ${
                              item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                            }`}
                            title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                          </span>
                          <span
                            onClick={() => handleOpenDetails(item)}
                            className="font-bold text-slate-800 hover:text-[#FF5A1F] transition cursor-pointer"
                          >
                            {item.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 max-w-xs">
                          {item.description}
                        </p>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 font-semibold text-slate-600 text-xs whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                          {item.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 font-black text-slate-900 whitespace-nowrap">
                        ₹{item.price}
                      </td>

                      {/* Availability Status Badge */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleAvailability(item.id)}
                          title="Click to toggle availability"
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                            isAvailable
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/80 hover:bg-emerald-100'
                              : 'bg-rose-50 text-rose-600 border border-rose-200/80 hover:bg-rose-100'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                          <span>{item.status}</span>
                        </button>
                      </td>

                      {/* Action Buttons: View, Edit, Delete */}
                      <td className="py-4 pr-6 pl-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          {/* Details Eye button */}
                          <button
                            onClick={() => handleOpenDetails(item)}
                            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                            title="View Food Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit Pencil button */}
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-2 rounded-xl text-amber-600 bg-amber-50 hover:bg-amber-100 transition cursor-pointer"
                            title="Edit Menu Item"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          {/* Delete Trash button */}
                          <button
                            onClick={() => handleOpenDeleteModal(item)}
                            className="p-2 rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 transition cursor-pointer"
                            title="Delete Menu Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FF5A1F] flex items-center justify-center mx-auto mb-3">
                <UtensilsCrossed className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No dishes match your filter</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto mb-4">
                Try searching for something else or clear filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedStatus('All');
                  setVegFilter('All');
                  setSortBy('default');
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Pagination matching ‹ 1 2 3 › */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-slate-100">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}

        </div>

      </div>

      {/* Modals */}
      <MenuItemModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveItem}
        item={editingItem}
      />

      <FoodDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        item={viewingItem}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          if (deletingItem) deleteMenuItem(deletingItem.id);
        }}
        itemName={deletingItem?.name}
      />
    </DashboardLayout>
  );
}
