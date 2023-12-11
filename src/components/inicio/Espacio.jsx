import moment from "moment";
import { Card, Col } from "react-bootstrap";

export const Espacio = ({ espacio }) => {
  return (
    <Col xs={12} sm={6} lg={4} className="px-2 mb-3">
      <Card className="p-2">
        <Card.Header className="text-center text-primary">
          <h4>
            <strong>{espacio.nombre}</strong>
          </h4>
        </Card.Header>
        <Card.Body>
          <p>
            <strong className="text-primary">Dirección: </strong>
            {espacio.direccion}
          </p>
          <p>
            <strong className="text-primary">Capacidad: </strong>
            {espacio.capacidad}
          </p>
          <p>
            <strong className="text-primary">Precio: </strong>
            {espacio.precio}$
          </p>

          <p>
            <strong className="text-primary">Fecha: </strong>
            {`${moment(espacio.disponibilidad.fecha).format("DD-MM-YYYY")} ${moment(espacio.disponibilidad.hora, "HH:mm").format("hh:mm A")}`}
          </p>

        </Card.Body>
      </Card>
    </Col>
  );
};
