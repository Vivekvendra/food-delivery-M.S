import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import RevenueChart from '../../components/dashboard/RevenueChart';
import OrdersStatusDonut from '../../components/dashboard/OrdersStatusDonut';
import { BarChart3, TrendingUp, Award, Download, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AdminReportsPage() {
  const topDishes = [
    { name: 'Chicken Biryani', restaurant: 'Biryani House', orders: 1240, revenue: '₹3,08,760', share: '32%' },
    { name: 'Farmhouse Pizza', restaurant: 'Pizza Hub', orders: 860, revenue: '₹3,43,140', share: '24%' },
    { name: 'Crispy Veg Burger', restaurant: 'Burger Point', orders: 740, revenue: '₹1,10,260', share: '18%' },
    { name: 'Paneer Butter Masala', restaurant: 'Biryani House', orders: 580, revenue: '₹1,32,820', share: '14%' },
    { name: 'Veg Fried Rice', restaurant: 'Wok & Roll', orders: 490, revenue: '₹73,010', share: '12%' },
  ];

  return (
    <DashboardLayout
      title="Business Analytics & Reports"
      subtitle="Detailed revenue reports, top selling cuisines, and customer growth trends."
    >
      <div className="space-y-6">
        
        {/* Top Header */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Monthly Performance Report
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Data period: Last 6 Months (May 2026 - Oct 2026)
            </p>
          </div>

          <button
            onClick={() => toast.success('Analytics report exported as CSV!')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs sm:text-sm bg-white hover:bg-slate-50 transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Export Analytics</span>
          </button>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <RevenueChart />
          </div>
          <div className="lg:col-span-4">
            <OrdersStatusDonut />
          </div>
        </div>

        {/* Top Selling Items Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-black text-slate-900 text-base">Top Performing Dishes</h3>
            </div>
            <span className="text-xs font-bold text-slate-400">By Sales Volume</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-400 uppercase text-[11px] font-black">
                <tr>
                  <th className="py-3.5 px-6">Dish Name</th>
                  <th className="py-3.5 px-6">Partner Restaurant</th>
                  <th className="py-3.5 px-6 text-center">Orders Count</th>
                  <th className="py-3.5 px-6">Gross Revenue</th>
                  <th className="py-3.5 px-6">Revenue Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topDishes.map((dish, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-black flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span>{dish.name}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-medium">{dish.restaurant}</td>
                    <td className="py-4 px-6 text-center font-bold text-slate-800">{dish.orders}</td>
                    <td className="py-4 px-6 font-black text-slate-900">{dish.revenue}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: dish.share }} />
                        </div>
                        <span className="font-bold text-slate-700 text-xs">{dish.share}</span>
                      </div>
                    </td>
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
