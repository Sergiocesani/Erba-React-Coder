import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { createOrder } from "../services/firebase.js";
import { Link } from "react-router-dom";

const initial = { name: "", email: "", phone: "" };

const CheckoutForm = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [buyer, setBuyer] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  const onChange = (e) => setBuyer({ ...buyer, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!items.length) return;
    if (!buyer.name || !buyer.email) return alert("Completá nombre y email.");

    setLoading(true);
    try {
      const orderItems = items.map(i => ({
        id: i.id, title: i.title, price: i.price, quantity: i.quantity
      }));
      const id = await createOrder({ buyer, items: orderItems, total: totalPrice });
      setOrderId(id);
      clearCart();
    } catch (err) {
      alert("Hubo un error generando la orden.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <section className="item-list-container">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu código de orden es: <strong>{orderId}</strong></p>
        <Link className="item-card-link" to="/">Volver al inicio</Link>
      </section>
    );
  }

  if (!items.length) {
    return (
      <section className="item-list-container">
        <h2>No hay productos para finalizar</h2>
        <Link className="item-card-link" to="/">Ir al catálogo</Link>
      </section>
    );
  }

  return (
    <section className="item-list-container">
      <h2>Checkout</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 460 }}>
        <input name="name" placeholder="Nombre" value={buyer.name} onChange={onChange} required />
        <input type="email" name="email" placeholder="Email" value={buyer.email} onChange={onChange} required />
        <input name="phone" placeholder="Teléfono" value={buyer.phone} onChange={onChange} />
        <p><strong>Total a pagar:</strong> ${totalPrice}</p>
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Procesando..." : "Confirmar compra"}
        </button>
      </form>
    </section>
  );
};

export default CheckoutForm;
