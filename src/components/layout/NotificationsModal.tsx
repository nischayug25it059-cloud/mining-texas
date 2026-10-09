import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCheck, 
  ExternalLink
} from 'lucide-react';
import { useMining } from '../../context/MiningContext';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMachine: (machineId: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onSelectMachine,
}) => {
  const { alerts, acknowledgeAlert } = useMining();
  const [filter, setFilter] = useState<'all' | 'unacknowledged' | 'critical' | 'warning'>('all');

  if (!isOpen) return null;

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'unacknowledged') return !alert.acknowledged;
    if (filter === 'critical') return alert.type === 'critical';
    if (filter === 'warning') return alert.type === 'warning';
    return true;
  });

  const unacknowledgedCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="w-full max-w-2xl bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-[#252A25]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8F8F4]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#E8F0EC] text-[#245B3C] border border-[#65866B]/30">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#252A25] text-base">Operational Telemetry Alerts</h3>
              <p className="text-xs text-[#68716B]">
                {unacknowledgedCount} unacknowledged events detected across mining zones
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#68716B] hover:text-[#252A25] hover:bg-[#E2E8F0] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-5 py-2.5 border-b border-[#E2E8F0] bg-white flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full transition-colors ${
                filter === 'all'
                  ? 'bg-[#245B3C] text-white font-medium shadow-sm'
                  : 'text-[#68716B] hover:bg-[#F1F5F9]'
              }`}
            >
              All ({alerts.length})
            </button>
            <button
              onClick={() => setFilter('unacknowledged')}
              className={`px-3 py-1 rounded-full transition-colors ${
                filter === 'unacknowledged'
                  ? 'bg-[#DC2626] text-white font-medium shadow-sm'
                  : 'text-[#68716B] hover:bg-[#F1F5F9]'
              }`}
            >
              Unacknowledged ({unacknowledgedCount})
            </button>
            <button
              onClick={() => setFilter('critical')}
              className={`px-3 py-1 rounded-full transition-colors ${
                filter === 'critical'
                  ? 'bg-[#DC2626] text-white font-medium shadow-sm'
                  : 'text-[#68716B] hover:bg-[#F1F5F9]'
              }`}
            >
              Critical
            </button>
            <button
              onClick={() => setFilter('warning')}
              className={`px-3 py-1 rounded-full transition-colors ${
                filter === 'warning'
                  ? 'bg-[#D97706] text-white font-medium shadow-sm'
                  : 'text-[#68716B] hover:bg-[#F1F5F9]'
              }`}
            >
              Warnings
            </button>
          </div>
        </div>

        {/* Alerts List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {filteredAlerts.length === 0 ? (
            <div className="py-12 text-center text-[#68716B] text-sm">
              <CheckCheck className="w-8 h-8 mx-auto text-[#15803D] mb-2" />
              No alerts match the selected criteria.
            </div>
          ) : (
            filteredAlerts.map(alert => {
              const isCrit = alert.type === 'critical';
              const isWarn = alert.type === 'warning';

              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border transition-all ${
                    alert.acknowledged
                      ? 'bg-[#F8F8F4] border-[#E2E8F0] opacity-80'
                      : isCrit
                      ? 'bg-[#FEF2F2] border-[#FCA5A5]'
                      : isWarn
                      ? 'bg-[#FEF3C7] border-[#FDE68A]'
                      : 'bg-white border-[#E2E8F0]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        {isCrit ? (
                          <AlertCircle className="w-5 h-5 text-[#DC2626]" />
                        ) : isWarn ? (
                          <AlertTriangle className="w-5 h-5 text-[#D97706]" />
                        ) : (
                          <Info className="w-5 h-5 text-[#0284C7]" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#252A25]">{alert.machineName}</span>
                          <span className="font-mono text-[10px] text-[#68716B] px-1.5 py-0.2 bg-white rounded border border-[#E2E8F0]">
                            {alert.machineId}
                          </span>
                          <span className="text-[10px] text-[#68716B] font-mono">{alert.timestamp}</span>
                        </div>
                        <p className="text-xs text-[#252A25] mt-1 font-medium">{alert.message}</p>
                        
                        <div className="mt-2 text-xs flex flex-wrap items-center gap-x-4 gap-y-1 text-[#68716B] font-mono">
                          <span>Metric: <strong className="text-[#252A25]">{alert.metric}</strong></span>
                          <span>Value: <strong className={isCrit ? 'text-[#DC2626]' : 'text-[#D97706]'}>{alert.value}</strong></span>
                          <span>Threshold: <span>{alert.threshold}</span></span>
                        </div>

                        {alert.suggestedAction && (
                          <p className="mt-2 text-[11px] text-[#252A25] bg-white p-2 rounded border border-[#E2E8F0]">
                            <strong>Suggested:</strong> {alert.suggestedAction}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      {!alert.acknowledged ? (
                        <button
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold bg-[#245B3C] text-white hover:bg-[#1E4D33] rounded transition-colors"
                        >
                          Acknowledge
                        </button>
                      ) : (
                        <span className="text-[10px] text-[#15803D] flex items-center gap-1 font-mono font-semibold">
                          <CheckCheck className="w-3.5 h-3.5" /> Acknowledged
                        </span>
                      )}

                      {alert.machineId !== 'DISPATCH' && (
                        <button
                          onClick={() => {
                            onClose();
                            onSelectMachine(alert.machineId);
                          }}
                          className="text-[11px] text-[#245B3C] font-semibold hover:underline flex items-center gap-1"
                        >
                          Inspect Machine <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#E2E8F0] bg-[#F8F8F4] flex items-center justify-between text-xs text-[#68716B]">
          <span>SmartMine CPS Real-Time Advisory Engine</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#252A25] text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
