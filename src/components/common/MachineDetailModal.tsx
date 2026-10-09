import React, { useState, useMemo } from 'react';
import { 
  X, 
  Activity, 
  Gauge, 
  Wrench, 
  Clock, 
  Fuel, 
  Zap, 
  TrendingUp, 
  ShieldAlert,
  Send,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Layers,
  Info
} from 'lucide-react';
import { Equipment } from '../../types/mining';
import { StatusBadge, RiskBadge } from './StatusBadge';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  BarChart, 
  Bar 
} from 'recharts';

interface MachineDetailModalProps {
  machine: Equipment | null;
  onClose: () => void;
  onDispatchTech?: (machineId: string) => void;
}

export const MachineDetailModal: React.FC<MachineDetailModalProps> = ({
  machine,
  onClose,
  onDispatchTech,
}) => {
  const [timeFilter, setTimeFilter] = useState<'1h' | '24h' | '7d'>('1h');
  const [dispatched, setDispatched] = useState(false);

  if (!machine) return null;

  // Filtered chart data based on time range
  const chartData = useMemo(() => {
    const rawHistory = machine.telemetryHistory || [];

    if (timeFilter === '1h') {
      // Direct recent telemetry stream
      return rawHistory.map((pt, i) => ({
        time: pt.timestamp || `T-${rawHistory.length - i}m`,
        temp: Number(pt.temp.toFixed(1)),
        vibration: Number(pt.vibration.toFixed(2)),
        speed: pt.speed,
        utilization: Math.round(machine.utilization + (Math.sin(i) * 3)),
      }));
    }

    if (timeFilter === '24h') {
      // 24h hourly synthesized intervals based on machine base metrics
      const hours = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
      return hours.map((h, i) => ({
        time: h,
        temp: Number((machine.engineTemp - 4 + (i * 1.1) % 6).toFixed(1)),
        vibration: Number((machine.vibration - 0.4 + (i * 0.15) % 0.8).toFixed(2)),
        speed: Math.round(machine.speedKmh * (0.8 + (i % 3) * 0.1)),
        utilization: Math.round(machine.utilization - 5 + (i * 2) % 10),
      }));
    }

    // 7d daily aggregated trend
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((d, i) => ({
      time: d,
      temp: Number((machine.engineTemp - 3 + (i * 0.8)).toFixed(1)),
      vibration: Number((machine.vibration - 0.3 + (i * 0.1)).toFixed(2)),
      speed: Math.round(machine.speedKmh),
      utilization: Math.round(machine.utilization - 2 + (i % 4)),
    }));
  }, [machine, timeFilter]);

  const handleDispatch = () => {
    setDispatched(true);
    if (onDispatchTech) onDispatchTech(machine.id);
    setTimeout(() => setDispatched(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl p-6 text-[#252A25]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#E2E8F0] pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#E8F0EC] border border-[#65866B]/30 rounded-xl text-[#245B3C]">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold tracking-tight text-[#252A25]">{machine.name}</h2>
                <span className="font-mono text-xs px-2 py-0.5 bg-[#F1F5F9] border border-[#E2E8F0] rounded text-[#68716B] font-bold">
                  {machine.id}
                </span>
                <StatusBadge status={machine.status} />
              </div>
              <p className="text-xs text-[#68716B] mt-1">
                Model: <span className="font-medium text-[#252A25]">{machine.model}</span> | Assigned Bench: <span className="font-semibold text-[#245B3C]">{machine.zoneName}</span>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-[#68716B] hover:text-[#252A25] hover:bg-[#F1F5F9] rounded-lg transition-colors"
            title="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Synthetic Demonstration Data Banner */}
        <div className="my-3 px-3.5 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E9B949]/50 flex items-center justify-between text-xs text-[#252A25]">
          <span className="font-medium flex items-center gap-1.5 text-[#B45309]">
            <Info className="w-3.5 h-3.5 text-[#D97706]" />
            Demonstration Telematics — Synthetic Sensor Pipeline
          </span>
          <span className="text-[11px] font-mono text-[#68716B]">
            Refreshed via In-Pit Telemetry Buffer
          </span>
        </div>

        {/* Top KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          <div className="bg-[#F8F8F4] p-3.5 rounded-xl border border-[#E2E8F0]">
            <span className="text-[11px] text-[#68716B] uppercase font-semibold tracking-wider block">Health Score</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={`text-2xl font-bold font-mono ${
                machine.healthScore < 60 ? 'text-[#DC2626]' : machine.healthScore < 80 ? 'text-[#B45309]' : 'text-[#15803D]'
              }`}>
                {machine.healthScore}
              </span>
              <span className="text-xs text-[#68716B]">/ 100</span>
            </div>
            <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  machine.healthScore < 60 ? 'bg-[#DC2626]' : machine.healthScore < 80 ? 'bg-[#D97706]' : 'bg-[#15803D]'
                }`}
                style={{ width: `${machine.healthScore}%` }}
              />
            </div>
          </div>

          <div className="bg-[#F8F8F4] p-3.5 rounded-xl border border-[#E2E8F0]">
            <span className="text-[11px] text-[#68716B] uppercase font-semibold tracking-wider block">Failure Risk Level</span>
            <div className="mt-1 flex items-center justify-between">
              <RiskBadge level={machine.failureRiskLevel} score={machine.failureRiskScore} />
            </div>
            <span className="text-[10px] text-[#68716B] mt-2 block font-mono">
              Score: {machine.failureRiskScore}/100 (Heuristic)
            </span>
          </div>

          <div className="bg-[#F8F8F4] p-3.5 rounded-xl border border-[#E2E8F0]">
            <span className="text-[11px] text-[#68716B] uppercase font-semibold tracking-wider block">Operating Hours</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-[#252A25]">
                {machine.operatingHours.toLocaleString()}
              </span>
              <span className="text-xs text-[#68716B]">hrs</span>
            </div>
            <span className="text-[10px] text-[#68716B] mt-2 block">
              {machine.hoursSinceMaintenance} hrs since last service
            </span>
          </div>

          <div className="bg-[#F8F8F4] p-3.5 rounded-xl border border-[#E2E8F0]">
            <span className="text-[11px] text-[#68716B] uppercase font-semibold tracking-wider block">Utilization Factor</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-[#245B3C]">
                {machine.utilization}%
              </span>
            </div>
            <span className="text-[10px] text-[#68716B] mt-2 block">
              Remaining Life: {machine.rulHours} hrs
            </span>
          </div>
        </div>

        {/* Live Telemetry Sensors Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          <div className="p-3 bg-white rounded-lg border border-[#E2E8F0] flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] text-[#68716B] uppercase block">Engine Temp</span>
              <span className={`text-lg font-bold font-mono ${
                machine.engineTemp > 100 ? 'text-[#DC2626]' : machine.engineTemp > 90 ? 'text-[#B45309]' : 'text-[#252A25]'
              }`}>
                {machine.engineTemp}°C
              </span>
            </div>
            <Activity className="w-5 h-5 text-[#94A3B8]" />
          </div>

          <div className="p-3 bg-white rounded-lg border border-[#E2E8F0] flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] text-[#68716B] uppercase block">Vibration RMS</span>
              <span className={`text-lg font-bold font-mono ${
                machine.vibration > 6.0 ? 'text-[#DC2626]' : machine.vibration > 4.5 ? 'text-[#B45309]' : 'text-[#252A25]'
              }`}>
                {machine.vibration} mm/s
              </span>
            </div>
            <Gauge className="w-5 h-5 text-[#94A3B8]" />
          </div>

          <div className="p-3 bg-white rounded-lg border border-[#E2E8F0] flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] text-[#68716B] uppercase block">
                {machine.isElectric ? 'Power Draw' : 'Fuel Burn Rate'}
              </span>
              <span className="text-lg font-bold font-mono text-[#252A25]">
                {machine.fuelRate} {machine.isElectric ? 'kW' : 'L/h'}
              </span>
            </div>
            {machine.isElectric ? <Zap className="w-5 h-5 text-[#0284C7]" /> : <Fuel className="w-5 h-5 text-[#D97706]" />}
          </div>

          <div className="p-3 bg-white rounded-lg border border-[#E2E8F0] flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] text-[#68716B] uppercase block">Payload / Speed</span>
              <span className="text-lg font-bold font-mono text-[#252A25]">
                {machine.payloadTonnes}t / {machine.speedKmh} km/h
              </span>
            </div>
            <Clock className="w-5 h-5 text-[#94A3B8]" />
          </div>
        </div>

        {/* Sensor Trend Chart with Time Filters */}
        <div className="bg-[#F8F8F4] p-4 rounded-xl border border-[#E2E8F0] mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 border-b border-[#E2E8F0] pb-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#252A25] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#245B3C]" />
              Sensor Telemetry Trends (Temperature &amp; Structural Vibration)
            </h4>

            {/* Time Filter Controls: 1h, 24h, 7d */}
            <div className="flex items-center gap-1 bg-[#F1F5F9] p-0.5 rounded-lg border border-[#CBD5E1] text-xs">
              <button
                onClick={() => setTimeFilter('1h')}
                className={`px-2.5 py-1 rounded font-semibold ${
                  timeFilter === '1h'
                    ? 'bg-[#245B3C] text-white'
                    : 'text-[#68716B] hover:text-[#252A25]'
                }`}
              >
                1 Hour (Live)
              </button>
              <button
                onClick={() => setTimeFilter('24h')}
                className={`px-2.5 py-1 rounded font-semibold ${
                  timeFilter === '24h'
                    ? 'bg-[#245B3C] text-white'
                    : 'text-[#68716B] hover:text-[#252A25]'
                }`}
              >
                24 Hours
              </button>
              <button
                onClick={() => setTimeFilter('7d')}
                className={`px-2.5 py-1 rounded font-semibold ${
                  timeFilter === '7d'
                    ? 'bg-[#245B3C] text-white'
                    : 'text-[#68716B] hover:text-[#252A25]'
                }`}
              >
                7 Days
              </button>
            </div>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="time" stroke="#68716B" fontSize={10} />
                <YAxis yAxisId="temp" stroke="#D97706" domain={['auto', 'auto']} fontSize={10} unit="°C" />
                <YAxis yAxisId="vib" orientation="right" stroke="#0284C7" domain={['auto', 'auto']} fontSize={10} unit="mm/s" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '8px', fontSize: '11px', color: '#252A25' }}
                />
                <Line yAxisId="temp" type="monotone" dataKey="temp" name="Engine Temp (°C)" stroke="#D97706" strokeWidth={2} dot={false} />
                <Line yAxisId="vib" type="monotone" dataKey="vibration" name="Vibration (mm/s)" stroke="#0284C7" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Maintenance Timeline & Service Interval */}
        <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E2E8F0] mb-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#252A25] mb-3 flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
            <Calendar className="w-4 h-4 text-[#245B3C]" />
            Maintenance Lifecycle &amp; Service History
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-lg border border-[#E2E8F0]">
              <span className="text-[10px] font-mono uppercase text-[#68716B]">Last Scheduled Service</span>
              <div className="font-semibold text-[#252A25] mt-0.5">{machine.lastMaintenanceDate}</div>
              <div className="text-[11px] text-[#68716B] mt-0.5">{machine.hoursSinceMaintenance} operating hrs elapsed</div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-[#E2E8F0]">
              <span className="text-[10px] font-mono uppercase text-[#68716B]">PM Service Interval</span>
              <div className="font-semibold text-[#252A25] mt-0.5">250 Operating Hours</div>
              <div className="text-[11px] text-emerald-700 mt-0.5">
                {Math.max(0, 250 - machine.hoursSinceMaintenance)} hrs remaining
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-[#E2E8F0]">
              <span className="text-[10px] font-mono uppercase text-[#68716B]">Next Scheduled Work Order</span>
              <div className="font-semibold text-[#245B3C] mt-0.5">Hydraulic Lube &amp; Filter Flush</div>
              <div className="text-[11px] text-[#68716B] mt-0.5">Bay 4 • Mechanical Division</div>
            </div>
          </div>
        </div>

        {/* Explainable Contributing Signals Decomposition */}
        <div className="bg-[#F8F8F4] p-4 rounded-xl border border-[#E2E8F0] mb-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#252A25] mb-3 flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
            <ShieldAlert className="w-4 h-4 text-[#245B3C]" />
            Explainable AI Diagnostic Factors (Signal Weights &amp; Tolerances)
          </h4>
          <div className="space-y-2">
            {machine.contributingSignals.map((sig, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-[#E2E8F0] text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#68716B] w-8">
                    {sig.weightPercent}%
                  </span>
                  <div>
                    <span className="font-medium text-[#252A25]">{sig.factor}</span>
                    <span className="text-[11px] text-[#68716B] block">Normal range: {sig.normalRange}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-semibold text-[#252A25]">{sig.value}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    sig.severity === 'critical' ? 'bg-[#FEE2E2] text-[#DC2626]' :
                    sig.severity === 'moderate' ? 'bg-[#FEF3C7] text-[#D97706]' :
                    'bg-[#DEF7EC] text-[#047857]'
                  }`}>
                    {sig.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Action & Dispatch Footer */}
        <div className="p-4 bg-[#E8F0EC] border border-[#65866B]/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#245B3C] text-white rounded-lg mt-0.5 shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#245B3C]">Prescribed Engineering Action</h5>
              <p className="text-xs text-[#252A25] font-medium mt-0.5 max-w-xl">
                {machine.recommendedAction}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDispatch}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                dispatched
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#245B3C] hover:bg-[#183E28] text-white'
              }`}
            >
              {dispatched ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Work Order Dispatched</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Dispatch Technician</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#252A25] text-xs font-medium rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
