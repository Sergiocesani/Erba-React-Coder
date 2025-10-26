import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProducts } from "../services/firebase.js";

const ItemCard = ({ item }) => {
  const imgSrc = item.image || "/image/placeholder.png";
  return (
    <article className="item-card">
      <img
        src={imgSrc}
        alt={item.title}
        className="item-card-img"
        onError={(e) => { e.currentTarget.src = "/image/placeholder.png"; }}
      />
      <h4 className="item-card-title">{item.title}</h4>
      <p className="item-card-price"><strong>${item.price}</strong></p>
      <Link to={`/item/${item.id}`} className="item-card-link">Ver detalle</Link>
    </article>
  );
};

const ItemList = ({ items }) => {
  if (!items.length) return <p>No hay productos en esta categoría.</p>;
  return <div className="item-list">{items.map(p => <ItemCard key={p.id} item={p} />)}</div>;
};

const ItemListContainer = ({ mensaje }) => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    fetchProducts(categoryId)
      .then(data => mounted && setItems(data))
      .catch(e => mounted && setError(e.message))
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
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
