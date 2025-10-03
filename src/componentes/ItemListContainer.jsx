import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProducts } from "../../data/api.js";

const ItemCard = ({ item }) => {
  return (
    <article className="item-card">
      <img src={item.image} alt={item.title} className="item-card-img" />
      <h4 className="item-card-title">{item.title}</h4>
      <p className="item-card-price"><strong>${item.price}</strong></p>
      <Link to={`/item/${item.id}`} className="item-card-link">
        Ver detalle
      </Link>
    </article>
  );
};

const ItemList = ({ items }) => {
  if (!items.length) return <p>No hay productos en esta categoría.</p>;
  return (
    <div className="item-list">
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
