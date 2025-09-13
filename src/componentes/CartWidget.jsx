export default function CartWidget({ count = 0 }) {
  return (
    <button
      aria-label="Carrito"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "transparent",
        border: "1px solid #646cff",
        padding: "6px 10px",
        borderRadius: "999px",
        cursor: "pointer",
      }}
    >
      <span role="img" aria-hidden="true">🛒</span>
      <span>{count}</span>
    </button>
  );
}
