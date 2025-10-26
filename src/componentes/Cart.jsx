import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const CartItem = ({ item, onRemove }) => (
  <div className="item-card" style={{ maxWidth: 600 }}>
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <img src={item.image} alt={item.title} className="item-card-img" style={{ width: 120, height: 120 }} />
      <div style={{ flex: 1 }}>
        <h4 className="item-card-title">{item.title}</h4>
        <p className="item-card-price"><strong>${item.price}</strong></p>
        <p>Cantidad: {item.quantity} — Subtotal: ${item.price * item.quantity}</p>
      </div>
      <button className="qty-btn" onClick={() => onRemove(item.id)}>Eliminar</button>
    </div>
  </div>
);

const Cart = () => {
  const { items, removeItem, clearCart, totalUnits, totalPrice } = useCart();

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
        {items.map(i => <CartItem key={i.id} item={i} onRemove={removeItem} />)}
      </div>
      <hr />
      <p><strong>Unidades:</strong> {totalUnits}</p>
      <p><strong>Total:</strong> ${totalPrice}</p>
      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <button className="btn-primary" onClick={clearCart}>Vaciar</button>
        <Link className="item-card-link" to="/checkout">Ir al checkout</Link>
      </div>
    </section>
  );
};

export default Cart;
