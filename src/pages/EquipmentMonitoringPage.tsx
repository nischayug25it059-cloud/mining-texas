import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  PowerOff, 
  Wrench, 
  Eye, 
  ArrowUpDown, 
  Download, 
  RefreshCw,
  Cpu,
  Truck,
  Layers
} from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { StatusBadge, RiskBadge } from '../components/common/StatusBadge';
import { Equipment, EquipmentType, EquipmentStatus } from '../types/mining';
import { exportEquipmentToCsv } from '../utils/exportCsv';

export const EquipmentMonitoringPage: React.FC = () => {
  const { 
    equipment, 
    setSelectedMachine, 
    telemetryActive, 
    toggleTelemetry, 
    simulationSpeed, 
    setSimulationSpeed,
    lastTelemetryTick 
  } = useMining();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Equipment>('failureRiskScore');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // 1. Dynamic summary indicators calculated from current equipment dataset
  const healthyCount = useMemo(() => {
    return equipment.filter(
      (e) => (e.healthScore >= 80 || e.failureRiskLevel === 'low') && e.status === 'operational'
    ).length;
  }, [equipment]);

  const attentionCount = useMemo(() => {
    return equipment.filter(
      (e) => e.status === 'warning' || (e.healthScore >= 60 && e.healthScore < 80) || e.failureRiskLevel === 'medium'
    ).length;
  }, [equipment]);

  const highRiskCount = useMemo(() => {
    return equipment.filter(
      (e) => e.failureRiskLevel === 'high' || e.healthScore < 60 || e.status === 'critical'
    ).length;
  }, [equipment]);

  const offlineCount = useMemo(() => {
    return equipment.filter(
      (e) => e.status === 'maintenance' || e.status === 'idle'
    ).length;
  }, [equipment]);

  // 2. Filter & Sort logic
  const filteredFleet = useMemo(() => {
    return equipment.filter((m) => {
      const matchesSearch =
        m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.zoneName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
      const matchesType = typeFilter === 'all' || m.type === typeFilter;
      const matchesRisk = riskFilter === 'all' || m.failureRiskLevel === riskFilter;

      return matchesSearch && matchesStatus && matchesType && matchesRisk;
    }).sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortAsc ? aVal - bVal : bVal - aVal;
      }
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return 0;
    });
  }, [equipment, searchQuery, statusFilter, typeFilter, riskFilter, sortField, sortAsc]);

  const handleSort = (field: keyof Equipment) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const getMachineIcon = (type: EquipmentType) => {
    switch (type) {
      case 'excavator':
        return '🚜';
      case 'haul_truck':
        return '🚛';
      case 'drill_rig':
        return '⚙️';
      case 'conveyor':
        return '🔁';
      case 'wheel_loader':
        return '🏗️';
      default:
        return '🔧';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Status Strip */}
      <div className="gov-card p-6 border-l-4 border-l-[#245B3C]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-[#E8F0EC] text-[#245B3C] border border-[#65866B]/30">
                Asset Condition Monitoring
              </span>
              <span className="text-xs text-[#68716B]">Continuous Telemetry &amp; Health Registry</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#252A25] flex items-center gap-2">
              <Activity className="w-6 h-6 text-[#245B3C]" />
              Equipment Health Monitoring Center
            </h1>
            <p className="text-sm text-[#68716B] mt-1 max-w-3xl leading-relaxed">
              Real-time telemetry monitoring for {equipment.length} heavy mining machines. Continuous health indices, vibration envelopes (ISO 10816), thermal drift tracking, and maintenance priorities.
            </p>
          </div>

          {/* Telemetry Jitter Controls */}
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto bg-[#F8F8F4] p-1.5 rounded-lg border border-[#E2E8F0]">
            <button
              onClick={toggleTelemetry}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                telemetryActive
                  ? 'bg-[#245B3C] text-white shadow-sm'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${telemetryActive ? 'animate-spin' : ''}`} />
              <span>{telemetryActive ? 'Telemetry Active' : 'Telemetry Paused'}</span>
            </button>

            <div className="flex items-center text-xs font-mono border-l border-[#CBD5E1] pl-2 gap-1">
              {([1, 2, 5] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => setSimulationSpeed(spd)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    simulationSpeed === spd
                      ? 'bg-[#E9B949] text-[#252A25]'
                      : 'text-[#68716B] hover:text-[#252A25]'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Dynamically Calculated Summary Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#E2E8F0]">
          {/* 1. Healthy */}
          <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase font-bold text-emerald-800">
                Healthy Machines
              </div>
              <div className="text-2xl font-bold text-emerald-950 mt-0.5">
                {healthyCount} <span className="text-xs font-normal text-emerald-800">/ {equipment.length}</span>
              </div>
              <div className="text-[11px] text-emerald-700 mt-0.5">
                Health Score ≥ 80 • Low Risk
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            </div>
          </div>

          {/* 2. Requiring Attention */}
          <div className="p-3.5 rounded-lg bg-amber-50/60 border border-amber-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase font-bold text-amber-800">
                Requires Attention
              </div>
              <div className="text-2xl font-bold text-amber-950 mt-0.5">
                {attentionCount} <span className="text-xs font-normal text-amber-800">units</span>
              </div>
              <div className="text-[11px] text-amber-700 mt-0.5">
                Warning status or Health 60–79
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
          </div>

          {/* 3. High Risk */}
          <div className="p-3.5 rounded-lg bg-rose-50/60 border border-rose-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase font-bold text-rose-800">
                High-Risk Assets
              </div>
              <div className="text-2xl font-bold text-rose-950 mt-0.5">
                {highRiskCount} <span className="text-xs font-normal text-rose-800">critical</span>
              </div>
              <div className="text-[11px] text-rose-700 mt-0.5">
                Risk Score ≥ 65 or Health &lt; 60
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5 text-rose-700" />
            </div>
          </div>

          {/* 4. Offline / Maintenance */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase font-bold text-slate-700">
                Offline / Maintenance
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-0.5">
                {offlineCount} <span className="text-xs font-normal text-slate-600">standby</span>
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5">
                Scheduled bay maintenance or idle
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
              <PowerOff className="w-5 h-5 text-slate-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="gov-card p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[260px] max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID (e.g. EX-101), machine name, model, or pit zone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#E2E8F0] bg-[#F8F8F4] focus:outline-none focus:ring-2 focus:ring-[#245B3C]/30 focus:border-[#245B3C]"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#252A25] font-medium"
          >
            <option value="all">All Statuses</option>
            <option value="operational">Operational</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
            <option value="idle">Idle</option>
            <option value="maintenance">Maintenance</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#252A25] font-medium"
          >
            <option value="all">All Equipment Types</option>
            <option value="excavator">Hydraulic Excavators</option>
            <option value="haul_truck">Mining Haul Trucks</option>
            <option value="drill_rig">Drill Rigs</option>
            <option value="conveyor">Conveyor Systems</option>
            <option value="wheel_loader">Wheel Loaders</option>
          </select>

          {/* Risk Level Filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#252A25] font-medium"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>

          {/* Export to CSV */}
          <button
            onClick={() => exportEquipmentToCsv(filteredFleet)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F8F8F4] text-xs font-semibold text-[#245B3C] transition-colors shadow-sm"
            title="Export filtered fleet telemetry to CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Equipment Table */}
      <div className="gov-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#252A25] border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#E2E8F0] text-[#68716B] font-mono uppercase text-[10px] tracking-wider">
                <th
                  onClick={() => handleSort('id')}
                  className="py-3 px-3 cursor-pointer hover:text-[#252A25]"
                >
                  <div className="flex items-center gap-1">
                    <span>Machine ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3">Type &amp; Model</th>
                <th className="py-3 px-3">Status</th>
                <th
                  onClick={() => handleSort('engineTemp')}
                  className="py-3 px-3 cursor-pointer hover:text-[#252A25]"
                >
                  <div className="flex items-center gap-1">
                    <span>Engine Temp</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('vibration')}
                  className="py-3 px-3 cursor-pointer hover:text-[#252A25]"
                >
                  <div className="flex items-center gap-1">
                    <span>Vibration (RMS)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('operatingHours')}
                  className="py-3 px-3 cursor-pointer hover:text-[#252A25]"
                >
                  <div className="flex items-center gap-1">
                    <span>Total Hours</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('healthScore')}
                  className="py-3 px-3 cursor-pointer hover:text-[#252A25]"
                >
                  <div className="flex items-center gap-1">
                    <span>Health Score</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('failureRiskScore')}
                  className="py-3 px-3 cursor-pointer hover:text-[#252A25]"
                >
                  <div className="flex items-center gap-1">
                    <span>Risk Level</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3">Recommended Action</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredFleet.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-500">
                    No equipment found matching current filter parameters.
                  </td>
                </tr>
              ) : (
                filteredFleet.map((m) => {
                  const isHighRisk = m.failureRiskLevel === 'high' || m.healthScore < 60;
                  return (
                    <tr
                      key={m.id}
                      onClick={() => setSelectedMachine(m)}
                      className={`hover:bg-[#F8F8F4] transition-colors cursor-pointer ${
                        isHighRisk ? 'bg-rose-50/20' : ''
                      }`}
                    >
                      {/* ID */}
                      <td className="py-3 px-3 font-mono font-bold text-[#245B3C]">
                        {m.id}
                      </td>

                      {/* Type & Model */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{getMachineIcon(m.type)}</span>
                          <div>
                            <div className="font-semibold text-[#252A25]">{m.name}</div>
                            <div className="text-[11px] text-[#68716B] truncate max-w-[160px]">
                              {m.model}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        <StatusBadge status={m.status} />
                      </td>

                      {/* Engine Temp */}
                      <td className="py-3 px-3 font-mono">
                        <span
                          className={`font-semibold ${
                            m.engineTemp > 96
                              ? 'text-rose-600'
                              : m.engineTemp > 88
                              ? 'text-amber-600'
                              : 'text-slate-700'
                          }`}
                        >
                          {m.engineTemp.toFixed(1)}°C
                        </span>
                      </td>

                      {/* Vibration */}
                      <td className="py-3 px-3 font-mono">
                        <span
                          className={`font-semibold ${
                            m.vibration > 5.5
                              ? 'text-rose-600'
                              : m.vibration > 4.0
                              ? 'text-amber-600'
                              : 'text-slate-700'
                          }`}
                        >
                          {m.vibration.toFixed(2)} mm/s
                        </span>
                      </td>

                      {/* Hours */}
                      <td className="py-3 px-3 font-mono text-[#4A5568]">
                        <div>{m.operatingHours.toLocaleString()} hrs</div>
                        <div className="text-[10px] text-slate-400">
                          {m.hoursSinceMaintenance} hrs since svc
                        </div>
                      </td>

                      {/* Health Score */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full ${
                                m.healthScore >= 80
                                  ? 'bg-emerald-600'
                                  : m.healthScore >= 60
                                  ? 'bg-amber-500'
                                  : 'bg-rose-600'
                              }`}
                              style={{ width: `${m.healthScore}%` }}
                            />
                          </div>
                          <span className="font-mono font-bold text-xs">
                            {m.healthScore}
                          </span>
                        </div>
                      </td>

                      {/* Risk Level */}
                      <td className="py-3 px-3">
                        <RiskBadge level={m.failureRiskLevel} score={m.failureRiskScore} />
                      </td>

                      {/* Recommended Action */}
                      <td className="py-3 px-3 max-w-xs">
                        <p className="text-[11px] text-[#4A5568] line-clamp-2">
                          {m.recommendedAction}
                        </p>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMachine(m);
                          }}
                          className="px-2.5 py-1 rounded bg-[#E8F0EC] hover:bg-[#245B3C] text-[#245B3C] hover:text-white text-xs font-semibold transition-colors flex items-center gap-1 ml-auto"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Info Strip */}
        <div className="p-3 bg-[#FAF8F5] border-t border-[#E2E8F0] flex flex-wrap items-center justify-between text-xs text-[#68716B] gap-2">
          <div>
            Showing <strong className="text-[#252A25]">{filteredFleet.length}</strong> of{' '}
            <strong className="text-[#252A25]">{equipment.length}</strong> fleet machines
          </div>
          <div className="font-mono text-[11px]">
            Demonstration Telemetry Pipeline • ISO 10816 Condition Envelopes
          </div>
        </div>
      </div>
    </div>
  );
};
