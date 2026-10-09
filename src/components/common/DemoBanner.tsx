import React from 'react';
import { Award, Info, ExternalLink } from 'lucide-react';
import { useMining } from '../../context/MiningContext';

export const DemoBanner: React.FC = () => {
  const { setActiveView } = useMining();

  return (
    <div className="bg-[#FCF5E3] border-b border-[#E9B949]/40 px-4 py-2 text-xs text-[#252A25]">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-bold text-[#854D0E] bg-[#FEF08A] px-2 py-0.5 rounded text-[11px] font-mono border border-[#FACC15]">
            <Award className="w-3.5 h-3.5 text-[#854D0E]" />
            ACADEMIC PROTOTYPE
          </span>
          <span className="text-[#68716B]">|</span>
          <span className="font-medium text-[#252A25]">
            Developed for TEXMiN / IIT (ISM) Dhanbad Smart Mining Challenge (CFP 2025).
          </span>
          <span className="hidden lg:inline text-[#68716B]">
            Not an official government service.
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <button
            onClick={() => setActiveView('reports')}
            className="text-[#245B3C] font-semibold hover:underline flex items-center gap-1"
          >
            <span>View Data Sources & Provenance</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
