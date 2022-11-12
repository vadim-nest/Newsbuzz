import React, { useRef, useEffect, useState } from 'react';
import './Mapbox.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidmFkaW0tbmVzdCIsImEiOiJjbGFlMzJ0YWEwcHU5M3VtaGpxZzl0d2czIn0.sHidpt9tFsMRnr8uYbfvyA';

function Mapbox() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-2.983333);
  const [lat, setLat] = useState(53.400002);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/vadim-nest/clae2a9xr009514ozptbewmn9',
    center: [lng, lat],
    zoom: zoom
    });
    });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default Mapbox;
