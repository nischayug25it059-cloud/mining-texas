# SmartMine AI — Jharkhand Mining Intelligence & Coalfield Explorer Portal

An enterprise-grade, public-sector inspired cyber-physical mining intelligence and geospatial exploration platform focused on **Jharkhand, India**. Developed for the **TEXMiN / IIT (ISM) Dhanbad Smart Mining Challenge (CFP 2025)**.

---

> For full technical architecture, design system specifications, and verification details, see [WALKTHROUGH.md](./WALKTHROUGH.md).

## 🏛️ Platform Highlights

1. **Jharkhand Coalfield Explorer (Real Satellite GIS)**:
   - Genuine high-resolution satellite imagery powered by **Leaflet** and **Esri World Imagery**, with **OpenTopoMap** terrain and **OpenStreetMap** cartographic fallbacks.
   - Authentic GeoJSON boundaries and geological coordinates for 9 major mineral formations:
     - *Jharia Coalfield* (Dhanbad — Damodar Valley Gondwana basin)
     - *East Bokaro Coalfield* (Bokaro — Bermo/Kargali washery complex)
     - *West Bokaro Coalfield* (Ramgarh — Mandu/Ghatotand)
     - *North Karanpura Coalfield* (Chatra/Hazaribagh — Magadh & Amrapali megapits)
     - *South Karanpura Coalfield* (Ramgarh — Barkakana/Sayal/Argada thermal belt)
     - *Rajmahal Coalfield* (Godda — Hura-C opencast with captive NTPC MGR rail loop)
     - *Noamundi Iron Ore Region* (West Singhbhum — Saranda hematite basin)
     - *Singhbhum Copper & Uranium Belt* (East Singhbhum — Precambrian shear zone)
     - *Lohardaga Bauxite Plateau* (Lohardaga/Gumla — Bagru hill lateritic pats)
   - Interactive polygon inspection drawer displaying stratigraphy, key operating entities (BCCL, CCL, Tata Steel, SAIL, HCL), verified statistics, and official statutory links.

2. **AI Equipment Health Center**:
   - Comprehensive telemetry monitoring for 22 heavy mining machines (hydraulic excavators, mining haul trucks, drill rigs, in-pit conveyors, wheel loaders).
   - Dynamic calculated summary indicators: *Healthy*, *Requires Attention*, *High-Risk*, and *Offline/Maintenance*.
   - Searchable, sortable fleet table with multi-facet filters and RFC-4180 CSV export.

3. **Transparent Rule-Based AI Prediction Engine**:
   - Explainable deterministic diagnostic pipeline: `Sensors → Validation → Feature Extraction → Health Assessment → Risk Classification → Recommendations`.
   - Equipment-specific operational envelopes conforming to **ISO 10816** mechanical vibration envelopes and thermal rate-of-rise ($\Delta T$, $\Delta V$).
   - Fail-safe missing/stale telemetry detection (reports *"Insufficient data"* with Risk *"Unknown"* rather than false-positive health).

4. **Interactive AI Maintenance Insights**:
   - Dynamic, data-backed operational advisories (thermal threshold proximity, vibration acceleration, overdue service, low fleet utilization).
   - Stateful alert acknowledgment and "Run Health Assessment" action.

5. **Machine Detail Dossier & Telemetry Trends**:
   - Dual-axis trend charts utilizing actual asset telemetry.
   - Time filters (`1 Hour`, `24 Hours`, `7 Days`).
   - Preventative maintenance service history and explainable diagnostic factor weights.

6. **Opencast Digital Twin & Equipment Studio**:
   - 3D bench terrain scene with sandstone/earth palette (`#FAF8F5`, `#D8C3A5`) and green haul roads.
   - 2D schematic mine layout (benches, ramps, loading points, conveyor lines, dispatch).
   - Interactive vector SVG technical diagrams (Hydraulic Excavator, Haul Truck, Conveyor, Blast Hole Drill Rig).

7. **Parametric Simulation Lab**:
   - First-principles physics calculations modeling cycle times, queue delays, production tonnes, and fuel cost per tonne with preset comparisons and CSV export.

8. **Statutory Data Sources Registry**:
   - Direct citations and references to the Department of Mines & Geology, Govt. of Jharkhand, Ministry of Coal, Indian Bureau of Mines (IBM), and Coal India Limited (CIL).

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React Icons
- **GIS Mapping**: Leaflet, Esri World Imagery, OpenTopoMap, GeoJSON
- **3D Graphics**: Three.js
- **Charts & Telemetry**: Recharts

---

## 🚀 Quickstart & Local Setup

```bash
# Clone the repository
git clone https://github.com/nischayug25it059-cloud/mining-texas.git
cd mining-texas

# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📜 Disclaimer & Provenance

This platform is developed as an academic engineering prototype for the **TEXMiN / IIT (ISM) Dhanbad Smart Mining Challenge (CFP 2025)**. 
- Machine telemetry, IoT sensor streams, and fleet health indices are generated via synthetic demonstration models.
- Geological basin data and official statistics are derived from published statutory reports by the Ministry of Coal, Indian Bureau of Mines, and the Department of Mines & Geology, Government of Jharkhand.
