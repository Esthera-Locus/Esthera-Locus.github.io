import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// You'll need icons from a library like 'react-icons' for a better look
// Run: npm install react-icons
import {
  FiMenu,
  FiX,
  FiSearch,
  FiMaximize,
  FiZoomIn,
  FiZoomOut,
  FiGlobe,
  FiChevronLeft,
  FiChevronRight,
  FiInfo,
  FiArrowUp,
  FiArrowDown,
  FiCheckSquare,
  FiSquare,
} from 'react-icons/fi';

export default function AtlasPage() {
  const [isDashboardCollapsed, setIsDashboardCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-800">
      {/* === HEADER === */}
      {/* The header always exists at the top */}
      <header className="flex items-center w-full h-20 px-6 bg-white shadow-md z-20 shrink-0">
        {/* Logo and Logotype section */}
        <div className="flex items-center">
          {/* This logo, when clicked, will take the user back to the Landing Page */}
          <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div> {/* [cite: 33-34] */}
          <div className="ml-4">
            <p className="font-bold text-lg">Esthera Locus</p>
            <p className="text-sm text-gray-600">Cartography & Remote Sensing 2023</p>
            <p className="text-xs text-gray-500">Universitas Gadjah Mada</p>
          </div> {/* [cite: 35] */}
        </div>

        {/* Search Bar that spans the remaining width */}
        <div className="flex-grow ml-8">
          <div className="relative">
            <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search for addresses, parcels or maps"
              className="w-full h-12 pl-12 pr-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> {/* [cite: 36-37] */}
          </div>
        </div>
      </header>

      {/* === MAIN CONTENT AREA === */}
      <main className="flex flex-grow overflow-hidden">
        {/* === DASHBOARD (LEFT SIDE) === */}
        {/* The dashboard is on the left and is collapsible */}
        <aside
          className={`bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col z-10 ${
            isDashboardCollapsed ? 'w-0 p-0' : 'w-96 p-4'
          }`}
        >
          {/* Dashboard Header with Collapse Button */}
          <div className={`flex justify-between items-center mb-4 transition-opacity ${isDashboardCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            <h2 className="text-xl font-bold">Geocatalog</h2>
            <button
              onClick={() => setIsDashboardCollapsed(true)}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              <FiChevronLeft size={20} />
            </button> {/* [cite: 75] */}
          </div>

          {/* This is a placeholder for your hierarchical map catalog */}
          <div className={`flex-grow overflow-y-auto transition-opacity ${isDashboardCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            <div className="p-2 mt-2 font-semibold bg-gray-100 rounded-md">KKL II</div> {/* [cite: 68] */}
            {/* The logic for the dropdowns will go here */}
          </div>

           {/* This "Maps Displayed" section will only appear when a map is active */}
           <div className={`mt-4 pt-4 border-t transition-opacity ${isDashboardCollapsed ? 'opacity-0' : 'opacity-100'}`}>
             <h3 className="font-bold">Maps displayed</h3> {/* [cite: 103] */}
             {/* Placeholder for a displayed layer */}
             <div className="mt-2 p-2 border rounded-md">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <FiCheckSquare className="text-blue-600" />
                        <span>Permeability</span>
                    </div>
                    <FiInfo className="cursor-pointer hover:text-blue-600" /> {/* [cite: 113-114] */}
                </div>
                <p className="text-xs mt-2">Transparency</p>
                <input type="range" className="w-full mt-1" /> {/* [cite: 105] */}
                {/* The logic for layer reordering will go here */}
             </div>
           </div>
        </aside>
        
        {/* This is the button to un-collapse the dashboard */}
        <button
            onClick={() => setIsDashboardCollapsed(false)}
            className={`bg-white p-2 rounded-r-lg shadow-lg my-4 h-12 self-start transition-all duration-300 ease-in-out z-10 ${
                isDashboardCollapsed ? 'opacity-100' : 'opacity-0 -translate-x-full'
            }`}
        >
            <FiChevronRight size={20}/>
        </button>


        {/* === MAP (RIGHT SIDE) === */}
        <div className="flex-grow relative">
          <MapContainer
            center={[-7.7956, 110.3695]}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            {/* The basemap uses Maptiler */}
            <TileLayer
              url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=xfcrXKfMNocHqLR21b3x"
              attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>'
            /> {/* [cite: 7, 44-45] */}
            
            {/* -- MAP OVERLAY CONTROLS -- */}
            {/* Top-Right Navigation Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
              <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"><FiMaximize/></button> {/* [cite: 54] */}
              <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"><FiZoomIn/></button> {/* [cite: 54] */}
              <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"><FiZoomOut/></button> {/* [cite: 54] */}
              <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"><FiGlobe/></button> {/* [cite: 54] */}
            </div>

            {/* Bottom-Right Basemap Switcher */}
            <div className="absolute bottom-12 right-4 z-[1000]">
                 <button className="w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center text-xs font-semibold hover:bg-gray-100">Basemap</button> {/* [cite: 48] */}
            </div>

            {/* Bottom-Left Footer Information */}
            <div className="absolute bottom-4 left-4 z-[1000] bg-white bg-opacity-75 p-2 rounded-lg shadow-md">
                <div className="scale-bar-placeholder border-b-2 border-t-2 border-x-2 border-gray-700 text-center text-xs px-4 py-1">10 km</div> {/* [cite: 58] */}
                <div className="coordinates-placeholder text-xs mt-1">Coordinates: 110.3695, -7.7956</div> {/* [cite: 59-60] */}
            </div>

          </MapContainer>
        </div>
      </main>
    </div>
  );
}