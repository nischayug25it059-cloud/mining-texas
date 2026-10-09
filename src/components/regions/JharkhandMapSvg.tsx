import React from 'react';
import { MapPin, Info } from 'lucide-react';

interface JharkhandMapSvgProps {
  selectedDistrict: string;
  onSelectDistrict: (district: string) => void;
}

export const JharkhandMapSvg: React.FC<JharkhandMapSvgProps> = ({
  selectedDistrict,
  onSelectDistrict,
}) => {
  const districts = [
    { id: 'Dhanbad', name: 'Dhanbad (Jharia Coalfield)', cx: 480, cy: 220, mineral: 'Coal' },
    { id: 'Bokaro', name: 'Bokaro (Bokaro Coalfield)', cx: 410, cy: 230, mineral: 'Coal' },
    { id: 'Ramgarh', name: 'Ramgarh (West/South Karanpura)', cx: 360, cy: 250, mineral: 'Coal' },
    { id: 'Chatra', name: 'Chatra (North Karanpura)', cx: 280, cy: 170, mineral: 'Coal' },
    { id: 'Hazaribagh', name: 'Hazaribagh', cx: 340, cy: 190, mineral: 'Coal' },
    { id: 'Godda', name: 'Godda (Rajmahal Coalfield)', cx: 560, cy: 120, mineral: 'Coal' },
    { id: 'West Singhbhum', name: 'West Singhbhum (Noamundi/Chiria)', cx: 390, cy: 370, mineral: 'Iron Ore' },
    { id: 'East Singhbhum', name: 'East Singhbhum (Ghatsila/Singhbhum)', cx: 470, cy: 340, mineral: 'Copper & Multi' },
    { id: 'Lohardaga', name: 'Lohardaga (Bauxite Plateaus)', cx: 240, cy: 260, mineral: 'Bauxite' },
    { id: 'Ranchi', name: 'Ranchi (State Capital)', cx: 330, cy: 280, mineral: 'Administrative' },
  ];

  return (
    <div className="gov-card p-5 border border-[#E2E8F0] space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
        <div>
          <h3 className="text-sm font-bold text-[#252A25] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#245B3C]" />
            Jharkhand Mining Districts Schematic Map
          </h3>
          <p className="text-xs text-[#68716B]">
            Click any district marker to filter regional coalfields and mineral deposits.
          </p>
        </div>

        <span className="text-[11px] font-mono text-[#68716B] bg-[#F1F5F9] px-2.5 py-1 rounded border border-[#E2E8F0]">
          Illustrative District Map — Not a Survey Cadastral Map
        </span>
      </div>

      <div className="relative w-full h-80 sm:h-96 bg-[#F8F8F4] rounded-xl overflow-hidden border border-[#E2E8F0] flex items-center justify-center">
        <svg 
          viewBox="0 0 650 440" 
          className="w-full h-full select-none"
        >
          <defs>
            <linearGradient id="jharkhandBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F5EFEB" />
            </linearGradient>
            <filter id="mapShadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.06" />
            </filter>
          </defs>

          {/* Stylized State Boundary Shape of Jharkhand */}
          <path
            d="M 170,140 Q 230,100 320,110 T 450,90 T 560,70 Q 610,120 580,180 T 540,240 T 510,320 T 450,400 Q 360,420 300,380 T 210,340 T 150,270 Q 120,200 170,140 Z"
            fill="url(#jharkhandBg)"
            stroke="#65866B"
            strokeWidth="2.5"
            strokeDasharray="4 2"
            filter="url(#mapShadow)"
          />

          {/* District Boundary Guide Curves */}
          <path d="M 280,110 Q 330,190 330,280" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
          <path d="M 330,280 Q 420,280 510,240" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
          <path d="M 330,280 L 390,400" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
          <path d="M 450,90 Q 450,190 410,230" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />

          {/* Major River Lines: Damodar & Subarnarekha */}
          <path
            d="M 220,210 Q 340,240 460,230 T 570,260"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <text x="370" y="225" fill="#3B82F6" fontSize="9" fontStyle="italic" opacity="0.8">
            Damodar Basin (Coal Belt)
          </text>

          <path
            d="M 350,300 Q 430,340 500,380"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <text x="430" y="365" fill="#3B82F6" fontSize="9" fontStyle="italic" opacity="0.8">
            Subarnarekha Valley
          </text>

          {/* District Node Markers */}
          {districts.map(d => {
            const isSelected = selectedDistrict === d.id;
            const isCapital = d.id === 'Ranchi';
            const isCoal = d.mineral === 'Coal';
            const isIron = d.mineral === 'Iron Ore';
            const isBauxite = d.mineral === 'Bauxite';

            const nodeColor = isCapital ? '#475569' : isCoal ? '#245B3C' : isIron ? '#B45309' : isBauxite ? '#D97706' : '#0369A1';

            return (
              <g
                key={d.id}
                onClick={() => onSelectDistrict(d.id === selectedDistrict ? 'all' : d.id)}
                className="cursor-pointer group"
              >
                {/* Ping ring if selected */}
                {isSelected && (
                  <circle
                    cx={d.cx}
                    cy={d.cy}
                    r="16"
                    fill="none"
                    stroke={nodeColor}
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    className="animate-spin-slow"
                  />
                )}

                {/* Marker Outer Circle */}
                <circle
                  cx={d.cx}
                  cy={d.cy}
                  r={isSelected ? "9" : "7"}
                  fill={isSelected ? nodeColor : "#FFFFFF"}
                  stroke={nodeColor}
                  strokeWidth="2.5"
                  className="transition-all duration-200 group-hover:scale-125"
                />

                {/* Center dot */}
                <circle
                  cx={d.cx}
                  cy={d.cy}
                  r="3"
                  fill={isSelected ? "#FFFFFF" : nodeColor}
                />

                {/* District Label Text */}
                <text
                  x={d.cx}
                  y={d.cy - 12}
                  textAnchor="middle"
                  fill={isSelected ? "#245B3C" : "#252A25"}
                  fontSize={isSelected ? "11" : "10"}
                  fontWeight={isSelected ? "bold" : "600"}
                  className="transition-colors pointer-events-none select-none"
                >
                  {d.name.split(' ')[0]}
                </text>

                {/* Secondary mineral tag text */}
                <text
                  x={d.cx}
                  y={d.cy + 16}
                  textAnchor="middle"
                  fill="#68716B"
                  fontSize="8.5"
                  className="pointer-events-none select-none font-mono"
                >
                  [{d.mineral}]
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend Overlay at bottom left */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm p-2.5 rounded-lg border border-[#E2E8F0] shadow-sm text-[10px] space-y-1">
          <span className="font-bold text-[#252A25] block uppercase font-mono text-[9px]">Mineral Key</span>
          <div className="flex items-center gap-1.5 text-[#252A25]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#245B3C]" />
            <span>Coalfields (Gondwana)</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#252A25]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
            <span>Iron Ore (Precambrian)</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#252A25]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
            <span>Bauxite (Laterite Pats)</span>
          </div>
        </div>

        {/* Reset Selection Button */}
        {selectedDistrict !== 'all' && (
          <button
            onClick={() => onSelectDistrict('all')}
            className="absolute top-3 right-3 bg-white px-2.5 py-1 rounded-md text-xs font-semibold text-[#245B3C] border border-[#CBD5E1] shadow-sm hover:bg-[#F8F8F4] transition-colors"
          >
            Reset Filter (Show All Districts)
          </button>
        )}
      </div>
    </div>
  );
};
