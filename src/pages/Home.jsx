import { useState, useEffect } from 'react'

function Home() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error:', error))
  }, [])

  return (
    <div>
      <h1 className="titulo-principal">☕ Tienda de Café "Aroma Borealis"</h1>
      
      {productos.length === 0 && <p style={{textAlign: 'center'}}>Cargando el mejor café...</p>}

      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            <div>
              <h3 className="producto-nombre">{producto.nombre}</h3>
              <p className="producto-desc">{producto.descripcion}</p>
            </div>
            <div className="producto-footer">
              <span className="precio">${producto.precio}</span>
              <button className="btn-agregar">Agregar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home