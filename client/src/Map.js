import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";

const GoogleMaps = withScriptjs(withGoogleMap((props) => {
  console.log('these are the props in Map.js: ', props);
  // const cent = props.mapCenter;
  return (
    <GoogleMap
      defaultZoom={props.mapZoom}
      defaultCenter={props.mapCenter}
      center={props.mapCenter}
      zoom={props.mapZoom || 11}
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
