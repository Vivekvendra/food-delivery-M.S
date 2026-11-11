import React from 'react';

export default function RestaurantSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden flex flex-col justify-between"
        >
          {/* Skeleton Image */}
          <div className="w-full h-48 bg-slate-200" />

          {/* Skeleton Body */}
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-5 bg-slate-200 rounded-md w-3/5" />
              <div className="h-5 bg-slate-200 rounded-md w-1/5" />
            </div>

            <div className="h-3.5 bg-slate-200 rounded-md w-2/5" />

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="h-4 bg-slate-200 rounded-md w-1/4" />
              <div className="h-4 bg-slate-200 rounded-md w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
