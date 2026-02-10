import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; 

function Navbar() {
  const navigate = useNavigate();
  
  // 1. LEER DATOS DEL STORAGE
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('email'); 
  const userRole = localStorage.getItem('role'); 

  // 2. LOGICA DE ADMIN (Rol o Email específico)
  const isAdmin = userRole === 'ROLE_ADMIN' || userEmail === 'jefe@aroma.com';

  const handleLogout = () => {
    localStorage.clear(); // Borra todo (token, carrito, email...)
    alert("¡Hasta luego! 👋");
    window.location.href = '/login'; // Recarga para limpiar menú
  };

  return (
    <nav className="navbar" style={{background: '#2c3e50', padding: '1rem', color: 'white'}}>
      <div className="tienda-container nav-content" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 auto'}}>
        {/* LOGO */}
        <Link to="/" style={{textDecoration: 'none', color: 'white', fontSize: '1.5rem', fontWeight: 'bold'}}>
          ☕ Aroma Borealis
        </Link>

        {/* ENLACES */}
        <div className="nav-links" style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
          <Link to="/" style={{color: 'white', textDecoration: 'none'}}>Inicio</Link>
          
          {/* ENLACE DE ADMIN (Solo si es jefe) */}
          {isAdmin && (
            <Link to="/admin" style={{color: '#f1c40f', fontWeight: 'bold', textDecoration: 'none', border:'1px solid #f1c40f', padding:'5px 10px', borderRadius:'4px'}}>
              🛠️ Panel Admin
            </Link>
          )}

          {/* SI ESTÁ LOGUEADO */}
          {token ? (
            <>
              <Link to="/mis-compras" style={{color: 'white', textDecoration: 'none'}}>📦 Mis Pedidos</Link>
              
              <Link to="/carrito" style={{color: 'white', textDecoration: 'none'}}>🛒 Carrito</Link>
              
              <span style={{fontSize: '0.8rem', opacity: 0.8, borderLeft:'1px solid #555', paddingLeft:'10px'}}>
                | {userEmail} |
              </span>
              
              <button 
                onClick={handleLogout} 
                className="btn-eliminar" 
                style={{cursor:'pointer', marginLeft:'5px'}}
              >
                Salir 🚪
              </button>
            </>
          ) : (
            /* SI NO ESTÁ LOGUEADO */
            <>
              <Link to="/login" style={{color: 'white', textDecoration: 'none'}}>Login</Link>
              <Link to="/register" style={{background: '#3498db', padding: '5px 10px', borderRadius: '4px', color: 'white', textDecoration: 'none'}}>Registro</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;