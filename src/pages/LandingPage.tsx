import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Wrench, 
  Box, 
  Cpu, 
  Leaf, 
  FileText, 
  Pickaxe, 
  Building2, 
  ShieldCheck, 
  Layers, 
  ExternalLink,
  Award,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { MineHeroIllustration } from '../components/home/MineHeroIllustration';
import { JHARKHAND_MINING_REGIONS } from '../data/jharkhandRegions';

export const LandingPage: React.FC = () => {
  const { setActiveView } = useMining();

  return (
    <div className="space-y-10 pb-8">
      {/* 1. Hero Section */}
      <section className="gov-card p-6 sm:p-8 lg:p-10 border-l-4 border-l-[#245B3C] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Portal Directives */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded font-bold bg-[#E8F0EC] text-[#245B3C] border border-[#65866B]/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#245B3C]" />
                State Mining Intelligence Portal
              </span>
              <span className="text-[11px] font-medium text-[#68716B] bg-[#F1F5F9] px-2.5 py-1 rounded border border-[#E2E8F0]">
                TEXMiN / IIT (ISM) Dhanbad Prototype
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#252A25] tracking-tight leading-tight">
              Sustainable Mineral Governance & Cyber-Physical Mining Intelligence
            </h1>

            <p className="text-sm sm:text-base text-[#68716B] leading-relaxed max-w-2xl">
              An authoritative public information and industrial engineering portal uniting official geological records, 
              real-time cyber-physical digital twin simulation, and heavy earthmoving machinery diagnostics across Jharkhand's mineral basins.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveView('coalfields')}
                className="px-5 py-3 rounded-lg bg-[#245B3C] hover:bg-[#1E4D33] text-white font-bold text-xs tracking-wide transition-all shadow-sm flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#E9B949]" />
                <span>Launch Jharkhand Coalfield Explorer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveView('overview')}
                className="px-5 py-3 rounded-lg bg-white hover:bg-[#F8F8F4] text-[#252A25] font-semibold text-xs border border-[#CBD5E1] transition-all flex items-center gap-2 shadow-sm"
              >
                <Pickaxe className="w-4 h-4 text-[#245B3C]" />
                <span>Operations Overview</span>
              </button>

              <button
                onClick={() => setActiveView('simulation')}
                className="px-4 py-3 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#252A25] font-semibold text-xs transition-all flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-[#65866B]" />
                <span>Simulation Lab</span>
              </button>
            </div>

            {/* Live Operational Context Indicator */}
            <div className="pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center gap-4 text-xs text-[#68716B]">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                20 Active Heavy Earthmoving Units Monitored
              </span>
              <span>•</span>
              <span className="font-mono text-[11px]">
                Primary Basin: Jharia Opencast Project (BCCL), Dhanbad
              </span>
            </div>
          </div>

          {/* Right Column: Illustrated Open-Cast Mine Scene */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <MineHeroIllustration />
            <div className="w-full flex items-center justify-between text-[11px] text-[#68716B] px-1 mt-2">
              <span>Opencast Bench Architecture (Benches, Haul Ramp, IPCC)</span>
              <span className="font-mono text-[#245B3C] font-semibold">Schematic Model</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Jharkhand Mineral Wealth Overview */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
          <div>
            <h2 className="text-xl font-bold text-[#252A25] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#245B3C]" />
              Jharkhand's Mineral Heritage & National Significance
            </h2>
            <p className="text-xs text-[#68716B]">
              Verified statutory metrics compiled from the Indian Bureau of Mines (IBM) and Ministry of Coal (2023-24).
            </p>
          </div>

          <button
            onClick={() => setActiveView('regions')}
            className="text-xs font-semibold text-[#245B3C] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All 9 Regional Profiles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="gov-card p-5 border border-[#E2E8F0] hover:border-[#245B3C]/50 transition-colors">
            <div className="flex items-center justify-between text-xs text-[#68716B] mb-2">
              <span className="font-mono uppercase font-semibold">Reserves Share</span>
              <span className="bg-[#E8F0EC] text-[#245B3C] text-[10px] px-1.5 py-0.5 rounded font-bold">IBM Data</span>
            </div>
            <div className="text-3xl font-black text-[#245B3C]">~40%</div>
            <p className="text-xs font-semibold text-[#252A25] mt-1">National Mineral Wealth</p>
            <p className="text-[11px] text-[#68716B] mt-1 leading-normal">
              Jharkhand leads Indian states in overall mineral endowment across coal, iron ore, copper, bauxite, and mica.
            </p>
          </div>

          <div className="gov-card p-5 border border-[#E2E8F0] hover:border-[#245B3C]/50 transition-colors">
            <div className="flex items-center justify-between text-xs text-[#68716B] mb-2">
              <span className="font-mono uppercase font-semibold">Prime Coking Coal</span>
              <span className="bg-[#E8F0EC] text-[#245B3C] text-[10px] px-1.5 py-0.5 rounded font-bold">Ministry of Coal</span>
            </div>
            <div className="text-3xl font-black text-[#245B3C]">&gt;90%</div>
            <p className="text-xs font-semibold text-[#252A25] mt-1">Exclusive National Monopoly</p>
            <p className="text-[11px] text-[#68716B] mt-1 leading-normal">
              Jharia coal basin in Dhanbad hosts India's sole commercial reserves of metallurgical coking coal for domestic blast furnaces.
            </p>
          </div>

          <div className="gov-card p-5 border border-[#E2E8F0] hover:border-[#245B3C]/50 transition-colors">
            <div className="flex items-center justify-between text-xs text-[#68716B] mb-2">
              <span className="font-mono uppercase font-semibold">Iron Ore (Hematite)</span>
              <span className="bg-[#E8F0EC] text-[#245B3C] text-[10px] px-1.5 py-0.5 rounded font-bold">IBM 2023</span>
            </div>
            <div className="text-3xl font-black text-[#245B3C]">2nd</div>
            <p className="text-xs font-semibold text-[#252A25] mt-1">Largest Hematite Base</p>
            <p className="text-[11px] text-[#68716B] mt-1 leading-normal">
              Noamundi, Chiria, and Gua deposits in West Singhbhum hold monumental reserves powering Indian steelmaking.
            </p>
          </div>

          <div className="gov-card p-5 border border-[#E2E8F0] hover:border-[#245B3C]/50 transition-colors">
            <div className="flex items-center justify-between text-xs text-[#68716B] mb-2">
              <span className="font-mono uppercase font-semibold">Strategic Metals</span>
              <span className="bg-[#E8F0EC] text-[#245B3C] text-[10px] px-1.5 py-0.5 rounded font-bold">HCL / UCIL</span>
            </div>
            <div className="text-3xl font-black text-[#245B3C]">Cu &amp; U</div>
            <p className="text-xs font-semibold text-[#252A25] mt-1">Singhbhum Shear Zone</p>
            <p className="text-[11px] text-[#68716B] mt-1 leading-normal">
              Historic copper mining at Ghatsila (HCL) and primary nuclear fuel extraction at Jaduguda, Narwapahar, and Turamdih.
            </p>
          </div>
        </div>
      </section>

      {/* 3. "Inside a Mining Operation" Process Stepper Bar */}
      <section className="gov-card p-6 border border-[#E2E8F0] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-[#E8F0EC] text-[#245B3C]">
                Interactive Engineering Module
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#252A25] mt-1">
              Inside a Mining Operation: Opencast Material Journey
            </h3>
            <p className="text-xs text-[#68716B]">
              Follow the six sequential mechanical stages from raw geological bench to reclaimed green landform.
            </p>
          </div>

          <button
            onClick={() => setActiveView('studio')}
            className="px-4 py-2 bg-[#245B3C] text-white text-xs font-semibold rounded-lg hover:bg-[#1E4D33] transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-sm"
          >
            <Pickaxe className="w-3.5 h-3.5 text-[#E9B949]" />
            <span>Launch Equipment Studio &amp; Schematics</span>
            <ArrowRight className="w-3 h-3 ml-1" />
          </button>
        </div>

        {/* 6 Step Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { step: '01', title: 'Exploration & Topo', desc: 'Core drilling & 3D seam modeling' },
            { step: '02', title: 'Drilling & Blast', desc: 'Blast hole pattern & ANFO detonation' },
            { step: '03', title: 'Excavation', desc: 'Electric & hydraulic shovels loading' },
            { step: '04', title: 'Haul & In-Pit Crush', desc: '100-240t trucks & overland conveyors' },
            { step: '05', title: 'Coal Beneficiation', desc: 'Dense media cyclones & washeries' },
            { step: '06', title: 'Eco-Reclamation', desc: 'Backfilling, topsoil & afforestation' },
          ].map((item, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveView('studio')}
              className="p-3 bg-[#F8F8F4] hover:bg-white rounded-lg border border-[#E2E8F0] hover:border-[#245B3C] transition-all cursor-pointer group"
            >
              <span className="text-[10px] font-mono font-bold text-[#245B3C] bg-[#E8F0EC] px-1.5 py-0.5 rounded">
                STAGE {item.step}
              </span>
              <h4 className="text-xs font-bold text-[#252A25] mt-2 group-hover:text-[#245B3C] transition-colors">
                {item.title}
              </h4>
              <p className="text-[11px] text-[#68716B] mt-1 leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Core Portal Modules Grid */}
      <section className="space-y-4">
        <div className="border-b border-[#E2E8F0] pb-3">
          <h2 className="text-xl font-bold text-[#252A25]">
            Engineering & Operational Modules
          </h2>
          <p className="text-xs text-[#68716B]">
            Navigate between statutory mineral repositories, live telemetry monitoring, simulation laboratories, and ESG reclamation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Module 1: Mining Regions */}
          <div 
            onClick={() => setActiveView('regions')}
            className="gov-card p-5 border border-[#E2E8F0] hover:shadow-md hover:border-[#245B3C] transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#E8F0EC] text-[#245B3C] flex items-center justify-center mb-3 group-hover:bg-[#245B3C] group-hover:text-white transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#252A25] group-hover:text-[#245B3C] transition-colors">
                Jharkhand Mining Regions
              </h3>
              <p className="text-xs text-[#68716B] mt-1.5 leading-relaxed">
                Geological profiles for 9 distinct mineral regions across Dhanbad, Bokaro, Ramgarh, Chatra, Godda, West/East Singhbhum, and Lohardaga with interactive schematic map.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#245B3C]">
              <span>View Regional Profiles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 2: Equipment & Operations */}
          <div 
            onClick={() => setActiveView('live-ops')}
            className="gov-card p-5 border border-[#E2E8F0] hover:shadow-md hover:border-[#245B3C] transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#E8F0EC] text-[#245B3C] flex items-center justify-center mb-3 group-hover:bg-[#245B3C] group-hover:text-white transition-colors">
                <Wrench className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#252A25] group-hover:text-[#245B3C] transition-colors">
                  Equipment & Operations
                </h3>
                <span className="text-[9px] font-mono font-bold bg-[#E9B949]/30 text-[#854D0E] px-1.5 py-0.2 rounded border border-[#E9B949]">
                  DEMO DATA
                </span>
              </div>
              <p className="text-xs text-[#68716B] mt-1.5 leading-relaxed">
                Live simulated telemetry monitoring across 20 heavy machines: hydraulic excavators, haul trucks, continuous miners, and blast hole drill rigs with health scores.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#245B3C]">
              <span>Inspect Machinery Telemetry</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 3: Digital Twin */}
          <div 
            onClick={() => setActiveView('digital-twin')}
            className="gov-card p-5 border border-[#E2E8F0] hover:shadow-md hover:border-[#245B3C] transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#E8F0EC] text-[#245B3C] flex items-center justify-center mb-3 group-hover:bg-[#245B3C] group-hover:text-white transition-colors">
                <Box className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#252A25] group-hover:text-[#245B3C] transition-colors">
                3D Opencast Digital Twin
              </h3>
              <p className="text-xs text-[#68716B] mt-1.5 leading-relaxed">
                Interactive spatial visualization of terraced bench geometry, switchback haul ramps, crusher hoppers, blasting zones, and moving heavy machinery.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#245B3C]">
              <span>Launch 3D Mine Scene</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 4: Simulation Lab */}
          <div 
            onClick={() => setActiveView('simulation')}
            className="gov-card p-5 border border-[#E2E8F0] hover:shadow-md hover:border-[#245B3C] transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#E8F0EC] text-[#245B3C] flex items-center justify-center mb-3 group-hover:bg-[#245B3C] group-hover:text-white transition-colors">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#252A25] group-hover:text-[#245B3C] transition-colors">
                Simulation & Calculation Lab
              </h3>
              <p className="text-xs text-[#68716B] mt-1.5 leading-relaxed">
                Engineering formulas for shovel-truck queuing, cycle time optimization, fuel burn calculation, and fleet bottleneck sensitivity with CSV scenario export.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#245B3C]">
              <span>Run Scenario Calculator</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 5: Sustainability & Reclamation */}
          <div 
            onClick={() => setActiveView('sustainability')}
            className="gov-card p-5 border border-[#E2E8F0] hover:shadow-md hover:border-[#245B3C] transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#E8F0EC] text-[#245B3C] flex items-center justify-center mb-3 group-hover:bg-[#245B3C] group-hover:text-white transition-colors">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#252A25] group-hover:text-[#245B3C] transition-colors">
                Sustainability & Eco-Restoration
              </h3>
              <p className="text-xs text-[#68716B] mt-1.5 leading-relaxed">
                Life-of-mine reclamation pathways: backfilling, overburden dump stabilization, afforestation with native Chota Nagpur species, and post-closure eco-parks.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#245B3C]">
              <span>Review ESG &amp; Reclamation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 6: Reports & Data Registry */}
          <div 
            onClick={() => setActiveView('reports')}
            className="gov-card p-5 border border-[#E2E8F0] hover:shadow-md hover:border-[#245B3C] transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#E8F0EC] text-[#245B3C] flex items-center justify-center mb-3 group-hover:bg-[#245B3C] group-hover:text-white transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#252A25] group-hover:text-[#245B3C] transition-colors">
                Reports & Data Sources Registry
              </h3>
              <p className="text-xs text-[#68716B] mt-1.5 leading-relaxed">
                Complete data provenance registry detailing official publications (Ministry of Coal, IBM, CIL, Jharkhand DMG) alongside synthetic telemetry disclosures.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#245B3C]">
              <span>Open Sources Registry</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Statutory Advisory & Research Note */}
      <section className="bg-[#E8F0EC]/60 border border-[#65866B]/30 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs text-[#245B3C] uppercase tracking-wide">
              Statutory Provenance Notice &amp; Academic Scope
            </span>
          </div>
          <p className="text-xs text-[#68716B] max-w-3xl leading-relaxed">
            Geological data, state reserve metrics, and operating entities presented in this portal are compiled from official 
            publications of the Indian Bureau of Mines, Ministry of Coal, and Jharkhand Department of Mines &amp; Geology. 
            Real-time equipment telemetry streams and health index scores are synthetic demonstration data for academic and engineering simulation purposes.
          </p>
        </div>

        <button
          onClick={() => setActiveView('reports')}
          className="px-4 py-2 bg-white text-[#245B3C] border border-[#245B3C]/30 text-xs font-semibold rounded-lg hover:bg-[#F8F8F4] transition-colors shrink-0"
        >
          View Full Provenance Registry
        </button>
      </section>
    </div>
  );
};
