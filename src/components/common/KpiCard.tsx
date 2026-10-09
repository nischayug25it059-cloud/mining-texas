import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  themeColor?: 'amber' | 'emerald' | 'cyan' | 'rose' | 'blue';
  syntheticNote?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  change,
  changeType = 'neutral',
  icon: Icon,
  themeColor = 'amber',
  syntheticNote,
}) => {
  const colorMap = {
    amber: {
      border: 'border-[#E2E8F0] hover:border-[#E9B949]',
      iconBg: 'bg-[#FCF5E3] text-[#B45309]',
    },
    emerald: {
      border: 'border-[#E2E8F0] hover:border-[#245B3C]',
      iconBg: 'bg-[#E8F0EC] text-[#245B3C]',
    },
    cyan: {
      border: 'border-[#E2E8F0] hover:border-[#0284C7]',
      iconBg: 'bg-[#E0F2FE] text-[#0369A1]',
    },
    rose: {
      border: 'border-[#E2E8F0] hover:border-[#DC2626]',
      iconBg: 'bg-[#FEE2E2] text-[#DC2626]',
    },
    blue: {
      border: 'border-[#E2E8F0] hover:border-[#2563EB]',
      iconBg: 'bg-[#EFF6FF] text-[#1D4ED8]',
    },
  };

  const currentTheme = colorMap[themeColor];

  return (
    <div className={`gov-card gov-card-hover p-4 sm:p-5 border transition-all duration-200 ${currentTheme.border}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-[#68716B] uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-[#252A25] tracking-tight telemetry-mono">{value}</h3>
        </div>
        <div className={`p-2.5 rounded-lg border border-black/5 ${currentTheme.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs">
        {subtitle && <span className="text-[#68716B]">{subtitle}</span>}
        {change && (
          <span
            className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
              changeType === 'positive'
                ? 'bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]'
                : changeType === 'negative'
                ? 'bg-[#FEE2E2] text-[#B91C1C] border border-[#FCA5A5]'
                : 'bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]'
            }`}
          >
            {change}
          </span>
        )}
      </div>

      {syntheticNote && (
        <div className="mt-2 text-[10px] text-[#64748B] italic border-t border-[#F1F5F9] pt-1.5 font-sans">
          {syntheticNote}
        </div>
      )}
    </div>
  );
};
