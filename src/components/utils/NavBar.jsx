import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="primary"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand href="/" className="mt-1">
            <h1
              className="d-inline-block ms-2"
            >
              Espacios
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <div className="me-auto"></div>
            <Nav>
              <Link to={"/inicio"} className="nav-link px-3">
                Inicio
              </Link>
              <Link to={"/reservar"} className="nav-link px-3">
                Reservar
              </Link>
              <Link to={"/"} className="nav-link px-3">
                Perfil
              </Link>
              <Link to={"/"} className="nav-link px-3">
                Salir
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
