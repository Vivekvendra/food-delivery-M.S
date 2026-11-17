import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomerNavbar from '../../components/layout/CustomerNavbar';
import { useOrders } from '../../context/OrderContext';
import { useCart } from '../../context/CartContext';
import { 
  Search, 
  ChevronDown, 
  RotateCcw, 
  FileText, 
  Eye, 
  ShoppingBag, 
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Bike,
  Printer,
  Download
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function OrderHistoryPage() {
  const { orders } = useOrders();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals state
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
  const [selectedDetailsOrder, setSelectedDetailsOrder] = useState(null);

  // Filtered Orders matching Screen 11
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Search by Order ID or restaurant
      const q = searchTerm.toLowerCase();
      const matchId = order.orderNumber.toLowerCase().includes(q) || order.id.toLowerCase().includes(q);
      const matchRest = order.restaurantName.toLowerCase().includes(q);
      const matchSearch = !searchTerm.trim() || matchId || matchRest;

      // Filter by status
      const matchStatus = statusFilter === 'All' || order.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  // Handle Reorder
  const handleReorder = (order) => {
    if (!order.items || order.items.length === 0) return;
    
    // Add all items of this order to cart
    order.items.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image || order.restaurantImage,
        restaurantName: order.restaurantName
      });
    });

    toast.success(`Items from ${order.restaurantName} re-added to your cart! 🛍️`);
    navigate('/cart');
  };

  // Status Badge Helper matching Screen 11
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Delivered</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>Cancelled</span>
          </span>
        );
      case 'Out for Delivery':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span>Out for Delivery</span>
          </span>
        );
      case 'Preparing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Preparing</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      
      {/* Top Customer Navbar */}
      <CustomerNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Top Header matching Screen 11 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              My Orders
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Review your previous orders, download invoices, and reorder favorites
            </p>
          </div>

          <Link
            to="/restaurants"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5A1F] hover:bg-[#ea4e15] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-orange-500/25 transition cursor-pointer self-start sm:self-auto"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
            <span>Order New Food</span>
          </Link>
        </div>

        {/* Search & Filter Bar matching Screen 11 */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order ID or restaurant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
            />
          </div>

          {/* Status Dropdown */}
          <div className="relative self-start sm:self-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-700 py-2 pl-3.5 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer shadow-2xs"
            >
              <option value="All">All Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Preparing">Preparing</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

        </div>

        {/* Orders List matching Screen 11 */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-xs my-6">
            <div className="w-16 h-16 rounded-3xl bg-orange-50 text-[#FF5A1F] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 stroke-[1.8]" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-1">No orders found</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6">
              We couldn't find any orders matching your criteria. Try adjusting your search or explore restaurants!
            </p>
            <Link
              to="/restaurants"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5A1F] text-white rounded-xl text-xs font-bold shadow-md shadow-orange-500/25 hover:bg-[#ea4e15] transition"
            >
              <span>Explore Restaurants</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                
                {/* Left Side: Thumbnail & Order Info matching Screen 11 */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <img
                    src={order.restaurantImage || 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80'}
                    alt={order.restaurantName}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover bg-slate-100 border border-slate-200 flex-shrink-0"
                  />

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-black text-slate-900 text-sm sm:text-base">
                        {order.orderNumber}
                      </span>
                      <span className="md:hidden">
                        {renderStatusBadge(order.status)}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-800 text-sm sm:text-base truncate">
                      {order.restaurantName}
                    </h3>

                    <p className="text-xs text-slate-500 font-medium">
                      {order.formattedDate} • {order.itemsCount || order.items?.length || 2} items • <strong className="text-slate-900 font-black">₹{order.totalAmount}</strong>
                    </p>
                  </div>
                </div>

                {/* Right Side: Status Badge & Actions matching Screen 11 */}
                <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 flex-shrink-0">
                  
                  {/* Status Badge (desktop) */}
                  <div className="hidden md:block">
                    {renderStatusBadge(order.status)}
                  </div>

                  {/* Actions matching Screen 11: Reorder & Invoice */}
                  <div className="flex items-center gap-2">
                    
                    {/* Live Track Link if active */}
                    {['Preparing', 'Out for Delivery'].includes(order.status) && (
                      <Link
                        to={`/track-order/${order.id}`}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-orange-50 text-[#FF5A1F] hover:bg-orange-100 transition flex items-center gap-1.5"
                      >
                        <Bike className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Track Live</span>
                      </Link>
                    )}

                    {/* Reorder Button matching Screen 11 */}
                    <button
                      onClick={() => handleReorder(order)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                    >
                      <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Reorder</span>
                    </button>

                    {/* Invoice Button matching Screen 11 */}
                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>Invoice</span>
                    </button>

                    {/* Quick Details View */}
                    <button
                      onClick={() => setSelectedDetailsOrder(order)}
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                      title="View Order Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </main>

      {/* Invoice Modal (UI Only) */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#FF5A1F]" />
                <h3 className="text-base font-black text-slate-900">
                  Tax Invoice {selectedInvoiceOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>Order Date:</span>
                  <span className="font-bold text-slate-800">{selectedInvoiceOrder.formattedDate}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Restaurant:</span>
                  <span className="font-bold text-slate-800">{selectedInvoiceOrder.restaurantName}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Delivery To:</span>
                  <span className="font-bold text-slate-800">{selectedInvoiceOrder.deliveryAddress?.recipientName || 'Vivek Vendra'}</span>
                </div>
              </div>

              <div>
                <p className="font-bold text-slate-700 mb-2">Itemized Breakdown:</p>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                  {selectedInvoiceOrder.items?.map((item, idx) => (
                    <div key={idx} className="p-2.5 flex justify-between items-center text-slate-700">
                      <span>{item.name} <span className="text-slate-400 font-semibold">x {item.quantity}</span></span>
                      <span className="font-bold text-slate-900">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="p-2.5 flex justify-between items-center text-slate-500">
                    <span>Delivery & Convenience Charges</span>
                    <span className="font-bold text-slate-700">₹{selectedInvoiceOrder.deliveryCharges || 50}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
                <span>Total Amount Paid</span>
                <span>₹{selectedInvoiceOrder.totalAmount}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  toast.success('Invoice printed to printer!');
                  setSelectedInvoiceOrder(null);
                }}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>

              <button
                onClick={() => {
                  toast.success('Invoice PDF downloaded successfully! 📄');
                  setSelectedInvoiceOrder(null);
                }}
                className="flex-1 py-2.5 bg-[#FF5A1F] hover:bg-[#ea4e15] text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedDetailsOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">
                Order Summary {selectedDetailsOrder.orderNumber}
              </h3>
              <button
                onClick={() => setSelectedDetailsOrder(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={selectedDetailsOrder.restaurantImage}
                  alt=""
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{selectedDetailsOrder.restaurantName}</h4>
                  <p className="text-slate-400">{selectedDetailsOrder.status}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl text-slate-600 space-y-1">
                <p><strong>Address:</strong> {selectedDetailsOrder.deliveryAddress?.addressLine}</p>
                <p><strong>Payment:</strong> {selectedDetailsOrder.paymentMethod}</p>
              </div>

              <div className="space-y-1.5 pt-2">
                {selectedDetailsOrder.items?.map((item, i) => (
                  <div key={i} className="flex justify-between text-slate-700">
                    <span>{item.name} x {item.quantity}</span>
                    <span className="font-bold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
                <span>Total Paid</span>
                <span>₹{selectedDetailsOrder.totalAmount}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedDetailsOrder(null)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
