import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const Maps = (props) => {
  const [mapStyles, setMapStyles] = useState({
    width: '400px',  // Set the desired width
    height: '300px', // Set the desired height
  });

  useEffect(() => {
    // Additional setup or side effects can be placed here if needed
  }, []);

  return (
    <Map
      google={props.google}
      zoom={14}
      style={mapStyles}
      initialCenter={{ lat: 37.7749, lng: -122.4194 }}
    >
      <Marker position={{ lat: 37.7749, lng: -122.4194 }} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDekcmaEqwUiVeX7Y3x1kh9Zjqkj3HGJI8",
})(Maps);