import React, { useRef, useState } from "react";

import GoogleMapReact from "google-map-react";
import "./Marker.css";

const Marker = ({ plate, phone, sosMarkers }) => {
  const [isHovering, setisHovering] = useState(false);
  const markerStyle = {
    border: "1px solid white",
    borderRadius: "50%",
    height: 15,
    width: 15,
    backgroundColor: "red",
    cursor: "pointer",
    zIndex: 10,
    position: "relative",
  };
  const handleHover = (isHovered) => {
    setisHovering(isHovered);
  };

  return (
    <div>
      <div
        style={markerStyle}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        {(sosMarkers.find((marker) => marker.plate === plate) ||
          isHovering) && (
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
            {sosMarkers.find((marker) => marker.plate === plate) && (
              <h2 style={{ margin: 0 }}>Acil Durum Çağrısı !</h2>
            )}
            <span>Plaka: {plate}</span>
            <span>Tel.No.: {phone}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const Map = ({ markers, sosMarkers }) => {
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
              sosMarkers={sosMarkers}
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
