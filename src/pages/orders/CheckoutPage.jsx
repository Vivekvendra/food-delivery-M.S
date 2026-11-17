import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomerNavbar from '../../components/layout/CustomerNavbar';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { 
  MapPin, 
  CreditCard, 
  Smartphone, 
  Wallet, 
  Check, 
  ShieldCheck, 
  Lock, 
  ArrowLeft, 
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Building2,
  Home,
  Plus,
  AlertCircle
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { 
    cartItems, 
    activeRestaurant, 
    appliedCoupon, 
    subtotal, 
    deliveryCharges, 
    discountAmount, 
    totalAmount,
    totalItemsCount,
    clearCart 
  } = useCart();

  const { placeOrder } = useOrders();

  // Stepper state: currently on 'Payment'
  const [activeStep, setActiveStep] = useState('Payment'); // 'Cart' | 'Address' | 'Payment' | 'Confirmation'

  // Delivery Address State
  const [addresses, setAddresses] = useState([
    {
      id: 'addr_1',
      type: 'Home',
      recipientName: 'Vivek Vendra',
      phone: '+91 98765 43210',
      addressLine: 'D.No: 12-34, MVP Colony, Visakhapatnam - 530017',
      isDefault: true
    },
    {
      id: 'addr_2',
      type: 'Office',
      recipientName: 'Vivek Vendra',
      phone: '+91 98765 43210',
      addressLine: 'Offshore Towers, Dwaraka Nagar, Visakhapatnam - 530016',
      isDefault: false
    }
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState('addr_1');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newAddressText, setNewAddressText] = useState('');
  const [newAddressType, setNewAddressType] = useState('Home');

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'wallet'
  
  // Card Form State
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8921');
  const [cardHolder, setCardHolder] = useState('Vivek Vendra');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('•••');

  // UPI Form State
  const [upiId, setUpiId] = useState('vivek@okhdfcbank');

  // Wallet State
  const [walletBalance] = useState(1200);

  // Placing order loading state
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const activeAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];

  // Handle Add New Address
  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    if (!newAddressText.trim()) {
      toast.error('Please enter an address');
      return;
    }
    const newAddr = {
      id: `addr_${Date.now()}`,
      type: newAddressType,
      recipientName: 'Vivek Vendra',
      phone: '+91 98765 43210',
      addressLine: newAddressText.trim(),
      isDefault: false
    };
    setAddresses(prev => [...prev, newAddr]);
    setSelectedAddressId(newAddr.id);
    setNewAddressText('');
    setIsAddingNewAddress(false);
    setIsAddressModalOpen(false);
    toast.success('Address updated successfully');
  };

  // Handle Checkout / Place Order
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Please add items before checking out.');
      return;
    }

    setIsPlacingOrder(true);

    // Simulate 1s payment gateway roundtrip
    setTimeout(() => {
      const paymentMethodNames = {
        card: 'Credit / Debit Card',
        upi: 'UPI (Google Pay, PhonePe)',
        wallet: 'FoodExpress Wallet'
      };

      const newOrder = placeOrder({
        items: cartItems,
        restaurant: activeRestaurant || {
          id: '1',
          name: 'Biryani House',
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80'
        },
        deliveryAddress: activeAddress,
        paymentMethod: paymentMethodNames[paymentMethod],
        subtotal,
        deliveryCharges,
        discountAmount,
        totalAmount
      });

      // Clear the cart
      clearCart();
      setIsPlacingOrder(false);
      setConfirmedOrder(newOrder);
      setActiveStep('Confirmation');
      toast.success('Order placed successfully! 🎉');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      
      {/* Top Customer Navbar */}
      <CustomerNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Breadcrumb / Stepper matching Screen 9 */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Checkout
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Complete your order details and payment
              </p>
            </div>

            {/* Stepper Progress matching Screen 9 (Cart -> Address -> Payment -> Confirmation) */}
            <div className="flex items-center gap-2 sm:gap-4 self-center sm:self-auto">
              
              {/* Step 1: Cart */}
              <Link to="/cart" className="flex items-center gap-1.5 group">
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-slate-600 hidden sm:inline">Cart</span>
              </Link>

              <div className="w-8 sm:w-12 h-0.5 bg-emerald-500 rounded-full" />

              {/* Step 2: Address */}
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-slate-600 hidden sm:inline">Address</span>
              </div>

              <div className="w-8 sm:w-12 h-0.5 bg-emerald-500 rounded-full" />

              {/* Step 3: Payment (Active) */}
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-full bg-[#FF5A1F] text-white flex items-center justify-center font-black text-xs ring-4 ring-orange-100 shadow-xs">
                  3
                </div>
                <span className="text-xs font-black text-[#FF5A1F] hidden sm:inline">Payment</span>
              </div>

              <div className="w-8 sm:w-12 h-0.5 bg-slate-200 rounded-full" />

              {/* Step 4: Confirmation */}
              <div className="flex items-center gap-1.5 opacity-50">
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <span className="text-xs font-bold text-slate-400 hidden sm:inline">Confirmation</span>
              </div>

            </div>
          </div>
        </div>

        {/* Empty Cart Warning (Prevent empty cart checkout) */}
        {cartItems.length === 0 && !confirmedOrder ? (
          <div className="bg-white rounded-3xl p-10 text-center max-w-lg mx-auto shadow-xs border border-slate-100 my-8">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 stroke-[1.8]" />
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto mb-6">
              You don't have any items in your cart to checkout. Please browse our delicious restaurants and add items first.
            </p>
            <Link
              to="/restaurants"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5A1F] hover:bg-[#ea4e15] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-orange-500/25 transition cursor-pointer"
            >
              <span>Explore Restaurants</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Main Checkout Two-Column Grid matching Screen 9 */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Delivery Address & Payment Method */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              
              {/* 1. Delivery Address Card matching Screen 9 */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    Delivery Address
                  </h2>
                  <button
                    onClick={() => setIsAddressModalOpen(true)}
                    className="text-xs sm:text-sm font-bold text-[#FF5A1F] hover:text-[#ea4e15] hover:underline cursor-pointer transition"
                  >
                    Change
                  </button>
                </div>

                <div className="flex items-start gap-3.5 pt-1">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#FF5A1F] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {activeAddress.type === 'Office' ? (
                      <Building2 className="w-5 h-5" />
                    ) : (
                      <Home className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                        {activeAddress.type}
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-md">
                        Default
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-relaxed">
                      {activeAddress.addressLine}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Recipient: <span className="font-bold text-slate-700">{activeAddress.recipientName}</span> • {activeAddress.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. Select Payment Method matching Screen 9 */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-xs space-y-5">
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight pb-3 border-b border-slate-100">
                  Select Payment Method
                </h2>

                <div className="space-y-3">
                  
                  {/* Option 1: Credit / Debit Card */}
                  <label
                    className={`block p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#FF5A1F] bg-orange-50/20 ring-2 ring-orange-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="w-4 h-4 text-[#FF5A1F] focus:ring-[#FF5A1F]"
                        />
                        <div className="flex items-center gap-2.5">
                          <CreditCard className="w-5 h-5 text-slate-700" />
                          <span className="text-sm font-bold text-slate-900">
                            Credit / Debit Card
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 opacity-80">
                        <span className="text-[10px] font-black tracking-widest px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">
                          VISA
                        </span>
                        <span className="text-[10px] font-black tracking-widest px-1.5 py-0.5 bg-red-100 text-red-800 rounded">
                          MC
                        </span>
                      </div>
                    </div>

                    {/* Card Form Accordion */}
                    {paymentMethod === 'card' && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs animate-in fade-in duration-150">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4532 •••• •••• 8921"
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/YY"
                              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">
                              CVV
                            </label>
                            <input
                              type="password"
                              maxLength={4}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="•••"
                              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="Full Name"
                            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
                          />
                        </div>
                      </div>
                    )}
                  </label>

                  {/* Option 2: UPI (Google Pay, PhonePe, Paytm) */}
                  <label
                    className={`block p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'border-[#FF5A1F] bg-orange-50/20 ring-2 ring-orange-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                          className="w-4 h-4 text-[#FF5A1F] focus:ring-[#FF5A1F]"
                        />
                        <div className="flex items-center gap-2.5">
                          <Smartphone className="w-5 h-5 text-slate-700" />
                          <span className="text-sm font-bold text-slate-900">
                            UPI (Google Pay, PhonePe, Paytm)
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                        Fastest
                      </span>
                    </div>

                    {paymentMethod === 'upi' && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-in fade-in duration-150">
                        <label className="block text-[11px] font-bold text-slate-600">
                          Enter UPI Virtual Payment Address (VPA)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="username@okhdfcbank"
                            className="flex-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
                          />
                          <button
                            type="button"
                            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
                          >
                            Verify
                          </button>
                        </div>
                      </div>
                    )}
                  </label>

                  {/* Option 3: Wallet (FoodExpress Wallet) */}
                  <label
                    className={`block p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                      paymentMethod === 'wallet'
                        ? 'border-[#FF5A1F] bg-orange-50/20 ring-2 ring-orange-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="wallet"
                          checked={paymentMethod === 'wallet'}
                          onChange={() => setPaymentMethod('wallet')}
                          className="w-4 h-4 text-[#FF5A1F] focus:ring-[#FF5A1F]"
                        />
                        <div className="flex items-center gap-2.5">
                          <Wallet className="w-5 h-5 text-slate-700" />
                          <span className="text-sm font-bold text-slate-900">
                            Wallet (FoodExpress Wallet)
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-slate-700">
                        Balance: ₹{walletBalance}
                      </span>
                    </div>

                    {paymentMethod === 'wallet' && (
                      <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                        <p className="flex items-center gap-1.5 text-emerald-700 font-bold">
                          <Check className="w-4 h-4" />
                          Sufficient balance available to cover this order.
                        </p>
                      </div>
                    )}
                  </label>

                </div>
              </div>

            </div>

            {/* Right Column: Order Summary Card matching Screen 9 */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-4">
              
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-md space-y-5">
                <h2 className="text-lg font-black text-slate-900 tracking-tight pb-3 border-b border-slate-100">
                  Order Summary
                </h2>

                {/* Items Breakdown matching Screen 9 screenshot */}
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Items ({totalItemsCount})</span>
                    <span className="font-bold text-slate-900">₹{subtotal}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span>Delivery Charges</span>
                    <span className="font-bold text-slate-900">₹{deliveryCharges}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-emerald-600 font-bold">
                      <span>Discount ({appliedCoupon?.code || 'COUPON50'})</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                </div>

                {/* Total Line matching Screen 9 (Total Payable ₹627) */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-base font-black text-slate-900">Total Payable</span>
                  <span className="text-2xl font-black text-slate-900">₹{totalAmount}</span>
                </div>

                {/* Big Orange Button: "Pay ₹627" */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder || cartItems.length === 0}
                  className="w-full py-4 px-4 bg-[#FF5A1F] hover:bg-[#ea4e15] active:scale-[0.99] disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/25 text-base flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  {isPlacingOrder ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 stroke-[2.5]" />
                      <span>Pay ₹{totalAmount}</span>
                    </>
                  )}
                </button>

                {/* Simulate Payment Failure button for testing Module 9 */}
                <button
                  type="button"
                  onClick={() => {
                    navigate('/payment/failure', {
                      state: {
                        amount: totalAmount,
                        method: paymentMethod === 'card' ? 'Credit / Debit Card' : paymentMethod === 'upi' ? 'UPI' : 'Wallet',
                        error: 'Payment declined by issuer bank (ERR_INSUFFICIENT_FUNDS)'
                      }
                    });
                  }}
                  className="w-full text-center text-[11px] font-semibold text-slate-400 hover:text-rose-500 transition py-1"
                >
                  ⚡ Test Payment Failure Screen (Module 9 Demo)
                </button>

                {/* Trust Seal matching Screen 9 */}
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Secured by 256-bit encryption</span>
                </div>

              </div>

              {/* Delivery Info Snippet */}
              <div className="bg-orange-50/60 rounded-2xl p-4 border border-orange-100 text-xs text-orange-900 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#FF5A1F] flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Your food will be prepared fresh and hot. Live tracking will begin immediately after payment confirmation.
                </p>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* Address Selection / Change Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">Choose Delivery Address</h3>
              <button
                onClick={() => {
                  setIsAddressModalOpen(false);
                  setIsAddingNewAddress(false);
                }}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {!isAddingNewAddress ? (
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => {
                      setSelectedAddressId(addr.id);
                      setIsAddressModalOpen(false);
                      toast.info(`Selected ${addr.type} address`);
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-start justify-between gap-3 ${
                      selectedAddressId === addr.id
                        ? 'border-[#FF5A1F] bg-orange-50/30'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">{addr.type}</span>
                        {selectedAddressId === addr.id && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-orange-100 text-[#FF5A1F] rounded">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{addr.addressLine}</p>
                    </div>
                    {selectedAddressId === addr.id && (
                      <Check className="w-5 h-5 text-[#FF5A1F] flex-shrink-0" />
                    )}
                  </div>
                ))}

                <button
                  onClick={() => setIsAddingNewAddress(true)}
                  className="w-full py-3 border-2 border-dashed border-slate-200 hover:border-[#FF5A1F] hover:bg-orange-50/20 text-[#FF5A1F] font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Address</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSaveNewAddress} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Address Label</label>
                  <div className="flex gap-2">
                    {['Home', 'Office', 'Other'].map(type => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setNewAddressType(type)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                          newAddressType === type
                            ? 'bg-[#FF5A1F] text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Complete Address</label>
                  <textarea
                    rows={3}
                    value={newAddressText}
                    onChange={(e) => setNewAddressText(e.target.value)}
                    placeholder="House/Flat No, Building, Street, Landmark, City & Pincode"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNewAddress(false)}
                    className="flex-1 py-2.5 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#FF5A1F] hover:bg-[#ea4e15] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Order Confirmation Modal (Appears immediately upon placing order) */}
      {confirmedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-md w-full p-7 text-center shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto shadow-sm ring-8 ring-emerald-50/50">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                Payment Received
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                Order Placed Successfully!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your order is confirmed and sent to the kitchen.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Order ID</span>
                <span className="font-mono font-bold text-slate-900">{confirmedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Estimated Delivery</span>
                <span className="font-bold text-orange-600">{confirmedOrder.estimatedDeliveryTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Amount Paid</span>
                <span className="font-bold text-slate-900">₹{confirmedOrder.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Restaurant</span>
                <span className="font-bold text-slate-800">{confirmedOrder.restaurantName}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => navigate(`/track-order/${confirmedOrder.id}`)}
                className="w-full py-3 bg-[#FF5A1F] hover:bg-[#ea4e15] active:scale-[0.98] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Track Your Order</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/payment/success', { state: { order: confirmedOrder, txnId: `TXN_${Math.floor(100000 + Math.random() * 900000)}` } })}
                className="w-full py-2.5 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>View Payment Receipt & Details</span>
              </button>

              <button
                onClick={() => navigate('/restaurants')}
                className="w-full py-2 text-slate-500 hover:text-slate-800 font-semibold rounded-xl text-xs transition cursor-pointer"
              >
                Continue Browsing Restaurants
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
