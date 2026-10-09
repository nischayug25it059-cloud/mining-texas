import React from 'react';
import { 
  X, 
  ExternalLink, 
  MapPin, 
  Layers, 
  Building2, 
  Wrench, 
  Calendar, 
  ShieldCheck, 
  Copy, 
  Check,
  Compass
} from 'lucide-react';
import { MiningFeatureProperties } from '../../data/jharkhandGeoJson';

interface CoalfieldDetailDrawerProps {
  feature: MiningFeatureProperties | null;
  onClose: () => void;
  onFocusMap?: () => void;
}

export const CoalfieldDetailDrawer: React.FC<CoalfieldDetailDrawerProps> = ({
  feature,
  onClose,
  onFocusMap,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!feature) return null;

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(
      `${feature.centerCoordinates[0].toFixed(4)}, ${feature.centerCoordinates[1].toFixed(4)}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'coalfield':
        return { label: 'Coalfield Basin', bg: 'bg-[#245B3C]/10 text-[#245B3C] border-[#245B3C]/30' };
      case 'iron_ore':
        return { label: 'Iron Ore Mining Belt', bg: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'bauxite':
        return { label: 'Bauxite Plateau', bg: 'bg-orange-100 text-orange-800 border-orange-300' };
      case 'copper_uranium':
        return { label: 'Strategic Mineral Shear Zone', bg: 'bg-cyan-100 text-cyan-800 border-cyan-300' };
      case 'district':
        return { label: 'Mining District', bg: 'bg-slate-100 text-slate-800 border-slate-300' };
      default:
        return { label: 'State Boundary', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    }
  };

  const badge = getCategoryBadge(feature.category);

  return (
    <aside className="fixed inset-y-0 right-0 z-[1000] w-full max-w-md bg-white shadow-2xl border-l border-[#E2E8F0] flex flex-col transform transition-transform duration-300 ease-in-out">
      {/* Header */}
      <div className="p-5 border-b border-[#E2E8F0] bg-[#F8F8F4]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${badge.bg}`}>
                {badge.label}
              </span>
              <span className="text-[11px] text-[#68716B] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#245B3C]" />
                {feature.district}
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#252A25] tracking-tight">
              {feature.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-[#E2E8F0] transition-colors"
            title="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Boundary Provenance Banner */}
        <div className="mt-3 px-3 py-2 rounded-lg bg-[#E8F0EC] border border-[#65866B]/30 flex items-center justify-between text-xs text-[#245B3C]">
          <span className="font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#245B3C] shrink-0" />
            {feature.provenanceLabel}
          </span>
          {onFocusMap && (
            <button
              onClick={onFocusMap}
              className="text-[11px] font-semibold underline hover:text-[#183E28] shrink-0"
            >
              Center Map
            </button>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm text-[#252A25]">
        {/* Description */}
        <div>
          <h3 className="text-xs font-mono uppercase font-semibold text-[#68716B] tracking-wider mb-1.5">
            Geological &amp; Regional Overview
          </h3>
          <p className="text-xs leading-relaxed text-[#4A5568]">
            {feature.description}
          </p>
        </div>

        {/* Primary Mineral & Stratigraphy */}
        <div className="grid grid-cols-1 gap-2.5">
          <div className="p-3 rounded-lg border border-[#E2E8F0] bg-[#FAF8F5]">
            <div className="text-[10px] font-mono uppercase text-[#68716B] font-semibold mb-0.5">
              Primary Mineral Classification
            </div>
            <div className="text-xs font-semibold text-[#252A25]">
              {feature.mineralType}
            </div>
          </div>

          <div className="p-3 rounded-lg border border-[#E2E8F0] bg-[#FAF8F5]">
            <div className="text-[10px] font-mono uppercase text-[#68716B] font-semibold mb-0.5">
              Stratigraphy &amp; Formation
            </div>
            <div className="text-xs text-[#252A25]">
              {feature.geologicalFormation}
            </div>
          </div>
        </div>

        {/* Coordinates Box */}
        <div className="p-3 rounded-lg border border-[#E2E8F0] bg-white flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#68716B] font-semibold">
              Geographic Coordinates
            </div>
            <div className="text-xs font-mono font-medium text-[#252A25]">
              {feature.centerCoordinates[0].toFixed(4)}° N, {feature.centerCoordinates[1].toFixed(4)}° E
            </div>
          </div>
          <button
            onClick={handleCopyCoords}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border border-[#E2E8F0] hover:bg-[#F1F5F9] text-[#245B3C] transition-colors"
            title="Copy coordinates"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Verified Published Statistics */}
        {feature.verifiedStatistics && feature.verifiedStatistics.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-mono uppercase font-semibold text-[#68716B] tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#245B3C]" />
                Verified Published Statistics
              </h3>
              <span className="text-[10px] font-mono text-[#68716B] flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {feature.reportedPeriod}
              </span>
            </div>

            <div className="space-y-2">
              {feature.verifiedStatistics.map((stat, idx) => (
                <div key={idx} className="p-2.5 rounded-lg border border-[#E2E8F0] bg-[#F8F8F4]">
                  <div className="flex items-center justify-between text-xs mb-0.5">
                    <span className="font-medium text-[#252A25]">{stat.label}</span>
                    <span className="font-semibold text-[#245B3C] text-right">{stat.value}</span>
                  </div>
                  <div className="text-[10px] text-[#68716B] text-right font-mono">
                    Source: {stat.source}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Operating Leaseholders */}
        {feature.operatingEntities && feature.operatingEntities.length > 0 && (
          <div>
            <h3 className="text-xs font-mono uppercase font-semibold text-[#68716B] tracking-wider mb-2 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#245B3C]" />
              Major Operating Entities / Leases
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {feature.operatingEntities.map((entity, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs bg-[#E8F0EC] text-[#245B3C] border border-[#65866B]/30 font-medium"
                >
                  {entity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Representative Equipment */}
        {feature.representativeEquipment && feature.representativeEquipment.length > 0 && (
          <div>
            <h3 className="text-xs font-mono uppercase font-semibold text-[#68716B] tracking-wider mb-2 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-[#245B3C]" />
              Representative Opencast / HEMM Fleet
            </h3>
            <ul className="text-xs space-y-1.5 text-[#4A5568]">
              {feature.representativeEquipment.map((eq, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E9B949] shrink-0" />
                  <span>{eq}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Official Statutory Portal Link */}
        <div className="pt-2">
          <a
            href={feature.officialSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-[#245B3C] text-white hover:bg-[#183E28] transition-colors shadow-sm"
          >
            <span>Visit {feature.officialSourceLabel}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <p className="text-[10px] text-center text-[#68716B] mt-2">
            Opens verified statutory government portal in a new tab.
          </p>
        </div>
      </div>
    </aside>
  );
};
