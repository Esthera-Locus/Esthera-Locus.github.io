import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {
  FiSearch, FiMaximize, FiZoomIn, FiZoomOut, FiGlobe, FiChevronLeft, FiChevronRight, FiInfo, FiCheckSquare, FiChevronDown, FiChevronUp, FiSquare, FiArrowUp, FiArrowDown, FiX
} from 'react-icons/fi';

const geocatalogData = {
  name: "KKL II",
  themes: [
    {
      name: "Soils",
      subthemes: [
        { name: "Permeability", url: "/permeability.geojson" },
        { name: "Waterlogging", url: "/waterlogging.geojson" },
      ]
    },
    {
      name: "Geology",
      subthemes: [
        { name: "Fault Lines", url: "/faults.geojson" }
      ]
    }
  ]
};

// UPDATED: The basemaps array now includes a path to a preview image
const basemaps = [
  { name: 'Streets', url: 'https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=xfcrXKfMNocHqLR21b3x', preview: '/images/streets.png' },
  { name: 'Satellite', url: 'https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=xfcrXKfMNocHqLR21b3x', preview: '/images/satellite.png' },
  { name: 'Hillshade', url: 'https://api.maptiler.com/maps/outdoor-v2/256/{z}/{x}/{y}.png?key=xfcrXKfMNocHqLR21b3x', preview: '/images/hillshade.png' },
];

function GeoJSONLayer({ url, opacity, onEachFeature }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (url) {
      fetch(url).then(res => res.json()).then(setData).catch(err => console.error("Error fetching GeoJSON:", err));
    }
  }, [url]);
  const layerStyle = { fillOpacity: opacity, weight: 1, color: '#0000FF', fillColor: '#0000FF' };
  return data ? <GeoJSON data={data} style={layerStyle} onEachFeature={onEachFeature} /> : null;
}

