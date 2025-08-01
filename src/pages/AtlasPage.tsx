import React, { useState, useRef, useEffect } from "react";
import { FaEarthAsia, FaChevronRight, } from "react-icons/fa6";
import { FaSearch, FaChevronDown, FaChevronUp, FaLayerGroup, FaTimes, FaInfoCircle } from "react-icons/fa";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from "react-icons/tb";
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { Menus } from "../data/menuData.tsx";
import { FaGripVertical } from "react-icons/fa";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createRoot } from 'react-dom/client';


const toDMS = (coord) => {
  const absolute = Math.abs(coord);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = Math.floor((minutesNotTruncated - minutes) * 60);
  return `${degrees}° ${minutes}' ${seconds}"`;
};


const getStylesForItem = (item, level) => {
  const baseStyles = "flex items-center gap-x-2 py-1 px-2 rounded-lg cursor-pointer";
  const isMapItem = !item.subMenu && !item.description; // An item is a "map" if it has no sub-menu or description.


  if (isMapItem) {
    return `${baseStyles} hover:bg-white/10 font-thin text-xs`;
  }
 
  switch (level) {
    // Level 0: KKL
    case 0:
      return `${baseStyles} bg-white/20 font-semibold text-white`;
    // Level 1: Tema
    case 1:
      return `${baseStyles} bg-white/10 font-medium`;
    // Level 2+: subtema
    default:
      return `${baseStyles} bg-white/5 font-light`;
  }
};








const InfoPopup = ({ layer, onClose, isSidebarOpen }) => (
  <div
    className={`absolute top-[75px] rounded-lg shadow-lg text-white w-64 max-w-xs max-h-[calc(100vh-100px)] z-10
              flex flex-col overflow-hidden duration-300 ease-in-out
              ${isSidebarOpen ? 'left-80' : 'left-24'}`}
  >
    {/* Header part of the pop-up */}
    <div className="flex-shrink-0 bg-locus4a p-2 flex justify-between items-center">
      <h3 className="font-semibold text-sm">{layer.title}</h3>
      <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
        <FaTimes />
      </button>
    </div>


    {/* Scrollable body part of the pop-up */}
    <div className="flex-grow bg-locus4b p-4 text-xs text-locus4a space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-locus4a/20 scrollbar-track-transparent">
      <p>This is where the map description will go.</p>
      <p className="font-semibold text-locus4a">Legenda:</p>
      {/* Dummy Legend */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-red-500 opacity-50 border border-white/50"></div>
        <span>Dummy Data</span>
      </div>
      <p className="font-semibold text-locus4a">Metadata:</p>
      <p className="pt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nibh sem.</p>
    </div>
  </div>
);




// NEW Component for the on-map feature pop-up content
const FeaturePopupContent = ({ feature }) => {
  const properties = feature.properties;
  const title = properties['Layer Name'] || 'Feature Info';


  return (
    // The main container now only handles sizing
    <div className="w-60 max-w-xs text-white rounded-lg overflow-hidden shadow-lg flex flex-col max-h-40">
      {/* Header */}
      <div className="bg-locus4a p-2 flex justify-between items-center flex-shrink-0">
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>


      {/* Body */}
      <div className="bg-locus4b p-3 text-xs space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-locus4a/20 scrollbar-track-transparent">
        <dl>
          {Object.entries(properties).map(([key, value]) => {
            if (key === 'Layer Name') return null; // Don't repeat the title
            return (
              <React.Fragment key={key}>
                <dt className="font-semibold text-locus4a">{key}</dt>
                <dd className="pl-2 mb-1 text-locus4a">{value.toString()}</dd>
              </React.Fragment>
            );
          })}
        </dl>
      </div>
    </div>
  );
};


const StatusBar = ({ isSidebarOpen, scaleInfo, cursorCoords }) => (
  <div
    className={`absolute bottom-4 z-10 duration-300 ease-in-out flex items-center gap-4
              text-[10px] text-locus4a bg-locus4b/80 p-1 px-3 rounded-md shadow-lg
              ${isSidebarOpen ? 'left-80' : 'left-24'}`}
  >
    {/* Coordinate Display (on the left) */}
    <div>
      <span>{cursorCoords}</span>
    </div>
   
    {/* Scale Bar Display (on the right) */}
    <div style={{ width: `${scaleInfo.width}px` }} className="border-b-1 border-l-1 border-r-1 border-locus4a h-2.5 box-content text-center">
      <span className="relative -top-1 text-locus4a">{scaleInfo.text}</span>
    </div>
  </div>
);


const SortableLayerItem = ({ layer, onRemove, onOpacityChange, onInfo }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: layer.id });
 
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  return (
    <li
      ref={setNodeRef}
      style={style}
      className="p-2 bg-white/5 rounded-md text-xs touch-none" // touch-none is important for dnd-kit
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Drag Handle */}
          <button {...attributes} {...listeners} className="cursor-grab text-gray-400"><FaGripVertical /></button>
          <span>{layer.title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => onInfo(layer)} className="p-1 hover:bg-white/20 rounded-full"><FaInfoCircle /></button>
          <button onClick={() => onRemove(layer.id)} className="p-1 hover:bg-white/20 rounded-full"><FaTimes /></button>
        </div>
      </div>
      <input
        type="range"
        min="0" max="1" step="0.05"
        value={layer.opacity}
        onChange={(e) => onOpacityChange(layer.id, e.target.value)}
        className="w-full h-1 mt-2 bg-locus4b rounded-lg appearance-none cursor-pointer accent-locus3c"
      />
    </li>
  );
};








