import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Radio, 
  Box, 
  Activity, 
  Sparkles, 
  GitFork, 
  Cpu, 
  Leaf, 
  FileText, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Home,
  Flame,
  Layers
} from 'lucide-react';
import { useMining, AppView } from '../../context/MiningContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const { activeView, setActiveView, alerts } = useMining();

  const criticalAlertsCount = alerts.filter(a => a.type === 'critical' && !a.acknowledged).length;

  const navItems: { id: AppView; label: string; icon: React.ElementType; badge?: number | string; badgeColor?: string }[] = [
    { id: 'overview', label: 'Operations Overview', icon: LayoutDashboard },
    { id: 'live-ops', label: 'Live Operations', icon: Radio, badge: 'Live', badgeColor: 'bg-emerald-500/20 text-emerald-400' },
    { id: 'digital-twin', label: 'Digital Twin (3D/2.5D)', icon: Box },
    { 
      id: 'equipment-health', 
      label: 'Equipment Health', 
      icon: Activity, 
      badge: criticalAlertsCount > 0 ? criticalAlertsCount : undefined, 
      badgeColor: 'bg-rose-500 text-white' 
    },
    { id: 'predictions', label: 'AI Predictions', icon: Sparkles, badge: 'AI', badgeColor: 'bg-purple-500/20 text-purple-300' },
    { id: 'optimization', label: 'Resource Optimization', icon: GitFork },
    { id: 'simulation', label: 'Mine Simulation', icon: Cpu },
    { id: 'sustainability', label: 'Sustainability & ESG', icon: Leaf },
    { id: 'reports', label: 'Reports & Analytics', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`relative z-30 flex flex-col bg-mine-900 border-r border-mine-750 transition-all duration-300 shrink-0 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Home / Landing quick link */}
      <div className="p-3 border-b border-mine-750">
        <button
          onClick={() => setActiveView('landing')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
            activeView === 'landing'
              ? 'bg-amber-500/10 text-safety-yellow border border-amber-500/30'
              : 'text-slate-400 hover:text-white hover:bg-mine-800'
          }`}
          title="Return to Presentation Landing Page"
        >
          <Home className="w-4 h-4 shrink-0 text-safety-yellow" />
          {!collapsed && <span>Landing Showcase</span>}
        </button>
      </div>

      {/* Main Nav Items */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {!collapsed && (
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
            Control Room Modules
          </div>
        )}

        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-mine-800 text-safety-yellow border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-mine-850'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-safety-yellow' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </div>

              {!collapsed && item.badge && (
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                    item.badgeColor || 'bg-mine-750 text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info & Collapse Toggle */}
      <div className="p-3 border-t border-mine-750 bg-mine-950/40">
        {!collapsed && (
          <div className="mb-3 px-2 py-2 rounded-lg bg-mine-850 border border-mine-750/60 text-[10px] text-slate-400">
            <div className="flex items-center justify-between text-slate-300 font-medium mb-1">
              <span>Cyber-Physical System</span>
              <span className="text-emerald-400 font-mono">v2.5</span>
            </div>
            <p className="text-slate-400 leading-tight">
              TEXMiN / IIT (ISM) Dhanbad Autonomous Mining Prototype
            </p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs text-slate-400 hover:text-white hover:bg-mine-800 rounded-lg transition-colors border border-transparent hover:border-mine-700"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span className="text-[11px]">Collapse Navigation</span>}
        </button>
      </div>
    </aside>
  );
};
