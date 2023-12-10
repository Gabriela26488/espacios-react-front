import { Container, Row} from "react-bootstrap";
import { Espacio } from "./Espacio";
import { NavBar } from "../utils/NavBar";

export const Inicio = () => {
  const espacios = [
    {
      nombre: "nombre 1",
      descripcion:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi, neque sapiente. Consequuntur, qui.",
      ubicacion: "Vero velit tempore iusto officiis dolore",
      capacidad: "20",
      precio: "20",
      disponibilidad: true,
    },
    {
      nombre: "nombre 2",
      descripcion:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi, neque sapiente. Consequuntur, qui.",
      ubicacion: "Vero velit tempore iusto officiis dolore",
      capacidad: "20",
      precio: "20",
      disponibilidad: true,
    },
    {
      nombre: "nombre 3",
      descripcion:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi, neque sapiente. Consequuntur, qui.",
      ubicacion: "Vero velit tempore iusto officiis dolore",
      capacidad: "20",
      precio: "20",
      disponibilidad: true,
    },
    {
      nombre: "nombre 4",
      descripcion:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi, neque sapiente. Consequuntur, qui.",
      ubicacion: "Vero velit tempore iusto officiis dolore",
      capacidad: "20",
      precio: "20",
      disponibilidad: true,
    },
  ];

  console.log(espacios);
  return (
    <>
      <NavBar />
      <Container className="mt-3">
        <h1 className="text-center text-primary my-5">Mis reservaciones</h1>
        <Row>
          {espacios.map((espacio, k) => (
            <Espacio espacio={espacio} key={k} />
          ))}
        </Row>
      </Container>
    </>
  );
};
