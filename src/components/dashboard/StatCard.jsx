import React from 'react';
import { 
  Store, 
  UtensilsCrossed, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Users, 
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';

const iconMap = {
  Store,
  UtensilsCrossed,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Users,
};

const colorConfig = {
  rose: {
    bg: 'bg-rose-50 text-rose-600',
    ring: 'border-rose-100',
  },
  amber: {
    bg: 'bg-amber-50 text-amber-600',
    ring: 'border-amber-100',
  },
  indigo: {
    bg: 'bg-indigo-50 text-indigo-600',
    ring: 'border-indigo-100',
  },
  sky: {
    bg: 'bg-sky-50 text-sky-600',
    ring: 'border-sky-100',
  },
  emerald: {
    bg: 'bg-emerald-50 text-emerald-600',
    ring: 'border-emerald-100',
  },
  purple: {
    bg: 'bg-purple-50 text-purple-600',
    ring: 'border-purple-100',
  },
};

export default function StatCard({ stat }) {
  const Icon = iconMap[stat.icon] || Store;
  const colors = colorConfig[stat.color] || colorConfig.amber;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors.bg} transition-transform group-hover:scale-105 duration-200`}>
          <Icon className="w-5 h-5" />
        </div>
        
        {/* Trend Indicator */}
        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          <span>▲</span>
          <span>{stat.change}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight leading-none">
          {stat.value}
        </div>
        <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
          {stat.label}
        </div>
      </div>
    </div>
  );
}
