import React, { useState } from 'react';
import { 
  Layers, 
  MapPin, 
  Wrench, 
  Box, 
  Cpu, 
  Leaf, 
  FileText, 
  Search, 
  Bell, 
  Menu, 
  X, 
  Play, 
  Pause,
  Award,
  ChevronDown
} from 'lucide-react';
import { useMining, AppView } from '../../context/MiningContext';

interface NavbarProps {
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNotifications }) => {
  const { 
    activeView, 
    setActiveView, 
    telemetryActive, 
    toggleTelemetry, 
    alerts,
    selectedMineSite,
    setSelectedMineSite
  } = useMining();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  const navItems: { id: AppView; label: string; icon: React.ElementType }[] = [
    { id: 'landing', label: 'Home', icon: Layers },
    { id: 'regions', label: 'Mining Regions', icon: MapPin },
    { id: 'live-ops', label: 'Equipment & Operations', icon: Wrench },
    { id: 'studio', label: 'Engineering Studio', icon: Wrench },
    { id: 'digital-twin', label: 'Digital Twin', icon: Box },
    { id: 'simulation', label: 'Simulation Lab', icon: Cpu },
    { id: 'sustainability', label: 'Sustainability', icon: Leaf },
    { id: 'reports', label: 'Reports & Sources', icon: FileText },
  ];

  const unacknowledgedCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#E2E8F0] shadow-sm">
      {/* 1. Top Information Strip */}
      <div className="bg-[#245B3C] text-white py-1.5 px-4 sm:px-6 lg:px-8 text-[11px] font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wide text-[#E9B949] uppercase font-mono">
              JHARKHAND MINING INTELLIGENCE
            </span>
            <span className="text-white/40">|</span>
            <span className="text-white/90 hidden sm:inline">
              Public Information & Engineering Cyber-Physical Platform
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px] text-white/80">
            <span className="hidden md:inline">
              Ref: Jharkhand Dept. of Mines & Geology | Ministry of Coal
            </span>
            <span className="hidden md:inline text-white/40">|</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${telemetryActive ? 'bg-[#4ADE80] animate-pulse' : 'bg-[#94A3B8]'}`} />
              <span className="font-mono">{telemetryActive ? 'SIMULATION RUNNING' : 'SIMULATION PAUSED'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Custom SmartMine AI Mineral Logo */}
          <div 
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            {/* Geometric Mineral Polygon Icon */}
            <div className="w-9 h-9 rounded-lg bg-[#245B3C] flex items-center justify-center text-white shadow-sm border border-[#327450]">
              <Layers className="w-5 h-5 text-[#E9B949]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-[#252A25]">
                  SmartMine<span className="text-[#245B3C] font-black">AI</span>
                </span>
                <span className="text-[9px] uppercase px-1.5 py-0.2 rounded font-mono font-bold bg-[#E8F0EC] text-[#245B3C] border border-[#65866B]/30">
                  Jharkhand
                </span>
              </div>
              <span className="text-[10px] text-[#68716B] block -mt-1 font-medium">
                Mining Intelligence & Operations Portal
              </span>
            </div>
          </div>

          {/* Center: Search Field */}
          <div className="hidden lg:flex items-center relative flex-1 max-w-xs mx-4">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search regions, minerals, machines..."
              value={navSearch}
              onChange={e => setNavSearch(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && navSearch) {
                  setActiveView('regions');
                }
              }}
              className="w-full pl-8 pr-3 py-1.5 bg-[#F8F8F4] border border-[#E2E8F0] rounded-lg text-xs text-[#252A25] placeholder-[#94A3B8] focus:outline-none focus:border-[#245B3C] focus:bg-white transition-colors"
            />
          </div>

          {/* Right Actions: Sim Controls, Notifications & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Simulation Pause / Resume */}
            <button
              onClick={toggleTelemetry}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                telemetryActive
                  ? 'bg-[#FEF3C7] border-[#FDE047] text-[#B45309] hover:bg-[#FDE047]'
                  : 'bg-[#DCFCE7] border-[#86EFAC] text-[#15803D] hover:bg-[#86EFAC]'
              }`}
              title={telemetryActive ? 'Pause simulated telemetry' : 'Resume simulated telemetry'}
            >
              {telemetryActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{telemetryActive ? 'Pause Sim' : 'Resume Sim'}</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg bg-[#F8F8F4] hover:bg-[#E2E8F0] border border-[#E2E8F0] text-[#252A25] transition-colors"
              title="Operational Alerts"
            >
              <Bell className="w-4 h-4" />
              {unacknowledgedCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#DC2626] text-[9px] font-bold text-white">
                  {unacknowledgedCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#F8F8F4] border border-[#E2E8F0] text-[#252A25]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 3. Main Navigation Links (Desktop Row) */}
        <nav className="hidden lg:flex items-center gap-1 mt-3 pt-2.5 border-t border-[#F1F5F9] text-xs font-semibold overflow-x-auto">
          {navItems.map(item => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#245B3C] text-white shadow-sm'
                    : 'text-[#68716B] hover:text-[#245B3C] hover:bg-[#E8F0EC]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#E2E8F0] space-y-1 animate-in fade-in">
            {navItems.map(item => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-xs font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#245B3C] text-white'
                      : 'text-[#252A25] hover:bg-[#F8F8F4]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#E9B949]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
