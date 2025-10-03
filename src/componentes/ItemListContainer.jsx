import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProducts } from "../../data/api";

const ItemCard = ({ item }) => {
  return (
    <article style={{
      border: "1px solid rgba(0,0,0,.2)",
      borderRadius: 12,
      padding: 12,
      display: "grid",
      gap: 8
    }}>
      <img src={item.image} alt={item.title} style={{ width: "100%", borderRadius: 8 }} />
      <h4 style={{ margin: "8px 0" }}>{item.title}</h4>
      <p style={{ margin: 0 }}><strong>${item.price}</strong></p>
      <Link to={`/item/${item.id}`}>Ver detalle</Link>
    </article>
  );
};

const ItemList = ({ items }) => {
  if (!items.length) return <p>No hay productos en esta categoría.</p>;
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: 16
    }}>
      {items.map((prod) => (
        <ItemCard key={prod.id} item={prod} />
      ))}
    </div>
  );
};

const ItemListContainer = ({ mensaje }) => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    getProducts(categoryId)
      .then((data) => setItems(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) return <p>Cargando catálogo...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="item-list-container">
      {mensaje && <h2>{mensaje}</h2>}
      {categoryId && <h3>Categoría: {categoryId}</h3>}
      <ItemList items={items} />
    </section>
  );
};

export default ItemListContainer;
