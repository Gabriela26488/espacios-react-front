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
            <strong className="text-primary">Descripción: </strong>
            {espacio.descripcion}
          </p>
          <p>
            <strong className="text-primary">Ubicación: </strong>
            {espacio.ubicacion}
          </p>
          <p>
            <strong className="text-primary">Capacidad: </strong>
            {espacio.capacidad}
          </p>
          <p>
            <strong className="text-primary">Precio: </strong>
            {espacio.precio}
          </p>
        </Card.Body>
      </Card>
    </Col>
  );
};
