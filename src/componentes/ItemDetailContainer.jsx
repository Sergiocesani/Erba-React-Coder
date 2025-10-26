import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/firebase.js";
import ItemCount from "./ItemCount";
import { useCart } from "../context/CartContext.jsx";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchProductById(id)
      .then(setItem)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = (qty) => {
    if (!item || item.stock === 0) return;
    addItem(
      { id: item.id, title: item.title, price: item.price, image: item.image, stock: item.stock },
      qty
    );
    alert(`Agregaste ${qty} unidad(es) de "${item.title}" al carrito`);
  };

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!item) return <p>El producto no existe.</p>;
  if (item.stock === 0) return <p>Producto sin stock</p>;

  const imgSrc = item.image || "/image/placeholder.png";

  return (
    <section className="item-detail">
      <img
        src={imgSrc}
        alt={item.title}
        className="item-detail-img"
        onError={(e) => { e.currentTarget.src = "/image/placeholder.png"; }}
      />

      <article style={{ display: "grid", gap: 12 }}>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <p><strong>Precio:</strong> ${item.price}</p>
        <p><strong>Stock:</strong> {item.stock}</p>

        <ItemCount stock={item.stock} initial={1} onAdd={handleAddToCart} />
      </article>
    </section>
  );
};

export default ItemDetailContainer;
