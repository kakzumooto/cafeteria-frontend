import { Link } from 'react-router-dom'
import './Navbar.css' 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">☕ Aroma Borealis</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Catálogo</Link>
        </li>
        <li>
          <Link to="/login">Iniciar Sesión</Link>
        </li>
        <li>
          <Link to="/carrito">🛒 Carrito</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar