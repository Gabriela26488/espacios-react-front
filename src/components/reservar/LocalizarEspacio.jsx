import { useState } from "react";
import { Card } from "react-bootstrap";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

export const LocalizarEspacio = () => {
  const posicionInicial = [9.31778, -70.60361];
  const [posicion, setPosicion] = useState(posicionInicial);
  const [espacios, setEspacios] = useState([]);
  const layer = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  return (
    <Card className="w-100 mb-3">
      <Card.Body>
        <MapContainer
          center={posicion}
          zoom={13}
          scrollWheelZoom={false}
          zoomControl={false}
          dragging={false}
          doubleClickZoom={false}
          style={{ height: "50vh", width: "100%" }}
        >
          <TileLayer url={layer} />
          
        </MapContainer>
      </Card.Body>
    </Card>
  );
};
