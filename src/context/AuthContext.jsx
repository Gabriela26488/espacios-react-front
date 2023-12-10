import { createContext, useReducer } from "react";
import authReducer from "./AuthReducer";
import { useNavigate } from "react-router-dom";
import { url } from "../backend";
import axios from "axios";

let initialState = {};

// consulta si hay datos del usuario en el local storage
const getLocalStorageData = new Promise((resolve) => {
  resolve(JSON.parse(localStorage.getItem("usuario")));
});
// si hay datos en el localstorage se colocan en el initialState
getLocalStorageData.then((valores) => {
  if (valores) {
    initialState = valores;
  }
});

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [usuario, dispath] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  // funcion consultar los datos del usuario y guardarlos en el local storage
  const iniciarSesion = async (token, ruta) => {
    axios
      .get(`${url}api/usuarios/verificar/usuario`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async function (response) {
        const datos = response.data;
        datos.token = token;

        localStorage.setItem("usuario", JSON.stringify(datos));
        dispath({ type: "INICIAR_SESION", payload: datos });
        navigate(ruta);
      })
      .catch(function (error) {
        console.log(error.response);
      });

    return "ok";
  };

  // funcion para cerrar sesion y borrar los datos del storage y del state
  const cerrarSesion = async () => {
    localStorage.removeItem("usuario");
    dispath({ type: "CERRAR_SESION" });
    navigate("cuenta");
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
