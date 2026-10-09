import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  ExternalLink, 
  Layers, 
  Pickaxe, 
  Building2, 
  Wrench, 
  FileText, 
  X, 
  CheckCircle2, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { JHARKHAND_MINING_REGIONS, JharkhandRegion } from '../data/jharkhandRegions';
import { JharkhandMapSvg } from '../components/regions/JharkhandMapSvg';
import { useMining } from '../context/MiningContext';

export const RegionsPage: React.FC = () => {
  const { setActiveView } = useMining();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMineralCategory, setSelectedMineralCategory] = useState<string>('all');
  const [selectedMiningType, setSelectedMiningType] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedRegionModal, setSelectedRegionModal] = useState<JharkhandRegion | null>(null);

  const filteredRegions = JHARKHAND_MINING_REGIONS.filter(region => {
    const matchesSearch = 
      region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      region.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      region.mineral.toLowerCase().includes(searchQuery.toLowerCase()) ||
      region.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMineral = 
      selectedMineralCategory === 'all' || region.mineralCategory === selectedMineralCategory;

    const matchesMiningType = 
      selectedMiningType === 'all' || region.miningType.includes(selectedMiningType);

    const matchesDistrict = 
      selectedDistrict === 'all' || region.district.toLowerCase().includes(selectedDistrict.toLowerCase());

    return matchesSearch && matchesMineral && matchesMiningType && matchesDistrict;
  });

  const mineralCategories = [
    { id: 'all', label: 'All Minerals' },
    { id: 'coal', label: 'Coal (Coking & Thermal)' },
    { id: 'iron_ore', label: 'Iron Ore (Hematite)' },
    { id: 'bauxite', label: 'Bauxite (Alumina)' },
    { id: 'copper_multi', label: 'Copper & Uranium' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="gov-card p-6 border-l-4 border-l-[#245B3C]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-[#E8F0EC] text-[#245B3C] border border-[#65866B]/30">
                Official Geological Repository
              </span>
              <span className="text-xs text-[#68716B]">State of Jharkhand</span>
            </div>
            <h1 className="text-2xl font-bold text-[#252A25] tracking-tight">
              Jharkhand Mining Regions & Mineral Deposits
            </h1>
            <p className="text-sm text-[#68716B] mt-1 max-w-3xl">
              Authentic profiles of primary mineral belts, geological formations, operating subsidiaries, 
              and verified extraction statistics sourced from the Ministry of Coal, Indian Bureau of Mines (IBM), 
              and Jharkhand Department of Mines & Geology.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('studio')}
              className="px-4 py-2 bg-[#245B3C] text-white text-xs font-semibold rounded-lg hover:bg-[#1E4D33] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Pickaxe className="w-3.5 h-3.5 text-[#E9B949]" />
              Inside Mining Operations
              <ArrowRight className="w-3 h-3 ml-1" />
            </button>
          </div>
        </div>

        {/* State Mineral Wealth Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#E2E8F0]">
          <div className="p-3 bg-[#F8F8F4] rounded-lg border border-[#E2E8F0]">
            <span className="text-[11px] text-[#68716B] block">National Mineral Share</span>
            <span className="text-xl font-bold text-[#245B3C]">~40%</span>
            <span className="text-[10px] text-[#68716B] block mt-0.5">Of India's total mineral wealth</span>
          </div>
          <div className="p-3 bg-[#F8F8F4] rounded-lg border border-[#E2E8F0]">
            <span className="text-[11px] text-[#68716B] block">Prime Coking Coal</span>
            <span className="text-xl font-bold text-[#245B3C]">&gt;90%</span>
            <span className="text-[10px] text-[#68716B] block mt-0.5">India's reserves concentrated in Jharia</span>
          </div>
          <div className="p-3 bg-[#F8F8F4] rounded-lg border border-[#E2E8F0]">
            <span className="text-[11px] text-[#68716B] block">Iron Ore (Hematite)</span>
            <span className="text-xl font-bold text-[#245B3C]">2nd Largest</span>
            <span className="text-[10px] text-[#68716B] block mt-0.5">High-grade deposits in Singhbhum</span>
          </div>
          <div className="p-3 bg-[#F8F8F4] rounded-lg border border-[#E2E8F0]">
            <span className="text-[11px] text-[#68716B] block">Strategic Elements</span>
            <span className="text-xl font-bold text-[#245B3C]">Copper & U</span>
            <span className="text-[10px] text-[#68716B] block mt-0.5">Singhbhum Shear Zone & Jaduguda</span>
          </div>
        </div>
      </div>

      {/* Interactive Map Component */}
      <JharkhandMapSvg
        selectedDistrict={selectedDistrict}
        onSelectDistrict={(district) => setSelectedDistrict(district)}
      />

      {/* Filter and Search Bar */}
      <div className="gov-card p-4 border border-[#E2E8F0] space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search region name, district, or mineral..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#252A25] placeholder-[#94A3B8] focus:outline-none focus:border-[#245B3C] transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-[#252A25]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Type dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <label className="text-xs font-medium text-[#68716B] whitespace-nowrap">Mining Method:</label>
            <select
              value={selectedMiningType}
              onChange={e => setSelectedMiningType(e.target.value)}
              className="px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#252A25] focus:outline-none focus:border-[#245B3C]"
            >
              <option value="all">All Methods</option>
              <option value="Opencast">Opencast</option>
              <option value="Underground">Underground</option>
              <option value="Mixed">Mixed</option>
            </select>

            {selectedDistrict !== 'all' && (
              <button
                onClick={() => setSelectedDistrict('all')}
                className="px-2.5 py-1 text-xs bg-[#E2E8F0] text-[#252A25] rounded-md hover:bg-[#CBD5E1] transition-colors flex items-center gap-1"
              >
                <span>District: {selectedDistrict}</span>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E2E8F0]">
          <span className="text-xs font-medium text-[#68716B] mr-1">Mineral Category:</span>
          {mineralCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedMineralCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedMineralCategory === cat.id
                  ? 'bg-[#245B3C] text-white'
                  : 'bg-[#F1F5F9] text-[#68716B] hover:bg-[#E2E8F0]'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-[#68716B]">
            Showing <strong className="text-[#252A25]">{filteredRegions.length}</strong> of {JHARKHAND_MINING_REGIONS.length} regions
          </span>
        </div>
      </div>

      {/* Region Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRegions.map(region => (
          <div 
            key={region.id} 
            className="gov-card flex flex-col justify-between hover:shadow-md transition-shadow duration-200 border border-[#E2E8F0]"
          >
            <div>
              {/* Card Header */}
              <div className="p-4 border-b border-[#E2E8F0] bg-[#F8F8F4]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#65866B] font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#245B3C]" />
                      District: {region.district}
                    </span>
                    <h3 className="text-base font-bold text-[#252A25] mt-0.5 leading-snug">
                      {region.name}
                    </h3>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium shrink-0 ${
                    region.mineralCategory === 'coal'
                      ? 'bg-slate-800 text-white'
                      : region.mineralCategory === 'iron_ore'
                      ? 'bg-[#C2410C] text-white'
                      : region.mineralCategory === 'bauxite'
                      ? 'bg-[#D97706] text-white'
                      : 'bg-[#0D9488] text-white'
                  }`}>
                    {region.mineral.split('&')[0]}
                  </span>
                </div>

                <div className="mt-2.5 flex items-center gap-2 text-[11px] text-[#68716B]">
                  <span className="font-semibold text-[#252A25]">Method:</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                    {region.miningType}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3 text-xs">
                <div>
                  <span className="font-semibold text-[#68716B] block text-[11px] uppercase tracking-wider">
                    Geological Formation
                  </span>
                  <p className="text-[#252A25] font-medium mt-0.5 line-clamp-2">
                    {region.geologicalFormation}
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-[#68716B] block text-[11px] uppercase tracking-wider">
                    Description & Overview
                  </span>
                  <p className="text-[#68716B] mt-0.5 line-clamp-3 leading-relaxed">
                    {region.description}
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-[#68716B] block text-[11px] uppercase tracking-wider">
                    Operating Entities
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {region.keyOperatingEntities.map((entity, i) => (
                      <span 
                        key={i} 
                        className="text-[10px] bg-[#E8F0EC] text-[#245B3C] font-medium px-2 py-0.5 rounded border border-[#65866B]/20"
                      >
                        {entity.split('(')[0].trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Verified Stat highlight */}
                {region.verifiedStatistics[0] && (
                  <div className="bg-[#F8F8F4] p-2.5 rounded border border-[#E2E8F0]">
                    <span className="text-[10px] text-[#68716B] block">
                      {region.verifiedStatistics[0].label}:
                    </span>
                    <span className="text-xs font-bold text-[#245B3C] block mt-0.5">
                      {region.verifiedStatistics[0].value}
                    </span>
                    <span className="text-[9px] text-[#94A3B8] block mt-0.5 font-mono">
                      Source: {region.verifiedStatistics[0].source} ({region.verifiedStatistics[0].period})
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-4 border-t border-[#E2E8F0] bg-white flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedRegionModal(region)}
                className="px-3 py-1.5 bg-[#245B3C] text-white text-xs font-semibold rounded-lg hover:bg-[#1E4D33] transition-colors"
              >
                View Full Regional Profile
              </button>

              <a
                href={region.officialSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#245B3C] hover:text-[#1E4D33] hover:underline flex items-center gap-1 font-medium"
              >
                <span>Gov Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Region Detail Modal */}
      {selectedRegionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] p-6 text-[#252A25]"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#E2E8F0] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#E8F0EC] text-[#245B3C] border border-[#65866B]/30">
                    District: {selectedRegionModal.district}
                  </span>
                  <span className="text-xs font-medium text-[#68716B]">
                    {selectedRegionModal.miningType}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-[#252A25] mt-1">
                  {selectedRegionModal.name}
                </h2>
                <p className="text-xs text-[#68716B] mt-0.5">
                  Mineral: <strong className="text-[#252A25]">{selectedRegionModal.mineral}</strong>
                </p>
              </div>

              <button
                onClick={() => setSelectedRegionModal(null)}
                className="p-1.5 text-[#68716B] hover:text-[#252A25] hover:bg-[#F1F5F9] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="py-5 space-y-6">
              {/* Geological Profile */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#68716B] flex items-center gap-1.5 mb-1.5">
                  <Layers className="w-4 h-4 text-[#245B3C]" />
                  Geological Formation & Stratigraphy
                </h3>
                <div className="bg-[#F8F8F4] p-3.5 rounded-xl border border-[#E2E8F0]">
                  <p className="text-xs font-semibold text-[#252A25]">
                    {selectedRegionModal.geologicalFormation}
                  </p>
                  <p className="text-xs text-[#68716B] mt-2 leading-relaxed">
                    {selectedRegionModal.description}
                  </p>
                </div>
              </div>

              {/* Verified Government Statistics */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#68716B] flex items-center gap-1.5 mb-2">
                  <FileText className="w-4 h-4 text-[#245B3C]" />
                  Verified Government & Industry Statistics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedRegionModal.verifiedStatistics.map((stat, i) => (
                    <div key={i} className="bg-white p-3.5 rounded-xl border border-[#E2E8F0] shadow-sm">
                      <span className="text-[11px] text-[#68716B] block">{stat.label}</span>
                      <span className="text-sm font-bold text-[#245B3C] block mt-1">
                        {stat.value}
                      </span>
                      <div className="mt-2 pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] text-[#94A3B8] font-mono">
                        <span>Source: {stat.source}</span>
                        <span>{stat.period}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operating Entities & Equipment Profile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#68716B] flex items-center gap-1.5 mb-2">
                    <Building2 className="w-4 h-4 text-[#245B3C]" />
                    Operating Agencies & Mining Leaseholders
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedRegionModal.keyOperatingEntities.map((entity, i) => (
                      <li key={i} className="text-xs text-[#252A25] bg-[#F8F8F4] p-2.5 rounded border border-[#E2E8F0] flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#245B3C] shrink-0" />
                        <span>{entity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#68716B] flex items-center gap-1.5 mb-2">
                    <Wrench className="w-4 h-4 text-[#245B3C]" />
                    Representative Heavy Equipment Deployed
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedRegionModal.representativeEquipment.map((eq, i) => (
                      <li key={i} className="text-xs text-[#252A25] bg-[#F8F8F4] p-2.5 rounded border border-[#E2E8F0] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E9B949] shrink-0" />
                        <span>{eq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Official Source Link & Citation Note */}
              <div className="bg-[#E8F0EC]/60 p-4 rounded-xl border border-[#65866B]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#245B3C] block">
                    Statutory Provenance Reference:
                  </span>
                  <span className="text-xs text-[#68716B]">
                    {selectedRegionModal.officialSourceLabel}
                  </span>
                </div>
                <a
                  href={selectedRegionModal.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#245B3C] text-white text-xs font-semibold rounded-lg hover:bg-[#1E4D33] transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
                >
                  <span>Visit Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="border-t border-[#E2E8F0] pt-4 flex justify-end">
              <button
                onClick={() => setSelectedRegionModal(null)}
                className="px-5 py-2 bg-[#F1F5F9] text-[#252A25] text-xs font-semibold rounded-lg hover:bg-[#E2E8F0] transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
