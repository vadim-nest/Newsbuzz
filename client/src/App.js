import React, { useRef, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Hashtags from './components/Hashtags';
import Mapbox from './components/Mapbox';
// import Map from './components/Map';

function App() {

  return (
    <>
      <Mapbox />
    </>
  );
}

export default App;


// import Box from "@material-ui/core/Box";
// import DeckGL from "@deck.gl/react";
// import { MapView } from "@deck.gl/core";
// import { LineLayer } from "@deck.gl/layers";
// import { Map } from "react-map-gl";

// const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidmFkaW0tbmVzdCIsImEiOiJjbGFlMzJ0YWEwcHU5M3VtaGpxZzl0d2czIn0.sHidpt9tFsMRnr8uYbfvyA';

// const INITIAL_VIEW_STATE = {
//     longitude: -122.41669,
//     latitude: 37.7853,
//     zoom: 13,
//     pitch: 0,
//     bearing: 0
// };

// const data = [
//     {
//         sourcePosition: [-122.41669, 37.7853],
//         targetPosition: [-122.41669, 37.781]
//     }
// ];

// function App() {
//     return (
//         <Box
//             id='mapcontainer'
//             sx={{
//                 border: 1,
//                 height: 450,
//                 width: "auto",
//                 m: 5
//             }}
//         >
//             <DeckGL
//                 initialViewState={INITIAL_VIEW_STATE}
//                 controller={true}
//                 id="deck-gl"
//             >
//                 <LineLayer id="line-layer" data={data} />
//                 <MapView
//                     id="map"
//                     controller={false}
//                 >
//                     <Map
//                         mapStyle="mapbox://styles/vadim-nest/clae2a9xr009514ozptbewmn9"
//                         mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
//                     />
//                 </MapView>
//             </DeckGL>
//         </Box>
//     );
// }

// export default App;
