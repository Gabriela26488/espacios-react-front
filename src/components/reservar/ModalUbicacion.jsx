import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { Button, Modal } from "react-bootstrap";

export const ModalUbicacion = ({ show, onHide, setUbicacion }) => {
  const position = [9.31778, -70.60361];
  const [posicionUsuario, setPosicionUsuario] = useState(null);
  const layer = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const continuar = () => {
    if (posicionUsuario === null) {
      onHide();
    }

    setUbicacion(posicionUsuario);
    setPosicionUsuario(null)
    onHide();
  }
  
  const LocationMarker = ({ posicionUsuario, setPosicionUsuario }) => {
    useMapEvents({
      click(e) {
        setPosicionUsuario(e.latlng);
      },
    });

    return posicionUsuario === null ? null : (
      <Marker
        position={posicionUsuario}
        Key={`${posicionUsuario.lat}${posicionUsuario.lng}`}
      />
    );
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Establecer Ubicación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "50vh", width: "100%" }}
        >
          <TileLayer url={layer} />
          <LocationMarker
            posicionUsuario={posicionUsuario}
            setPosicionUsuario={setPosicionUsuario}
          />
        </MapContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={continuar}>
          Seleccionar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
