import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Form,
  Spinner,
} from "react-bootstrap";
import { ModalUbicacion } from "../reservar/ModalUbicacion";
import Swal from "sweetalert2";
import axios from "axios";
import { url } from "../../backend";
import { AuthContext } from "../../context/AuthContext";

export const CrearEspacio = ({cargar, setCrear}) => {
  const { usuario } = useContext(AuthContext);
  const [showUbicacion, setShowUbicacion] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [ubicacion, setUbicacion] = useState(null);
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [error, setError] = useState(false);

  const handleReset = (e) => {
    setUbicacion(null);
    setNombre("");
    setDireccion("");
    setCapacidad("");
    setPrecio("");
    setError("");

    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    let errores = [];
    if (ubicacion === null) errores.push("La ubicación no puede estar vacia");
    if (direccion.trim() === "")
      errores.push("La direccion no puede estar vacia");
    if (capacidad.trim() === "")
      errores.push("La capacidad no puede estar vacia");
    if (nombre.trim() === "") errores.push("El nombre no puede estar vacio");
    if (precio.trim() === "") errores.push("El precio no puede estar vacio");

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
      setError(true);
      setCargando(false);
      return;
    }

    setError(false);

    const formData = new FormData();
    formData.append(
      "ubicacion",
      JSON.stringify({
        latitud: ubicacion.lat,
        longitud: ubicacion.lng,
      })
    );
    formData.append("nombre", nombre);
    formData.append("direccion", direccion);
    formData.append("capacidad", capacidad);
    formData.append("precio", precio);

    await axios
      .post(`${url}api/espacios`, formData, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${usuario.token}`,
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Exito!",
          icon: "success",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#0d6efd",
        });
        setError(false);
        handleReset();
        setCrear(false);
        cargar();
      })
      .catch((error) => {
        let htmlErrors = "";
        error.response.data.errors.map((i) => {
          htmlErrors += `<p>${i.msg}</p>`;
        });

        Swal.fire({
          title: "Error!",
          icon: "error",
          html: htmlErrors,
          confirmButtonText: "Continuar",
          confirmButtonColor: "#0d6efd",
        });
        setError(true);
        setCargando(false);
        return;
      })
      .finally(() => {
        setCargando(false);
      });
  };
  return (
    <Container className="mt-3">
      <h1 className="text-center text-primary">Crear Espacio de Trabajo</h1>
      <Row className="mt-3">
        <Col
          xs={{ span: 12, offset: 0 }}
          md={{ span: 10, offset: 1 }}
          lg={{ span: 8, offset: 2 }}
        >
          <Card className="w-100 mb-3">
            <Form onSubmit={handleSubmit} noValidate>
              <Card.Body>
                <Form.Group className="mb-3" controlId="nombre">
                  <Form.Label>
                    <strong>Nombre:</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Indique el nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    isInvalid={error}
                    disabled={cargando}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="direccion">
                  <Form.Label>
                    <strong>Dirección:</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Indique la dirección"
                    name="direccion"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    isInvalid={error}
                    disabled={cargando}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="ubicacion">
                  <Form.Label>
                    <strong>Ubicación:</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Indique su ubicación"
                    name="ubicacion"
                    onClick={() => setShowUbicacion(true)}
                    value={
                      ubicacion === null
                        ? ""
                        : `${ubicacion.lat}, ${ubicacion.lng}`
                    }
                    isInvalid={error}
                    disabled={cargando}
                    readOnly
                  />
                </Form.Group>

                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" controlId="capacidad">
                      <Form.Label>
                        <strong>Capacidad:</strong>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Indique la capacidad"
                        name="capacidad"
                        value={capacidad}
                        onChange={(e) => setCapacidad(e.target.value)}
                        isInvalid={error}
                        disabled={cargando}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" controlId="precio">
                      <Form.Label>
                        <strong>Precio:</strong>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Indique el precio"
                        name="precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        isInvalid={error}
                        disabled={cargando}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-end">
              <Button
                  variant="danger me-3"
                  type="reset"
                  onClick={()=>{setCrear(false)}}
                  disabled={cargando}
                >
                  {!cargando ? (
                    "Cancelar"
                  ) : (
                    <Spinner animation="border" variant="light" size="sm" />
                  )}
                </Button>
                <Button
                  variant="warning me-3"
                  type="reset"
                  onClick={handleReset}
                  disabled={cargando}
                >
                  {!cargando ? (
                    "Borrar"
                  ) : (
                    <Spinner animation="border" variant="light" size="sm" />
                  )}
                </Button>
                <Button variant="primary" type="submit" disabled={cargando}>
                  {!cargando ? (
                    "Aceptar"
                  ) : (
                    <Spinner animation="border" variant="light" size="sm" />
                  )}
                </Button>
              </Card.Footer>

              <ModalUbicacion
                show={showUbicacion}
                onHide={() => setShowUbicacion(false)}
                setUbicacion={setUbicacion}
              />
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
