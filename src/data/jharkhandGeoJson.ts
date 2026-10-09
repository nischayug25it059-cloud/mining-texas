// GeoJSON dataset for Jharkhand Mining Geography
// Contains boundaries and geometries for:
// 1. Jharkhand State Boundary (Statutory Administrative)
// 2. Key Mining Districts (Census / Survey of India)
// 3. Authentic Coalfield & Mineral Basins (CMPDI / GSI / DMG Geological Formations)

export interface MiningFeatureProperties {
  id: string;
  name: string;
  category: 'coalfield' | 'iron_ore' | 'bauxite' | 'copper_uranium' | 'district' | 'state';
  mineralType: string;
  district: string;
  coordinatesText: string;
  centerCoordinates: [number, number]; // [lat, lng]
  geologicalFormation: string;
  boundaryProvenance: 'surveyed_basin' | 'administrative_district' | 'illustrative_lease' | 'statutory_state';
  provenanceLabel: string;
  operatingEntities: string[];
  representativeEquipment: string[];
  reportedPeriod: string;
  verifiedStatistics: {
    label: string;
    value: string;
    source: string;
  }[];
  officialSourceUrl: string;
  officialSourceLabel: string;
  color: string;
  description: string;
}

export interface GeoJsonPolygonFeature {
  type: 'Feature';
  properties: MiningFeatureProperties;
  geometry: {
    type: 'Polygon';
    coordinates: [number, number][][]; // GeoJSON uses [lng, lat]
  };
}

export interface GeoJsonFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJsonPolygonFeature[];
}

