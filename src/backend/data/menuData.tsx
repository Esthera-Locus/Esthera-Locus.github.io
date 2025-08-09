
import React from "react";
import { FaEarthAsia, FaLayerGroup } from "react-icons/fa6";


// A large red square
const largePolygonGeoJSON = {
  type: 'Feature',
  // [ADDED] properties object for attributes
  properties: {
    'Layer Name': 'Kepadatan Penduduk',
    'Value': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices pharetra nunc, id accumsan nulla fermentum eu. Phasellus mi orci, mollis eu dui et, ornare consequat ante. Praesent luctus ex sit amet ante feugiat, a varius lacus tincidunt. Ut mollis odio ex, ut faucibus tellus vehicula ac. Ut sem ante, egestas sit amet tortor at, faucibus imperdiet dolor. Donec molestie maximus sem, in rutrum nunc interdum vitae. Maecenas volutpat, lacus in porta porttitor, massa lorem venenatis tellus, id aliquet lectus diam eu nunc. Morbi lorem risus, dapibus nec sem sit amet, rhoncus bibendum nibh. Vivamus pretium lacus ac dapibus hendrerit. Vivamus eu ullamcorper quam, luctus auctor velit. Sed pharetra velit sit amet dictum molestie. Etiam quis ligula eleifend, sagittis nunc nec, convallis massa.',
    'Source': 'BPS 2023',
  },
  geometry: {
    type: 'Polygon',
    coordinates: [[[109.91, -7.28], [109.94, -7.28], [109.94, -7.25], [109.91, -7.25], [109.91, -7.28]]]
  }
};

// A medium blue square
const mediumPolygonGeoJSON = {
  type: 'Feature',
  properties: {
    'Layer Name': 'Batas Persil',
    'Owner': 'Mr. John Pork',
    'Area (sqm)': 22500,
  },
  geometry: {
    type: 'Polygon',
    coordinates: [[[109.915, -7.275], [109.935, -7.275], [109.935, -7.255], [109.915, -7.255], [109.915, -7.275]]]
  }
};

// A small green square, nested inside the medium one
const smallPolygonGeoJSON = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [[[109.920, -7.270], [109.930, -7.270], [109.930, -7.260], [109.920, -7.260], [109.920, -7.270]]]
  }
};

// A yellow line
const lineGeoJSON = {
  type: 'Feature',
  properties: {
    'Layer Name': 'Penggunaan Lahan',
    'Type': 'Main Road',
  },
  geometry: {
    type: 'LineString',
    coordinates: [[109.905, -7.265], [109.945, -7.265]]
  }
};

// A purple point inside the smallest polygon
const pointGeoJSON = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [109.925, -7.265]
  }
};


export const Menus = [
  { 
    title: "MAPS DISPLAYED", 
    icon: <FaLayerGroup />, 
    key: "mapsDisplayed" 
  },
  {
    title: "GEOCATALOG",
    icon: <FaEarthAsia />,
    gap: true,
    key: "geocatalog",
    subMenu: [
      {
        title: "KKL II Wonosobo",
        description: "Akuisisi Data Geospasial untuk Penyusunan Basis Data Wilayah",
        subMenu: [
          {
            title: "Pemetaan Skala Kecil",
            subMenu: [
              {
                title: "Parameter Fisik",
                subMenu: [
                  { id: "kepadatan-penduduk", title: "Peta Kepadatan Penduduk", geojsonData: largePolygonGeoJSON, color: '#ef4444' }, // Red
                  { id: "penggunaan-lahan", title: "Peta Penggunaan Lahan", geojsonData: lineGeoJSON, color: '#eab308' }, // Yellow
                ]
              },
            ]
          },
          {
            title: "Pemetaan Skala Besar",
            subMenu: [
              {
                title: "Kualitas Permukiman",
                subMenu: [
                  { id: "batas-persil", title: "Peta Batas Persil", geojsonData: mediumPolygonGeoJSON, color: '#3b82f6' }, // Blue
                ]
              }
            ]
          },
          {
            title: "Pemutakhiran Peta RBI",
            subMenu: [
              { id: "rbi-1", title: "Peta RBI Lembar 1209-312", geojsonData: smallPolygonGeoJSON, color: '#22c55e' }, // Green
              { id: "rbi-2", title: "Peta RBI Lembar 1209-314", geojsonData: pointGeoJSON, color: '#8b5cf6' }, // Purple
            ]
          },
          // ... etc.
        ]
      },
      {
        title: "KKL III Guangdong",
        description: "Coming Soon..."
      }
    ]
  },
];