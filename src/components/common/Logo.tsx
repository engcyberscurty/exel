import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  isLight?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', isLight = false }) => {
  return (
    <Link to="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {/* Handcrafted SVG Brand Mark */}
      <div className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-[#0B3527] text-white shadow-sm transition-transform group-hover:scale-105">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          {/* Spreadsheet grid lines with accent growth stroke */}
          <rect x="4" y="4" width="28" height="28" rx="4" stroke="#126B45" strokeWidth="2" />
          <line x1="4" y1="13" x2="32" y2="13" stroke="#126B45" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="4" y1="22" x2="32" y2="22" stroke="#126B45" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="14" y1="4" x2="14" y2="32" stroke="#126B45" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="23" y1="4" x2="23" y2="32" stroke="#126B45" strokeWidth="1.5" strokeOpacity="0.7" />
          
          {/* Dynamic growth curve accent representing data insights */}
          <path
            d="M8 26L14 18L21 21L28 10"
            stroke="#4ADE80"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="28" cy="10" r="2.5" fill="#4ADE80" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`text-xl font-bold tracking-tight ${
              isLight ? 'text-white' : 'text-[#0B3527]'
            }`}
          >
            Sheetora
          </span>
          <span
            className={`text-sm font-semibold ${
              isLight ? 'text-emerald-300' : 'text-[#126B45]'
            }`}
          >
            شيتورا
          </span>
        </div>
        <span
          className={`text-[10px] leading-tight font-medium ${
            isLight ? 'text-slate-400' : 'text-[#667085]'
          }`}
        >
          شغلك أذكى مع شيتورا
        </span>
      </div>
    </Link>
  );
};
