import React, { useState, useEffect } from "react";
import "./styles.css";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import CustomInfoWindow from "./CustomInfoWindow";
import axios from "axios";
import { jaJP } from "@mui/material/locale";

export default function Map() {
  const defaultMapSettings = {
    center: {
      lat: 33.7746,
      lng: -84.3973
    },
    zoom: 17
  };
  const points = [
    { id: 1, title: "title1", location: "Klaus", lat: 33.7772515, lng: -84.3961846 },
    { id: 2, title: "title2", location: "CULC", lat: 33.7746352711, lng:  -84.3965092625 },
    { id: 3, title: "title3", location: "Tech Green", lat: 33.7746, lng: -84.3973 },
    { id: 4, title: "title4", location: "CRC", lat: 	33.775735, lng:  -84.4039701},
    { id: 5, title: "title5", location: "Exhibition Hall", lat: 33.7748, lng: -84.4018 },
    { id: 6, title: "title6", location: "Student Center", lat: 33.7734, lng: -84.3980 },
    { id: 7, title: "title7", location: "Ferst Art Center", lat: 33.7751, lng: -84.3993 },
    { id: 8, title: "title8", location: "Bobby Dodd Stadium", lat: 33.7726, lng: -84.3933 }

  ];

  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("CURRENT HOST:" + localStorage.getItem("user") )
    getData();
  }, []);

  async function getData() {
    const configuration = {
      method: "post",
      url: "https://yellow-campus-discovery-app.herokuapp.com/returnAllEvents",
      // data: {
      //     user: JSON.parse(localStorage.getItem("user")),
      // }
      };
  console.log("CURRENT HOST:" + localStorage.getItem("user") )
  JSON.parse(localStorage.getItem("user"))
  
  console.log(JSON.parse(localStorage.getItem("user")));
  // make the API call
  // useEffect(() => {
  //   getData();
  // }, []);
  let r = await axios(configuration)
  .then((result) => {
      console.log("yes");
      //console.log(result.data);
      // rows = result.data;
      // console.log(rows);
      // setLoaded(true);
      console.log("DONEEEEE");
      // console.log(rows);
      const tempArr = [];

      for (var i = 0; i < result.data.length; i++) {
        var tempLat = 0;
        var tempLng = 0;
        for (var j = 0; j < points.length; j++) {
          //console.log(result.data[i].location)
          if (result.data[i].location == points[j].location) {
            tempLat = points[j].lat;
            tempLng = points[j].lng;

            tempArr.push({
              id: j,
              title: result.data[i].title,
              location: result.data[i].location,
              lat: tempLat,
              lng: tempLng,
              details: result.data[i].details,
              host_email: result.data[i].host_email,
              is_invite_only: result.data[i].is_invite_only,
              max_attendees: result.data[i].max_attendees,
              start_time: result.data[i].start_time,
              end_time: result.data[i].end_time,
            })
    
            console.log(tempArr)
    

          }
        }
        
        //setTheArray(prev => [...prev, value]);
        //console.log(result.data[i])
      }

      setItems([
        ...items,
        ...tempArr
      ]);



      //setData(result.data);
      // global_data = result.data;
  })
  .catch((error) => {
      console.info(error);
   //   setError(error);
  }).finally(() => {
    setLoading(false);
  });
  }

  
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
          {items.map((element, idx) => {
            return (
              <Marker
                id={element.id}
                lat={element.lat}
                lng={element.lng}
                title={element.title} 
                location={element.location}
                details={element.details}
                host_email={element.host_email}
                is_invite_only={element.is_invite_only}
                max_attendees={element.max_attendees}
                start_time={element.start_time}
                end_time={element.end_time}
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
              location = {selectedCenter.location}
              details={selectedCenter.details}
              host_email={selectedCenter.host_email}
              is_invite_only={selectedCenter.is_invite_only}
              max_attendees={selectedCenter.max_attendees}
              start_time={selectedCenter.start_time}
              end_time={selectedCenter.end_time}
              close={() => {
                setSelectedCenter(null);
              }}
              position={{
                lat: selectedCenter.lat,
                lng: selectedCenter.lng,
                id: selectedCenter.id,
                title: selectedCenter.title,
                location: selectedCenter.location,
                details: selectedCenter.details,
                host_email: selectedCenter.host_email,
                is_invite_only: selectedCenter.is_invite_only,
                max_attendees: selectedCenter.max_attendees,
                start_time: selectedCenter.start_time,
                end_time: selectedCenter.end_time
              }}
            />
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
}
