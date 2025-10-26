import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import CartWidget from "./CartWidget";

const NavBar = ({ logo, brand }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden"; 
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto"; 
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img className="navbar-logo-img" src={`/${logo}`} alt={brand} />
          <span>{brand}</span>
        </Link>

        <button className="hamburger-btn" onClick={toggleMenu}>
          <span className={isOpen ? "line line1 open" : "line line1"}></span>
          <span className={isOpen ? "line line2 open" : "line line2"}></span>
          <span className={isOpen ? "line line3 open" : "line line3"}></span>
        </button>

        <ul className="navbar-links desktop">
          <li><NavLink to="/category/hombre">Hombre</NavLink></li>
          <li><NavLink to="/category/mujer">Mujer</NavLink></li>
          <li><NavLink to="/category/unisex">Unisex</NavLink></li>
        </ul>

        <CartWidget />
        {isOpen && (
          <div className="mobile-menu">
            <ul>
              <li><NavLink to="/category/hombre" onClick={closeMenu}>Hombre</NavLink></li>
              <li><NavLink to="/category/mujer" onClick={closeMenu}>Mujer</NavLink></li>
              <li><NavLink to="/category/unisex" onClick={closeMenu}>Unisex</NavLink></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
