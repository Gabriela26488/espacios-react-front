import { useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import Swal from "sweetalert2";
import axios from "axios";
import { url } from "../../backend";
import { AuthContext } from "../../context/AuthContext";
import marcadorPersonalizado from "../../assets/marcador.png";
import marcadorPersonalizado2 from "../../assets/marcador2.png";
import { useNavigate } from "react-router-dom";

export const LocalizarEspacio = ({
  listaEspacios,
  ubicacion,
  fecha,
  hora,
  cargando,
  setCargando,
  setListaEspacios,
  setUbicacion,
  setFecha,
  setHora,
  setBusqueda,
}) => {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const posicion =
    ubicacion !== null ? [ubicacion.lat, ubicacion.lng] : [9.31778, -70.60361];
  const disponibles = listaEspacios.length > 0 ? true : false;
  const layer = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const iconoPersonalizado = new L.Icon({
    iconUrl: marcadorPersonalizado,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const iconoPersonalizado2 = new L.Icon({
    iconUrl: marcadorPersonalizado2,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const handleClick = (espacio) => {
    Swal.fire({
      icon: "question",
      title: "Seguro que quieres resevar este espacio?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si",
      confirmButtonColor: "#0d6efd",
      denyButtonText: "No",
      denyButtonColor: "#dc3545",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setCargando(true);
        const formData = new FormData();
        formData.append("fecha", fecha);
        formData.append("hora", hora);
        await axios
          .put(`${url}api/espacios/reservar/${espacio._id}`, formData, {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: `Bearer ${usuario.token}`,
            },
          })
          .then((response) => {
            Swal.fire({
              title: "Exito!",
              icon: "success",
              text: "Espacio reservado.",
              confirmButtonText: "Continuar",
              confirmButtonColor: "#0d6efd",
            });
            setListaEspacios([])
            setUbicacion(null)
            setFecha(null);
            setHora(null);
            setBusqueda(false);
            navigate("/inicio")
          });
      }
    });
    console.log(espacio);
  };

  return (
    <Card className="w-100 mb-3">
      <Card.Body>
        <MapContainer
          center={posicion}
          zoom={16}
          scrollWheelZoom={disponibles}
          zoomControl={disponibles}
          dragging={disponibles}
          doubleClickZoom={disponibles}
          style={{ height: "50vh", width: "100%" }}
        >
          <TileLayer url={layer} />
          <Marker position={posicion} icon={iconoPersonalizado}>
            <Tooltip>Su ubicación</Tooltip>
          </Marker>

          {listaEspacios.map((espacio, i) => (
            <Marker
              key={i}
              position={[espacio.ubicacion.latitud, espacio.ubicacion.longitud]}
              icon={iconoPersonalizado2}
            >
              <Popup>
                <p>
                  <strong>Nombre: </strong> {espacio.nombre}
                </p>
                <p>
                  <strong>Dirección: </strong> {espacio.direccion}
                </p>
                <p>
                  <strong>Capacidad: </strong> {espacio.capacidad}
                </p>
                <p>
                  <strong>Precio: </strong> {espacio.precio}$
                </p>
                <Button
                  size="sm"
                  variant="primary w-100"
                  onClick={() => handleClick(espacio)}
                >
                  Reservar
                </Button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Card.Body>
    </Card>
  );
};
