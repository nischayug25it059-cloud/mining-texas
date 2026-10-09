import React, { useState } from 'react';
import { 
  Settings, 
  MapPin, 
  Sliders, 
  RefreshCw, 
  Save, 
  CheckCircle2, 
  ShieldAlert,
  Cpu
} from 'lucide-react';
import { useMining } from '../context/MiningContext';

export const SettingsPage: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    resetDemoData, 
    selectedMineSite, 
    setSelectedMineSite 
  } = useMining();

  const [savedToast, setSavedToast] = useState(false);

  const mineSites = [
    'Jharia Open Cast Project No. 4, Dhanbad (BCCL / CIL)',
    'North Tisra Opencast Colliery, Dhanbad',
    'Rajmahal Open Cast Mining Project, ECL',
  ];

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="gov-card p-6 border-l-4 border-l-[#245B3C]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-[#E8F0EC] text-[#245B3C] border border-[#65866B]/30">
                System Administration
              </span>
              <span className="text-xs text-[#68716B]">Simulation &amp; Polling Control</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#252A25] flex items-center gap-2">
              <Settings className="w-6 h-6 text-[#245B3C]" />
              System Configuration &amp; Operational Thresholds
            </h1>
            <p className="text-sm text-[#68716B] mt-1">
              Configure telemetry polling frequency, alarm thresholds, and active mining concession model.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#245B3C] hover:bg-[#1E4D33] text-white font-bold text-xs rounded-lg transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Save className="w-4 h-4" />
            Save Preferences
          </button>
        </div>
      </div>

      {savedToast && (
        <div className="p-3.5 bg-[#E8F0EC] border border-[#65866B]/30 text-[#15803D] rounded-xl text-xs flex items-center gap-2 animate-in fade-in font-medium">
          <CheckCircle2 className="w-4 h-4" /> Preferences successfully saved to local browser storage!
        </div>
      )}

      {/* 1. Mine Asset Selection */}
      <div className="gov-card p-6 border border-[#E2E8F0] space-y-4">
        <h3 className="text-sm font-bold text-[#252A25] flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#245B3C]" />
          Active Mining Asset &amp; Spatial Model
        </h3>

        <div className="space-y-2">
          {mineSites.map(site => (
            <label
              key={site}
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                selectedMineSite === site
                  ? 'bg-[#E8F0EC] border-[#65866B]/40 text-[#252A25] font-medium'
                  : 'bg-white border-[#E2E8F0] text-[#68716B] hover:bg-[#F8F8F4]'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="mineSite"
                  checked={selectedMineSite === site}
                  onChange={() => {
                    setSelectedMineSite(site);
                    updateSettings({ mineSite: site });
                  }}
                  className="accent-[#245B3C]"
                />
                <span className="text-xs text-[#252A25]">{site}</span>
              </div>
              {selectedMineSite === site && (
                <span className="text-[10px] font-mono text-[#245B3C] bg-white px-2 py-0.5 rounded border border-[#65866B]/30 font-bold uppercase">
                  Active Site
                </span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* 2. Telemetry Engine Polling Rate */}
      <div className="gov-card p-6 border border-[#E2E8F0] space-y-4">
        <h3 className="text-sm font-bold text-[#252A25] flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#245B3C]" />
          Simulated IoT Telemetry Polling Frequency
        </h3>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-[#68716B]">Tick Interval:</span>
            <span className="text-[#245B3C] font-bold">{settings.telemetryIntervalMs} ms ({settings.telemetryIntervalMs / 1000}s)</span>
          </div>

          <input
            type="range"
            min="500"
            max="5000"
            step="500"
            value={settings.telemetryIntervalMs}
            onChange={e => updateSettings({ telemetryIntervalMs: Number(e.target.value) })}
            className="w-full accent-[#245B3C] cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-[#68716B] font-mono">
            <span>500 ms (Rapid Updates)</span>
            <span>2,000 ms (Standard)</span>
            <span>5,000 ms (Low Bandwidth)</span>
          </div>
        </div>
      </div>

      {/* 3. Alert Severity Thresholds */}
      <div className="gov-card p-6 border border-[#E2E8F0] space-y-4">
        <h3 className="text-sm font-bold text-[#252A25] flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#D97706]" />
          Condition-Monitoring Alarm Thresholds
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-[#F8F8F4] rounded-xl border border-[#E2E8F0] space-y-2">
            <span className="text-[#68716B] uppercase text-[10px] block font-sans font-semibold">Engine Temperature Limits</span>
            <div>
              <label className="text-[#68716B] block mb-1">Warning Threshold (°C)</label>
              <input
                type="number"
                value={settings.tempWarningThreshold}
                onChange={e => updateSettings({ tempWarningThreshold: Number(e.target.value) })}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg p-2 text-[#252A25] focus:outline-none focus:border-[#245B3C]"
              />
            </div>
            <div>
              <label className="text-[#68716B] block mb-1">Critical Threshold (°C)</label>
              <input
                type="number"
                value={settings.tempCriticalThreshold}
                onChange={e => updateSettings({ tempCriticalThreshold: Number(e.target.value) })}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg p-2 text-[#DC2626] font-bold focus:outline-none focus:border-[#245B3C]"
              />
            </div>
          </div>

          <div className="p-4 bg-[#F8F8F4] rounded-xl border border-[#E2E8F0] space-y-2">
            <span className="text-[#68716B] uppercase text-[10px] block font-sans font-semibold">Vibration Velocity Limits (RMS)</span>
            <div>
              <label className="text-[#68716B] block mb-1">Warning Threshold (mm/s)</label>
              <input
                type="number"
                step="0.1"
                value={settings.vibWarningThreshold}
                onChange={e => updateSettings({ vibWarningThreshold: Number(e.target.value) })}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg p-2 text-[#252A25] focus:outline-none focus:border-[#245B3C]"
              />
            </div>
            <div>
              <label className="text-[#68716B] block mb-1">Critical Threshold (mm/s)</label>
              <input
                type="number"
                step="0.1"
                value={settings.vibCriticalThreshold}
                onChange={e => updateSettings({ vibCriticalThreshold: Number(e.target.value) })}
                className="w-full bg-white border border-[#E2E8F0] rounded-lg p-2 text-[#DC2626] font-bold focus:outline-none focus:border-[#245B3C]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Factory Reset */}
      <div className="gov-card p-6 border border-[#FCA5A5] bg-[#FEF2F2] space-y-3">
        <h3 className="text-sm font-bold text-[#991B1B] flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-[#DC2626]" />
          Reset Demo Data &amp; Factory Defaults
        </h3>
        <p className="text-xs text-[#68716B] leading-relaxed">
          Clears custom scenarios, resets machine telemetry back to baseline, unacknowledges alerts, and clears local browser storage cache.
        </p>

        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset all simulated telemetry and scenarios to default baseline?')) {
              resetDemoData();
              alert('Demo reset to initial baseline values.');
            }
          }}
          className="px-4 py-2 bg-white hover:bg-[#FEE2E2] text-[#991B1B] font-semibold text-xs rounded-lg border border-[#FCA5A5] transition-colors"
        >
          Reset Demo State
        </button>
      </div>
    </div>
  );
};
