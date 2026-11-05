import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { ChefHatIcon } from '../../components/common/Logo';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';

export default function PlaceholderPage({ title, moduleNumber, description }) {
  return (
    <DashboardLayout title={title} subtitle={description}>
      <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xs flex flex-col items-center justify-center text-center min-h-[420px]">
        <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-200/80 flex items-center justify-center mb-4 text-orange-600">
          <ChefHatIcon className="w-9 h-9" color="#ea580c" />
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 mb-3">
          <Clock className="w-3.5 h-3.5" />
          {moduleNumber ? `Module ${moduleNumber} Ready for Step 2` : 'Next Phase'}
        </span>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
          {title}
        </h2>
        <p className="text-sm text-slate-500 max-w-md mb-6">
          {description || 'This section is scaffolded according to project specifications and will be activated in subsequent modules.'}
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md shadow-orange-600/20 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </DashboardLayout>
  );
}
