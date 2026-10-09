import React, { useState, useRef } from 'react';
import { 
  Equipment, 
  MiningZone, 
  EquipmentType, 
  EquipmentStatus 
} from '../../types/mining';
import { TwinLayers } from './TwinControls';
import { 
  Truck, 
  Construction, 
  Drill, 
  MapPin, 
  Zap, 
  Droplets,
  Layers,
  Info
} from 'lucide-react';

interface MineScene3DProps {
  equipment: Equipment[];
  zones: MiningZone[];
  layers: TwinLayers;
  viewMode: '3d' | '2d';
  cameraPreset: string;
  zoom: number;
  onSelectMachine: (machine: Equipment) => void;
  selectedMachineId?: string;
}

export const MineScene3D: React.FC<MineScene3DProps> = ({
  equipment,
  zones,
  layers,
  viewMode,
  cameraPreset,
  zoom,
  onSelectMachine,
  selectedMachineId,
}) => {
  const [hoveredMachine, setHoveredMachine] = useState<Equipment | null>(null);
  const [hoveredZone, setHoveredZone] = useState<MiningZone | null>(null);
  
  // Pan state
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Get status color for light theme
  const getStatusBg = (status: EquipmentStatus) => {
    switch (status) {
      case 'operational': return 'bg-[#E9B949] border-[#B45309] text-[#252A25] shadow-sm';
      case 'warning': return 'bg-[#FEF3C7] border-[#D97706] text-[#B45309] shadow-sm';
      case 'critical': return 'bg-[#FEE2E2] border-[#DC2626] text-[#B91C1C] shadow-sm animate-pulse';
      case 'idle': return 'bg-[#F1F5F9] border-[#94A3B8] text-[#475569]';
      case 'maintenance': return 'bg-[#E0E7FF] border-[#6366F1] text-[#4338CA]';
    }
  };

  // Preset camera offsets
  let presetTransform = '';
  if (cameraPreset === 'zone-a') {
    presetTransform = 'translate(15%, 15%) scale(1.3)';
  } else if (cameraPreset === 'zone-b') {
    presetTransform = 'translate(-20%, 15%) scale(1.3)';
  } else if (cameraPreset === 'zone-d') {
    presetTransform = 'translate(-18%, -18%) scale(1.3)';
  }

  return (
    <div 
      className="relative w-full h-full min-h-[580px] bg-[#F4EFE6] rounded-2xl overflow-hidden select-none cursor-grab active:cursor-grabbing border border-[#D8C9B4]"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Light Geological Grid */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(to right, #B39775 1px, transparent 1px), linear-gradient(to bottom, #B39775 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main Pit Container */}
      <div 
        className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) ${presetTransform}`,
          perspective: viewMode === '3d' ? '1200px' : 'none',
        }}
      >
        <div 
          className="relative w-[950px] h-[650px] bg-[#EFE8DC] rounded-3xl border border-[#C8B8A2] shadow-gov transition-all duration-500"
          style={{
            transform: viewMode === '3d' ? 'rotateX(36deg) rotateZ(-15deg) scale(0.92)' : 'none',
            transformStyle: 'preserve-3d',
            boxShadow: '0 20px 45px -10px rgba(100, 70, 40, 0.15)',
          }}
        >
          {/* 1. Terraced Open-Pit Elevation Steps (SVG Contour Benches) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              <pattern id="lightHazardStripe" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="10" height="20" fill="rgba(220, 38, 38, 0.12)" />
                <rect x="10" width="10" height="20" fill="transparent" />
              </pattern>
            </defs>

            {/* Bench Contour 1: Surface Rim (0m) */}
            <path
              d="M 60,60 L 890,60 L 890,590 L 60,590 Z"
              fill="#E8DFD3"
              stroke="#BAA892"
              strokeWidth="2"
            />
            {/* Bench Contour 2: Upper Overburden Bench (-15m) */}
            <path
              d="M 120,110 L 830,110 L 830,540 L 120,540 Z"
              fill="#DDCFBF"
              stroke="#B39F88"
              strokeWidth="2"
            />
            {/* Bench Contour 3: Sandstone Intermediate Bench (-30m) */}
            <path
              d="M 170,160 L 760,160 L 760,480 L 170,480 Z"
              fill="#D0C0AC"
              stroke="#9E8770"
              strokeWidth="2"
            />
            {/* Bench Contour 4: Pit Bottom Coal Seam IX Face (-45m) */}
            <path
              d="M 210,210 L 520,210 L 520,430 L 210,430 Z"
              fill="#3A3E3B"
              stroke="#252A25"
              strokeWidth="2"
            />
            <text x="230" y="235" fill="#E9B949" fontSize="11" fontFamily="monospace" fontWeight="bold">
              SEAM IX COAL DIG FACE (-45M)
            </text>

            {/* 2. Switchback Haul Road Network (Green route markings) */}
            {layers.roads && (
              <g className="roads-layer">
                {/* Main Switchback Ramp from Deep Pit to Crusher */}
                <path
                  d="M 280,310 Q 380,330 450,280 T 560,240 T 670,300 T 730,420 T 720,520 L 700,560"
                  fill="none"
                  stroke="#BA9F7F"
                  strokeWidth="20"
                  strokeLinecap="round"
                />
                {/* Green route center line */}
                <path
                  d="M 280,310 Q 380,330 450,280 T 560,240 T 670,300 T 730,420 T 720,520 L 700,560"
                  fill="none"
                  stroke="#245B3C"
                  strokeWidth="3.5"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                />

                {/* Overburden Haul Route: Bench 3 to South Waste Dump */}
                <path
                  d="M 680,210 Q 640,290 580,380 T 460,460 T 320,530"
                  fill="none"
                  stroke="#BA9F7F"
                  strokeWidth="18"
                  strokeLinecap="round"
                />
                <path
                  d="M 680,210 Q 640,290 580,380 T 460,460 T 320,530"
                  fill="none"
                  stroke="#65866B"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                />
              </g>
            )}

            {/* 3. Overland Conveyor Belt (IPCC System) */}
            {layers.conveyors && (
              <g className="conveyor-layer">
                <path
                  d="M 520,380 L 650,490 L 800,540"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="6"
                  strokeLinecap="square"
                />
                <path
                  d="M 520,380 L 650,490 L 800,540"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeDasharray="8 4"
                />
              </g>
            )}

            {/* 4. Blast Perimeter Exclusion Hazard Zone */}
            {layers.hazards && (
              <g className="hazard-zone">
                <rect
                  x="630"
                  y="120"
                  width="180"
                  height="120"
                  rx="12"
                  fill="url(#lightHazardStripe)"
                  stroke="#DC2626"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
                <text x="645" y="145" fill="#DC2626" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  BLAST EXCLUSION PERIMETER
                </text>
              </g>
            )}
          </svg>

          {/* 5. Zone Overlays & Labels */}
          {layers.zones && (
            <div className="absolute inset-0 pointer-events-none">
              {zones.map(zone => (
                <div
                  key={zone.id}
                  className="absolute pointer-events-auto p-3 rounded-2xl border transition-all duration-200 cursor-pointer hover:bg-white/40"
                  style={{
                    left: `${zone.coordinates.x}%`,
                    top: `${zone.coordinates.y}%`,
                    width: `${zone.coordinates.width}%`,
                    height: `${zone.coordinates.height}%`,
                    borderColor: zone.id === 'zone-a' ? '#245B3C' : '#94A3B8',
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  }}
                  onMouseEnter={() => setHoveredZone(zone)}
                  onMouseLeave={() => setHoveredZone(null)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-[#CBD5E1] text-[#245B3C]">
                      {zone.code}
                    </span>
                    <span className="text-[10px] text-[#252A25] font-mono font-semibold">
                      {zone.targetTonnage}t target
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#252A25] mt-1 truncate">{zone.name}</h4>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-[#68716B] font-mono">
                    <span>Queue: {zone.avgQueueMinutes}m</span>
                    <span>•</span>
                    <span>Dust: {zone.dustPm10}µg</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 6. Live Equipment Markers on Map */}
          {layers.fleet && equipment.map(item => {
            const isSelected = selectedMachineId === item.id;
            const isWarningMachine = item.id === 'HT-201';

            return (
              <div
                key={item.id}
                onClick={e => {
                  e.stopPropagation();
                  onSelectMachine(item);
                }}
                onMouseEnter={() => setHoveredMachine(item)}
                onMouseLeave={() => setHoveredMachine(null)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-20 group ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                }`}
                style={{
                  left: `${item.position.x}%`,
                  top: `${item.position.y}%`,
                }}
              >
                {/* Ping circle for HT-201 anomaly */}
                {isWarningMachine && (
                  <span className="absolute -inset-2 rounded-full bg-[#DC2626]/30 animate-ping-slow pointer-events-none" />
                )}

                {/* Marker Badge (Yellow ochre equipment) */}
                <div 
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-sm font-mono text-[10px] font-bold ${getStatusBg(item.status)} ${
                    isSelected ? 'ring-2 ring-[#245B3C] ring-offset-2 ring-offset-white' : ''
                  }`}
                >
                  {item.type === 'haul_truck' && <Truck className="w-3 h-3 text-[#252A25]" />}
                  {item.type === 'excavator' && <Construction className="w-3 h-3 text-[#252A25]" />}
                  {item.type === 'drill_rig' && <Drill className="w-3 h-3 text-[#252A25]" />}
                  {item.type === 'conveyor' && <Zap className="w-3 h-3 text-[#0284C7]" />}
                  {item.type === 'water_tanker' && <Droplets className="w-3 h-3 text-[#0284C7]" />}
                  {item.type === 'wheel_loader' && <Construction className="w-3 h-3 text-[#252A25]" />}
                  {item.type === 'dozer' && <Construction className="w-3 h-3 text-[#252A25]" />}

                  <span>{item.id}</span>
                </div>

                {item.type === 'haul_truck' && item.speedKmh > 0 && (
                  <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-[#252A25] bg-white px-1 rounded shadow-sm border border-[#E2E8F0]">
                    {item.speedKmh}kph
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      {hoveredMachine && (
        <div className="absolute bottom-5 left-5 z-40 bg-white p-3.5 rounded-xl border border-[#CBD5E1] shadow-lg text-xs w-72 pointer-events-none animate-in fade-in">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2 mb-2">
            <div>
              <span className="font-bold text-[#252A25] block">{hoveredMachine.name}</span>
              <span className="font-mono text-[10px] text-[#68716B]">{hoveredMachine.id} | {hoveredMachine.model}</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#FEF3C7] text-[#B45309]">
              {hoveredMachine.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono text-[11px] text-[#252A25]">
            <div>Temp: <strong>{hoveredMachine.engineTemp}°C</strong></div>
            <div>Vib: <strong>{hoveredMachine.vibration} mm/s</strong></div>
            <div>Health: <strong>{hoveredMachine.healthScore}/100</strong></div>
            <div>RUL: <strong>{hoveredMachine.rulHours} hrs</strong></div>
          </div>

          <p className="mt-2 text-[10px] text-[#68716B] border-t border-[#E2E8F0] pt-1.5 truncate">
            Task: {hoveredMachine.currentTask}
          </p>
        </div>
      )}

      {/* Watermark Notice */}
      <div className="absolute top-4 right-4 z-20 bg-white/95 px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-[10px] font-mono text-[#252A25] shadow-sm pointer-events-none">
        <span>Illustrative Mine Layout — Not a Survey Map</span>
        <span className="text-[#94A3B8] ml-2">|</span>
        <span className="text-[#245B3C] font-bold ml-2">JHARIA PIT NO. 4</span>
      </div>
    </div>
  );
};
