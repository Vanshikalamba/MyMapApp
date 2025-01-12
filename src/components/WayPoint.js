import React, { useState } from "react";

const WaypointRow = ({ index, wp, distance }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <tr>
      <td>WP({index})</td>
      <td>
        {wp[0].toFixed(6)}, {wp[1].toFixed(6)}
      </td>
      <td>{distance} m</td>
      <td>
        <button onClick={() => setShowActions(!showActions)}>⋮</button>
        {showActions && (
          <div
            style={{
              display: "inline-block",
              marginLeft: "5px",
              padding: "5px",
            }}
          >
            <button onClick={() => alert("Insert Polygon Before")}>
              ⬅️Insert Polygon Before{" "}
            </button>
            <br></br>
            <button onClick={() => alert("Insert Polygon After")}>
              ➡️Insert Polygon After
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default WaypointRow;
