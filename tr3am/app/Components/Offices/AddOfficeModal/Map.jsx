import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const Map = withScriptjs(withGoogleMap((props) => {
  const { lat, lng } = props;
  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: lat, lng: lng }}>
      <Marker position={{ lat: -34.397, lng: 150.644 }}/>
    </GoogleMap>
  );
}));

export default Map;