import React from 'react';
import { CoalfieldSatelliteMap } from '../components/gis/CoalfieldSatelliteMap';
import { 
  Compass, 
  MapPin, 
  ShieldCheck, 
  Layers, 
  ExternalLink, 
  BarChart3, 
  Building2, 
  Info,
  Calendar
} from 'lucide-react';
import { JHARKHAND_MINING_BASINS } from '../data/jharkhandGeoJson';

export const CoalfieldExplorerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Title & Official Header Strip */}
      <div className="gov-card p-6 border-l-4 border-l-[#245B3C]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-[#E8F0EC] text-[#245B3C] border border-[#65866B]/30">
                Geospatial Mining Intelligence
              </span>
              <span className="text-xs text-[#68716B] flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-[#245B3C]" />
                Statewide Geographic Information System (GIS)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#252A25] flex items-center gap-2">
              Jharkhand Coalfield &amp; Mineral Explorer
            </h1>

            <p className="text-sm text-[#68716B] mt-1 max-w-3xl leading-relaxed">
              Genuine high-resolution satellite imagery mapping surveyed Gondwana coal basins, Precambrian iron ore formations, lateritic bauxite plateaus, and strategic shear zones across the state of Jharkhand.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 shrink-0">
            <div className="px-3.5 py-2 rounded-lg bg-[#FAF8F5] border border-[#E2E8F0] text-xs">
              <div className="font-semibold text-[#252A25]">Geodetic Reference</div>
              <div className="text-[11px] text-[#68716B] font-mono">WGS 84 / EPSG:4326</div>
            </div>

            <div className="px-3.5 py-2 rounded-lg bg-[#E8F0EC] border border-[#65866B]/30 text-xs">
              <div className="font-semibold text-[#245B3C]">Imagery Source</div>
              <div className="text-[11px] text-[#245B3C] font-mono">Esri World Imagery</div>
            </div>
          </div>
        </div>

        {/* Geological Metric Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-[#E2E8F0]">
          <div className="p-3 rounded-lg bg-[#F8F8F4] border border-[#E2E8F0]">
            <div className="text-[10px] font-mono uppercase text-[#68716B] font-semibold">Total Mapped Basins</div>
            <div className="text-xl font-bold text-[#245B3C] mt-0.5">9 Basins</div>
            <div className="text-[11px] text-[#68716B]">Across 10 key mining districts</div>
          </div>

          <div className="p-3 rounded-lg bg-[#F8F8F4] border border-[#E2E8F0]">
            <div className="text-[10px] font-mono uppercase text-[#68716B] font-semibold">Prime Coking Coal</div>
            <div className="text-xl font-bold text-[#245B3C] mt-0.5">&gt;90% National</div>
            <div className="text-[11px] text-[#68716B]">Exclusively Jharia Coalfield</div>
          </div>

          <div className="p-3 rounded-lg bg-[#F8F8F4] border border-[#E2E8F0]">
            <div className="text-[10px] font-mono uppercase text-[#68716B] font-semibold">Hematite Iron Ore</div>
            <div className="text-xl font-bold text-[#245B3C] mt-0.5">2nd National</div>
            <div className="text-[11px] text-[#68716B]">Noamundi &amp; Chiria complexes</div>
          </div>

          <div className="p-3 rounded-lg bg-[#F8F8F4] border border-[#E2E8F0]">
            <div className="text-[10px] font-mono uppercase text-[#68716B] font-semibold">Boundary Provenance</div>
            <div className="text-xl font-bold text-[#245B3C] mt-0.5">CMPDI / GSI</div>
            <div className="text-[11px] text-[#68716B]">Published statutory coordinates</div>
          </div>
        </div>
      </div>

      {/* Real Satellite Interactive Map */}
      <CoalfieldSatelliteMap />

      {/* Coalfield Quick Catalog Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#252A25]">
              Documented Mining Basins &amp; Geological Zones
            </h2>
            <p className="text-xs text-[#68716B]">
              Detailed statutory attributes for major mineral extraction formations in Jharkhand.
            </p>
          </div>
          <span className="text-xs font-mono text-[#68716B]">
            Data Period: FY 2023-24
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {JHARKHAND_MINING_BASINS.map((basin) => {
            const p = basin.properties;
            return (
              <div
                key={p.id}
                className="gov-card p-4 flex flex-col justify-between hover:shadow-md transition-shadow border-t-2"
                style={{ borderTopColor: p.color }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-[#F1F5F9] text-slate-700">
                      {p.category.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] text-[#68716B] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#245B3C]" />
                      {p.district}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#252A25]">{p.name}</h3>
                  <p className="text-xs text-[#245B3C] font-semibold mt-0.5 mb-2">
                    {p.mineralType}
                  </p>

                  <p className="text-xs text-[#68716B] line-clamp-2 mb-3">
                    {p.description}
                  </p>

                  <div className="space-y-1.5 text-xs border-t border-[#E2E8F0] pt-2 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#68716B]">Formation:</span>
                      <span className="font-medium text-[#252A25] text-right truncate max-w-[180px]">
                        {p.geologicalFormation.split('(')[0]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#68716B]">Operators:</span>
                      <span className="font-medium text-[#252A25] text-right truncate max-w-[180px]">
                        {p.operatingEntities[0]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#68716B] font-mono">
                    {p.coordinatesText.split('(')[0]}
                  </span>
                  <a
                    href={p.officialSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#245B3C] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
