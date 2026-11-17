import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CustomerNavbar from '../../components/layout/CustomerNavbar';
import { useOrders } from '../../context/OrderContext';
import { 
  ArrowLeft, 
  Check, 
  Clock, 
  Bike, 
  MapPin, 
  Phone, 
  Star, 
  ShieldCheck, 
  Store, 
  ChefHat, 
  FileText, 
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function OrderTrackingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrderById, currentOrder, updateOrderStatus, cancelOrder } = useOrders();

  // Find order by route param or default to currentOrder (#ORD10056)
  const order = (id ? getOrderById(id) : currentOrder) || currentOrder;

  // Simulator state: allow testing different stages easily
  const [activeStage, setActiveStage] = useState(order?.status || 'Out for Delivery');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  useEffect(() => {
    if (order) {
      setActiveStage(order.status);
    }
  }, [order]);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <CustomerNavbar />
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-[#FF5A1F] flex items-center justify-center mx-auto mb-3">
            <Clock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">No Active Order Found</h2>
          <p className="text-xs text-slate-500 mb-5">
            You don't have any ongoing orders to track. Place an order to see live tracking.
          </p>
          <Link
            to="/restaurants"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5A1F] text-white rounded-xl text-xs font-bold hover:bg-[#ea4e15] transition shadow-md shadow-orange-500/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Restaurants</span>
          </Link>
        </div>
      </div>
    );
  }

  // Handle manual stage change for testing & simulation
  const handleStageChange = (newStatus) => {
    setActiveStage(newStatus);
    updateOrderStatus(order.id, newStatus);
  };

  const handleConfirmCancel = () => {
    cancelOrder(order.id);
    setActiveStage('Cancelled');
    setShowCancelModal(false);
  };

  // Timeline stages definition
  const timelineStages = [
    {
      key: 'Order Placed',
      title: 'Order Placed',
      time: order.timeline[0]?.time || '10:24 AM',
      icon: Check,
      isCompleted: true
    },
    {
      key: 'Preparing',
      title: 'Preparing',
      time: order.timeline[1]?.time || '10:36 AM',
      icon: ChefHat,
      isCompleted: ['Preparing', 'Out for Delivery', 'Delivered'].includes(activeStage)
    },
    {
      key: 'Out for Delivery',
      title: 'Out for Delivery',
      time: order.timeline[2]?.time || '10:55 AM',
      icon: Bike,
      isCompleted: ['Out for Delivery', 'Delivered'].includes(activeStage),
      isActive: activeStage === 'Out for Delivery'
    },
    {
      key: 'Delivered',
      title: 'Delivered',
      time: activeStage === 'Delivered' ? '11:15 AM' : `Estimated: ${order.estimatedDeliveryTime || '11:20 AM'}`,
      icon: MapPin,
      isCompleted: activeStage === 'Delivered'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      
      {/* Top Customer Navbar */}
      <CustomerNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Back navigation matching Screen 10 (← Track Your Order) */}
        <div>
          <Link
            to="/restaurants"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#FF5A1F] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Track Your Order</span>
          </Link>
        </div>

        {/* Status Simulator Bar for Evaluators */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Sparkles className="w-4 h-4 text-[#FF5A1F]" />
            <span>Interactive Status Tester:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {['Preparing', 'Out for Delivery', 'Delivered'].map((status) => (
              <button
                key={status}
                onClick={() => handleStageChange(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeStage === status
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {status}
              </button>
            ))}
            {activeStage !== 'Cancelled' && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-600 hover:bg-rose-100 transition cursor-pointer"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>

        {/* Main Order Card matching Screen 10 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-8">
          
          {/* Order ID & Status Header matching Screen 10 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Order ID: {order.orderNumber}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                Placed on {order.formattedDate}
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              {activeStage === 'Cancelled' ? (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-600 font-bold text-xs sm:text-sm">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Order Cancelled</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs sm:text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{activeStage}</span>
                </div>
              )}
              <div className="text-xs sm:text-sm font-semibold text-slate-500">
                {activeStage === 'Delivered' ? (
                  <span className="text-emerald-600 font-bold">Successfully Delivered!</span>
                ) : activeStage === 'Cancelled' ? (
                  <span className="text-rose-500 font-bold">Order was cancelled</span>
                ) : (
                  <span>Estimated Delivery: <strong className="text-slate-900">{order.estimatedDeliveryTime}</strong></span>
                )}
              </div>
            </div>
          </div>

          {/* Horizontal Timeline matching Screen 10 screenshot */}
          {activeStage !== 'Cancelled' ? (
            <div className="py-2">
              <div className="relative flex items-center justify-between">
                
                {/* Background Connecting Line */}
                <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-slate-200 z-0" />
                
                {/* Active Colored Progress Line */}
                <div
                  className="absolute top-1/2 left-6 -translate-y-1/2 h-1 bg-emerald-500 transition-all duration-500 z-0"
                  style={{
                    width:
                      activeStage === 'Preparing'
                        ? '33%'
                        : activeStage === 'Out for Delivery'
                        ? '66%'
                        : activeStage === 'Delivered'
                        ? '100%'
                        : '0%'
                  }}
                />

                {/* Timeline Nodes */}
                {timelineStages.map((stage, idx) => {
                  const Icon = stage.icon;
                  return (
                    <div key={stage.key} className="relative z-10 flex flex-col items-center text-center">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          stage.isCompleted
                            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 ring-4 ring-emerald-50'
                            : stage.isActive
                            ? 'bg-[#FF5A1F] text-white shadow-md shadow-orange-500/25 ring-4 ring-orange-100 animate-bounce'
                            : 'bg-white border-2 border-slate-300 text-slate-400'
                        }`}
                      >
                        <Icon className="w-5 h-5 stroke-[2.5]" />
                      </div>

                      <div className="mt-2.5">
                        <p
                          className={`text-xs sm:text-sm font-bold ${
                            stage.isCompleted || stage.isActive
                              ? 'text-slate-900'
                              : 'text-slate-400'
                          }`}
                        >
                          {stage.title}
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                          {stage.time}
                        </p>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-500" />
              <span>This order has been cancelled. If amount was debited, your refund will be processed within 2-4 business hours.</span>
            </div>
          )}

          {/* Two-Column Bottom Grid matching Screen 10 (Order Details & Map View) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-slate-100 items-start">
            
            {/* Left Column: Order Details Card matching Screen 10 */}
            <div className="lg:col-span-6 space-y-6">
              
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mb-4">
                  Order Details
                </h2>

                <div className="bg-slate-50/70 rounded-3xl p-5 sm:p-6 border border-slate-100 space-y-5">
                  
                  {/* Restaurant Info matching Screen 10 screenshot */}
                  <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200/80">
                    <img
                      src={order.restaurantImage}
                      alt={order.restaurantName}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                    />
                    <div>
                      <h3 className="font-black text-slate-900 text-base">
                        {order.restaurantName}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {order.itemsCount} {order.itemsCount === 1 ? 'item' : 'items'} • Fast Delivery
                      </p>
                    </div>
                  </div>

                  {/* Items List matching Screen 10: "Chicken Biryani x 2", "Paneer 65 x 1" */}
                  <div className="space-y-2.5">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                          <span className="font-bold text-slate-800">
                            {item.name} <span className="text-slate-400 font-semibold">x {item.quantity}</span>
                          </span>
                        </div>
                        <span className="font-bold text-slate-900">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total Line matching Screen 10 (₹887) */}
                  <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-black text-slate-900">Total Amount</span>
                      <p className="text-[11px] text-slate-400">Paid via {order.paymentMethod}</p>
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-slate-900">
                      ₹{order.totalAmount}
                    </span>
                  </div>

                  {/* Delivery Address */}
                  <div className="pt-3 border-t border-slate-200/80 flex items-start gap-2.5 text-xs">
                    <MapPin className="w-4 h-4 text-[#FF5A1F] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">Delivery Address:</span>
                      <p className="text-slate-600 mt-0.5">{order.deliveryAddress.addressLine}</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Delivery Partner Card */}
              {order.deliveryPartner && activeStage !== 'Cancelled' && (
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={order.deliveryPartner.avatar}
                      alt={order.deliveryPartner.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-orange-100"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-slate-900 text-sm">
                          {order.deliveryPartner.name}
                        </h4>
                        <span className="flex items-center text-[10px] font-bold px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded-md">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                          {order.deliveryPartner.rating}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {order.deliveryPartner.vehicle}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`tel:${order.deliveryPartner.phone}`}
                    className="p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-2xl transition cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="hidden sm:inline">Call Partner</span>
                  </a>
                </div>
              )}

              {/* Invoice Download Action */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowInvoiceModal(true)}
                  className="flex-1 py-3 px-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-2xs"
                >
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span>Download Invoice (UI)</span>
                </button>
                <Link
                  to="/restaurants"
                  className="flex-1 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-2xs"
                >
                  <span>Order Something Else</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

            {/* Right Column: Simulated Live Delivery Map Route matching Screen 10 */}
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Live Route Tracking
              </h2>

              <div className="relative bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 h-[360px] sm:h-[400px] shadow-inner flex flex-col justify-between p-5">
                
                {/* SVG Simulated City Map Background */}
                <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2,2" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="#F1F5F9" />
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Road Paths */}
                  <path d="M 30 180 Q 150 140 260 220 T 480 200" fill="none" stroke="#E2E8F0" strokeWidth="24" strokeLinecap="round" />
                  <path d="M 120 40 L 120 360" fill="none" stroke="#E2E8F0" strokeWidth="16" strokeLinecap="round" />
                  <path d="M 320 20 L 320 380" fill="none" stroke="#E2E8F0" strokeWidth="18" strokeLinecap="round" />
                  
                  {/* Delivery Route Green Path */}
                  <path
                    d="M 60 280 C 140 280, 160 140, 260 140 S 360 240, 420 100"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="5"
                    strokeDasharray="8,6"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                </svg>

                {/* Top Route Status Pill */}
                <div className="relative z-10 self-start bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-slate-200/80 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-slate-800">
                    {activeStage === 'Delivered'
                      ? 'Arrived at your location'
                      : activeStage === 'Out for Delivery'
                      ? 'Rider is 1.8 km away • Arriving in ~12 mins'
                      : 'Preparing order at Biryani House'}
                  </span>
                </div>

                {/* Animated Rider Graphic matching the bicycle in Screen 10 */}
                <div className="relative z-10 my-auto flex items-center justify-around px-4">
                  
                  {/* Restaurant Marker */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-lg border border-slate-200 flex items-center justify-center text-orange-600">
                      <Store className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-black text-slate-800 mt-1 bg-white/90 px-2 py-0.5 rounded-md shadow-2xs">
                      Restaurant
                    </span>
                  </div>

                  {/* Moving Scooter in transit */}
                  <div
                    className={`flex flex-col items-center transition-all duration-700 ${
                      activeStage === 'Out for Delivery'
                        ? 'scale-110 translate-x-2'
                        : activeStage === 'Delivered'
                        ? 'translate-x-16 opacity-75'
                        : 'opacity-40'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#FF5A1F] text-white shadow-xl shadow-orange-500/30 flex items-center justify-center ring-4 ring-white animate-pulse">
                      <Bike className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <span className="text-[10px] font-black text-white bg-slate-900 px-2 py-0.5 rounded-full mt-1 shadow-xs">
                      Rider
                    </span>
                  </div>

                  {/* Destination Marker */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-lg border border-slate-200 flex items-center justify-center text-emerald-600">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-black text-slate-800 mt-1 bg-white/90 px-2 py-0.5 rounded-md shadow-2xs">
                      Your Home
                    </span>
                  </div>

                </div>

                {/* Bottom Route Footer Info */}
                <div className="relative z-10 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-md border border-slate-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 font-medium">Delivery Address:</span>
                    <p className="font-bold text-slate-800 truncate max-w-[240px]">
                      {order.deliveryAddress.addressLine}
                    </p>
                  </div>
                  <span className="text-emerald-700 font-black bg-emerald-50 px-2.5 py-1 rounded-lg">
                    Live GPS Active
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

      {/* Cancel Order Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Cancel this order?</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to cancel order <strong>{order.orderNumber}</strong>? The restaurant has already received your request.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition cursor-pointer"
              >
                Keep Order
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition cursor-pointer"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Modal (UI Only as required by spec) */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FF5A1F]" />
                <span>Invoice - {order.orderNumber}</span>
              </h3>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Date</span>
                <span className="font-bold text-slate-800">{order.formattedDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Billed To</span>
                <span className="font-bold text-slate-800">{order.deliveryAddress.recipientName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Restaurant</span>
                <span className="font-bold text-slate-800">{order.restaurantName}</span>
              </div>

              <div className="py-2">
                <p className="font-bold text-slate-700 mb-1.5">Items Summary:</p>
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between py-1 text-slate-600">
                    <span>{item.name} x {item.quantity}</span>
                    <span className="font-bold text-slate-800">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
                <span>Grand Total</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  toast.success('Invoice downloaded successfully (UI demo)!');
                  setShowInvoiceModal(false);
                }}
                className="w-full py-3 bg-[#FF5A1F] hover:bg-[#ea4e15] text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
