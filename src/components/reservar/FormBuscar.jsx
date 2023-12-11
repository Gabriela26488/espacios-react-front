import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import moment from "moment/moment";

import { ModalUbicacion } from "./ModalUbicacion";

export const FormBuscar = ({
  ubicacion,
  setUbicacion,
  setFecha,
  setHora,
  handleSubmit,
  err,
  setErr,
  cargando
}) => {
  const [showUbicacion, setShowUbicacion] = useState(false);

  const handleReset = (e) => {
    setUbicacion(null);
    setFecha(null);
    setHora(null);
    setErr(false)
  };
  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Card.Body>
        <Form.Group className="mb-3" controlId="ubicacion">
          <Form.Label>
            <strong>Ubicación:</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Indique su ubicación"
            name="ubicacion"
            value={
              ubicacion === null ? "" : `${ubicacion.lat}, ${ubicacion.lng}`
            }
            readOnly
            onClick={() => setShowUbicacion(true)}
            isInvalid={err}
            disabled={cargando}
          />
        </Form.Group>

        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="fecha">
              <Form.Label>
                <strong>Fecha:</strong>
              </Form.Label>
              <Form.Control
                type="date"
                placeholder="Indique la fecha"
                name="fecha"
                min={moment(moment().add(1, "days").toDate()).format(
                  "YYYY-MM-DD"
                )}
                onChange={(e) => setFecha(e.target.value)}
                isInvalid={err}
                disabled={cargando}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="hora">
              <Form.Label>
                <strong>Hora:</strong>
              </Form.Label>
              <Form.Control
                type="time"
                placeholder="Indique su hora"
                name="hora"
                onChange={(e) => setHora(e.target.value)}
                isInvalid={err}
                disabled={cargando}
              />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="text-end">
        <Button variant="danger me-3" onClick={handleReset} type="reset" disabled={cargando}>
          Borrar
        </Button>
        <Button variant="primary" type="submit" disabled={cargando}>
          Aceptar
        </Button>
      </Card.Footer>

      <ModalUbicacion
        show={showUbicacion}
        onHide={() => setShowUbicacion(false)}
        setUbicacion={setUbicacion}
      />
    </Form>
  );
};
