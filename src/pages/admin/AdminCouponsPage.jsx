import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Tag, Plus, Check, Percent, Clock, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([
    {
      id: 'cp_1',
      code: 'COUPON50',
      description: 'Flat ₹50 OFF on orders above ₹299',
      discountType: 'Fixed',
      discountValue: 50,
      minOrder: 299,
      validUntil: 'Dec 31, 2026',
      usageCount: 342,
      status: 'Active'
    },
    {
      id: 'cp_2',
      code: 'FOOD50',
      description: '50% OFF up to ₹100 on first 3 orders',
      discountType: 'Percentage',
      discountValue: 50,
      minOrder: 199,
      validUntil: 'Nov 30, 2026',
      usageCount: 812,
      status: 'Active'
    },
    {
      id: 'cp_3',
      code: 'WELCOME20',
      description: '20% OFF on all gourmet restaurants',
      discountType: 'Percentage',
      discountValue: 20,
      minOrder: 249,
      validUntil: 'Dec 15, 2026',
      usageCount: 194,
      status: 'Active'
    },
    {
      id: 'cp_4',
      code: 'FREESHIP',
      description: 'Free delivery on orders above ₹499',
      discountType: 'Fixed',
      discountValue: 50,
      minOrder: 499,
      validUntil: 'Dec 31, 2026',
      usageCount: 420,
      status: 'Active'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newVal, setNewVal] = useState('50');

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!newCode.trim()) {
      toast.error('Please enter coupon code');
      return;
    }
    const created = {
      id: `cp_${Date.now()}`,
      code: newCode.toUpperCase().trim(),
      description: newDesc || `Flat ₹${newVal} off on food orders`,
      discountType: 'Fixed',
      discountValue: parseInt(newVal) || 50,
      minOrder: 299,
      validUntil: 'Dec 31, 2026',
      usageCount: 0,
      status: 'Active'
    };
    setCoupons([created, ...coupons]);
    setNewCode('');
    setNewDesc('');
    setIsAddModalOpen(false);
    toast.success(`Coupon ${created.code} activated!`);
  };

  const handleDelete = (id, code) => {
    setCoupons(coupons.filter(c => c.id !== id));
    toast.info(`Coupon ${code} removed.`);
  };

  return (
    <DashboardLayout
      title="Coupons & Discounts"
      subtitle="Configure promotional discount codes, manage validity, and track coupon usages."
    >
      <div className="space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Promotional Coupons
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Total {coupons.length} promotional campaigns running
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5A1F] hover:bg-[#ea4e15] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-orange-500/25 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create Coupon</span>
          </button>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF5A1F] flex items-center justify-center font-bold">
                    <Tag className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono font-black text-slate-900 text-lg tracking-wider">
                      {coupon.code}
                    </span>
                    <span className="ml-2 text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">
                      {coupon.status}
                    </span>
                    <p className="text-xs text-slate-500 mt-1">{coupon.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(coupon.id, coupon.code)}
                  className="p-2 text-slate-300 hover:text-rose-500 transition cursor-pointer"
                  title="Delete coupon"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div>Min Order: <strong className="text-slate-800">₹{coupon.minOrder}</strong></div>
                <div>Used: <strong className="text-slate-800">{coupon.usageCount} times</strong></div>
                <div>Valid till: <strong className="text-slate-800">{coupon.validUntil}</strong></div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Add Coupon Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">Create New Coupon</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleAddCoupon} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SUPER50"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Discount Amount (₹)</label>
                <input
                  type="number"
                  value={newVal}
                  onChange={(e) => setNewVal(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Offer Description</label>
                <input
                  type="text"
                  placeholder="e.g. Flat ₹50 off on all weekend orders"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#FF5A1F] text-white font-bold rounded-xl shadow-md"
                >
                  Activate Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}
