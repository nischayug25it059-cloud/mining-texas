import React, { useState } from 'react';
import { 
  Leaf, 
  Zap, 
  Fuel, 
  Droplets, 
  Wind, 
  AlertTriangle, 
  TrendingDown, 
  Sun, 
  Sliders, 
  CheckCircle2,
  TreePine
} from 'lucide-react';
import { useMining } from '../context/MiningContext';
import { KpiCard } from '../components/common/KpiCard';
import { RestorationIllustration } from '../components/sustainability/RestorationIllustration';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';

export const SustainabilityPage: React.FC = () => {
  const { zones, equipment, productionHourly } = useMining();

  // User configurable inputs
  const [dieselPrice, setDieselPrice] = useState(94.5);
  const [electricityFactor, setElectricityFactor] = useState(0.82); // kg CO2 / kWh
  const [dieselFactor, setDieselFactor] = useState(2.68); // kg CO2 / L

  // Calculations for sustainability metrics
  const totalProductionTonnes = 12480;
  const totalDieselLitres = 8640;
  const totalElectricityKwh = 4820;

  const totalDieselCo2Kg = totalDieselLitres * dieselFactor;
  const totalElecCo2Kg = totalElectricityKwh * electricityFactor;
  const totalCo2Tonnes = Number(((totalDieselCo2Kg + totalElecCo2Kg) / 1000).toFixed(2));
  const specificCarbonIntensity = Number(((totalCo2Tonnes * 1000) / totalProductionTonnes).toFixed(2)); // kg CO2 / tonne
  const specificEnergyIntensity = Number((totalElectricityKwh / totalProductionTonnes).toFixed(2)); // kWh / tonne

  // Water consumption
  const waterConsumptionLitres = 90000; // 90 kL sprayed by WT-701 & WT-702
  const waterPerTonneLitres = Number((waterConsumptionLitres / totalProductionTonnes).toFixed(1));

  // Renewable solar offset from reclaimed dump solar farm
  const solarGenKwh = 1250;
  const solarOffsetCo2Tonnes = Number(((solarGenKwh * electricityFactor) / 1000).toFixed(2));

  // Machines with higher than average fuel burn per hour
  const avgTruckFuelRate = 88;
  const heavyConsumers = equipment.filter(e => e.type === 'haul_truck' && e.fuelRate > 94);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="gov-card p-6 border-l-4 border-l-[#245B3C]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-[#E8F0EC] text-[#245B3C] border border-[#65866B]/30">
                Environmental Governance &amp; ESG
              </span>
              <span className="text-xs text-[#68716B]">Pollution Control Board Standards</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#252A25] flex items-center gap-2">
              <Leaf className="w-6 h-6 text-[#245B3C]" />
              Sustainability, Decarbonization &amp; Mine Reclamation
            </h1>
            <p className="text-sm text-[#68716B] mt-1 max-w-3xl">
              Real-time monitoring of Scope 1 diesel emissions, Scope 2 electricity usage, ambient dust suppression, 
              and progressive post-mining land reclamation across the Chota Nagpur plateau.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-[#E8F0EC] border border-[#65866B]/30 text-[#245B3C] font-mono text-xs font-semibold self-start sm:self-auto">
            GHG Scope 1 &amp; 2 Standard
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-5 border-t border-[#E2E8F0]">
          <div className="p-4 bg-[#F8F8F4] rounded-xl border border-[#E2E8F0]">
            <span className="text-[11px] text-[#68716B] font-semibold block uppercase">Total Daily CO₂e</span>
            <span className="text-2xl font-black text-[#245B3C] block mt-1">{totalCo2Tonnes} t</span>
            <span className="text-[10px] text-[#68716B] block mt-1">Scope 1: 85% | Scope 2: 15%</span>
          </div>

          <div className="p-4 bg-[#F8F8F4] rounded-xl border border-[#E2E8F0]">
            <span className="text-[11px] text-[#68716B] font-semibold block uppercase">Specific Carbon Intensity</span>
            <span className="text-2xl font-black text-[#245B3C] block mt-1">{specificCarbonIntensity} kg/t</span>
            <span className="text-[10px] text-[#15803D] font-medium block mt-1">Target: &lt; 2.50 kg CO₂e / tonne</span>
          </div>

          <div className="p-4 bg-[#F8F8F4] rounded-xl border border-[#E2E8F0]">
            <span className="text-[11px] text-[#68716B] font-semibold block uppercase">Specific Energy Use</span>
            <span className="text-2xl font-black text-[#245B3C] block mt-1">{specificEnergyIntensity} kWh/t</span>
            <span className="text-[10px] text-[#68716B] block mt-1">4,820 kWh electric grid total</span>
          </div>

          <div className="p-4 bg-[#F8F8F4] rounded-xl border border-[#E2E8F0]">
            <span className="text-[11px] text-[#68716B] font-semibold block uppercase">Dust Water Suppression</span>
            <span className="text-2xl font-black text-[#245B3C] block mt-1">90 kL</span>
            <span className="text-[10px] text-[#15803D] font-medium block mt-1">{waterPerTonneLitres} L / tonne mined (PM10 compliant)</span>
          </div>
        </div>
      </div>

      {/* Embedded Mine Restoration Illustration */}
      <RestorationIllustration />

      {/* Ambient Pit Zone Air & Dust Telemetry */}
      <div className="gov-card p-5 border border-[#E2E8F0] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-2.5">
          <h3 className="text-sm font-bold text-[#252A25] flex items-center gap-2">
            <Wind className="w-4 h-4 text-[#245B3C]" />
            Pit Zone Ambient Air &amp; Dust Telemetry (DGMS Standards)
          </h3>
          <span className="text-[11px] text-[#68716B] font-mono">
            Threshold: PM10 &lt; 150 µg/m³
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {zones.map(zone => (
            <div key={zone.id} className="p-4 bg-[#F8F8F4] rounded-xl border border-[#E2E8F0] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-[#245B3C]">{zone.code}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  zone.dustPm10 > 150 
                    ? 'bg-[#FEF3C7] text-[#B45309] border border-[#F59E0B]/30' 
                    : 'bg-[#E8F0EC] text-[#15803D] border border-[#65866B]/20'
                }`}>
                  {zone.dustPm10 > 150 ? 'Advisory Alert' : 'DGMS Compliant'}
                </span>
              </div>
              <h4 className="text-xs font-semibold text-[#252A25] truncate">{zone.name}</h4>
              
              <div className="pt-2 border-t border-[#E2E8F0] space-y-1 font-mono text-xs">
                <div className="flex justify-between text-[#68716B]">
                  <span>Particulate PM10:</span>
                  <strong className={zone.dustPm10 > 150 ? 'text-[#B45309]' : 'text-[#252A25]'}>
                    {zone.dustPm10} µg/m³
                  </strong>
                </div>
                <div className="flex justify-between text-[#68716B]">
                  <span>Ambient Noise:</span>
                  <strong className="text-[#252A25]">{zone.noiseDb} dB(A)</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts & Fuel Anomalies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly CO2 Emissions Trend */}
        <div className="gov-card p-5 border border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-3 border-b border-[#E2E8F0] pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#252A25] flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-[#245B3C]" />
              24-Hour Carbon Emission Profile (kg CO₂e / hr)
            </h3>
            <span className="text-[10px] text-[#68716B] font-mono">Shift Telemetry</span>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionHourly}>
                <defs>
                  <linearGradient id="co2Grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#245B3C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#245B3C" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="hour" stroke="#68716B" fontSize={11} />
                <YAxis stroke="#68716B" fontSize={11} unit=" kg" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '8px', fontSize: '11px', color: '#252A25' }}
                />
                <Area type="monotone" dataKey="carbonEmissionsKg" name="CO₂ Emissions (kg)" stroke="#245B3C" fill="url(#co2Grad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* High Fuel Consumption Anomalies */}
        <div className="gov-card p-5 border border-[#E2E8F0] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 border-b border-[#E2E8F0] pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#252A25] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#D97706]" />
                Heavy Fuel Consumption Anomalies
              </h3>
              <span className="text-[10px] text-[#68716B] font-mono">Fleet Mean: {avgTruckFuelRate} L/h</span>
            </div>
            <p className="text-xs text-[#68716B] mb-3">
              Equipment burning significantly more diesel than baseline due to engine friction or steep haul road gradients:
            </p>

            <div className="space-y-2">
              {heavyConsumers.map(hc => (
                <div key={hc.id} className="p-3 bg-[#FEF3C7] rounded-xl border border-[#F59E0B]/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-[#252A25]">{hc.id} ({hc.name})</span>
                    <span className="text-[10px] text-[#68716B] block mt-0.5">
                      Burn Rate: <strong>{hc.fuelRate} L/h</strong> (+{Math.round(((hc.fuelRate - avgTruckFuelRate) / avgTruckFuelRate) * 100)}% above fleet mean)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#DC2626] font-mono font-bold text-[11px] block">Thermal Inefficiency</span>
                    <span className="text-[10px] text-[#68716B]">Speed advisory recommended</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Renewable Solar Offset Card */}
          <div className="mt-4 p-3.5 bg-[#E8F0EC] rounded-xl border border-[#65866B]/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <Sun className="w-5 h-5 text-[#E9B949]" />
              <div>
                <span className="font-bold text-[#252A25] block">Reclaimed Overburden Solar Farm</span>
                <span className="text-[10px] text-[#68716B]">1,250 kWh clean electricity generated today (-1.02 t CO₂ offset)</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[#245B3C] bg-white border border-[#65866B]/30 font-semibold">
              Active Grid Feed
            </span>
          </div>
        </div>
      </div>

      {/* Configurable Emission Factors Drawer */}
      <div className="gov-card p-5 border border-[#E2E8F0]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#252A25] mb-3 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#245B3C]" />
          Configurable Carbon Accounting Factors
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div>
            <label className="text-[#68716B] block mb-1">Diesel Emission Factor (kg CO₂/L)</label>
            <input
              type="number"
              step="0.05"
              value={dieselFactor}
              onChange={e => setDieselFactor(Number(e.target.value))}
              className="w-full bg-white border border-[#E2E8F0] rounded-lg p-2 text-[#252A25] focus:outline-none focus:border-[#245B3C]"
            />
          </div>

          <div>
            <label className="text-[#68716B] block mb-1">Grid Electricity Factor (kg CO₂/kWh)</label>
            <input
              type="number"
              step="0.02"
              value={electricityFactor}
              onChange={e => setElectricityFactor(Number(e.target.value))}
              className="w-full bg-white border border-[#E2E8F0] rounded-lg p-2 text-[#252A25] focus:outline-none focus:border-[#245B3C]"
            />
          </div>

          <div>
            <label className="text-[#68716B] block mb-1">Diesel Cost (₹ / Litre)</label>
            <input
              type="number"
              step="0.5"
              value={dieselPrice}
              onChange={e => setDieselPrice(Number(e.target.value))}
              className="w-full bg-white border border-[#E2E8F0] rounded-lg p-2 text-[#252A25] focus:outline-none focus:border-[#245B3C]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
