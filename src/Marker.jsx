import React from "react";
import "./Marker.css";

const Marker = (props) => {
  const { color, name, id } = props;
  return (
    <div
      id={id}
      className="pin"
      style={{ backgroundColor: color, cursor: "pointer" }}
      title={name}
    />
  );
};

export default Marker;
