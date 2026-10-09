import React from 'react';
import { ExternalLink, Layers, Shield, Award, Mail, BookOpen } from 'lucide-react';
import { useMining } from '../../context/MiningContext';

export const Footer: React.FC = () => {
  const { setActiveView } = useMining();

  return (
    <footer className="bg-[#FFFFFF] border-t border-[#E2E8F0] text-xs text-[#68716B] mt-16">
      {/* Top Banner Stripe */}
      <div className="bg-[#E8F0EC] border-b border-[#245B3C]/10 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#245B3C] font-semibold">
            <Award className="w-4 h-4 text-[#245B3C]" />
            <span>TEXMiN Innovation Hub / IIT (ISM) Dhanbad — CFP 2025 Smart Mining Challenge</span>
          </div>
          <div className="text-[11px] text-[#68716B]">
            Technology Innovation in Mining & Mineral Exploration (CPS Prototype)
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#245B3C] flex items-center justify-center text-white font-black text-xs">
                <Layers className="w-4 h-4 text-[#E9B949]" />
              </div>
              <span className="font-bold text-[#252A25] text-sm tracking-tight">
                SmartMine<span className="text-[#245B3C]">AI</span>
              </span>
            </div>
            <p className="text-xs text-[#68716B] leading-relaxed">
              Jharkhand Mining Intelligence Portal — combining regional mineral knowledge, interactive engineering vector diagrams, and simulated operational analytics for sustainable extraction.
            </p>
            <div className="text-[11px] font-mono text-[#245B3C] font-semibold">
              Prototype Version 2.5 (Jharkhand Edition)
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#252A25] uppercase tracking-wider text-xs font-mono">
              Portal Modules
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => setActiveView('regions')} className="hover:text-[#245B3C] transition-colors">
                  Jharkhand Mining Regions
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('studio')} className="hover:text-[#245B3C] transition-colors">
                  Engineering Studio & Vector Diagrams
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('live-ops')} className="hover:text-[#245B3C] transition-colors">
                  Equipment Telemetry Operations
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('digital-twin')} className="hover:text-[#245B3C] transition-colors">
                  Open-Cast Mine Digital Twin
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('simulation')} className="hover:text-[#245B3C] transition-colors">
                  Parametric Simulation Lab
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('sustainability')} className="hover:text-[#245B3C] transition-colors">
                  Sustainability & Mine Eco-Restoration
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Data Sources */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#252A25] uppercase tracking-wider text-xs font-mono">
              Official Data References
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href="https://minerals.jharkhand.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#245B3C] transition-colors flex items-center gap-1"
                >
                  <span>Dept. of Mines & Geology, Jharkhand</span>
                  <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
                </a>
              </li>
              <li>
                <a
                  href="https://gis1.jharkhand.gov.in/dgm/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#245B3C] transition-colors flex items-center gap-1"
                >
                  <span>Directorate of Mines & Geology GIS</span>
                  <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
                </a>
              </li>
              <li>
                <a
                  href="https://coal.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#245B3C] transition-colors flex items-center gap-1"
                >
                  <span>Ministry of Coal, Govt. of India</span>
                  <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
                </a>
              </li>
              <li>
                <a
                  href="https://ibm.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#245B3C] transition-colors flex items-center gap-1"
                >
                  <span>Indian Bureau of Mines (IBM)</span>
                  <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Limitations & Academic Disclaimer */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#252A25] uppercase tracking-wider text-xs font-mono">
              Academic Limitations
            </h4>
            <p className="text-[11px] text-[#68716B] leading-relaxed">
              This platform is an academic proof-of-concept prototype. Machinery telemetry feeds, dispatch alerts, and simulation outputs are synthetic demonstration datasets and do not represent live industrial sensor feeds from active Jharkhand pits.
            </p>
            <div className="p-2 bg-[#F8F8F4] rounded border border-[#E2E8F0] text-[10px] text-[#68716B]">
              No endorsement by Govt. of Jharkhand or Coal India is implied.
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#94A3B8]">
          <div>
            © 2025 SmartMine AI Prototype. All rights reserved. Built for TEXMiN / IIT (ISM) Dhanbad.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveView('reports')} className="hover:text-[#245B3C]">
              Methodology & Sources Directory
            </button>
            <span>•</span>
            <button onClick={() => setActiveView('settings')} className="hover:text-[#245B3C]">
              Portal Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
