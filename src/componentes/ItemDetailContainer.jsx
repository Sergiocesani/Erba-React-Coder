import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/firebase.js";
import ItemCount from "./ItemCount";
import { useCart } from "../context/CartContext.jsx";
import { formatoPrecio } from "../utilidades/formatoPrecio.js";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const { addItem } = useCart();

  const [item, setItem] = useState(null);
  const [sel, setSel] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    setSel(null);
    fetchProductById(id)
      .then((p) => {
        setItem(p);
        if (Array.isArray(p?.sizes) && p.sizes.length > 0) {
          setSel(p.sizes[0]);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const totalStockFromSizes = useMemo(() => {
    if (!Array.isArray(item?.sizes)) return null;
    return item.sizes.reduce((acc, s) => acc + (Number(s.stock) || 0), 0);
  }, [item]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!item) return <p>El producto no existe.</p>;

  if (Array.isArray(item.sizes) && (totalStockFromSizes ?? 0) <= 0) {
    return (
      <section className="item-detail">
        <img
          src={item.image || "/image/placeholder.png"}
          alt={item.title}
          className="item-detail-img"
          onError={(e) => { e.currentTarget.src = "/image/placeholder.png"; }}
        />
        <article style={{ display: "grid", gap: 12 }}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p><strong>Producto sin stock</strong></p>
        </article>
      </section>
    );
  }

  const price = sel?.price ?? item.price;
  const stock = sel?.stock ?? item.stock;
  const imgSrc = item.image || "/image/placeholder.png";

  const handleAddToCart = (qty) => {
    if (!item) return;
    addItem(
      {
        id: item.id,
        title: item.title,
        image: item.image,
        price,
        stock,
        size: sel?.label ?? undefined,
      },
      qty
    );
    alert(`Agregaste ${qty} ${sel?.label ? `(${sel.label}) ` : ""}de "${item.title}" al carrito`);
  };

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

        {Array.isArray(item.sizes) && item.sizes.length > 0 ? (
          <>
            <div className="chip-group" role="group" aria-label="Seleccionar tamaño">
              {item.sizes.map((s) => (
                <button
                  key={s.label}
                  className={`chip ${sel?.label === s.label ? "active" : ""}`}
                  onClick={() => setSel(s)}
                  disabled={(s.stock ?? 0) <= 0}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <p><strong>Precio:</strong> {formatoPrecio(price)}</p>
            <p><strong>Stock:</strong> {stock}</p>
          </>
        ) : (
          <>
            <p><strong>Precio:</strong> {formatoPrecio(item.price)}</p>
            <p><strong>Stock:</strong> {item.stock}</p>
          </>
        )}

        <ItemCount stock={stock} initial={1} onAdd={handleAddToCart} />
      </article>
    </section>
  );
};

export default ItemDetailContainer;