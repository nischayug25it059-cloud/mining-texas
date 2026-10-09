export function formatNumber(num: number, decimals: number = 0): string {
  if (isNaN(num)) return '0';
  return num.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatTonnes(tonnes: number): string {
  return `${formatNumber(tonnes)} t`;
}

export function formatKwh(kwh: number): string {
  return `${formatNumber(kwh)} kWh`;
}

export function formatInr(inr: number): string {
  return `₹${formatNumber(inr)}`;
}

export function formatPercent(percent: number): string {
  return `${percent.toFixed(1)}%`;
}

export function formatTimestamp(date: Date = new Date()): string {
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}
