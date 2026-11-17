import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { CreditCard, Search, ArrowDownLeft, ArrowUpRight, CheckCircle2, RefreshCw } from 'lucide-react';

export default function AdminPaymentsPage() {
  const [transactions] = useState([
    {
      id: 'TXN_991823',
      orderId: '#ORD10056',
      customer: 'Vivek Vendra',
      method: 'Credit Card (VISA)',
      amount: 887,
      status: 'Success',
      date: 'Oct 30, 2026 • 10:24 AM'
    },
    {
      id: 'TXN_991754',
      orderId: '#ORD10048',
      customer: 'Vivek Vendra',
      method: 'UPI (GPay)',
      amount: 1249,
      status: 'Refunded',
      date: 'Oct 28, 2026 • 8:16 PM'
    },
    {
      id: 'TXN_991689',
      orderId: '#ORD10036',
      customer: 'Vivek Vendra',
      method: 'FoodExpress Wallet',
      amount: 499,
      status: 'Success',
      date: 'Oct 25, 2026 • 2:00 PM'
    },
    {
      id: 'TXN_991512',
      orderId: '#ORD10022',
      customer: 'Ravi Kumar',
      method: 'UPI (PhonePe)',
      amount: 627,
      status: 'Success',
      date: 'Oct 24, 2026 • 7:45 PM'
    },
    {
      id: 'TXN_991440',
      orderId: '#ORD10018',
      customer: 'Priya Sharma',
      method: 'Credit Card (Mastercard)',
      amount: 1850,
      status: 'Success',
      date: 'Oct 23, 2026 • 1:15 PM'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filtered = transactions.filter(t => 
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      title="Payments & Transactions"
      subtitle="Monitor payment gateway logs, customer transactions, and refund settlements."
    >
      <div className="space-y-6">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs">
            <span className="text-xs font-bold text-slate-400">Total Processed Revenue</span>
            <div className="text-2xl font-black text-slate-900 mt-1">₹12,58,420</div>
            <span className="text-[11px] font-bold text-emerald-600 mt-1 inline-block">↑ 18.4% this month</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs">
            <span className="text-xs font-bold text-slate-400">Successful Transactions</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">98.6%</div>
            <span className="text-[11px] text-slate-400 mt-1 inline-block">Avg settlement speed: instant</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs">
            <span className="text-xs font-bold text-slate-400">Refunds Processed</span>
            <div className="text-2xl font-black text-slate-900 mt-1">₹4,280</div>
            <span className="text-[11px] font-bold text-slate-400 mt-1 inline-block">1.4% refund rate</span>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-base">Transactions Feed</h3>
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search transaction..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-400 uppercase text-[11px] font-black">
                <tr>
                  <th className="py-3.5 px-6">Txn ID</th>
                  <th className="py-3.5 px-6">Order ID</th>
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Payment Method</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">{t.id}</td>
                    <td className="py-4 px-6 font-mono text-slate-600 font-semibold">{t.orderId}</td>
                    <td className="py-4 px-6 font-bold text-slate-800">{t.customer}</td>
                    <td className="py-4 px-6 text-slate-600">{t.method}</td>
                    <td className="py-4 px-6 font-black text-slate-900">₹{t.amount}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        t.status === 'Success'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-400 text-xs">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
