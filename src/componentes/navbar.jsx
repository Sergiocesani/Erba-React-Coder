import CartWidget from "./CartWidget";
import "../App.css";

export default function NavBar(props) {
  return (
    <header className="navbar">
      <nav className="navbar-container">
        <a href="#" className="navbar-logo">
          <img
            src={props.logo}
            alt={props.brand}
            className="navbar-logo-img"
          />
          <span>{props.brand}</span>
        </a>

        {/* Enlaces */}
        <ul className="navbar-links">
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Productos</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>

        {/* Carrito */}
        <CartWidget count={0} />
      </nav>
    </header>
  );
}
