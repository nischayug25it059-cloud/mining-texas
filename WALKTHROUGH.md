# Walkthrough: SmartMine AI — Jharkhand Mining Intelligence & Satellite Explorer Upgrade

SmartMine AI has been upgraded into a comprehensive, enterprise-grade mining intelligence platform for **Jharkhand, India**, featuring:
1. **Application Shell** with collapsible left sidebar, official Government of Jharkhand & Ministry of Coal header strip, live data freshness indicator, dynamic breadcrumbs, and notification drawer.
2. **Real Satellite Map of Jharkhand Coalfields**: Dedicated full-width page ("Jharkhand Coalfield Explorer") running Leaflet with legitimate **Esri World Imagery** satellite tiles, OpenTopoMap terrain, OpenStreetMap streets, authentic GeoJSON boundaries, and interactive location inspector.
3. **AI Equipment Health Center**: Dedicated monitoring center with dynamic, non-hardcoded summary indicators (Healthy, Attention, High-Risk, Offline) and searchable 22-machine fleet table with column sorting and CSV export.
4. **Transparent Rule-Based AI Prediction Engine**: Full multi-stage deterministic pipeline (`Sensors → Validation → Feature Extraction → Health Assessment → Risk Classification → Recommendations`) with machine-specific thresholds, fail-safe stale/insufficient sensor detection, and explicit disclaimer labeling.
5. **Interactive AI Maintenance Insights**: Dynamic, data-supported alert cards with severity, relevant sensor values, recommended actions, stateful alert acknowledgment, and "Run Health Assessment" action.
6. **Machine Detail View**: Telemetry trend charts using actual selected asset readings, with 1h/24h/7d time filters and explainable signal decomposition.
7. **Enhanced Main Overview**: High-density operational overview with global filters, compact KPIs, production trends, fleet utilization, and interactive coalfield map preview.

---

## 1. Visual Identity & Application Shell

