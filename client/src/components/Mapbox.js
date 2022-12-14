import React, { useRef, useEffect, useState } from 'react';
// import * as ReactDOM from "react-dom/client";
import { renderToString } from 'react-dom/server'
import '../css/Mapbox.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import handleData from '../services/handleData.js';
import { randomCoordinates } from '../utils/randomCoordinates';
import { dynamicStyling } from '../utils/dynamicStyling'
import Popup from './Popup';

mapboxgl.accessToken = window.env.REACT_APP_API_KEY_MAPBOX;

let processedData;


function Mapbox() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  // Default coordinated of the map
  const [lng, setLng] = useState(-0.118092);
  const [lat, setLat] = useState(51.509865);
  // Default zoom
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/vadim-nest/clae2a9xr009514ozptbewmn9',
      center: [lng, lat],
      zoom: zoom
    });

    (async () => {
      console.log('Ok');
      processedData = await handleData();
      let locationsAndOccurrences = processedData[0];
      let hashtags = processedData[1];
      let articles = processedData[2];
      // console.log(locationsAndOccurrences);
      // console.log(hashtags);
      // console.log(articles);

      displayHashtags(locationsAndOccurrences, hashtags, articles, map);
      dynamicStyling();
    })();
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

function displayHashtags (locationsAndOccurrences, hashtags, articles, map) {
  console.log(locationsAndOccurrences[3]);
  locationsAndOccurrences.forEach(location => {
    if (location.location_name !== 'global') {

      let lng = location.longitude;
      let lat = location.latitude;

      // ! limit to 10 hashtags per location (10 local, 10 global)
      let localLimit = location.occurrences.slice(0, 10);
      let globalLimit = locationsAndOccurrences[3].occurrences.slice(0, 10);
      let localAndGlobal = [];
      localLimit.forEach(element => localAndGlobal.push(element));
      globalLimit.forEach(element => localAndGlobal.push(element));


      localAndGlobal.forEach((element, index) => {

        const el = document.createElement('div');
        el.className = `${location.location_name}Marker${index}`;
        el.classList.add(`${location.location_name}Marker`);

        let currentCoordinates = randomCoordinates(Number(lng), Number(lat), index);

        // ! limit to 10 articles per location (10 local, 10 global)
        let url_ids = element.url_id.slice(0, 10);
        // console.log(articles);
        let foundArticles = url_ids.map(element => {
          return articles.find(article => article.id === element);
        })

        // I need all the links for the
        // let allLinks = renderAllLinks(foundArticles);

        let currentHashtag = hashtags.find(hashtag => hashtag.id === element.hashtag_id)

        // console.log(popup.innerHTML);

        // need to replace index below to all of the urls for the hashtag
        new mapboxgl.Marker(el)
            .setLngLat([currentCoordinates[0], currentCoordinates[1]])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(renderToString(<Popup foundArticles={foundArticles} currentHashtag={currentHashtag.hashtag} />))
            )
            .addTo(map.current);

          let h1 = document.createElement('H1');
          h1.innerText = `#${currentHashtag.hashtag}`;
          h1.classList.add('theMarker');
          h1.classList.add('glow');

          let theMarker = document.getElementsByClassName(`${location.location_name}Marker${index}`);
          theMarker[0].appendChild(h1);

      })

    }
  })


}

export default Mapbox;

// function renderAllLinks(allUrls) {
//   let ulStart = '<ul className-"articles">'
//   let ulEnd = '</ul>'
//   let finalReturn = allUrls.map(element => {
//     return `<li><p>${element.first_paragraph}..</p><a target="_blank" href="${element.url}">Read more >></a></li>`
//   })
//   return (ulStart + finalReturn.join('') + ulEnd);
// }
// ? Notes
// A pic as an uri example:
// const src = 'data:image/png;base64,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';




function hashtagSize(element) {

}


