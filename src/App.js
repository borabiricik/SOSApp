import React, { useEffect, useState } from "react";
import axios from "axios";
import Map from "./Map";

const App = () => {
  const [dataMarkers, setdataMarkers] = useState(null);
  const [sosMarkers, setsosMarkers] = useState(null);
  const updateMarker = async () => {
    await axios.get("http://159.65.116.234:3001/get_data").then((response) => {
      var markers = [];

      response.data["data"].forEach((element) => {
        markers.push({
          id: element.id,
          lat: element.lat,
          lng: element.lng,
          plate: element.plate,
          phone: element.phone,
          date: element.date,
        });
      });

      setdataMarkers(markers);
    });
    await axios.get("http://159.65.116.234:3001/get_sos").then((response) => {
      setsosMarkers(response.data.data);
    });
  };
  useEffect(() => {
    updateMarker();
    setTimeout(() => {
      updateMarker();
    }, 10000);
  }, []);

  return (
    <div>
      {dataMarkers && sosMarkers ? (
        <div style={{ display: "flex" }}>
          <div style={{ height: "100vh", flex: 1, position: "sticky", top: 0 }}>
            <Map markers={dataMarkers} sosMarkers={sosMarkers} />
          </div>
          <div style={{ width: "20%" }}>
            <h2>Acil Yardım Çağrıları: </h2>
            {sosMarkers.map((marker, index) => {
              return (
                <div style={{ borderBottom: "1px solid black" }}>
                  <p>Plaka: {marker.plate}</p>
                  <p>Tel.No.{marker.phone}</p>
                  <p>Çağrı Zamanı: {new Date(marker.date).toUTCString()}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>Yukleniyor...</p>
      )}
    </div>
  );
};

export default App;
