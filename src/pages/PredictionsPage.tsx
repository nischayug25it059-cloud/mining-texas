import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  ShieldAlert, 
  Activity, 
  Gauge, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  Play, 
  RefreshCw, 
  Eye, 
  Info, 
  Check, 
  Layers, 
  TrendingUp,
  FileCheck,
  Flame,
  ArrowRight
} from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { RiskBadge, StatusBadge } from '../components/common/StatusBadge';
import { 
  evaluateMachineHealth, 
  generateMaintenanceInsights, 
  EQUIPMENT_THRESHOLDS,
  MaintenanceInsight 
} from '../utils/predictionEngine';
import { Equipment } from '../types/mining';

export const PredictionsPage: React.FC = () => {
  const { 
    equipment, 
    setSelectedMachine, 
    telemetryActive, 
    toggleTelemetry, 
    lastTelemetryTick 
  } = useMining();

  const [activeTab, setActiveTab] = useState<'insights' | 'ranking' | 'pipeline' | 'thresholds'>('insights');
  const [insightSeverityFilter, setInsightSeverityFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [acknowledgedMap, setAcknowledgedMap] = useState<Record<string, boolean>>({});
  const [isSimulatingStaleSensor, setIsSimulatingStaleSensor] = useState(false);
  const [lastAssessmentTimestamp, setLastAssessmentTimestamp] = useState<string>(
    new Date().toLocaleTimeString('en-IN')
  );

  // Generate dynamic maintenance insights based on current data
  const rawInsights = useMemo(() => {
    const list = generateMaintenanceInsights(equipment);

    // If simulated stale sensor toggle is on, inject an insufficient data alert for DR-301
    if (isSimulatingStaleSensor) {
      list.unshift({
        id: 'insight-stale-DR-301',
        equipmentId: 'DR-301',
        equipmentName: 'Rotary Blast Hole Drill DR-301',
        equipmentType: 'drill_rig',
        severity: 'warning',
        category: 'insufficient_data',
        reason: 'Rotary Drill DR-301 telemetry stream interrupted. Last handshake exceeded 15 minutes.',
        relevantSensors: [
          { label: 'RTU Heartbeat', value: 'Interrupted (>15m)', threshold: '< 15s normal' },
          { label: 'CAN Bus Diagnostics', value: 'No packet ACK', threshold: 'Active' },
        ],
        recommendedAction: 'Inspect telemetry gateway harness on mast assembly. Do not classify unit as healthy while telemetry is stale.',
        acknowledged: false,
        timestamp: new Date().toLocaleTimeString('en-IN'),
      });
    }

    return list;
  }, [equipment, isSimulatingStaleSensor]);

  // Handle acknowledge
  const handleAcknowledge = (insightId: string) => {
    setAcknowledgedMap((prev) => ({
      ...prev,
      [insightId]: !prev[insightId],
    }));
  };

  // Run Health Assessment Trigger
  const handleRunAssessment = () => {
    setLastAssessmentTimestamp(new Date().toLocaleTimeString('en-IN'));
  };

  // Filtered insights
  const filteredInsights = useMemo(() => {
    if (insightSeverityFilter === 'all') return rawInsights;
    return rawInsights.filter((ins) => ins.severity === insightSeverityFilter);
  }, [rawInsights, insightSeverityFilter]);

  // Evaluated Fleet Risk Ranking
  const evaluatedFleet = useMemo(() => {
    return equipment.map((eq) => {
      const isTargetStale = isSimulatingStaleSensor && eq.id === 'DR-301';
      const assessment = evaluateMachineHealth(eq, isTargetStale);
      return {
        ...eq,
        assessment,
      };
    }).sort((a, b) => b.assessment.failureRiskScore - a.assessment.failureRiskScore);
  }, [equipment, isSimulatingStaleSensor]);

  return (
    <div className="space-y-6">
      {/* Title & Statutory Prediction Model Banner */}
      <div className="gov-card p-6 border-l-4 border-l-[#245B3C]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-[#E8F0EC] text-[#245B3C] border border-[#65866B]/30">
                Deterministic Diagnostic Engine
              </span>
              <span className="text-xs text-[#68716B]">Explainable Physics-Informed Heuristics</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#252A25] flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#245B3C]" />
              AI Health Predictions &amp; Maintenance Insights
            </h1>

            <p className="text-sm text-[#68716B] mt-1 max-w-3xl leading-relaxed">
              Multi-stage diagnostic pipeline evaluating thermal envelope drift, ISO 10816 mechanical vibration envelopes, and maintenance interval adherence without black-box hallucination.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 shrink-0">
            <button
              onClick={handleRunAssessment}
              className="px-3.5 py-2 rounded-lg bg-[#245B3C] text-white hover:bg-[#183E28] text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
              title="Validate live sensor buffers and recalculate risk categories"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Run Health Assessment</span>
            </button>

            <button
              onClick={() => setIsSimulatingStaleSensor(!isSimulatingStaleSensor)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                isSimulatingStaleSensor
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white text-slate-700 border-[#E2E8F0] hover:bg-[#F8F8F4]'
              }`}
              title="Toggle simulated sensor packet drop to test fail-safe Insufficient Data protocol"
            >
              <span>{isSimulatingStaleSensor ? 'Stale Test: ON' : 'Test Stale Sensor'}</span>
            </button>
          </div>
        </div>

        {/* Mandatory Transparency Disclaimer */}
        <div className="mt-4 px-3.5 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#E9B949]/50 flex items-center justify-between text-xs text-[#252A25] flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#D97706] shrink-0" />
            <span className="font-semibold text-[#B45309]">
              Prototype health assessment — not a validated safety-critical prediction system.
            </span>
          </div>
          <div className="text-[11px] font-mono text-[#68716B]">
            Engine Version: 2.5-rule-baseline • Last Assessed: {lastAssessmentTimestamp}
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-[#E2E8F0] overflow-x-auto">
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'insights'
                ? 'bg-[#245B3C] text-white shadow-sm'
                : 'bg-[#F1F5F9] text-[#68716B] hover:bg-[#E2E8F0]'
            }`}
          >
            AI Maintenance Insights ({rawInsights.length})
          </button>
          <button
            onClick={() => setActiveTab('ranking')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'ranking'
                ? 'bg-[#245B3C] text-white shadow-sm'
                : 'bg-[#F1F5F9] text-[#68716B] hover:bg-[#E2E8F0]'
            }`}
          >
            Fleet Failure Risk Ranking
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'pipeline'
                ? 'bg-[#245B3C] text-white shadow-sm'
                : 'bg-[#F1F5F9] text-[#68716B] hover:bg-[#E2E8F0]'
            }`}
          >
            Prediction Pipeline Architecture
          </button>
          <button
            onClick={() => setActiveTab('thresholds')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'thresholds'
                ? 'bg-[#245B3C] text-white shadow-sm'
                : 'bg-[#F1F5F9] text-[#68716B] hover:bg-[#E2E8F0]'
            }`}
          >
            Machine-Specific Thresholds
          </button>
        </div>
      </div>

      {/* TAB 1: AI MAINTENANCE INSIGHTS */}
      {activeTab === 'insights' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#252A25]">
                Active AI Maintenance Insights
              </h2>
              <p className="text-xs text-[#68716B]">
                Actionable engineering advisories synthesized from continuous fleet telemetry streams.
              </p>
            </div>

            {/* Severity Filter */}
            <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-lg border border-[#E2E8F0] self-start sm:self-auto text-xs">
              <button
                onClick={() => setInsightSeverityFilter('all')}
                className={`px-2.5 py-1 rounded font-semibold ${
                  insightSeverityFilter === 'all'
                    ? 'bg-[#245B3C] text-white'
                    : 'text-[#68716B] hover:text-[#252A25]'
                }`}
              >
                All ({rawInsights.length})
              </button>
              <button
                onClick={() => setInsightSeverityFilter('critical')}
                className={`px-2.5 py-1 rounded font-semibold ${
                  insightSeverityFilter === 'critical'
                    ? 'bg-rose-600 text-white'
                    : 'text-[#68716B] hover:text-[#252A25]'
                }`}
              >
                Critical
              </button>
              <button
                onClick={() => setInsightSeverityFilter('warning')}
                className={`px-2.5 py-1 rounded font-semibold ${
                  insightSeverityFilter === 'warning'
                    ? 'bg-amber-600 text-white'
                    : 'text-[#68716B] hover:text-[#252A25]'
                }`}
              >
                Warning
              </button>
              <button
                onClick={() => setInsightSeverityFilter('info')}
                className={`px-2.5 py-1 rounded font-semibold ${
                  insightSeverityFilter === 'info'
                    ? 'bg-blue-600 text-white'
                    : 'text-[#68716B] hover:text-[#252A25]'
                }`}
              >
                Advisory
              </button>
            </div>
          </div>

          {filteredInsights.length === 0 ? (
            <div className="gov-card p-8 text-center text-slate-500 text-sm">
              No active alerts matching the selected filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredInsights.map((insight) => {
                const isAck = acknowledgedMap[insight.id];
                const severityStyle =
                  insight.severity === 'critical'
                    ? 'border-l-4 border-l-rose-600 bg-rose-50/15'
                    : insight.severity === 'warning'
                    ? 'border-l-4 border-l-amber-500 bg-amber-50/15'
                    : 'border-l-4 border-l-blue-500 bg-blue-50/15';

                return (
                  <div
                    key={insight.id}
                    className={`gov-card p-4 flex flex-col justify-between transition-all ${severityStyle} ${
                      isAck ? 'opacity-65' : ''
                    }`}
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                              insight.severity === 'critical'
                                ? 'bg-rose-100 text-rose-800'
                                : insight.severity === 'warning'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {insight.severity}
                          </span>
                          <span className="font-mono font-bold text-xs text-[#245B3C]">
                            {insight.equipmentId}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {insight.equipmentName}
                          </span>
                        </div>

                        <span className="text-[10px] font-mono text-slate-400">
                          {insight.timestamp}
                        </span>
                      </div>

                      {/* Reason */}
                      <p className="text-xs text-[#252A25] font-semibold mb-3">
                        {insight.reason}
                      </p>

                      {/* Relevant Sensors Box */}
                      <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E2E8F0] space-y-1 mb-3">
                        <div className="text-[10px] font-mono uppercase text-[#68716B] font-semibold">
                          Relevant Sensor Readings vs Limit
                        </div>
                        {insight.relevantSensors.map((sensor, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs"
                          >
                            <span className="text-[#4A5568]">{sensor.label}:</span>
                            <span className="font-mono font-medium text-[#252A25]">
                              {sensor.value}{' '}
                              <span className="text-[10px] text-slate-400">
                                (limit: {sensor.threshold})
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Recommended Action */}
                      <div className="p-2.5 rounded-lg bg-[#E8F0EC]/60 border border-[#65866B]/30 mb-3">
                        <div className="text-[10px] font-mono uppercase text-[#245B3C] font-semibold mb-0.5 flex items-center gap-1">
                          <Wrench className="w-3 h-3" />
                          Recommended Action
                        </div>
                        <p className="text-xs text-[#183E28] leading-tight">
                          {insight.recommendedAction}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] text-xs">
                      <button
                        onClick={() => {
                          const machine = equipment.find((e) => e.id === insight.equipmentId);
                          if (machine) setSelectedMachine(machine);
                        }}
                        className="font-semibold text-[#245B3C] hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Asset</span>
                      </button>

                      <button
                        onClick={() => handleAcknowledge(insight.id)}
                        className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${
                          isAck
                            ? 'bg-slate-200 text-slate-700'
                            : 'bg-white border border-[#CBD5E1] text-[#252A25] hover:bg-[#F1F5F9]'
                        }`}
                      >
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>{isAck ? 'Acknowledged' : 'Acknowledge Alert'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: FLEET FAILURE RISK RANKING */}
      {activeTab === 'ranking' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#252A25]">
                Fleet Risk Priority Queue
              </h2>
              <p className="text-xs text-[#68716B]">
                Ranked by deterministic failure risk score computed across all operational channels.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {evaluatedFleet.length} Monitored Units
            </span>
          </div>

          <div className="gov-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E2E8F0] text-[#68716B] font-mono uppercase text-[10px]">
                    <th className="py-3 px-3">Machine</th>
                    <th className="py-3 px-3">Type</th>
                    <th className="py-3 px-3">Operating Status</th>
                    <th className="py-3 px-3">Health Score</th>
                    <th className="py-3 px-3">Failure Risk</th>
                    <th className="py-3 px-3">Top Contributing Factor</th>
                    <th className="py-3 px-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {evaluatedFleet.map((m) => {
                    const topSignal = m.assessment.contributingSignals[0];
                    return (
                      <tr
                        key={m.id}
                        onClick={() => setSelectedMachine(m)}
                        className="hover:bg-[#F8F8F4] cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-3">
                          <span className="font-mono font-bold text-[#245B3C]">{m.id}</span>
                          <span className="text-[#68716B] block text-[11px] truncate max-w-[140px]">
                            {m.name}
                          </span>
                        </td>
                        <td className="py-3 px-3 capitalize text-[#4A5568]">
                          {m.type.replace('_', ' ')}
                        </td>
                        <td className="py-3 px-3">
                          <StatusBadge status={m.status} />
                        </td>
                        <td className="py-3 px-3">
                          {m.assessment.isInsufficientData ? (
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px] font-semibold">
                              Insufficient data
                            </span>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold">
                                {m.assessment.healthScore} / 100
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <RiskBadge
                            level={m.assessment.failureRiskLevel as any}
                            score={m.assessment.failureRiskScore}
                          />
                        </td>
                        <td className="py-3 px-3">
                          {topSignal ? (
                            <div>
                              <div className="font-medium text-[#252A25]">{topSignal.factor}</div>
                              <div className="text-[11px] text-[#68716B] font-mono">
                                {topSignal.value} ({topSignal.normalRange})
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-400">All channels normal</span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMachine(m);
                            }}
                            className="px-2.5 py-1 rounded bg-[#E8F0EC] hover:bg-[#245B3C] text-[#245B3C] hover:text-white font-semibold text-xs transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Details</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PREDICTION PIPELINE ARCHITECTURE */}
      {activeTab === 'pipeline' && (
        <div className="gov-card p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[#252A25]">
              Diagnostic Pipeline Architecture
            </h2>
            <p className="text-xs text-[#68716B]">
              Deterministic sequence ensuring explainable diagnostics and fail-safe handling of telemetry dropouts.
            </p>
          </div>

          {/* Stepper Pipeline Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 pt-2">
            {[
              { step: '01', title: 'Sensor Readings', desc: 'Continuous CAN-bus telemetry: engine temp, vibration RMS, fuel rate, speed' },
              { step: '02', title: 'Data Validation', desc: 'Heartbeat latency check, stale timestamp check, range validity guardrails' },
              { step: '03', title: 'Feature Extraction', desc: 'dT/dt thermal slope, dV/dt vibration acceleration, hours overdue calculation' },
              { step: '04', title: 'Health Assessment', desc: 'Machine-specific threshold comparison against ISO 10816 vibration zones' },
              { step: '05', title: 'Risk Classification', desc: 'Deterministic score synthesis: Low (<35), Medium (35-64), High (≥65), Unknown' },
              { step: '06', title: 'Action Dispatch', desc: 'Specific maintenance instructions with required tools and urgency horizon' },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-[#E2E8F0] bg-[#FAF8F5] flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#245B3C] bg-[#E8F0EC] px-1.5 py-0.5 rounded w-max mb-2">
                    Step {p.step}
                  </div>
                  <h3 className="text-xs font-bold text-[#252A25] mb-1">{p.title}</h3>
                  <p className="text-[11px] text-[#68716B] leading-tight">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Fallback Protocol Explanation */}
          <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#E2E8F0] space-y-2">
            <h3 className="text-xs font-bold text-[#252A25] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              Fail-Safe Incomplete Telemetry Protocol
            </h3>
            <p className="text-xs text-[#4A5568] leading-relaxed">
              If an asset's telemetry stream is delayed by more than 15 minutes or contains corrupted readings, the engine suppresses automatic "Healthy" verdicts. It assigns a status of <strong>"Insufficient data"</strong> with Risk Level <strong>"Unknown"</strong> and instructs technicians to inspect physical telemetry links rather than risking false-negative safety classifications.
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: MACHINE-SPECIFIC OPERATIONAL THRESHOLDS */}
      {activeTab === 'thresholds' && (
        <div className="gov-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-[#252A25]">
              Equipment-Specific Operational Envelopes
            </h2>
            <p className="text-xs text-[#68716B]">
              Standardized thresholds tailored to mechanical duty cycles instead of blanket fleet limits.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#E2E8F0] text-[#68716B] font-mono uppercase text-[10px]">
                  <th className="py-3 px-3">Equipment Category</th>
                  <th className="py-3 px-3">Normal Temp Max</th>
                  <th className="py-3 px-3">Warning Temp Max</th>
                  <th className="py-3 px-3">Normal Vibration Max</th>
                  <th className="py-3 px-3">Critical Vibration</th>
                  <th className="py-3 px-3">Service Interval</th>
                  <th className="py-3 px-3">Target Utilization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {Object.entries(EQUIPMENT_THRESHOLDS).map(([type, t]) => (
                  <tr key={type} className="hover:bg-[#F8F8F4]">
                    <td className="py-3 px-3 font-semibold capitalize text-[#252A25]">
                      {type.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-3 font-mono text-[#245B3C]">&lt; {t.tempNormalMax}°C</td>
                    <td className="py-3 px-3 font-mono text-amber-600">{t.tempWarningMax}°C</td>
                    <td className="py-3 px-3 font-mono text-[#245B3C]">&lt; {t.vibrationNormalMax} mm/s</td>
                    <td className="py-3 px-3 font-mono text-rose-600">&gt; {t.vibrationCriticalMin} mm/s</td>
                    <td className="py-3 px-3 font-mono text-[#4A5568]">{t.serviceIntervalHours} hrs</td>
                    <td className="py-3 px-3 font-mono text-[#4A5568]">{t.targetUtilization}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
