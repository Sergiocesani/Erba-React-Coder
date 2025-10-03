import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../data/api.js";

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

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!item) return <p>El producto no existe.</p>;

  return (
    <article style={{ display: "grid", gap: 16 }}>
      <h2>{item.title}</h2>
      <img src={item.image} alt={item.title} style={{ maxWidth: 320, borderRadius: 8 }} />
      <p>{item.description}</p>
      <p><strong>Precio:</strong> ${item.price}</p>
      <p><strong>Stock:</strong> {item.stock}</p>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button>-</button>
        <span>1</span>
        <button>+</button>
        <button>Añadir al carrito</button>
      </div>
    </article>
  );
};

export default ItemDetailContainer;
