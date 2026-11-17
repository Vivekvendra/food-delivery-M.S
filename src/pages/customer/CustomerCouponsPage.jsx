import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomerNavbar from '../../components/layout/CustomerNavbar';
import { useCart } from '../../context/CartContext';
import { 
  Tag, 
  Copy, 
  Check, 
  Calculator, 
  ArrowRight, 
  Sparkles, 
  Percent, 
  Clock, 
  ShoppingBag,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function CustomerCouponsPage() {
  const { applyCoupon, appliedCoupon } = useCart();
  const navigate = useNavigate();

  const [copiedCode, setCopiedCode] = useState(null);

  // Discount Calculator State
  const [calcAmount, setCalcAmount] = useState('600');
  const [selectedCalcCoupon, setSelectedCalcCoupon] = useState('COUPON50');

  const coupons = [
    {
      code: 'COUPON50',
      title: 'Flat ₹50 OFF',
      description: 'Get flat ₹50 discount on all orders above ₹299 across all partner restaurants.',
      minOrder: 299,
      type: 'Fixed',
      value: 50,
      expiry: 'Valid till Dec 31, 2026',
      badge: 'Best Value'
    },
    {
      code: 'FOOD50',
      title: '50% OFF up to ₹100',
      description: 'Enjoy 50% discount on your delicious food orders. Maximum discount up to ₹100.',
      minOrder: 199,
      type: 'Percent',
      value: 50,
      maxDiscount: 100,
      expiry: 'Valid till Nov 30, 2026',
      badge: 'Popular'
    },
    {
      code: 'WELCOME20',
      title: '20% OFF First Order',
      description: 'Welcome to FoodExpress! Get 20% off on your first order with zero delivery fee.',
      minOrder: 249,
      type: 'Percent',
      value: 20,
      maxDiscount: 150,
      expiry: 'Valid for new users',
      badge: 'New User'
    },
    {
      code: 'FREESHIP',
      title: 'Free Delivery (₹50 OFF)',
      description: 'Enjoy 100% free delivery on all orders above ₹499 without distance caps.',
      minOrder: 499,
      type: 'Fixed',
      value: 50,
      expiry: 'Valid everyday',
      badge: 'Free Shipping'
    }
  ];

  // Copy Code to Clipboard
  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code ${code} copied to clipboard! 📋`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Direct Apply to Cart
  const handleApplyToCart = (code) => {
    const success = applyCoupon(code);
    if (success) {
      toast.success(`Coupon ${code} applied to your active cart! 🎉`);
      navigate('/cart');
    }
  };

  // Calculate discount for calculator widget
  const calculateSavings = () => {
    const bill = parseFloat(calcAmount) || 0;
    const c = coupons.find(i => i.code === selectedCalcCoupon) || coupons[0];
    
    if (bill < c.minOrder) {
      return { savings: 0, finalPayable: bill, eligible: false, diff: c.minOrder - bill };
    }

    let savings = 0;
    if (c.type === 'Fixed') {
      savings = c.value;
    } else {
      savings = Math.min((bill * c.value) / 100, c.maxDiscount || 100);
    }
    savings = Math.min(savings, bill);
    const finalPayable = Math.max(0, bill - savings);

    return { savings, finalPayable, eligible: true };
  };

  const calcResults = calculateSavings();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <CustomerNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <span>Coupons & Special Offers</span>
              <Sparkles className="w-6 h-6 text-[#FF5A1F]" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Save more on every order with handpicked food vouchers & instant discounts
            </p>
          </div>

          <Link
            to="/cart"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5A1F] hover:bg-[#ea4e15] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-orange-500/25 transition cursor-pointer self-start sm:self-auto"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
            <span>Go to Cart</span>
          </Link>
        </div>

        {/* Two-Column Grid: Coupons List & Discount Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Coupons Cards */}
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Available Vouchers ({coupons.length})
            </h2>

            <div className="space-y-4">
              {coupons.map((c) => {
                const isApplied = appliedCoupon?.code === c.code;

                return (
                  <div
                    key={c.code}
                    className={`bg-white rounded-3xl p-6 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5 ${
                      isApplied
                        ? 'border-emerald-300 ring-2 ring-emerald-500/20 shadow-md'
                        : 'border-slate-100 hover:border-slate-200 shadow-xs'
                    }`}
                  >
                    {/* Left: Coupon Details */}
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-black text-base sm:text-lg text-slate-900 px-3 py-1 bg-slate-100 rounded-xl tracking-wider border border-slate-200">
                          {c.code}
                        </span>
                        <span className="text-[10px] font-black uppercase px-2.5 py-0.5 bg-orange-100 text-[#FF5A1F] rounded-full">
                          {c.badge}
                        </span>
                        {isApplied && (
                          <span className="text-[10px] font-black uppercase px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Currently Applied</span>
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                        {c.title}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed max-w-lg">
                        {c.description}
                      </p>

                      <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium pt-1">
                        <span>Min Order: <strong className="text-slate-700">₹{c.minOrder}</strong></span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{c.expiry}</span>
                        </span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      
                      {/* Copy Code */}
                      <button
                        onClick={() => handleCopyCode(c.code)}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        {copiedCode === c.code ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>

                      {/* Apply to Cart */}
                      <button
                        onClick={() => handleApplyToCart(c.code)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FF5A1F] hover:bg-[#ea4e15] active:scale-95 text-white transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-orange-500/20"
                      >
                        <span>Apply to Cart</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Interactive Discount Calculator */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Discount Calculator
            </h2>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-md space-y-5">
              
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#FF5A1F] flex items-center justify-center">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Estimate Your Savings</h3>
                  <p className="text-[11px] text-slate-400">See real-time discount calculations</p>
                </div>
              </div>

              {/* Enter Bill Amount */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Cart Order Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
                  />
                </div>
              </div>

              {/* Pick Coupon */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Select Promotional Code
                </label>
                <select
                  value={selectedCalcCoupon}
                  onChange={(e) => setSelectedCalcCoupon(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  {coupons.map(c => (
                    <option key={c.code} value={c.code}>
                      {c.code} — {c.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Calculation Breakdown Result Box */}
              <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100 space-y-2.5 text-xs">
                {calcResults.eligible ? (
                  <>
                    <div className="flex justify-between text-slate-600">
                      <span>Order Value:</span>
                      <span className="font-bold text-slate-900">₹{parseFloat(calcAmount) || 0}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount Savings:</span>
                      <span>-₹{calcResults.savings}</span>
                    </div>
                    <div className="pt-2 border-t border-orange-200/60 flex justify-between font-black text-sm text-slate-900">
                      <span>Final Payable:</span>
                      <span className="text-base text-[#FF5A1F]">₹{calcResults.finalPayable}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-rose-600 font-medium text-[11px] leading-relaxed">
                    ⚠️ Add ₹{calcResults.diff} more to your cart to be eligible for {selectedCalcCoupon}.
                  </p>
                )}
              </div>

              {/* Button to Apply */}
              <button
                onClick={() => handleApplyToCart(selectedCalcCoupon)}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Apply {selectedCalcCoupon} to Cart</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
