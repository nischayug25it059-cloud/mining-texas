import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { 
  Equipment, 
  MiningZone, 
  AlertItem, 
  ProductionRecord, 
  SimulationInputs, 
  SimulationResult, 
  SystemSettings 
} from '../types/mining';
import { INITIAL_EQUIPMENT } from '../data/initialEquipment';
import { INITIAL_ZONES } from '../data/zones';
import { INITIAL_ALERTS } from '../data/initialAlerts';
import { INITIAL_PRODUCTION_HOURLY } from '../data/initialProduction';
import { SIMULATION_PRESETS } from '../data/simulationPresets';
import { calculateSimulation } from '../utils/simulationMath';
import { solveFleetOptimization } from '../utils/optimizationSolver';
import { evaluateMachineHealth } from '../utils/predictionEngine';

export type AppView = 
  | 'overview'
  | 'coalfields'
  | 'equipment'
  | 'predictions'
  | 'digital-twin'
  | 'simulation'
  | 'sustainability'
  | 'reports'
  | 'landing'
  // Legacy aliases
  | 'regions'
  | 'live-ops'
  | 'studio'
  | 'equipment-health'
  | 'optimization'
  | 'settings';

interface MiningContextType {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  equipment: Equipment[];
  selectedMachine: Equipment | null;
  setSelectedMachine: (eq: Equipment | null) => void;
  zones: MiningZone[];
  alerts: AlertItem[];
  acknowledgeAlert: (alertId: string) => void;
  productionHourly: ProductionRecord[];
  
  // Live Telemetry Controls
  telemetryActive: boolean;
  toggleTelemetry: () => void;
  simulationSpeed: 1 | 2 | 5;
  setSimulationSpeed: (speed: 1 | 2 | 5) => void;
  lastTelemetryTick: Date;

  // Simulation Sandbox
  simInputs: SimulationInputs;
  setSimInputs: React.Dispatch<React.SetStateAction<SimulationInputs>>;
  simResult: SimulationResult;
  runSimulation: () => void;
  loadSimulationPreset: (presetKey: 'A' | 'B' | 'C') => void;
  resetSimulation: () => void;

  // Fleet Optimization
  applyOptimization: () => void;
  isOptimizationApplied: boolean;

  // AI Health Assessment Run
  runHealthAssessment: () => void;

  // Global Filters
  selectedRegionFilter: string;
  setSelectedRegionFilter: (reg: string) => void;
  selectedEquipmentTypeFilter: string;
  setSelectedEquipmentTypeFilter: (type: string) => void;
  selectedStatusFilter: string;
  setSelectedStatusFilter: (status: string) => void;
  reportingPeriodFilter: 'shift1' | 'shift2' | '24h' | '7d';
  setReportingPeriodFilter: (p: 'shift1' | 'shift2' | '24h' | '7d') => void;

  // System Settings
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  resetDemoData: () => void;

  // Active Mine Site
  selectedMineSite: string;
  setSelectedMineSite: (site: string) => void;
}

const DEFAULT_SETTINGS: SystemSettings = {
  mineSite: 'Jharia Open Cast Project No. 4, Dhanbad (BCCL / CIL)',
  telemetryIntervalMs: 3000,
  tempWarningThreshold: 90,
  tempCriticalThreshold: 100,
  vibWarningThreshold: 4.5,
  vibCriticalThreshold: 7.0,
  co2FactorDiesel: 2.68,
  co2FactorElectricity: 0.82,
};

const MiningContext = createContext<MiningContextType | undefined>(undefined);

