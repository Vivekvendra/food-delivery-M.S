import React from 'react';
import { Link } from 'react-router-dom';

export const ChefHatIcon = ({ className = "w-8 h-8", color = "#FF5A1F" }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Puffed Chef Hat */}
    <path
      d="M20 25C17.2 25 15 27.2 15 30C15 31.7 15.9 33.2 17.2 34C16.5 34.9 16 36.1 16 37.5C16 40.5 18.5 43 21.5 43H42.5C45.5 43 48 40.5 48 37.5C48 36.1 47.5 34.9 46.8 34C48.1 33.2 49 31.7 49 30C49 27.2 46.8 25 44 25C43.5 25 43 25.1 42.5 25.3C41.7 20.5 37.3 17 32 17C26.7 17 22.3 20.5 21.5 25.3C21 25.1 20.5 25 20 25Z"
      fill={color}
    />
    {/* Hat Band */}
    <rect
      x="19"
      y="44"
      width="26"
      height="5.5"
      rx="2.75"
      fill={color}
    />
    {/* Cute Mascot Face Eyes & Smile */}
    <circle cx="27" cy="34" r="2.2" fill="#FFFFFF" />
    <circle cx="37" cy="34" r="2.2" fill="#FFFFFF" />
    <path
      d="M29 37.5C29 37.5 30.5 40 32 40C33.5 40 35 37.5 35 37.5"
      stroke="#FFFFFF"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

export default function Logo({ light = false, size = "md", to = "/" }) {
  const sizeClasses = {
    sm: { icon: "w-6 h-6", text: "text-base" },
    md: { icon: "w-8 h-8", text: "text-xl" },
    lg: { icon: "w-10 h-10", text: "text-2xl" },
  }[size] || { icon: "w-8 h-8", text: "text-xl" };

  const content = (
    <div className="flex items-center gap-1.5 font-bold tracking-tight select-none">
      <ChefHatIcon className={sizeClasses.icon} color="#FF5A1F" />
      <span className={`${sizeClasses.text} font-bold ${light ? 'text-white' : 'text-slate-900'} tracking-tight`}>
        Food<span className="text-[#FF5A1F]">Express</span>
      </span>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-flex items-center group transition-transform active:scale-95">
        {content}
      </Link>
    );
  }

  return content;
}
