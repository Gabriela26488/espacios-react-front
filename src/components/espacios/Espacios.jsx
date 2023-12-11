import { useContext, useEffect, useState } from "react";
import { NavBar } from "../utils/NavBar";
import { Button, Container, Row, Spinner } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { url } from "../../backend";
import { Espacio } from "./Espacio";
import { CrearEspacio } from "./CrearEspacio";
import { PlusLg } from "react-bootstrap-icons";

export const Espacios = () => {
  const { usuario } = useContext(AuthContext);
  const [cargando, setCargando] = useState(false);
  const [listaEspacios, setListaEspacios] = useState([]);
  const [crear, setCrear] = useState(false);

  const cargar = async () => {
    setCargando(true);

    await axios
      .get(`${url}api/espacios/`, {
        headers: {
          Authorization: `Bearer ${usuario.token}`,
        },
      })
      .then((response) => {
        setCargando(false);
        setListaEspacios(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    cargar();
  }, []);
  return (
    <>
      <NavBar />

      {!crear ? (
        <Container className="mt-3">
          <h1 className="text-center text-primary">Espacios de Trabajo</h1>

          {!cargando ? (
            <>
              {listaEspacios.length > 0 ? (
                <Row className="mt-3">
                  {listaEspacios.map((espacio, k) => (
                    <Espacio espacio={espacio} />
                  ))}
                </Row>
              ) : (
                <div className="text-center mt-5 w-100">
                  <h4>No se han creado espacios de trabajo</h4>
                </div>
              )}

              <Button
                variant="success"
                
                className="position-fixed rounded-circle bottom-0 end-0 mb-4 me-4"
                style={{ zIndex: 20 }}
                onClick={() => setCrear(true)}
              >
                <PlusLg className="pb-1 fs-5"/>
              </Button>
            </>
          ) : (
            <div className="text-center mt-5 w-100">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </Container>
      ) : (
        <CrearEspacio setCrear={setCrear} cargar={cargar} />
      )}
    </>
  );
};
