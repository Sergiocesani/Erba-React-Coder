import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { formatoPrecio } from "../utilidades/formatoPrecio.js";

const CartWidget = () => {
  const { totalUnits, totalPrice } = useCart();

  return (
    <Link to="/cart" className="cart-widget" aria-label="Ir al carrito">
      <span role="img" aria-label="carrito">🛒</span>
      <span className="cart-badge">{totalUnits || 0}</span>
      {totalUnits > 0 && (
        <span className="cart-total">{formatoPrecio(totalPrice)}</span>
      )}
    </Link>
  );
};

export default CartWidget;