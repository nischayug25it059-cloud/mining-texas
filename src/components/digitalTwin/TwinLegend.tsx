import React from 'react';
import { Layers } from 'lucide-react';

export const TwinLegend: React.FC = () => {
  return (
    <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#E2E8F0] text-xs shadow-md space-y-2.5 text-[#252A25]">
      <div className="flex items-center gap-1.5 font-bold text-[#252A25] border-b border-[#E2E8F0] pb-2 text-[11px] uppercase tracking-wider">
        <Layers className="w-3.5 h-3.5 text-[#245B3C]" />
        Digital Twin Spatial Legend
      </div>

      {/* Machine Status */}
      <div>
        <span className="text-[10px] text-[#68716B] uppercase font-mono font-semibold block mb-1">
          Equipment Telemetry
        </span>
        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
            <span className="text-[#252A25]">Healthy / Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
            <span className="text-[#252A25]">Warning (HT-201)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-pulse" />
            <span className="text-[#252A25]">Critical Anomaly</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]" />
            <span className="text-[#68716B]">Idle / Queued</span>
          </div>
        </div>
      </div>

      {/* Mine Infrastructure */}
      <div className="border-t border-[#E2E8F0] pt-2">
        <span className="text-[10px] text-[#68716B] uppercase font-mono font-semibold block mb-1">
          Mine Infrastructure Assets
        </span>
        <div className="space-y-1 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 bg-[#D97706] rounded" />
            <span className="text-[#252A25]">Switchback Haul Road</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-1 bg-[#0284C7] rounded" />
            <span className="text-[#252A25]">Overland Conveyor (IPCC)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded border border-[#DC2626]/60 bg-[#DC2626]/10" />
            <span className="text-[#252A25]">Blasting Exclusion Perimeter</span>
          </div>
        </div>
      </div>

      <div className="text-[10px] text-[#68716B] italic pt-1 border-t border-[#E2E8F0]">
        Topographic geometry modeled on Jharia Opencast terrain benches.
      </div>
    </div>
  );
};
