import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./componentes/navbar";
import ItemListContainer from "./componentes/ItemListContainer";
import ItemDetailContainer from "./componentes/ItemDetailContainer";
import NotFound from "./componentes/error404.jsx";
import Cart from "./componentes/Cart.jsx";
import CheckoutForm from "./componentes/CheckoutForm.jsx";

function App() {
  return (
    <>
      <NavBar logo="image/erba.jpg" brand="Erba Perfumes" />
      <main className="main">
        <Routes>
          <Route path="/" element={<ItemListContainer mensaje="¡Bienvenid@ a Erba Perfumes!" />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
export default App;
