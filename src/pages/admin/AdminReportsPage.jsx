import React, { useState, useMemo } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import RevenueChart from '../../components/dashboard/RevenueChart';
import OrdersStatusDonut from '../../components/dashboard/OrdersStatusDonut';
import { mockDashboardData } from '../../data/mockDashboardData';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Download, 
  Calendar, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Percent, 
  Printer, 
  Store, 
  UtensilsCrossed, 
  Sparkles,
  ArrowUpRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function AdminReportsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 6 Months');

  // KPI Metrics data
  const metrics = [
    {
      title: 'Total Gross Revenue',
      value: '₹12,58,420',
      change: '+18.4%',
      trend: 'up',
      subtitle: 'vs previous period',
      icon: DollarSign,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    {
      title: 'Total Orders Processed',
      value: '6,320',
      change: '+14.2%',
      trend: 'up',
      subtitle: '93.8% fulfillment rate',
      icon: ShoppingBag,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      title: 'Average Order Value (AOV)',
      value: '₹248',
      change: '+6.8%',
      trend: 'up',
      subtitle: 'Higher basket sizes',
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100'
    },
    {
      title: 'Customer Repeat Rate',
      value: '84.6%',
      change: '+5.1%',
      trend: 'up',
      subtitle: 'High brand loyalty',
      icon: Users,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-100'
    }
  ];

  // Top Dishes Data
  const topDishes = [
    {
      rank: 1,
      name: 'Chicken Biryani',
      category: 'Biryani',
      restaurant: 'Biryani House',
      orders: 1240,
      revenue: '₹3,08,760',
      share: 32,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=150&auto=format&fit=crop&q=80'
    },
    {
      rank: 2,
      name: 'Farmhouse Pizza',
      category: 'Pizza',
      restaurant: 'Pizza Hub',
      orders: 860,
      revenue: '₹3,43,140',
      share: 24,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&auto=format&fit=crop&q=80'
    },
    {
      rank: 3,
      name: 'Crispy Veg Burger',
      category: 'Burgers',
      restaurant: 'Burger Point',
      orders: 740,
      revenue: '₹1,10,260',
      share: 18,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&auto=format&fit=crop&q=80'
    },
    {
      rank: 4,
      name: 'Paneer Butter Masala',
      category: 'Curries',
      restaurant: 'Biryani House',
      orders: 580,
      revenue: '₹1,32,820',
      share: 14,
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=150&auto=format&fit=crop&q=80'
    },
    {
      rank: 5,
      name: 'Veg Fried Rice',
      category: 'Rice',
      restaurant: 'Wok & Roll',
      orders: 490,
      revenue: '₹73,010',
      share: 12,
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=150&auto=format&fit=crop&q=80'
    }
  ];

  // Top Partner Restaurants Data
  const topRestaurants = [
    {
      name: 'Biryani House',
      cuisine: 'Indian, Biryani',
      orders: 2140,
      grossSales: '₹5,42,800',
      rating: 4.8,
      commission: '₹81,420',
      status: 'Top Partner'
    },
    {
      name: 'Pizza Hub',
      cuisine: 'Italian, Fast Food',
      orders: 1450,
      grossSales: '₹4,12,300',
      rating: 4.6,
      commission: '₹61,845',
      status: 'Gold Partner'
    },
    {
      name: 'Burger Point',
      cuisine: 'American, Burgers',
      orders: 1120,
      grossSales: '₹1,98,400',
      rating: 4.5,
      commission: '₹29,760',
      status: 'Active'
    },
    {
      name: 'Wok & Roll',
      cuisine: 'Chinese, Asian',
      orders: 890,
      grossSales: '₹1,44,200',
      rating: 4.4,
      commission: '₹21,630',
      status: 'Active'
    }
  ];

  // Export CSV Handler
  const handleExportCSV = () => {
    let csv = "Rank,Dish Name,Category,Partner Restaurant,Orders,Revenue,Share\n";
    topDishes.forEach(d => {
      csv += `${d.rank},"${d.name}","${d.category}","${d.restaurant}",${d.orders},"${d.revenue}","${d.share}%"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `foodexpress_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Analytics report exported as CSV!');
  };

  // Print Handler
  const handlePrint = () => {
    toast.info('Opening print preview...');
    window.print();
  };

  return (
    <DashboardLayout
      title="Business Analytics & Reports"
      subtitle="Detailed revenue reports, sales trends, and top dish analytics"
      fullWidth={true}
    >
      <div className="w-full space-y-6">
        
        {/* Top Header Card (100% Screen Resolution) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-orange-50 text-[#FF5A1F]">
                <BarChart3 className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Monthly Performance & Business Intelligence
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Real-time telemetry on revenue metrics, dish popularities, and partner performance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Time Period Filter Pills */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl text-xs font-bold text-slate-600">
              {['Last 30 Days', 'Last 3 Months', 'Last 6 Months', 'Year to Date'].map(period => (
                <button
                  key={period}
                  onClick={() => setSelectedTimeRange(period)}
                  className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                    selectedTimeRange === period
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'hover:text-slate-900 text-slate-500'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>

            {/* Print & Export Actions */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs bg-white hover:bg-slate-50 transition cursor-pointer shadow-2xs"
              title="Print Report"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span>Print</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF5A1F] hover:bg-[#ea4e15] active:scale-95 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/25 transition cursor-pointer"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Summary Cards (Full-Width Responsive Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {metric.title}
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {metric.value}
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl ${metric.bg} ${metric.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
                  <span className={`font-black flex items-center gap-0.5 ${metric.color}`}>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    {metric.change}
                  </span>
                  <span className="text-slate-400 font-medium">
                    {metric.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Charts Row (12-Col Full Resolution Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Revenue Chart (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="h-full">
              <RevenueChart revenueData={mockDashboardData.revenue} />
            </div>
          </div>

          {/* Orders by Status Donut (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="h-full">
              <OrdersStatusDonut data={mockDashboardData.ordersByStatus} />
            </div>
          </div>

        </div>

        {/* Top Performing Dishes Table (Fixed-Layout Table with Zero Cell Overlap) */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base sm:text-lg">
                  Top Performing Dishes by Sales & Volume
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Ranked by cumulative revenue and order frequency across all restaurants.
                </p>
              </div>
            </div>

            <span className="self-start sm:self-auto text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              Live Insights
            </span>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs sm:text-sm border-collapse table-auto">
              <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-400 uppercase text-[11px] font-black tracking-wider">
                <tr>
                  <th className="py-4 px-6 w-[34%] min-w-[240px]">Dish Name</th>
                  <th className="py-4 px-6 w-[22%] min-w-[180px]">Partner Restaurant</th>
                  <th className="py-4 px-6 w-[14%] min-w-[110px] text-center">Orders Count</th>
                  <th className="py-4 px-6 w-[15%] min-w-[120px]">Gross Revenue</th>
                  <th className="py-4 px-6 w-[15%] min-w-[140px]">Revenue Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topDishes.map((dish) => (
                  <tr key={dish.rank} className="hover:bg-slate-50/70 transition">
                    
                    {/* Dish Name & Rank (Separate Container to Prevent Overlap) */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 text-[11px] font-black flex items-center justify-center flex-shrink-0">
                          {dish.rank}
                        </span>
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-11 h-11 rounded-xl object-cover flex-shrink-0 border border-slate-200"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate text-sm">
                            {dish.name}
                          </p>
                          <span className="text-[10px] font-bold text-slate-400 px-1.5 py-0.5 bg-slate-100 rounded">
                            {dish.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Partner Restaurant (Clearly Separated) */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="font-semibold text-slate-700 truncate">
                          {dish.restaurant}
                        </span>
                      </div>
                    </td>

                    {/* Orders Count */}
                    <td className="py-4 px-6 text-center font-black text-slate-800">
                      {dish.orders.toLocaleString()}
                    </td>

                    {/* Gross Revenue */}
                    <td className="py-4 px-6 font-black text-slate-900 text-sm">
                      {dish.revenue}
                    </td>

                    {/* Revenue Share with Progress Bar */}
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>{dish.share}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                            style={{ width: `${dish.share}%` }}
                          />
                        </div>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Top Partner Restaurants Matrix (Second Detailed Table) */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base sm:text-lg">
                  Top Partner Restaurant Performance
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Leading food outlets by transaction volume and commission contribution.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs sm:text-sm border-collapse table-auto">
              <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-400 uppercase text-[11px] font-black tracking-wider">
                <tr>
                  <th className="py-4 px-6">Outlet Name</th>
                  <th className="py-4 px-6">Cuisine Specialties</th>
                  <th className="py-4 px-6 text-center">Orders Fulfilled</th>
                  <th className="py-4 px-6">Gross Sales</th>
                  <th className="py-4 px-6">Platform Commission</th>
                  <th className="py-4 px-6 text-center">Customer Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topRestaurants.map((rest, i) => (
                  <tr key={i} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {rest.name}
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-medium">
                      {rest.cuisine}
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-slate-800">
                      {rest.orders.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 font-black text-slate-900">
                      {rest.grossSales}
                    </td>
                    <td className="py-4 px-6 font-bold text-emerald-600">
                      {rest.commission}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                        ★ {rest.rating}
                      </span>
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
