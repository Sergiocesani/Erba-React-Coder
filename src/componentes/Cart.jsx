import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { formatoPrecio } from "../utilidades/formatoPrecio.js";

const CartItem = ({ item, onRemove, onDecrement }) => (
  <div className="item-card cart-item-card" style={{ maxWidth: 760 }}>
    <div className="cart-item-body">
      <img
        src={item.image || "/image/placeholder.png"}
        alt={item.title}
        className="item-card-img"
        style={{ width: 120, height: 120 }}
        onError={(e) => { e.currentTarget.src = "/image/placeholder.png"; }}
      />

      <div className="cart-item-info">
        <h4 className="item-card-title">
          {item.title}{" "}
          {item.size ? <small>({item.size})</small> : null}
        </h4>
        <p className="item-card-price">
          <strong>{formatoPrecio(item.price)}</strong>
        </p>
        <p>
          <strong>Cantidad:</strong> {item.quantity} —{" "}
          <strong>Subtotal:</strong> {formatoPrecio(item.price * item.quantity)}
        </p>
      </div>

      <div className="cart-item-actions">
        <button
          className="icon-btn"
          onClick={() => onDecrement(item.id, item.size)}
          aria-label="Quitar una unidad"
          title="Quitar una unidad"
        >
          −1
        </button>

        <button
          className="icon-btn danger"
          onClick={() => onRemove(item.id, item.size)}
          aria-label="Eliminar producto del carrito"
          title="Eliminar producto"
        >
          🗑️
        </button>
      </div>
    </div>
  </div>
);

const Cart = () => {
  const { items, decrementItem, removeItem, clearCart, totalUnits, totalPrice } = useCart();

  if (!items.length) {
    return (
      <section className="item-list-container">
        <h2>Carrito vacío</h2>
        <Link className="item-card-link" to="/">Volver al catálogo</Link>
      </section>
    );
  }

  return (
    <section className="item-list-container">
      <h2>Tu carrito</h2>

      <div className="item-list" style={{ gridTemplateColumns: "1fr" }}>
        {items.map((i) => (
          <CartItem
            key={`${i.id}${i.size ? `|${i.size}` : ""}`} 
            item={i}
            onDecrement={decrementItem}
            onRemove={removeItem}
          />
        ))}
      </div>

      <hr />

      <p><strong>Unidades:</strong> {totalUnits}</p>
      <p><strong>Total:</strong> {formatoPrecio(totalPrice)}</p>

      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <button className="btn-primary" onClick={clearCart}>Vaciar carrito</button>
        <Link className="item-card-link" to="/checkout">Ir al checkout</Link>
      </div>
    </section>
  );
};

export default Cart;