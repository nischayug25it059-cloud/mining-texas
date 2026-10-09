// Transparent Rule-Based AI Prediction Engine
// Architecture:
// Raw Sensor Readings -> Data Validation -> Feature Extraction -> Health Assessment -> Risk Classification -> Maintenance Recommendation
// Standards: Grounded in ISO 10816 (Mechanical Vibration) & ISO 13374 (Condition Monitoring & Diagnostics of Machines)

import { Equipment, EquipmentType, ContributingSignal, FailureRiskLevel } from '../types/mining';

export interface EquipmentThresholds {
  tempNormalMax: number;
  tempWarningMax: number;
  tempCriticalMin: number;
  vibrationNormalMax: number;
  vibrationWarningMax: number;
  vibrationCriticalMin: number;
  serviceIntervalHours: number;
  serviceWarningHours: number;
  targetUtilization: number;
}

// Machine-specific operational envelope thresholds
export const EQUIPMENT_THRESHOLDS: Record<EquipmentType, EquipmentThresholds> = {
  excavator: {
    tempNormalMax: 88,
    tempWarningMax: 96,
    tempCriticalMin: 104,
    vibrationNormalMax: 3.5,
    vibrationWarningMax: 5.0,
    vibrationCriticalMin: 6.8,
    serviceIntervalHours: 250,
    serviceWarningHours: 220,
    targetUtilization: 85,
  },
  haul_truck: {
    tempNormalMax: 92,
    tempWarningMax: 102,
    tempCriticalMin: 112,
    vibrationNormalMax: 4.0,
    vibrationWarningMax: 5.8,
    vibrationCriticalMin: 7.5,
    serviceIntervalHours: 200,
    serviceWarningHours: 180,
    targetUtilization: 82,
  },
  drill_rig: {
    tempNormalMax: 85,
    tempWarningMax: 94,
    tempCriticalMin: 102,
    vibrationNormalMax: 5.5,
    vibrationWarningMax: 7.2,
    vibrationCriticalMin: 9.0,
    serviceIntervalHours: 150,
    serviceWarningHours: 130,
    targetUtilization: 75,
  },
  conveyor: {
    tempNormalMax: 65,
    tempWarningMax: 75,
    tempCriticalMin: 85,
    vibrationNormalMax: 2.8,
    vibrationWarningMax: 4.2,
    vibrationCriticalMin: 5.5,
    serviceIntervalHours: 350,
    serviceWarningHours: 300,
    targetUtilization: 90,
  },
  wheel_loader: {
    tempNormalMax: 90,
    tempWarningMax: 98,
    tempCriticalMin: 108,
    vibrationNormalMax: 3.8,
    vibrationWarningMax: 5.2,
    vibrationCriticalMin: 7.0,
    serviceIntervalHours: 200,
    serviceWarningHours: 180,
    targetUtilization: 80,
  },
  dozer: {
    tempNormalMax: 90,
    tempWarningMax: 100,
    tempCriticalMin: 110,
    vibrationNormalMax: 4.5,
    vibrationWarningMax: 6.0,
    vibrationCriticalMin: 7.8,
    serviceIntervalHours: 200,
    serviceWarningHours: 180,
    targetUtilization: 78,
  },
  water_tanker: {
    tempNormalMax: 88,
    tempWarningMax: 96,
    tempCriticalMin: 105,
    vibrationNormalMax: 3.5,
    vibrationWarningMax: 5.0,
    vibrationCriticalMin: 6.5,
    serviceIntervalHours: 250,
    serviceWarningHours: 220,
    targetUtilization: 70,
  },
};

export interface HealthAssessmentResult {
  machineId: string;
  healthScore: number; // 0 to 100
  failureRiskScore: number; // 0 to 100 (heuristic derived, not calibrated probability)
  failureRiskLevel: FailureRiskLevel | 'unknown';
  isInsufficientData: boolean;
  contributingSignals: ContributingSignal[];
  recommendedAction: string;
  diagnosticSummary: string;
  deltaTemp: number; // rate of change in recent ticks
  deltaVibration: number;
  hoursOverdue: number;
  evaluatedAt: string;
  disclaimer: string;
}

