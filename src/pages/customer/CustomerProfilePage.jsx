import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CustomerNavbar from '../../components/layout/CustomerNavbar';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  MapPin, 
  ShoppingBag, 
  CreditCard, 
  Tag, 
  LogOut, 
  Pencil, 
  Plus, 
  Home, 
  Building2, 
  Trash2, 
  Check, 
  Camera, 
  Mail, 
  Phone, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function CustomerProfilePage() {
  const { 
    currentUser, 
    updateProfile, 
    addAddress, 
    updateAddress, 
    deleteAddress, 
    setDefaultAddress, 
    logout 
  } = useAuth();
  
  const navigate = useNavigate();

  // Active Tab state
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'addresses' | 'orders' | 'payments' | 'coupons'

  // Modals state
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Edit Profile Form State
  const [nameInput, setNameInput] = useState(currentUser?.fullName || 'Vivek Vendra');
  const [emailInput, setEmailInput] = useState(currentUser?.email || 'vivekvendra17@gmail.com');
  const [phoneInput, setPhoneInput] = useState(currentUser?.mobile || '+91 98765 43210');
  const [avatarInput, setAvatarInput] = useState(currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80');

  // Address Form State
  const [addressType, setAddressType] = useState('Home');
  const [addressText, setAddressText] = useState('');
  const [isDefaultCheck, setIsDefaultCheck] = useState(false);

  // Default fallback addresses matching Screen 12
  const savedAddresses = currentUser?.addresses && currentUser.addresses.length > 0
    ? currentUser.addresses
    : [
        { id: 'addr_1', type: 'Home', address: 'D.No: 12-34, MVP Colony, Visakhapatnam - 530017', isDefault: true },
        { id: 'addr_2', type: 'Office', address: 'Offshore Towers, Dwaraka Nagar, Visakhapatnam - 530016', isDefault: false }
      ];

  // Open Edit Profile
  const handleOpenEditProfile = () => {
    setNameInput(currentUser?.fullName || 'Vivek Vendra');
    setEmailInput(currentUser?.email || 'vivekvendra17@gmail.com');
    setPhoneInput(currentUser?.mobile || '+91 98765 43210');
    setAvatarInput(currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80');
    setIsEditProfileOpen(true);
  };

  // Save Profile Changes
  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!emailInput.trim() || !emailInput.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!phoneInput.trim()) {
      toast.error('Please enter your phone number');
      return;
    }

    updateProfile({
      fullName: nameInput.trim(),
      email: emailInput.trim(),
      mobile: phoneInput.trim(),
      avatar: avatarInput
    });

    setIsEditProfileOpen(false);
    toast.success('Profile details updated successfully! 🎉');
  };

  // Open Add Address Modal
  const handleOpenAddAddress = () => {
    setEditingAddress(null);
    setAddressType('Home');
    setAddressText('');
    setIsDefaultCheck(savedAddresses.length === 0);
    setIsAddressModalOpen(true);
  };

  // Open Edit Address Modal
  const handleOpenEditAddress = (addr) => {
    setEditingAddress(addr);
    setAddressType(addr.type || 'Home');
    setAddressText(addr.address || '');
    setIsDefaultCheck(!!addr.isDefault);
    setIsAddressModalOpen(true);
  };

  // Save Address (Create or Update)
  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!addressText.trim()) {
      toast.error('Please enter complete address');
      return;
    }

    if (editingAddress) {
      updateAddress(editingAddress.id, {
        type: addressType,
        address: addressText.trim(),
        isDefault: isDefaultCheck
      });
      toast.success('Address updated successfully!');
    } else {
      addAddress({
        type: addressType,
        address: addressText.trim(),
        isDefault: isDefaultCheck
      });
      toast.success('New address added to your profile!');
    }

    setIsAddressModalOpen(false);
  };

  // Delete Address
  const handleDeleteAddress = (id, type) => {
    if (savedAddresses.length <= 1) {
      toast.warn('You must keep at least one saved delivery address.');
      return;
    }
    deleteAddress(id);
    toast.info(`${type} address deleted.`);
  };

  // Set Default Address
  const handleSetDefault = (id) => {
    setDefaultAddress(id);
    toast.success('Default delivery address updated.');
  };

  // Logout Handler
  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully');
    navigate('/login');
  };

  // Profile Avatar Presets for quick selection
  const avatarPresets = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80'
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      
      {/* Customer Top Navbar */}
      <CustomerNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Two-Column Grid matching Screen 12 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Card (Dark Menu matching Screen 12 `#111827`) */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-[#111827] rounded-3xl p-4 shadow-xl overflow-hidden divide-y divide-slate-800/80">
              
              {/* Profile Links */}
              <div className="space-y-1.5 pb-3">
                
                {/* 1. My Profile Tab (Active orange) */}
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-150 cursor-pointer ${
                    activeTab === 'profile'
                      ? 'bg-[#FF5A1F] text-white shadow-md shadow-orange-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <User className="w-4 h-4 flex-shrink-0" />
                  <span>My Profile</span>
                </button>

                {/* 2. Addresses Tab */}
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-150 cursor-pointer ${
                    activeTab === 'addresses'
                      ? 'bg-[#FF5A1F] text-white shadow-md shadow-orange-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>Addresses</span>
                </button>

                {/* 3. Orders Tab */}
                <button
                  onClick={() => navigate('/track-order')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all duration-150 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 flex-shrink-0" />
                  <span>Orders</span>
                </button>

                {/* 4. Payments Tab */}
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-150 cursor-pointer ${
                    activeTab === 'payments'
                      ? 'bg-[#FF5A1F] text-white shadow-md shadow-orange-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <CreditCard className="w-4 h-4 flex-shrink-0" />
                  <span>Payments</span>
                </button>

                {/* 5. Coupons Tab */}
                <button
                  onClick={() => setActiveTab('coupons')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-150 cursor-pointer ${
                    activeTab === 'coupons'
                      ? 'bg-[#FF5A1F] text-white shadow-md shadow-orange-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Tag className="w-4 h-4 flex-shrink-0" />
                  <span>Coupons</span>
                </button>

              </div>

              {/* Logout Tab */}
              <div className="pt-3">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-150 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 flex-shrink-0" />
                  <span>Logout</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right Main Content Area matching Screen 12 */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            
            {/* Header: "My Profile" & "Edit Profile" Button matching Screen 12 */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  My Profile
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  Manage your personal information and delivery addresses
                </p>
              </div>

              <button
                onClick={handleOpenEditProfile}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5A1F] hover:bg-[#ea4e15] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-orange-500/25 transition cursor-pointer"
              >
                <Pencil className="w-4 h-4 stroke-[2.5]" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Card 1: User Profile Card matching Screen 12 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
              
              {/* Profile Image */}
              <div className="relative group">
                <img
                  src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"}
                  alt={currentUser?.fullName || "Vivek Vendra"}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-orange-100 shadow-md"
                />
                <button
                  onClick={handleOpenEditProfile}
                  className="absolute bottom-1 right-1 p-2 rounded-full bg-[#FF5A1F] text-white shadow-md hover:bg-[#ea4e15] transition cursor-pointer"
                  title="Change profile photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* User Details */}
              <div className="flex-1 text-center sm:text-left space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {currentUser?.fullName || "Vivek Vendra"}
                  </h2>
                  <span className="inline-flex items-center self-center sm:self-auto gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Customer
                  </span>
                </div>

                <div className="space-y-1 text-xs sm:text-sm text-slate-500">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-slate-700">
                      {currentUser?.email || "vivekvendra17@gmail.com"}
                    </span>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-slate-700">
                      {currentUser?.mobile || "+91 98765 43210"}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400">
                  <span>Foodie Member since <strong>Jan 2026</strong></span>
                  <span>•</span>
                  <span>Tier: <strong className="text-orange-600">Gold Gourmet</strong></span>
                </div>
              </div>

            </div>

            {/* Card 2: Saved Addresses Card matching Screen 12 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Saved Addresses ({savedAddresses.length})
                </h3>

                <button
                  onClick={handleOpenAddAddress}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#FF5A1F] hover:text-[#ea4e15] hover:underline cursor-pointer transition"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add New</span>
                </button>
              </div>

              {/* Address List matching Screen 12 screenshot */}
              <div className="space-y-4">
                {savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      addr.isDefault
                        ? 'border-orange-200 bg-orange-50/20'
                        : 'border-slate-100 bg-white hover:border-slate-200'
                    }`}
                  >
                    {/* Address Icon & Text */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#FF5A1F] flex items-center justify-center flex-shrink-0 mt-0.5">
                        {addr.type === 'Office' ? (
                          <Building2 className="w-5 h-5" />
                        ) : (
                          <Home className="w-5 h-5" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                            {addr.type || 'Home'}
                          </span>
                          {addr.isDefault && (
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-md border border-emerald-200">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xl">
                          {addr.address}
                        </p>
                      </div>
                    </div>

                    {/* Actions: Edit, Delete, Set Default */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {!addr.isDefault && (
                        <button
                          onClick={() => handleSetDefault(addr.id)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                        >
                          Set Default
                        </button>
                      )}

                      <button
                        onClick={() => handleOpenEditAddress(addr)}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                        title="Edit Address"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteAddress(addr.id, addr.type)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        title="Delete Address"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>

            {/* Card 3: Payments & Wallet Preview (If clicked or shown) */}
            {activeTab === 'payments' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-4 animate-in fade-in duration-200">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Saved Payment Options
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-slate-700" />
                      <div>
                        <p className="font-bold text-slate-900 text-sm">HDFC Bank Debit Card</p>
                        <p className="text-xs text-slate-400 font-mono">•••• •••• •••• 8921</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded">VISA</span>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                        ₹
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">Google Pay UPI</p>
                        <p className="text-xs text-slate-400 font-mono">vivek@okhdfcbank</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded">Verified</span>
                  </div>
                </div>
              </div>
            )}

            {/* Card 4: Coupons Preview */}
            {activeTab === 'coupons' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-4 animate-in fade-in duration-200">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Your Available Coupons
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border border-orange-200 bg-orange-50/30 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-black text-[#FF5A1F] text-base">COUPON50</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-orange-100 text-orange-800 rounded">Flat ₹50 OFF</span>
                    </div>
                    <p className="text-xs text-slate-600">Applicable on orders above ₹299</p>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-black text-slate-900 text-base">FOOD50</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">50% OFF</span>
                    </div>
                    <p className="text-xs text-slate-600">Up to ₹100 on first 3 orders</p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </main>

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Pencil className="w-4 h-4 text-[#FF5A1F]" />
                <span>Edit Profile</span>
              </h3>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              
              {/* Avatar Selector */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Select Profile Avatar</label>
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={avatarInput}
                    alt="Preview"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-500"
                  />
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {avatarPresets.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setAvatarInput(preset)}
                        className={`w-9 h-9 rounded-full overflow-hidden border-2 transition cursor-pointer ${
                          avatarInput === preset ? 'border-orange-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={preset} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="url"
                  placeholder="Or paste custom image URL..."
                  value={avatarInput}
                  onChange={(e) => setAvatarInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              {/* Full Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
                />
              </div>

              {/* Mobile Phone Number */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Phone Number *</label>
                <input
                  type="text"
                  required
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#FF5A1F] hover:bg-[#ea4e15] text-white font-bold rounded-xl shadow-md transition cursor-pointer"
                >
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#FF5A1F]" />
                <span>{editingAddress ? 'Edit Address' : 'Add New Address'}</span>
              </h3>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-4 text-xs">
              
              {/* Type selector */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Address Label</label>
                <div className="flex gap-2">
                  {['Home', 'Office', 'Other'].map(type => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setAddressType(type)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                        addressType === type
                          ? 'bg-[#FF5A1F] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Complete Address */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Complete Delivery Address *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. D.No: 12-34, MVP Colony, Visakhapatnam - 530017"
                  value={addressText}
                  onChange={(e) => setAddressText(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
                />
              </div>

              {/* Default checkbox */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isDefaultCheck}
                  onChange={(e) => setIsDefaultCheck(e.target.checked)}
                  className="w-4 h-4 text-[#FF5A1F] rounded focus:ring-orange-500"
                />
                <span className="font-semibold text-slate-700">Set as default delivery address</span>
              </label>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#FF5A1F] hover:bg-[#ea4e15] text-white font-bold rounded-xl shadow-md transition cursor-pointer"
                >
                  {editingAddress ? 'Update Address' : 'Save Address'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
