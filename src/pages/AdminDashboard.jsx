import { useState, useEffect } from 'react';
import { getAllProductos, deleteProducto, createProducto, updateProducto } from '../services/ProductService';
import '../App.css';

function AdminDashboard() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  // ESTADO DEL FORMULARIO (Agregamos categoria)
  const [nuevoProducto, setNuevoProducto] = useState({
      nombre: '',
      precio: '',
      stock: '',
      imageUrl: '',
      categoria: 'CAFE_EN_GRANO', // Valor por defecto válido del Enum
      descripcion: ''
  });

  useEffect(() => {
    cargarInventario();
  }, []);

  const cargarInventario = async () => {
    try {
      const data = await getAllProductos();
      setProductos(data);
    } catch (error) {
      console.error("Error cargando inventario", error);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const handleEditarClick = (producto) => {
      setNuevoProducto({
          nombre: producto.nombre,
          precio: producto.precio,
          stock: producto.stock,
          imageUrl: producto.imageUrl,
          categoria: producto.categoria || 'CAFE_EN_GRANO', // Cargamos la categoría del producto
          descripcion: producto.descripcion || ''
      });
      setIdEditando(producto.id);
      setMostrarFormulario(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
      setNuevoProducto({ nombre: '', precio: '', stock: '', imageUrl: '', categoria: 'CAFE_EN_GRANO', descripcion: '' });
      setIdEditando(null);
      setMostrarFormulario(false);
  };

  const handleGuardar = async (e) => {
      e.preventDefault();
      
      if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.stock) {
          alert("Completa los campos obligatorios (*)");
          return;
      }

      // Preparamos el objeto tal cual lo espera Java
      const productoAEnviar = {
          nombre: nuevoProducto.nombre,
          precio: parseFloat(nuevoProducto.precio),
          stock: parseInt(nuevoProducto.stock),
          imageUrl: nuevoProducto.imageUrl || "https://images.unsplash.com/photo-1559056199-641a0ac8b55e",
          // Enviamos la categoría seleccionada (debe coincidir con el ENUM)
          categoria: nuevoProducto.categoria,
          descripcion: nuevoProducto.descripcion
      };

      let exito = false;
      if (idEditando) {
          const actualizado = await updateProducto(idEditando, productoAEnviar);
          if (actualizado) { alert("✅ ¡Actualizado!"); exito = true; }
      } else {
          const creado = await createProducto(productoAEnviar);
          if (creado) { alert("✅ ¡Creado!"); exito = true; }
      }

      if (exito) {
          resetForm();
          cargarInventario();
      } else {
          alert("❌ Error. Verifica tu sesión o que los datos sean válidos.");
      }
  };

  const handleEliminar = async (id) => {
    if(window.confirm("⚠️ ¿Eliminar este producto?")) {
       const exito = await deleteProducto(id);
       if (exito) cargarInventario(); 
    }
  };

  if (loading) return <div className="tienda-container"><h2>Cargando Inventario... 🏭</h2></div>;

  return (
    <div className="tienda-container">
        <div className="admin-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem'}}>
          <h1 className="titulo-principal">Panel de Administración 🛠️</h1>
          <button 
            className="btn-agregar" 
            style={{background: mostrarFormulario ? '#e74c3c' : '#2c3e50'}}
            onClick={() => { if(mostrarFormulario) resetForm(); else setMostrarFormulario(true); }} 
          >
            {mostrarFormulario ? '✖ Cancelar' : '+ Nuevo Producto'}
          </button>
      </div>

      {mostrarFormulario && (
          <div style={{background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '2px solid #3498db'}}>
              <h3 style={{color: '#3498db'}}>{idEditando ? '✏️ Editando' : '📦 Nuevo Producto'}</h3>
              
              <form onSubmit={handleGuardar} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                  <div style={{gridColumn: 'span 2'}}>
                      <label>Nombre *</label>
                      <input type="text" name="nombre" value={nuevoProducto.nombre} onChange={handleInputChange} style={{width: '100%', padding: '8px'}} />
                  </div>
                  <div>
                      <label>Precio ($) *</label>
                      <input type="number" name="precio" value={nuevoProducto.precio} onChange={handleInputChange} style={{width: '100%', padding: '8px'}} />
                  </div>
                  <div>
                      <label>Stock *</label>
                      <input type="number" name="stock" value={nuevoProducto.stock} onChange={handleInputChange} style={{width: '100%', padding: '8px'}} />
                  </div>
                  
                  {/* --- AQUÍ ESTÁ EL SELECTOR DE CATEGORÍA --- */}
                  <div style={{gridColumn: 'span 2'}}>
                      <label>Categoría *</label>
                      <select 
                          name="categoria" 
                          value={nuevoProducto.categoria} 
                          onChange={handleInputChange}
                          style={{width: '100%', padding: '8px', borderRadius:'4px', border:'1px solid #ccc'}}
                      >
                          <option value="CAFE_EN_GRANO">Café en Grano</option>
                          <option value="CAFE_MOLIDO">Café Molido</option>
                          <option value="ACCESORIOS">Accesorios</option>
                          <option value="MAQUINAS">Máquinas</option>
                      </select>
                  </div>
                  <div style={{gridColumn: 'span 2'}}>
                      <label>Descripción</label>
                      <textarea 
                          name="descripcion" 
                          value={nuevoProducto.descripcion} 
                          onChange={handleInputChange}
                          rows="3"
                          placeholder="Ej: Incluye filtros y cuchara..."
                          style={{width: '100%', padding: '8px', border:'1px solid #ccc'}}
                      />
                  </div>

                  <div style={{gridColumn: 'span 2'}}>
                      <label>Imagen URL</label>
                      <input type="text" name="imageUrl" value={nuevoProducto.imageUrl} onChange={handleInputChange} style={{width: '100%', padding: '8px'}} />
                  </div>
                  <div style={{gridColumn: 'span 2', textAlign: 'right'}}>
                      <button type="submit" className="btn-agregar">{idEditando ? '🔄 Actualizar' : '💾 Guardar'}</button>
                  </div>
              </form>
          </div>
      )}

      {/* TABLA DE PRODUCTOS */}
      <div style={{overflowX: 'auto', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', background: 'white'}}>
          <thead style={{background: '#34495e', color: 'white'}}>
            <tr>
              <th style={{padding: '12px'}}>Imagen</th>
              <th style={{padding: '12px'}}>Nombre</th>
              <th style={{padding: '12px'}}>Categoría</th> {/* Columna nueva */}
              <th style={{padding: '12px'}}>Stock</th>
              <th style={{padding: '12px'}}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id} style={{borderBottom: '1px solid #eee'}}>
                <td style={{padding: '12px'}}><img src={prod.imageUrl} alt="" style={{width:'40px', height:'40px', objectFit:'cover', borderRadius:'4px'}}/></td>
                <td style={{padding: '12px', fontWeight:'bold'}}>{prod.nombre}</td>
                
                {/* Mostramos la categoría */}
                <td style={{padding: '12px', fontSize:'0.9rem', color:'#555'}}>{prod.categoria}</td>
                
                <td style={{padding: '12px', textAlign:'center', color: prod.stock < 10 ? 'red' : 'green', fontWeight:'bold'}}>{prod.stock}</td>
                <td style={{padding: '12px', textAlign: 'center'}}>
                    <button onClick={() => handleEditarClick(prod)} style={{marginRight:'10px', padding:'5px', background:'none', border:'none', cursor:'pointer'}}>✏️</button>
                    <button onClick={() => handleEliminar(prod.id)} style={{padding:'5px', background:'none', border:'none', cursor:'pointer'}}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;