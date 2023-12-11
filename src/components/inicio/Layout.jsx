import { useContext } from 'react'
import { NavBar } from '../utils/NavBar'
import { AuthContext } from '../../context/AuthContext';
import { Inicio } from './Inicio';
import { InicioAdmin } from './InicioAdmin';

export const Layout = () => {
  const { usuario } = useContext(AuthContext);
  return (
    <>
      <NavBar />
      {usuario.rol == "admin" ? (<InicioAdmin />):(<Inicio />)}
    </>
  )
}
