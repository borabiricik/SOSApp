import React, { useEffect, useState } from "react";
import axios from "axios";
import Map from "./Map";

const App = () => {
  const [dataMarkers, setdataMarkers] = useState(null);
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
  };
  useEffect(() => {
    updateMarker();
  }, []);

  return (
    <div>
      {dataMarkers ? (
        <div style={{ display: "flex" }}>
          <div style={{ height: "100vh", flex: 1 }}>
            <Map markers={dataMarkers} />
          </div>
          <div style={{ width: "20%" }}>
            {dataMarkers.map((marker, index) => {
              console.log(marker);
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
