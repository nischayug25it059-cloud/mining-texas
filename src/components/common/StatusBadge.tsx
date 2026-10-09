import React from 'react';
import { EquipmentStatus, FailureRiskLevel } from '../../types/mining';

interface StatusBadgeProps {
  status: EquipmentStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const configs: Record<EquipmentStatus, { label: string; bg: string; text: string; dot: string }> = {
    operational: {
      label: 'Operational',
      bg: 'bg-[#DCFCE7] border-[#86EFAC]',
      text: 'text-[#15803D]',
      dot: 'bg-[#15803D]',
    },
    warning: {
      label: 'Warning Alert',
      bg: 'bg-[#FEF3C7] border-[#FDE047]',
      text: 'text-[#B45309]',
      dot: 'bg-[#D97706]',
    },
    critical: {
      label: 'Critical Anomaly',
      bg: 'bg-[#FEE2E2] border-[#FCA5A5]',
      text: 'text-[#B91C1C]',
      dot: 'bg-[#DC2626]',
    },
    idle: {
      label: 'Idle / Standby',
      bg: 'bg-[#F1F5F9] border-[#CBD5E1]',
      text: 'text-[#475569]',
      dot: 'bg-[#64748B]',
    },
    maintenance: {
      label: 'Scheduled PM',
      bg: 'bg-[#E0E7FF] border-[#A5B4FC]',
      text: 'text-[#4338CA]',
      dot: 'bg-[#4F46E5]',
    },
  };

  const config = configs[status] || configs.operational;
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.bg} ${config.text} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
};

export const RiskBadge: React.FC<{ level: FailureRiskLevel; score: number }> = ({ level, score }) => {
  const configs: Record<FailureRiskLevel, { bg: string; text: string; label: string }> = {
    low: { bg: 'bg-[#DCFCE7] border-[#86EFAC]', text: 'text-[#15803D]', label: 'Low Risk' },
    medium: { bg: 'bg-[#FEF3C7] border-[#FDE047]', text: 'text-[#B45309]', label: 'Medium Risk' },
    high: { bg: 'bg-[#FEE2E2] border-[#FCA5A5]', text: 'text-[#B91C1C]', label: 'High Risk' },
  };

  const config = configs[level];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border text-xs font-mono font-medium ${config.bg} ${config.text}`}>
      <span>{config.label}</span>
      <span className="opacity-80 font-bold">({score}/100)</span>
    </span>
  );
};
