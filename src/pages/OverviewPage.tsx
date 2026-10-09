import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  Cpu, 
  TrendingUp, 
  Zap, 
  AlertTriangle, 
  Truck, 
  CheckCircle2, 
  Search, 
  ExternalLink, 
  Layers, 
  MapPin, 
  Fuel, 
  Compass, 
  Wrench, 
  Clock, 
  Eye, 
  Check, 
  ShieldCheck,
  Calendar,
  Filter
} from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { StatusBadge, RiskBadge } from '../components/common/StatusBadge';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { generateMaintenanceInsights } from '../utils/predictionEngine';
import { JHARKHAND_MINING_BASINS } from '../data/jharkhandGeoJson';

export const OverviewPage: React.FC = () => {
  const { 
    equipment, 
    productionHourly, 
    alerts, 
    setSelectedMachine,
    setActiveView,
    selectedRegionFilter,
    setSelectedRegionFilter,
    selectedEquipmentTypeFilter,
    setSelectedEquipmentTypeFilter,
    selectedStatusFilter,
    setSelectedStatusFilter,
    reportingPeriodFilter,
    setReportingPeriodFilter 
  } = useMining();

  const [searchQuery, setSearchQuery] = useState('');
  const [acknowledgedInsights, setAcknowledgedInsights] = useState<Record<string, boolean>>({});

  // Dynamic AI Maintenance Insights
  const dynamicInsights = useMemo(() => {
    return generateMaintenanceInsights(equipment).slice(0, 4);
  }, [equipment]);

  const handleAcknowledge = (id: string) => {
    setAcknowledgedInsights((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter production data based on reportingPeriodFilter
  const productionChartData = useMemo(() => {
    if (reportingPeriodFilter === 'shift1') {
      return productionHourly.slice(6, 14); // 06:00 to 14:00
    }
    if (reportingPeriodFilter === 'shift2') {
      return productionHourly.slice(14, 22); // 14:00 to 22:00
    }
    if (reportingPeriodFilter === '7d') {
      return [
        { hour: 'Mon', targetTonnes: 12500, actualTonnes: 12100, energyKwh: 4750, fuelLitres: 8400 },
        { hour: 'Tue', targetTonnes: 12500, actualTonnes: 12480, energyKwh: 4820, fuelLitres: 8650 },
        { hour: 'Wed', targetTonnes: 12500, actualTonnes: 12350, energyKwh: 4790, fuelLitres: 8500 },
        { hour: 'Thu', targetTonnes: 12500, actualTonnes: 12720, energyKwh: 4890, fuelLitres: 8800 },
        { hour: 'Fri', targetTonnes: 12500, actualTonnes: 12600, energyKwh: 4840, fuelLitres: 8710 },
        { hour: 'Sat', targetTonnes: 12500, actualTonnes: 12900, energyKwh: 4950, fuelLitres: 8920 },
        { hour: 'Sun', targetTonnes: 12500, actualTonnes: 12480, energyKwh: 4820, fuelLitres: 8620 },
      ];
    }
    return productionHourly;
  }, [productionHourly, reportingPeriodFilter]);

  // Dynamic fleet filtering based on global filters
  const filteredEquipment = useMemo(() => {
    return equipment.filter((eq) => {
      const matchesSearch =
        eq.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        eq.zoneName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        selectedEquipmentTypeFilter === 'all' || eq.type === selectedEquipmentTypeFilter;

      const matchesStatus =
        selectedStatusFilter === 'all' || eq.status === selectedStatusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [equipment, searchQuery, selectedEquipmentTypeFilter, selectedStatusFilter]);

  // Aggregate Metrics
  const totalActualProduction = useMemo(() => {
    return productionChartData.reduce((acc, r) => acc + r.actualTonnes, 0);
  }, [productionChartData]);

  const totalTargetProduction = useMemo(() => {
    return productionChartData.reduce((acc, r) => acc + r.targetTonnes, 0);
  }, [productionChartData]);

  const avgFleetHealth = useMemo(() => {
    if (equipment.length === 0) return 0;
    return Math.round(equipment.reduce((acc, e) => acc + e.healthScore, 0) / equipment.length);
  }, [equipment]);

  const operationalCount = equipment.filter((e) => e.status === 'operational').length;
  const highRiskCount = equipment.filter((e) => e.failureRiskLevel === 'high' || e.healthScore < 60).length;

  return (
    <div className="space-y-6">
      {/* Title & Statutory Header Strip */}
      <div className="gov-card p-6 border-l-4 border-l-[#245B3C]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-[#E8F0EC] text-[#245B3C] border border-[#65866B]/30">
                Integrated Operational Intelligence
              </span>
              <span className="text-xs text-[#68716B]">Central Control Room Telemetry</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#252A25] flex items-center gap-2">
              <Activity className="w-6 h-6 text-[#245B3C]" />
              Mining Operations &amp; Intelligence Overview
            </h1>
            <p className="text-sm text-[#68716B] mt-1 max-w-3xl leading-relaxed">
              Consolidated supervisory overview monitoring coal extraction throughput, heavy fleet reliability, energy consumption, and high-priority maintenance advisories across Jharkhand.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveView('coalfields')}
              className="px-3.5 py-2 rounded-lg bg-[#245B3C] text-white hover:bg-[#183E28] text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
            >
              <Compass className="w-4 h-4 text-[#E9B949]" />
              <span>Launch Satellite GIS Map</span>
            </button>
          </div>
        </div>

        {/* Global Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5 pt-4 border-t border-[#E2E8F0]">
          {/* 1. Mining Region Filter */}
          <div>
            <label className="text-[10px] font-mono uppercase text-[#68716B] font-semibold block mb-1">
              Mining Region
            </label>
            <select
              value={selectedRegionFilter}
              onChange={(e) => setSelectedRegionFilter(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#252A25] font-medium"
            >
              <option value="all">All Jharkhand Basins</option>
              {JHARKHAND_MINING_BASINS.map((b) => (
                <option key={b.properties.id} value={b.properties.id}>
                  {b.properties.name} ({b.properties.district})
                </option>
              ))}
            </select>
          </div>

          {/* 2. Equipment Type Filter */}
          <div>
            <label className="text-[10px] font-mono uppercase text-[#68716B] font-semibold block mb-1">
              Fleet Category
            </label>
            <select
              value={selectedEquipmentTypeFilter}
              onChange={(e) => setSelectedEquipmentTypeFilter(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#252A25] font-medium"
            >
              <option value="all">All Machine Types</option>
              <option value="excavator">Hydraulic Excavators</option>
              <option value="haul_truck">Mining Haul Trucks</option>
              <option value="drill_rig">Blast Hole Drills</option>
              <option value="conveyor">Conveyors</option>
              <option value="wheel_loader">Wheel Loaders</option>
            </select>
          </div>

          {/* 3. Machine Status Filter */}
          <div>
            <label className="text-[10px] font-mono uppercase text-[#68716B] font-semibold block mb-1">
              Operational Status
            </label>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#252A25] font-medium"
            >
              <option value="all">All Statuses</option>
              <option value="operational">Operational</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          {/* 4. Reporting Period Filter */}
          <div>
            <label className="text-[10px] font-mono uppercase text-[#68716B] font-semibold block mb-1">
              Reporting Window
            </label>
            <select
              value={reportingPeriodFilter}
              onChange={(e) => setReportingPeriodFilter(e.target.value as any)}
              className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#252A25] font-medium"
            >
              <option value="shift1">Shift 1 (06:00 – 14:00)</option>
              <option value="shift2">Shift 2 (14:00 – 22:00)</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
            </select>
          </div>
        </div>

        {/* Provenance Label */}
        <div className="mt-4 px-3 py-1.5 rounded-md bg-[#FAF8F5] border border-[#E2E8F0] text-[11px] text-[#68716B] flex items-center justify-between flex-wrap gap-2">
          <span>
            <strong className="text-[#252A25]">Illustrative Telemetry:</strong> Machine telemetry reflects synthetic simulation parameters anchored on Damodar Valley mining operations.
          </span>
          <span className="font-mono text-[#245B3C] font-semibold">
            {filteredEquipment.length} Assets in Filter
          </span>
        </div>
      </div>

      {/* 4 Compact Operational KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Tonnes Produced */}
        <div className="gov-card p-4">
          <span className="text-[10px] font-mono uppercase font-bold text-[#68716B] block">
            Extracted Tonnes
          </span>
          <div className="text-2xl font-bold font-mono text-[#252A25] mt-1">
            {totalActualProduction.toLocaleString()}{' '}
            <span className="text-xs font-normal text-[#68716B]">t</span>
          </div>
          <div className="text-[11px] text-[#245B3C] font-semibold mt-1">
            Target: {totalTargetProduction.toLocaleString()} t ({Math.round((totalActualProduction / Math.max(1, totalTargetProduction)) * 100)}%)
          </div>
        </div>

        {/* Fleet Mean Health */}
        <div className="gov-card p-4">
          <span className="text-[10px] font-mono uppercase font-bold text-[#68716B] block">
            Mean Health Score
          </span>
          <div className="text-2xl font-bold font-mono text-[#245B3C] mt-1">
            {avgFleetHealth} <span className="text-xs font-normal text-[#68716B]">/ 100</span>
          </div>
          <div className="text-[11px] text-rose-700 font-semibold mt-1">
            {highRiskCount} asset{highRiskCount === 1 ? '' : 's'} at high failure risk
          </div>
        </div>

        {/* Fleet Availability */}
        <div className="gov-card p-4">
          <span className="text-[10px] font-mono uppercase font-bold text-[#68716B] block">
            Operational Availability
          </span>
          <div className="text-2xl font-bold font-mono text-[#252A25] mt-1">
            {operationalCount} <span className="text-xs font-normal text-[#68716B]">/ {equipment.length} Units</span>
          </div>
          <div className="text-[11px] text-[#68716B] mt-1">
            {Math.round((operationalCount / equipment.length) * 100)}% Fleet In-Pit Uptime
          </div>
        </div>

        {/* Energy Intensity */}
        <div className="gov-card p-4">
          <span className="text-[10px] font-mono uppercase font-bold text-[#68716B] block">
            Specific Fuel Rate
          </span>
          <div className="text-2xl font-bold font-mono text-[#252A25] mt-1">
            0.68 <span className="text-xs font-normal text-[#68716B]">L / tonne</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            -4.2% vs DGMS Baseline
          </div>
        </div>
      </div>

      {/* Production Chart & Satellite Preview Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production & Energy Charts (2 cols) */}
        <div className="lg:col-span-2 gov-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#252A25] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#245B3C]" />
                Production Run (Actual vs Target Tonnes)
              </h2>
              <span className="text-xs text-[#68716B]">
                Active shift output tracked against metallurgical off-take targets
              </span>
            </div>
            <span className="text-xs font-mono text-[#245B3C] font-semibold bg-[#E8F0EC] px-2 py-0.5 rounded">
              Period: {reportingPeriodFilter}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionChartData}>
                <defs>
                  <linearGradient id="actualGrade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#245B3C" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#245B3C" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="hour" stroke="#68716B" fontSize={11} />
                <YAxis stroke="#68716B" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '8px', fontSize: '11px', color: '#252A25' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area type="monotone" dataKey="actualTonnes" name="Actual Tonnes" stroke="#245B3C" strokeWidth={2} fillOpacity={1} fill="url(#actualGrade)" />
                <Line type="monotone" dataKey="targetTonnes" name="Target Tonnes" stroke="#E9B949" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Coalfield Satellite Preview Card (1 col) */}
        <div className="gov-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-[#E2E8F0] pb-2">
              <h2 className="text-base font-bold text-[#252A25] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#245B3C]" />
                Jharkhand Coalfield Map
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E9B949] text-[#245B3C] font-bold">
                Esri Satellite
              </span>
            </div>

            <p className="text-xs text-[#68716B] leading-relaxed mb-4">
              Explore 9 authentic surveyed Gondwana coal basins and mineral formations across Jharkhand on high-resolution satellite imagery.
            </p>

            {/* Schematic Mini Map Box */}
            <div 
              onClick={() => setActiveView('coalfields')}
              className="relative h-44 rounded-lg overflow-hidden border border-[#E2E8F0] bg-[#E8F0EC] cursor-pointer group shadow-inner"
            >
              <div className="absolute inset-0 bg-[radial-gradient(#245B3C_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <Compass className="w-10 h-10 text-[#245B3C] mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-[#252A25]">
                  Launch Interactive Explorer
                </div>
                <div className="text-[11px] text-[#245B3C] font-semibold mt-0.5">
                  Jharia • Bokaro • Karanpura • Noamundi
                </div>
              </div>

              <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-white/90 text-[10px] font-semibold text-[#245B3C] shadow-sm flex items-center gap-1">
                <span>View 3D GIS</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView('coalfields')}
            className="w-full mt-4 py-2.5 rounded-lg text-xs font-semibold bg-[#245B3C] text-white hover:bg-[#183E28] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>Open Dedicated Satellite Map</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* AI Maintenance Insights & Priority Assets Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Maintenance Insights Panel */}
        <div className="gov-card p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
            <div>
              <h2 className="text-base font-bold text-[#252A25] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                AI Maintenance Insights
              </h2>
              <span className="text-xs text-[#68716B]">
                Actionable engineering alerts generated dynamically from telemetry
              </span>
            </div>
            <button
              onClick={() => setActiveView('predictions')}
              className="text-xs font-semibold text-[#245B3C] hover:underline"
            >
              View All Predictions &rarr;
            </button>
          </div>

          <div className="space-y-2.5">
            {dynamicInsights.map((ins) => {
              const isAck = acknowledgedInsights[ins.id];
              return (
                <div
                  key={ins.id}
                  className={`p-3 rounded-lg border border-[#E2E8F0] bg-white transition-opacity ${
                    isAck ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded ${
                          ins.severity === 'critical'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ins.severity}
                      </span>
                      <span className="font-mono font-bold text-xs text-[#245B3C]">
                        {ins.equipmentId}
                      </span>
                      <span className="text-xs text-[#252A25] font-semibold truncate max-w-[180px]">
                        {ins.equipmentName}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {ins.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-[#4A5568] mb-2">{ins.reason}</p>

                  <div className="flex items-center justify-between pt-1 border-t border-[#E2E8F0] text-xs">
                    <button
                      onClick={() => {
                        const m = equipment.find((e) => e.id === ins.equipmentId);
                        if (m) setSelectedMachine(m);
                      }}
                      className="text-[#245B3C] font-semibold hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Inspect Machine</span>
                    </button>

                    <button
                      onClick={() => handleAcknowledge(ins.id)}
                      className="px-2 py-0.5 rounded text-[11px] font-medium border border-[#CBD5E1] hover:bg-[#F1F5F9] text-slate-700 flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>{isAck ? 'Acknowledged' : 'Acknowledge'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Maintenance Priorities & Equipment Summary */}
        <div className="gov-card p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
            <div>
              <h2 className="text-base font-bold text-[#252A25] flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#245B3C]" />
                Maintenance Priority Assets
              </h2>
              <span className="text-xs text-[#68716B]">
                Units ranked by failure risk score and hours since service
              </span>
            </div>
            <button
              onClick={() => setActiveView('equipment')}
              className="text-xs font-semibold text-[#245B3C] hover:underline"
            >
              Open Full Fleet &rarr;
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#E2E8F0] text-[#68716B] font-mono uppercase text-[10px]">
                  <th className="py-2.5 px-2">ID</th>
                  <th className="py-2.5 px-2">Machine</th>
                  <th className="py-2.5 px-2">Health</th>
                  <th className="py-2.5 px-2">Risk Level</th>
                  <th className="py-2.5 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filteredEquipment.slice(0, 5).map((m) => (
                  <tr
                    key={m.id}
                    onClick={() => setSelectedMachine(m)}
                    className="hover:bg-[#F8F8F4] cursor-pointer"
                  >
                    <td className="py-2.5 px-2 font-mono font-bold text-[#245B3C]">
                      {m.id}
                    </td>
                    <td className="py-2.5 px-2 font-medium text-[#252A25] truncate max-w-[130px]">
                      {m.name}
                    </td>
                    <td className="py-2.5 px-2 font-mono font-bold">
                      {m.healthScore}/100
                    </td>
                    <td className="py-2.5 px-2">
                      <RiskBadge level={m.failureRiskLevel} score={m.failureRiskScore} />
                    </td>
                    <td className="py-2.5 px-2 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMachine(m);
                        }}
                        className="text-[#245B3C] hover:underline font-semibold"
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
    </div>
  );
};
