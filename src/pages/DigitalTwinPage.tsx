import React, { useState } from 'react';
import { useMining } from '../context/MiningContext';
import { MineScene3D } from '../components/digitalTwin/MineScene3D';
import { TwinControls, TwinLayers } from '../components/digitalTwin/TwinControls';
import { TwinLegend } from '../components/digitalTwin/TwinLegend';
import { EquipmentStudio } from '../components/studio/EquipmentStudio';
import { StatusBadge, RiskBadge } from '../components/common/StatusBadge';
import { 
  Box, 
  Layers, 
  ExternalLink,
  ChevronRight,
  X,
  MapPin,
  AlertTriangle,
  Compass,
  Wrench,
  ShieldCheck,
  Truck
} from 'lucide-react';

export const DigitalTwinPage: React.FC = () => {
  const { 
    equipment, 
    zones, 
    selectedMachine, 
    setSelectedMachine,
    telemetryActive,
    toggleTelemetry
  } = useMining();

  const [activeTab, setActiveTab] = useState<'3d_twin' | 'schematic_2d' | 'equipment_studio'>('3d_twin');
  const [zoom, setZoom] = useState<number>(1);
  const [cameraPreset, setCameraPreset] = useState<string>('overview');

  const [layers, setLayers] = useState<TwinLayers>({
    roads: true,
    zones: true,
    fleet: true,
    heatmap: false,
    hazards: true,
    conveyors: true,
  });

  const handleToggleLayer = (key: keyof TwinLayers) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleZoomIn = () => setZoom(prev => Math.min(2.0, Number((prev + 0.15).toFixed(2))));
  const handleZoomOut = () => setZoom(prev => Math.max(0.6, Number((prev - 0.15).toFixed(2))));
  const handleResetZoom = () => {
    setZoom(1);
    setCameraPreset('overview');
  };

  return (
    <div className="space-y-4 flex flex-col min-h-[calc(100vh-140px)]">
      {/* Top Header Banner */}
      <div className="gov-card p-4 sm:p-5 border-l-4 border-l-[#245B3C] shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-[#E8F0EC] text-[#245B3C] border border-[#65866B]/30">
                Spatial Cyber-Physical Systems (CPS)
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-[#FAF8F5] text-[#854D0E] border border-[#E9B949]">
                Illustrative Open-Cast Layout
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#252A25] flex items-center gap-2">
              <Box className="w-5 h-5 text-[#245B3C]" />
              Digital Twin: Opencast Mine &amp; Equipment Studio
            </h1>
            <p className="text-xs text-[#68716B] mt-0.5">
              Interactive 3D bench terrain, 2D operational layout with excavation benches, and precision vector heavy machinery schematics.
            </p>
          </div>

          {/* Anomaly Spotlight */}
          <div 
            onClick={() => {
              const ht = equipment.find(e => e.id === 'HT-201');
              if (ht) setSelectedMachine(ht);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FEF3C7] border border-[#F59E0B]/40 text-xs cursor-pointer hover:bg-[#FDE68A] transition-colors shrink-0"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D97706] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D97706]"></span>
            </span>
            <span className="text-[#92400E]">
              Spotlight Anomaly: <strong className="font-mono">HT-201 (Ramp 4)</strong>
            </span>
            <ExternalLink className="w-3 h-3 text-[#92400E]" />
          </div>
        </div>

        {/* View Tab Selector */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#E2E8F0]">
          <button
            onClick={() => setActiveTab('3d_twin')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === '3d_twin'
                ? 'bg-[#245B3C] text-white shadow-sm'
                : 'bg-[#F1F5F9] text-[#68716B] hover:bg-[#E2E8F0]'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D Bench Terrain Twin</span>
          </button>

          <button
            onClick={() => setActiveTab('schematic_2d')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'schematic_2d'
                ? 'bg-[#245B3C] text-white shadow-sm'
                : 'bg-[#F1F5F9] text-[#68716B] hover:bg-[#E2E8F0]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2D Schematic Mine Layout</span>
          </button>

          <button
            onClick={() => setActiveTab('equipment_studio')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'equipment_studio'
                ? 'bg-[#245B3C] text-white shadow-sm'
                : 'bg-[#F1F5F9] text-[#68716B] hover:bg-[#E2E8F0]'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Inside Heavy Equipment (Vector Studio)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: 3D DIGITAL TWIN */}
      {activeTab === '3d_twin' && (
        <div className="flex flex-col flex-1 space-y-3">
          {/* Controls Bar */}
          <div className="shrink-0">
            <TwinControls
              zoom={zoom}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onResetZoom={handleResetZoom}
              layers={layers}
              onToggleLayer={handleToggleLayer}
              viewMode="3d"
              onToggleViewMode={() => {}}
              cameraPreset={cameraPreset}
              onSelectCameraPreset={setCameraPreset}
              isPlaying={telemetryActive}
              onTogglePlay={toggleTelemetry}
            />
          </div>

          {/* Interactive 3D Canvas Container */}
          <div className="relative flex-1 w-full min-h-[560px] rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm bg-[#FAF8F5]">
            <MineScene3D
              equipment={equipment}
              zones={zones}
              layers={layers}
              viewMode="3d"
              cameraPreset={cameraPreset}
              zoom={zoom}
              onSelectMachine={(mach) => setSelectedMachine(mach)}
              selectedMachineId={selectedMachine?.id}
            />

            {/* Floating Legend */}
            <div className="absolute top-4 left-4 z-30 max-w-xs hidden sm:block">
              <TwinLegend />
            </div>

            {/* Selected Machine Telemetry HUD Drawer */}
            {selectedMachine && (
              <div className="absolute top-4 right-4 z-30 w-80 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#E2E8F0] shadow-xl text-xs text-[#252A25] animate-in fade-in slide-in-from-right-4">
                <div className="flex items-start justify-between border-b border-[#E2E8F0] pb-2.5 mb-3">
                  <div>
                    <span className="font-bold text-sm block text-[#252A25]">{selectedMachine.name}</span>
                    <span className="font-mono text-[10px] text-[#68716B]">{selectedMachine.id} | {selectedMachine.model}</span>
                  </div>
                  <button
                    onClick={() => setSelectedMachine(null)}
                    className="text-[#68716B] hover:text-[#252A25] p-1 rounded-md hover:bg-[#F1F5F9]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-3">
                  <div className="p-2 bg-[#F8F8F4] rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] text-[#68716B] font-sans block">Health Index</span>
                    <span className={`text-base font-bold ${selectedMachine.healthScore < 60 ? 'text-[#DC2626]' : 'text-[#15803D]'}`}>
                      {selectedMachine.healthScore}%
                    </span>
                  </div>
                  <div className="p-2 bg-[#F8F8F4] rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] text-[#68716B] font-sans block">Remaining Life</span>
                    <span className="text-base font-bold text-[#252A25]">
                      {selectedMachine.rulHours}h
                    </span>
                  </div>
                  <div className="p-2 bg-[#F8F8F4] rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] text-[#68716B] font-sans block">Engine Temp</span>
                    <span className={`text-base font-bold ${selectedMachine.engineTemp > 95 ? 'text-[#DC2626]' : 'text-[#252A25]'}`}>
                      {selectedMachine.engineTemp}°C
                    </span>
                  </div>
                  <div className="p-2 bg-[#F8F8F4] rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] text-[#68716B] font-sans block">Vibration RMS</span>
                    <span className={`text-base font-bold ${selectedMachine.vibration > 4.5 ? 'text-[#DC2626]' : 'text-[#252A25]'}`}>
                      {selectedMachine.vibration} mm/s
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-[#68716B] mb-3">
                  <p>Location: <strong className="text-[#252A25]">{selectedMachine.zoneName}</strong></p>
                  <p className="line-clamp-2">Task: <span className="text-[#252A25]">{selectedMachine.currentTask}</span></p>
                </div>

                <button
                  onClick={() => setSelectedMachine(selectedMachine)}
                  className="w-full py-2 bg-[#245B3C] hover:bg-[#1E4D33] text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1 shadow-sm"
                >
                  Open Full Diagnostic Dossier <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: 2D SCHEMATIC MINE LAYOUT */}
      {activeTab === 'schematic_2d' && (
        <div className="gov-card p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
            <div>
              <h2 className="text-lg font-bold text-[#252A25]">
                2D Schematic Opencast Mine Layout
              </h2>
              <p className="text-xs text-[#68716B]">
                Illustrative representation of terraced extraction benches, switchback haul roads, drill patterns, in-pit crushers, and overland dispatch corridors.
              </p>
            </div>
            <span className="text-xs font-mono text-[#245B3C] bg-[#E8F0EC] px-3 py-1.5 rounded-lg border border-[#65866B]/30 font-semibold self-start sm:self-auto">
              DGMS Safety Compliant Benches
            </span>
          </div>

          {/* Interactive Vector 2D Mine Plan SVG */}
          <div className="w-full h-[450px] bg-[#FAF8F5] rounded-xl border border-[#E2E8F0] p-4 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 800 450" className="w-full h-full max-h-[450px]">
              {/* Background Earth Tone */}
              <rect x="0" y="0" width="800" height="450" fill="#FAF8F5" />

              {/* Benches */}
              {/* Overburden Top Bench 1 */}
              <polygon points="50,40 750,40 730,90 70,90" fill="#EADBC8" stroke="#D8C3A5" strokeWidth="2" />
              <text x="80" y="65" fill="#786650" fontSize="11" fontFamily="monospace" fontWeight="bold">BENCH 1: OVERBURDEN STRIPPING (ELEV: +120m)</text>

              {/* Overburden Bench 2 */}
              <polygon points="70,90 730,90 710,140 90,140" fill="#DFCEB7" stroke="#D8C3A5" strokeWidth="2" />
              <text x="100" y="115" fill="#786650" fontSize="11" fontFamily="monospace" fontWeight="bold">BENCH 2: DRILL &amp; BLAST PATTERN (ELEV: +90m)</text>

              {/* Intermediate Bench 3 */}
              <polygon points="90,140 710,140 690,190 110,190" fill="#D4C1A8" stroke="#D8C3A5" strokeWidth="2" />
              <text x="120" y="165" fill="#786650" fontSize="11" fontFamily="monospace" fontWeight="bold">BENCH 3: SHALE INTERBURDEN (ELEV: +60m)</text>

              {/* Primary Coal Seam Bench 4 (Seam IX/X) */}
              <polygon points="110,190 690,190 670,250 130,250" fill="#252A25" stroke="#183E28" strokeWidth="2" />
              <text x="140" y="225" fill="#E9B949" fontSize="12" fontFamily="monospace" fontWeight="bold">BENCH 4: PRIME COKING COAL SEAM IX (ELEV: +25m)</text>

              {/* Pit Floor */}
              <polygon points="130,250 670,250 650,310 150,310" fill="#1C1E1C" stroke="#101210" strokeWidth="2" />
              <text x="160" y="285" fill="#94A3B8" fontSize="11" fontFamily="monospace" fontWeight="bold">PIT SUMP &amp; LOADING FACE 3 (ELEV: -10m)</text>

              {/* Switchback Haul Road */}
              <path
                d="M 50,45 L 200,90 L 150,140 L 320,190 L 280,250 L 450,310 L 650,310 L 710,190 L 730,90 L 750,45"
                fill="none"
                stroke="#65866B"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />
              <path
                d="M 50,45 L 200,90 L 150,140 L 320,190 L 280,250 L 450,310 L 650,310 L 710,190 L 730,90 L 750,45"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeDasharray="8 8"
                opacity="0.9"
              />

              {/* Overland Conveyor System (Right Side) */}
              <line x1="650" y1="280" x2="760" y2="40" stroke="#B45309" strokeWidth="6" />
              <circle cx="650" cy="280" r="10" fill="#D97706" />
              <circle cx="760" cy="40" r="12" fill="#D97706" />
              <text x="680" y="200" fill="#B45309" fontSize="10" fontFamily="monospace" fontWeight="bold" transform="rotate(-62 680 200)">
                OVERLAND CONVEYOR (IPCC) &rarr;
              </text>

              {/* Machine Nodes (Clickable) */}
              {/* Excavator EX-101 at Coal Face */}
              <g 
                onClick={() => {
                  const m = equipment.find(e => e.id === 'EX-101');
                  if (m) setSelectedMachine(m);
                }}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <circle cx="240" cy="225" r="14" fill="#245B3C" stroke="#FFFFFF" strokeWidth="2" />
                <text x="240" y="229" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">EX1</text>
              </g>

              {/* Haul Truck HT-201 on Ramp */}
              <g 
                onClick={() => {
                  const m = equipment.find(e => e.id === 'HT-201');
                  if (m) setSelectedMachine(m);
                }}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <circle cx="360" cy="275" r="14" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
                <text x="360" y="279" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">HT1</text>
              </g>

              {/* Drill Rig DR-301 on Bench 2 */}
              <g 
                onClick={() => {
                  const m = equipment.find(e => e.id === 'DR-301');
                  if (m) setSelectedMachine(m);
                }}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <circle cx="480" cy="115" r="14" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
                <text x="480" y="119" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">DR1</text>
              </g>

              {/* Conveyor CV-401 */}
              <g 
                onClick={() => {
                  const m = equipment.find(e => e.id === 'CV-401');
                  if (m) setSelectedMachine(m);
                }}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <circle cx="700" cy="160" r="14" fill="#D97706" stroke="#FFFFFF" strokeWidth="2" />
                <text x="700" y="164" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">CV1</text>
              </g>

              {/* Surface Dispatch Zone */}
              <rect x="50" y="340" width="700" height="90" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
              <text x="70" y="365" fill="#245B3C" fontSize="12" fontWeight="bold">SURFACE INFRASTRUCTURE &amp; MATERIAL DISPATCH</text>
              <text x="70" y="385" fill="#68716B" fontSize="11">Coal Washery Complex &bull; Rapid Loading Silo &bull; Rail Track Merry-Go-Round (MGR) Loops</text>
              <text x="70" y="405" fill="#68716B" fontSize="11">Maintenance Workshop Bay 1-4 &bull; Fuel Staging Reservoir &bull; Central Control Room</text>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E2E8F0]">
              <span className="font-semibold text-[#252A25] block">Bench Height &amp; Slope</span>
              <span className="text-[#68716B] text-[11px]">15m bench height with 70° safe batter angle</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E2E8F0]">
              <span className="font-semibold text-[#252A25] block">Ramp Gradient</span>
              <span className="text-[#68716B] text-[11px]">1:12 (8.3%) maximum design gradient</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E2E8F0]">
              <span className="font-semibold text-[#252A25] block">Haul Road Width</span>
              <span className="text-[#68716B] text-[11px]">30m wide (3.5x maximum truck tyre width)</span>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E2E8F0]">
              <span className="font-semibold text-[#252A25] block">Safety Berms</span>
              <span className="text-[#68716B] text-[11px]">Berm height &gt; tyre radius along all ramps</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INSIDE HEAVY EQUIPMENT (EQUIPMENT STUDIO) */}
      {activeTab === 'equipment_studio' && (
        <EquipmentStudio />
      )}
    </div>
  );
};
