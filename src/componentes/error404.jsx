import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section style={{ textAlign: "center", padding: "40px 12px" }}>
      <h2>404 - Página no encontrada</h2>
      <p>El enlace no existe o fue movido.</p>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
};

export default NotFound;
