import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useMining, AppView } from '../../context/MiningContext';

interface BreadcrumbsProps {
  currentViewLabel?: string;
}

const VIEW_LABELS: Record<AppView, string> = {
  overview: 'Operations & Mining Intelligence Overview',
  coalfields: 'Jharkhand Coalfield & Mineral Explorer (Satellite GIS)',
  equipment: 'Equipment Health & Telematics Monitoring Center',
  predictions: 'AI Health Predictions & Maintenance Insights',
  'digital-twin': 'Opencast Spatial Digital Twin & Mine Layout',
  simulation: 'Mine Simulation & Scenario Engineering Lab',
  sustainability: 'Sustainability, Environmental Telemetry & Land Restoration',
  reports: 'Statutory Reports & Data Sources Registry',
  landing: 'Home Portal',
  // Legacy aliases
  regions: 'Jharkhand Mining Regions & Geological Deposits',
  studio: 'Inside Mining Operations (Engineering Studio)',
  'live-ops': 'Equipment Fleet Telematics & Live Operations',
  'equipment-health': 'Equipment Health & Predictive Maintenance',
  optimization: 'Fleet Dispatch & Haulage Optimization',
  settings: 'System Configuration',
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentViewLabel }) => {
  const { activeView, setActiveView } = useMining();
  const label = currentViewLabel || VIEW_LABELS[activeView] || activeView;

  return (
    <nav aria-label="Breadcrumb" className="py-2.5 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] border-b border-[#E2E8F0] text-xs text-[#68716B]">
      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          onClick={() => setActiveView('landing')}
          className="flex items-center gap-1 hover:text-[#245B3C] font-medium transition-colors"
        >
          <Home className="w-3.5 h-3.5 text-[#65866B]" />
          <span>Home</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
        <span className="font-semibold text-[#252A25]">{label}</span>
      </div>
    </nav>
  );
};
