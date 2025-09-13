import "../App.css";

export default function CartWidget(props) {
  const count = props.count ?? 0;

  return (
    <button className="cart-widget" aria-label="Carrito">
      <span role="img" aria-hidden="true">🛒</span>
      <span>{count}</span>
    </button>
  );
}
