export type EquipmentType = 
  | 'excavator' 
  | 'haul_truck' 
  | 'drill_rig' 
  | 'conveyor' 
  | 'wheel_loader' 
  | 'dozer' 
  | 'water_tanker';

export type EquipmentStatus = 
  | 'operational' 
  | 'warning' 
  | 'critical' 
  | 'idle' 
  | 'maintenance';

export type FailureRiskLevel = 'low' | 'medium' | 'high';

export type CyclePhase = 
  | 'hauling' 
  | 'dumping' 
  | 'returning' 
  | 'spotting' 
  | 'loading' 
  | 'drilling' 
  | 'conveying' 
  | 'idle';

export interface ContributingSignal {
  factor: string;
  weightPercent: number;
  value: string;
  normalRange: string;
  severity: 'normal' | 'moderate' | 'critical';
}

export interface Equipment {
  id: string; // e.g. "HT-201"
  name: string; // e.g. "Haul Truck 201 (BEML BH100)"
  type: EquipmentType;
  model: string;
  status: EquipmentStatus;
  zoneId: string; // e.g. "zone-a"
  zoneName: string;
  utilization: number; // percentage 0-100
  engineTemp: number; // Celsius
  vibration: number; // mm/s RMS
  fuelRate: number; // Litres/hour (or kWh for electric)
  isElectric: boolean;
  operatingHours: number;
  hoursSinceMaintenance: number;
  lastMaintenanceDate: string;
  currentTask: string;
  payloadTonnes: number;
  maxPayloadTonnes: number;
  speedKmh: number;
  healthScore: number; // 0-100 (100 = brand new)
  failureRiskScore: number; // 0-100
  failureRiskLevel: FailureRiskLevel;
  rulHours: number; // Remaining Useful Life
  cyclePhase: CyclePhase;
  contributingSignals: ContributingSignal[];
  recommendedAction: string;
  position: {
    x: number; // 0-100% of mine terrain
    y: number; // 0-100%
    elevation: number; // bench level in meters
  };
  telemetryHistory: {
    timestamp: string;
    temp: number;
    vibration: number;
    fuelRate: number;
    speed: number;
  }[];
}

export interface MiningZone {
  id: string;
  code: string;
  name: string;
  type: 'coal_extraction' | 'overburden_stripping' | 'waste_dump' | 'crushing_stockpile';
  targetTonnage: number;
  currentTonnage: number;
  activeTrucks: number;
  activeShovels: number;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  avgQueueMinutes: number;
  hazardLevel: 'Normal' | 'Advisory' | 'Restricted';
  haulDistanceKm: number;
  dustPm10: number; // ug/m3
  noiseDb: number;
  coordinates: { x: number; y: number; width: number; height: number };
}

export interface AlertItem {
  id: string;
  machineId: string;
  machineName: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  metric: string;
  value: string;
  threshold: string;
  acknowledged: boolean;
  suggestedAction: string;
}

export interface ProductionRecord {
  hour: string;
  timestamp: number;
  targetTonnes: number;
  actualTonnes: number;
  coalTonnes: number;
  overburdenTonnes: number;
  energyKwh: number;
  fuelLitres: number;
  carbonEmissionsKg: number;
  efficiencyPercent: number;
}

export interface SimulationInputs {
  scenarioName: string;
  truckCount: number;
  excavatorCount: number;
  shiftHours: number;
  haulDistanceKm: number;
  avgPayloadTonnes: number;
  targetTonnes: number;
  downtimePercent: number;
  fuelPricePerLitre: number;
  truckSpeedKmh: number;
  shovelCycleMinutes: number;
  dumpTimeMinutes: number;
  spotTimeMinutes: number;
}

export interface SimulationResult {
  effectiveOperatingHours: number;
  cycleTimeMinutes: number;
  tripsPerTruckPerShift: number;
  estimatedProductionTonnes: number;
  productionTargetAchievementPercent: number;
  fleetUtilizationPercent: number;
  totalFuelConsumptionLitres: number;
  totalEnergyKwhEquiv: number;
  totalOperatingCostInr: number;
  costPerTonneInr: number;
  co2EmissionsTonnes: number;
  bottleneckType: 'none' | 'shovel_starvation' | 'truck_queuing' | 'crusher_capacity';
  bottleneckDescription: string;
  keyInsights: string[];
}

export interface OptimizationAllocation {
  zoneId: string;
  zoneName: string;
  priority: string;
  targetTonnes: number;
  currentTrucks: number;
  recommendedTrucks: number;
  assignedTruckIds: string[];
  assignedShovelIds: string[];
  estimatedThroughputTonnes: number;
  currentQueueWaitMin: number;
  optimizedQueueWaitMin: number;
  cycleEfficiencyGainPercent: number;
  reasoning: string;
}

export interface SystemSettings {
  mineSite: string;
  telemetryIntervalMs: number;
  tempWarningThreshold: number;
  tempCriticalThreshold: number;
  vibWarningThreshold: number;
  vibCriticalThreshold: number;
  co2FactorDiesel: number; // kg CO2 / L (default 2.68)
  co2FactorElectricity: number; // kg CO2 / kWh (default 0.82)
}
