import "./App.css";
import NavBar from "./componentes/navbar";
import ItemListContainer from "./componentes/ItemListContainer";

function App() {
  return (
    <>
      <NavBar
        logo="image/erba.jpg"
        brand="Erba Perfumes"
      />

      <main className="main">
        <ItemListContainer mensaje="¡Bienvenid@ a Erba Perfumes!" />
      </main>
    </>
  );
}

export default App;
