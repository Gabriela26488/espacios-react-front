import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const NavBar = () => {
  const { usuario, cerrarSesion } = useContext(AuthContext);
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/" className="mt-1">
            <h1 className="d-inline-block ms-2">Espacios</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <div className="me-auto"></div>
            <Nav>
              <Link to={"/inicio"} className="nav-link px-3">
                Inicio
              </Link>
              {usuario.rol == "admin" ? (
                <Link to={"/espacios"} className="nav-link px-3">
                Espacios
              </Link>
              ) : (
                <Link to={"/reservar"} className="nav-link px-3">
                  Reservar
                </Link>
              )}
              <a
                href="#"
                className="nav-link px-3"
                onClick={() => cerrarSesion()}
              >
                Salir
              </a>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