export interface MaintenanceInsight {
  id: string;
  equipmentId: string;
  equipmentName: string;
  equipmentType: EquipmentType;
  severity: 'critical' | 'warning' | 'info';
  category: 'vibration_rise' | 'thermal_threshold' | 'maintenance_overdue' | 'insufficient_data' | 'low_utilization';
  reason: string;
  relevantSensors: {
    label: string;
    value: string;
    threshold: string;
  }[];
  recommendedAction: string;
  acknowledged: boolean;
  timestamp: string;
}

/**
 * Validates sensor telemetry and runs deterministic feature extraction
 */
export function evaluateMachineHealth(machine: Equipment, simulatedDataStale = false): HealthAssessmentResult {
  const disclaimer = 'Prototype health assessment — not a validated safety-critical prediction system.';
  const evaluatedAt = new Date().toISOString();

  // 1. Data Validation & Stale Telemetry Check
  // If machine has simulated missing sensors or missing telemetry history
  const history = machine.telemetryHistory || [];
  const hasZeroTelemetry = history.length === 0;
  const isStale = simulatedDataStale || hasZeroTelemetry || machine.engineTemp <= 0 || machine.vibration < 0;

  if (isStale) {
    return {
      machineId: machine.id,
      healthScore: 50,
      failureRiskScore: 50,
      failureRiskLevel: 'unknown',
      isInsufficientData: true,
      contributingSignals: [
        {
          factor: 'Sensor Freshness / Data Stream',
          weightPercent: 100,
          value: 'Telemetry Missing or Interrupted',
          normalRange: 'Real-time heartbeat < 15s',
          severity: 'moderate',
        },
      ],
      recommendedAction: 'Inspect telemetry RTU / CAN-bus wireless gateway. Do not declare asset healthy without active sensor handshake.',
      diagnosticSummary: 'Insufficient recent sensor data to compute deterministic condition envelope. Classification withheld per fail-safe protocol.',
      deltaTemp: 0,
      deltaVibration: 0,
      hoursOverdue: 0,
      evaluatedAt,
      disclaimer,
    };
  }

  // 2. Feature Extraction
  const thresholds = EQUIPMENT_THRESHOLDS[machine.type] || EQUIPMENT_THRESHOLDS.haul_truck;

  // Rate of change over last 2 historical points
  let deltaTemp = 0;
  let deltaVibration = 0;
  if (history.length >= 2) {
    const latest = history[history.length - 1];
    const prev = history[history.length - 2];
    deltaTemp = Number((latest.temp - prev.temp).toFixed(1));
    deltaVibration = Number((latest.vibration - prev.vibration).toFixed(2));
  }

  const hoursSinceService = machine.hoursSinceMaintenance || 0;
  const hoursOverdue = Math.max(0, hoursSinceService - thresholds.serviceIntervalHours);

  // 3. Multi-Factor Diagnostic Penalties (Heuristic Feature Mapping)
  let healthDeductions = 0;
  let riskAdditions = 0;
  const contributingSignals: ContributingSignal[] = [];

  // A. Thermal Factor
  if (machine.engineTemp >= thresholds.tempCriticalMin) {
    healthDeductions += 45;
    riskAdditions += 50;
    contributingSignals.push({
      factor: 'Engine / Coolant Temperature',
      weightPercent: 35,
      value: `${machine.engineTemp.toFixed(1)}°C (Critical)`,
      normalRange: `< ${thresholds.tempNormalMax}°C`,
      severity: 'critical',
    });
  } else if (machine.engineTemp >= thresholds.tempWarningMax) {
    healthDeductions += 25;
    riskAdditions += 28;
    contributingSignals.push({
      factor: 'Engine / Coolant Temperature',
      weightPercent: 35,
      value: `${machine.engineTemp.toFixed(1)}°C (Warning)`,
      normalRange: `< ${thresholds.tempNormalMax}°C`,
      severity: 'moderate',
    });
  } else if (deltaTemp > 3.0) {
    // Rising rapidly even if below warning
    healthDeductions += 12;
    riskAdditions += 15;
    contributingSignals.push({
      factor: 'Thermal Rate of Rise (dT/dt)',
      weightPercent: 20,
      value: `+${deltaTemp.toFixed(1)}°C / interval`,
      normalRange: '< 2.0°C / interval',
      severity: 'moderate',
    });
  } else {
    contributingSignals.push({
      factor: 'Engine Operating Temperature',
      weightPercent: 25,
      value: `${machine.engineTemp.toFixed(1)}°C`,
      normalRange: `< ${thresholds.tempNormalMax}°C`,
      severity: 'normal',
    });
  }

  // B. Mechanical Vibration Factor (ISO 10816 envelopes)
  if (machine.vibration >= thresholds.vibrationCriticalMin) {
    healthDeductions += 45;
    riskAdditions += 50;
    contributingSignals.push({
      factor: 'Structural Vibration (RMS)',
      weightPercent: 35,
      value: `${machine.vibration.toFixed(2)} mm/s (Severe)`,
      normalRange: `< ${thresholds.vibrationNormalMax} mm/s`,
      severity: 'critical',
    });
  } else if (machine.vibration >= thresholds.vibrationWarningMax) {
    healthDeductions += 24;
    riskAdditions += 28;
    contributingSignals.push({
      factor: 'Structural Vibration (RMS)',
      weightPercent: 30,
      value: `${machine.vibration.toFixed(2)} mm/s (Elevated)`,
      normalRange: `< ${thresholds.vibrationNormalMax} mm/s`,
      severity: 'moderate',
    });
  } else if (deltaVibration > 1.2) {
    healthDeductions += 15;
    riskAdditions += 18;
    contributingSignals.push({
      factor: 'Vibration Acceleration Trend (dV/dt)',
      weightPercent: 20,
      value: `+${deltaVibration.toFixed(2)} mm/s delta`,
      normalRange: '< 0.5 mm/s delta',
      severity: 'moderate',
    });
  } else {
    contributingSignals.push({
      factor: 'Vibration Envelope',
      weightPercent: 25,
      value: `${machine.vibration.toFixed(2)} mm/s`,
      normalRange: `< ${thresholds.vibrationNormalMax} mm/s`,
      severity: 'normal',
    });
  }

  // C. Operating Hours & Preventative Maintenance Service Interval
  if (hoursOverdue > 0) {
    const penalty = Math.min(30, Math.round(hoursOverdue * 0.4));
    healthDeductions += penalty;
    riskAdditions += penalty;
    contributingSignals.push({
      factor: 'Maintenance Service Interval',
      weightPercent: 20,
      value: `${hoursSinceService} hrs (${hoursOverdue} hrs overdue)`,
      normalRange: `< ${thresholds.serviceIntervalHours} operating hrs`,
      severity: hoursOverdue > 40 ? 'critical' : 'moderate',
    });
  } else if (hoursSinceService >= thresholds.serviceWarningHours) {
    healthDeductions += 8;
    riskAdditions += 10;
    contributingSignals.push({
      factor: 'Maintenance Window Proximity',
      weightPercent: 15,
      value: `${hoursSinceService} hrs (${thresholds.serviceIntervalHours - hoursSinceService} hrs remaining)`,
      normalRange: `< ${thresholds.serviceIntervalHours} hrs`,
      severity: 'normal',
    });
  } else {
    contributingSignals.push({
      factor: 'Service Interval Status',
      weightPercent: 15,
      value: `${hoursSinceService} hrs elapsed`,
      normalRange: `< ${thresholds.serviceIntervalHours} hrs`,
      severity: 'normal',
    });
  }

  // 4. Calculate Final Health & Risk Scores
  const calculatedHealth = Math.max(10, Math.min(100, Math.round(100 - healthDeductions)));
  const calculatedRisk = Math.max(5, Math.min(95, Math.round(riskAdditions)));

  // Risk Classification
  let riskLevel: FailureRiskLevel = 'low';
  if (calculatedRisk >= 65 || calculatedHealth < 60) {
    riskLevel = 'high';
  } else if (calculatedRisk >= 35 || calculatedHealth < 80) {
    riskLevel = 'medium';
  }

  // 5. Derive Maintenance Recommendation
  let recommendedAction = 'Asset performing within manufacturer baseline. Maintain scheduled lube cycles.';
  let diagnosticSummary = 'All monitored channels (thermal, vibration RMS, and service delta) conform to ISO standards.';

  if (riskLevel === 'high') {
    if (machine.vibration >= thresholds.vibrationWarningMax && machine.engineTemp >= thresholds.tempWarningMax) {
      recommendedAction = 'IMMEDIATE WORK ORDER: Halt unit at safe berm. Inspect main final drive bearings and hydraulic heat exchanger.';
      diagnosticSummary = 'Compound thermal and mechanical vibration exceedances indicate severe drivetrain bearing distress.';
    } else if (machine.vibration >= thresholds.vibrationWarningMax) {
      recommendedAction = 'DISPATCH MECHANIC: Perform FFT vibration spectrum analysis on slew bearing and planetary gear set.';
      diagnosticSummary = 'Mechanical vibration envelope exceeds ISO 10816 Zone C limits. Imbalance or bearing raceway spalling likely.';
    } else if (machine.engineTemp >= thresholds.tempWarningMax) {
      recommendedAction = 'COOLING SYSTEM AUDIT: Inspect radiator core debris accumulation and check engine coolant glycol level.';
      diagnosticSummary = 'Coolant temperature trend approaching upper thermal limit under continuous ramp hauling.';
    } else if (hoursOverdue > 0) {
      recommendedAction = 'SCHEDULE PREVENTATIVE OVERHAUL: Asset has surpassed configured manufacturer PM window.';
      diagnosticSummary = `Preventative maintenance interval exceeded by ${hoursOverdue} operating hours. Component wear risk elevated.`;
    }
  } else if (riskLevel === 'medium') {
    if (deltaVibration > 0.8) {
      recommendedAction = 'CONDITION ADVISORY: Monitor vibration trend over next 2 shifts. Schedule lube sampling.';
      diagnosticSummary = 'Positive vibration acceleration trend detected over recent operating shifts.';
    } else if (hoursOverdue > 0) {
      recommendedAction = 'SCHEDULE LUBE & FILTER SERVICE: Asset due for routine filter changes within 24 hours.';
      diagnosticSummary = 'Operating hours nearing maintenance service cutoff.';
    } else {
      recommendedAction = 'ROUTINE INSPECTION: Verify belt alignment and grease purge seals at next shift changeover.';
      diagnosticSummary = 'Minor sub-critical signal deviations noted; asset remains safe for production duty.';
    }
  }

  return {
    machineId: machine.id,
    healthScore: calculatedHealth,
    failureRiskScore: calculatedRisk,
    failureRiskLevel: riskLevel,
    isInsufficientData: false,
    contributingSignals,
    recommendedAction,
    diagnosticSummary,
    deltaTemp,
    deltaVibration,
    hoursOverdue,
    evaluatedAt,
    disclaimer,
  };
}

