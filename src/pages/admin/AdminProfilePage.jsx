import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, Shield, KeyRound, Check } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AdminProfilePage() {
  const { currentUser } = useAuth();
  const [name, setName] = useState(currentUser?.fullName || 'Vivek Vendra');
  const [email] = useState(currentUser?.email || 'admin@foodexpress.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [role] = useState('Super Administrator');

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Admin profile updated successfully!');
  };

  return (
    <DashboardLayout
      title="Admin Profile"
      subtitle="Manage your platform credentials, admin privileges, and contact details."
    >
      <div className="max-w-4xl space-y-6">
        
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
            <img
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"}
              alt={name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-orange-100 shadow-md"
            />
            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">{name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 font-bold text-xs border border-orange-200">
                  {role}
                </span>
              </div>
              <p className="text-xs text-slate-500">{email}</p>
              <p className="text-xs text-slate-400">System Admin since Jan 2026 • Full Access</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="pt-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address (Read Only)</label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-semibold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Security Role</label>
                <input
                  type="text"
                  disabled
                  value={role}
                  className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-semibold cursor-not-allowed"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#FF5A1F] hover:bg-[#ea4e15] text-white font-bold rounded-xl shadow-md transition cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

      </div>
    </DashboardLayout>
  );
}
