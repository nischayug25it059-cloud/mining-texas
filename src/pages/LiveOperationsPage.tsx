import React, { useState } from 'react';
import { 
  Search, 
  Play, 
  Pause, 
  Truck, 
  Construction, 
  Drill, 
  Zap, 
  Droplets, 
  Fuel, 
  Activity, 
  Gauge, 
  Clock, 
  MapPin, 
  ExternalLink,
  Layers,
  ArrowUpDown,
  LayoutGrid,
  Table as TableIcon,
  ShieldAlert,
  Info
} from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { Equipment, EquipmentType, EquipmentStatus } from '../types/mining';
import { StatusBadge, RiskBadge } from '../components/common/StatusBadge';

export const LiveOperationsPage: React.FC = () => {
  const { 
    equipment, 
    setSelectedMachine, 
    telemetryActive, 
    toggleTelemetry, 
    simulationSpeed, 
    setSimulationSpeed, 
    lastTelemetryTick,
    zones
  } = useMining();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [sortField, setSortField] = useState<keyof Equipment>('id');
  const [sortAsc, setSortAsc] = useState(true);

  // Filter logic
  const filtered = equipment.filter(e => {
    const matchesSearch = 
      e.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.currentTask.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || e.type === selectedType;
    const matchesZone = selectedZone === 'all' || e.zoneId === selectedZone;
    const matchesStatus = selectedStatus === 'all' || e.status === selectedStatus;
    return matchesSearch && matchesType && matchesZone && matchesStatus;
  });

  // Sort logic
  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortAsc ? valA - valB : valB - valA;
    }
    return sortAsc 
      ? String(valA).localeCompare(String(valB)) 
      : String(valB).localeCompare(String(valA));
  });

  const toggleSort = (field: keyof Equipment) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const getTypeIcon = (type: EquipmentType) => {
    switch (type) {
      case 'haul_truck': return Truck;
      case 'excavator': return Construction;
      case 'drill_rig': return Drill;
      case 'conveyor': return Zap;
      case 'water_tanker': return Droplets;
      case 'wheel_loader': return Construction;
      case 'dozer': return Construction;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="gov-card p-6 border-l-4 border-l-[#245B3C]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-[#E8F0EC] text-[#245B3C] border border-[#65866B]/30">
                Heavy Equipment Telematics
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-[#E9B949]/30 text-[#854D0E] border border-[#E9B949]">
                DEMO DATA — SYNTHETIC SENSOR TELEMETRY
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#252A25] tracking-tight">
              Equipment Fleet Telematics & Live Operations
            </h1>
            <p className="text-sm text-[#68716B] mt-1 max-w-3xl">
              Live cyber-physical sensor telemetry for 20 heavy earthmoving units operating in Jharia Opencast Project No. 4 (Dhanbad). 
              Values update continuously to simulate real-time engine vibration, hydraulic pressure, thermal profiles, and remaining useful life (RUL).
            </p>
          </div>

          {/* Telemetry Stream Controls */}
          <div className="flex flex-wrap items-center gap-2 bg-[#F8F8F4] p-2.5 rounded-xl border border-[#E2E8F0]">
            <button
              onClick={toggleTelemetry}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                telemetryActive 
                  ? 'bg-[#245B3C] text-white hover:bg-[#1E4D33]' 
                  : 'bg-slate-200 text-[#252A25] hover:bg-slate-300'
              }`}
            >
              {telemetryActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{telemetryActive ? 'Pause Stream' : 'Resume Stream'}</span>
            </button>

            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-[#E2E8F0]">
              {[1, 2, 5].map(spd => (
                <button
                  key={spd}
                  onClick={() => setSimulationSpeed(spd as 1 | 2 | 5)}
                  className={`px-2 py-0.5 text-[11px] font-mono rounded font-medium transition-colors ${
                    simulationSpeed === spd 
                      ? 'bg-[#245B3C] text-white' 
                      : 'text-[#68716B] hover:text-[#252A25]'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            <div className="text-[10px] font-mono text-[#68716B] pl-1">
              Updated: {lastTelemetryTick.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Fleet KPI Quick Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-[#E2E8F0]">
          <div className="p-2.5 bg-[#F8F8F4] rounded-lg border border-[#E2E8F0]">
            <span className="text-[10px] text-[#68716B] block">Total Monitored Fleet</span>
            <span className="text-xl font-bold text-[#252A25]">{equipment.length} Units</span>
          </div>
          <div className="p-2.5 bg-[#F8F8F4] rounded-lg border border-[#E2E8F0]">
            <span className="text-[10px] text-[#68716B] block">Operational &amp; Healthy</span>
            <span className="text-xl font-bold text-[#15803D]">
              {equipment.filter(e => e.status === 'operational').length} Units
            </span>
          </div>
          <div className="p-2.5 bg-[#F8F8F4] rounded-lg border border-[#E2E8F0]">
            <span className="text-[10px] text-[#68716B] block">Warning / Elevated Risk</span>
            <span className="text-xl font-bold text-[#B45309]">
              {equipment.filter(e => e.status === 'warning').length} Units
            </span>
          </div>
          <div className="p-2.5 bg-[#F8F8F4] rounded-lg border border-[#E2E8F0]">
            <span className="text-[10px] text-[#68716B] block">Critical Condition</span>
            <span className="text-xl font-bold text-[#DC2626]">
              {equipment.filter(e => e.status === 'critical').length} Units
            </span>
          </div>
        </div>
      </div>

      {/* Filter and View Controls Bar */}
      <div className="gov-card p-4 border border-[#E2E8F0] space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID, name, or task..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#252A25] placeholder-[#94A3B8] focus:outline-none focus:border-[#245B3C] transition-colors"
            />
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#252A25] focus:outline-none focus:border-[#245B3C]"
            >
              <option value="all">All Equipment Types</option>
              <option value="haul_truck">Haul Trucks (HT)</option>
              <option value="excavator">Excavators &amp; Shovels (EX)</option>
              <option value="drill_rig">Blast Hole Drill Rigs (DR)</option>
              <option value="conveyor">Overland Conveyors (CV)</option>
              <option value="wheel_loader">Wheel Loaders (WL)</option>
              <option value="dozer">Dozers (DZ)</option>
              <option value="water_tanker">Water Tankers (WT)</option>
            </select>

            <select
              value={selectedZone}
              onChange={e => setSelectedZone(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#252A25] focus:outline-none focus:border-[#245B3C]"
            >
              <option value="all">All Mining Benches / Zones</option>
              {zones.map(z => (
                <option key={z.id} value={z.id}>{z.name}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#252A25] focus:outline-none focus:border-[#245B3C]"
            >
              <option value="all">All Health Statuses</option>
              <option value="operational">Operational</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
              <option value="idle">Idle</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-lg border border-[#E2E8F0] ml-auto">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1 rounded ${viewMode === 'cards' ? 'bg-white shadow-sm text-[#245B3C]' : 'text-[#68716B]'}`}
                title="Cards View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1 rounded ${viewMode === 'table' ? 'bg-white shadow-sm text-[#245B3C]' : 'text-[#68716B]'}`}
                title="Table View"
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-xs text-[#68716B] flex items-center justify-between pt-1">
          <span>Showing <strong>{sorted.length}</strong> of {equipment.length} equipment units</span>
          <span className="text-[11px] font-mono text-[#94A3B8]">
            Click any row or card for deep diagnostic telematics
          </span>
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map(machine => {
            const Icon = getTypeIcon(machine.type);
            return (
              <div
                key={machine.id}
                onClick={() => setSelectedMachine(machine)}
                className="gov-card p-5 border border-[#E2E8F0] hover:shadow-md hover:border-[#245B3C] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Card Top Row */}
                  <div className="flex items-start justify-between gap-2 border-b border-[#E2E8F0] pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#E8F0EC] text-[#245B3C] flex items-center justify-center shrink-0 border border-[#65866B]/20">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-sm text-[#252A25]">{machine.name}</h3>
                          <span className="text-[10px] font-mono bg-[#F1F5F9] text-[#68716B] px-1.5 py-0.2 rounded border border-[#E2E8F0]">
                            {machine.id}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#68716B] mt-0.5">{machine.model}</p>
                      </div>
                    </div>

                    <StatusBadge status={machine.status} />
                  </div>

                  {/* Task & Zone */}
                  <div className="mt-3 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[#68716B]">
                      <span>Location:</span>
                      <span className="font-medium text-[#252A25] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#245B3C]" />
                        {machine.zoneName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[#68716B]">
                      <span>Current Task:</span>
                      <span className="font-medium text-[#252A25] truncate max-w-[180px]">
                        {machine.currentTask}
                      </span>
                    </div>
                  </div>

                  {/* Health Score & RUL Bar */}
                  <div className="mt-4 p-3 bg-[#F8F8F4] rounded-lg border border-[#E2E8F0] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#68716B]">Health Index Score</span>
                      <span className={`font-bold font-mono ${
                        machine.healthScore < 60 ? 'text-[#DC2626]' : machine.healthScore < 80 ? 'text-[#B45309]' : 'text-[#15803D]'
                      }`}>
                        {machine.healthScore}%
                      </span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          machine.healthScore < 60 ? 'bg-[#DC2626]' : machine.healthScore < 80 ? 'bg-[#D97706]' : 'bg-[#15803D]'
                        }`}
                        style={{ width: `${machine.healthScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Sensor Telemetry Pill Grid */}
                  <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
                    <div className="p-2 bg-white rounded border border-[#E2E8F0]">
                      <span className="text-[10px] text-[#68716B] block">Eng Temp</span>
                      <span className={`font-bold font-mono text-[11px] ${machine.engineTemp > 95 ? 'text-[#DC2626]' : 'text-[#252A25]'}`}>
                        {machine.engineTemp}°C
                      </span>
                    </div>
                    <div className="p-2 bg-white rounded border border-[#E2E8F0]">
                      <span className="text-[10px] text-[#68716B] block">Vibration</span>
                      <span className={`font-bold font-mono text-[11px] ${machine.vibration > 4.5 ? 'text-[#DC2626]' : 'text-[#252A25]'}`}>
                        {machine.vibration} mm/s
                      </span>
                    </div>
                    <div className="p-2 bg-white rounded border border-[#E2E8F0]">
                      <span className="text-[10px] text-[#68716B] block">RUL Hours</span>
                      <span className={`font-bold font-mono text-[11px] ${machine.rulHours < 50 ? 'text-[#DC2626]' : 'text-[#252A25]'}`}>
                        {machine.rulHours}h
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                  <RiskBadge level={machine.failureRiskLevel} score={machine.failureRiskScore} />
                  <span className="text-[#245B3C] font-semibold flex items-center gap-1 hover:underline">
                    View Details
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="gov-card overflow-x-auto border border-[#E2E8F0]">
          <table className="gov-table w-full text-xs">
            <thead>
              <tr>
                <th onClick={() => toggleSort('id')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    <span>ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th onClick={() => toggleSort('name')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    <span>Equipment Name</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th>Type</th>
                <th>Zone / Location</th>
                <th onClick={() => toggleSort('status')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    <span>Status</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th onClick={() => toggleSort('healthScore')} className="cursor-pointer text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span>Health</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="text-right">Engine Temp</th>
                <th className="text-right">Vibration RMS</th>
                <th className="text-right">Fuel Rate</th>
                <th className="text-right">RUL</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(machine => (
                <tr 
                  key={machine.id}
                  onClick={() => setSelectedMachine(machine)}
                  className="hover:bg-[#F8F8F4] cursor-pointer transition-colors"
                >
                  <td className="font-mono font-bold text-[#245B3C]">{machine.id}</td>
                  <td className="font-semibold text-[#252A25]">
                    {machine.name}
                    <span className="text-[10px] text-[#68716B] block font-normal">{machine.model}</span>
                  </td>
                  <td className="capitalize text-[#68716B]">{machine.type.replace('_', ' ')}</td>
                  <td className="text-[#252A25]">{machine.zoneName}</td>
                  <td>
                    <StatusBadge status={machine.status} />
                  </td>
                  <td className="text-right font-mono font-bold">
                    <span className={machine.healthScore < 60 ? 'text-[#DC2626]' : machine.healthScore < 80 ? 'text-[#B45309]' : 'text-[#15803D]'}>
                      {machine.healthScore}%
                    </span>
                  </td>
                  <td className="text-right font-mono text-[#252A25]">{machine.engineTemp}°C</td>
                  <td className="text-right font-mono text-[#252A25]">{machine.vibration} mm/s</td>
                  <td className="text-right font-mono text-[#252A25]">{machine.fuelRate} {machine.isElectric ? 'kW' : 'L/h'}</td>
                  <td className="text-right font-mono font-bold text-[#252A25]">{machine.rulHours}h</td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMachine(machine);
                      }}
                      className="px-2.5 py-1 text-[11px] bg-[#E8F0EC] text-[#245B3C] rounded font-semibold hover:bg-[#245B3C] hover:text-white transition-colors"
                    >
                      Diagnose
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
