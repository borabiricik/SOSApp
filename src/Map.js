import React, { useRef, useState } from "react";

import GoogleMapReact from "google-map-react";
import "./Marker.css";

const Marker = ({ plate, phone }) => {
  const markerStyle = {
    border: "1px solid white",
    borderRadius: "50%",
    height: 10,
    width: 10,
    backgroundColor: "blue",
    cursor: "pointer",
    zIndex: 10,
    position: "relative",
  };

  return (
    <div>
      <div style={markerStyle}>
        <div
          style={{
            minWidth: "max-content",
            background: "red",
            textAlign: "center",
            color: "white",
            fontWeight: 800,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            bottom: "150%",
          }}
        >
          <span>Plaka: {plate}</span>
          <span>Tel.No.: {phone}</span>
        </div>
      </div>
    </div>
  );
};

const Map = ({ markers }) => {
  const center = {
    lat: 38.5966042,
    lng: 36.7404559,
  };
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {markers ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyA6oNfLOje-eR4-X0ltd_A__WCygRL81So" }}
          defaultCenter={center}
          defaultZoom={7}
        >
          {markers.map(({ lat, lng, plate, phone }, index) => (
            <Marker
              key={index}
              lat={lat}
              lng={lng}
              plate={plate}
              phone={phone}
            />
          ))}
        </GoogleMapReact>
      ) : (
        <div>Yukleniyor...</div>
      )}
    </div>
  );
};

export default React.memo(Map);
