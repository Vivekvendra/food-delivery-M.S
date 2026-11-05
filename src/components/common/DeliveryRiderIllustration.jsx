import React from 'react';

export default function DeliveryRiderIllustration({ className = "w-full h-auto max-w-md" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 500 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-md"
      >
        <defs>
          <linearGradient id="skyGrad" x1="250" y1="0" x2="250" y2="400" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF7ED" />
            <stop offset="1" stopColor="#FFEDD5" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="orangeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#FB923C" />
            <stop offset="1" stopColor="#EA580C" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Soft Circle */}
        <circle cx="250" cy="225" r="180" fill="url(#skyGrad)" />

        {/* City Skyline Silhouette in soft pastel pink/orange */}
        <g opacity="0.4" fill="#FDBA74">
          <rect x="70" y="210" width="35" height="110" rx="3" />
          <rect x="115" y="170" width="40" height="150" rx="4" />
          <rect x="165" y="230" width="30" height="90" rx="3" />
          <rect x="205" y="150" width="45" height="170" rx="4" />
          <rect x="260" y="200" width="35" height="120" rx="3" />
          <rect x="305" y="160" width="42" height="160" rx="4" />
          <rect x="355" y="220" width="38" height="100" rx="3" />
          <rect x="400" y="180" width="35" height="140" rx="4" />
          
          {/* Windows */}
          <rect x="125" y="185" width="8" height="10" fill="#FFF" opacity="0.6" />
          <rect x="138" y="185" width="8" height="10" fill="#FFF" opacity="0.6" />
          <rect x="125" y="205" width="8" height="10" fill="#FFF" opacity="0.6" />
          <rect x="138" y="205" width="8" height="10" fill="#FFF" opacity="0.6" />
          <rect x="215" y="170" width="8" height="12" fill="#FFF" opacity="0.6" />
          <rect x="230" y="170" width="8" height="12" fill="#FFF" opacity="0.6" />
          <rect x="315" y="180" width="9" height="12" fill="#FFF" opacity="0.6" />
          <rect x="330" y="180" width="9" height="12" fill="#FFF" opacity="0.6" />
        </g>

        {/* Floating Location Pin */}
        <g transform="translate(160, 60)" filter="url(#softGlow)">
          <path
            d="M20 0C8.95 0 0 8.95 0 20C0 35 20 54 20 54C20 54 40 35 40 20C40 8.95 31.05 0 20 0Z"
            fill="url(#orangeGrad)"
          />
          <circle cx="20" cy="20" r="8" fill="#FFFFFF" />
        </g>

        {/* Road line */}
        <path d="M50 350H450" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" />
        <path d="M120 350H180M230 350H300M350 350H410" stroke="#F97316" strokeWidth="6" strokeLinecap="round" strokeDasharray="14 14" opacity="0.5" />

        {/* Delivery Scooter */}
        {/* Rear Wheel */}
        <circle cx="150" cy="335" r="32" fill="#1E293B" />
        <circle cx="150" cy="335" r="18" fill="#E2E8F0" />
        <circle cx="150" cy="335" r="8" fill="#64748B" />

        {/* Front Wheel */}
        <circle cx="340" cy="335" r="32" fill="#1E293B" />
        <circle cx="340" cy="335" r="18" fill="#E2E8F0" />
        <circle cx="340" cy="335" r="8" fill="#64748B" />

        {/* Scooter Body & Chassis */}
        <path
          d="M150 335H230L265 295H290L315 230L340 335"
          stroke="#475569"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Footboard & Body Cover (Orange) */}
        <path
          d="M185 325H275L295 285L270 270H200L185 325Z"
          fill="url(#orangeGrad)"
          stroke="#C2410C"
          strokeWidth="2"
        />
        {/* Front Apron / Fender */}
        <path
          d="M310 220L285 295L335 305L348 240L320 220H310Z"
          fill="url(#orangeGrad)"
        />
        <path d="M335 240L350 240" stroke="#FEF08A" strokeWidth="6" strokeLinecap="round" /> {/* Headlight */}

        {/* Handlebars */}
        <path d="M310 220L318 195L335 195" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
        <circle cx="335" cy="195" r="4" fill="#EA580C" />

        {/* Delivery Box (Back) */}
        <rect
          x="115"
          y="215"
          width="65"
          height="65"
          rx="8"
          fill="#EA580C"
          stroke="#C2410C"
          strokeWidth="3"
        />
        {/* Box Straps / Logo on box */}
        <path d="M115 245H180" stroke="#FFFFFF" strokeWidth="3" opacity="0.8" />
        <rect x="135" y="235" width="25" height="20" rx="3" fill="#FFFFFF" opacity="0.9" />
        <path d="M141 245H154" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />

        {/* Rider */}
        {/* Seat */}
        <path d="M190 270H235C240 270 245 265 243 260L238 250H190V270Z" fill="#1E293B" rx="4" />

        {/* Rider Body & Arms */}
        {/* Legs */}
        <path
          d="M225 250L255 285L255 315"
          stroke="#0F172A"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Shoes */}
        <path d="M250 315H275" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />

        {/* Torso in Orange jacket */}
        <path
          d="M210 240L235 180L270 195L245 255Z"
          fill="#F97316"
          stroke="#EA580C"
          strokeWidth="2"
        />

        {/* Rider Arms holding handlebar */}
        <path
          d="M245 190L285 205L320 198"
          stroke="#EA580C"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Neck & Helmet */}
        <circle cx="255" cy="155" r="26" fill="#F97316" stroke="#C2410C" strokeWidth="3" />
        {/* Visor */}
        <path
          d="M265 145H280C283 145 285 150 283 155L276 163H262L265 145Z"
          fill="#1E293B"
        />
        {/* Helmet stripe */}
        <path d="M235 155H270" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

        {/* Speed wind lines */}
        <path d="M80 240H50" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <path d="M95 260H70" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <path d="M85 280H60" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>
  );
}
