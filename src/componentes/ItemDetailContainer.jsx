import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../data/api.js"; 
import ItemCount from "./ItemCount";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    getProductById(id)
      .then((data) => setItem(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = (qty) => {
    alert(`Agregaste ${qty} unidad(es) de "${item.title}" al carrito`);
  };

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!item) return <p>El producto no existe.</p>;

  return (
    <section className="item-detail">
      <img src={item.image} alt={item.title} className="item-detail-img" />

      <article style={{ display: "grid", gap: 12 }}>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <p><strong>Precio:</strong> ${item.price}</p>
        <p><strong>Stock:</strong> {item.stock}</p>

        <ItemCount
          stock={item.stock}
          initial={1}
          onAdd={handleAddToCart}
        />
      </article>
    </section>
  );
};

export default ItemDetailContainer;