const RecursiveMenuItem = ({ item, level = 0, openMenus, toggleMenu, onMapClick }) => {
  const isMenuOpen = openMenus[item.title];
  const hasSubItems = item.subMenu || item.description;
  const isMapItem = !item.subMenu && !item.description;
 
  const itemStyles = getStylesForItem(item, level);








  // When a map item is clicked, call the onMapClick prop
  const handleClick = () => {
    if (hasSubItems) {
      toggleMenu(item.title);
    } else if (isMapItem) {
      onMapClick(item);
    }
  };








  return (
    <li className="flex flex-col text-sm py-1 rounded-lg text-locus4b">
      <div className={itemStyles} onClick={handleClick}>
        <span className={`transition-transform ease-in-out duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}>
          {hasSubItems && <FaChevronRight className="text-xs" />}
        </span>
        <span>{item.title}</span>
      </div>
      {isMenuOpen && (
        <div style={{ paddingLeft: `${(level + 1) * 4}px` }}>
          {item.description && <p className="py-1 px-1 text-xs text-zinc-400">{item.description}</p>}
          {item.subMenu && (
            <ul>
              {item.subMenu.map((subItem, index) =>
                <RecursiveMenuItem
                  key={index}
                  item={subItem}
                  level={level + 1}
                  openMenus={openMenus}
                  toggleMenu={toggleMenu}
                  onMapClick={onMapClick} // Pass the handler down
                />
              )}
            </ul>
          )}
        </div>
      )}
    </li>
  );
};








export default function AtlasPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState({});
  const [activeLayers, setActiveLayers] = useState([]);
  const [isMapsDisplayedOpen, setMapsDisplayedOpen] = useState(true);
  const [infoLayer, setInfoLayer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cursorCoords, setCursorCoords] = useState("");
  const [scaleInfo, setScaleInfo] = useState({ width: 0, text: "" });


  const toggleMenu = (key) => {
    setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }));
  };
 
  const mapContainer = useRef(null);
  const map = useRef(null);

// Define your available basemaps using your custom URLs
const availableBasemaps = [
  { id: 'streets', styleUrl: `https://api.maptiler.com/maps/019853ca-f6df-77ec-b673-203abaabadc7/style.json`, previewImage: '/basemap-preview/street.png' },
  { id: 'satellite', styleUrl: `https://api.maptiler.com/maps/019853c9-84f2-74a0-8573-db61659509d2/style.json`, previewImage: '/basemap-preview/satellite.png' },
  { id: 'hillshade', styleUrl: `https://api.maptiler.com/maps/019853c7-ad20-7f0a-bc1e-8d5788565441/style.json`, previewImage: '/basemap-preview/hillshade.png' },
];

// State to track the currently active basemap
const [activeBasemapId, setActiveBasemapId] = useState(availableBasemaps[0].id);






  const handleMapLayerClick = (mapItem) => {
    // Check if the layer is already active to prevent duplicates
    if (activeLayers.find(layer => layer.id === mapItem.id)) {
      console.log(`${mapItem.title} is already on the map.`);
      return;
    }
    // Add the new layer to the state
    const newLayer = { ...mapItem, opacity: 1 };
    setActiveLayers(prevLayers => [...prevLayers, newLayer]);
  };








  // Handler to remove a layer from the map
  const handleRemoveLayer = (layerIdToRemove) => {
    setActiveLayers(prevLayers => prevLayers.filter(layer => layer.id !== layerIdToRemove));
  };
 
  // Handler to change the opacity of a layer
  const handleOpacityChange = (layerId, newOpacity) => {
    setActiveLayers(prevLayers =>
      prevLayers.map(layer =>
        layer.id === layerId ? { ...layer, opacity: parseFloat(newOpacity) } : layer
      )
    );
  };








  // Handler for when a drag-and-drop operation ends
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setActiveLayers((layers) => {
        const oldIndex = layers.findIndex(l => l.id === active.id);
        const newIndex = layers.findIndex(l => l.id === over.id);
        return arrayMove(layers, oldIndex, newIndex);
      });
    }
  };

  const handleBasemapChange = (newBasemapId) => {
    const newBasemap = availableBasemaps.find(b => b.id === newBasemapId);
    if (map.current && newBasemap) {
      // Use setStyle to change the basemap
      map.current.setStyle(`${newBasemap.styleUrl}?key=${import.meta.env.VITE_MAPTILER_API_KEY}`);
      setActiveBasemapId(newBasemapId);
    }
  };




  // useEffect for MAP INITIALIZATION (runs only once)
  useEffect(() => {
    if (!mapContainer.current) return;
    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY || 'xfcrXKfMNocHqLR21b3x';
    maptilersdk.config.apiKey = apiKey;

    const initialBasemap = availableBasemaps.find(b => b.id === activeBasemapId);
    if (!initialBasemap) return; // Exit if basemap not found
   
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: `${initialBasemap.styleUrl}?key=${apiKey}`,
      center: [109.926458, -7.268252],
      zoom: 14,
      pitch: 0,
    });
   
    map.current.on('load', function() {
      // Add the standard navigation and your working terrain control
      map.current.addControl(new maptilersdk.TerrainControl({ source: "terrain", exaggeration: 2 }), 'top-right');

      // Logic to update our custom scale bar
      const updateScale = () => {
        const mapInstance = map.current;
        if (!mapInstance) return;
       
        const y = mapInstance.getCenter().lat;
        const zoom = mapInstance.getZoom();
        const maxWidth = 100; // max width of the scale bar in pixels
       
        const metersPerPixel = (156543.03392 * Math.cos(y * Math.PI / 180)) / Math.pow(2, zoom);
        const maxMeters = metersPerPixel * maxWidth;


        const niceDistances = [5000000, 2000000, 1000000, 500000, 200000, 100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
        let niceDistance = 0;
        for (const dist of niceDistances) {
          if (maxMeters > dist) {
            niceDistance = dist;
            break;
          }
        }


        const scaleWidth = niceDistance / metersPerPixel;
        const scaleText = niceDistance >= 1000 ? `${niceDistance / 1000} km` : `${niceDistance} m`;
       
        setScaleInfo({ width: scaleWidth, text: scaleText });
      };
     
      // Your existing coordinate logic
      const updateCoords = (e) => {
        const lng = e.lngLat.lng;
        const lat = e.lngLat.lat;
        const lngDir = lng >= 0 ? 'E' : 'W';
        const latDir = lat >= 0 ? 'N' : 'S';
        setCursorCoords(`${toDMS(lat)}${latDir} ${toDMS(lng)}${lngDir}`);
      };
     
      // Add the event listeners
      map.current.on('move', updateScale);
      map.current.on('mousemove', updateCoords);


      // Run it once on load
      updateScale();
    });


    return () => { 
      map.current?.remove(); 
    };
  }, [activeBasemapId]);


  useEffect(() => {
    if (!map.current) return;


    const bottomLeftContainer = document.querySelector('.maptiler-control-bottom-left');
   
    if (bottomLeftContainer) {
      bottomLeftContainer.style.transition = 'transform 0.3s ease-in-out';
      if (isSidebarOpen) {
        bottomLeftContainer.style.transform = 'translateX(288px)'; // w-72 = 288px
      } else {
        bottomLeftContainer.style.transform = 'translateX(80px)'; // w-20 = 80px
      }
    }
  }, [isSidebarOpen, map.current]);
 
  // NEW useEffect for the map click handler
  useEffect(() => {
    if (!map.current) return;


    // The function that will handle the click
    const clickHandler = (e) => {
      const activeVectorLayerIds = activeLayers
        .map(l => `map-layer-${l.id}-layer`)
        .filter(id => map.current.getLayer(id));




      if (activeVectorLayerIds.length === 0) return;


      const features = map.current.queryRenderedFeatures(e.point, {
        layers: activeVectorLayerIds,
      });


      if (!features.length) return;
      const feature = features[0];




      // Placeholder div for the pop-up
      const placeholder = document.createElement('div');




      // MapTiler pop-up and set its content to our placeholder
      new maptilersdk.Popup({ className: 'feature-popup', closeButton: false })
        .setLngLat(e.lngLat)
        .setDOMContent(placeholder) // Use setDOMContent instead of setHTML
        .addTo(map.current);




      // 3. Tell React to render our component into that placeholder
      const root = createRoot(placeholder);
      root.render(<FeaturePopupContent feature={feature} />);
    };




    // Add the click handler to the map
    map.current.on('click', clickHandler);




    // Cleanup: remove the handler when the component re-renders or unmounts
    return () => {
      map.current.off('click', clickHandler);
    };
  }, [activeLayers]); // IMPORTANT: Dependency on activeLayers








  // useEffect for LAYER SYNCHRONIZATION (runs when activeLayers changes)
  useEffect(() => {
    if (!map.current?.isStyleLoaded()) return;




    const mapInstance = map.current;
   
    const renderedSourceIds = mapInstance.getStyle().sources ? Object.keys(mapInstance.getStyle().sources).filter(id => id.startsWith('map-layer-')) : [];




    // Add/Update layers
    activeLayers.forEach(layer => {
      const sourceId = `map-layer-${layer.id}`;
      const layerId = `${sourceId}-layer`;
     
      if (!mapInstance.getSource(sourceId)) {
        mapInstance.addSource(sourceId, { type: 'geojson', data: layer.geojsonData });
        const geomType = layer.geojsonData.geometry.type;
        if (geomType.includes('Polygon')) {
          mapInstance.addLayer({ id: layerId, type: 'fill', source: sourceId, paint: { 'fill-color': layer.color, 'fill-opacity': layer.opacity }});
        } else if (geomType.includes('LineString')) {
          mapInstance.addLayer({ id: layerId, type: 'line', source: sourceId, paint: { 'line-color': layer.color, 'line-width': 3, 'line-opacity': layer.opacity }});
        } else if (geomType.includes('Point')) {
          mapInstance.addLayer({ id: layerId, type: 'circle', source: sourceId, paint: { 'circle-color': layer.color, 'circle-radius': 6, 'circle-opacity': layer.opacity }});
        }
      } else {
        if (mapInstance.getLayer(layerId)) {
          const layerType = mapInstance.getLayer(layerId).type;
          mapInstance.setPaintProperty(layerId, `${layerType}-opacity`, layer.opacity);
        }
      }
    });




    // Remove old layers
    renderedSourceIds.forEach(sourceId => {
      const id = sourceId.replace('map-layer-', '');
      if (!activeLayers.some(l => l.id === id)) {
        const layerId = `${sourceId}-layer`;
        if (mapInstance.getLayer(layerId)) mapInstance.removeLayer(layerId);
        if (mapInstance.getSource(sourceId)) mapInstance.removeSource(sourceId);
      }
    });
   
    // Reorder existing layers
    [...activeLayers].reverse().forEach(layer => {
      const layerId = `map-layer-${layer.id}-layer`;
      if (mapInstance.getLayer(layerId)) {
        mapInstance.moveLayer(layerId);
      }
    });
  }, [activeLayers]);




   // NEW: A recursive helper function to find all map items in your Menus data
  const getAllMapItems = (menuItems) => {
    let maps = [];
    for (const item of menuItems) {
      // An item is a map if it has no sub-menu and no description
      if (!item.subMenu && !item.description) {
        maps.push(item);
      }
      // If it has a sub-menu, search inside it recursively
      if (item.subMenu) {
        maps = maps.concat(getAllMapItems(item.subMenu));
      }
    }
    return maps;
  };




  // NEW: This logic now filters your local Menus data instead of calling an API
  const searchResults = React.useMemo(() => {
    if (searchQuery.length < 2) {
      return [];
    }
    const allMaps = getAllMapItems(Menus);
    return allMaps.filter(map =>
      map.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // NEW Custom Basemap Switcher Component
  const BasemapSwitcher = ({ basemaps, activeBasemapId, onBasemapChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const activeBasemap = basemaps.find(b => b.id === activeBasemapId) || basemaps[0];

    const handleSelect = (id) => {
      onBasemapChange(id);
      setIsOpen(false);
    };

    return (
      <div className="absolute bottom-6 right-4 z-10 flex items-end gap-2">
        {/* The list of other basemap options */}
        <div className={`flex items-end gap-2 transition-all duration-300 ease-in-out ${isOpen ? 'max-w-xs opacity-100' : 'max-w-0 opacity-0'}`} style={{ overflow: 'hidden' }}>
          {basemaps
            .filter(b => b.id !== activeBasemapId) // Don't show the active one in the list
            .map(basemap => (
              <button key={basemap.id} onClick={() => handleSelect(basemap.id)} className="w-24 text-center group flex-shrink-0">
                <img src={basemap.previewImage} alt={basemap.name} className="w-full h-full object-cover rounded-md border-2 border-transparent group-hover:border-locus3c"/>
                <span className="text-xs font-semibold bg-locus4a/80 text-white rounded-b-md px-2 py-0.5 block">{basemap.name}</span>
              </button>
            ))
          }
        </div>

        {/* The currently active basemap button */}
        <div className="flex-shrink-0">
          <button onClick={() => setIsOpen(prev => !prev)} className="w-24 text-center group">
            <img src={activeBasemap.previewImage} alt={activeBasemap.name} className="w-full h-full object-cover rounded-md border-2 border-locus3c"/>
            <span className="text-xs font-semibold bg-locus4a/80 text-white rounded-b-md px-2 py-0.5 block">{activeBasemap.name}</span>
          </button>
        </div>
      </div>
    );
  };


  return (
    <div className="relative h-screen w-screen">
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full" />


      <StatusBar
        isSidebarOpen={isSidebarOpen}
        scaleInfo={scaleInfo}
        cursorCoords={cursorCoords}
      />
     
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-screen z-20 duration-300 bg-locus4a flex flex-col ${isSidebarOpen ? "w-72" : "w-20"}`}>
        <div
          className="absolute cursor-pointer -right-3 top-9 w-7 h-7 border-2 border-locus4a bg-white rounded-full flex items-center justify-center"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <TbLayoutSidebarLeftCollapse /> : <TbLayoutSidebarLeftExpand />}
        </div>
       
        <div className="flex-shrink-0 p-5 pt-8">
          <div className="flex gap-x-4 items-center">
            <img src="/EstheraLocus-Logo.svg" alt="logo" className={`w-10 h-10 cursor-pointer duration-500 ${isSidebarOpen && "rotate-[360deg]"}`} />
            <h1 className={`italic text-zinc-50 origin-left font-semibold text-[10px] duration-200 ${!isSidebarOpen && "scale-0"}`}>
              ESTHERA LOCUS ATLAS v1.0 <br/> CARTOGRAPHY & REMOTE SENSING <br/> UNIVERSITAS GADJAH MADA
            </h1>
          </div>
          <div className="relative">
            <div className={`flex items-center rounded-md bg-white/20 mt-6 p-2 ${!isSidebarOpen ? "px-2.5" : "px-4"}`}>
              <FaSearch className={`text-white text-lg block float-left cursor-pointer ${isSidebarOpen && "mr-2"}`} />
              <input
                type="search"
                placeholder="Search maps"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`text-base bg-transparent text-sm w-full text-white custom-search-cancel focus:outline-none ${!isSidebarOpen && "hidden"}`}
              />
            </div>
            {isSidebarOpen && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-1 bg-locus4b rounded-md shadow-lg max-h-60 overflow-y-auto">
                  <ul>
                    {searchResults.map((mapItem) => (
                      <li
                        key={mapItem.id}
                        onClick={() => {
                          handleMapLayerClick(mapItem); // Add the map layer
                          setSearchQuery(""); // Clear the search bar
                        }}
                        className="p-2 text-sm text-locus4a hover:bg-locus4a/10 cursor-pointer"
                      >
                        {mapItem.title}
                      </li>
                    ))}
                  </ul>
              </div>
            )}
          </div>
        </div>
       
        <hr className="border-t border-gray-600 mx-5" />




        <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
          <ul className="pt-2 px-5 pb-5">
            {Menus.map((menuItem) => {
              if (menuItem.key === 'mapsDisplayed') {
                if (activeLayers.length === 0) return null;
                return (
                  <li key={menuItem.key} className="flex flex-col rounded-md text-zinc-50 text-sm">
                    <div className="flex items-center gap-x-4 cursor-pointer p-2 hover:bg-white/20 rounded-md font-semibold" onClick={() => setMapsDisplayedOpen(prev => !prev)}>
                      <span className="text-2xl block float-left">{menuItem.icon}</span>
                      <span className={`text-base flex-1 duration-200 ${!isSidebarOpen && "hidden"}`}>{menuItem.title}</span>
                      {isSidebarOpen && <FaChevronRight className={`text-xs duration-300 ${isMapsDisplayedOpen && "rotate-90"}`} />}
                    </div>
                    {isMapsDisplayedOpen && isSidebarOpen && (
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                      <SortableContext items={activeLayers} strategy={verticalListSortingStrategy}>
                        <ul className="text-zinc-200 pl-4 pt-2 space-y-2">
                          {activeLayers.map(layer => (
                            <SortableLayerItem key={layer.id} layer={layer} onRemove={handleRemoveLayer} onOpacityChange={handleOpacityChange} onInfo={setInfoLayer} />
                          ))}
                        </ul>
                      </SortableContext>
                    </DndContext>
                    )}
                  </li>
                );
              }
              return (
                <li key={menuItem.key} className={`flex flex-col rounded-md text-zinc-50 text-sm`}>
                  <div className="flex items-center gap-x-4 cursor-pointer p-2 hover:bg-white/20 rounded-md font-semibold" onClick={() => menuItem.subMenu && toggleMenu(menuItem.key)}>
                    <span className="text-2xl block float-left">{menuItem.icon}</span>
                    <span className={`text-base flex-1 duration-200 ${!isSidebarOpen && "hidden"}`}>{menuItem.title}</span>
                    {menuItem.subMenu && isSidebarOpen && <FaChevronRight className={`text-xs duration-300 ${openMenus[menuItem.key] && "rotate-90"}`} />}
                  </div>
                  {menuItem.subMenu && openMenus[menuItem.key] && isSidebarOpen && (
                    <ul className="text-zinc-300">
                      {menuItem.subMenu.map((subItem, subIndex) => (
                        <RecursiveMenuItem key={subIndex} item={subItem} openMenus={openMenus} toggleMenu={toggleMenu} onMapClick={handleMapLayerClick} />
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
     
      {/* Info Popup */}
      {infoLayer && <InfoPopup layer={infoLayer} onClose={() => setInfoLayer(null)} isSidebarOpen={isSidebarOpen} />}
      
      <BasemapSwitcher
        basemaps={availableBasemaps}
        activeBasemapId={activeBasemapId}
        onBasemapChange={handleBasemapChange}
      />
    </div>
  );
};





