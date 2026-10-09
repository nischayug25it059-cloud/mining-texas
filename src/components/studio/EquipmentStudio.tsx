import React, { useState } from 'react';
import { 
  Wrench, 
  Layers, 
  Info, 
  ChevronRight, 
  ArrowRight, 
  Play, 
  CheckCircle2,
  Gauge,
  Cpu
} from 'lucide-react';

type StudioDiagram = 'excavator' | 'haul_truck' | 'conveyor' | 'drill_rig';

interface ComponentDetail {
  title: string;
  functionDesc: string;
  telemetryMetric: string;
  typicalSpec: string;
}

export const EquipmentStudio: React.FC = () => {
  const [activeDiagram, setActiveDiagram] = useState<StudioDiagram>('excavator');
  const [selectedCallout, setSelectedCallout] = useState<string>('boom');

  // Callout details dictionary
  const calloutDetails: Record<string, ComponentDetail> = {
    // Excavator
    boom: {
      title: 'Hydraulic Heavy Boom',
      functionDesc: 'Primary structural member supporting heavy digging moments. Dual hydraulic lift cylinders raise and lower the assembly under high breakout force.',
      telemetryMetric: 'Boom cylinder pin pressure: 31.2 MPa | Strain gauge: Normal',
      typicalSpec: 'High-strength structural steel casting (rated up to 600t payload moments).',
    },
    stick: {
      title: 'Excavator Stick / Dipper Arm',
      functionDesc: 'Intermediate linkage connecting boom to bucket. Governs reach envelope and cutting angle into the rock face.',
      telemetryMetric: 'Stick cylinder velocity: 1.2 m/s | Thermal expansion: Within tolerance',
      typicalSpec: 'Length: 4.8m – 7.5m depending on bench configuration.',
    },
    bucket: {
      title: 'Heavy Rock Bucket & Shrouds',
      functionDesc: 'Direct rock cutting tool equipped with replaceable alloy teeth and lip shrouds designed to penetrate high-UCS sandstone and hard coal.',
      telemetryMetric: 'Fill factor: 94% | Wear plate ultrasonic depth: 32mm / 40mm',
      typicalSpec: 'Capacity: 12 m³ – 42 m³ payload.',
    },
    cab: {
      title: 'Pressurized Operator Cabin',
      functionDesc: 'ROPS/FOPS certified enclosed cabin with vibration-damped suspension, real-time in-cab fleet telematics display, and electronic joystick controls.',
      telemetryMetric: 'Cabin ambient air pressure: +50 Pa (Positive dust prevention) | HVAC: 22°C',
      typicalSpec: 'ISO 3449 Level II FOPS safety rating.',
    },
    undercarriage: {
      title: 'Crawler Undercarriage & Slew Ring',
      functionDesc: 'Track shoes and planetary drive gear distributing immense equipment mass over low ground bearing pressure (approx 0.22 MPa). Large slew bearing enables continuous 360° rotation.',
      telemetryMetric: 'Slew bearing vibration RMS: 2.8 mm/s | Grease lube line pressure: 22 MPa',
      typicalSpec: 'Triple-grouser track shoes (width: 1,000mm – 1,400mm).',
    },

    // Haul Truck
    truck_body: {
      title: 'V-Bottom Heavy Dump Body',
      functionDesc: 'Abrasion-resistant Hardox steel tub engineered with a V-profile to center rock payload, minimizing roll tipping risks on haul road corners.',
      telemetryMetric: 'Electronic payload load cells: 96.5 tonnes | Dynamic center-of-gravity: Centered',
      typicalSpec: 'Payload capacity: 100 – 240 tonnes.',
    },
    truck_tyres: {
      title: 'Enormous Off-Highway Tyres',
      functionDesc: 'Radial steel-belted earthmover tyres engineered for extreme ground contact and heat resistance during loaded uphill cycles.',
      telemetryMetric: 'TPMS cold pressure: 102 PSI | Internal tyre carcass temperature: 78°C (Normal)',
      typicalSpec: 'Size: 27.00R49 to 40.00R57 radial tubeless.',
    },
    truck_cab: {
      title: 'Ergonomic In-Cab Telematics Console',
      functionDesc: 'Houses digital GPS dispatch guidance screen, slope inclinometers, collision avoidance radar, and driver fatigue cameras.',
      telemetryMetric: 'Speed cap governor: 32 km/h active | CAN bus status: Normal communication',
      typicalSpec: 'Dual-monitor telematics terminal.',
    },
    truck_chassis: {
      title: 'Box-Section High-Tensile Chassis Frame',
      functionDesc: 'Absorbs rotational and torsional road shocks transmitted through nitrogen-over-oil suspension struts.',
      telemetryMetric: 'Strut stroke extension: 142mm front, 138mm rear | Suspension pressure: 18.6 MPa',
      typicalSpec: 'Cast-steel transition joints at cross-members.',
    },

    // Conveyor
    drive_pulley: {
      title: 'High-Torque Drive Pulley & Gearbox',
      functionDesc: 'Ceramic-lagged head drive pulley powered by multi-megawatt electric induction motors driving the continuous belt loop.',
      telemetryMetric: 'Pulley bearing temperature: 64°C | Belt slip ratio: 0.4% (Normal)',
      typicalSpec: 'Motor rating: 2 x 1,200 kW variable frequency drives (VFD).',
    },
    belt_loop: {
      title: 'Steel Cord High-Tensile Rubber Belt',
      functionDesc: 'Continuous rubber belt embedded with longitudinal steel cables to resist severe tension loads across multi-kilometer overland routes.',
      telemetryMetric: 'Belt velocity: 4.5 m/s | Ultrasonic rip detectors: 100% integrity',
      typicalSpec: 'Width: 1,400mm – 1,800mm (Tensile rating: ST-3150).',
    },
    idler_rollers: {
      title: 'Deep Trough Carrying Idlers',
      functionDesc: 'Sets of 35° or 45° angled rollers forming a concave trough that prevents material spillage during high-speed transit.',
      telemetryMetric: 'Idler bearing acoustic signature: Low noise | Vibration RMS: 2.1 mm/s',
      typicalSpec: 'Sealed-for-life roller bearings with labyrinth seals.',
    },
    discharge_chute: {
      title: 'Impact-Bed Transfer Discharge Chute',
      functionDesc: 'Directs mined coal from the belt onto transfer feeders, screening plants, or rail loading silos with integrated water spray dust suppression.',
      telemetryMetric: 'Transfer throughput rate: 2,400 tonnes / hour | Water spray: Active',
      typicalSpec: 'Bimetallic chromium-carbide wear liners.',
    },

    // Drill Rig
    drill_mast: {
      title: 'Heavy Structural Lattice Mast',
      functionDesc: 'Houses the rotary head feed cables and hydraulic pulldown cylinders, guiding the drill string precisely into the rock bench.',
      telemetryMetric: 'Mast angle: 90.0° (Vertical) | Pulldown force: 280 kN',
      typicalSpec: 'Single-pass hole depth up to 18 meters.',
    },
    rotary_head: {
      title: 'Hydraulic Rotary Drill Head',
      functionDesc: 'Transmits variable rotational torque and downward pulldown thrust to the tricone roller bit.',
      telemetryMetric: 'Rotary speed: 85 RPM | Torque: 14.2 kNm | Penetration rate: 28 m/hr',
      typicalSpec: 'Variable displacement piston motor drive.',
    },
    drill_tracks: {
      title: 'Self-Propelled Crawler Undercarriage',
      functionDesc: 'Enables precise positioning on rugged drilling benches and leveling via four heavy-duty hydraulic stabilizing leveling jacks.',
      telemetryMetric: 'Leveling jack inclination: 0.2° (Level) | Hydraulic pressure: 21 MPa',
      typicalSpec: 'Gradeability: 35% on pit ramps.',
    },
  };

  const activeDetail = calloutDetails[selectedCallout] || calloutDetails.boom;

  return (
    <div className="gov-card p-6 border border-[#E2E8F0] space-y-6">
      {/* Title & Description */}
      <div className="border-b border-[#E2E8F0] pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-[#252A25] flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#245B3C]" />
              Inside a Mining Operation: Equipment & Process Studio
            </h2>
            <p className="text-xs text-[#68716B] mt-1">
              Engineering vector schematics detailing the mechanical anatomy of core opencast mining machinery.
            </p>
          </div>

          <span className="text-[11px] font-mono text-[#245B3C] bg-[#E8F0EC] px-3 py-1 rounded-full border border-[#65866B]/30 font-semibold self-start sm:self-auto">
            Interactive Technical Callouts
          </span>
        </div>
      </div>

      {/* --- SIMPLIFIED MINING PROCESS FLOW STEPPER --- */}
      <div className="p-4 bg-[#F8F8F4] rounded-xl border border-[#E2E8F0]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-[#245B3C] uppercase tracking-wider font-mono">
            Continuous Mining Process Pipeline
          </span>
          <span className="text-[10px] text-[#68716B] font-mono">
            Pit Floor to Rail Dispatch Loop
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {[
            { step: '01', title: 'Excavation', desc: 'Blasting & Digging', machine: 'Drill & Shovel', active: activeDiagram === 'drill_rig' || activeDiagram === 'excavator' },
            { step: '02', title: 'Loading', desc: 'Bucket into Tub', machine: 'Front Shovel', active: activeDiagram === 'excavator' },
            { step: '03', title: 'Haulage', desc: 'Ramp Circuit', machine: '100t Dumper', active: activeDiagram === 'haul_truck' },
            { step: '04', title: 'Crushing', desc: 'Sizing & Breaker', machine: 'In-Pit Hopper', active: false },
            { step: '05', title: 'Conveyor', desc: 'IPCC Overland', machine: 'Belt System', active: activeDiagram === 'conveyor' },
            { step: '06', title: 'Dispatch', desc: 'Rail Silo Loading', machine: 'MGR Train Loop', active: false },
          ].map((stage, idx) => (
            <div
              key={stage.step}
              className={`p-2.5 rounded-lg border text-center transition-all ${
                stage.active
                  ? 'bg-white border-[#245B3C] shadow-sm'
                  : 'bg-white/60 border-[#E2E8F0]'
              }`}
            >
              <span className="text-[10px] font-mono text-[#68716B] font-bold block">{stage.step}</span>
              <span className={`text-xs font-bold block ${stage.active ? 'text-[#245B3C]' : 'text-[#252A25]'}`}>
                {stage.title}
              </span>
              <span className="text-[9.5px] text-[#68716B] block mt-0.5">{stage.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- DIAGRAM SELECTOR TABS --- */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E2E8F0] pb-2">
        {[
          { id: 'excavator', label: '1. Hydraulic Excavator', defaultCallout: 'boom' },
          { id: 'haul_truck', label: '2. Heavy Haul Truck', defaultCallout: 'truck_body' },
          { id: 'conveyor', label: '3. Overland Conveyor (IPCC)', defaultCallout: 'drive_pulley' },
          { id: 'drill_rig', label: '4. Blast Hole Drill Rig', defaultCallout: 'drill_mast' },
        ].map(diag => (
          <button
            key={diag.id}
            onClick={() => {
              setActiveDiagram(diag.id as StudioDiagram);
              setSelectedCallout(diag.defaultCallout);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeDiagram === diag.id
                ? 'bg-[#245B3C] text-white shadow-sm'
                : 'bg-white text-[#68716B] hover:text-[#252A25] border border-[#E2E8F0]'
            }`}
          >
            {diag.label}
          </button>
        ))}
      </div>

      {/* --- INTERACTIVE SVG DIAGRAM & DETAIL PANEL (2-Column) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Drawing Canvas (7 Cols) */}
        <div className="lg:col-span-7 bg-[#F8F8F4] rounded-xl border border-[#E2E8F0] p-4 flex flex-col items-center justify-center relative min-h-[340px]">
          
          {/* DIAGRAM A: HYDRAULIC EXCAVATOR */}
          {activeDiagram === 'excavator' && (
            <svg viewBox="0 0 520 320" className="w-full h-auto select-none">
              {/* Ground level */}
              <line x1="20" y1="280" x2="500" y2="280" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
              <text x="30" y="300" fill="#94A3B8" fontSize="10" fontFamily="monospace">BENCH FLOOR LEVEL</text>

              {/* Undercarriage Tracks */}
              <g 
                onClick={() => setSelectedCallout('undercarriage')}
                className="cursor-pointer group"
              >
                <rect x="70" y="240" width="160" height="36" rx="18" fill="#334155" stroke="#1E293B" strokeWidth="2" />
                <circle cx="95" cy="258" r="10" fill="#64748B" />
                <circle cx="125" cy="258" r="10" fill="#64748B" />
                <circle cx="155" cy="258" r="10" fill="#64748B" />
                <circle cx="185" cy="258" r="10" fill="#64748B" />
                <circle cx="205" cy="258" r="10" fill="#64748B" />
                {/* Hotspot pin */}
                <circle cx="150" cy="258" r="8" fill="#E9B949" stroke="#FFFFFF" strokeWidth="2" className="animate-pulse" />
                <text x="150" y="261" textAnchor="middle" fill="#252A25" fontSize="9" fontWeight="bold">1</text>
              </g>

              {/* Slew Ring & Rotating House */}
              <rect x="90" y="230" width="120" height="12" fill="#475569" />
              <g onClick={() => setSelectedCallout('cab')} className="cursor-pointer group">
                <rect x="60" y="150" width="170" height="80" rx="6" fill="#E9B949" stroke="#B45309" strokeWidth="2" />
                {/* Counterweight */}
                <rect x="60" y="160" width="40" height="70" rx="3" fill="#1E293B" />
                {/* Operator Window */}
                <rect x="150" y="158" width="60" height="42" rx="4" fill="#93C5FD" stroke="#1E293B" strokeWidth="1.5" />
                {/* Hotspot pin */}
                <circle cx="180" cy="180" r="8" fill="#245B3C" stroke="#FFFFFF" strokeWidth="2" />
                <text x="180" y="183" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">2</text>
              </g>

              {/* Boom Assembly */}
              <g onClick={() => setSelectedCallout('boom')} className="cursor-pointer group">
                <path d="M 190,210 L 290,100 L 330,120 L 210,230 Z" fill="#E9B949" stroke="#B45309" strokeWidth="2" />
                {/* Boom cylinder */}
                <line x1="170" y1="210" x2="250" y2="150" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
                <circle cx="270" cy="140" r="8" fill="#245B3C" stroke="#FFFFFF" strokeWidth="2" />
                <text x="270" y="143" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">3</text>
              </g>

              {/* Stick (Arm) */}
              <g onClick={() => setSelectedCallout('stick')} className="cursor-pointer group">
                <path d="M 310,110 L 410,190 L 400,205 L 300,120 Z" fill="#E9B949" stroke="#B45309" strokeWidth="2" />
                {/* Stick cylinder */}
                <line x1="260" y1="90" x2="350" y2="140" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
                <circle cx="360" cy="160" r="8" fill="#245B3C" stroke="#FFFFFF" strokeWidth="2" />
                <text x="360" y="163" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">4</text>
              </g>

              {/* Bucket & Teeth */}
              <g onClick={() => setSelectedCallout('bucket')} className="cursor-pointer group">
                <path d="M 395,195 Q 460,205 450,265 L 420,270 L 385,210 Z" fill="#334155" stroke="#1E293B" strokeWidth="2" />
                {/* Teeth */}
                <polygon points="450,265 465,275 455,278 440,268" fill="#CBD5E1" stroke="#334155" />
                <polygon points="435,268 448,280 438,282 425,270" fill="#CBD5E1" stroke="#334155" />
                <circle cx="430" cy="235" r="8" fill="#E9B949" stroke="#FFFFFF" strokeWidth="2" className="animate-pulse" />
                <text x="430" y="238" textAnchor="middle" fill="#252A25" fontSize="9" fontWeight="bold">5</text>
              </g>
            </svg>
          )}

          {/* DIAGRAM B: HAUL TRUCK (SIDE VIEW) */}
          {activeDiagram === 'haul_truck' && (
            <svg viewBox="0 0 520 320" className="w-full h-auto select-none">
              <line x1="20" y1="280" x2="500" y2="280" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />

              {/* Tyres */}
              <g onClick={() => setSelectedCallout('truck_tyres')} className="cursor-pointer group">
                <circle cx="130" cy="235" r="42" fill="#1E293B" stroke="#475569" strokeWidth="4" />
                <circle cx="130" cy="235" r="22" fill="#64748B" />
                <circle cx="370" cy="235" r="42" fill="#1E293B" stroke="#475569" strokeWidth="4" />
                <circle cx="370" cy="235" r="22" fill="#64748B" />
                <circle cx="130" cy="235" r="8" fill="#E9B949" stroke="#FFFFFF" strokeWidth="2" />
                <text x="130" y="238" textAnchor="middle" fill="#252A25" fontSize="9" fontWeight="bold">1</text>
              </g>

              {/* Chassis & Fuel Tank */}
              <g onClick={() => setSelectedCallout('truck_chassis')} className="cursor-pointer group">
                <rect x="90" y="180" width="320" height="25" rx="3" fill="#334155" />
                <rect x="200" y="210" width="60" height="28" rx="4" fill="#475569" stroke="#1E293B" />
                <circle cx="230" cy="190" r="8" fill="#245B3C" stroke="#FFFFFF" strokeWidth="2" />
                <text x="230" y="193" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">2</text>
              </g>

              {/* Cab & Canopy Overhang */}
              <g onClick={() => setSelectedCallout('truck_cab')} className="cursor-pointer group">
                <rect x="330" y="110" width="70" height="70" rx="5" fill="#E9B949" stroke="#B45309" strokeWidth="2" />
                <rect x="350" y="120" width="45" height="35" rx="3" fill="#93C5FD" stroke="#1E293B" strokeWidth="1.5" />
                {/* Access Ladder */}
                <line x1="335" y1="180" x2="335" y2="240" stroke="#E9B949" strokeWidth="2" />
                <line x1="325" y1="195" x2="345" y2="195" stroke="#E9B949" strokeWidth="1.5" />
                <line x1="325" y1="215" x2="345" y2="215" stroke="#E9B949" strokeWidth="1.5" />
                <circle cx="370" cy="135" r="8" fill="#245B3C" stroke="#FFFFFF" strokeWidth="2" />
                <text x="370" y="138" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">3</text>
              </g>

              {/* Dump Body (Tub) */}
              <g onClick={() => setSelectedCallout('truck_body')} className="cursor-pointer group">
                <polygon points="60,90 320,90 410,65 410,85 300,175 70,175" fill="#E9B949" stroke="#B45309" strokeWidth="2" />
                {/* Ribbed stiffeners */}
                <line x1="120" y1="95" x2="110" y2="170" stroke="#B45309" strokeWidth="3" />
                <line x1="180" y1="95" x2="170" y2="170" stroke="#B45309" strokeWidth="3" />
                <line x1="240" y1="95" x2="230" y2="170" stroke="#B45309" strokeWidth="3" />
                <circle cx="190" cy="130" r="8" fill="#E9B949" stroke="#FFFFFF" strokeWidth="2" className="animate-pulse" />
                <text x="190" y="133" textAnchor="middle" fill="#252A25" fontSize="9" fontWeight="bold">4</text>
              </g>

              {/* Arrow showing loading direction */}
              <path d="M 200,30 L 200,65" stroke="#245B3C" strokeWidth="3" strokeDasharray="4 2" />
              <polygon points="195,65 205,65 200,75" fill="#245B3C" />
              <text x="215" y="55" fill="#245B3C" fontSize="10" fontWeight="bold">ORE LOAD DROP</text>
            </svg>
          )}

          {/* DIAGRAM C: CONVEYOR BELT (IPCC) */}
          {activeDiagram === 'conveyor' && (
            <svg viewBox="0 0 520 320" className="w-full h-auto select-none">
              {/* Drive Pulley & Motor (Right) */}
              <g onClick={() => setSelectedCallout('drive_pulley')} className="cursor-pointer group">
                <circle cx="430" cy="180" r="32" fill="#334155" stroke="#1E293B" strokeWidth="3" />
                <circle cx="430" cy="180" r="14" fill="#64748B" />
                <rect x="440" y="140" width="45" height="50" rx="3" fill="#245B3C" />
                <circle cx="430" cy="180" r="8" fill="#E9B949" stroke="#FFFFFF" strokeWidth="2" className="animate-pulse" />
                <text x="430" y="183" textAnchor="middle" fill="#252A25" fontSize="9" fontWeight="bold">1</text>
              </g>

              {/* Return Tail Pulley (Left) */}
              <circle cx="90" cy="220" r="26" fill="#334155" stroke="#1E293B" strokeWidth="3" />
              <circle cx="90" cy="220" r="10" fill="#64748B" />

              {/* Structural Truss */}
              <line x1="80" y1="260" x2="450" y2="220" stroke="#94A3B8" strokeWidth="4" />
              <line x1="160" y1="250" x2="160" y2="280" stroke="#64748B" strokeWidth="3" />
              <line x1="260" y1="240" x2="260" y2="280" stroke="#64748B" strokeWidth="3" />
              <line x1="360" y1="230" x2="360" y2="280" stroke="#64748B" strokeWidth="3" />

              {/* Trough Idler Rollers */}
              <g onClick={() => setSelectedCallout('idler_rollers')} className="cursor-pointer group">
                <circle cx="160" cy="215" r="8" fill="#475569" />
                <circle cx="230" cy="205" r="8" fill="#475569" />
                <circle cx="300" cy="195" r="8" fill="#475569" />
                <circle cx="370" cy="185" r="8" fill="#475569" />
                <circle cx="230" cy="205" r="8" fill="#245B3C" stroke="#FFFFFF" strokeWidth="2" />
                <text x="230" y="208" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">2</text>
              </g>

              {/* Moving Belt Loop with Coal chunks */}
              <g onClick={() => setSelectedCallout('belt_loop')} className="cursor-pointer group">
                {/* Upper loaded strand */}
                <path d="M 90,194 L 430,148" fill="none" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" />
                {/* Lower return strand */}
                <path d="M 430,212 L 90,246" fill="none" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
                
                {/* Moving Coal Lumps along top belt */}
                <g className="animate-pulse">
                  <polygon points="120,186 128,183 133,188 123,191" fill="#252A25" />
                  <polygon points="175,178 185,175 190,181 180,183" fill="#252A25" />
                  <polygon points="245,168 255,165 260,171 249,173" fill="#252A25" />
                  <polygon points="320,158 332,154 336,161 324,163" fill="#252A25" />
                  <polygon points="385,148 396,145 401,151 389,153" fill="#252A25" />
                </g>

                <circle cx="300" cy="160" r="8" fill="#E9B949" stroke="#FFFFFF" strokeWidth="2" className="animate-pulse" />
                <text x="300" y="163" textAnchor="middle" fill="#252A25" fontSize="9" fontWeight="bold">3</text>
              </g>

              {/* Discharge Transfer Chute */}
              <g onClick={() => setSelectedCallout('discharge_chute')} className="cursor-pointer group">
                <path d="M 430,150 L 490,150 L 470,260 L 440,260 Z" fill="#64748B" opacity="0.8" stroke="#334155" strokeWidth="2" />
                <circle cx="460" cy="210" r="8" fill="#245B3C" stroke="#FFFFFF" strokeWidth="2" />
                <text x="460" y="213" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">4</text>
              </g>
            </svg>
          )}

          {/* DIAGRAM D: BLAST HOLE DRILL RIG */}
          {activeDiagram === 'drill_rig' && (
            <svg viewBox="0 0 520 320" className="w-full h-auto select-none">
              <line x1="20" y1="280" x2="500" y2="280" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />

              {/* Crawler Undercarriage */}
              <g onClick={() => setSelectedCallout('drill_tracks')} className="cursor-pointer group">
                <rect x="140" y="240" width="160" height="34" rx="17" fill="#334155" stroke="#1E293B" strokeWidth="2" />
                <circle cx="165" cy="257" r="9" fill="#64748B" />
                <circle cx="195" cy="257" r="9" fill="#64748B" />
                <circle cx="225" cy="257" r="9" fill="#64748B" />
                <circle cx="255" cy="257" r="9" fill="#64748B" />
                <circle cx="280" cy="257" r="9" fill="#64748B" />
                <circle cx="220" cy="257" r="8" fill="#E9B949" stroke="#FFFFFF" strokeWidth="2" />
                <text x="220" y="260" textAnchor="middle" fill="#252A25" fontSize="9" fontWeight="bold">1</text>
              </g>

              {/* Machinery House & Cab */}
              <rect x="160" y="170" width="120" height="70" rx="5" fill="#E9B949" stroke="#B45309" strokeWidth="2" />
              <rect x="170" y="180" width="30" height="30" rx="3" fill="#93C5FD" stroke="#1E293B" />
              <rect x="230" y="180" width="40" height="50" rx="3" fill="#334155" />

              {/* Vertical Drill Mast */}
              <g onClick={() => setSelectedCallout('drill_mast')} className="cursor-pointer group">
                <rect x="300" y="40" width="28" height="230" rx="3" fill="#475569" stroke="#1E293B" strokeWidth="2" />
                {/* Lattice lacing */}
                <line x1="300" y1="60" x2="328" y2="80" stroke="#64748B" strokeWidth="1.5" />
                <line x1="300" y1="100" x2="328" y2="120" stroke="#64748B" strokeWidth="1.5" />
                <line x1="300" y1="140" x2="328" y2="160" stroke="#64748B" strokeWidth="1.5" />
                <line x1="300" y1="180" x2="328" y2="200" stroke="#64748B" strokeWidth="1.5" />
                <line x1="300" y1="220" x2="328" y2="240" stroke="#64748B" strokeWidth="1.5" />
                <circle cx="314" cy="110" r="8" fill="#245B3C" stroke="#FFFFFF" strokeWidth="2" className="animate-pulse" />
                <text x="314" y="113" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">2</text>
              </g>

              {/* Rotary Drill Head & Drill String */}
              <g onClick={() => setSelectedCallout('rotary_head')} className="cursor-pointer group">
                <rect x="294" y="140" width="40" height="30" rx="3" fill="#245B3C" stroke="#FFFFFF" strokeWidth="1" />
                <line x1="314" y1="170" x2="314" y2="280" stroke="#CBD5E1" strokeWidth="7" />
                {/* Dust curtain hood */}
                <rect x="296" y="260" width="36" height="20" fill="#1E293B" rx="2" />
                {/* Borehole in rock */}
                <rect x="308" y="280" width="12" height="35" fill="#252A25" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="314" cy="155" r="8" fill="#E9B949" stroke="#FFFFFF" strokeWidth="2" />
                <text x="314" y="158" textAnchor="middle" fill="#252A25" fontSize="9" fontWeight="bold">3</text>
              </g>
            </svg>
          )}

          <div className="text-[11px] text-[#68716B] mt-2 italic font-sans text-center">
            Click numbered callouts (1, 2, 3...) on the diagram to inspect component functions.
          </div>
        </div>

        {/* Selected Component Information Panel (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="border-b border-[#E2E8F0] pb-3">
            <span className="text-[10px] uppercase font-mono text-[#245B3C] font-bold block">
              Component Specification
            </span>
            <h3 className="text-base font-bold text-[#252A25] mt-0.5">
              {activeDetail.title}
            </h3>
          </div>

          <div className="space-y-3 text-xs leading-relaxed text-[#252A25]">
            <div>
              <span className="font-semibold text-[#68716B] block mb-1">Operational Role:</span>
              <p className="text-[#252A25]">{activeDetail.functionDesc}</p>
            </div>

            <div className="p-3 bg-[#E8F0EC] rounded-lg border border-[#65866B]/30">
              <span className="font-bold text-[#245B3C] flex items-center gap-1.5 mb-1 text-[11px]">
                <Gauge className="w-3.5 h-3.5" /> Real-Time Telemetry Indicator
              </span>
              <p className="font-mono text-[11px] text-[#1B472E]">
                {activeDetail.telemetryMetric}
              </p>
            </div>

            <div className="pt-2 border-t border-[#E2E8F0]">
              <span className="font-semibold text-[#68716B] block mb-0.5">Engineering Baseline:</span>
              <p className="text-[11px] text-[#68716B]">{activeDetail.typicalSpec}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
