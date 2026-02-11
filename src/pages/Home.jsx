import { useState, useEffect } from 'react'
import '../App.css'
import { API_URL } from '../api/config';

function Home() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

useEffect(() => {
    setLoading(true);
    // Usamos la URL del config
    fetch(`${API_URL}/api/productos`)
      .then(response => {
        if (!response.ok) throw new Error('Error en servidor');
        return response.json();
      })
      .then(data => {
        // Si data no es array, ponemos lista vacía
        setProductos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setProductos([]); // Evita que truene el .map()
        setLoading(false);
      });
}, []);

  const handleAgregar = async (producto) => {
    const token = localStorage.getItem('token');
    if (!token) { alert("🔒 ¡Debes iniciar sesión!"); return; }

    try {
      const response = await fetch(`${API_URL}/api/carrito/add`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productoId: producto.id, cantidad: 1 })
      });
      if (response.ok) alert(`✅ ¡${producto.nombre} agregado!`);
      else alert(`❌ Error al agregar.`);
    } catch (error) { alert("Error de conexión."); }
  };

  return (
    <div className="tienda-container">
      <h1 className="titulo-principal">☕ Tienda de Café "Aroma Borealis"</h1>
      {loading && <p style={{textAlign: 'center', fontSize:'1.2rem'}}>Cargando el mejor café... ⏳</p>}
      {!loading && productos.length === 0 && (
         <div style={{textAlign:'center', padding:'50px'}}><h3>No hay productos disponibles 😢</h3></div>
      )}
      <div className="productos-grid">
        {Array.isArray(productos) && productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            <div style={{marginBottom:'15px'}}>
                <img 
                  src={producto.imageUrl || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93'} 
                  alt={producto.nombre}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93'; }}
                />
            </div>
            <h3 style={{margin:'0 0 10px 0'}}>{producto.nombre}</h3>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.85rem', color:'#7f8c8d', marginBottom:'10px'}}>
                <span style={{background:'#f1f2f6', padding:'2px 8px', borderRadius:'10px'}}>🏷️ {producto.categoria}</span>
                <span style={{color: producto.stock < 5 ? '#e74c3c' : '#27ae60', fontWeight:'bold'}}>
                   {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Agotado'}
                </span>
            </div>
            <p style={{fontSize:'0.9rem', color:'#555', lineHeight:'1.4', marginBottom:'15px'}}>{producto.descripcion}</p>
            <div style={{marginTop:'auto'}}>
               <div className="precio">${producto.precio}</div>
               <button className="btn-agregar" onClick={() => handleAgregar(producto)} disabled={producto.stock === 0}>
                  {producto.stock === 0 ? 'Sin Stock' : 'Añadir al Carrito 🛒'}
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home