import { useState, useEffect } from 'react'
import '../App.css'

function Home() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  // 1. CARGAR PRODUCTOS AL INICIO
  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then(response => response.json())
      .then(data => {
        setProductos(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error:', error)
        setLoading(false)
      })
  }, [])

  // 2. FUNCIÓN PARA AGREGAR AL CARRITO
  const handleAgregar = async (producto) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert("🔒 ¡Debes iniciar sesión para comprar!");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/carrito/add', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productoId: producto.id, 
          cantidad: 1
        })
      });
    
      if (response.ok) {
        alert(`✅ ¡${producto.nombre} agregado al carrito!`);
      } else { 
        alert(`❌ No se pudo agregar. Revisa el stock.`);
      }

    } catch (error) {
      alert("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="tienda-container">
      
      <h1 className="titulo-principal">☕ Tienda de Café "Aroma Borealis"</h1>
      
      {/* MENSAJE DE CARGA */}
      {loading && <p style={{textAlign: 'center', fontSize:'1.2rem'}}>Cargando el mejor café... ⏳</p>}

      {/* MENSAJE SI NO HAY PRODUCTOS */}
      {!loading && productos.length === 0 && (
         <div style={{textAlign:'center', padding:'50px'}}>
            <h3>No hay productos disponibles 😢</h3>
         </div>
      )}

      {/* GRID DE PRODUCTOS (Usa CSS Grid para responsive) */}
      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            
            {/* IMAGEN */}
            <div style={{marginBottom:'15px'}}>
                <img 
                  src={producto.imageUrl || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93'} 
                  alt={producto.nombre}
                  // Si la imagen falla, pone una por defecto
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93'; }}
                />
            </div>

            {/* INFORMACIÓN */}
            <h3 style={{margin:'0 0 10px 0'}}>{producto.nombre}</h3>
            
            <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.85rem', color:'#7f8c8d', marginBottom:'10px'}}>
                <span style={{background:'#f1f2f6', padding:'2px 8px', borderRadius:'10px'}}>🏷️ {producto.categoria}</span>
                <span style={{color: producto.stock < 5 ? '#e74c3c' : '#27ae60', fontWeight:'bold'}}>
                   {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Agotado'}
                </span>
            </div>

            <p style={{fontSize:'0.9rem', color:'#555', lineHeight:'1.4', marginBottom:'15px'}}>
                {producto.descripcion}
            </p>
            
            {/* PRECIO Y BOTÓN (Al final de la tarjeta) */}
            <div style={{marginTop:'auto'}}>
               <div className="precio">${producto.precio}</div>
               
               <button 
                  className="btn-agregar"
                  onClick={() => handleAgregar(producto)}
                  disabled={producto.stock === 0}
                  style={{ 
                      opacity: producto.stock === 0 ? 0.6 : 1,
                      background: producto.stock === 0 ? '#95a5a6' : '',
                      cursor: producto.stock === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
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