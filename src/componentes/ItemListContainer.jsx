export default function ItemListContainer({ greeting = "Bienvenid@" }) {
  return (
    <section
      style={{
        maxWidth: 1200,
        margin: "32px auto",
        padding: "24px 16px",
        border: "1px dashed rgba(100,108,255,0.4)",
        borderRadius: 12
      }}
    >
      <h2 style={{ marginTop: 0 }}>{greeting}</h2>
      <p style={{ opacity: 0.9 }}>
        Aquí próximamente verás nuestro catálogo de productos.
      </p>
    </section>
  );
}
