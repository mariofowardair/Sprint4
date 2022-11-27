import React, { useState } from "react";
import "./styles.css";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import CustomInfoWindow from "./CustomInfoWindow";

export default function Map() {
  const defaultMapSettings = {
    center: {
      lat: 33.7746,
      lng: -84.3973
    },
    zoom: 17
  };
  const points = [
    { id: 1, title: "Klaus Advanced Computing Building", lat: 33.7772515, lng: -84.3961846 },
    { id: 2, title: "CULC", lat: 33.7746352711, lng:  -84.3965092625 },
    { id: 3, title: "Tech Green", lat: 33.7746, lng: -84.3973 },
    { id: 4, title: "CRC", lat: 	33.775735, lng:  -84.4039701},
    { id: 5, title: "Exhibition Hall", lat: 33.7748, lng: -84.4018 },
    { id: 6, title: "Student Center", lat: 33.7734, lng: -84.3980 },
    { id: 7, title: "Ferst Art Center", lat: 33.7751, lng: -84.3993 },
    { id: 8, title: "Bobby Dodd Stadium", lat: 33.7726, lng: -84.3933 }

  ];

  const [selectedCenter, setSelectedCenter] = useState(null);

  const handleShowInfo = (location) => {
    setSelectedCenter(location);
    console.log(location);
  };
  return (
    <div className="App">
      <div style={{ height: "100vh", width: "100vw" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyClLPbaWIzmTtBnjSiKwpRARB7a6CtysNc" }}
          defaultCenter={defaultMapSettings.center}
          defaultZoom={defaultMapSettings.zoom}
        >
          {points.map((element, idx) => {
            return (
              <Marker
                id={element.id}
                lat={element.lat}
                lng={element.lng}
                title={element.title} 
                showInfo={() => handleShowInfo(element)}
              />
            );
          })}

          {selectedCenter && (
            <CustomInfoWindow
              lat={selectedCenter.lat}
              lng={selectedCenter.lng}
              id = {selectedCenter.id}
              title = {selectedCenter.title}
              close={() => {
                setSelectedCenter(null);
              }}
              position={{
                lat: selectedCenter.lat,
                lng: selectedCenter.lng,
                id: selectedCenter.id,
                title: selectedCenter.title
              }}
            />
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
}
