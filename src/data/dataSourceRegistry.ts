export interface DataSourceEntry {
  id: string;
  sourceName: string;
  sourceUrl: string;
  reportingPeriod: string;
  mineral: string;
  geographicCoverage: string;
  unit: string;
  value: string;
  verificationStatus: 'Verified Official' | 'Published Enterprise' | 'Illustrative Demo Telemetry';
  notes: string;
}

export const DATA_SOURCE_REGISTRY: DataSourceEntry[] = [
  {
    id: 'SRC-01',
    sourceName: 'Department of Mines & Geology, Govt. of Jharkhand',
    sourceUrl: 'https://minerals.jharkhand.gov.in/',
    reportingPeriod: '2023-24',
    mineral: 'Major & Minor Minerals (State Total)',
    geographicCoverage: 'All 24 Districts of Jharkhand',
    unit: 'Statewide Mining Governance',
    value: 'Statutory Mining Lease Rules & District Mineral Foundation (DMF)',
    verificationStatus: 'Verified Official',
    notes: 'Primary statutory regulatory portal for mineral concessions, royalty regimes, and DMF trust funds in Jharkhand.',
  },
  {
    id: 'SRC-02',
    sourceName: 'Directorate of Mines & Geology GIS Portal',
    sourceUrl: 'https://gis1.jharkhand.gov.in/dgm/',
    reportingPeriod: 'Live GIS Registry',
    mineral: 'Geological Mineral Boundaries',
    geographicCoverage: 'Jharkhand State Coordinates',
    unit: 'Spatial Lease Polygons',
    value: 'Cadastral & Geological Basemap Layers',
    verificationStatus: 'Verified Official',
    notes: 'Web-GIS spatial infrastructure maintained by the Directorate of Mines for spatial boundary verification.',
  },
  {
    id: 'SRC-03',
    sourceName: 'Ministry of Coal, Government of India',
    sourceUrl: 'https://coal.gov.in/',
    reportingPeriod: 'Annual Report 2023-24',
    mineral: 'Coal & Lignite',
    geographicCoverage: 'All Indian Coalfields (Jharia, Bokaro, Karanpura, Rajmahal)',
    unit: 'Billion Tonnes (BT)',
    value: 'National Coal Inventory (~378 Billion Tonnes total reserves)',
    verificationStatus: 'Verified Official',
    notes: 'Apex federal ministry regulating coal extraction, coking coal reserves, and rail evacuation corridors.',
  },
  {
    id: 'SRC-04',
    sourceName: 'Indian Bureau of Mines (IBM) - Mineral Yearbook',
    sourceUrl: 'https://ibm.gov.in/',
    reportingPeriod: '2022-23 (Latest Published)',
    mineral: 'Iron Ore (Hematite & Magnetite)',
    geographicCoverage: 'Singhbhum & Noamundi Belts',
    unit: 'Million Tonnes (MT)',
    value: 'Jharkhand holds ~26% of India\'s total hematite iron ore reserves',
    verificationStatus: 'Verified Official',
    notes: 'Comprehensive statutory technical survey of India\'s non-coal major mineral reserves, grades, and production.',
  },
  {
    id: 'SRC-05',
    sourceName: 'Coal India Limited (CIL) - Operational Performance',
    sourceUrl: 'https://www.coalindia.in/',
    reportingPeriod: 'FY 2023-24',
    mineral: 'Coking & Non-Coking Coal',
    geographicCoverage: 'BCCL, CCL, ECL Subsidiary Mines in Jharkhand',
    unit: 'Million Tonnes',
    value: 'Subsidiaries produced over 200 MT raw coal across Jharkhand fields',
    verificationStatus: 'Verified Official',
    notes: 'Operational reports of state subsidiaries operating opencast and underground mines.',
  },
  {
    id: 'SRC-06',
    sourceName: 'SmartMine AI Simulated Telemetry Engine',
    sourceUrl: 'Internal Physics Heuristic Engine',
    reportingPeriod: 'Real-Time Simulated Stream',
    mineral: 'Synthetic Mining Telematics',
    geographicCoverage: 'Illustrative Jharia Open Cast Pit No. 4',
    unit: 'Vibration (mm/s), Temp (°C), Fuel (L/h)',
    value: 'Simulated 20-Machine Dataset for Academic Prototype',
    verificationStatus: 'Illustrative Demo Telemetry',
    notes: 'Synthetic engineering telematics developed for TEXMiN / IIT (ISM) CFP 2025 demonstration.',
  },
];
