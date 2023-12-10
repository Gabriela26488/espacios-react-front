import { Route, Routes } from "react-router-dom";
import { Auth } from "../auth/Auth";
import { Inicio } from "../inicio/Inicio";
import { Reservar } from "../reservar/Reservar";

export const Rutas = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/reservar" element={<Reservar />} />
      <Route path="/*" element={<div><h1>404</h1></div>} />
    </Routes>
  )
}