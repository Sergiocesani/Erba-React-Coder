import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./componentes/navbar";
import ItemListContainer from "./componentes/ItemListContainer";
import ItemDetailContainer from "./componentes/ItemDetailContainer";

const NotFound = () => (
  <section style={{ textAlign: "center", padding: "40px 12px" }}>
    <h2>404 - Página no encontrada</h2>
    <p>El enlace no existe o fue movido.</p>
    <a href="/">Volver al inicio</a>
  </section>
);

function App() {
  return (
    <>
      <NavBar logo="image/erba.jpg" brand="Erba Perfumes" />
      <main className="main">
        <Routes>
          <Route path="/" element={<ItemListContainer mensaje="¡Bienvenid@ a Erba Perfumes!" />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
