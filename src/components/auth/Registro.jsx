import { useState } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import {
  Envelope,
  EyeFill,
  EyeSlashFill,
  Key,
  PersonFill,
} from "react-bootstrap-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { url } from "../../backend";

export const Registro = ({ setRegistro }) => {
  const estadoInicial = {
    nombres: "",
    correo: "",
    pass: "",
  };

  const [datos, setDatos] = useState(estadoInicial);
  const [passVisible, setPassVisible] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCargando(true);

    if (
      datos.nombres.trim() == "" ||
      datos.correo.trim() == "" ||
      datos.pass.trim() == ""
    ) {
      Swal.fire({
        title: "Error",
        text: "Los campos no deben estar vacios",
        icon: "error",
        confirmButtonColor: "#0d6efd",
      });
      setError(true);
      setCargando(false);
      return;
    }

    const formData = new FormData();
    formData.append("nombres", datos.nombres);
    formData.append("correo", datos.correo);
    formData.append("password", datos.pass);

    axios
      .post(`${url}api/auth/singin`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        Swal.fire({
          title: "Exito!",
          icon: "success",
          text: "Exito al crear la cuenta, por favor inicie sesión.",
          confirmButtonText: "Continuar",
          confirmButtonColor: "#0d6efd",
        });
        setError(false);
        setDatos(estadoInicial);
        setRegistro(false);
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        const errors = err.response.data.errors;

        let htmlErrors = "";
        errors.map((i) => {
          htmlErrors += `<p>${i.msg}</p>`;
        });

        Swal.fire({
          title: "Error!",
          icon: "error",
          html: htmlErrors,
          confirmButtonText: "Continuar",
          confirmButtonColor: "#0d6efd",
        });
        setError(true)
      })
      .finally(() => {
        setCargando(false);
      });
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
            isInvalid={error}
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
            isInvalid={error}
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
            isInvalid={error}
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
