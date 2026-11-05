import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Store, 
  UtensilsCrossed, 
  ShoppingBag, 
  Users, 
  Tag, 
  CreditCard, 
  BarChart3, 
  UserCircle, 
  LogOut,
  X
} from 'lucide-react';
import { ChefHatIcon } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export default function Sidebar({ isOpen, onClose }) {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Restaurants', icon: Store, path: '/restaurants' },
    { name: 'Menu Items', icon: UtensilsCrossed, path: '/menu-items' },
    { name: 'Orders', icon: ShoppingBag, path: '/orders' },
    { name: 'Customers', icon: Users, path: '/customers' },
    { name: 'Coupons', icon: Tag, path: '/coupons' },
    { name: 'Payments', icon: CreditCard, path: '/payments' },
    { name: 'Reports', icon: BarChart3, path: '/reports' },
    { name: 'Profile', icon: UserCircle, path: '/profile' },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-[#111827] text-slate-300 select-none">
      {/* Brand Header */}
      <div>
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <ChefHatIcon className="w-8 h-8" color="#f97316" />
            <span className="text-xl font-black text-white tracking-tight">
              Food<span className="text-orange-500">Express</span>
            </span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-orange-600 text-white font-semibold shadow-md shadow-orange-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-slate-800/80">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-150 cursor-pointer"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden md:flex flex-col w-64 h-screen fixed inset-y-0 left-0 z-30 shadow-xl">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Backdrop + Slide Over) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#111827] shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
