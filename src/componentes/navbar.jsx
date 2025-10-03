import { Link, NavLink } from "react-router-dom";
import CartWidget from "./CartWidget";

const NavBar = ({ logo, brand }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img className="navbar-logo-img" src={`/${logo}`} alt={brand} />
          <span>{brand}</span>
        </Link>

        <ul className="navbar-links">
          <li><NavLink to="/category/hombre">Hombre</NavLink></li>
          <li><NavLink to="/category/mujer">Mujer</NavLink></li>
          <li><NavLink to="/category/unisex">Unisex</NavLink></li>
        </ul>

        <CartWidget />
      </div>
    </nav>
  );
};

export default NavBar;
