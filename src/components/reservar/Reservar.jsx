import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavBar } from "../utils/NavBar";
import { useState } from "react";
import moment from "moment/moment";
import { FormBuscar } from "./FormBuscar";
import { LocalizarEspacio } from "./LocalizarEspacio";
export const Reservar = () => {
  const [cargando, setCargando] = useState(false);
  const [err, setErr] = useState(false);
  const [ubicacion, setUbicacion] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState(null);

  const handleSubmit = (e) => {
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
      console.log(errores);
      setErr(true);
    }

    setErr(false);

    const formData = new FormData();
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
              />
            </Card>

            <LocalizarEspacio />
          </Col>
        </Row>
      </Container>
    </>
  );
};
