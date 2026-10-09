import React, { useState } from 'react';
import { MiningProvider, useMining } from './context/MiningContext';
import { AppShell } from './components/layout/AppShell';
import { NotificationsModal } from './components/layout/NotificationsModal';
import { MachineDetailModal } from './components/common/MachineDetailModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { OverviewPage } from './pages/OverviewPage';
import { CoalfieldExplorerPage } from './pages/CoalfieldExplorerPage';
import { EquipmentMonitoringPage } from './pages/EquipmentMonitoringPage';
import { PredictionsPage } from './pages/PredictionsPage';
import { DigitalTwinPage } from './pages/DigitalTwinPage';
import { SimulationPage } from './pages/SimulationPage';
import { SustainabilityPage } from './pages/SustainabilityPage';
import { ReportsPage } from './pages/ReportsPage';

// Legacy fallback pages
import { RegionsPage } from './pages/RegionsPage';
import { StudioPage } from './pages/StudioPage';
import { LiveOperationsPage } from './pages/LiveOperationsPage';
import { EquipmentHealthPage } from './pages/EquipmentHealthPage';
import { OptimizationPage } from './pages/OptimizationPage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { 
    activeView, 
    selectedMachine, 
    setSelectedMachine, 
    equipment 
  } = useMining();

  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <AppShell onOpenNotifications={() => setNotificationsOpen(true)}>
      {/* 8 Primary Modules */}
      {activeView === 'overview' && <OverviewPage />}
      {activeView === 'coalfields' && <CoalfieldExplorerPage />}
      {activeView === 'equipment' && <EquipmentMonitoringPage />}
      {activeView === 'predictions' && <PredictionsPage />}
      {activeView === 'digital-twin' && <DigitalTwinPage />}
      {activeView === 'simulation' && <SimulationPage />}
      {activeView === 'sustainability' && <SustainabilityPage />}
      {activeView === 'reports' && <ReportsPage />}
      {activeView === 'landing' && <LandingPage />}

      {/* Legacy Aliases & Fallbacks */}
      {activeView === 'regions' && <CoalfieldExplorerPage />}
      {activeView === 'live-ops' && <EquipmentMonitoringPage />}
      {activeView === 'equipment-health' && <EquipmentMonitoringPage />}
      {activeView === 'studio' && <DigitalTwinPage />}
      {activeView === 'optimization' && <OptimizationPage />}
      {activeView === 'settings' && <SettingsPage />}

      {/* Global Notifications Modal Drawer */}
      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        onSelectMachine={(machineId) => {
          const m = equipment.find(e => e.id === machineId);
          if (m) setSelectedMachine(m);
        }}
      />

      {/* Global Machine Detail Inspection Drawer */}
      <MachineDetailModal
        machine={selectedMachine}
        onClose={() => setSelectedMachine(null)}
      />
    </AppShell>
  );
};

export function App() {
  return (
    <MiningProvider>
      <AppContent />
    </MiningProvider>
  );
}

export default App;
