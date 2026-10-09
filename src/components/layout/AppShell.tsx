import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  Activity, 
  Sparkles, 
  Box, 
  Cpu, 
  Leaf, 
  FileText, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Bell, 
  Search, 
  Home, 
  ShieldCheck, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useMining, AppView } from '../../context/MiningContext';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { Footer } from './Footer';

interface AppShellProps {
  children: React.ReactNode;
  onOpenNotifications: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({ children, onOpenNotifications }) => {
  const { 
    activeView, 
    setActiveView, 
    alerts, 
    equipment,
    telemetryActive,
    lastTelemetryTick,
    simulationSpeed,
    setSimulationSpeed 
  } = useMining();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Unread alerts count
  const unreadAlertsCount = alerts.filter(a => !a.acknowledged).length;

  // High-risk machines count for equipment badge
  const highRiskCount = equipment.filter(
    e => e.failureRiskLevel === 'high' || e.healthScore < 60 || e.status === 'critical'
  ).length;

  // 8 Required Navigation Items
  const navItems: { 
    id: AppView; 
    label: string; 
    icon: React.ElementType; 
    badge?: string | number; 
    badgeColor?: string;
  }[] = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: LayoutDashboard 
    },
    { 
      id: 'coalfields', 
      label: 'Jharkhand Coalfield Explorer', 
      icon: Compass, 
      badge: 'GIS Satellite', 
      badgeColor: 'bg-[#FAF8F5] text-[#245B3C] border border-[#E9B949]' 
    },
    { 
      id: 'equipment', 
      label: 'Equipment Monitoring', 
      icon: Activity, 
      badge: highRiskCount > 0 ? `${highRiskCount} Alert` : undefined, 
      badgeColor: 'bg-rose-100 text-rose-800' 
    },
    { 
      id: 'predictions', 
      label: 'AI Health Predictions', 
      icon: Sparkles, 
      badge: 'AI', 
      badgeColor: 'bg-[#E8F0EC] text-[#245B3C]' 
    },
    { 
      id: 'digital-twin', 
      label: 'Digital Twin', 
      icon: Box 
    },
    { 
      id: 'simulation', 
      label: 'Mine Simulation', 
      icon: Cpu 
    },
    { 
      id: 'sustainability', 
      label: 'Sustainability', 
      icon: Leaf 
    },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: FileText 
    },
  ];

  const handleNavClick = (viewId: AppView) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F4] text-[#252A25] font-sans antialiased">
      {/* 1. Official Government Top Information Strip */}
      <header className="bg-[#245B3C] text-[#F8F8F4] text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-[#183E28] z-40">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-full">
          <div className="flex items-center gap-2 flex-wrap text-center sm:text-left">
            <span className="font-semibold tracking-wide">
              JHARKHAND MINING INTELLIGENCE PORTAL
            </span>
            <span className="text-[#65866B] hidden md:inline">|</span>
            <span className="text-white/90 hidden md:inline">
              Dept. of Mines &amp; Geology, Govt. of Jharkhand &bull; Ministry of Coal &bull; Indian Bureau of Mines
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono shrink-0">
            {/* Live Freshness Indicator */}
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${telemetryActive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="text-white/90">
                {telemetryActive ? 'Telemetry: Active (3s)' : 'Telemetry: Paused'}
              </span>
            </div>

            <span className="text-[#65866B]">|</span>

            <span className="text-white/80 hidden lg:inline">
              Published: FY 2023-24
            </span>
          </div>
        </div>
      </header>

      {/* 2. Top Header Navigation Bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-[#E2E8F0] shadow-sm">
        <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Sidebar Toggle Button (Desktop) */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg border border-[#E2E8F0] text-slate-600 hover:bg-[#F8F8F4] hover:text-[#245B3C] transition-colors"
              title={sidebarCollapsed ? 'Expand navigation sidebar' : 'Collapse navigation sidebar'}
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg border border-[#E2E8F0] text-slate-600 hover:bg-[#F8F8F4] transition-colors"
              title="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo & Title */}
            <button
              onClick={() => setActiveView('landing')}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-[#245B3C] border border-[#183E28] flex items-center justify-center text-[#E9B949] shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                  <line x1="12" y1="22" x2="12" y2="15.5" />
                  <polyline points="22 8.5 12 15.5 2 8.5" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-base tracking-tight text-[#252A25] group-hover:text-[#245B3C] transition-colors">
                    SmartMine AI
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#E8F0EC] text-[#245B3C] font-semibold border border-[#65866B]/30">
                    Jharkhand
                  </span>
                </div>
                <div className="text-[10px] text-[#68716B] leading-none">
                  Cyber-Physical Mining Intelligence Platform
                </div>
              </div>
            </button>
          </div>

          {/* Quick Actions & Notification Bell */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveView('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                activeView === 'landing'
                  ? 'bg-[#245B3C] text-white border-[#245B3C]'
                  : 'bg-white text-slate-700 border-[#E2E8F0] hover:bg-[#F8F8F4]'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Portal Home</span>
            </button>

            {/* Notification Center Trigger */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg border border-[#E2E8F0] bg-white text-slate-600 hover:text-[#245B3C] hover:bg-[#F8F8F4] transition-colors"
              title="Open Notifications & Maintenance Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white font-mono text-[9px] font-bold flex items-center justify-center">
                  {unreadAlertsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2E8F0] p-4 space-y-1 shadow-lg z-30">
          <div className="text-[10px] font-mono uppercase text-[#68716B] font-semibold px-2 mb-2">
            Navigation Modules
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#245B3C] text-white'
                    : 'text-[#252A25] hover:bg-[#F8F8F4]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${item.badgeColor || 'bg-slate-100'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Main Workspace Shell: Collapsible Sidebar + Content Area */}
      <div className="flex-1 flex w-full">
        {/* Left Sidebar (Desktop) */}
        <aside
          className={`hidden lg:flex flex-col bg-white border-r border-[#E2E8F0] transition-all duration-300 shrink-0 z-20 ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          {/* Nav List */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {!sidebarCollapsed && (
              <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#68716B] font-bold mb-1">
                Mining Modules
              </div>
            )}

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-[#245B3C] text-white shadow-sm'
                      : 'text-[#4A5568] hover:text-[#252A25] hover:bg-[#F8F8F4]'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-[#E9B949]' : 'text-slate-400 group-hover:text-[#245B3C]'
                      }`}
                    />
                    {!sidebarCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </div>

                  {!sidebarCollapsed && item.badge && (
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badgeColor || 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer Info */}
          <div className="p-3 border-t border-[#E2E8F0] bg-[#FAF8F5]">
            {!sidebarCollapsed && (
              <div className="mb-2 p-2 rounded-lg bg-white border border-[#E2E8F0] text-[10px] text-[#68716B]">
                <div className="flex items-center justify-between text-[#252A25] font-semibold mb-0.5">
                  <span>CFP 2025 Prototype</span>
                  <span className="text-[#245B3C] font-mono">v2.5</span>
                </div>
                <div className="leading-tight">
                  TEXMiN / IIT (ISM) Dhanbad Mining Challenge
                </div>
              </div>
            )}

            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs text-slate-500 hover:text-[#252A25] hover:bg-slate-100 rounded-lg transition-colors"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-[11px] font-medium">Collapse Navigation</span>
                </>
              )}
            </button>
          </div>
        </aside>

        {/* Main Content View Container */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Breadcrumbs (omitted on landing page) */}
          {activeView !== 'landing' && <Breadcrumbs />}

          {/* Main View Area */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>

          {/* Public-Sector Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};
