import React, { useState } from 'react';

export default function OrdersStatusDonut({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { total, breakdown } = data;
  const size = 180;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate stroke dash offsets
  let accumulatedPercent = 0;
  const slices = breakdown.map((item, index) => {
    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    accumulatedPercent += item.percentage;
    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
      index,
    };
  });

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
      <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mb-4">
        Orders by Status
      </h2>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-auto">
        {/* Donut Chart with Center Text */}
        <div className="relative w-[180px] h-[180px] flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
            {/* Background ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#F1F5F9"
              strokeWidth={strokeWidth}
            />

            {/* Slices */}
            {slices.map((slice) => {
              const isHovered = hoveredIndex === slice.index;
              return (
                <circle
                  key={slice.status}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={slice.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={slice.strokeDasharray}
                  strokeDashoffset={slice.strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(slice.index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
          </svg>

          {/* Centered Total Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
            <span className="text-2xl font-black text-slate-900 tracking-tight leading-none">
              {hoveredIndex !== null ? breakdown[hoveredIndex].count.toLocaleString() : total.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-slate-400 mt-1">
              {hoveredIndex !== null ? breakdown[hoveredIndex].status : 'Orders'}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-2.5">
          {breakdown.map((item, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={item.status}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`flex items-center justify-between p-1.5 rounded-lg transition cursor-pointer ${
                  isHovered ? 'bg-slate-50' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">
                    {item.status}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  {item.percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
