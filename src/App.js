import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import { Draw } from "ol/interaction";
import { fromLonLat, toLonLat } from "ol/proj";
import ModalComponent from "./components/ModalComponent";
import MapComponent from "./components/MapComponent";

const App = () => {
  const mapRef = useRef();
  const vectorSourceRef = useRef(new VectorSource());
  const [map, setMap] = useState(null);
  const [draw, setDraw] = useState(null);
  const [waypoints, setWaypoints] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drawType, setDrawType] = useState(null);

  useEffect(() => {
    const mapInstance = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        new VectorLayer({ source: vectorSourceRef.current }),
      ],
      view: new View({ center: fromLonLat([0, 0]), zoom: 2 }),
    });

    setMap(mapInstance);
    return () => mapInstance.setTarget(undefined);
  }, []);

  const startDrawing = (type) => {
    if (draw) {
      map.removeInteraction(draw);
    }

    const drawInteraction = new Draw({ source: vectorSourceRef.current, type });

    drawInteraction.on("drawend", (event) => {
      let coordinates = event.feature.getGeometry().getCoordinates();
      if (type === "Polygon") {
        coordinates = coordinates[0];
      }
      coordinates = coordinates.map((coord) => toLonLat(coord));
      setWaypoints(coordinates);
      setDrawType(type);
      setIsModalOpen(true);
      map.removeInteraction(drawInteraction);
    });

    setDraw(drawInteraction);
    map.addInteraction(drawInteraction);
  };

  return (
    <div style={{ textAlign: "left", padding: "10px" }}>
      <button className="btnDraw" onClick={() => startDrawing("LineString")}>
        Draw LineString
      </button>
      <button className="btnDraw" onClick={() => startDrawing("Polygon")}>
        Draw Polygon
      </button>
      <MapComponent mapRef={mapRef} />
      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        waypoints={waypoints}
        drawType={drawType}
      />
    </div>
  );
};

export default App;