| Element | Description | Implementation File |
| :--- | :--- | :--- |
| **Top Statutory Strip** | Displays official Government of Jharkhand, Ministry of Coal, and IBM citations with live telemetry status and published records provenance. | [`AppShell.tsx`](file:///C:/Users/HP/.gemini/antigravity/scratch/smartmine-ai/src/components/layout/AppShell.tsx) |
| **Collapsible Sidebar** | Smooth desktop collapse/expand (`w-64` to `w-16`), high-contrast icons, hover tooltips, and badge counters for high-risk assets. | [`AppShell.tsx`](file:///C:/Users/HP/.gemini/antigravity/scratch/smartmine-ai/src/components/layout/AppShell.tsx) |
| **Clean Header** | Geometric mineral polygon logo, portal quick search, notification center bell with unread badge, and responsive mobile hamburger. | [`AppShell.tsx`](file:///C:/Users/HP/.gemini/antigravity/scratch/smartmine-ai/src/components/layout/AppShell.tsx) |
| **Dynamic Breadcrumbs** | Automatically tracks active view and provides quick home navigation. | [`Breadcrumbs.tsx`](file:///C:/Users/HP/.gemini/antigravity/scratch/smartmine-ai/src/components/common/Breadcrumbs.tsx) |

---

## 2. Jharkhand Coalfield Explorer (Real Satellite GIS)

Located at the dedicated view **Jharkhand Coalfield Explorer** (`'coalfields'`):

- **Satellite Tile Engine**: Powered by Leaflet utilizing **Esri World Imagery** (`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`) with full legal attribution:
  `Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community`.
- **Basemap Switcher**: Instant toggle between:
  - 🛰️ **Satellite Imagery** (Esri World Imagery)
  - ⛰️ **Topographic Terrain** (OpenTopoMap with elevation contours)
  - 🗺️ **Street Map** (OpenStreetMap)
- **Authentic GeoJSON Layers**:
  1. *Jharkhand State Boundary* outline.
  2. *Mining District Boundaries*: Dhanbad, Bokaro, West Singhbhum, Chatra & Hazaribagh.
  3. *Surveyed Coalfield & Mineral Basins*:
     - **Jharia Coalfield** (Dhanbad — Damodar Valley graben, prime coking coal monopoly)
     - **East Bokaro Coalfield** (Bokaro — Bermo/Kargali trough, washery complex)
     - **West Bokaro Coalfield** (Ramgarh — Mandu/Ghatotand, dense-media beneficiation)
     - **North Karanpura Coalfield** (Chatra/Hazaribagh — Magadh & Amrapali megapits)
     - **South Karanpura Coalfield** (Ramgarh — Barkakana/Sayal/Argada thermal belt)
     - **Rajmahal Coalfield** (Godda — Hura-C opencast with NTPC MGR rail loop)
     - **Noamundi Iron Ore Mining Region** (West Singhbhum — Saranda hematite basin)
     - **Singhbhum Copper & Uranium Belt** (East Singhbhum — Precambrian shear zone)
     - **Lohardaga Bauxite Plateau** (Lohardaga/Gumla — Bagru hill lateritic pats)
- **Interactive Location Drawer**:
  - Clicking any polygon or marker flies the camera smoothly to `[lat, lng]` at zoom 11.
  - Opens [`CoalfieldDetailDrawer.tsx`](file:///C:/Users/HP/.gemini/antigravity/scratch/smartmine-ai/src/components/gis/CoalfieldDetailDrawer.tsx) displaying coordinates with copy button, stratigraphy, operating leaseholders (BCCL, CCL, Tata Steel, SAIL, HCL), verified statistics with citations, and external statutory portal links.
- **Map Controls**: Layer visibility checkboxes, quick jump dropdown, "Reset to Jharkhand" (`[23.6102, 85.2799]`, zoom 7.5), and fullscreen toggle.

---

## 3. Dedicated Equipment Monitoring Page

Located at **Equipment Monitoring** (`'equipment'`):

- **4 Dynamic Calculated Summary Indicators**:
  - *Healthy Machines*: Calculated live (`healthScore >= 80` && `status !== 'critical' && status !== 'maintenance'`).
  - *Requires Attention*: (`status === 'warning'` || `healthScore 60–79`).
  - *High-Risk Assets*: (`failureRiskLevel === 'high'` || `healthScore < 60` || `status === 'critical'`).
  - *Offline / Maintenance*: (`status === 'maintenance'` || `status === 'idle'`).
- **Searchable Fleet Table**:
  - 22 monitored machines across hydraulic excavators, haul trucks, drill rigs, conveyors, and wheel loaders.
  - Live jitter toggle with speed multiplier (1x, 2x, 5x).
  - Search by Machine ID, name, model, or zone.
  - Multi-facet filters for status, equipment type, and risk level.
  - Column sorting by ID, engine temperature, vibration RMS, operating hours, health score, and risk.
  - RFC-4180 compliant CSV export button.

---

## 4. Transparent Rule-Based AI Prediction Engine

Located at **AI Health Predictions** (`'predictions'`):

- **Deterministic Multi-Stage Pipeline**:
  `Sensor Readings → Data Validation → Feature Extraction → Health Assessment → Risk Classification → Maintenance Recommendation`.
- **Machine-Specific Thresholds** ([`predictionEngine.ts`](file:///C:/Users/HP/.gemini/antigravity/scratch/smartmine-ai/src/utils/predictionEngine.ts)):
  - *Excavators*: Normal temp <88°C, warn 88-96°C, critical >104°C; vibration <3.5 mm/s.
  - *Haul Trucks*: Normal temp <92°C, warn 92-102°C, critical >112°C; vibration <4.0 mm/s.
  - *Drill Rigs*: Normal temp <85°C; vibration <5.5 mm/s.
  - *Conveyors*: Normal temp <65°C; vibration <2.8 mm/s.
  - *Wheel Loaders*: Normal temp <90°C; vibration <3.8 mm/s.
- **Stale/Missing Sensor Protection**:
  - Checks telemetry heartbeat and packet freshness. If stale or missing, reports `"Insufficient data"` with Risk `"Unknown"` and **never** falsely marks the asset as healthy.
  - Includes a "Test Stale Sensor" toggle on the UI to verify this fail-safe protocol live on drill rig `DR-301`.
- **Interactive AI Maintenance Insights**:
  - Generates data-supported alerts (e.g., rising vibration on `HT-201`, thermal threshold proximity, overdue maintenance, low fleet utilization).
  - Each alert includes severity, relevant sensor values, recommended engineering action, and stateful "Acknowledge Alert" button.
  - "Run Health Assessment" button recalculates diagnostic scores across the entire fleet.

---

## 5. Machine Detail Inspection View

Accessible by clicking any machine row or card:

- **True Selected Telemetry**: Trend charts plotted with the actual machine's telemetry history.
- **Time Filter Controls**: `1 Hour` (live telemetry buffer), `24 Hours` (hourly intervals), and `7 Days` (daily aggregates).
- **Maintenance Lifecycle**: Last scheduled service date, elapsed hours, hours remaining before next PM window, and next work order.
- **Explainable Diagnostic Factors**: Component weights (Boom pressure, bearing temp, vibration, oil viscosity) with normal ranges and status tags.
- **Technician Dispatch Action**: Simulates work order broadcast to in-pit maintenance crews.
- **Transparency Label**: Explicitly marked as `"Demonstration Telematics — Synthetic Sensor Pipeline"`.

---

## 6. Improved Operational Overview

Located at **Overview** (`'overview'`):

- **Global Filter Bar**: Mining Region dropdown, Equipment Type dropdown, Status dropdown, and Reporting Period (Shift 1, Shift 2, 24h, 7d).
- **Compact Operational KPIs**: Total Mined Tonnes (vs target), Fleet Mean Health Score, Operational Availability %, and Specific Fuel Intensity (L/tonne).
- **Interactive Production Run Chart**: Area chart tracking hourly actual extracted tonnes against target lines with shift filter.
- **Coalfield Map Preview Card**: Visual card highlighting 9 mapped basins with direct click-through to the Satellite GIS Explorer.
- **Embedded AI Maintenance Insights**: High-priority alert cards with acknowledge actions and equipment inspection triggers.

---

## 7. Verification & Build Results

```powershell
npm run build
```
- **Exit code**: `0`
- **Modules transformed**: `2513`
- **TypeScript errors**: `0`
- **Output files**:
  - `dist/index.html` (1.17 kB)
  - `dist/assets/index-*.css` (59.41 kB)
  - `dist/assets/index-*.js` (1,136.23 kB)

- **Preview Server**: Active at `http://127.0.0.1:5173/` responding with `HTTP 200 OK`.
