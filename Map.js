import './Map.css';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import env from "react-dotenv";
import googleMapStyles from './GoogleMapStyles.js';
GoogleMap.defaultProps = googleMapStyles;
// import { GoogleMap } from "@react-google-maps/api";

// const { GoogleMap } = require("@react-google-maps/api");


function Map() {

  const options = {
    styles: googleMapStyles,
  }
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBZkcBfWof9I7rL_l3dgqTU5oe7PLYfklg"
  });

  // console.log(env.PUBLIC_GOOGLE_MAPS_API_KEY);

  if (!isLoaded) return <div>Loading...</div>

  // We just center on Liverpool for now
  return (
  <>
  {/* <div>{env.REACT_APP_API_KEY}</div> */}
  <GoogleMap
    zoom={11}
    center={{lat: 53.400002, lng: -2.983333}}
    mapContainerClassName='map-container'
    mapStyles={googleMapStyles}
    options={options}

    >
    <Marker position={{lat: 53.400002, lng: -2.983333}} />
    {/* <p>Hello</p> */}
  </GoogleMap>;
  </>
  )
}

export default Map;