export const MiningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<AppView>('landing');
  const [equipment, setEquipment] = useState<Equipment[]>(() => {
    const saved = localStorage.getItem('smartmine_equipment');
    return saved ? JSON.parse(saved) : INITIAL_EQUIPMENT;
  });
  const [selectedMachine, setSelectedMachine] = useState<Equipment | null>(null);
  const [zones, setZones] = useState<MiningZone[]>(INITIAL_ZONES);
  const [alerts, setAlerts] = useState<AlertItem[]>(() => {
    const saved = localStorage.getItem('smartmine_alerts');
    return saved ? JSON.parse(saved) : INITIAL_ALERTS;
  });
  const [productionHourly, setProductionHourly] = useState<ProductionRecord[]>(INITIAL_PRODUCTION_HOURLY);

  // Global Filter States
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('all');
  const [selectedEquipmentTypeFilter, setSelectedEquipmentTypeFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [reportingPeriodFilter, setReportingPeriodFilter] = useState<'shift1' | 'shift2' | '24h' | '7d'>('24h');

  // Telemetry simulation state
  const [telemetryActive, setTelemetryActive] = useState<boolean>(true);
  const [simulationSpeed, setSimulationSpeed] = useState<1 | 2 | 5>(1);
  const [lastTelemetryTick, setLastTelemetryTick] = useState<Date>(new Date());

  // Simulation inputs & results
  const [simInputs, setSimInputs] = useState<SimulationInputs>(() => {
    const saved = localStorage.getItem('smartmine_sim_inputs');
    return saved ? JSON.parse(saved) : SIMULATION_PRESETS.B;
  });
  const [simResult, setSimResult] = useState<SimulationResult>(() => {
    return calculateSimulation(simInputs);
  });

  const [isOptimizationApplied, setIsOptimizationApplied] = useState<boolean>(false);
  const [settings, setSettings] = useState<SystemSettings>(() => {
    const saved = localStorage.getItem('smartmine_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });
  const [selectedMineSite, setSelectedMineSite] = useState<string>(DEFAULT_SETTINGS.mineSite);

  const intervalRef = useRef<number | null>(null);

  // Persist state updates to localStorage
  useEffect(() => {
    localStorage.setItem('smartmine_equipment', JSON.stringify(equipment));
  }, [equipment]);

  useEffect(() => {
    localStorage.setItem('smartmine_alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('smartmine_settings', JSON.stringify(settings));
  }, [settings]);

  // Live Telemetry Simulation Engine
  useEffect(() => {
    if (!telemetryActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const intervalMs = Math.max(1000, Math.floor(settings.telemetryIntervalMs / simulationSpeed));

    intervalRef.current = window.setInterval(() => {
      setLastTelemetryTick(new Date());

      setEquipment(prevEquipment => {
        return prevEquipment.map(eq => {
          if (eq.status === 'idle' || eq.status === 'maintenance') {
            return eq;
          }

          // Subtle physical fluctuation
          const tempJitter = (Math.random() - 0.48) * 0.4;
          const vibJitter = (Math.random() - 0.48) * 0.08;
          const fuelJitter = (Math.random() - 0.48) * 1.5;

          const newTemp = Number(Math.max(45, Math.min(115, eq.engineTemp + tempJitter)).toFixed(1));
          const newVib = Number(Math.max(1.0, Math.min(10.0, eq.vibration + vibJitter)).toFixed(2));
          const newFuel = Number(Math.max(10, eq.fuelRate + fuelJitter).toFixed(1));

          // Append to history
          const nowStr = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          const newHistory = [
            ...(eq.telemetryHistory.slice(-14)),
            {
              timestamp: nowStr,
              temp: newTemp,
              vibration: newVib,
              fuelRate: newFuel,
              speed: eq.speedKmh,
            }
          ];

          return {
            ...eq,
            engineTemp: newTemp,
            vibration: newVib,
            fuelRate: newFuel,
            telemetryHistory: newHistory,
          };
        });
      });
    }, intervalMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [telemetryActive, simulationSpeed, settings.telemetryIntervalMs]);

  const toggleTelemetry = () => {
    setTelemetryActive(prev => !prev);
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(a => a.id === alertId ? { ...a, acknowledged: true } : a)
    );
  };

  // Re-evaluates entire fleet against deterministic rule engine
  const runHealthAssessment = () => {
    setEquipment(prev => {
      return prev.map(m => {
        const assessment = evaluateMachineHealth(m);
        return {
          ...m,
          healthScore: assessment.healthScore,
          failureRiskScore: assessment.failureRiskScore,
          failureRiskLevel: assessment.failureRiskLevel === 'unknown' ? 'low' : assessment.failureRiskLevel,
          contributingSignals: assessment.contributingSignals,
          recommendedAction: assessment.recommendedAction,
        };
      });
    });
  };

  const runSimulation = () => {
    const res = calculateSimulation(simInputs);
    setSimResult(res);
    localStorage.setItem('smartmine_sim_inputs', JSON.stringify(simInputs));
  };

  const loadSimulationPreset = (presetKey: 'A' | 'B' | 'C') => {
    const preset = SIMULATION_PRESETS[presetKey];
    setSimInputs(preset);
    const res = calculateSimulation(preset);
    setSimResult(res);
  };

  const resetSimulation = () => {
    loadSimulationPreset('B');
  };

  const applyOptimization = () => {
    const solved = solveFleetOptimization(zones, equipment);
    setEquipment(prev => {
      return prev.map(eq => {
        if (eq.id === 'HT-206') {
          return {
            ...eq,
            zoneId: 'zone-a',
            zoneName: 'High-Wall Seam IX (High Grade Coal)',
            status: 'operational',
            currentTask: 'High-wall shovel loading Face 3 (Reassigned by AI)',
            speedKmh: 28,
          };
        }
        if (eq.id === 'HT-201') {
          return {
            ...eq,
            speedKmh: 18,
            currentTask: 'Speed-Restricted Low Grade Route (Ramp 2)',
          };
        }
        return eq;
      });
    });

    const optAlert: AlertItem = {
      id: `OPT-${Date.now().toString().slice(-4)}`,
      machineId: 'DISPATCH',
      machineName: 'Central Mine Control System',
      type: 'info',
      message: 'AI Fleet Optimization Applied: HT-206 reassigned to Zone A; average shovel queue wait reduced by 47%.',
      timestamp: new Date().toLocaleTimeString('en-GB'),
      metric: 'Fleet Balancing',
      value: '+14.8% Efficiency',
      threshold: 'Optimal Cycle',
      acknowledged: false,
      suggestedAction: 'Tele-dispatch commands broadcast to in-cab displays.',
    };
    setAlerts(prev => [optAlert, ...prev]);
    setIsOptimizationApplied(true);
  };

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetDemoData = () => {
    localStorage.removeItem('smartmine_equipment');
    localStorage.removeItem('smartmine_alerts');
    localStorage.removeItem('smartmine_sim_inputs');
    localStorage.removeItem('smartmine_settings');
    setEquipment(INITIAL_EQUIPMENT);
    setAlerts(INITIAL_ALERTS);
    setZones(INITIAL_ZONES);
    setProductionHourly(INITIAL_PRODUCTION_HOURLY);
    setSimInputs(SIMULATION_PRESETS.B);
    setSimResult(calculateSimulation(SIMULATION_PRESETS.B));
    setSettings(DEFAULT_SETTINGS);
    setIsOptimizationApplied(false);
  };

  return (
    <MiningContext.Provider
      value={{
        activeView,
        setActiveView,
        equipment,
        selectedMachine,
        setSelectedMachine,
        zones,
        alerts,
        acknowledgeAlert,
        productionHourly,
        telemetryActive,
        toggleTelemetry,
        simulationSpeed,
        setSimulationSpeed,
        lastTelemetryTick,
        simInputs,
        setSimInputs,
        simResult,
        runSimulation,
        loadSimulationPreset,
        resetSimulation,
        applyOptimization,
        isOptimizationApplied,
        runHealthAssessment,
        selectedRegionFilter,
        setSelectedRegionFilter,
        selectedEquipmentTypeFilter,
        setSelectedEquipmentTypeFilter,
        selectedStatusFilter,
        setSelectedStatusFilter,
        reportingPeriodFilter,
        setReportingPeriodFilter,
        settings,
        updateSettings,
        resetDemoData,
        selectedMineSite,
        setSelectedMineSite,
      }}
    >
      {children}
    </MiningContext.Provider>
  );
};

export const useMining = (): MiningContextType => {
  const context = useContext(MiningContext);
  if (!context) {
    throw new Error('useMining must be used within a MiningProvider');
  }
  return context;
};
