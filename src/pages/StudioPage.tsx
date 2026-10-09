import React from 'react';
import { EquipmentStudio } from '../components/studio/EquipmentStudio';
import { Wrench, Shield, FileCheck, Layers, ArrowLeft } from 'lucide-react';
import { useMining } from '../context/MiningContext';

export const StudioPage: React.FC = () => {
  const { setActiveView } = useMining();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="gov-card p-6 border-l-4 border-l-[#245B3C]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-[#E8F0EC] text-[#245B3C] border border-[#65866B]/30">
                Engineering & Technology Studio
              </span>
              <span className="text-xs text-[#68716B]">Interactive Equipment Schematics</span>
            </div>
            <h1 className="text-2xl font-bold text-[#252A25] tracking-tight">
              Inside a Mining Operation: Equipment & Flow Architecture
            </h1>
            <p className="text-sm text-[#68716B] mt-1 max-w-3xl">
              Examine the mechanical anatomy, sensor instrumentations, and end-to-end production flow 
              of modern opencast heavy earthmoving machinery (HEMM) operating across Jharkhand's mineral basins.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('regions')}
              className="px-3.5 py-2 bg-[#F1F5F9] text-[#252A25] text-xs font-semibold rounded-lg hover:bg-[#E2E8F0] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Mining Regions
            </button>
            <button
              onClick={() => setActiveView('simulation')}
              className="px-3.5 py-2 bg-[#245B3C] text-white text-xs font-semibold rounded-lg hover:bg-[#1E4D33] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Wrench className="w-3.5 h-3.5 text-[#E9B949]" />
              Simulation Lab
            </button>
          </div>
        </div>

        {/* Engineering Standards Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 pt-5 border-t border-[#E2E8F0] text-xs">
          <div className="flex items-start gap-2.5 p-3 bg-[#F8F8F4] rounded-lg border border-[#E2E8F0]">
            <Shield className="w-4 h-4 text-[#245B3C] mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-[#252A25] block">DGMS Safety Circulars</span>
              <span className="text-[#68716B] text-[11px]">Compliance with operator ergonomics, proximity warning, and FOPS/ROPS cabin standards.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3 bg-[#F8F8F4] rounded-lg border border-[#E2E8F0]">
            <Layers className="w-4 h-4 text-[#245B3C] mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-[#252A25] block">Cyber-Physical Sensors</span>
              <span className="text-[#68716B] text-[11px]">Strain gauges, tri-axial vibration accelerometers, and hydraulic telemetry loggers.</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3 bg-[#F8F8F4] rounded-lg border border-[#E2E8F0]">
            <FileCheck className="w-4 h-4 text-[#245B3C] mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-[#252A25] block">Condition-Based Maintenance</span>
              <span className="text-[#68716B] text-[11px]">Real-time remaining useful life (RUL) estimation replacing rigid calendar scheduling.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Equipment Studio */}
      <EquipmentStudio />
    </div>
  );
};
