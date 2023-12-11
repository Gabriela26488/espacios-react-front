import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavBar } from "../utils/NavBar";
import { useContext, useState } from "react";
import moment from "moment/moment";
import Swal from "sweetalert2";
import axios from "axios";
import { url } from "../../backend";
import { AuthContext } from "../../context/AuthContext";
import { FormBuscar } from "./FormBuscar";
import { LocalizarEspacio } from "./LocalizarEspacio";

export const Reservar = () => {
  const { usuario } = useContext(AuthContext);
  const [cargando, setCargando] = useState(false);
  const [listaEspacios, setListaEspacios] = useState([]);
  const [err, setErr] = useState(false);
  const [ubicacion, setUbicacion] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState(null);
  const [busqueda, setBusqueda] = useState(false);

  function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en km
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    let errores = [];
    if (ubicacion === null) errores.push("La ubicación no puede estar vacia");
    if (fecha === null) errores.push("La fecha no puede estar vacia");
    if (hora === null) errores.push("La hora no puede estar vacia");
    if (moment(fecha).isBefore(moment().add(1, "days").toDate()))
      errores.push("La fecha no puede ser anterior ni igual a hoy");
    if (
      !moment(hora, "HH:mm").isBetween(
        moment("06:00", "HH:mm"),
        moment("21:00", "HH:mm")
      )
    )
      errores.push("La hora debe estar entre las 6:00 AM y 9:00 PM ");

    if (errores.length > 0) {
      let htmlErrors = "";
      errores.map((i) => {
        htmlErrors += `<p>${i}</p>`;
      });

      Swal.fire({
        title: "Error!",
        icon: "error",
        html: htmlErrors,
        confirmButtonText: "Continuar",
        confirmButtonColor: "#0d6efd",
      });
      setErr(true);
      setCargando(false);
      return;
    }

    setErr(false);
    const formData = new FormData();

    await axios
      .get(`${url}api/espacios`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${usuario.token}`,
        },
      })
      .then((response) => {
        response.data.forEach((punto) => {
          punto.distancia = calcularDistancia(
            ubicacion.lat,
            ubicacion.lng,
            punto.ubicacion.latitud,
            punto.ubicacion.longitud
          );
        });

        const espacios = response.data.sort(
          (a, b) => a.distancia - b.distancia
        );
        const espaciosDisponibles = espacios.filter((espacio) => {
          let disponible = true;
          if (espacio.disponibilidad.length > 0) {
            const disponibilidad = espacio.disponibilidad;

            disponibilidad.map((item) => {
              if (item.fecha == fecha) disponible = false;
            });
          }

          return disponible;
        });

        setListaEspacios(espaciosDisponibles.slice(0, 10));

        setBusqueda(true);
        setCargando(false);
      });
  };

  return (
    <>
      <NavBar />
      <Container className="mt-3">
        <h1 className="text-center text-primary my-5">Reservar</h1>
        <Row className="w-100">
          <Col
            xs={{ span: 12, offset: 0 }}
            md={{ span: 10, offset: 1 }}
            lg={{ span: 8, offset: 2 }}
          >
            <Card className="w-100 mb-3">
              <FormBuscar
                ubicacion={ubicacion}
                setUbicacion={setUbicacion}
                fecha={fecha}
                setFecha={setFecha}
                hora={hora}
                setHora={setHora}
                err={err}
                setErr={setErr}
                handleSubmit={handleSubmit}
                cargando={cargando}
              />
            </Card>

            {busqueda ? (
              <LocalizarEspacio
                listaEspacios={listaEspacios}
                ubicacion={ubicacion}
                fecha={fecha}
                hora={hora}
                cargando={cargando}
                setCargando={setCargando}
                setListaEspacios={setListaEspacios}
                setUbicacion={setUbicacion}
                setFecha={setFecha}
                setHora={setHora}
                setBusqueda={setBusqueda}
              />
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
