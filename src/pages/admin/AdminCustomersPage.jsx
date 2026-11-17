import React, { useState, useMemo } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  ShoppingBag, 
  ShieldCheck, 
  MoreVertical,
  CheckCircle2,
  Ban
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([
    {
      id: 'cust_1',
      name: 'Vivek Vendra',
      email: 'vivekvendra17@gmail.com',
      phone: '+91 98765 43210',
      address: 'D.No: 12-34, MVP Colony, Visakhapatnam - 530017',
      totalOrders: 14,
      totalSpent: 4890,
      status: 'Active',
      joinedDate: 'Jan 2026',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'cust_2',
      name: 'Ravi Kumar',
      email: 'ravi.kumar@example.com',
      phone: '+91 98450 11223',
      address: 'Plot 45, Madhurawada, Visakhapatnam - 530048',
      totalOrders: 8,
      totalSpent: 2650,
      status: 'Active',
      joinedDate: 'Feb 2026',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'cust_3',
      name: 'Priya Sharma',
      email: 'priya.s@example.com',
      phone: '+91 97112 33445',
      address: 'Flat 302, Sagar Nagar, Visakhapatnam - 530045',
      totalOrders: 21,
      totalSpent: 7320,
      status: 'Active',
      joinedDate: 'Nov 2025',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'cust_4',
      name: 'Arjun Rao',
      email: 'arjun.rao@example.com',
      phone: '+91 99887 76655',
      address: 'Gajuwaka, Visakhapatnam - 530026',
      totalOrders: 5,
      totalSpent: 1420,
      status: 'Active',
      joinedDate: 'Mar 2026',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'cust_5',
      name: 'Sneha Patel',
      email: 'sneha.patel@example.com',
      phone: '+91 91234 88776',
      address: 'Siripuram, Visakhapatnam - 530003',
      totalOrders: 11,
      totalSpent: 3950,
      status: 'Active',
      joinedDate: 'Dec 2025',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return customers.filter(c => 
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.address.toLowerCase().includes(q)
    );
  }, [customers, searchTerm]);

  const handleToggleStatus = (id, name, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Blocked' : 'Active';
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    toast.info(`Customer ${name} is now ${newStatus}`);
  };

  return (
    <DashboardLayout
      title="Customers Directory"
      subtitle="View registered customers, monitor order frequency, and manage account statuses."
    >
      <div className="space-y-6">
        
        {/* Header summary */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Customer Accounts
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Total {customers.length} registered customers in network
            </p>
          </div>

          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF5A1F]"
            />
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase text-[11px] font-black tracking-wider">
                <tr>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Contact Info</th>
                  <th className="py-4 px-6">Saved Address</th>
                  <th className="py-4 px-6 text-center">Orders</th>
                  <th className="py-4 px-6">Total Spent</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{c.name}</div>
                          <div className="text-[11px] text-slate-400 font-medium">Joined {c.joinedDate}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="text-slate-700 font-medium flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{c.email}</span>
                      </div>
                      <div className="text-slate-500 text-[11px] flex items-center gap-1.5 mt-0.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{c.phone}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-slate-600 max-w-xs truncate">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{c.address}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-center font-bold text-slate-800">
                      {c.totalOrders}
                    </td>

                    <td className="py-4 px-6 font-black text-slate-900">
                      ₹{c.totalSpent}
                    </td>

                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        c.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <span>{c.status}</span>
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleToggleStatus(c.id, c.name, c.status)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                          c.status === 'Active'
                            ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                        }`}
                      >
                        {c.status === 'Active' ? 'Block' : 'Unblock'}
                      </button>
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
