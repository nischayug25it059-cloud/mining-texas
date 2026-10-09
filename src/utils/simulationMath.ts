import { SimulationInputs, SimulationResult } from '../types/mining';

export function calculateSimulation(inputs: SimulationInputs): SimulationResult {
  // 1. Effective Operating Hours: Shift hours minus unplanned downtime
  const downtimeFraction = Math.max(0, Math.min(inputs.downtimePercent, 50)) / 100;
  const effectiveOperatingHours = Number((inputs.shiftHours * (1 - downtimeFraction)).toFixed(2));
  const effectiveMinutes = effectiveOperatingHours * 60;

  // 2. Cycle Time Decomposition (Minutes)
  // Loaded speed is approx 88% of rated speed due to payload & uphill ramps
  // Empty return speed is approx 112% of rated speed
  const loadedSpeed = Math.max(10, inputs.truckSpeedKmh * 0.88);
  const emptySpeed = Math.max(12, inputs.truckSpeedKmh * 1.12);

  const haulTimeLoadedMinutes = (inputs.haulDistanceKm / loadedSpeed) * 60;
  const returnTimeEmptyMinutes = (inputs.haulDistanceKm / emptySpeed) * 60;
  const loadingTimeMinutes = inputs.shovelCycleMinutes;
  const dumpTimeMinutes = inputs.dumpTimeMinutes;
  const spotTimeMinutes = inputs.spotTimeMinutes;

  // Queuing delay heuristic based on Truck-to-Shovel Ratio (M/M/s queuing model approximation)
  const truckToShovelRatio = inputs.truckCount / Math.max(1, inputs.excavatorCount);
  let queueDelayMinutes = 0.5;
  if (truckToShovelRatio > 5.5) {
    queueDelayMinutes = (truckToShovelRatio - 5.5) * 1.8 + 1.2;
  } else if (truckToShovelRatio > 4.0) {
    queueDelayMinutes = (truckToShovelRatio - 4.0) * 0.9 + 0.6;
  }

  const cycleTimeMinutes = Number((
    spotTimeMinutes + 
    loadingTimeMinutes + 
    haulTimeLoadedMinutes + 
    dumpTimeMinutes + 
    returnTimeEmptyMinutes + 
    queueDelayMinutes
  ).toFixed(2));

  // 3. Trips per Truck per Shift
  const tripsPerTruckPerShift = Math.max(1, Math.floor(effectiveMinutes / Math.max(1, cycleTimeMinutes)));

  // 4. Estimated Production (Tonnes)
  const estimatedProductionTonnes = Math.round(inputs.truckCount * inputs.avgPayloadTonnes * tripsPerTruckPerShift);
  const productionTargetAchievementPercent = Number(((estimatedProductionTonnes / Math.max(1, inputs.targetTonnes)) * 100).toFixed(1));

  // 5. Fleet Utilization
  // Active operational cycle vs idle / queuing ratio
  const activeCycleMinutes = cycleTimeMinutes - queueDelayMinutes;
  const fleetUtilizationPercent = Number(Math.min(98, Math.max(45, (activeCycleMinutes / cycleTimeMinutes) * 100 * (1 - downtimeFraction * 0.5))).toFixed(1));

  // 6. Fuel & Energy Consumption
  // Average hourly fuel per truck: ~88 L/h active hauling, ~20 L/h queue idling
  const activeFraction = activeCycleMinutes / cycleTimeMinutes;
  const queueFraction = queueDelayMinutes / cycleTimeMinutes;
  const avgHourlyBurnPerTruck = (88 * activeFraction) + (20 * queueFraction);
  const totalTruckFuel = avgHourlyBurnPerTruck * effectiveOperatingHours * inputs.truckCount;

  // Excavator fuel: ~135 L/h per excavator
  const totalExcavatorFuel = 135 * effectiveOperatingHours * inputs.excavatorCount;
  const totalFuelConsumptionLitres = Math.round(totalTruckFuel + totalExcavatorFuel);

  // Electrical equivalent (approx 10 kWh per litre of diesel thermal equiv)
  const totalEnergyKwhEquiv = Math.round(totalFuelConsumptionLitres * 9.8);

  // 7. Financial Operating Cost (INR)
  const fuelCost = totalFuelConsumptionLitres * inputs.fuelPricePerLitre;
  // Maintenance & operator cost factor: ~₹1,850/hr per active machine
  const maintAndLaborCost = (inputs.truckCount + inputs.excavatorCount) * effectiveOperatingHours * 1850;
  const totalOperatingCostInr = Math.round(fuelCost + maintAndLaborCost);
  const costPerTonneInr = Number((totalOperatingCostInr / Math.max(1, estimatedProductionTonnes)).toFixed(2));

  // 8. Sustainability CO2 Emissions (Tonnes CO2e)
  // Standard diesel emission factor: 2.68 kg CO2 / L
  const co2EmissionsTonnes = Number(((totalFuelConsumptionLitres * 2.68) / 1000).toFixed(2));

  // 9. Bottleneck Diagnostics
  let bottleneckType: SimulationResult['bottleneckType'] = 'none';
  let bottleneckDescription = 'Fleet and loading facilities are optimally matched. Minor queuing variance within normal limits.';

  if (truckToShovelRatio > 5.5) {
    bottleneckType = 'truck_queuing';
    bottleneckDescription = `Excessive haul truck queuing at shovels (${queueDelayMinutes.toFixed(1)} min/cycle). Shovel loading capacity is saturated. Adding another excavator or redeploying ${Math.round(truckToShovelRatio - 4.5)} trucks will reduce fuel waste.`;
  } else if (truckToShovelRatio < 2.8) {
    bottleneckType = 'shovel_starvation';
    bottleneckDescription = `Shovel starvation detected. Shovels are waiting idle for trucks between cycles (average shovel idle time: ~${(3.2 - truckToShovelRatio).toFixed(1)} min/cycle). Deploying additional haulage units will directly boost total output.`;
  } else if (inputs.downtimePercent > 18) {
    bottleneckType = 'crusher_capacity';
    bottleneckDescription = `High equipment downtime (${inputs.downtimePercent}%) is eroding production by an estimated ${Math.round(inputs.targetTonnes * (inputs.downtimePercent / 100))} tonnes per shift. Prioritize predictive maintenance to recover capacity.`;
  }

  // 10. Key Insights
  const keyInsights: string[] = [
    `Cycle Time: ${cycleTimeMinutes} min/trip (${tripsPerTruckPerShift} complete round-trips per truck in ${effectiveOperatingHours} effective hours).`,
    `Unit Cost: ₹${costPerTonneInr}/tonne mined (Operating Fuel + Maintenance: ₹${(totalOperatingCostInr / 100000).toFixed(2)} Lakhs).`,
    `Carbon Intensity: ${((co2EmissionsTonnes * 1000) / Math.max(1, estimatedProductionTonnes)).toFixed(2)} kg CO₂ per tonne mined.`,
  ];

  if (productionTargetAchievementPercent >= 100) {
    keyInsights.push(`Production target surpassed by ${(productionTargetAchievementPercent - 100).toFixed(1)}% (+${(estimatedProductionTonnes - inputs.targetTonnes).toLocaleString()} tonnes).`);
  } else {
    keyInsights.push(`Production deficit of ${(100 - productionTargetAchievementPercent).toFixed(1)}% (${(inputs.targetTonnes - estimatedProductionTonnes).toLocaleString()} tonnes short of target).`);
  }

  return {
    effectiveOperatingHours,
    cycleTimeMinutes,
    tripsPerTruckPerShift,
    estimatedProductionTonnes,
    productionTargetAchievementPercent,
    fleetUtilizationPercent,
    totalFuelConsumptionLitres,
    totalEnergyKwhEquiv,
    totalOperatingCostInr,
    costPerTonneInr,
    co2EmissionsTonnes,
    bottleneckType,
    bottleneckDescription,
    keyInsights,
  };
}
