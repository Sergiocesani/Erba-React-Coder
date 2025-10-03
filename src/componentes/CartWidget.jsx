const CartWidget = () => {
  // Placeholder: más adelante conectamos con el estado real del carrito
  const count = 0;

  return (
    <button className="cart-widget" aria-label="Carrito">
      <span role="img" aria-label="carrito">🛒</span>
      <span>{count}</span>
    </button>
  );
};

export default CartWidget;

