import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useOrders } from '../../context/OrderContext';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  FileText,
  AlertCircle
} from 'lucide-react';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const q = searchTerm.toLowerCase();
      const matchSearch = o.orderNumber.toLowerCase().includes(q) ||
                          o.restaurantName.toLowerCase().includes(q) ||
                          o.deliveryAddress?.recipientName?.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'All' ? true : o.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Preparing':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Out for Delivery':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <DashboardLayout
      title="Orders Management"
      subtitle="Track live order fulfillment, dispatch delivery riders, and update order statuses."
    >
      <div className="space-y-6">
        
        {/* Top Controls Header */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Customer Orders Feed
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Total {orders.length} orders recorded in system
            </p>
          </div>

          <div className="flex items-center gap-2">
            {['All', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  statusFilter === st
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order ID (#ORD...), customer or restaurant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase text-[11px] font-black tracking-wider">
                <tr>
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Restaurant</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Status (Live Control)</th>
                  <th className="py-4 px-6">Date & Time</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400 text-xs">
                      No matching orders found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-4 px-6 font-mono font-bold text-slate-900">
                        {o.orderNumber}
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-800">
                          {o.deliveryAddress?.recipientName || 'Vivek Vendra'}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">
                          {o.deliveryAddress?.type || 'Home'}
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-800">{o.restaurantName}</div>
                        <div className="text-[11px] text-slate-400">
                          {o.items?.length || 1} items
                        </div>
                      </td>

                      <td className="py-4 px-6 font-black text-slate-900">
                        ₹{o.totalAmount}
                      </td>

                      {/* Status Dropdown Live Control */}
                      <td className="py-4 px-6">
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${getStatusBadge(o.status)}`}
                        >
                          <option value="Preparing">Preparing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="py-4 px-6 text-xs text-slate-500 whitespace-nowrap">
                        {o.formattedDate}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => setSelectedOrder(o)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          
                          <Link
                            to={`/track-order/${o.id}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#FF5A1F] hover:bg-orange-50 transition"
                            title="Track in Customer View"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">
                Order Details - {selectedOrder.orderNumber}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl">
                <div>
                  <span className="text-slate-400">Customer:</span>
                  <p className="font-bold text-slate-800">{selectedOrder.deliveryAddress?.recipientName}</p>
                  <p className="text-[11px] text-slate-500">{selectedOrder.deliveryAddress?.phone}</p>
                </div>
                <div>
                  <span className="text-slate-400">Restaurant:</span>
                  <p className="font-bold text-slate-800">{selectedOrder.restaurantName}</p>
                  <p className="text-[11px] text-slate-500">{selectedOrder.paymentMethod}</p>
                </div>
              </div>

              <div>
                <p className="font-bold text-slate-700 mb-1">Delivery Address:</p>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl">{selectedOrder.deliveryAddress?.addressLine}</p>
              </div>

              <div>
                <p className="font-bold text-slate-700 mb-2">Ordered Dishes:</p>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                  {selectedOrder.items?.map((item, i) => (
                    <div key={i} className="p-2.5 flex justify-between items-center text-slate-700">
                      <span>{item.name} x {item.quantity}</span>
                      <span className="font-bold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-between font-black text-sm text-slate-900">
                <span>Total Amount:</span>
                <span>₹{selectedOrder.totalAmount}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}
