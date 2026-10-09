import React from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Layers, 
  Camera, 
  Play, 
  Pause, 
  Compass,
  Route,
  Shield
} from 'lucide-react';

export interface TwinLayers {
  roads: boolean;
  zones: boolean;
  fleet: boolean;
  heatmap: boolean;
  hazards: boolean;
  conveyors: boolean;
}

interface TwinControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  layers: TwinLayers;
  onToggleLayer: (key: keyof TwinLayers) => void;
  viewMode: '3d' | '2d';
  onToggleViewMode: () => void;
  cameraPreset: string;
  onSelectCameraPreset: (preset: string) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const TwinControls: React.FC<TwinControlsProps> = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  layers,
  onToggleLayer,
  viewMode,
  onToggleViewMode,
  cameraPreset,
  onSelectCameraPreset,
  isPlaying,
  onTogglePlay,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-[#E2E8F0] shadow-sm text-xs">
      {/* Left: View Mode & Presets */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleViewMode}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 border ${
            viewMode === '3d'
              ? 'bg-[#E8F0EC] border-[#245B3C] text-[#245B3C]'
              : 'bg-[#F8F8F4] border-[#E2E8F0] text-[#252A25]'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-[#245B3C]" />
          <span>{viewMode === '3d' ? '3D Isometric' : '2D Schematic'}</span>
        </button>

        <div className="h-4 w-px bg-[#E2E8F0] hidden sm:block" />

        {/* Camera presets */}
        <div className="hidden md:flex items-center gap-1">
          <span className="text-[#68716B] text-[11px] mr-1 flex items-center gap-1">
            <Camera className="w-3 h-3 text-[#245B3C]" /> Focus:
          </span>
          {[
            { id: 'overview', label: 'Full Pit' },
            { id: 'zone-a', label: 'High-Wall' },
            { id: 'zone-b', label: 'Overburden' },
            { id: 'zone-d', label: 'Crusher IPCC' },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => onSelectCameraPreset(p.id)}
              className={`px-2 py-1 rounded text-[11px] transition-colors ${
                cameraPreset === p.id
                  ? 'bg-[#245B3C] text-white font-medium shadow-sm'
                  : 'text-[#68716B] hover:text-[#252A25] hover:bg-[#F8F8F4]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Middle: Layer Toggles */}
      <div className="flex items-center gap-1.5">
        <span className="text-[#68716B] text-[11px] hidden sm:inline mr-1">Layers:</span>
        <button
          onClick={() => onToggleLayer('roads')}
          className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 transition-colors border ${
            layers.roads
              ? 'bg-[#E8F0EC] border-[#245B3C] text-[#245B3C] font-semibold'
              : 'bg-[#F8F8F4] border-[#E2E8F0] text-[#68716B]'
          }`}
          title="Toggle Haulage Routes"
        >
          <Route className="w-3 h-3 text-[#245B3C]" />
          <span>Ramps</span>
        </button>

        <button
          onClick={() => onToggleLayer('conveyors')}
          className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 transition-colors border ${
            layers.conveyors
              ? 'bg-[#E0F2FE] border-[#0284C7] text-[#0369A1] font-semibold'
              : 'bg-[#F8F8F4] border-[#E2E8F0] text-[#68716B]'
          }`}
          title="Toggle Conveyor Belts"
        >
          <Layers className="w-3 h-3 text-[#0369A1]" />
          <span>IPCC</span>
        </button>

        <button
          onClick={() => onToggleLayer('hazards')}
          className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 transition-colors border ${
            layers.hazards
              ? 'bg-[#FEE2E2] border-[#DC2626] text-[#B91C1C] font-semibold'
              : 'bg-[#F8F8F4] border-[#E2E8F0] text-[#68716B]'
          }`}
          title="Toggle Blast Perimeters & Geofences"
        >
          <Shield className="w-3 h-3 text-[#DC2626]" />
          <span>Geo-Fences</span>
        </button>
      </div>

      {/* Right: Zoom & Play controls */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onTogglePlay}
          className={`p-1.5 rounded-lg border transition-colors ${
            isPlaying
              ? 'bg-[#FEF3C7] border-[#FDE047] text-[#B45309]'
              : 'bg-[#F8F8F4] border-[#E2E8F0] text-[#252A25]'
          }`}
          title={isPlaying ? 'Pause vehicle motion' : 'Play vehicle motion'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <div className="h-4 w-px bg-[#E2E8F0]" />

        <button
          onClick={onZoomIn}
          className="p-1.5 rounded-lg bg-[#F8F8F4] hover:bg-[#E2E8F0] text-[#252A25] border border-[#CBD5E1] transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <span className="font-mono text-[10px] text-[#252A25] w-8 text-center font-bold">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={onZoomOut}
          className="p-1.5 rounded-lg bg-[#F8F8F4] hover:bg-[#E2E8F0] text-[#252A25] border border-[#CBD5E1] transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onResetZoom}
          className="p-1.5 rounded-lg bg-[#F8F8F4] hover:bg-[#E2E8F0] text-[#252A25] border border-[#CBD5E1] transition-colors"
          title="Reset View"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
