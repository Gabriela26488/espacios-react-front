import { useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Auth } from "../auth/Auth";
import { Reservar } from "../reservar/Reservar";
import { AuthContext } from "../../context/AuthContext";
import { url } from "../../backend";
import axios from "axios";
import { Espacios } from "../espacios/Espacios";
import { Layout } from "../inicio/Layout";

export const Rutas = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const [auth, setAuth] = useState(false);

  const validaLogin = async () => {
    if (Object.keys(usuario).length === 0 && usuario.constructor === Object) {
      navigate("/");
    } else {
      const token = usuario.token;

      await axios
        .get(`${url}api/usuarios/verificar/usuario`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (location.pathname === "/") {
            navigate("inicio");
          }
          return;
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("usuario");
          navigate("/");
        });
    }
    setAuth(true);
  };

  useEffect(() => {
    validaLogin();
  }, []);

  return (
    <>
      {auth ? (
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/inicio" element={<Layout />} />
          <Route path="/reservar" element={<Reservar />} />
          <Route path="/espacios" element={<Espacios />} />
          <Route
            path="/*"
            element={
              <div>
                <h1>404</h1>
              </div>
            }
          />
        </Routes>
      ) : (
        <div className="w-100 d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}
    </>
  );
};
