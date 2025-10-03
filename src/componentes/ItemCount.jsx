import { useState } from "react";

const ItemCount = ({ stock = 0, initial = 1, onAdd }) => {
  const [count, setCount] = useState(Math.min(initial, stock || 0));

  const dec = () => setCount(c => Math.max(1, c - 1));
  const inc = () => setCount(c => Math.min(stock, c + 1));

  const handleAdd = () => {
    if (stock <= 0) return;
    onAdd?.(count); 
  };

  return (
    <div className="item-count" role="group" aria-label="Seleccionar cantidad y agregar al carrito">
      <div className="qty-box" aria-live="polite">
        <button className="qty-btn" onClick={dec} aria-label="Restar 1" disabled={count <= 1 || stock === 0}>−</button>
        <span className="qty-value">{count}</span>
        <button className="qty-btn" onClick={inc} aria-label="Sumar 1" disabled={count >= stock || stock === 0}>＋</button>
      </div>

      <button className="btn-primary" onClick={handleAdd} disabled={stock === 0}>
        Añadir al carrito
      </button>
    </div>
  );
};

export default ItemCount;
