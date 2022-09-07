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
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json";

const markers = [
  {
    markerOffset: 6,
    name: "Paris",
    coordinates: [2.3522219, 48.856614]
  },
];

export default function World () {
  function log() {
    console.log('Clicked');
  };
  return (
    <ComposableMap>
      <ZoomableGroup center={[0, 0]} zoom={1}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: randomColor(), opacity: "20%" },
                  hover: { fill: randomColor(), opacity: "200%" },
                }}
                stroke="black"
              />
            ))
          }
        </Geographies>
        {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker key={name} coordinates={coordinates as [number, number]} onClick={log}>
            <circle r={2} fill="#F00" stroke="#fff" strokeWidth={2} />
            <text
              textAnchor="middle"
              y={markerOffset}
              className={"text-[5px]"}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ZoomableGroup>
    </ComposableMap>
  );
};
