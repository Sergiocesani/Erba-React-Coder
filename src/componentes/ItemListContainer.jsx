import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProducts } from "../services/firebase.js";
import { useCart } from "../context/CartContext.jsx";
import { formatoPrecio } from "../utilidades/formatoPrecio.js";

const ItemCard = ({ item }) => {
  const { addItem } = useCart();
  const [sel, setSel] = useState(item.sizes?.[0] ?? null); 
  const imgSrc = item.image || "/image/placeholder.png";
  const price = sel?.price ?? item.price;
  const stock = sel?.stock ?? item.stock;

  const handleAdd = () => {
    if (!price || (stock ?? 0) <= 0) return;
    addItem(
      {
        id: item.id,
        title: item.title,
        image: item.image,
        price,
        stock,
        size: sel?.label ?? undefined,
      },
      1
    );
  };

  return (
    <article className="item-card">
      <Link
        to={`/item/${item.id}`}
        aria-label={`Ver detalle de ${item.title}`}
        className="item-card-image-link"
      >
        <img
          src={imgSrc}
          alt={item.title}
          className="item-card-img"
          onError={(e) => { e.currentTarget.src = "/image/placeholder.png"; }}
        />
      </Link>

      <h4 className="item-card-title">
        <Link to={`/item/${item.id}`} className="item-card-title-link">
          {item.title}
        </Link>
      </h4>

      {Array.isArray(item.sizes) && item.sizes.length > 0 ? (
        <div className="chip-group" role="group" aria-label="Seleccionar volumen">
          {item.sizes.map((s) => (
            <button
              key={s.label}
              className={`chip ${sel?.label === s.label ? "active" : ""}`}
              onClick={() => setSel(s)}
              disabled={(s.stock ?? 0) <= 0}
              title={(s.stock ?? 0) <= 0 ? "Sin stock" : s.label}
            >
              {s.label}
            </button>
          ))}
        </div>
      ) : null}

     <p className="item-card-price"><strong>{formatoPrecio(price)}</strong></p>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button className="btn-primary" onClick={handleAdd} disabled={(stock ?? 0) <= 0}>
          Agregar
        </button>
        <Link to={`/item/${item.id}`} className="item-card-link">Ver detalle</Link>
      </div>
    </article>
  );
};

const ItemList = ({ items }) => {
  if (!items.length) return <p>No hay productos en esta categoría.</p>;
  return (
    <div className="item-list">
      {items.map((p) => (
        <ItemCard key={p.id} item={p} />
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
    let mounted = true;
    setLoading(true);
    setError("");
    fetchProducts(categoryId)
      .then((data) => mounted && setItems(data))
      .catch((e) => mounted && setError(e.message))
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