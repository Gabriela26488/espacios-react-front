import { useState } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import {
  Envelope,
  EyeFill,
  EyeSlashFill,
  Key,
  PersonFill,
} from "react-bootstrap-icons";

export const Registro = ({ setRegistro }) => {
  const estadoInicial = {
    nombres: "",
    correo: "",
    pass: "",
  };

  const [datos, setDatos] = useState(estadoInicial);
  const [passVisible, setPassVisible] = useState(true);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCargando(true);

    const formData = new FormData();
    formData.append("nombres", datos.nombres);
    formData.append("correo", datos.correo);
    formData.append("password", datos.pass);


  };
  return (
    <div className="text-center">
      <h4 className="mb-3 text-primary">Crear Cuenta</h4>

      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text className="bg-primary">
            <PersonFill className="text-white" />
          </InputGroup.Text>
          <Form.Control
            placeholder="Nombre y apellido"
            type="text"
            name="nombres"
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text className="bg-primary">
            <Envelope className="text-white" />
          </InputGroup.Text>
          <Form.Control
            placeholder="Correo Electrónico:"
            type="email"
            name="correo"
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text className="bg-primary">
            <Key className="text-white" />
          </InputGroup.Text>
          <Form.Control
            placeholder="Contraseña:"
            type={!passVisible ? "text" : "password"}
            name="pass"
            onChange={handleChange}
          />
          <InputGroup.Text onClick={() => setPassVisible(!passVisible)}>
            {passVisible ? <EyeFill /> : <EyeSlashFill />}
          </InputGroup.Text>
        </InputGroup>

        <Button
          variant="primary"
          type="submit"
          className="w-100 my-3 text-white"
          disabled={cargando}
        >
          {cargando ? (
            <Spinner animation="border" variant="light" size="sm" />
          ) : (
            "Crear Cuenta"
          )}
        </Button>
      </Form>

      <p>
        Ya tienes cuenta? Inicia sesión{" "}
        <a
          href="#"
          className="text-decoration-none"
          onClick={() => setRegistro(false)}
        >
          aquí
        </a>
      </p>
    </div>
  );
};
