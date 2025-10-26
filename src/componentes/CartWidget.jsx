import { useCart } from "../context/CartContext.jsx";

const CartWidget = () => {
  const { totalUnits } = useCart();
  return (
    <button className="cart-widget" aria-label="Carrito">
      <span role="img" aria-label="carrito">🛒</span>
      <span>{totalUnits}</span>
    </button>
  );
};

export default CartWidget;