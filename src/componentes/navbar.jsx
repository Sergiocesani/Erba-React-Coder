import CartWidget from "./CartWidget";

export default function NavBar() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        backdropFilter: "saturate(180%) blur(6px)",
        background: "rgba(36,36,36,0.8)",
        borderBottom: "1px solid rgba(100,108,255,0.3)"
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16
        }}
      >
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "baseline", gap: 6, textDecoration: "none" }}>
          <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: 1.2 }}>Erba</span>
          <span style={{ opacity: 0.8, fontSize: 14 }}>Perfumes</span>
        </a>

        {/* Links */}
        <ul style={{ display: "flex", listStyle: "none", gap: 16, margin: 0, padding: 0 }}>
          <li><a href="#" style={{ color: "inherit" }}>Inicio</a></li>
          <li><a href="#" style={{ color: "inherit" }}>Productos</a></li>
          <li><a href="#" style={{ color: "inherit" }}>Contacto</a></li>
        </ul>

        {/* Carrito */}
        <CartWidget count={0} />
      </nav>
    </header>
  );
}
