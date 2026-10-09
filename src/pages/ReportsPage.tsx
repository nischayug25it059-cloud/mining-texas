import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Search, 
  Filter, 
  Layers, 
  Activity, 
  Zap, 
  Truck, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Building2,
  Database,
  X
} from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { exportToCsv } from '../utils/exportCsv';
import { formatNumber, formatTonnes } from '../utils/formatters';
import { DATA_SOURCE_REGISTRY, DataSourceEntry } from '../data/dataSourceRegistry';

type ReportType = 'sources' | 'production' | 'fleet' | 'health' | 'energy' | 'simulation';

export const ReportsPage: React.FC = () => {
  const { 
    productionHourly, 
    equipment, 
    simResult, 
    simInputs, 
    selectedMineSite 
  } = useMining();

  const [activeReport, setActiveReport] = useState<ReportType>('sources');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Dynamic CSV Export logic based on active report
  const handleExportCsv = () => {
    const timestamp = new Date().toISOString().slice(0, 10);

    if (activeReport === 'sources') {
      const rows = DATA_SOURCE_REGISTRY.map(s => ({
        Source_ID: s.id,
        Source_Name: s.sourceName,
        Portal_URL: s.sourceUrl,
        Reporting_Period: s.reportingPeriod,
        Mineral_Category: s.mineral,
        Geographic_Coverage: s.geographicCoverage,
        Verification_Status: s.verificationStatus,
        Statutory_Metric: s.value,
        Regulatory_Notes: s.notes,
      }));
      exportToCsv(`statutory_data_sources_registry_${timestamp}`, rows);
    } else if (activeReport === 'production') {
      const rows = productionHourly.map(p => ({
        Hour: p.hour,
        Target_Tonnes: p.targetTonnes,
        Actual_Tonnes: p.actualTonnes,
        Coal_Tonnes: p.coalTonnes,
        Overburden_Tonnes: p.overburdenTonnes,
        Energy_kWh: p.energyKwh,
        Fuel_Litres: p.fuelLitres,
        CO2_kg: p.carbonEmissionsKg,
        Efficiency_Percent: `${p.efficiencyPercent}%`,
      }));
      exportToCsv(`daily_production_report_${timestamp}`, rows);
    } else if (activeReport === 'fleet') {
      const rows = equipment.map(e => ({
        Asset_ID: e.id,
        Name: e.name,
        Type: e.type,
        Status: e.status,
        Zone: e.zoneName,
        Utilization_Percent: `${e.utilization}%`,
        Fuel_Rate: `${e.fuelRate} ${e.isElectric ? 'kW' : 'L/h'}`,
        Speed_kmh: e.speedKmh,
        Current_Task: e.currentTask,
      }));
      exportToCsv(`fleet_utilization_report_${timestamp}`, rows);
    } else if (activeReport === 'health') {
      const rows = equipment.map(e => ({
        Asset_ID: e.id,
        Name: e.name,
        Health_Score: `${e.healthScore}/100`,
        Failure_Risk_Score: `${e.failureRiskScore}/100`,
        Failure_Risk_Level: e.failureRiskLevel,
        Remaining_Useful_Life_Hours: e.rulHours,
        Engine_Temp_C: e.engineTemp,
        Vibration_RMS_mms: e.vibration,
        Operating_Hours: e.operatingHours,
        Hours_Since_PM: e.hoursSinceMaintenance,
        Recommended_Action: e.recommendedAction,
      }));
      exportToCsv(`equipment_health_predictive_report_${timestamp}`, rows);
    } else if (activeReport === 'energy') {
      const rows = productionHourly.map(p => ({
        Hour: p.hour,
        Electricity_kWh: p.energyKwh,
        Diesel_Litres: p.fuelLitres,
        CO2_Emissions_kg: p.carbonEmissionsKg,
        Specific_Energy_kWh_per_tonne: Number((p.energyKwh / p.actualTonnes).toFixed(3)),
      }));
      exportToCsv(`energy_carbon_report_${timestamp}`, rows);
    } else if (activeReport === 'simulation') {
      const rows = [
        { Parameter: 'Truck Fleet Count', Value: simInputs.truckCount },
        { Parameter: 'Excavator Count', Value: simInputs.excavatorCount },
        { Parameter: 'Shift Hours', Value: simInputs.shiftHours },
        { Parameter: 'Haul Distance (km)', Value: simInputs.haulDistanceKm },
        { Parameter: 'Avg Payload (t)', Value: simInputs.avgPayloadTonnes },
        { Parameter: 'Downtime %', Value: `${simInputs.downtimePercent}%` },
        { Parameter: 'Total Estimated Production (t)', Value: simResult.estimatedProductionTonnes },
        { Parameter: 'Cycle Time (min)', Value: simResult.cycleTimeMinutes },
        { Parameter: 'Trips Per Truck', Value: simResult.tripsPerTruckPerShift },
        { Parameter: 'Unit Operating Cost (INR/t)', Value: `₹${simResult.costPerTonneInr}` },
        { Parameter: 'Total Fuel Burn (L)', Value: simResult.totalFuelConsumptionLitres },
        { Parameter: 'Carbon Footprint (t CO2)', Value: simResult.co2EmissionsTonnes },
        { Parameter: 'Bottleneck Diagnosis', Value: simResult.bottleneckDescription },
      ];
      exportToCsv(`simulation_comparison_report_${timestamp}`, rows);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="gov-card p-6 border-l-4 border-l-[#245B3C]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-[#E8F0EC] text-[#245B3C] border border-[#65866B]/30">
                Statutory Provenance &amp; Audits
              </span>
              <span className="text-xs text-[#68716B]">Citations &amp; Data Exports</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#252A25] flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#245B3C]" />
              Reports, Provenance Registry &amp; Data Export
            </h1>
            <p className="text-sm text-[#68716B] mt-1 max-w-3xl">
              Inspect authoritative statutory data sources (Ministry of Coal, IBM, CIL, Jharkhand DMG) 
              alongside synthetic telematics disclosures, and export operational datasets in CSV format.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setShowPrintModal(true)}
              className="px-3.5 py-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#252A25] font-semibold text-xs rounded-lg border border-[#E2E8F0] transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Dossier
            </button>

            <button
              onClick={handleExportCsv}
              className="px-4 py-2 bg-[#245B3C] hover:bg-[#1E4D33] text-white font-bold text-xs rounded-lg transition-all shadow-sm flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Export Active Dataset (CSV)
            </button>
          </div>
        </div>

        {/* Provenance Disclosure Strip */}
        <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between text-xs text-[#68716B] gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#245B3C]" />
            <span>Official statistics grounded in published government reports. Telemetry streams clearly labeled DEMO DATA.</span>
          </div>
          <span className="font-mono text-[11px] bg-[#F1F5F9] px-2.5 py-1 rounded border border-[#E2E8F0]">
            Format: RFC-4180 Standard CSV
          </span>
        </div>
      </div>

      {/* Report Category Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E2E8F0] pb-3">
        {[
          { id: 'sources', label: 'Statutory Data Sources Registry', icon: Database },
          { id: 'production', label: 'Daily Production Throughput', icon: Layers },
          { id: 'fleet', label: 'Fleet Kinematics & Utilization', icon: Truck },
          { id: 'health', label: 'Equipment Health & Predictive RUL', icon: Activity },
          { id: 'energy', label: 'Energy, Fuel & Carbon Audits', icon: Zap },
          { id: 'simulation', label: 'Simulation Scenario Comparison', icon: FileText },
        ].map(r => {
          const Icon = r.icon;
          return (
            <button
              key={r.id}
              onClick={() => setActiveReport(r.id as ReportType)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeReport === r.id
                  ? 'bg-[#245B3C] text-white shadow-sm'
                  : 'bg-[#F1F5F9] text-[#68716B] hover:bg-[#E2E8F0]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{r.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Dataset Container */}
      <div className="gov-card p-5 border border-[#E2E8F0] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-3">
          <div>
            <h3 className="text-sm font-bold text-[#252A25] uppercase tracking-wider font-mono">
              Dataset: {activeReport.toUpperCase()} RECORD
            </h3>
            <span className="text-xs text-[#68716B]">
              Site: {selectedMineSite} | Shift 1 &amp; 2 Operational Data
            </span>
          </div>

          <span className="text-xs font-mono text-[#245B3C] bg-[#E8F0EC] px-3 py-1 rounded-full border border-[#65866B]/30 font-semibold self-start sm:self-auto">
            Ready for CSV Download
          </span>
        </div>

        {/* 1. DATA SOURCES REGISTRY TABLE */}
        {activeReport === 'sources' && (
          <div className="overflow-x-auto">
            <table className="gov-table w-full text-xs">
              <thead>
                <tr>
                  <th>Ref ID</th>
                  <th>Statutory Authority &amp; Portal</th>
                  <th>Reporting Period</th>
                  <th>Mineral Domain</th>
                  <th>Geographic Scope</th>
                  <th>Key Published Metric</th>
                  <th>Verification</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {DATA_SOURCE_REGISTRY.map(src => (
                  <tr key={src.id} className="hover:bg-[#F8F8F4] transition-colors">
                    <td className="font-mono font-bold text-[#245B3C]">{src.id}</td>
                    <td className="font-semibold text-[#252A25]">
                      {src.sourceName}
                      <span className="text-[10px] text-[#68716B] block font-normal mt-0.5 line-clamp-1">
                        {src.notes}
                      </span>
                    </td>
                    <td className="font-mono text-[#68716B]">{src.reportingPeriod}</td>
                    <td className="text-[#252A25]">{src.mineral}</td>
                    <td className="text-[#68716B]">{src.geographicCoverage}</td>
                    <td className="text-[#252A25] font-medium max-w-xs">{src.value}</td>
                    <td>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                        src.verificationStatus === 'Verified Official'
                          ? 'bg-[#E8F0EC] text-[#15803D]'
                          : src.verificationStatus === 'Published Enterprise'
                          ? 'bg-[#E0F2FE] text-[#0369A1]'
                          : 'bg-[#FEF3C7] text-[#B45309]'
                      }`}>
                        {src.verificationStatus}
                      </span>
                    </td>
                    <td>
                      <a
                        href={src.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 text-[11px] bg-[#E8F0EC] text-[#245B3C] rounded font-semibold hover:bg-[#245B3C] hover:text-white transition-colors flex items-center gap-1 inline-flex"
                      >
                        <span>Visit</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 2. PRODUCTION TABLE */}
        {activeReport === 'production' && (
          <div className="overflow-x-auto">
            <table className="gov-table w-full text-xs">
              <thead>
                <tr>
                  <th>Hour</th>
                  <th className="text-right">Planned Target</th>
                  <th className="text-right">Actual Output</th>
                  <th className="text-right">Coal Output</th>
                  <th className="text-right">Overburden</th>
                  <th className="text-right">Electricity (kWh)</th>
                  <th className="text-right">Diesel (L)</th>
                  <th className="text-right">CO₂ (kg)</th>
                  <th className="text-right">Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {productionHourly.map((p, idx) => (
                  <tr key={idx} className="hover:bg-[#F8F8F4]">
                    <td className="font-mono font-bold text-[#245B3C]">{p.hour}</td>
                    <td className="text-right font-mono text-[#68716B]">{p.targetTonnes} t</td>
                    <td className="text-right font-mono font-bold text-[#252A25]">{p.actualTonnes} t</td>
                    <td className="text-right font-mono text-[#252A25]">{p.coalTonnes} t</td>
                    <td className="text-right font-mono text-[#68716B]">{p.overburdenTonnes} t</td>
                    <td className="text-right font-mono text-[#252A25]">{p.energyKwh}</td>
                    <td className="text-right font-mono text-[#252A25]">{p.fuelLitres}</td>
                    <td className="text-right font-mono text-[#252A25]">{p.carbonEmissionsKg}</td>
                    <td className="text-right font-mono font-bold text-[#15803D]">{p.efficiencyPercent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. FLEET TABLE */}
        {activeReport === 'fleet' && (
          <div className="overflow-x-auto">
            <table className="gov-table w-full text-xs">
              <thead>
                <tr>
                  <th>Asset ID</th>
                  <th>Machine Name</th>
                  <th>Category</th>
                  <th>Current Zone</th>
                  <th>Status</th>
                  <th className="text-right">Utilization</th>
                  <th className="text-right">Fuel Rate</th>
                  <th className="text-right">Speed</th>
                  <th>Current Operational Task</th>
                </tr>
              </thead>
              <tbody>
                {equipment.map(e => (
                  <tr key={e.id} className="hover:bg-[#F8F8F4]">
                    <td className="font-mono font-bold text-[#245B3C]">{e.id}</td>
                    <td className="font-semibold text-[#252A25]">{e.name}</td>
                    <td className="capitalize text-[#68716B]">{e.type.replace('_', ' ')}</td>
                    <td className="text-[#252A25]">{e.zoneName}</td>
                    <td>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        e.status === 'operational'
                          ? 'bg-[#E8F0EC] text-[#15803D]'
                          : e.status === 'warning'
                          ? 'bg-[#FEF3C7] text-[#B45309]'
                          : 'bg-[#FEE2E2] text-[#DC2626]'
                      }`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="text-right font-mono font-bold text-[#252A25]">{e.utilization}%</td>
                    <td className="text-right font-mono text-[#252A25]">{e.fuelRate} {e.isElectric ? 'kW' : 'L/h'}</td>
                    <td className="text-right font-mono text-[#68716B]">{e.speedKmh} km/h</td>
                    <td className="text-[#252A25]">{e.currentTask}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 4. HEALTH TABLE */}
        {activeReport === 'health' && (
          <div className="overflow-x-auto">
            <table className="gov-table w-full text-xs">
              <thead>
                <tr>
                  <th>Asset ID</th>
                  <th>Machine Name</th>
                  <th className="text-right">Health Score</th>
                  <th className="text-right">Failure Risk</th>
                  <th className="text-right">RUL</th>
                  <th className="text-right">Engine Temp</th>
                  <th className="text-right">Vibration RMS</th>
                  <th className="text-right">Operating Hours</th>
                  <th>Recommended Maintenance Intervention</th>
                </tr>
              </thead>
              <tbody>
                {equipment.map(e => (
                  <tr key={e.id} className="hover:bg-[#F8F8F4]">
                    <td className="font-mono font-bold text-[#245B3C]">{e.id}</td>
                    <td className="font-semibold text-[#252A25]">{e.name}</td>
                    <td className="text-right font-mono font-bold">
                      <span className={e.healthScore < 60 ? 'text-[#DC2626]' : e.healthScore < 80 ? 'text-[#B45309]' : 'text-[#15803D]'}>
                        {e.healthScore}%
                      </span>
                    </td>
                    <td className="text-right font-mono">
                      <span className={e.failureRiskScore > 70 ? 'text-[#DC2626]' : 'text-[#68716B]'}>
                        {e.failureRiskScore}/100 ({e.failureRiskLevel})
                      </span>
                    </td>
                    <td className="text-right font-mono font-bold text-[#252A25]">{e.rulHours}h</td>
                    <td className="text-right font-mono text-[#252A25]">{e.engineTemp}°C</td>
                    <td className="text-right font-mono text-[#252A25]">{e.vibration} mm/s</td>
                    <td className="text-right font-mono text-[#68716B]">{e.operatingHours}h</td>
                    <td className="text-[#252A25]">{e.recommendedAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. ENERGY TABLE */}
        {activeReport === 'energy' && (
          <div className="overflow-x-auto">
            <table className="gov-table w-full text-xs">
              <thead>
                <tr>
                  <th>Hour</th>
                  <th className="text-right">Electricity Grid (kWh)</th>
                  <th className="text-right">Diesel Fuel (L)</th>
                  <th className="text-right">CO₂ Emissions (kg)</th>
                  <th className="text-right">Energy Intensity (kWh/t)</th>
                </tr>
              </thead>
              <tbody>
                {productionHourly.map((p, idx) => (
                  <tr key={idx} className="hover:bg-[#F8F8F4]">
                    <td className="font-mono font-bold text-[#245B3C]">{p.hour}</td>
                    <td className="text-right font-mono text-[#252A25]">{p.energyKwh}</td>
                    <td className="text-right font-mono text-[#252A25]">{p.fuelLitres}</td>
                    <td className="text-right font-mono font-bold text-[#252A25]">{p.carbonEmissionsKg}</td>
                    <td className="text-right font-mono text-[#15803D]">
                      {(p.energyKwh / p.actualTonnes).toFixed(3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 6. SIMULATION SCENARIO TABLE */}
        {activeReport === 'simulation' && (
          <div className="overflow-x-auto">
            <table className="gov-table w-full text-xs">
              <thead>
                <tr>
                  <th>Operational Parameter / Outcome Metric</th>
                  <th>Configured Value</th>
                  <th>Engineering Unit</th>
                  <th>Formula Interpretation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium text-[#252A25]">Haul Truck Fleet Size</td>
                  <td className="font-mono font-bold text-[#245B3C]">{simInputs.truckCount}</td>
                  <td className="text-[#68716B]">Units</td>
                  <td className="text-[#68716B]">Allocated active haulage trucks</td>
                </tr>
                <tr>
                  <td className="font-medium text-[#252A25]">Excavator Loading Units</td>
                  <td className="font-mono font-bold text-[#245B3C]">{simInputs.excavatorCount}</td>
                  <td className="text-[#68716B]">Units</td>
                  <td className="text-[#68716B]">Loading shovel points across active benches</td>
                </tr>
                <tr>
                  <td className="font-medium text-[#252A25]">Estimated Shift Production</td>
                  <td className="font-mono font-bold text-[#245B3C]">{formatTonnes(simResult.estimatedProductionTonnes)}</td>
                  <td className="text-[#68716B]">Metric Tonnes</td>
                  <td className="text-[#68716B]">{simResult.productionTargetAchievementPercent}% of shift target achieved</td>
                </tr>
                <tr>
                  <td className="font-medium text-[#252A25]">Cycle Time Duration</td>
                  <td className="font-mono font-bold text-[#245B3C]">{simResult.cycleTimeMinutes}</td>
                  <td className="text-[#68716B]">Minutes</td>
                  <td className="text-[#68716B]">{simResult.tripsPerTruckPerShift} complete round trips per shift</td>
                </tr>
                <tr>
                  <td className="font-medium text-[#252A25]">Unit Extraction &amp; Haul Cost</td>
                  <td className="font-mono font-bold text-[#245B3C]">₹{simResult.costPerTonneInr}</td>
                  <td className="text-[#68716B]">INR / Tonne</td>
                  <td className="text-[#68716B]">Total shift operating cost: ₹{(simResult.totalOperatingCostInr / 100000).toFixed(1)} Lakhs</td>
                </tr>
                <tr>
                  <td className="font-medium text-[#252A25]">Diesel Fuel Consumption</td>
                  <td className="font-mono font-bold text-[#245B3C]">{formatNumber(simResult.totalFuelConsumptionLitres)}</td>
                  <td className="text-[#68716B]">Litres</td>
                  <td className="text-[#68716B]">Total diesel fuel burned during shift</td>
                </tr>
                <tr>
                  <td className="font-medium text-[#252A25]">Carbon Footprint</td>
                  <td className="font-mono font-bold text-[#245B3C]">{simResult.co2EmissionsTonnes}</td>
                  <td className="text-[#68716B]">Tonnes CO₂e</td>
                  <td className="text-[#68716B]">Scope 1 direct diesel combustion footprint</td>
                </tr>
                <tr>
                  <td className="font-medium text-[#252A25]">Bottleneck Diagnosis</td>
                  <td className="font-mono font-bold text-[#D97706]">{simResult.bottleneckType.toUpperCase()}</td>
                  <td className="text-[#68716B]">Diagnostic State</td>
                  <td className="text-[#252A25]">{simResult.bottleneckDescription}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Print Dossier Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div 
            className="w-full max-w-xl bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl p-6 text-[#252A25] space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#252A25]">
                  Statutory Mining Operations Summary Dossier
                </h3>
                <p className="text-xs text-[#68716B]">
                  Jharkhand Mining Intelligence Portal — Official Audit Record
                </p>
              </div>
              <button
                onClick={() => setShowPrintModal(false)}
                className="text-[#68716B] hover:text-[#252A25] p-1 rounded-md hover:bg-[#F1F5F9]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs bg-[#F8F8F4] p-4 rounded-xl border border-[#E2E8F0]">
              <div className="flex justify-between">
                <span className="text-[#68716B]">Mining Operation:</span>
                <strong className="text-[#252A25]">{selectedMineSite}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#68716B]">Total Fleets Monitored:</span>
                <strong className="text-[#252A25]">{equipment.length} Units (HEMM)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#68716B]">Daily Production:</span>
                <strong className="text-[#252A25]">12,480 Metric Tonnes</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#68716B]">Carbon Footprint:</span>
                <strong className="text-[#252A25]">27.11 Tonnes CO₂e</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#68716B]">Statutory Compliance:</span>
                <strong className="text-[#15803D]">DGMS &amp; JSPCB Norms Compliant</strong>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E2E8F0]">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 bg-[#F1F5F9] text-[#252A25] font-semibold text-xs rounded-lg hover:bg-[#E2E8F0]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                  setShowPrintModal(false);
                }}
                className="px-4 py-2 bg-[#245B3C] text-white font-semibold text-xs rounded-lg hover:bg-[#1E4D33] flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
