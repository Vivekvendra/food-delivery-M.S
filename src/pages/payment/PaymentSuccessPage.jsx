import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import CustomerNavbar from '../../components/layout/CustomerNavbar';
import { useOrders } from '../../context/OrderContext';
import { 
  Check, 
  ShieldCheck, 
  ArrowRight, 
  Bike, 
  Download, 
  Home, 
  Sparkles,
  Receipt,
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentOrder } = useOrders();

  // Retrieve passed order data from route state or fall back to currentOrder
  const order = location.state?.order || currentOrder;
  const txnId = location.state?.txnId || `TXN_${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <CustomerNavbar />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-12 flex flex-col items-center justify-center">
        
        {/* Main Success Container */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-100 shadow-xl w-full text-center space-y-6 animate-in zoom-in-95 duration-200">
          
          {/* Animated Success Badge */}
          <div className="relative mx-auto w-20 h-20">
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center ring-8 ring-emerald-50/50 shadow-md">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FF5A1F] text-white flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Transaction Successful
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              Payment Completed!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              Your payment has been received and verified. The kitchen has begun preparing your food.
            </p>
          </div>

          {/* Transaction Receipt Card */}
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100 text-left space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200/80">
              <span className="text-slate-400 font-medium">Transaction Reference</span>
              <span className="font-mono font-bold text-slate-800">{txnId}</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-200/80">
              <span className="text-slate-400 font-medium">Order Number</span>
              <span className="font-mono font-black text-[#FF5A1F]">{order?.orderNumber || '#ORD10056'}</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-200/80">
              <span className="text-slate-400 font-medium">Payment Mode</span>
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-slate-500" />
                <span>{order?.paymentMethod || 'Credit / Debit Card'}</span>
              </span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-200/80">
              <span className="text-slate-400 font-medium">Estimated Arrival</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {order?.estimatedDeliveryTime || '11:20 AM (25 mins)'}
              </span>
            </div>

            <div className="flex justify-between items-center pt-1 text-sm font-black text-slate-900">
              <span>Total Amount Paid</span>
              <span className="text-base text-slate-900">₹{order?.totalAmount || 627}</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-2">
            <Link
              to={`/track-order/${order?.id || 'ORD10056'}`}
              className="w-full py-3.5 bg-[#FF5A1F] hover:bg-[#ea4e15] active:scale-[0.99] text-white font-bold rounded-xl text-sm shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Bike className="w-4 h-4 stroke-[2.5]" />
              <span>Track Live Delivery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex gap-2">
              <button
                onClick={() => toast.success('Payment receipt downloaded as PDF!')}
                className="flex-1 py-2.5 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs rounded-xl bg-white hover:bg-slate-50 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Download Receipt</span>
              </button>

              <Link
                to="/my-orders"
                className="flex-1 py-2.5 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs rounded-xl bg-white hover:bg-slate-50 transition flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Receipt className="w-3.5 h-3.5 text-slate-400" />
                <span>View My Orders</span>
              </Link>
            </div>
          </div>

          {/* Safe Checkout trust seal */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-100">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Secure Transaction verified by FoodExpress Payment Gateway</span>
          </div>

        </div>

      </main>
    </div>
  );
}
