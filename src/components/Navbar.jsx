import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; 

function Navbar() {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false); // Estado para el menú móvil
  
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('email'); 
  const userRole = localStorage.getItem('role'); 

  const isAdmin = userRole === 'ROLE_ADMIN' || userEmail === 'jefe@aroma.com';

  const handleLogout = () => {
    localStorage.clear();
    setMenuAbierto(false);
    window.location.href = '/login';
  };

  // Función para cerrar el menú al hacer clic en un link
  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <nav className="navbar">
      <div className="tienda-container nav-content">
        {/* LOGO */}
        <Link to="/" className="navbar-logo" onClick={cerrarMenu}>
          ☕ Aroma Borealis
        </Link>

        {/* BOTÓN HAMBURGUESA (Solo se ve en móvil) */}
        <button className="menu-toggle" onClick={() => setMenuAbierto(!menuAbierto)}>
          {menuAbierto ? '✕' : '☰'}
        </button>

        {/* ENLACES (Se muestran/ocultan con la clase 'active') */}
        <div className={`nav-links ${menuAbierto ? 'active' : ''}`}>
          <Link to="/" onClick={cerrarMenu}>Inicio</Link>
          
          {isAdmin && (
            <Link to="/admin" className="btn-admin-nav" onClick={cerrarMenu}>
              🛠️ Admin
            </Link>
          )}

          {token ? (
            <>
              <Link to="/mis-compras" onClick={cerrarMenu}>📦 Pedidos</Link>
              <Link to="/carrito" onClick={cerrarMenu}>🛒 Carrito</Link>
              
              <span className="user-info-nav">
                {userEmail}
              </span>
              
              <button onClick={handleLogout} className="btn-logout-nav">
                Salir 🚪
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={cerrarMenu}>Login</Link>
              <Link to="/register" className="btn-register-nav" onClick={cerrarMenu}>Registro</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;