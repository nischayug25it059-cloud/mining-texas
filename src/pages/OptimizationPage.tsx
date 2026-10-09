import React, { useState } from 'react';
import { 
  GitFork, 
  Sliders, 
  ArrowRight, 
  CheckCircle2, 
  Fuel, 
  TrendingUp, 
  Clock, 
  Layers, 
  Truck, 
  Sparkles
} from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { solveFleetOptimization, OptimizationResult } from '../utils/optimizationSolver';
import { formatNumber, formatTonnes } from '../utils/formatters';

export const OptimizationPage: React.FC = () => {
  const { 
    zones, 
    equipment, 
    applyOptimization, 
    isOptimizationApplied,
    setSelectedMachine
  } = useMining();

  // Compute optimization result from heuristic solver
  const optResult: OptimizationResult = React.useMemo(() => {
    return solveFleetOptimization(zones, equipment);
  }, [zones, equipment]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="gov-card p-6 border-l-4 border-l-[#245B3C]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-[#E8F0EC] text-[#245B3C] border border-[#65866B]/30">
                Resource Allocation &amp; Optimization
              </span>
              <span className="text-xs text-[#68716B]">M/M/s Stochastic Queuing Model</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#252A25] flex items-center gap-2">
              <GitFork className="w-6 h-6 text-[#245B3C]" />
              Resource Allocation &amp; Dynamic Fleet Optimization
            </h1>
            <p className="text-sm text-[#68716B] mt-1">
              Heuristic shovel-truck matching engine minimizing cycle wait times and balancing production quotas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isOptimizationApplied ? (
              <span className="px-3.5 py-1.5 rounded-lg bg-[#E8F0EC] border border-[#65866B]/30 text-[#15803D] font-mono text-xs flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4" /> AI Dispatch Applied to Live Fleet
              </span>
            ) : (
              <button
                onClick={() => applyOptimization()}
                className="px-4 py-2 rounded-lg bg-[#245B3C] hover:bg-[#1E4D33] text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E9B949]" />
                Apply Optimization to Live Fleet
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Heuristic Solver Notice Banner */}
      <div className="p-4 rounded-xl bg-[#F8F8F4] border border-[#E2E8F0] text-xs text-[#252A25] flex items-start gap-3">
        <Sliders className="w-5 h-5 text-[#245B3C] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#252A25] block">Heuristic Matching Algorithm</span>
          <p className="text-[#68716B] leading-relaxed mt-0.5">
            Solves the classical Shovel-Truck Dispatch problem using arrival-rate synchronization (M/M/s queuing model). Allocates haulage units based on zone priority, bench cycle times, and haul road gradient variations.
          </p>
        </div>
      </div>

      {/* Before vs After Impact Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="gov-card p-5 border border-[#E2E8F0]">
          <span className="text-[10px] text-[#68716B] uppercase font-mono block font-semibold">Average Queue Wait Time</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold font-mono text-[#15803D]">
              {optResult.summary.avgQueueAfterMin} min
            </span>
            <span className="text-xs text-[#68716B] line-through">
              {optResult.summary.avgQueueBeforeMin} min
            </span>
          </div>
          <span className="text-xs text-[#15803D] font-medium mt-1 block">
            -{optResult.summary.queueReductionPercent}% queue delay eliminated
          </span>
        </div>

        <div className="gov-card p-5 border border-[#E2E8F0]">
          <span className="text-[10px] text-[#68716B] uppercase font-mono block font-semibold">Estimated Output Gain</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold font-mono text-[#245B3C]">
              +{optResult.summary.tonnageGainPercent}%
            </span>
            <span className="text-xs text-[#68716B]">
              +{formatTonnes(optResult.summary.totalTonnageAfter - optResult.summary.totalTonnageBefore)}
            </span>
          </div>
          <span className="text-xs text-[#68716B] mt-1 block">
            Throughput: {formatTonnes(optResult.summary.totalTonnageAfter)} / shift
          </span>
        </div>

        <div className="gov-card p-5 border border-[#E2E8F0]">
          <span className="text-[10px] text-[#68716B] uppercase font-mono block font-semibold">Fuel Saved / Shift</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold font-mono text-[#0284C7]">
              {optResult.summary.fuelSavedPerShiftLitres} L
            </span>
            <span className="text-xs text-[#68716B]">saved</span>
          </div>
          <span className="text-xs text-[#68716B] mt-1 block">
            Prevents queue engine idling
          </span>
        </div>

        <div className="gov-card p-5 border border-[#E2E8F0]">
          <span className="text-[10px] text-[#68716B] uppercase font-mono block font-semibold">CO₂ Emissions Abated</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold font-mono text-[#7C3AED]">
              {formatNumber(optResult.summary.carbonReductionKg)} kg
            </span>
            <span className="text-xs text-[#68716B]">CO₂e</span>
          </div>
          <span className="text-xs text-[#68716B] mt-1 block">
            0.24 kg CO₂ saved per tonne produced
          </span>
        </div>
      </div>

      {/* Explanatory Recommendations List */}
      <div className="gov-card p-5 border border-[#E2E8F0] space-y-4">
        <h3 className="text-sm font-bold text-[#252A25] flex items-center gap-2 border-b border-[#E2E8F0] pb-2.5">
          <Sparkles className="w-4 h-4 text-[#245B3C]" />
          Explainable Tele-Dispatch Recommendations (Audited Decisions)
        </h3>

        <div className="space-y-3">
          {optResult.recommendations.map((rec, idx) => (
            <div key={idx} className="p-4 bg-[#F8F8F4] rounded-xl border border-[#E2E8F0] text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#245B3C] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                    {rec.machineId}
                  </span>
                  <span className="font-semibold text-[#252A25]">{rec.action}</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#68716B]">
                  <span>{rec.fromZone}</span>
                  <ArrowRight className="w-3 h-3 text-[#245B3C]" />
                  <span className="text-[#15803D] font-bold">{rec.toZone}</span>
                </div>
              </div>

              <p className="text-[#68716B] leading-relaxed text-[11px]">
                <strong className="text-[#252A25]">Reasoning:</strong> {rec.reasoning}
              </p>

              <div className="mt-2 text-[10px] text-[#15803D] font-mono font-bold">
                ✓ Expected Operational Yield: {rec.expectedGain}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zone Allocation Matrix */}
      <div className="gov-card p-5 border border-[#E2E8F0] space-y-4">
        <h3 className="text-sm font-bold text-[#252A25] flex items-center gap-2 border-b border-[#E2E8F0] pb-2.5">
          <Layers className="w-4 h-4 text-[#245B3C]" />
          Pit Zone Fleet Allocation Matrix
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {optResult.allocations.map(alloc => (
            <div key={alloc.zoneId} className="p-4 bg-[#F8F8F4] rounded-xl border border-[#E2E8F0] space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-bold text-[#252A25] text-sm block">{alloc.zoneName}</span>
                  <span className="text-[11px] text-[#68716B] font-mono">
                    Priority: <strong className={alloc.priority === 'Critical' ? 'text-[#DC2626]' : 'text-[#D97706]'}>{alloc.priority}</strong> | Target: {alloc.targetTonnes} t
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E8F0EC] text-[#15803D] border border-[#65866B]/30">
                  +{alloc.cycleEfficiencyGainPercent}% Gain
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono p-2.5 bg-white rounded-lg border border-[#E2E8F0]">
                <div>
                  <span className="text-[10px] text-[#68716B] block font-sans">Queue Wait</span>
                  <span className="font-bold text-[#15803D]">{alloc.optimizedQueueWaitMin} min</span>
                  <span className="text-[10px] text-[#94A3B8] line-through ml-1.5">{alloc.currentQueueWaitMin} min</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#68716B] block font-sans">Est. Output</span>
                  <span className="font-bold text-[#252A25]">{alloc.estimatedThroughputTonnes} t</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-[#68716B] uppercase font-mono block mb-1 font-semibold">Assigned Fleet</span>
                <div className="flex flex-wrap gap-1.5">
                  {alloc.assignedTruckIds.map(id => (
                    <span 
                      key={id}
                      onClick={() => {
                        const m = equipment.find(e => e.id === id);
                        if (m) setSelectedMachine(m);
                      }}
                      className="px-2 py-0.5 bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] rounded text-[10px] font-mono text-[#252A25] cursor-pointer"
                    >
                      {id}
                    </span>
                  ))}
                  {alloc.assignedShovelIds.map(id => (
                    <span 
                      key={id}
                      className="px-2 py-0.5 bg-[#E8F0EC] border border-[#65866B]/30 rounded text-[10px] font-mono text-[#245B3C] font-semibold"
                    >
                      {id}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-[#68716B] border-t border-[#E2E8F0] pt-2 italic leading-relaxed">
                {alloc.reasoning}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
