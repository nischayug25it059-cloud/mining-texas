import React, { useState } from 'react';
import { 
  Cpu, 
  Play, 
  RotateCcw, 
  Download, 
  Sliders, 
  TrendingUp, 
  Fuel, 
  Layers, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  DollarSign,
  Leaf
} from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { SimulationInputs, SimulationResult } from '../types/mining';
import { SIMULATION_PRESETS } from '../data/simulationPresets';
import { calculateSimulation } from '../utils/simulationMath';
import { exportToCsv } from '../utils/exportCsv';
import { formatNumber, formatTonnes, formatInr, formatPercent } from '../utils/formatters';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Legend
} from 'recharts';

export const SimulationPage: React.FC = () => {
  const { 
    simInputs, 
    setSimInputs, 
    simResult, 
    runSimulation, 
    loadSimulationPreset, 
    resetSimulation 
  } = useMining();

  const [activePreset, setActivePreset] = useState<'A' | 'B' | 'C'>('B');

  // Baseline scenario calculation for comparison
  const baselineResult = React.useMemo(() => {
    return calculateSimulation(SIMULATION_PRESETS.A);
  }, []);

  const handleInputChange = (field: keyof SimulationInputs, value: number) => {
    setSimInputs(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelectPreset = (key: 'A' | 'B' | 'C') => {
    setActivePreset(key);
    loadSimulationPreset(key);
  };

  const handleExportCsv = () => {
    const exportData = [
      {
        Metric: 'Scenario Name',
        Baseline_Scenario_A: SIMULATION_PRESETS.A.scenarioName,
        Current_Configured_Scenario: simInputs.scenarioName,
      },
      {
        Metric: 'Truck Count',
        Baseline_Scenario_A: SIMULATION_PRESETS.A.truckCount,
        Current_Configured_Scenario: simInputs.truckCount,
      },
      {
        Metric: 'Excavator Count',
        Baseline_Scenario_A: SIMULATION_PRESETS.A.excavatorCount,
        Current_Configured_Scenario: simInputs.excavatorCount,
      },
      {
        Metric: 'Shift Hours',
        Baseline_Scenario_A: SIMULATION_PRESETS.A.shiftHours,
        Current_Configured_Scenario: simInputs.shiftHours,
      },
      {
        Metric: 'Downtime Percent',
        Baseline_Scenario_A: `${SIMULATION_PRESETS.A.downtimePercent}%`,
        Current_Configured_Scenario: `${simInputs.downtimePercent}%`,
      },
      {
        Metric: 'Estimated Production (Tonnes)',
        Baseline_Scenario_A: baselineResult.estimatedProductionTonnes,
        Current_Configured_Scenario: simResult.estimatedProductionTonnes,
      },
      {
        Metric: 'Target Achievement',
        Baseline_Scenario_A: `${baselineResult.productionTargetAchievementPercent}%`,
        Current_Configured_Scenario: `${simResult.productionTargetAchievementPercent}%`,
      },
      {
        Metric: 'Fleet Utilization',
        Baseline_Scenario_A: `${baselineResult.fleetUtilizationPercent}%`,
        Current_Configured_Scenario: `${simResult.fleetUtilizationPercent}%`,
      },
      {
        Metric: 'Cycle Time (Minutes)',
        Baseline_Scenario_A: baselineResult.cycleTimeMinutes,
        Current_Configured_Scenario: simResult.cycleTimeMinutes,
      },
      {
        Metric: 'Total Operating Cost (INR)',
        Baseline_Scenario_A: baselineResult.totalOperatingCostInr,
        Current_Configured_Scenario: simResult.totalOperatingCostInr,
      },
      {
        Metric: 'Cost per Tonne (INR)',
        Baseline_Scenario_A: baselineResult.costPerTonneInr,
        Current_Configured_Scenario: simResult.costPerTonneInr,
      },
      {
        Metric: 'CO2 Emissions (Tonnes)',
        Baseline_Scenario_A: baselineResult.co2EmissionsTonnes,
        Current_Configured_Scenario: simResult.co2EmissionsTonnes,
      },
    ];

    exportToCsv(`simulation_run_${Date.now()}`, exportData);
  };

  // Comparison Chart Data (Baseline vs Selected)
  const comparisonData = [
    {
      metric: 'Production (kt)',
      Baseline: Number((baselineResult.estimatedProductionTonnes / 1000).toFixed(1)),
      Configured: Number((simResult.estimatedProductionTonnes / 1000).toFixed(1)),
    },
    {
      metric: 'Cost (₹10 / t)',
      Baseline: Number((baselineResult.costPerTonneInr / 10).toFixed(1)),
      Configured: Number((simResult.costPerTonneInr / 10).toFixed(1)),
    },
    {
      metric: 'Fuel (kL)',
      Baseline: Number((baselineResult.totalFuelConsumptionLitres / 1000).toFixed(1)),
      Configured: Number((simResult.totalFuelConsumptionLitres / 1000).toFixed(1)),
    },
    {
      metric: 'CO2 (t)',
      Baseline: baselineResult.co2EmissionsTonnes,
      Configured: simResult.co2EmissionsTonnes,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="gov-card p-6 border-l-4 border-l-[#245B3C]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-[#E8F0EC] text-[#245B3C] border border-[#65866B]/30">
                Operations Research &amp; Simulation
              </span>
              <span className="text-xs text-[#68716B]">Deterministic Haulage Engine</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#252A25] flex items-center gap-2">
              <Cpu className="w-6 h-6 text-[#245B3C]" />
              Mine Operations Simulation &amp; Calculation Lab
            </h1>
            <p className="text-sm text-[#68716B] mt-1 max-w-3xl">
              Deterministic mathematical modeling of shovel-truck queuing, haulage cycle times, equipment availability, 
              diesel consumption, and bottleneck dynamics with baseline scenario comparison and CSV export.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={resetSimulation}
              className="px-3.5 py-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#252A25] font-semibold text-xs rounded-lg border border-[#E2E8F0] transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>

            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 bg-[#F8F8F4] hover:bg-[#E2E8F0] text-[#245B3C] font-semibold text-xs rounded-lg border border-[#CBD5E1] transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>

            <button
              onClick={runSimulation}
              className="px-4 py-2 bg-[#245B3C] hover:bg-[#1E4D33] text-white font-bold text-xs rounded-lg transition-all shadow-sm flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Recalculate
            </button>
          </div>
        </div>

        {/* Preset Selector Strip */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-[#E2E8F0]">
          <span className="text-xs font-semibold text-[#68716B] mr-1">Load Presets:</span>
          <button
            onClick={() => handleSelectPreset('A')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activePreset === 'A'
                ? 'bg-[#245B3C] text-white'
                : 'bg-[#F1F5F9] text-[#68716B] hover:bg-[#E2E8F0]'
            }`}
          >
            Scenario A: Baseline Operations (Manual Dispatch)
          </button>
          <button
            onClick={() => handleSelectPreset('B')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activePreset === 'B'
                ? 'bg-[#245B3C] text-white'
                : 'bg-[#F1F5F9] text-[#68716B] hover:bg-[#E2E8F0]'
            }`}
          >
            Scenario B: AI-Optimized Fleet (Dynamic Queues)
          </button>
          <button
            onClick={() => handleSelectPreset('C')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activePreset === 'C'
                ? 'bg-[#245B3C] text-white'
                : 'bg-[#F1F5F9] text-[#68716B] hover:bg-[#E2E8F0]'
            }`}
          >
            Scenario C: High-Demand Production (Maximum Throughput)
          </button>
        </div>
      </div>

      {/* Main Grid: Controls (Left) and Results (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sliders and Input Controls (5 Cols) */}
        <div className="lg:col-span-5 gov-card p-5 border border-[#E2E8F0] space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <h3 className="text-sm font-bold text-[#252A25] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#245B3C]" />
              Operational Parameters
            </h3>
            <span className="text-[10px] font-mono text-[#68716B]">Interactive Variables</span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Truck Count */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#252A25] font-medium">Haul Truck Fleet Size</span>
                <span className="font-mono font-bold text-[#245B3C]">{simInputs.truckCount} trucks</span>
              </div>
              <input
                type="range"
                min="4"
                max="30"
                step="1"
                value={simInputs.truckCount}
                onChange={e => {
                  handleInputChange('truckCount', Number(e.target.value));
                  runSimulation();
                }}
                className="w-full accent-[#245B3C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#68716B] font-mono mt-0.5">
                <span>4</span>
                <span>30 units</span>
              </div>
            </div>

            {/* Excavator Count */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#252A25] font-medium">Excavators &amp; Shovels</span>
                <span className="font-mono font-bold text-[#245B3C]">{simInputs.excavatorCount} units</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={simInputs.excavatorCount}
                onChange={e => {
                  handleInputChange('excavatorCount', Number(e.target.value));
                  runSimulation();
                }}
                className="w-full accent-[#245B3C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#68716B] font-mono mt-0.5">
                <span>1</span>
                <span>8 units</span>
              </div>
            </div>

            {/* Shift Duration */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#252A25] font-medium">Shift Duration</span>
                <span className="font-mono font-bold text-[#245B3C]">{simInputs.shiftHours} hours</span>
              </div>
              <input
                type="range"
                min="4"
                max="12"
                step="1"
                value={simInputs.shiftHours}
                onChange={e => {
                  handleInputChange('shiftHours', Number(e.target.value));
                  runSimulation();
                }}
                className="w-full accent-[#245B3C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#68716B] font-mono mt-0.5">
                <span>4 hrs</span>
                <span>12 hrs</span>
              </div>
            </div>

            {/* Haul Distance */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#252A25] font-medium">One-Way Haul Distance</span>
                <span className="font-mono font-bold text-[#245B3C]">{simInputs.haulDistanceKm} km</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="6.5"
                step="0.1"
                value={simInputs.haulDistanceKm}
                onChange={e => {
                  handleInputChange('haulDistanceKm', Number(e.target.value));
                  runSimulation();
                }}
                className="w-full accent-[#245B3C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#68716B] font-mono mt-0.5">
                <span>0.8 km</span>
                <span>6.5 km</span>
              </div>
            </div>

            {/* Truck Payload */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#252A25] font-medium">Average Truck Payload</span>
                <span className="font-mono font-bold text-[#245B3C]">{simInputs.avgPayloadTonnes} tonnes</span>
              </div>
              <input
                type="range"
                min="50"
                max="140"
                step="5"
                value={simInputs.avgPayloadTonnes}
                onChange={e => {
                  handleInputChange('avgPayloadTonnes', Number(e.target.value));
                  runSimulation();
                }}
                className="w-full accent-[#245B3C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#68716B] font-mono mt-0.5">
                <span>50 t</span>
                <span>140 t</span>
              </div>
            </div>

            {/* Downtime Percentage */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#252A25] font-medium">Unplanned Downtime Rate</span>
                <span className={`font-mono font-bold ${simInputs.downtimePercent > 12 ? 'text-[#DC2626]' : 'text-[#245B3C]'}`}>
                  {simInputs.downtimePercent}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="0.5"
                value={simInputs.downtimePercent}
                onChange={e => {
                  handleInputChange('downtimePercent', Number(e.target.value));
                  runSimulation();
                }}
                className="w-full accent-[#245B3C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#68716B] font-mono mt-0.5">
                <span>0% (Optimal)</span>
                <span>30% (High Failure)</span>
              </div>
            </div>

            {/* Fuel Price */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#252A25] font-medium">Diesel Fuel Price</span>
                <span className="font-mono font-bold text-[#245B3C]">₹{simInputs.fuelPricePerLitre} / L</span>
              </div>
              <input
                type="range"
                min="80"
                max="125"
                step="0.5"
                value={simInputs.fuelPricePerLitre}
                onChange={e => {
                  handleInputChange('fuelPricePerLitre', Number(e.target.value));
                  runSimulation();
                }}
                className="w-full accent-[#245B3C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#68716B] font-mono mt-0.5">
                <span>₹80/L</span>
                <span>₹125/L</span>
              </div>
            </div>

            {/* Target Production */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#252A25] font-medium">Shift Target Production</span>
                <span className="font-mono font-bold text-[#245B3C]">{formatTonnes(simInputs.targetTonnes)}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="25000"
                step="500"
                value={simInputs.targetTonnes}
                onChange={e => {
                  handleInputChange('targetTonnes', Number(e.target.value));
                  runSimulation();
                }}
                className="w-full accent-[#245B3C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#68716B] font-mono mt-0.5">
                <span>5,000 t</span>
                <span>25,000 t</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Outputs & Diagnostics (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Output KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="gov-card p-3.5 border border-[#E2E8F0]">
              <span className="text-[10px] text-[#68716B] uppercase font-mono block">Estimated Production</span>
              <span className="text-2xl font-bold font-mono text-[#245B3C] block mt-1">
                {formatTonnes(simResult.estimatedProductionTonnes)}
              </span>
              <span className={`text-[10px] font-mono mt-1 block ${simResult.productionTargetAchievementPercent >= 100 ? 'text-[#15803D]' : 'text-[#B45309]'}`}>
                {simResult.productionTargetAchievementPercent}% of target
              </span>
            </div>

            <div className="gov-card p-3.5 border border-[#E2E8F0]">
              <span className="text-[10px] text-[#68716B] uppercase font-mono block">Cycle Duration</span>
              <span className="text-2xl font-bold font-mono text-[#252A25] block mt-1">
                {simResult.cycleTimeMinutes} min
              </span>
              <span className="text-[10px] text-[#68716B] mt-1 block">
                {simResult.tripsPerTruckPerShift} trips / truck / shift
              </span>
            </div>

            <div className="gov-card p-3.5 border border-[#E2E8F0]">
              <span className="text-[10px] text-[#68716B] uppercase font-mono block">Cost per Tonne</span>
              <span className="text-2xl font-bold font-mono text-[#15803D] block mt-1">
                ₹{simResult.costPerTonneInr}
              </span>
              <span className="text-[10px] text-[#68716B] mt-1 block">
                Total: ₹{(simResult.totalOperatingCostInr / 100000).toFixed(1)} Lakhs
              </span>
            </div>

            <div className="gov-card p-3.5 border border-[#E2E8F0]">
              <span className="text-[10px] text-[#68716B] uppercase font-mono block">CO₂ Footprint</span>
              <span className="text-2xl font-bold font-mono text-[#7C3AED] block mt-1">
                {simResult.co2EmissionsTonnes} t
              </span>
              <span className="text-[10px] text-[#68716B] mt-1 block">
                Fuel: {formatNumber(simResult.totalFuelConsumptionLitres)} L
              </span>
            </div>
          </div>

          {/* Bottleneck Diagnostic Card */}
          <div className={`p-4 rounded-xl border ${
            simResult.bottleneckType === 'none'
              ? 'bg-[#E8F0EC] border-[#65866B]/30 text-[#245B3C]'
              : 'bg-[#FEF3C7] border-[#F59E0B]/40 text-[#92400E]'
          }`}>
            <div className="flex items-start gap-2.5">
              {simResult.bottleneckType === 'none' ? (
                <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Bottleneck Analysis ({simResult.bottleneckType.replace('_', ' ').toUpperCase()})
                </h4>
                <p className="text-xs mt-1 leading-relaxed">
                  {simResult.bottleneckDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Bar Chart: Baseline vs Configured */}
          <div className="gov-card p-4 border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-3 border-b border-[#E2E8F0] pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#252A25] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#245B3C]" />
                Scenario Comparison: Baseline (A) vs Configured Sandbox
              </h4>
              <span className="text-[10px] text-[#68716B] font-mono">Relative Performance</span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="metric" stroke="#68716B" fontSize={11} />
                  <YAxis stroke="#68716B" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '8px', fontSize: '11px', color: '#252A25' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                  <Bar dataKey="Baseline" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Configured" fill="#245B3C" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key Simulation Insights Bullets */}
          <div className="gov-card p-4 border border-[#E2E8F0] space-y-1.5 text-xs">
            <span className="text-[10px] font-mono text-[#68716B] uppercase font-semibold block mb-1">
              Simulation Insights &amp; Mathematical Formulations
            </span>
            {simResult.keyInsights.map((insight, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[#252A25]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E9B949] shrink-0" />
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
