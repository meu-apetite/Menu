import React, { useEffect } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import tt from '@tomtom-international/web-sdk-maps';

const TomTomMap = ({ apiKey, longitude, latitude }) => {
  useEffect(() => {
    const map = tt.map({
      key: 'GmL5wOEl3iWP0n1l6O5sBV0XKo6gHwht',
      container: 'map',
      center: [-38.9693,-12.2645],
      zoom: 15,
    });

    const marker = new tt.Marker().setLngLat([-38.9693,-12.2645]).addTo(map);

    return () => {
      map.remove();
    };
  }, [apiKey, longitude, latitude]);
  

  return <div id="map" style={{ width: '100%', height: '200px' }} />;
};

export default TomTomMap;
