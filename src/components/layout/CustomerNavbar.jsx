import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  ShoppingCart, 
  LayoutDashboard, 
  User, 
  LogOut, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { ChefHatIcon } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function CustomerNavbar({ searchTerm = '', onSearchChange }) {
  const { currentUser, logout } = useAuth();
  const { totalItemsCount } = useCart();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/restaurants" className="flex items-center gap-2 flex-shrink-0 group">
          <ChefHatIcon className="w-8 h-8" color="#FF5A1F" />
          <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Food<span className="text-[#FF5A1F]">Express</span>
          </span>
        </Link>

        {/* Global Search Bar matching screenshot */}
        <div className="flex-1 max-w-lg mx-2 sm:mx-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search restaurants, cuisines..."
              value={searchTerm}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F] transition shadow-2xs"
            />
          </div>
        </div>

        {/* Right Controls: Notifications, Cart & Profile */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          
          {/* Admin Switch Shortcut (helpful to toggle between user & admin views) */}
          <Link
            to="/dashboard"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-orange-700 bg-orange-50 hover:bg-orange-100/80 transition"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Admin Dashboard</span>
          </Link>

          {/* Notifications Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF5A1F] rounded-full ring-2 ring-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 px-4 z-50 animate-in fade-in duration-150">
                <div className="text-xs font-bold text-slate-900 pb-2 border-b border-slate-100">
                  Notifications
                </div>
                <div className="py-2.5 text-xs text-slate-600">
                  <p className="font-semibold text-slate-800">🎉 Flat 50% OFF on first order!</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Use code FOOD50 at checkout.</p>
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon with Counter Badge */}
          <Link
            to="/cart"
            className="relative p-2.5 rounded-full text-slate-600 hover:text-[#FF5A1F] hover:bg-slate-100 transition cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-[#FF5A1F] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {totalItemsCount}
              </span>
            )}
          </Link>

          {/* Profile Avatar & Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-orange-200 transition cursor-pointer"
            >
              <img
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"}
                alt={currentUser?.fullName || "User"}
                className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
              />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-800 truncate">{currentUser?.fullName || 'Vivek Vendra'}</p>
                  <p className="text-[11px] text-slate-400 truncate">{currentUser?.email || 'admin@foodexpress.com'}</p>
                </div>

                <div className="py-1">
                  <Link
                    to="/dashboard"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition"
                  >
                    <LayoutDashboard className="w-4 h-4 text-slate-400" />
                    <span>Admin Dashboard</span>
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Profile</span>
                  </Link>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                      navigate('/login');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
