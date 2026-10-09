import React, { useState } from 'react';
import { 
  Activity, 
  Wrench, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  Send, 
  ChevronRight, 
  Gauge
} from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { StatusBadge, RiskBadge } from '../components/common/StatusBadge';
import { KpiCard } from '../components/common/KpiCard';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export const EquipmentHealthPage: React.FC = () => {
  const { equipment, setSelectedMachine } = useMining();
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Target spotlight machine: HT-201
  const ht201 = equipment.find(e => e.id === 'HT-201');

  // Maintenance Priority Queue: sorted descending by failure risk score
  const priorityQueue = [...equipment]
    .filter(e => e.status !== 'maintenance')
    .sort((a, b) => b.failureRiskScore - a.failureRiskScore);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="gov-card p-6 border-l-4 border-l-[#245B3C]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-[#E8F0EC] text-[#245B3C] border border-[#65866B]/30">
                Predictive Maintenance Engineering
              </span>
              <span className="text-xs text-[#68716B]">Condition-Monitoring Standard</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#252A25] flex items-center gap-2">
              <Activity className="w-6 h-6 text-[#245B3C]" />
              Equipment Health &amp; Predictive Diagnostics
            </h1>
            <p className="text-sm text-[#68716B] mt-1">
              Condition-based machinery monitoring, remaining useful life (RUL) estimation, and diagnostic risk decomposition.
            </p>
          </div>

          <div className="text-xs font-mono text-[#245B3C] bg-[#E8F0EC] px-3 py-1.5 rounded-lg border border-[#65866B]/30 font-semibold self-start sm:self-auto">
            ISO 10816 Vibration Envelopes
          </div>
        </div>

        {/* KPI Cards Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-5 border-t border-[#E2E8F0]">
          <KpiCard
            title="Fleet Mean Health Index"
            value="86.2 / 100"
            subtitle="18 units in optimal health"
            change="+1.4%"
            changeType="positive"
            icon={ShieldCheck}
            themeColor="emerald"
          />
          <KpiCard
            title="High Risk Assets"
            value="1 Unit"
            subtitle="HT-201 (Risk Score: 78/100)"
            change="Action Required"
            changeType="negative"
            icon={AlertTriangle}
            themeColor="rose"
          />
          <KpiCard
            title="Medium Risk Warnings"
            value="2 Units"
            subtitle="DR-302, HT-208"
            change="Monitored"
            changeType="neutral"
            icon={Activity}
            themeColor="amber"
          />
          <KpiCard
            title="Avg Remaining Useful Life"
            value="710 hrs"
            subtitle="Weibull decay forecast"
            change="Stable"
            changeType="positive"
            icon={Clock}
            themeColor="cyan"
          />
        </div>
      </div>

      {/* FEATURED SPOTLIGHT SCENARIO: HT-201 */}
      {ht201 && (
        <div className="gov-card p-6 border-2 border-[#F59E0B]/60 bg-[#FFFBEB] space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-[#FDE68A] pb-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]">
                  CRITICAL PREDICTIVE SPOTLIGHT
                </span>
                <span className="text-xs font-mono text-[#68716B]">Target Asset:</span>
                <span className="font-bold text-[#252A25] text-base font-mono">{ht201.id}</span>
                <StatusBadge status={ht201.status} size="sm" />
              </div>
              <h2 className="text-xl font-bold text-[#252A25]">
                {ht201.name} — Drive Bearing Vibration &amp; Thermal Drift
              </h2>
              <p className="text-xs text-[#68716B] max-w-3xl leading-relaxed">
                Telemetry streams indicate synchronous drive axle harmonic vibrations exceeding standard ISO 10816-3 Class IV thresholds, compounded by turbocharger outlet temperatures at 104.5°C and 420 accumulated operating hours since periodic service.
              </p>
            </div>

            {/* Risk and RUL Badges */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[#FDE68A] shrink-0 shadow-sm">
              <div className="text-center">
                <span className="text-[10px] text-[#68716B] uppercase font-mono font-semibold block">Failure Risk</span>
                <span className="text-3xl font-extrabold text-[#DC2626] font-mono">
                  {ht201.failureRiskScore}
                </span>
                <span className="text-[10px] text-[#68716B] block">/ 100 (HIGH)</span>
              </div>
              <div className="h-10 w-px bg-[#E2E8F0]" />
              <div className="text-center">
                <span className="text-[10px] text-[#68716B] uppercase font-mono font-semibold block">Estimated RUL</span>
                <span className="text-3xl font-extrabold text-[#D97706] font-mono">
                  {ht201.rulHours}
                </span>
                <span className="text-[10px] text-[#68716B] block">hours remaining</span>
              </div>
            </div>
          </div>

          {/* Breakdown of Contributing Signals & Live Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            {/* Contributing Signals Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#252A25] flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#245B3C]" />
                Contributing Diagnostic Signals Decomposition
              </h3>

              <div className="space-y-2">
                {ht201.contributingSignals.map((sig, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-[#FDE68A] flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${sig.severity === 'critical' ? 'bg-[#DC2626]' : sig.severity === 'moderate' ? 'bg-[#D97706]' : 'bg-[#15803D]'}`} />
                        <span className="font-semibold text-[#252A25]">{sig.factor}</span>
                      </div>
                      <span className="text-[10px] text-[#68716B] mt-0.5 block">
                        Weight: {sig.weightPercent}% | Normal: {sig.normalRange}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className={`font-mono font-bold text-sm ${sig.severity === 'critical' ? 'text-[#DC2626]' : sig.severity === 'moderate' ? 'text-[#B45309]' : 'text-[#15803D]'}`}>
                        {sig.value}
                      </span>
                      <span className="text-[10px] text-[#68716B] block uppercase font-mono">
                        {sig.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Prescriptive Recommendation Box */}
              <div className="p-4 bg-white rounded-xl border border-[#FDE68A] text-xs">
                <span className="font-bold text-[#D97706] flex items-center gap-1.5 mb-1">
                  <Wrench className="w-3.5 h-3.5" /> Prescriptive Action Plan
                </span>
                <p className="text-[#252A25] leading-relaxed text-[11px]">
                  {ht201.recommendedAction}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedMachine(ht201)}
                    className="px-3 py-1.5 bg-[#245B3C] text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1 shadow-sm"
                  >
                    Open Deep Telemetry View <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => alert('Field Technician dispatched to HT-201 in Zone A.')}
                    className="px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#252A25] font-semibold rounded-lg text-xs border border-[#CBD5E1] transition-colors"
                  >
                    Dispatch Field Tech
                  </button>
                </div>
              </div>
            </div>

            {/* HT-201 Real-Time Telemetry Trend Chart */}
            <div className="bg-white p-4 rounded-xl border border-[#FDE68A] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2 border-b border-[#E2E8F0] pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#252A25] flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#245B3C]" />
                  Live Sensor Drift (Engine Temp &amp; Vibration Velocity)
                </h3>
                <span className="text-[10px] text-[#68716B] font-mono">Streaming Live</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ht201.telemetryHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="timestamp" stroke="#68716B" fontSize={10} />
                    <YAxis yAxisId="temp" stroke="#D97706" domain={[80, 115]} fontSize={10} unit="°C" />
                    <YAxis yAxisId="vib" orientation="right" stroke="#DC2626" domain={[2, 11]} fontSize={10} unit="mm/s" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '8px', fontSize: '11px', color: '#252A25' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                    <Line yAxisId="temp" type="monotone" dataKey="temp" name="Turbo Outlet Temp (°C)" stroke="#D97706" strokeWidth={2} dot={false} />
                    <Line yAxisId="vib" type="monotone" dataKey="vibration" name="Drive Axle Vibration (mm/s)" stroke="#DC2626" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="text-[10px] text-[#68716B] mt-2 p-2 bg-[#F8F8F4] rounded border border-[#E2E8F0]">
                <strong>Model Note:</strong> Diagnostic calculation based on rule-based ISO severity matrices.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Maintenance Priority Queue Table */}
      <div className="gov-card p-5 border border-[#E2E8F0] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#252A25] flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#245B3C]" />
              Prescriptive Maintenance Priority Queue
            </h3>
            <p className="text-xs text-[#68716B]">
              Ranked list of mining equipment ordered by failure-risk index and remaining useful life.
            </p>
          </div>

          {/* Risk Level Filter */}
          <div className="flex items-center gap-2 text-xs">
            {['all', 'high', 'medium', 'low'].map(r => (
              <button
                key={r}
                onClick={() => setSelectedRisk(r)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors font-medium ${
                  selectedRisk === r
                    ? 'bg-[#245B3C] text-white shadow-sm'
                    : 'text-[#68716B] hover:bg-[#F1F5F9] bg-white border border-[#E2E8F0]'
                }`}
              >
                {r === 'all' ? 'All Risks' : `${r} Risk`}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="gov-table w-full text-xs">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Asset ID</th>
                <th>Machine Name</th>
                <th>Failure Risk Score</th>
                <th>RUL (Hours)</th>
                <th>Operating Hours</th>
                <th>Since Last PM</th>
                <th>Recommended Action</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {priorityQueue
                .filter(m => selectedRisk === 'all' || m.failureRiskLevel === selectedRisk)
                .map((m, index) => (
                  <tr 
                    key={m.id}
                    onClick={() => setSelectedMachine(m)}
                    className={`hover:bg-[#F8F8F4] cursor-pointer transition-colors ${
                      m.id === 'HT-201' ? 'bg-[#FEF3C7]/40 font-semibold' : ''
                    }`}
                  >
                    <td className="font-mono text-[#68716B]">#{index + 1}</td>
                    <td className="font-mono font-bold text-[#245B3C]">{m.id}</td>
                    <td className="font-semibold text-[#252A25]">{m.name}</td>
                    <td>
                      <RiskBadge level={m.failureRiskLevel} score={m.failureRiskScore} />
                    </td>
                    <td className={`font-mono font-bold ${m.rulHours < 50 ? 'text-[#DC2626]' : m.rulHours < 200 ? 'text-[#D97706]' : 'text-[#252A25]'}`}>
                      {m.rulHours} hrs
                    </td>
                    <td className="font-mono text-[#68716B]">{m.operatingHours} hrs</td>
                    <td className={`font-mono ${m.hoursSinceMaintenance > 300 ? 'text-[#D97706] font-bold' : 'text-[#68716B]'}`}>
                      {m.hoursSinceMaintenance} hrs
                    </td>
                    <td className="text-[#68716B] max-w-xs truncate">{m.recommendedAction}</td>
                    <td className="text-right">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedMachine(m);
                        }}
                        className="text-[#245B3C] hover:underline text-[11px] font-semibold"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
