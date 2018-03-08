import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";

const GoogleMaps = withScriptjs(withGoogleMap((props) => {
  console.log('these are the props in Map.js: ', props);
  const cent = props.mapCenter || { lat: 40.75062510000001, lng: -73.9766126 }
  return (
    <GoogleMap
      defaultZoom={props.mapZoom || 13}
      defaultCenter={props.mapCenter || { lat: 40.75062510000001, lng: -73.9766126 }}
      center={cent}
      zoom={props.mapZoom || 13}
    >
      {
        props.tasks.map(marker => (
          <Marker
            position={{ lat: marker.latitude, lng: marker.longitude }}
            key={marker.id}
          />
        ))
      }
    </GoogleMap>
  );
}));

export default GoogleMaps
