import React, { useState, useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

mapboxgl.accessToken =
  'pk.eyJ1IjoiaHJkbGlja2FqZW5uYSIsImEiOiJjbDZkdHc2a2Ywb2lxM2pxazN2N2xmMXU5In0.Q96oJ9H_BUsaultZ_Iiayw';

function WineMap({ wines }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(0.5);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current, //container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    const mapboxClient = mbxGeocoding({
      accessToken: mapboxgl.accessToken,
    });

    wines.map((wine) => {
      mapboxClient
        .forwardGeocode({
          query: `${wine.region}, ${wine.country_of_origin}`,
          autocomplete: false,
          fuzzyMatch: true,
        })
        .send()
        .then((response) => /*console.log(response));*/ {
          if (
            !response ||
            !response.body ||
            !response.body.features ||
            !response.body.features.length
          ) {
            console.error('Invalid response:');
            console.error(response);
            return;
          }
          const feature = response.body.features[0];

          new mapboxgl.Marker().setLngLat(feature.center).addTo(map.current);
        });
    });
  }, []);

  useEffect(() => {
    if (!map.current) return;
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  return (
    <div>
      <div ref={mapContainer} className='WineMap-container' />
      <div className='sidebar'>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
    </div>
  );
}

export default WineMap;
