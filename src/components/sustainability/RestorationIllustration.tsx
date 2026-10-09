import React from 'react';
import { Leaf } from 'lucide-react';

export const RestorationIllustration: React.FC = () => {
  return (
    <div className="gov-card p-6 border border-[#E2E8F0] space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
        <div>
          <h3 className="text-sm font-bold text-[#252A25] flex items-center gap-2">
            <Leaf className="w-4 h-4 text-[#245B3C]" />
            Progressive Mine Land Reclamation &amp; Eco-Restoration Lifecycle
          </h3>
          <p className="text-xs text-[#68716B]">
            Illustrative ecological transition model from active pit extraction to sustainable reclaimed biosphere.
          </p>
        </div>

        <span className="text-[11px] font-mono text-[#245B3C] bg-[#E8F0EC] px-3 py-1 rounded-full border border-[#65866B]/30 font-semibold self-start sm:self-auto">
          Post-Mining Land Stewardship
        </span>
      </div>

      {/* 4-Stage Visual Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Stage 1 */}
        <div className="p-4 bg-[#F8F8F4] rounded-xl border border-[#E2E8F0] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-[#68716B] font-bold">PHASE 1</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#FEF3C7] text-[#B45309] font-semibold">Active Pit</span>
            </div>
            <h4 className="text-xs font-bold text-[#252A25] mb-2">Opencast Excavation</h4>
            <div className="h-28 bg-[#EFE8DC] rounded-lg border border-[#D8C9B4] relative overflow-hidden flex items-end mb-3">
              <svg viewBox="0 0 140 110" className="w-full h-full">
                {/* Bench Terraces */}
                <polygon points="0,30 140,30 140,110 0,110" fill="#BA9F7F" />
                <polygon points="10,50 140,50 140,110 10,110" fill="#9C7F5F" />
                <polygon points="20,70 140,70 140,110 20,110" fill="#3A3E3B" />
                <text x="25" y="95" fill="#E9B949" fontSize="8" fontFamily="monospace">Active Seam</text>
              </svg>
            </div>
            <p className="text-[11px] text-[#68716B] leading-relaxed">
              Active overburden removal and mineral extraction. Separate stacking of topsoil for subsequent restoration.
            </p>
          </div>
        </div>

        {/* Stage 2 */}
        <div className="p-4 bg-[#F8F8F4] rounded-xl border border-[#E2E8F0] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-[#68716B] font-bold">PHASE 2</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#E0F2FE] text-[#0369A1] font-semibold">Engineering</span>
            </div>
            <h4 className="text-xs font-bold text-[#252A25] mb-2">Technical Backfilling</h4>
            <div className="h-28 bg-[#EFE8DC] rounded-lg border border-[#D8C9B4] relative overflow-hidden flex items-end mb-3">
              <svg viewBox="0 0 140 110" className="w-full h-full">
                {/* Backfilled leveled earth */}
                <polygon points="0,50 140,50 140,110 0,110" fill="#BA9F7F" />
                <line x1="0" y1="50" x2="140" y2="50" stroke="#65866B" strokeWidth="3" />
                <text x="20" y="80" fill="#252A25" fontSize="8" fontFamily="monospace">Overburden Compaction</text>
              </svg>
            </div>
            <p className="text-[11px] text-[#68716B] leading-relaxed">
              Systematic backfilling of de-coaled voids using overburden spoil, compaction, grading to natural contours, and drainage terracing.
            </p>
          </div>
        </div>

        {/* Stage 3 */}
        <div className="p-4 bg-[#F8F8F4] rounded-xl border border-[#E2E8F0] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-[#68716B] font-bold">PHASE 3</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#DCFCE7] text-[#15803D] font-semibold">Biological</span>
            </div>
            <h4 className="text-xs font-bold text-[#252A25] mb-2">Biological Afforestation</h4>
            <div className="h-28 bg-[#E2F0D9] rounded-lg border border-[#B6D7A8] relative overflow-hidden flex items-end mb-3">
              <svg viewBox="0 0 140 110" className="w-full h-full">
                {/* Topsoil layer */}
                <rect x="0" y="70" width="140" height="40" fill="#783F04" />
                {/* Young trees */}
                <circle cx="25" cy="55" r="9" fill="#245B3C" />
                <circle cx="55" cy="50" r="11" fill="#327450" />
                <circle cx="85" cy="53" r="10" fill="#245B3C" />
                <circle cx="115" cy="56" r="9" fill="#327450" />
              </svg>
            </div>
            <p className="text-[11px] text-[#68716B] leading-relaxed">
              Spreading preserved topsoil, introducing leguminous cover crops for nitrogen fixation, and planting native species (Sal, Mahua, Neem).
            </p>
          </div>
        </div>

        {/* Stage 4 */}
        <div className="p-4 bg-[#F8F8F4] rounded-xl border border-[#E2E8F0] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-[#68716B] font-bold">PHASE 4</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#DEF7EC] text-[#047857] font-semibold">Sustainable</span>
            </div>
            <h4 className="text-xs font-bold text-[#252A25] mb-2">Eco-Park &amp; Water Body</h4>
            <div className="h-28 bg-[#DDF4FF] rounded-lg border border-[#BAE6FD] relative overflow-hidden flex items-end mb-3">
              <svg viewBox="0 0 140 110" className="w-full h-full">
                {/* Water reservoir & lush greenery */}
                <ellipse cx="70" cy="95" rx="50" ry="18" fill="#38BDF8" />
                <circle cx="15" cy="65" r="12" fill="#15803D" />
                <circle cx="125" cy="65" r="12" fill="#15803D" />
                <text x="25" y="98" fill="#FFFFFF" fontSize="7.5" fontWeight="bold">Rainwater Reservoir</text>
              </svg>
            </div>
            <p className="text-[11px] text-[#68716B] leading-relaxed">
              Conversion of residual final-cut voids into groundwater recharge water-harvesting lakes, eco-tourism parks, and solar generation sites.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