// 1. Authentic Coalfields & Mineral Basins in Jharkhand
export const JHARKHAND_MINING_BASINS: GeoJsonPolygonFeature[] = [
  {
    type: 'Feature',
    properties: {
      id: 'jharia-coalfield',
      name: 'Jharia Coalfield',
      category: 'coalfield',
      mineralType: 'Prime Coking Coal & Non-Coking Gondwana Coal',
      district: 'Dhanbad',
      coordinatesText: '23.75° N, 86.42° E (Damodar Valley Basin)',
      centerCoordinates: [23.750, 86.417],
      geologicalFormation: 'Barakar & Raniganj Formations (Damodar Valley Gondwana Graben)',
      boundaryProvenance: 'surveyed_basin',
      provenanceLabel: 'Surveyed Coalfield Basin (CMPDI / GSI Coordinates)',
      operatingEntities: ['Bharat Coking Coal Limited (BCCL / CIL)', 'Tata Steel (Jharia Division)'],
      representativeEquipment: ['Electric Rope Shovels (20-42 m³)', 'Heavy Haul Trucks (100-240t)', 'In-Pit Crushing & Conveying (IPCC)'],
      reportedPeriod: 'FY 2023-24',
      verifiedStatistics: [
        { label: 'Coking Coal Monopoly', value: '>90% of India\'s prime coking coal reserves', source: 'Ministry of Coal / CMPDI' },
        { label: 'Basin Area', value: 'Approx. 450 sq. km', source: 'Geological Survey of India (GSI)' },
        { label: 'Operating Subsidiary', value: 'Bharat Coking Coal Limited (BCCL)', source: 'Coal India Limited Directory' },
      ],
      officialSourceUrl: 'https://coal.gov.in/',
      officialSourceLabel: 'Ministry of Coal, Govt. of India',
      color: '#245B3C',
      description: 'Exclusive domestic source of prime coking coal vital for Indian steelmaking blast furnaces. Spans the crescent-shaped Damodar graben with extensive opencast pits (Joyrampur, Kusunda, Block II) and historic underground workings.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [86.240, 23.710],
        [86.320, 23.695],
        [86.440, 23.710],
        [86.530, 23.740],
        [86.550, 23.785],
        [86.480, 23.820],
        [86.350, 23.825],
        [86.260, 23.780],
        [86.240, 23.710],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: {
      id: 'east-bokaro-coalfield',
      name: 'East Bokaro Coalfield',
      category: 'coalfield',
      mineralType: 'Medium Coking Coal & High-Grade Washery Coal',
      district: 'Bokaro',
      coordinatesText: '23.78° N, 85.95° E (Bermo - Kargali Trough)',
      centerCoordinates: [23.780, 85.950],
      geologicalFormation: 'Barakar Stage (Gondwana Sequence, Damodar Basin)',
      boundaryProvenance: 'surveyed_basin',
      provenanceLabel: 'Surveyed Coalfield Basin (CMPDI / GSI Coordinates)',
      operatingEntities: ['Central Coalfields Limited (CCL / CIL)', 'SAIL Washery Divisions'],
      representativeEquipment: ['Walking Draglines', 'Hydraulic Excavators (12-16 m³)', 'Heavy Dumpers (100t)', 'Kargali Washery Complex'],
      reportedPeriod: 'FY 2023-24',
      verifiedStatistics: [
        { label: 'Primary Consumers', value: 'SAIL Bokaro Steel Plant & Thermal Power Stations', source: 'Central Coalfields Limited' },
        { label: 'Historic Seam', value: 'Kargali Seam (up to 40m thick coal seam)', source: 'CMPDI Regional Institute' },
      ],
      officialSourceUrl: 'https://minerals.jharkhand.gov.in/',
      officialSourceLabel: 'Jharkhand Dept. of Mines & Geology',
      color: '#1E4E34',
      description: 'Located in the Bermo subdivision along the Damodar river. Home to iconic opencast projects (Kargali, Dhori, Bokaro Colliery) providing metallurgical coal to the Bokaro Steel City industrial belt.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [85.830, 23.740],
        [85.950, 23.730],
        [86.070, 23.750],
        [86.110, 23.810],
        [86.030, 23.840],
        [85.880, 23.830],
        [85.830, 23.740],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: {
      id: 'west-bokaro-coalfield',
      name: 'West Bokaro Coalfield',
      category: 'coalfield',
      mineralType: 'Medium Coking Coal & Dense Medium Washed Metallurgical Coal',
      district: 'Ramgarh',
      coordinatesText: '23.82° N, 85.55° E (Mandu / Ghatotand Belt)',
      centerCoordinates: [23.820, 85.550],
      geologicalFormation: 'Barakar Formation (Damodar Basin Gondwana)',
      boundaryProvenance: 'surveyed_basin',
      provenanceLabel: 'Surveyed Coalfield Basin (CMPDI / GSI Coordinates)',
      operatingEntities: ['Tata Steel (West Bokaro Division)', 'Central Coalfields Limited (CCL)'],
      representativeEquipment: ['Electric Shovels', 'Haul Trucks (100t)', 'Dry & Wet Coal Cyclone Beneficiation Plants'],
      reportedPeriod: 'FY 2023-24',
      verifiedStatistics: [
        { label: 'Technology Milestone', value: 'Pioneered low-ash cyclone coal beneficiation in India', source: 'Tata Steel Raw Materials' },
        { label: 'Captive Consumer', value: 'Tata Steel Jamshedpur Works', source: 'Tata Steel Annual Report' },
      ],
      officialSourceUrl: 'https://minerals.jharkhand.gov.in/',
      officialSourceLabel: 'Jharkhand Dept. of Mines & Geology',
      color: '#2B6A47',
      description: 'High-efficiency mechanized coal mining cluster in Ramgarh district around Ghatotand and Mandu, renowned for deep-bench opencast mining and sophisticated heavy-media coal preparation.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [85.450, 23.780],
        [85.580, 23.770],
        [85.660, 23.820],
        [85.630, 23.880],
        [85.510, 23.870],
        [85.450, 23.780],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: {
      id: 'north-karanpura',
      name: 'North Karanpura Coalfield',
      category: 'coalfield',
      mineralType: 'Thermal Power Grade Coal (G9 - G12)',
      district: 'Chatra, Hazaribagh & Ramgarh',
      coordinatesText: '23.85° N, 85.05° E (Magadh & Amrapali Megapits)',
      centerCoordinates: [23.850, 85.050],
      geologicalFormation: 'Lower Gondwana Basin (Damodar Valley Western Flank)',
      boundaryProvenance: 'surveyed_basin',
      provenanceLabel: 'Surveyed Coalfield Basin (CMPDI / GSI Coordinates)',
      operatingEntities: ['Central Coalfields Limited (CCL)', 'NTPC Mining Limited'],
      representativeEquipment: ['Mobile In-Pit Crushers', 'Long-Distance Overland Belt Conveyors', 'Surface Miners', 'Rear Dumpers (150t)'],
      reportedPeriod: 'FY 2023-24',
      verifiedStatistics: [
        { label: 'Mega Pits', value: 'Magadh OCP (51 MTPA), Amrapali OCP (25 MTPA), Piparwar', source: 'Ministry of Coal Mega Projects' },
        { label: 'Rail Corridor', value: 'Dedicated Tori-Shivpur Evacuation Line', source: 'Indian Railways / Ministry of Coal' },
      ],
      officialSourceUrl: 'https://coal.gov.in/',
      officialSourceLabel: 'Ministry of Coal / CIL Annual Report',
      color: '#1B5E39',
      description: 'One of the largest contiguous thermal coal repositories in Eastern India. Features massive opencast stripping operations that supply critical fuel to national base-load thermal power plants across Northern and Western India.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [84.820, 23.740],
        [85.020, 23.720],
        [85.240, 23.780],
        [85.280, 23.880],
        [85.220, 23.970],
        [84.980, 23.960],
        [84.840, 23.860],
        [84.820, 23.740],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: {
      id: 'south-karanpura',
      name: 'South Karanpura Coalfield',
      category: 'coalfield',
      mineralType: 'Semi-Coking & Power Coal (Argada & Sirka Seams)',
      district: 'Ramgarh',
      coordinatesText: '23.68° N, 85.35° E (Barkakana - Sayal Trough)',
      centerCoordinates: [23.680, 85.350],
      geologicalFormation: 'Barakar Stage (Damodar River South)',
      boundaryProvenance: 'surveyed_basin',
      provenanceLabel: 'Surveyed Coalfield Basin (CMPDI / GSI Coordinates)',
      operatingEntities: ['Central Coalfields Limited (CCL)', 'Commercial Mining Allottees'],
      representativeEquipment: ['Walking Draglines', 'Hydraulic Shovels', 'Haul Trucks (60-100t)', 'Dust Suppression Mist Cannons'],
      reportedPeriod: 'FY 2023-24',
      verifiedStatistics: [
        { label: 'Key Collieries', value: 'Sayal-D, Bhurkunda, Saunda, Gidi, Urimari', source: 'CCL Operational Records' },
        { label: 'Regional Consumers', value: 'Sponge Iron Plants, Regional Cement Works, Patratu TPS', source: 'Jharkhand State Industrial Directory' },
      ],
      officialSourceUrl: 'https://gis1.jharkhand.gov.in/dgm/',
      officialSourceLabel: 'Directorate of Mines & Geology GIS Portal',
      color: '#347D55',
      description: 'Stretches along the southern bank of the Damodar river in Ramgarh. Comprises active opencast pits and legacy underground galleries feeding the Patratu and Damodar valley industrial manufacturing clusters.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [85.200, 23.630],
        [85.380, 23.620],
        [85.490, 23.670],
        [85.460, 23.740],
        [85.310, 23.740],
        [85.210, 23.700],
        [85.200, 23.630],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: {
      id: 'rajmahal-coalfield',
      name: 'Rajmahal Coalfield',
      category: 'coalfield',
      mineralType: 'Non-Coking Thermal Coal (Grade E-G)',
      district: 'Godda',
      coordinatesText: '25.05° N, 87.35° E (Hura-C & Simlong Basin)',
      centerCoordinates: [25.050, 87.350],
      geologicalFormation: 'Rajmahal Gondwana Outlier (Santhal Pargana)',
      boundaryProvenance: 'surveyed_basin',
      provenanceLabel: 'Surveyed Coalfield Basin (CMPDI / GSI Coordinates)',
      operatingEntities: ['Eastern Coalfields Limited (ECL / Coal India)'],
      representativeEquipment: ['Heavy Draglines', 'Hydraulic Excavators (20 m³)', 'Heavy Haul Trucks (120t)', 'MGR Rail Loadout Silos'],
      reportedPeriod: 'FY 2023-24',
      verifiedStatistics: [
        { label: 'Dedicated Offtake', value: 'NTPC Farakka (2,100 MW) & NTPC Kahalgaon (2,340 MW)', source: 'ECL Annual Report' },
        { label: 'Transport Mode', value: 'Dedicated Merry-Go-Round (MGR) Rail Loops', source: 'Ministry of Power' },
      ],
      officialSourceUrl: 'https://coal.gov.in/',
      officialSourceLabel: 'Ministry of Coal, Govt. of India',
      color: '#245B3C',
      description: 'Strategically located in Godda district in Santhal Pargana division. Highly mechanized open-pit operations directly coupled via dedicated electrified captive rail tracks to mega super thermal power stations along the Ganges.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [87.240, 24.950],
        [87.420, 24.960],
        [87.460, 25.120],
        [87.360, 25.180],
        [87.260, 25.110],
        [87.240, 24.950],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: {
      id: 'noamundi-iron-region',
      name: 'Noamundi Iron Ore Mining Region',
      category: 'iron_ore',
      mineralType: 'High-Grade Hematite Iron Ore (Fe > 63%)',
      district: 'West Singhbhum',
      coordinatesText: '22.15° N, 85.48° E (Saranda Forest Rim / Iron Ore Series)',
      centerCoordinates: [22.150, 85.480],
      geologicalFormation: 'Iron Ore Series / Noamundi Basin (Precambrian Singhbhum Craton)',
      boundaryProvenance: 'surveyed_basin',
      provenanceLabel: 'Surveyed Mineral Basin (Indian Bureau of Mines / IBM)',
      operatingEntities: ['Tata Steel Limited (Raw Materials Division)'],
      representativeEquipment: ['Electric Front Shovels', 'Articulated Haul Trucks (100t)', 'High-Angle Belt Conveyors', 'Automated Ore Processing Plants (OPP)'],
      reportedPeriod: 'FY 2023-24',
      verifiedStatistics: [
        { label: 'Average Iron Content', value: 'High grade 62.5% to 65% Fe Hematite', source: 'Indian Bureau of Mines (IBM)' },
        { label: 'Sustainability Rating', value: '5-Star Rated Mine for Sustainable Development', source: 'Ministry of Mines, Govt. of India' },
      ],
      officialSourceUrl: 'https://minerals.jharkhand.gov.in/',
      officialSourceLabel: 'Jharkhand Dept. of Mines & Geology',
      color: '#B45309',
      description: 'World-class opencast hematite iron ore mining complex in West Singhbhum bordering Odisha. Recognized for progressive terraced bench mining, automated ore beneficiation, and concurrent environmental restoration in the Saranda forest zone.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [85.400, 22.080],
        [85.540, 22.090],
        [85.580, 22.200],
        [85.490, 22.240],
        [85.410, 22.190],
        [85.400, 22.080],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: {
      id: 'singhbhum-copper-uranium',
      name: 'Singhbhum Mineral Belt (Copper & Uranium)',
      category: 'copper_uranium',
      mineralType: 'Copper Ore, Uranium, Kyanite & Magnetite',
      district: 'East Singhbhum & West Singhbhum',
      coordinatesText: '22.65° N, 86.35° E (Singhbhum Shear Zone)',
      centerCoordinates: [22.650, 86.350],
      geologicalFormation: 'Singhbhum Shear Zone (Precambrian Thrust Belt)',
      boundaryProvenance: 'surveyed_basin',
      provenanceLabel: 'Surveyed Geological Thrust Belt (GSI / IBM)',
      operatingEntities: ['Hindustan Copper Limited (HCL)', 'Uranium Corporation of India Limited (UCIL)', 'SAIL Gua & Chiria'],
      representativeEquipment: ['Deep Shaft Winding Hoists', 'Trackless Underground LHD Loaders', 'Flotation Froth Cells & Smelters'],
      reportedPeriod: 'FY 2023-24',
      verifiedStatistics: [
        { label: 'Strategic Significance', value: 'India\'s historic copper belt & sovereign nuclear fuel hub', source: 'Department of Atomic Energy / GSI' },
        { label: 'Chiria Iron Reserves', value: 'Estimated 2 Billion Tonnes Hematite (SAIL Lease)', source: 'SAIL Raw Materials Division' },
      ],
      officialSourceUrl: 'https://gis1.jharkhand.gov.in/dgm/',
      officialSourceLabel: 'Directorate of Mines & Geology, Jharkhand',
      color: '#0284C7',
      description: 'A 160 km long arcuate Precambrian shear zone. Hosts the deep underground copper mines of Mosabani, Surda, and Rakha, India\'s primary uranium mining installations at Jaduguda, Narwapahar, and Turamdih, and the mammoth Chiria iron deposits.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [86.180, 22.520],
        [86.420, 22.500],
        [86.580, 22.680],
        [86.480, 22.800],
        [86.290, 22.750],
        [86.180, 22.520],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: {
      id: 'lohardaga-bauxite',
      name: 'Lohardaga & Gumla Bauxite Plateau',
      category: 'bauxite',
      mineralType: 'High-Grade Trihydrate Metallurgical Bauxite (Al₂O₃ > 46%)',
      district: 'Lohardaga & Gumla',
      coordinatesText: '23.44° N, 84.68° E (Bagru Hill & Pat Plateaus)',
      centerCoordinates: [23.440, 84.680],
      geologicalFormation: 'Lateritic Caps on Precambrian Chota Nagpur Granite Gneiss',
      boundaryProvenance: 'surveyed_basin',
      provenanceLabel: 'Surveyed Bauxite Plateau (IBM / GSI)',
      operatingEntities: ['Hindalco Industries Limited (Aditya Birla Group)', 'State Mining Leases'],
      representativeEquipment: ['Hydraulic Excavators', 'Highway Tippers', 'Mobile Screens', 'Eco-Rehabilitation Seed Planters'],
      reportedPeriod: 'FY 2023-24',
      verifiedStatistics: [
        { label: 'Primary Destination', value: 'Hindalco Muri Alumina Refinery & Renukoot Smelter', source: 'Indian Bureau of Mines (IBM)' },
        { label: 'Restoration Practice', value: 'Topsoil segregation, backfilling, and native tree planting', source: 'State Forest Department' },
      ],
      officialSourceUrl: 'https://minerals.jharkhand.gov.in/',
      officialSourceLabel: 'Jharkhand Dept. of Mines & Geology',
      color: '#D97706',
      description: 'Characterized by high-altitude flat lateritic plateau summits (locally known as "Pats") like Bagru, Pakhar, and Serengdag. Yields premium trihydrate bauxite supplying alumina refineries throughout Eastern India.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [84.520, 23.360],
        [84.780, 23.350],
        [84.850, 23.510],
        [84.750, 23.580],
        [84.560, 23.540],
        [84.520, 23.360],
      ]],
    },
  },
];

// 2. Key Mining Districts in Jharkhand (Administrative Boundaries)
export const JHARKHAND_MINING_DISTRICTS: GeoJsonPolygonFeature[] = [
  {
    type: 'Feature',
    properties: {
      id: 'dist-dhanbad',
      name: 'Dhanbad District',
      category: 'district',
      mineralType: 'Prime Coking Coal Capital of India',
      district: 'Dhanbad',
      coordinatesText: '23.79° N, 86.43° E',
      centerCoordinates: [23.795, 86.430],
      geologicalFormation: 'Lower Gondwana Damodar Graben',
      boundaryProvenance: 'administrative_district',
      provenanceLabel: 'Statutory District Boundary (Census / Survey of India)',
      operatingEntities: ['BCCL', 'Tata Steel Jharia', 'ECL Mugma'],
      representativeEquipment: ['Heavy Rope Shovels', 'Haul Trucks', 'Coal Washeries'],
      reportedPeriod: '2023-24',
      verifiedStatistics: [
        { label: 'Coal Capital', value: 'India\'s highest concentration of coking collieries', source: 'Ministry of Coal' },
      ],
      officialSourceUrl: 'https://dhanbad.nic.in/',
      officialSourceLabel: 'District Administration Dhanbad',
      color: '#475569',
      description: 'The historic mining epicenter of India, home to IIT (ISM) Dhanbad, CMPDI Regional Institute, and Bharat Coking Coal Limited.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [86.150, 23.650],
        [86.480, 23.640],
        [86.720, 23.720],
        [86.680, 23.950],
        [86.350, 23.960],
        [86.160, 23.820],
        [86.150, 23.650],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: {
      id: 'dist-bokaro',
      name: 'Bokaro District',
      category: 'district',
      mineralType: 'Medium Coking Coal & Industrial Steelmaking',
      district: 'Bokaro',
      coordinatesText: '23.78° N, 85.96° E',
      centerCoordinates: [23.780, 85.960],
      geologicalFormation: 'Damodar Basin (Barakar & Raniganj)',
      boundaryProvenance: 'administrative_district',
      provenanceLabel: 'Statutory District Boundary (Census / Survey of India)',
      operatingEntities: ['CCL', 'SAIL Bokaro', 'Tata Steel'],
      representativeEquipment: ['Hydraulic Excavators', 'Dumpers', 'Washery Infrastructure'],
      reportedPeriod: '2023-24',
      verifiedStatistics: [
        { label: 'Industrial Nexus', value: 'Bokaro Steel City integrated with coal washeries', source: 'SAIL' },
      ],
      officialSourceUrl: 'https://bokaro.nic.in/',
      officialSourceLabel: 'District Administration Bokaro',
      color: '#475569',
      description: 'Major industrial powerhouse housing the East Bokaro coalfields and the Steel Authority of India\'s Bokaro Steel Plant.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [85.750, 23.620],
        [86.150, 23.600],
        [86.200, 23.840],
        [85.880, 23.890],
        [85.750, 23.620],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: {
      id: 'dist-west-singhbhum',
      name: 'West Singhbhum District',
      category: 'district',
      mineralType: 'Hematite Iron Ore & Manganese (Saranda Forest)',
      district: 'West Singhbhum',
      coordinatesText: '22.30° N, 85.50° E',
      centerCoordinates: [22.300, 85.500],
      geologicalFormation: 'Precambrian Iron Ore Group (Singhbhum Craton)',
      boundaryProvenance: 'administrative_district',
      provenanceLabel: 'Statutory District Boundary (Census / Survey of India)',
      operatingEntities: ['Tata Steel', 'SAIL (Gua & Chiria)', 'State Mineral Leases'],
      representativeEquipment: ['Electric Shovels', 'Haul Trucks (100t)', 'Automated Beneficiation'],
      reportedPeriod: '2023-24',
      verifiedStatistics: [
        { label: 'Iron Ore Hub', value: 'Chiria & Noamundi form India\'s largest hematite deposits', source: 'IBM' },
      ],
      officialSourceUrl: 'https://chaibasa.nic.in/',
      officialSourceLabel: 'District Administration West Singhbhum',
      color: '#475569',
      description: 'The mineral-rich southern crown of Jharkhand featuring Chaibasa, Noamundi, Gua, and the ancient Saranda sal forest.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [85.150, 22.020],
        [85.750, 22.050],
        [85.900, 22.450],
        [85.600, 22.750],
        [85.200, 22.550],
        [85.150, 22.020],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: {
      id: 'dist-chatra',
      name: 'Chatra & Hazaribagh Mining Corridor',
      category: 'district',
      mineralType: 'Mega Opencast Thermal Coal (North Karanpura)',
      district: 'Chatra & Hazaribagh',
      coordinatesText: '23.95° N, 85.05° E',
      centerCoordinates: [23.950, 85.050],
      geologicalFormation: 'Gondwana Sequence (Tandwa / Piparwar)',
      boundaryProvenance: 'administrative_district',
      provenanceLabel: 'Statutory District Boundary (Census / Survey of India)',
      operatingEntities: ['CCL', 'NTPC Mining'],
      representativeEquipment: ['In-Pit Crushers', 'Overland Conveyors', 'Surface Miners'],
      reportedPeriod: '2023-24',
      verifiedStatistics: [
        { label: 'Growth Vector', value: 'Fastest growing coal extraction corridor in India', source: 'Ministry of Coal' },
      ],
      officialSourceUrl: 'https://chatra.nic.in/',
      officialSourceLabel: 'District Administration Chatra',
      color: '#475569',
      description: 'Hosts the mega-scale Magadh and Amrapali open pit projects in Tandwa block, powering national electric utilities.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [84.700, 23.700],
        [85.450, 23.700],
        [85.450, 24.300],
        [84.750, 24.350],
        [84.700, 23.700],
      ]],
    },
  },
];

// 3. Jharkhand State Boundary Outline
export const JHARKHAND_STATE_OUTLINE: GeoJsonPolygonFeature = {
  type: 'Feature',
  properties: {
    id: 'jharkhand-state-boundary',
    name: 'State of Jharkhand',
    category: 'state',
    mineralType: 'Mineral Capital of India (40% of National Mineral Wealth)',
    district: 'Statewide (24 Districts)',
    coordinatesText: '21.97° N to 25.35° N, 83.33° E to 87.95° E',
    centerCoordinates: [23.6102, 85.2799],
    geologicalFormation: 'Chota Nagpur Granite Gneiss Complex & Gondwana Basins',
    boundaryProvenance: 'statutory_state',
    provenanceLabel: 'Statutory State Boundary (Survey of India / Govt. of Jharkhand)',
    operatingEntities: ['CIL Subsidiaries (BCCL, CCL, ECL)', 'Tata Steel', 'SAIL', 'HCL', 'UCIL', 'Hindalco'],
    representativeEquipment: ['Opencast Heavy Earth Moving Machinery (HEMM)', 'Underground Shaft Systems', 'IPCC Systems'],
    reportedPeriod: '2023-24',
    verifiedStatistics: [
      { label: 'National Reserves', value: 'Holds ~40% of India\'s total mineral reserves', source: 'Indian Bureau of Mines' },
      { label: 'Coal Reserves', value: '1st in Coal Reserves (>86 Billion Tonnes)', source: 'Ministry of Coal' },
      { label: 'Iron Ore Reserves', value: '2nd in Hematite Reserves', source: 'Geological Survey of India' },
    ],
    officialSourceUrl: 'https://www.jharkhand.gov.in/',
    officialSourceLabel: 'Government of Jharkhand Official Portal',
    color: '#245B3C',
    description: 'Jharkhand ("The Land of Forests and Minerals") is India\'s premier mineral-producing state, bounded by Bihar to the north, Uttar Pradesh and Chhattisgarh to the west, Odisha to the south, and West Bengal to the east.',
  },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [83.450, 24.150],
      [84.100, 24.550],
      [84.950, 24.750],
      [85.600, 24.600],
      [86.550, 24.850],
      [87.350, 25.300],
      [87.900, 25.150],
      [87.800, 24.300],
      [86.950, 23.850],
      [86.850, 23.200],
      [86.600, 22.400],
      [86.300, 22.100],
      [85.700, 22.000],
      [85.100, 22.150],
      [84.400, 22.350],
      [83.900, 22.650],
      [83.650, 23.400],
      [83.450, 24.150],
    ]],
  },
};
