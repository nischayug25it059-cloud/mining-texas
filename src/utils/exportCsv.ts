import { Equipment } from '../types/mining';

export function exportToCsv<T extends Record<string, any>>(
  filename: string,
  rows: T[],
  customHeaders?: { key: keyof T; label: string }[]
): void {
  if (!rows || !rows.length) {
    alert('No data available to export.');
    return;
  }

  let headers: string[];
  let keys: string[];

  if (customHeaders && customHeaders.length > 0) {
    headers = customHeaders.map(h => h.label);
    keys = customHeaders.map(h => String(h.key));
  } else {
    keys = Object.keys(rows[0]);
    headers = keys.map(k => k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
  }

  const csvRows: string[] = [];
  // Add headers
  csvRows.push(headers.map(escapeCsvValue).join(','));

  // Add rows
  for (const row of rows) {
    const values = keys.map(key => {
      const val = row[key];
      if (typeof val === 'object' && val !== null) {
        return JSON.stringify(val);
      }
      return val !== undefined && val !== null ? String(val) : '';
    });
    csvRows.push(values.map(escapeCsvValue).join(','));
  }

  const csvContent = '\uFEFF' + csvRows.join('\r\n'); // Add BOM for Excel compatibility
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportEquipmentToCsv(fleet: Equipment[]): void {
  const exportRows = fleet.map(e => ({
    Machine_ID: e.id,
    Name: e.name,
    Type: e.type,
    Model: e.model,
    Status: e.status,
    Zone_Bench: e.zoneName,
    Health_Score: e.healthScore,
    Failure_Risk_Score: e.failureRiskScore,
    Risk_Level: e.failureRiskLevel,
    Engine_Temp_C: e.engineTemp,
    Vibration_RMS_mms: e.vibration,
    Operating_Hours: e.operatingHours,
    Hours_Since_Service: e.hoursSinceMaintenance,
    Last_Maintenance_Date: e.lastMaintenanceDate,
    Fuel_Rate_Lph: e.fuelRate,
    Recommended_Action: e.recommendedAction,
  }));

  exportToCsv('jharkhand_smartmine_fleet_telemetry', exportRows);
}

function escapeCsvValue(val: string): string {
  if (val.includes(',') || val.includes('"') || val.includes('\n') || val.includes('\r')) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}
