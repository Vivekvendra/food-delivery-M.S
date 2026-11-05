import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/dashboard/StatCard';
import RevenueChart from '../../components/dashboard/RevenueChart';
import OrdersStatusDonut from '../../components/dashboard/OrdersStatusDonut';
import RecentOrdersTable from '../../components/dashboard/RecentOrdersTable';
import QuickActions from '../../components/dashboard/QuickActions';
import { mockDashboardData } from '../../data/mockDashboardData';

export default function DashboardPage() {
  const { stats, revenue, ordersByStatus, recentOrders } = mockDashboardData;

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Overview of your food delivery business"
    >
      <div className="space-y-6">
        {/* Top 6 Stat Cards Grid */}
        <section aria-label="Key Performance Indicators">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </section>

        {/* Middle Section: Revenue Summary (2/3) + Orders By Status (1/3) */}
        <section aria-label="Revenue and Orders Breakdown" className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 xl:col-span-8">
            <RevenueChart revenueData={revenue} />
          </div>
          <div className="lg:col-span-5 xl:col-span-4">
            <OrdersStatusDonut data={ordersByStatus} />
          </div>
        </section>

        {/* Bottom Section: Recent Orders (2/3) + Quick Actions (1/3) */}
        <section aria-label="Recent Orders and Quick Actions" className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          <div className="lg:col-span-7 xl:col-span-8">
            <RecentOrdersTable orders={recentOrders} />
          </div>
          <div className="lg:col-span-5 xl:col-span-4">
            <QuickActions />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
