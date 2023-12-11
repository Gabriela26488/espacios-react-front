import moment from "moment";
import { Card, Col } from "react-bootstrap";

export const Reserva = ({reserva}) => {
  return (
    <Col xs={12} sm={6} lg={4} className="px-2 mb-3">
      <Card className="p-2">
        
        <Card.Body>
          <p>
            <strong className="text-primary">Espacio: </strong>
            {reserva.nombreEspacio}
          </p>
          <p>
            <strong className="text-primary">Usuario: </strong>
            {reserva.nombreUsuario}
          </p>
          <p>
            <strong className="text-primary">Correo: </strong>
            {reserva.correoUsuario}
          </p>

          <p>
            <strong className="text-primary">Fecha: </strong>
            {`${moment(reserva.fecha).format("DD-MM-YYYY")} ${moment(reserva.hora, "HH:mm").format("hh:mm A")}`}
          </p>

        </Card.Body>
      </Card>
    </Col>
  )
}
