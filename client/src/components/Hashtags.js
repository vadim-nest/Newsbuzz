/// app.js
// import React from 'react';
import DeckGL from '@deck.gl/react';
// The guy was using PathLayer, not sure about the difference
import { TextLayer } from '@deck.gl/layers';
import Mapbox from './Mapbox';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

// Data to be used by the LineLayer
// const data = [
//   {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
// ];

// DeckGL react component
function Hashtags({data, viewState}) {
  // data [{name: 'Colma (COLM)', address: '365 D Street, Colma CA 94014', coordinates: [-122.466233, 37.684638]}];


  const layer = new TextLayer({
    id: 'TextLayer',
    data: [
      {text: '#San Francisco', coordinates: [-2.983333, 53.400002]}
    ],
    pickable: true,
    getPosition: d => d.coordinates,
    getText: d => d.name,
    getSize: 32,
    getAngle: 0,
    getTextAnchor: 'middle',
    getAlignmentBaseline: 'center'
  });

  // We just center on Liverpool for now
  // return (
  //   <DeckGL
  //     initialViewState={INITIAL_VIEW_STATE}
  //     height='100%'
  //     width='100%'
  //     controller={true}
  //     layers={layer} // layers here!
  //   >
  //     <Mapbox />
  //   </DeckGL>
  // )

  return <DeckGL viewState={INITIAL_VIEW_STATE}
    layers={[layer]}
    getTooltip={({object}) => object && `${object.name}\n${object.address}`}>
      <Mapbox />
    </DeckGL>;

}

export default Hashtags;

