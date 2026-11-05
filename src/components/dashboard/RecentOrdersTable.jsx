import React, { useState } from 'react';
import { Eye, ArrowRight, X, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const statusStyles = {
  'Preparing': {
    badge: 'bg-amber-50 text-amber-600 border border-amber-200/60',
    dot: 'bg-amber-500',
    icon: Clock,
  },
  'Out for Delivery': {
    badge: 'bg-blue-50 text-blue-600 border border-blue-200/60',
    dot: 'bg-blue-500',
    icon: Truck,
  },
  'Delivered': {
    badge: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60',
    dot: 'bg-emerald-500',
    icon: CheckCircle2,
  },
  'Cancelled': {
    badge: 'bg-rose-50 text-rose-600 border border-rose-200/60',
    dot: 'bg-rose-500',
    icon: AlertCircle,
  },
};

export default function RecentOrdersTable({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
          Recent Orders
        </h2>
        <Link
          to="/orders"
          className="text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 transition"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-wider">
              <th className="pb-3 font-semibold">Order ID</th>
              <th className="pb-3 font-semibold">Customer</th>
              <th className="pb-3 font-semibold">Amount</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {orders.map((order) => {
              const style = statusStyles[order.status] || statusStyles['Preparing'];
              return (
                <tr
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="hover:bg-slate-50/70 transition cursor-pointer group"
                >
                  {/* Order ID */}
                  <td className="py-3.5 font-bold text-slate-900 group-hover:text-orange-600 transition whitespace-nowrap">
                    {order.id}
                  </td>

                  {/* Customer */}
                  <td className="py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={order.avatar}
                        alt={order.customer}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200"
                      />
                      <span className="font-semibold text-slate-800">
                        {order.customer}
                      </span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="py-3.5 font-bold text-slate-900 whitespace-nowrap">
                    {order.amount}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${style.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                      {order.status}
                    </span>
                  </td>

                  {/* Time */}
                  <td className="py-3.5 text-xs font-medium text-slate-400 text-right whitespace-nowrap">
                    {order.time}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Order Details: {selectedOrder.id}
                </h3>
                <p className="text-xs text-slate-400">Placed {selectedOrder.time}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Customer</span>
                <span className="text-sm font-bold text-slate-800">{selectedOrder.customer}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Ordered Items</span>
                <span className="text-sm font-medium text-slate-700">{selectedOrder.items}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Total Amount</span>
                <span className="text-base font-black text-orange-600">{selectedOrder.amount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Current Status</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${statusStyles[selectedOrder.status]?.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusStyles[selectedOrder.status]?.dot}`} />
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition cursor-pointer"
              >
                Close
              </button>
              <Link
                to="/orders"
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-xs transition text-center flex items-center justify-center"
              >
                Manage in Orders
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
