import React from 'react';

export default function ForgotPasswordIllustration({ className = "w-36 h-36" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="envelopeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#FED7AA" />
            <stop offset="1" stopColor="#FDBA74" />
          </linearGradient>
          <linearGradient id="padlockGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#F97316" />
            <stop offset="1" stopColor="#C2410C" />
          </linearGradient>
        </defs>

        {/* Soft circle glow */}
        <circle cx="80" cy="80" r="70" fill="#FFF7ED" />

        {/* Envelope back */}
        <rect x="30" y="55" width="80" height="55" rx="6" fill="#FDBA74" />

        {/* Letter paper sliding out */}
        <rect x="38" y="32" width="64" height="48" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        <line x1="48" y1="44" x2="75" y2="44" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="48" y1="52" x2="88" y2="52" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <line x1="48" y1="60" x2="70" y2="60" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />

        {/* Envelope front fold (triangles) */}
        <path d="M30 110L70 82L30 58V110Z" fill="#FB923C" opacity="0.6" />
        <path d="M110 110L70 82L110 58V110Z" fill="#FB923C" opacity="0.6" />
        <path d="M30 110L70 82L110 110H30Z" fill="#F97316" />

        {/* Padlock sitting on the lower right of envelope */}
        <g transform="translate(85, 70)">
          {/* Shackle */}
          <path
            d="M14 18V12C14 6.48 18.48 2 24 2C29.52 2 34 6.48 34 12V18"
            stroke="#94A3B8"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Shackle keyway gap */}
          <path
            d="M17 18V12C17 8.13 20.13 5 24 5C27.87 5 31 8.13 31 12V18"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Lock Body */}
          <rect x="8" y="16" width="32" height="28" rx="6" fill="url(#padlockGrad)" />
          {/* Keyhole */}
          <circle cx="24" cy="27" r="3.5" fill="#FFFFFF" />
          <path d="M22.5 28L21 37H27L25.5 28H22.5Z" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}
