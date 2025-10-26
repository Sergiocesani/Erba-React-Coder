import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const CartWidget = () => {
  const { totalUnits } = useCart(); 

  return (
    <Link to="/cart" className="cart-widget" aria-label="Ir al carrito">
      <span role="img" aria-label="carrito">🛒</span>
      <span className="cart-badge">{totalUnits || 0}</span>
    </Link>
  );
};

export default CartWidget;