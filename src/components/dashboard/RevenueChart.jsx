import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

export default function RevenueChart({ revenueData }) {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 6 Months');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const periods = Object.keys(revenueData.periods);
  const currentData = revenueData.periods[selectedPeriod] || revenueData.periods['Last 6 Months'];

  // SVG Chart Dimensions
  const width = 600;
  const height = 220;
  const padding = { top: 20, right: 25, bottom: 35, left: 25 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxVal = Math.max(...currentData.map(d => d.revenue)) * 1.15;
  const minVal = Math.min(...currentData.map(d => d.revenue)) * 0.85;

  const points = currentData.map((d, index) => {
    const x = padding.left + (index / (currentData.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - ((d.revenue - minVal) / (maxVal - minVal)) * chartHeight;
    return { ...d, x, y };
  });

  // Generate smooth cubic bezier SVG path
  const generateSmoothPath = (pts) => {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const linePath = generateSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Revenue Summary
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {revenueData.total}
            </span>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <span>▲</span> {revenueData.growth}
            </span>
          </div>
        </div>

        {/* Period Selector Dropdown */}
        <div className="relative">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 py-1.5 pl-3 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer"
          >
            {periods.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full h-[220px]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EA580C" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#EA580C" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal gridlines */}
          {[0, 0.33, 0.66, 1].map((ratio, i) => {
            const y = padding.top + chartHeight * ratio;
            return (
              <line
                key={i}
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#F1F5F9"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Area Fill */}
          <path d={areaPath} fill="url(#revGrad)" />

          {/* Line Path */}
          <path
            d={linePath}
            fill="none"
            stroke="#EA580C"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {points.map((pt, i) => (
            <g key={i}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r="5"
                fill="#FFFFFF"
                stroke="#EA580C"
                strokeWidth="2.5"
                className="cursor-pointer transition-all hover:r-7"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              {/* X Axis Label */}
              <text
                x={pt.x}
                y={height - 10}
                textAnchor="middle"
                className="text-[11px] font-semibold fill-slate-400 select-none"
              >
                {pt.month}
              </text>
            </g>
          ))}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-full bg-slate-900 text-white text-xs rounded-lg py-1.5 px-3 shadow-xl z-20 transition-all duration-150"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100 - 8}%`,
            }}
          >
            <div className="font-bold text-orange-400">{hoveredPoint.formatted}</div>
            <div className="text-[10px] text-slate-300">{hoveredPoint.month} Revenue</div>
          </div>
        )}
      </div>
    </div>
  );
}