// UPDATED: The MapControls component now manages the state and UI for the new switcher
function MapControls({ currentBasemapUrl, setCurrentBasemapUrl }) {
  const map = useMap();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for the new menu

  useEffect(() => {
    const scaleControl = L.control.scale({ position: 'bottomleft' }).addTo(map);
    return () => { map.removeControl(scaleControl); };
  }, [map]);

  const currentBasemap = basemaps.find(bm => bm.url === currentBasemapUrl);

  const handleBasemapChange = (url) => {
    setCurrentBasemapUrl(url);
    setIsMenuOpen(false); // Close menu on selection
  };

  return (
    <>
      {/* Top-Right Navigation Buttons */}
      <div className="leaflet-top leaflet-right">
        <div className="leaflet-control bg-white rounded-md shadow-lg flex flex-col">
          <button title="Fullscreen" className="w-9 h-9 flex items-center justify-center border-b hover:bg-gray-100"><FiMaximize size={16} /></button>
          <button title="Zoom In" onClick={() => map.zoomIn()} className="w-9 h-9 flex items-center justify-center border-b hover:bg-gray-100"><FiZoomIn size={16} /></button>
          <button title="Zoom Out" onClick={() => map.zoomOut()} className="w-9 h-9 flex items-center justify-center border-b hover:bg-gray-100"><FiZoomOut size={16} /></button>
          <button title="3D View" className="w-9 h-9 flex items-center justify-center hover:bg-gray-100"><FiGlobe size={16} /></button>
        </div>
      </div>

      {/* UPDATED: Bottom-Right Basemap Switcher */}
      <div className="leaflet-bottom leaflet-right">
        <div className="leaflet-control relative p-0 border-2 border-white rounded-lg shadow-xl">
           {/* The menu that opens when the button is clicked */}
          {isMenuOpen && (
            <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl p-2 flex gap-2">
              {basemaps.map((basemap) => (
                <div key={basemap.name} onClick={() => handleBasemapChange(basemap.url)} className="cursor-pointer text-center">
                   <img src={basemap.preview} alt={basemap.name} className="w-20 h-20 rounded-md border-2 hover:border-blue-500"/>
                   <span className="text-xs font-semibold text-gray-700">{basemap.name}</span>
                </div>
              ))}
            </div>
          )}
          {/* The main button showing the current basemap preview */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-24 h-24 rounded-lg overflow-hidden relative">
            <img src={currentBasemap?.preview} alt={currentBasemap?.name} className="w-full h-full object-cover" />
             <div className="absolute bottom-0 left-0 right-0 p-1 bg-black bg-opacity-50 text-white text-xs font-bold">
                Background
             </div>
          </button>
        </div>
      </div>
    </>
  );
}


export default function AtlasPage() {
  const [isDashboardCollapsed, setIsDashboardCollapsed] = useState(false);
  const [currentBasemapUrl, setCurrentBasemapUrl] = useState(basemaps[0].url);
  const [isGeocatalogOpen, setIsGeocatalogOpen] = useState(true);
  const [isMapsDisplayedOpen, setIsMapsDisplayedOpen] = useState(true);
  const [activeLayers, setActiveLayers] = useState([]);

  const handleLayerToggle = (layer) => {
    setActiveLayers(prev => {
      const isLayerActive = prev.some(l => l.name === layer.name);
      return isLayerActive ? prev.filter(l => l.name !== layer.name) : [...prev, { ...layer, opacity: 0.7 }];
    });
  };

  const handleOpacityChange = (layerName, newOpacity) => {
    setActiveLayers(prev => prev.map(l => l.name === layerName ? { ...l, opacity: newOpacity } : l));
  };

  const moveLayer = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= activeLayers.length) return;
    setActiveLayers(prev => {
      const newLayers = [...prev];
      [newLayers[index], newLayers[newIndex]] = [newLayers[newIndex], newLayers[index]];
      return newLayers;
    });
  };

  const onEachFeature = (feature, layer) => {
    layer.on('click', () => {
      let popupContent = "<b>Object Information</b><br/>";
      for (const key in feature.properties) {
        popupContent += `${key}: ${feature.properties[key]}<br/>`;
      }
      layer.bindPopup(popupContent).openPopup();
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-800 font-sans">
      <header className="flex items-center justify-between w-full h-12 px-4 bg-primary text-white shadow-md z-20 shrink-0">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div className="ml-4">
            <p className="font-bold text-lg">Esthera Locus</p>
            <p className="text-sm text-gray-600">Cartography & Remote Sensing 2023</p>
            <p className="text-xs text-gray-500">Universitas Gadjah Mada</p>
          </div>
        </div>
        <div className="flex-grow ml-8">
          <div className="relative">
            <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search for addresses, parcels or maps"
              className="w-full h-12 pl-12 pr-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </header>
      <main className="flex flex-grow overflow-hidden">
        <aside
          className={`bg-gray-50 shadow-lg transition-all duration-300 ease-in-out flex flex-col z-10 ${
            isDashboardCollapsed ? 'w-0' : 'w-96'
          }`}
        >
          <div className={`p-4 flex-grow overflow-y-auto transition-opacity ${isDashboardCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            <div className="mb-4">
              <button onClick={() => setIsGeocatalogOpen(!isGeocatalogOpen)} className="w-full flex justify-between items-center p-2 text-left font-bold text-lg hover:bg-gray-200 rounded-md">
                Geocatalog
                {isGeocatalogOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {isGeocatalogOpen && (
                <div className="p-2 mt-2 bg-white rounded-md border text-sm">
                  <div className="p-2 mt-1 font-semibold">{geocatalogData.name}</div>
                  <div className="pl-4">
                    {geocatalogData.themes.map(theme => (
                      <div key={theme.name}>
                        <p className="font-semibold mt-2">{theme.name}</p>
                        <div className="pl-4">
                          {theme.subthemes.map(subtheme => (
                            <div key={subtheme.name} className="flex items-center gap-2 mt-1">
                              <button onClick={() => handleLayerToggle(subtheme)} className="text-gray-600">
                                {activeLayers.some(l => l.name === subtheme.name) ? <FiCheckSquare className="text-blue-600" /> : <FiSquare />}
                              </button>
                              <span>{subtheme.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mb-4">
              <button onClick={() => setIsMapsDisplayedOpen(!isMapsDisplayedOpen)} className="w-full flex justify-between items-center p-2 text-left font-bold text-lg hover:bg-gray-200 rounded-md">
                Maps displayed
                {isMapsDisplayedOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {isMapsDisplayedOpen && (
                <div className="text-sm mt-2 space-y-2">
                  {activeLayers.map((layer, index) => (
                    <div key={layer.name} className="p-2 bg-white rounded-md border">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 font-semibold">
                          <FiCheckSquare className="text-blue-600" />
                          <span>{layer.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <button onClick={() => moveLayer(index, -1)} title="Move Up" className="hover:text-black disabled:opacity-25" disabled={index === 0}><FiArrowUp /></button>
                          <button onClick={() => moveLayer(index, 1)} title="Move Down" className="hover:text-black disabled:opacity-25" disabled={index === activeLayers.length - 1}><FiArrowDown /></button>
                          <button title="Info"><FiInfo className="cursor-pointer hover:text-black" /></button>
                          <button onClick={() => handleLayerToggle(layer)} title="Remove Layer" className="hover:text-red-500"><FiX /></button>
                        </div>
                      </div>
                      <label className="text-xs mt-2 block">Transparency</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        defaultValue={layer.opacity}
                        onChange={(e) => handleOpacityChange(layer.name, parseFloat(e.target.value))}
                        className="w-full mt-1"
                      />
                    </div>
                  ))}
                  {activeLayers.length === 0 && (
                    <div className="p-2 text-center text-gray-500 text-xs">No maps selected.</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <button onClick={() => setIsDashboardCollapsed(true)} className={`p-2 hover:bg-gray-200 w-full border-t ${isDashboardCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            <FiChevronLeft size={20} className="mx-auto" />
          </button>
        </aside>

        <button onClick={() => setIsDashboardCollapsed(false)} className={`bg-white p-2 rounded-r-lg shadow-lg my-4 h-12 self-start transition-all duration-300 ease-in-out z-10 ${isDashboardCollapsed ? 'opacity-100' : 'opacity-0 -translate-x-full'}`}>
          <FiChevronRight size={20} />
        </button>

        <div className="flex-grow">
          <MapContainer
            center={[-7.7956, 110.3695]}
            zoom={13}
            scrollWheelZoom={true}
            zoomControl={false}
            className="w-full h-full"
            style={{ position: 'relative' }}
          >
            <TileLayer url={currentBasemapUrl} attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>' />

            {activeLayers.map(layer => (
              <GeoJSONLayer key={layer.name} url={layer.url} opacity={layer.opacity} onEachFeature={onEachFeature} />
            ))}

            <MapControls
              currentBasemapUrl={currentBasemapUrl}
              setCurrentBasemapUrl={setCurrentBasemapUrl}
            />
          </MapContainer>
        </div>
      </main>
    </div>
  );
}