import { Route, Routes } from "react-router-dom";
import { Auth } from "../auth/Auth";
import { Inicio } from "../inicio/Inicio";

export const Rutas = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/*" element={<div><h1>404</h1></div>} />
    </Routes>
  )
}