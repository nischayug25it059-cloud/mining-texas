export interface JharkhandRegion {
  id: string;
  name: string;
  district: string;
  mineral: string;
  mineralCategory: 'coal' | 'iron_ore' | 'bauxite' | 'copper_multi';
  miningType: string;
  geologicalFormation: string;
  description: string;
  keyOperatingEntities: string[];
  representativeEquipment: string[];
  verifiedStatistics: {
    label: string;
    value: string;
    source: string;
    period: string;
  }[];
  officialSourceUrl: string;
  officialSourceLabel: string;
  mapCoordinates: { x: number; y: number }; // Percentage position on schematic Jharkhand map
}

export const JHARKHAND_MINING_REGIONS: JharkhandRegion[] = [
  {
    id: 'jharia-coalfield',
    name: 'Jharia Coalfield',
    district: 'Dhanbad',
    mineral: 'Prime Coking Coal & Non-Coking Coal',
    mineralCategory: 'coal',
    miningType: 'Mixed (Opencast & Underground)',
    geologicalFormation: 'Barakar & Raniganj Formations (Damodar Valley Gondwana Basin)',
    description: 'India\'s exclusive storehouse of prime coking coal, essential for domestic blast-furnace steel manufacturing. Spans roughly 450 sq km in Dhanbad district with extensive opencast projects alongside legacy underground workings.',
    keyOperatingEntities: ['Bharat Coking Coal Limited (BCCL / Coal India)', 'Tata Steel (Jharia Division)'],
    representativeEquipment: ['Electric Rope Shovels (20-42 m³)', 'Heavy Haul Trucks (100-240t)', 'In-Pit Crushing & Conveying (IPCC)', 'Continuous Miners'],
    verifiedStatistics: [
      { label: 'Coking Coal Share', value: 'Over 90% of India\'s prime coking reserves', source: 'Ministry of Coal / CMPDI', period: '2023-24' },
      { label: 'Major Operating Subsidiary', value: 'Bharat Coking Coal Limited (BCCL)', source: 'Coal India Limited Annual Report', period: '2023-24' },
      { label: 'Fire & Subsidence Control', value: 'Jharia Master Plan Environmental Rehabilitation', source: 'Jharkhand State Pollution Control Board', period: 'Active' },
    ],
    officialSourceUrl: 'https://coal.gov.in/',
    officialSourceLabel: 'Ministry of Coal, Govt. of India',
    mapCoordinates: { x: 74, y: 52 },
  },
  {
    id: 'bokaro-coalfield',
    name: 'Bokaro Coalfield (East & West Bokaro)',
    district: 'Bokaro & Ramgarh',
    mineral: 'Medium Coking Coal & High-Grade Thermal Coal',
    mineralCategory: 'coal',
    miningType: 'Mixed (Opencast & Underground)',
    geologicalFormation: 'Barakar Formation (Damodar Valley Basin)',
    description: 'Prominent Gondwana coal basin divided into East Bokaro and West Bokaro fields. Houses large-scale mechanized opencast mines supplying coal washeries and the Bokaro Steel Plant.',
    keyOperatingEntities: ['Central Coalfields Limited (CCL / CIL)', 'Tata Steel Mining (West Bokaro Division)'],
    representativeEquipment: ['Hydraulic Excavators (12-16 m³)', 'Off-Highway Dump Trucks (100t)', 'Coal Beneficiation Washeries', 'Drill Rigs (250mm)'],
    verifiedStatistics: [
      { label: 'Primary Consumer', value: 'SAIL Bokaro Steel Plant & National Thermal Power Plants', source: 'Central Coalfields Limited', period: '2023-24' },
      { label: 'Washery Infrastructure', value: 'KATHARA, SWANG, RAJRAPPA, KARGALI Washery Complex', source: 'CIL Directory', period: '2023-24' },
    ],
    officialSourceUrl: 'https://minerals.jharkhand.gov.in/',
    officialSourceLabel: 'Jharkhand Dept. of Mines & Geology',
    mapCoordinates: { x: 62, y: 52 },
  },
  {
    id: 'north-karanpura',
    name: 'North Karanpura Coalfield',
    district: 'Chatra, Hazaribagh & Ramgarh',
    mineral: 'Thermal Coal (Power Grade)',
    mineralCategory: 'coal',
    miningType: 'Opencast (Large-Scale Mechanized)',
    geologicalFormation: 'Lower Gondwana Basin (Damodar Valley West)',
    description: 'One of the fastest-growing mega-scale thermal coal extraction hubs in Eastern India, hosting monumental opencast pits like Magadh, Amrapali, and Piparwar dedicated to national base-load power generation.',
    keyOperatingEntities: ['Central Coalfields Limited (CCL)', 'NTPC Mining Limited'],
    representativeEquipment: ['Mobile In-Pit Crushers', 'Long-Distance Overland Belt Conveyors', 'Surface Miners', 'Rear Dump Trucks (100-150t)'],
    verifiedStatistics: [
      { label: 'Mega Projects', value: 'Magadh OCP, Amrapali OCP, Piparwar IPCC', source: 'Ministry of Coal Projects Portal', period: '2023-24' },
      { label: 'Dedicated Logistics', value: 'Tori-Shivpur Rail Evacuation Corridor', source: 'Indian Railways / Ministry of Coal', period: 'Operational' },
    ],
    officialSourceUrl: 'https://coal.gov.in/',
    officialSourceLabel: 'Ministry of Coal / CIL Annual Report',
    mapCoordinates: { x: 44, y: 44 },
  },
  {
    id: 'south-karanpura',
    name: 'South Karanpura Coalfield',
    district: 'Ramgarh',
    mineral: 'Semi-Coking & Thermal Coal',
    mineralCategory: 'coal',
    miningType: 'Mixed (Opencast & Underground)',
    geologicalFormation: 'Barakar Stage (Damodar Valley)',
    description: 'Located in the Ramgarh district along the Damodar river valley. Comprises operational collieries supplying regional industrial clusters, sponge iron plants, and pit-head thermal stations.',
    keyOperatingEntities: ['Central Coalfields Limited (CCL)', 'Private Commercial Allottees'],
    representativeEquipment: ['Draglines', 'Hydraulic Shovels', 'Haul Trucks (60-100t)', 'Water Tankers for Dust Suppression'],
    verifiedStatistics: [
      { label: 'Regional Focus', value: 'Barkakana - Sayal - Argada Coal Belts', source: 'CCL Operational Statistics', period: '2023-24' },
    ],
    officialSourceUrl: 'https://gis1.jharkhand.gov.in/dgm/',
    officialSourceLabel: 'Directorate of Mines & Geology GIS Portal',
    mapCoordinates: { x: 54, y: 56 },
  },
  {
    id: 'rajmahal-coalfield',
    name: 'Rajmahal Coalfield',
    district: 'Godda',
    mineral: 'Non-Coking Thermal Coal (E-G Grade)',
    mineralCategory: 'coal',
    miningType: 'Opencast',
    geologicalFormation: 'Rajmahal Gondwana Outlier',
    description: 'Situated in north-eastern Jharkhand in Godda district. Known for highly mechanized opencast extraction directly linked via dedicated Merry-Go-Round (MGR) rail loops to major NTPC super thermal power stations like Farakka and Kahalgaon.',
    keyOperatingEntities: ['Eastern Coalfields Limited (ECL / Coal India)'],
    representativeEquipment: ['High-Capacity Walking Draglines', 'Hydraulic Excavators (20 m³)', 'Heavy Dumpers (120t)', 'MGR Rail Loadout Silos'],
    verifiedStatistics: [
      { label: 'Key Consumers', value: 'NTPC Farakka (2,100 MW) & Kahalgaon (2,340 MW)', source: 'ECL Annual Report', period: '2023-24' },
      { label: 'Major Pits', value: 'Rajmahal Opencast Project (Hura-C)', source: 'Ministry of Coal', period: '2023-24' },
    ],
    officialSourceUrl: 'https://coal.gov.in/',
    officialSourceLabel: 'Ministry of Coal, Govt. of India',
    mapCoordinates: { x: 86, y: 28 },
  },
  {
    id: 'noamundi-iron-mine',
    name: 'Noamundi Iron Mine Region',
    district: 'West Singhbhum',
    mineral: 'High-Grade Hematite Iron Ore (Fe > 63%)',
    mineralCategory: 'iron_ore',
    miningType: 'Opencast (Bench Mining)',
    geologicalFormation: 'Iron Ore Series / Noamundi Basin (Precambrian Singhbhum Craton)',
    description: 'World-renowned opencast hematite iron ore mining complex in the scenic Saranda Forest zone of West Singhbhum. Benchmarking eco-friendly dry beneficiation, wet washing, and robotic automated grade blending for integrated steelmaking.',
    keyOperatingEntities: ['Tata Steel Limited (Raw Materials Division)'],
    representativeEquipment: ['Electric Front Shovels', 'Articulated Haul Trucks (100t)', 'High-Angle Belt Conveyors', 'Automated Ore Processing Plants (OPP)'],
    verifiedStatistics: [
      { label: 'Average Fe Content', value: 'High grade ~62.5% to 65% Iron', source: 'Indian Bureau of Mines (IBM)', period: '2023-24' },
      { label: 'Environmental Awards', value: '5-Star Rated Mine for Sustainable Development', source: 'Ministry of Mines, Govt. of India', period: 'Recognized' },
    ],
    officialSourceUrl: 'https://minerals.jharkhand.gov.in/',
    officialSourceLabel: 'Jharkhand Dept. of Mines & Geology',
    mapCoordinates: { x: 64, y: 84 },
  },
  {
    id: 'singhbhum-mineral-belt',
    name: 'Singhbhum Mineral Belt',
    district: 'East Singhbhum & West Singhbhum',
    mineral: 'Iron Ore, Copper Ore, Uranium, Kyanite & Multi-Minerals',
    mineralCategory: 'copper_multi',
    miningType: 'Mixed (Opencast & Deep Underground)',
    geologicalFormation: 'Singhbhum Shear Zone (Precambrian Thrust Belt)',
    description: 'An ancient, globally celebrated metallurgical shear zone extending over 160 km across Kolhan division. Yields major copper deposits (Mosabani, Surda), national strategic uranium (Jaduguda), and major hematite/magnetite iron ore deposits (Chiria, Gua).',
    keyOperatingEntities: ['Hindustan Copper Limited (HCL)', 'Steel Authority of India (SAIL - Gua & Chiria)', 'Uranium Corporation of India (UCIL)'],
    representativeEquipment: ['Deep Shaft Winding Hoists', 'Trackless Underground Load-Haul-Dump (LHD) Loaders', 'Flotation Cells & Smelters', 'Bench Drill Rigs'],
    verifiedStatistics: [
      { label: 'Strategic Significance', value: 'Houses India\'s first commercial copper smelter & primary nuclear fuel mines', source: 'Geological Survey of India (GSI)', period: 'Historical & Active' },
      { label: 'Chiria Iron Reserves', value: 'Over 2 Billion Tonnes of Hematite Iron Ore', source: 'SAIL Raw Materials Division', period: 'Verified' },
    ],
    officialSourceUrl: 'https://gis1.jharkhand.gov.in/dgm/',
    officialSourceLabel: 'Directorate of Mines & Geology, Jharkhand',
    mapCoordinates: { x: 78, y: 76 },
  },
  {
    id: 'lohardaga-bauxite',
    name: 'Lohardaga Mineral Region',
    district: 'Lohardaga & Gumla',
    mineral: 'Metallurgical Bauxite (Alumina Ore)',
    mineralCategory: 'bauxite',
    miningType: 'Opencast (Plateau Top Strip Mining)',
    geologicalFormation: 'Lateritic Caps on Precambrian Granite-Gneiss (Pat Plateau)',
    description: 'Characterized by flat lateritic hilltops (known locally as "Pats") in Western Jharkhand. Supplies superior trihydrate bauxite to major alumina refineries across Eastern India.',
    keyOperatingEntities: ['Hindalco Industries Limited (Aditya Birla Group)', 'State Mineral Leases'],
    representativeEquipment: ['Hydraulic Excavators', 'Highway Tippers', 'Mobile Screens', 'Eco-Rehabilitation Tree Planters'],
    verifiedStatistics: [
      { label: 'Primary Destination', value: 'Hindalco Muri Alumina Refinery & Renukoot Smelter', source: 'Indian Bureau of Mines (IBM)', period: '2023-24' },
      { label: 'Land Restoration Practice', value: 'Concurrent backfilling and afforestation of mined pat plateaus', source: 'Jharkhand State Forest Dept.', period: 'Continuous' },
    ],
    officialSourceUrl: 'https://minerals.jharkhand.gov.in/',
    officialSourceLabel: 'Jharkhand Dept. of Mines & Geology',
    mapCoordinates: { x: 38, y: 62 },
  },
  {
    id: 'west-bokaro',
    name: 'West Bokaro Coal Basin',
    district: 'Ramgarh',
    mineral: 'Medium Coking Coal',
    mineralCategory: 'coal',
    miningType: 'Opencast & Dense Medium Washing',
    geologicalFormation: 'Barakar Formation (Damodar Basin)',
    description: 'Integral part of the Bokaro coal basin in Ramgarh district. Centers around modern opencast extraction coupled with dense-media coal beneficiation plants producing low-ash clean metallurgical coal.',
    keyOperatingEntities: ['Tata Steel (West Bokaro Division)', 'Central Coalfields Limited (CCL)'],
    representativeEquipment: ['Shovels & Dumpers Fleet', 'Fluidized Bed Combustion Boilers', 'Dense Medium Cyclone Washeries'],
    verifiedStatistics: [
      { label: 'Beneficiation Technology', value: 'Pioneered low-ash dry/wet cyclone coal washing in India', source: 'Tata Steel Raw Materials Division', period: '2023-24' },
    ],
    officialSourceUrl: 'https://minerals.jharkhand.gov.in/',
    officialSourceLabel: 'Jharkhand Dept. of Mines & Geology',
    mapCoordinates: { x: 58, y: 48 },
  },
];
