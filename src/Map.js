import React from "react";
import GoogleMapReact from 'google-map-react';
import { Marker } from 'google-maps-react';
import { HiMapPin } from 'react-icons/hi2';
import { iconButtonClasses } from "@mui/material";

const AnyReactComponent = ({ text, icon }) => <div>{icon}{text}</div>;

export default function SimpleMap(){
  const defaultProps = {
    center: {
      lat: 33.7746,
      lng: -84.3973
    },
    zoom: 17
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyClLPbaWIzmTtBnjSiKwpRARB7a6CtysNc" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={33.7746}
          lng={-84.3973}
          icon = {<HiMapPin/>}
          text = "center"
        />
      </GoogleMapReact>
    </div>
  );
}