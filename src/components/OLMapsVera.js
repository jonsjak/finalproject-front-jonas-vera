/* import React, { useEffect, useRef } from 'react';
import olms from 'ol-mapbox-style';
import { transform } from 'ol/proj';

export const OLMapsVera = ({ mapIsReadyCallback }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const initialState = {
      lng: 11,
      lat: 49,
      zoom: 4
    };

    const myAPIKey = '18c85a44a76042788847e2fb74d27386';
    const mapStyle = 'https://maps.geoapify.com/v1/styles/positron/style.json';

    olms(mapContainer.current, `${mapStyle}?apiKey=${myAPIKey}`).then((map) => {
      map
        .getView()
        .setCenter(
          transform(
            [initialState.lng, initialState.lat],
            'EPSG:4326',
            'EPSG:3857'
          )
        );
      map.getView().setZoom(initialState.zoom);

      mapIsReadyCallback(map);
    });
  }, []);

  return <div className="map-container" ref={mapContainer} />;
};
 */