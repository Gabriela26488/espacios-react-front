import { Route, Routes } from "react-router-dom";
import { Auth } from "../auth/Auth";

export const Rutas = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/inicio" element={<div><h1>inicio</h1></div>} />
      <Route path="/*" element={<div><h1>404</h1></div>} />
    </Routes>
  )
}