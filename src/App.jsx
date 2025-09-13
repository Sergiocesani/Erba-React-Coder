import "./App.css";
import NavBar from "./componentes/navbar";
import ItemListContainer from "./componentes/ItemListContainer";
import CartWidget from "./componentes/CartWidget";


function App() {
  return (
    <>
      <NavBar />
      <main>
        <ItemListContainer greeting="¡Bienvenid@ a Erba Perfumes!" />
      </main>
    </>
  );
}

export default App;
