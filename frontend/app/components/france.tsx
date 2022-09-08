import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";
import randomColor from "randomcolor";
import { Link, useSearchParams } from "@remix-run/react";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/france/fr-departments.json";

const markers = [
  {
    id:'07156',
    markerOffset: 6,
    name: "Paris",
    coordinates: [2.3522219, 48.856614]
  },
  {
    id:'07650',
    markerOffset: 6,
    name: "Marseille",
    coordinates: [5.36978, 43.296482]
  },
  {
    id:'07480',
    markerOffset: 6,
    name: "Lyon",
    coordinates: [4.835659, 45.764043]
  },
  {
    id:'07630',
    markerOffset: 6,
    name: "Toulouse",
    coordinates: [1.444209, 43.604652]
  },
  {
    id:'07222',
    markerOffset: 6,
    name: "Nantes",
    coordinates: [-1.553621, 47.218371]
  },
  {
    id:'07643',
    markerOffset: 6,
    name: "Montpellier",
    coordinates: [3.8764, 43.6109]
  },
  {
    id:'07190',
    markerOffset: 6,
    name: "Strasbourg",
    coordinates: [7.7455, 48.5839]
  },
  {
    id:'07510',
    markerOffset: 6,
    name: "Bordeaux",
    coordinates: [-0.5805, 44.8404]
  },
  {
    id:'07015',
    markerOffset: 6,
    name: "Lille",
    coordinates: [3.057256, 50.62925]
  },
  {
    id:'07130',
    markerOffset: 6,
    name: "Rennes",
    coordinates: [-1.6743, 48.112]
  },
  {
    id:'07070',
    markerOffset: 6,
    name: "Reims",
    coordinates: [4.0285, 49.2653]
  },
  {
    id:'07661',
    markerOffset: 6,
    name: "Toulon",
    coordinates: [5.9284,43.1244]
  },
  {
    id:'07475',
    markerOffset: 6,
    name: "Saint-étienne",
    coordinates: [4.39,45.4339]
  },
  {
    id:'07028',
    markerOffset: 6,
    name: "Le Havre",
    coordinates: [0.1077,49.4938]
  },
  {
    id:'07487',
    markerOffset: 6,
    name: "Grenoble",
    coordinates: [5.7148,45.1787]
  },
  {
    id:'07280',
    markerOffset: 6,
    name: "Dijon",
    coordinates: [5.0167,47.3167]
  },
  {
    id:'07230',
    markerOffset: 6,
    name: "Angers",
    coordinates: [-0.552,47.4716]
  },
  {
    id:'07790',
    markerOffset: 6,
    name: "Bastia",
    coordinates: [9.4833, 42.55]
  },
  {
    id:'07110',
    markerOffset: 6,
    name: "Brest",
    coordinates: [-4.4863,48.3903]
  },
  {
    id:'07761',
    markerOffset: 6,
    name: "Ajaccio",
    coordinates: [8.7381,41.9189]
  },
  {
    id:'07249',
    markerOffset: 6,
    name: "Orléans",
    coordinates: [1.9039, 47.9029]
  },
  {
    id:'07240',
    markerOffset: 6,
    name: "Tours",
    coordinates: [0.704, 47.3948]
  },
  {
    id:'07412',
    markerOffset: 6,
    name: "Angoulême",
    coordinates: [0.1534, 45.65]
  },
  {
    id:'07434',
    markerOffset: 6,
    name: "Limoges",
    coordinates: [1.2476, 45.8336]
  },
  {
    id:'07335',
    markerOffset: 6,
    name: "Poitiers",
    coordinates: [0.3435, 46.5826]
  },
  {
    id:'07460',
    markerOffset: 6,
    name: "Clermont-Ferrand",
    coordinates: [3.0868, 45.7797]
  },
  {
    id:'07602',
    markerOffset: 6,
    name: "Bayonne",
    coordinates: [-1.473, 43.4932]
  },
  {
    id:'07749',
    markerOffset: 6,
    name: "Perpignan",
    coordinates: [2.8954, 42.6976]
  },
  {
    id:'07645',
    markerOffset: 6,
    name: "Nimes",
    coordinates: [4.3579, 43.8366]
  },
  {
    id:'07690',
    markerOffset: 6,
    name: "Nice",
    coordinates: [7.2661, 43.7031]
  },
];

export default function France () {

  const [searchParams] = useSearchParams();

  return (
    <ComposableMap
      projectionConfig={{
        scale: 700,
        center: [2.213749, 46.227638]
      }}
      projection="geoMercator"
      className={"h-full w-full"}
    >
      <ZoomableGroup center={[2.213749, 46.227638]} zoom={3.5}>
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
        {markers.map(({id, name, coordinates, markerOffset }) => (
          <Link key={`link-to-${id}`}
                onClick={() => {window.location.href=`/meteo/${id}?start=${searchParams.get('start')}&end=${searchParams.get('end')}&decade=${searchParams.get('decade')}`}}
                to={(`/meteo/${id}?start=${searchParams.get('start')}&end=${searchParams.get('end')}&decade=${searchParams.get('decade')}`)}>
          <Marker key={name} coordinates={coordinates as [number, number]}>
            <circle r={2} fill="#F00" stroke="grey" strokeWidth={1} />
            <text
              textAnchor="middle"
              y={markerOffset}
              className={"text-[3px]"}
            >
              {name}
            </text>
          </Marker>
          </Link>
        ))}
      </ZoomableGroup>
    </ComposableMap>
  );
};