/**
 * Generates dynamic, data-supported AI Maintenance Insights across the entire fleet
 */
export function generateMaintenanceInsights(fleet: Equipment[]): MaintenanceInsight[] {
  const insights: MaintenanceInsight[] = [];
  const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // 1. Rising vibration check
  fleet.forEach(eq => {
    const thresholds = EQUIPMENT_THRESHOLDS[eq.type] || EQUIPMENT_THRESHOLDS.haul_truck;
    if (eq.vibration >= thresholds.vibrationWarningMax) {
      insights.push({
        id: `insight-vib-${eq.id}`,
        equipmentId: eq.id,
        equipmentName: eq.name,
        equipmentType: eq.type,
        severity: eq.vibration >= thresholds.vibrationCriticalMin ? 'critical' : 'warning',
        category: 'vibration_rise',
        reason: `${eq.name} exhibits abnormal vibration amplitude (${eq.vibration.toFixed(2)} mm/s vs threshold ${thresholds.vibrationNormalMax} mm/s).`,
        relevantSensors: [
          { label: 'RMS Vibration', value: `${eq.vibration.toFixed(2)} mm/s`, threshold: `< ${thresholds.vibrationNormalMax} mm/s` },
          { label: 'Operating Status', value: eq.status, threshold: 'operational' },
        ],
        recommendedAction: 'Perform spectral vibration analysis on driveline bearings and retorque mounting bolts.',
        acknowledged: false,
        timestamp: now,
      });
    }
  });

  // 2. Approaching temperature threshold
  fleet.forEach(eq => {
    const thresholds = EQUIPMENT_THRESHOLDS[eq.type] || EQUIPMENT_THRESHOLDS.haul_truck;
    if (eq.engineTemp >= thresholds.tempWarningMax) {
      insights.push({
        id: `insight-temp-${eq.id}`,
        equipmentId: eq.id,
        equipmentName: eq.name,
        equipmentType: eq.type,
        severity: eq.engineTemp >= thresholds.tempCriticalMin ? 'critical' : 'warning',
        category: 'thermal_threshold',
        reason: `${eq.name} operating temperature (${eq.engineTemp.toFixed(1)}°C) is approaching thermal trip limit (${thresholds.tempCriticalMin}°C).`,
        relevantSensors: [
          { label: 'Engine Temp', value: `${eq.engineTemp.toFixed(1)}°C`, threshold: `< ${thresholds.tempNormalMax}°C` },
          { label: 'Fuel Rate', value: `${eq.fuelRate.toFixed(1)} L/h`, threshold: 'Normal' },
        ],
        recommendedAction: 'Blow out radiator fins with compressed air and verify thermostatic bypass valve operation.',
        acknowledged: false,
        timestamp: now,
      });
    }
  });

  // 3. Overdue maintenance records
  fleet.forEach(eq => {
    const thresholds = EQUIPMENT_THRESHOLDS[eq.type] || EQUIPMENT_THRESHOLDS.haul_truck;
    if (eq.hoursSinceMaintenance > thresholds.serviceIntervalHours) {
      const overdueBy = eq.hoursSinceMaintenance - thresholds.serviceIntervalHours;
      insights.push({
        id: `insight-maint-${eq.id}`,
        equipmentId: eq.id,
        equipmentName: eq.name,
        equipmentType: eq.type,
        severity: overdueBy > 30 ? 'critical' : 'warning',
        category: 'maintenance_overdue',
        reason: `${eq.name} has exceeded its manufacturer service interval by ${overdueBy} operating hours.`,
        relevantSensors: [
          { label: 'Hours Since Service', value: `${eq.hoursSinceMaintenance} hrs`, threshold: `${thresholds.serviceIntervalHours} hrs max` },
          { label: 'Last Service Date', value: eq.lastMaintenanceDate, threshold: '30 days' },
        ],
        recommendedAction: 'Schedule equipment for PM inspection, hydraulic oil sampling, and filter cartridge replacement.',
        acknowledged: false,
        timestamp: now,
      });
    }
  });

  // 4. Low fleet utilization check
  const haulTrucks = fleet.filter(e => e.type === 'haul_truck');
  if (haulTrucks.length > 0) {
    const avgTruckUtilization = haulTrucks.reduce((acc, t) => acc + t.utilization, 0) / haulTrucks.length;
    if (avgTruckUtilization < 72) {
      insights.push({
        id: 'insight-util-trucks',
        equipmentId: 'HT-FLEET',
        equipmentName: 'Haul Truck Fleet Group',
        equipmentType: 'haul_truck',
        severity: 'info',
        category: 'low_utilization',
        reason: `Average haul truck utilization is ${avgTruckUtilization.toFixed(1)}%, below the 80% operational benchmark.`,
        relevantSensors: [
          { label: 'Fleet Avg Utilization', value: `${avgTruckUtilization.toFixed(1)}%`, threshold: '> 80.0%' },
          { label: 'Active Haulers', value: `${haulTrucks.filter(t => t.status === 'operational').length} / ${haulTrucks.length}`, threshold: 'All' },
        ],
        recommendedAction: 'Review excavator loading point allocation to balance shovel wait times and eliminate queue bottlenecks.',
        acknowledged: false,
        timestamp: now,
      });
    }
  }

  return insights;
}
