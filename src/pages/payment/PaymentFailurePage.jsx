import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import CustomerNavbar from '../../components/layout/CustomerNavbar';
import { 
  XCircle, 
  RotateCcw, 
  CreditCard, 
  AlertTriangle, 
  PhoneCall, 
  ArrowLeft, 
  ShieldAlert,
  HelpCircle,
  ShoppingBag
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function PaymentFailurePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const errorMessage = location.state?.error || 'Transaction was declined by issuing bank (ERR_BANK_AUTH_FAILED)';
  const attemptedAmount = location.state?.amount || 627;
  const attemptedMethod = location.state?.method || 'Credit / Debit Card';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <CustomerNavbar />

      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-12 flex flex-col items-center justify-center">
        
        {/* Main Failure Container */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-100 shadow-xl w-full text-center space-y-6 animate-in zoom-in-95 duration-200">
          
          {/* Failure Alert Icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center ring-8 ring-rose-50/50 shadow-md">
            <XCircle className="w-10 h-10 stroke-[2.5]" />
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Payment Failed
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              Transaction Unsuccessful
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              We couldn't process your payment. Don't worry, if any money was deducted, it will be automatically refunded within 24 hours.
            </p>
          </div>

          {/* Error Details Box */}
          <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100 text-left space-y-2 text-xs">
            <div className="flex items-start gap-2.5 text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Error Reason:</span>
                <p className="text-rose-700 mt-0.5 font-medium">{errorMessage}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-rose-200/60 flex justify-between text-slate-600">
              <span>Attempted Amount:</span>
              <strong className="text-slate-900 font-black">₹{attemptedAmount}</strong>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Attempted Payment Mode:</span>
              <span className="font-bold text-slate-800">{attemptedMethod}</span>
            </div>
          </div>

          {/* Troubleshooting Tips */}
          <div className="bg-slate-50 rounded-2xl p-4 text-left text-xs space-y-1.5 text-slate-600">
            <p className="font-bold text-slate-800 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span>Recommended Solutions:</span>
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-500 text-[11px] pl-1">
              <li>Ensure your card has online international / domestic e-commerce transactions enabled.</li>
              <li>Verify your card CVV and expiration date or try paying with Google Pay / UPI.</li>
              <li>Check with your bank if an SMS OTP limit was reached.</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-[#FF5A1F] hover:bg-[#ea4e15] active:scale-[0.99] text-white font-bold rounded-xl text-sm shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 stroke-[2.5]" />
              <span>Retry Payment</span>
            </button>

            <div className="flex gap-2">
              <Link
                to="/checkout"
                className="flex-1 py-2.5 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs rounded-xl bg-white hover:bg-slate-50 transition flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                <span>Change Method</span>
              </Link>

              <button
                onClick={() => toast.info('Connecting to 24/7 customer support representative...')}
                className="flex-1 py-2.5 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs rounded-xl bg-white hover:bg-slate-50 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
                <span>Contact Support</span>
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/cart"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Cart</span>
            </Link>
          </div>

        </div>

      </main>
    </div>
  );
}
