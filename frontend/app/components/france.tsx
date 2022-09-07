import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";
import randomColor from "randomcolor";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/france/fr-departments.json";

const markers = [
  {
    markerOffset: 6,
    name: "Paris",
    coordinates: [2.3522219, 48.856614]
  },
  {
    markerOffset: 6,
    name: "Marseille",
    coordinates: [5.36978, 43.296482]
  },
  {
    markerOffset: 6,
    name: "Lyon",
    coordinates: [4.835659, 45.764043]
  },
  {
    markerOffset: 6,
    name: "Toulouse",
    coordinates: [1.444209, 43.604652]
  },
  {
    markerOffset: 6,
    name: "Nantes",
    coordinates: [-1.553621, 47.218371]
  },
  {
    markerOffset: 6,
    name: "Montpellier",
    coordinates: [3.8764, 43.6109]
  },
  {
    markerOffset: 6,
    name: "Strasbourg",
    coordinates: [7.7455, 48.5839]
  },
  {
    markerOffset: 6,
    name: "Bordeaux",
    coordinates: [-0.5805, 44.8404]
  },
  {
    markerOffset: 6,
    name: "Lille",
    coordinates: [3.057256, 50.62925]
  },
  {
    markerOffset: 6,
    name: "Rennes",
    coordinates: [-1.6743, 48.112]
  },
  {
    markerOffset: 6,
    name: "Reims",
    coordinates: [4.0285, 49.2653]
  },
  {
    markerOffset: 6,
    name: "Toulon",
    coordinates: [5.9284,43.1244]
  },
  {
    markerOffset: 6,
    name: "Saint-étienne",
    coordinates: [4.39,45.4339]
  },
  {
    markerOffset: 6,
    name: "Le Havre",
    coordinates: [0.1077,49.4938]
  },
  {
    markerOffset: 6,
    name: "Grenoble",
    coordinates: [5.7148,45.1787]
  },
  {
    markerOffset: 6,
    name: "Dijon",
    coordinates: [5.0167,47.3167]
  },
  {
    markerOffset: 6,
    name: "Angers",
    coordinates: [-0.552,47.4716]
  },
  {
    markerOffset: 6,
    name: "Bastia",
    coordinates: [9.4833, 42.55]
  },
  {
    markerOffset: 6,
    name: "Brest",
    coordinates: [-4.4863,48.3903]
  },
  {
    markerOffset: 6,
    name: "Ajaccio",
    coordinates: [8.7381,41.9189]
  },
  {
    markerOffset: 6,
    name: "Orléans",
    coordinates: [1.9039, 47.9029]
  },
  {
    markerOffset: 6,
    name: "Tours",
    coordinates: [0.704, 47.3948]
  },
  {
    markerOffset: 6,
    name: "Angoulême",
    coordinates: [0.1534, 45.65]
  },
  {
    markerOffset: 6,
    name: "Limoges",
    coordinates: [1.2476, 45.8336]
  },
  {
    markerOffset: 6,
    name: "Poitiers",
    coordinates: [0.3435, 46.5826]
  },
  {
    markerOffset: 6,
    name: "Clermont-Ferrand",
    coordinates: [3.0868, 45.7797]
  },
  {
    markerOffset: 6,
    name: "Bayonne",
    coordinates: [-1.473, 43.4932]
  },
  {
    markerOffset: 6,
    name: "Perpignan",
    coordinates: [2.8954, 42.6976]
  },
  {
    markerOffset: 6,
    name: "Nimes",
    coordinates: [4.3579, 43.8366]
  },
  {
    markerOffset: 6,
    name: "Nice",
    coordinates: [7.2661, 43.7031]
  },
];

export default function France () {
  function log() {
    console.log('Clicked');
  };
  return (
    <ComposableMap
      projectionConfig={{
        scale: 700,
        center: [2.213749, 46.227638]
      }}
      projection="geoMercator"
    >
      <ZoomableGroup center={[2.213749, 46.227638]} zoom={3}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: randomColor(), opacity: "20%", stroke: "black", strokeWidth: "0.2px" },
                  hover: { fill: randomColor(), opacity: "200%", stroke: "black", strokeWidth: "0.2px" },
                }}
              />
            ))
          }
        </Geographies>
        {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker key={name} coordinates={coordinates as [number, number]} onClick={log}>
            <circle r={1} fill="#F00" stroke="#fff" strokeWidth={1} />
            <text
              textAnchor="middle"
              y={markerOffset}
              className={"text-[3px]"}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ZoomableGroup>
    </ComposableMap>
  );
};
