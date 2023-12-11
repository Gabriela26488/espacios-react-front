import { useContext, useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { Espacio } from "./Espacio";
import { NavBar } from "../utils/NavBar";
import { url } from "../../backend";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export const Inicio = () => {
  const { usuario } = useContext(AuthContext);
  const [espacios, setEspacios] = useState([]);
  const [cargando, setCargando] = useState(false);

  const cargarEspacios = async () => {
    setCargando(true);

    await axios
      .get(`${url}api/espacios`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${usuario.token}`,
        },
      })
      .then((response) => {
        const lista = response.data;
        let espaciosFiltrados = [];

        lista.map((item) => {
          item.disponibilidad.map((disp) => {
            if (disp.reservadoPor == usuario._id) {
              const espacioReservado = item;
              espacioReservado.disponibilidad = {
                hora: disp.hora,
                fecha: disp.fecha,
              };
              espaciosFiltrados.push(espacioReservado);
            }
          });
        });
        setCargando(false);
        setEspacios(espaciosFiltrados);
      });
  };

  useEffect(() => {
    cargarEspacios();
  }, []);
  return (
    <>
      <Container className="mt-3">
        {!cargando ? (
          <>
            <h1 className="text-center text-primary my-5">Mis reservaciones</h1>
            {espacios.length > 0 ? (
              <Row>
                {espacios.map((espacio, k) => (
                  <Espacio espacio={espacio} key={k} />
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
    </>
  );
};
