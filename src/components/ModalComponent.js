import React from "react";
import Modal from "react-modal";
import Waypoint from "./WayPoint";

Modal.setAppElement("#root");

const calculateDistance = (coord1, coord2) => {
  if (!coord1 || !coord2) return 0;

  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;
  const R = 6371000;
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2);
};

const ModalComponent = ({ isOpen, onClose, waypoints, drawType }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: { width: "50%", margin: "auto", textAlign: "center" },
      }}
    >
      <h2>
        {drawType === "LineString"
          ? "LineString Waypoints"
          : "Polygon Waypoints"}
      </h2>
      <table border="1" style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>WP</th>
            <th>Coordinates (Lon, Lat)</th>
            <th>Distance (m)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {waypoints.map((wp, index) => (
            <Waypoint
              key={index}
              index={index}
              wp={wp}
              distance={
                index > 0 ? calculateDistance(waypoints[index - 1], wp) : 0
              }
            />
          ))}
        </tbody>
      </table>
      <button className="btnDraw" onClick={onClose}>
        Close
      </button>
    </Modal>
  );
};

export default ModalComponent;
