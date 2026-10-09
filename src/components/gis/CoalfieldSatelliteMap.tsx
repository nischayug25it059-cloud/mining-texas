import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  JHARKHAND_MINING_BASINS, 
  JHARKHAND_MINING_DISTRICTS, 
  JHARKHAND_STATE_OUTLINE, 
  MiningFeatureProperties,
  GeoJsonPolygonFeature 
} from '../../data/jharkhandGeoJson';
import { CoalfieldDetailDrawer } from './CoalfieldDetailDrawer';
import { 
  Layers, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Search, 
  ShieldCheck, 
  Compass, 
  Eye, 
  Info,
  MapPin
} from 'lucide-react';

type BaseMapType = 'satellite' | 'terrain' | 'streets';

interface CoalfieldSatelliteMapProps {
  initialSelectedId?: string;
}

export const CoalfieldSatelliteMap: React.FC<CoalfieldSatelliteMapProps> = ({
  initialSelectedId,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const baseLayersRef = useRef<{ [key in BaseMapType]?: L.TileLayer }>({});
  const geoJsonLayersRef = useRef<{ [key: string]: L.GeoJSON | L.LayerGroup }>({});

  const [selectedFeature, setSelectedFeature] = useState<MiningFeatureProperties | null>(null);
  const [activeBaseMap, setActiveBaseMap] = useState<BaseMapType>('satellite');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [layerVisibility, setLayerVisibility] = useState({
    stateBoundary: true,
    districtBoundaries: true,
    coalfields: true,
    mineralMarkers: true,
  });

  // Default Jharkhand focal point
  const JHARKHAND_CENTER: [number, number] = [23.6102, 85.2799];
  const JHARKHAND_DEFAULT_ZOOM = 7.5;

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const map = L.map(mapContainerRef.current, {
      center: JHARKHAND_CENTER,
      zoom: JHARKHAND_DEFAULT_ZOOM,
      zoomControl: false, // We render custom styled controls
      minZoom: 6,
      maxZoom: 18,
    });

    mapInstanceRef.current = map;

    // 1. Tile Providers
    // A. Esri World Imagery (Legitimate satellite tile provider with official copyright attribution)
    const esriSatellite = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, GIS User Community',
      }
    );

    // B. OpenTopoMap (Terrain & Elevation Fallback)
    const openTopo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)',
    });

    // C. OpenStreetMap (Street & Administrative View)
    const osmStreets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    });

    baseLayersRef.current = {
      satellite: esriSatellite,
      terrain: openTopo,
      streets: osmStreets,
    };

    // Add default satellite basemap
    esriSatellite.addTo(map);

    // 2. Add State Outline Layer
    const stateLayer = L.geoJSON(JHARKHAND_STATE_OUTLINE as any, {
      style: {
        color: '#E9B949',
        weight: 2.5,
        dashArray: '6, 6',
        fillColor: '#245B3C',
        fillOpacity: 0.05,
      },
    }).addTo(map);
    geoJsonLayersRef.current.stateBoundary = stateLayer;

    // 3. Add Mining Districts Layer
    const districtsLayer = L.geoJSON(
      {
        type: 'FeatureCollection',
        features: JHARKHAND_MINING_DISTRICTS,
      } as any,
      {
        style: {
          color: '#94A3B8',
          weight: 1.5,
          dashArray: '4, 4',
          fillColor: '#64748B',
          fillOpacity: 0.08,
        },
        onEachFeature: (feature: any, layer: L.Layer) => {
          layer.on({
            mouseover: (e) => {
              const l = e.target;
              l.setStyle({ fillOpacity: 0.25, weight: 2 });
            },
            mouseout: (e) => {
              const l = e.target;
              l.setStyle({ fillOpacity: 0.08, weight: 1.5 });
            },
            click: () => {
              setSelectedFeature(feature.properties);
              map.flyTo(feature.properties.centerCoordinates, 9, { duration: 1 });
            },
          });
        },
      }
    ).addTo(map);
    geoJsonLayersRef.current.districtBoundaries = districtsLayer;

    // 4. Add Coalfields & Mineral Basins Polygon Layer
    const basinsLayer = L.geoJSON(
      {
        type: 'FeatureCollection',
        features: JHARKHAND_MINING_BASINS,
      } as any,
      {
        style: (feature: any) => ({
          color: feature.properties.color || '#245B3C',
          weight: 2.5,
          fillColor: feature.properties.color || '#245B3C',
          fillOpacity: 0.35,
        }),
        onEachFeature: (feature: any, layer: L.Layer) => {
          // Bind tooltip
          layer.bindTooltip(
            `<strong>${feature.properties.name}</strong><br/><span style="font-size:11px;color:#475569;">${feature.properties.mineralType}</span>`,
            { sticky: true, className: 'gov-map-tooltip' }
          );

          layer.on({
            mouseover: (e) => {
              const l = e.target;
              l.setStyle({ fillOpacity: 0.65, weight: 3.5 });
            },
            mouseout: (e) => {
              const l = e.target;
              l.setStyle({ fillOpacity: 0.35, weight: 2.5 });
            },
            click: () => {
              setSelectedFeature(feature.properties);
              map.flyTo(feature.properties.centerCoordinates, 11, { duration: 1.2 });
            },
          });
        },
      }
    ).addTo(map);
    geoJsonLayersRef.current.coalfields = basinsLayer;

    // 5. Add Custom Mineral Markers Layer
    const markersGroup = L.layerGroup();
    JHARKHAND_MINING_BASINS.forEach((basin) => {
      const props = basin.properties;
      const [lat, lng] = props.centerCoordinates;

      const markerHtml = `
        <div style="
          background-color: white;
          border: 2px solid ${props.color};
          border-radius: 9999px;
          padding: 2px 8px;
          font-size: 11px;
          font-weight: 700;
          color: #252A25;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
          cursor: pointer;
        ">
          <span style="width: 8px; height: 8px; border-radius: 9999px; background-color: ${props.color};"></span>
          <span>${props.name.split(' ')[0]}</span>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: markerHtml,
        iconSize: [80, 24],
        iconAnchor: [40, 12],
      });

      const marker = L.marker([lat, lng], { icon: customIcon });
      marker.on('click', () => {
        setSelectedFeature(props);
        map.flyTo([lat, lng], 11, { duration: 1.2 });
      });

      markersGroup.addLayer(marker);
    });

    markersGroup.addTo(map);
    geoJsonLayersRef.current.mineralMarkers = markersGroup;

    // Handle initial selection if passed
    if (initialSelectedId) {
      const target = JHARKHAND_MINING_BASINS.find((b) => b.properties.id === initialSelectedId);
      if (target) {
        setSelectedFeature(target.properties);
        map.flyTo(target.properties.centerCoordinates, 11, { duration: 1 });
      }
    }

    // Cleanup on unmount
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Basemap Layer when activeBaseMap changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    Object.entries(baseLayersRef.current).forEach(([type, layer]) => {
      if (!layer) return;
      if (type === activeBaseMap) {
        if (!map.hasLayer(layer)) {
          layer.addTo(map);
        }
      } else {
        if (map.hasLayer(layer)) {
          map.removeLayer(layer);
        }
      }
    });
  }, [activeBaseMap]);

  // Update Layer Visibilities
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // State boundary
    if (geoJsonLayersRef.current.stateBoundary) {
      if (layerVisibility.stateBoundary) {
        if (!map.hasLayer(geoJsonLayersRef.current.stateBoundary)) {
          geoJsonLayersRef.current.stateBoundary.addTo(map);
        }
      } else {
        if (map.hasLayer(geoJsonLayersRef.current.stateBoundary)) {
          map.removeLayer(geoJsonLayersRef.current.stateBoundary);
        }
      }
    }

    // District boundaries
    if (geoJsonLayersRef.current.districtBoundaries) {
      if (layerVisibility.districtBoundaries) {
        if (!map.hasLayer(geoJsonLayersRef.current.districtBoundaries)) {
          geoJsonLayersRef.current.districtBoundaries.addTo(map);
        }
      } else {
        if (map.hasLayer(geoJsonLayersRef.current.districtBoundaries)) {
          map.removeLayer(geoJsonLayersRef.current.districtBoundaries);
        }
      }
    }

    // Coalfields & Basins
    if (geoJsonLayersRef.current.coalfields) {
      if (layerVisibility.coalfields) {
        if (!map.hasLayer(geoJsonLayersRef.current.coalfields)) {
          geoJsonLayersRef.current.coalfields.addTo(map);
        }
      } else {
        if (map.hasLayer(geoJsonLayersRef.current.coalfields)) {
          map.removeLayer(geoJsonLayersRef.current.coalfields);
        }
      }
    }

    // Mineral Markers
    if (geoJsonLayersRef.current.mineralMarkers) {
      if (layerVisibility.mineralMarkers) {
        if (!map.hasLayer(geoJsonLayersRef.current.mineralMarkers)) {
          geoJsonLayersRef.current.mineralMarkers.addTo(map);
        }
      } else {
        if (map.hasLayer(geoJsonLayersRef.current.mineralMarkers)) {
          map.removeLayer(geoJsonLayersRef.current.mineralMarkers);
        }
      }
    }
  }, [layerVisibility]);

  // Fly to region helper
  const handleFlyToRegion = (feature: MiningFeatureProperties) => {
    setSelectedFeature(feature);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(feature.centerCoordinates, 11, { duration: 1.2 });
    }
  };

  // Reset to statewide view
  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(JHARKHAND_CENTER, JHARKHAND_DEFAULT_ZOOM, { duration: 1 });
    }
  };

  // Filtered list for search dropdown
  const filteredBasins = JHARKHAND_MINING_BASINS.filter(
    (b) =>
      b.properties.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.properties.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.properties.mineralType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden border border-[#E2E8F0] shadow-sm bg-[#F8F8F4] flex flex-col ${
        isFullscreen ? 'fixed inset-0 z-[9999] rounded-none h-screen' : 'h-[720px]'
      }`}
    >
      {/* Top Map Control Bar */}
      <div className="z-[500] px-4 py-3 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 shadow-sm">
        {/* Search & Location Select */}
        <div className="flex items-center gap-2 flex-1 min-w-[280px] max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search coalfield, district, or mineral..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#E2E8F0] bg-[#F8F8F4] focus:outline-none focus:ring-2 focus:ring-[#245B3C]/30 focus:border-[#245B3C]"
            />
          </div>

          {/* Quick Select Dropdown */}
          <select
            onChange={(e) => {
              const target = JHARKHAND_MINING_BASINS.find((b) => b.properties.id === e.target.value);
              if (target) handleFlyToRegion(target.properties);
            }}
            value={selectedFeature?.id || ''}
            className="text-xs px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#252A25] font-medium focus:outline-none focus:border-[#245B3C]"
          >
            <option value="" disabled>Jump to Region...</option>
            {JHARKHAND_MINING_BASINS.map((b) => (
              <option key={b.properties.id} value={b.properties.id}>
                {b.properties.name} ({b.properties.district})
              </option>
            ))}
          </select>
        </div>

        {/* Basemap Switcher */}
        <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-lg border border-[#E2E8F0]">
          <button
            onClick={() => setActiveBaseMap('satellite')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
              activeBaseMap === 'satellite'
                ? 'bg-[#245B3C] text-white shadow-sm'
                : 'text-[#68716B] hover:text-[#252A25]'
            }`}
            title="Real Esri World Imagery Satellite Tiles"
          >
            Satellite
          </button>
          <button
            onClick={() => setActiveBaseMap('terrain')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
              activeBaseMap === 'terrain'
                ? 'bg-[#245B3C] text-white shadow-sm'
                : 'text-[#68716B] hover:text-[#252A25]'
            }`}
            title="OpenTopoMap Topographic & Relief Tiles"
          >
            Terrain
          </button>
          <button
            onClick={() => setActiveBaseMap('streets')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
              activeBaseMap === 'streets'
                ? 'bg-[#245B3C] text-white shadow-sm'
                : 'text-[#68716B] hover:text-[#252A25]'
            }`}
            title="OpenStreetMap Cartographic Street Tiles"
          >
            Street Map
          </button>
        </div>

        {/* Global Map Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetView}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F8F8F4] text-xs font-semibold text-[#245B3C] transition-colors shadow-sm"
            title="Reset zoom to whole State of Jharkhand"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset to Jharkhand</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F8F8F4] text-slate-600 transition-colors shadow-sm"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="relative flex-1 w-full h-full">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Floating Layer Controls Badge Panel (Top-Right) */}
        <div className="absolute top-4 right-4 z-[400] bg-white/95 backdrop-blur-md rounded-xl p-3 border border-[#E2E8F0] shadow-lg max-w-xs text-xs space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0]">
            <span className="font-semibold text-[#252A25] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#245B3C]" />
              Geographic Layers
            </span>
            <span className="text-[10px] text-slate-500 font-mono">GeoJSON</span>
          </div>

          <div className="space-y-1.5 text-[#4A5568]">
            <label className="flex items-center gap-2 cursor-pointer hover:text-[#252A25]">
              <input
                type="checkbox"
                checked={layerVisibility.stateBoundary}
                onChange={(e) =>
                  setLayerVisibility({ ...layerVisibility, stateBoundary: e.target.checked })
                }
                className="rounded text-[#245B3C] focus:ring-[#245B3C]"
              />
              <span>Jharkhand State Border</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer hover:text-[#252A25]">
              <input
                type="checkbox"
                checked={layerVisibility.districtBoundaries}
                onChange={(e) =>
                  setLayerVisibility({ ...layerVisibility, districtBoundaries: e.target.checked })
                }
                className="rounded text-[#245B3C] focus:ring-[#245B3C]"
              />
              <span>Mining District Boundaries</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer hover:text-[#252A25]">
              <input
                type="checkbox"
                checked={layerVisibility.coalfields}
                onChange={(e) =>
                  setLayerVisibility({ ...layerVisibility, coalfields: e.target.checked })
                }
                className="rounded text-[#245B3C] focus:ring-[#245B3C]"
              />
              <span>Coalfield &amp; Mineral Basins</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer hover:text-[#252A25]">
              <input
                type="checkbox"
                checked={layerVisibility.mineralMarkers}
                onChange={(e) =>
                  setLayerVisibility({ ...layerVisibility, mineralMarkers: e.target.checked })
                }
                className="rounded text-[#245B3C] focus:ring-[#245B3C]"
              />
              <span>Deposit Callout Markers</span>
            </label>
          </div>

          <div className="pt-2 border-t border-[#E2E8F0] text-[10px] text-[#68716B] leading-tight">
            Click on any basin polygon or marker to view verified geological data, operating entities, and official citations.
          </div>
        </div>

        {/* Floating Zoom Buttons (Bottom-Right) */}
        <div className="absolute bottom-6 right-4 z-[400] flex flex-col gap-1 shadow-md">
          <button
            onClick={() => mapInstanceRef.current?.zoomIn()}
            className="w-8 h-8 rounded-t-lg bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] font-bold text-slate-700 flex items-center justify-center text-sm transition-colors"
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={() => mapInstanceRef.current?.zoomOut()}
            className="w-8 h-8 rounded-b-lg bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] font-bold text-slate-700 flex items-center justify-center text-sm transition-colors border-t-0"
            title="Zoom Out"
          >
            −
          </button>
        </div>

        {/* Statutory Imagery Provenance Stamp (Bottom-Left) */}
        <div className="absolute bottom-4 left-4 z-[400] px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm border border-[#E2E8F0] shadow-sm text-[10px] text-[#68716B] flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#245B3C]" />
          <span>
            {activeBaseMap === 'satellite'
              ? 'Esri World Imagery (High-Resolution Satellite)'
              : activeBaseMap === 'terrain'
              ? 'OpenTopoMap (Digital Elevation Relief)'
              : 'OpenStreetMap Cartographic Data'}
          </span>
        </div>
      </div>

      {/* Location Details Slide-Over Drawer */}
      <CoalfieldDetailDrawer
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
        onFocusMap={() => {
          if (selectedFeature && mapInstanceRef.current) {
            mapInstanceRef.current.flyTo(selectedFeature.centerCoordinates, 11, { duration: 1 });
          }
        }}
      />
    </div>
  );
};
