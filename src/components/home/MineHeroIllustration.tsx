import React from 'react';

export const MineHeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full h-[320px] sm:h-[380px] bg-gradient-to-b from-[#F0F5F2] to-[#FAF6EE] rounded-2xl border border-[#E2E8F0] shadow-gov overflow-hidden flex items-center justify-center p-2">
      {/* Sky & Distant Plateau */}
      <svg
        viewBox="0 0 600 360"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E2ECE6" />
            <stop offset="100%" stopColor="#F5F9F6" />
          </linearGradient>

          <linearGradient id="benchTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D8C3A5" />
            <stop offset="100%" stopColor="#E8D8C3" />
          </linearGradient>

          <linearGradient id="benchWall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#BA9F7F" />
            <stop offset="100%" stopColor="#9C7F5F" />
          </linearGradient>

          <linearGradient id="coalSeam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3A3E3B" />
            <stop offset="100%" stopColor="#252A25" />
          </linearGradient>

          <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C2A888" />
            <stop offset="100%" stopColor="#B39775" />
          </linearGradient>
        </defs>

        {/* Sky Background */}
        <rect x="0" y="0" width="600" height="360" fill="url(#skyGrad)" />

        {/* Distant Saranda / Damodar Hills */}
        <path
          d="M 0,110 Q 90,85 180,105 T 360,95 T 520,100 L 600,105 L 600,140 L 0,140 Z"
          fill="#C4D6CB"
          opacity="0.8"
        />

        {/* Top Plateau Rim (0m Elevation) with green reclamation fringe */}
        <path
          d="M 0,130 L 600,130 L 600,165 L 0,165 Z"
          fill="#65866B"
        />
        {/* Grass / trees on rim */}
        <circle cx="50" cy="128" r="6" fill="#245B3C" />
        <circle cx="65" cy="126" r="8" fill="#327450" />
        <circle cx="120" cy="127" r="7" fill="#245B3C" />
        <circle cx="480" cy="128" r="6" fill="#327450" />
        <circle cx="530" cy="126" r="8" fill="#245B3C" />

        {/* --- BENCH 1: Upper Overburden (-15m) --- */}
        <polygon points="0,150 600,150 600,175 0,175" fill="url(#benchTop)" />
        <polygon points="0,175 600,175 600,205 0,205" fill="url(#benchWall)" />

        {/* --- BENCH 2: Intermediate Sandstone (-30m) --- */}
        <polygon points="40,205 560,205 560,225 40,225" fill="url(#benchTop)" />
        <polygon points="40,225 560,225 560,260 40,260" fill="url(#benchWall)" />

        {/* --- BENCH 3: Seam IX Coal Floor (-45m) --- */}
        <polygon points="90,260 510,260 510,345 90,345" fill="url(#coalSeam)" />
        <text x="105" y="335" fill="#E9B949" fontSize="9" fontFamily="monospace" opacity="0.6">
          BARAKAR COAL SEAM IX FACE (-45M)
        </text>

        {/* --- HAUL ROAD NETWORK (Switchback) --- */}
        {/* Road 1: Top down to intermediate */}
        <path
          d="M 580,160 L 360,205 L 120,240 L 440,270 L 220,310"
          fill="none"
          stroke="url(#roadGrad)"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Road Center Line (Dashed) */}
        <path
          d="M 580,160 L 360,205 L 120,240 L 440,270 L 220,310"
          fill="none"
          stroke="#E9B949"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />

        {/* --- OVERLAND CONVEYOR SYSTEM (IPCC) --- */}
        {/* Conveyor Gantry Structure */}
        <line x1="180" y1="305" x2="520" y2="145" stroke="#475569" strokeWidth="4" />
        <line x1="260" y1="270" x2="260" y2="295" stroke="#64748B" strokeWidth="2.5" />
        <line x1="360" y1="225" x2="360" y2="255" stroke="#64748B" strokeWidth="2.5" />
        <line x1="440" y1="185" x2="440" y2="210" stroke="#64748B" strokeWidth="2.5" />

        {/* Conveyor Belt with Moving Coal Lumps */}
        <line x1="180" y1="303" x2="520" y2="143" stroke="#1E293B" strokeWidth="2.5" />
        <g className="animate-pulse">
          <circle cx="220" cy="285" r="2.5" fill="#252A25" />
          <circle cx="280" cy="257" r="2.5" fill="#252A25" />
          <circle cx="340" cy="230" r="2.5" fill="#252A25" />
          <circle cx="410" cy="198" r="2.5" fill="#252A25" />
          <circle cx="470" cy="168" r="2.5" fill="#252A25" />
        </g>
        <circle cx="522" cy="144" r="5" fill="#D97706" />

        {/* --- EQUIPMENT 1: Hydraulic Excavator at Pit Face --- */}
        <g transform="translate(140, 275)">
          {/* Crawler Tracks */}
          <rect x="0" y="24" width="48" height="12" rx="6" fill="#334155" />
          <circle cx="8" cy="30" r="4" fill="#64748B" />
          <circle cx="24" cy="30" r="4" fill="#64748B" />
          <circle cx="40" cy="30" r="4" fill="#64748B" />

          {/* Rotating Cab House */}
          <rect x="6" y="8" width="34" height="18" rx="3" fill="#E9B949" stroke="#B45309" strokeWidth="1" />
          <rect x="22" y="10" width="14" height="10" rx="1.5" fill="#93C5FD" opacity="0.8" />

          {/* Counterweight */}
          <rect x="6" y="10" width="10" height="14" fill="#252A25" />

          {/* Boom */}
          <line x1="34" y1="14" x2="58" y2="-4" stroke="#E9B949" strokeWidth="5" strokeLinecap="round" />
          {/* Stick */}
          <line x1="58" y1="-4" x2="72" y2="18" stroke="#E9B949" strokeWidth="4" strokeLinecap="round" />
          {/* Bucket */}
          <path d="M 68,16 L 82,18 L 80,30 L 70,26 Z" fill="#334155" />
          {/* Bucket Teeth */}
          <line x1="82" y1="18" x2="85" y2="20" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="80" y1="24" x2="84" y2="25" stroke="#CBD5E1" strokeWidth="2" />
        </g>

        {/* --- EQUIPMENT 2: Haul Truck 1 (Being Loaded at Face) --- */}
        <g transform="translate(245, 290)">
          {/* Tyres */}
          <circle cx="10" cy="20" r="8" fill="#1E293B" stroke="#475569" strokeWidth="2" />
          <circle cx="38" cy="20" r="8" fill="#1E293B" stroke="#475569" strokeWidth="2" />

          {/* Chassis */}
          <rect x="4" y="10" width="40" height="6" fill="#475569" />

          {/* Dump Body (Loaded with Coal) */}
          <polygon points="4,2 40,2 38,12 8,12" fill="#E9B949" stroke="#B45309" strokeWidth="1" />
          <ellipse cx="22" cy="1" rx="15" ry="4" fill="#252A25" />

          {/* Cab */}
          <rect x="36" y="4" width="10" height="10" rx="1.5" fill="#E9B949" />
          <rect x="38" y="5" width="6" height="5" fill="#93C5FD" />
        </g>

        {/* --- EQUIPMENT 3: Haul Truck 2 (Travelling Up Switchback Ramp) --- */}
        <g transform="translate(340, 245) rotate(-6)">
          {/* Tyres */}
          <circle cx="8" cy="16" r="7" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <circle cx="32" cy="16" r="7" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />

          {/* Chassis */}
          <rect x="4" y="8" width="34" height="5" fill="#475569" />

          {/* Empty Dump Body */}
          <polygon points="4,0 32,0 30,9 6,9" fill="#E9B949" stroke="#B45309" strokeWidth="1" />

          {/* Cab */}
          <rect x="30" y="2" width="9" height="9" rx="1.5" fill="#E9B949" />
          <rect x="32" y="3" width="5" height="4" fill="#93C5FD" />

          {/* Headlight beam */}
          <polygon points="39,7 65,3 65,14" fill="#FEF08A" opacity="0.3" />
        </g>

        {/* Water Tanker on Upper Ramp (Dust Suppression Spray) */}
        <g transform="translate(430, 185) rotate(-10)">
          <circle cx="6" cy="12" r="5" fill="#1E293B" />
          <circle cx="22" cy="12" r="5" fill="#1E293B" />
          <rect x="2" y="4" width="24" height="6" fill="#3B82F6" rx="2" />
          <rect x="22" y="3" width="6" height="7" fill="#E9B949" />
          {/* Subtle Water Spray mist */}
          <path d="M 0,10 Q -10,7 -16,12" stroke="#93C5FD" strokeWidth="2" strokeDasharray="2 2" fill="none" opacity="0.7" />
        </g>
      </svg>

      {/* Floating Diagram Labels */}
      <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-lg border border-[#E2E8F0] shadow-sm text-[10px] text-[#252A25] font-mono">
        <span className="font-bold text-[#245B3C]">TERRACED BENCH EXCAVATION</span>
        <span className="text-[#68716B] block">Jharia Open-Cast Schematic</span>
      </div>

      <div className="absolute bottom-3 right-3 bg-white/95 px-2.5 py-1 rounded-lg border border-[#E2E8F0] shadow-sm text-[10px] text-[#252A25] font-mono flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#15803D]" />
        <span>Continuous IPCC Belt Running</span>
      </div>
    </div>
  );
};
