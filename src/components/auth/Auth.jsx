import { useState } from "react";
import { Card } from "react-bootstrap";
import { Login } from "./Login";
import { Registro } from "./Registro";

export const Auth = () => {
  const [registro, setRegistro] = useState(false);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="bg-white py-5 px-3 ms-3">
        {!registro ? <Login setRegistro={setRegistro}/> : <Registro setRegistro={setRegistro}/>}
      </Card>
    </div>
  );
};
