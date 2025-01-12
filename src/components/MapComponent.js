import React, { useEffect } from "react";
import "ol/ol.css";

const MapComponent = ({ mapRef }) => {
  useEffect(() => {
    const controls = document.querySelectorAll(".ol-control");
    controls.forEach((control) => {
      control.style.position = "absolute";
    });
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "500px",
        margin: "auto",
        position: "relative",
        border: "2px solid black",
      }}
    ></div>
  );
};

export default MapComponent;
