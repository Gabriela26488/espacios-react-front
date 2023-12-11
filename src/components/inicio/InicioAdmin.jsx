import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../backend";
import { AuthContext } from "../../context/AuthContext";
import { Container, Row, Spinner } from "react-bootstrap";
import { Reserva } from "./Reserva";

export const InicioAdmin = () => {
  const { usuario } = useContext(AuthContext);
  const [reservaciones, setReservaciones] = useState([]);
  const [cargando, setCargando] = useState(false);

  const cargarEspacios = async () => {
    setCargando(true);
    await axios
      .get(`${url}api/espacios/buscar/reservados`, {
        headers: {
          Authorization: `Bearer ${usuario.token}`,
        },
      })
      .then((response) => {
        setCargando(false);
        setReservaciones(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    cargarEspacios();
  }, []);
  return (
    <Container className="mt-3">
      {!cargando ? (
        <>
          <h1 className="text-center text-primary my-5">Reservaciones</h1>
          {reservaciones.length > 0 ? (
              <Row>
                {reservaciones.map((reserva, k) => (
                  <Reserva reserva={reserva} key={k} />
                ))}
              </Row>
            ) : (
              <div className="text-center mt-5 w-100">
                <h4>No se han reservado espacios</h4>
              </div>
            )}
        </>
      ) : (
        <div className="text-center mt-5 w-100">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </Container>
  );
};
