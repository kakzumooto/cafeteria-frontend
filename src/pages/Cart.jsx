import { useState, useEffect } from 'react';
import { getCarrito, eliminarItem, actualizarCantidad } from '../services/CartService';
import '../App.css'; 
import { API_URL } from '../api/config';

function Cart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // 1. Cargar el carrito al iniciar
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    const data = await getCarrito();
    if (data) {
      // Ajuste por si el backend devuelve lista directa o objeto
      const lista = Array.isArray(data) ? data : (data.items || []);
      setItems(lista);
      calcularTotal(lista);
    }
    setLoading(false);
  };

  const calcularTotal = (lista) => {
    const suma = lista.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
    setTotal(suma);
  };

  // 2. Funciones para editar (Sumar, Restar, Borrar)
  const handleEliminar = async (itemId) => {
    if(!window.confirm("¿Seguro que quieres eliminar este café?")) return;
    
    const exito = await eliminarItem(itemId);
    if (exito) {
      const nuevaLista = items.filter(i => i.id !== itemId);
      setItems(nuevaLista);
      calcularTotal(nuevaLista);
    }
  };

  const handleCambiarCantidad = async (itemId, cantidadActual, operacion) => {
    const nuevaCantidad = operacion === 'sumar' ? cantidadActual + 1 : cantidadActual - 1;
    if (nuevaCantidad < 1) return; 

    // Cambio visual rápido (Optimista)
    const itemsActualizados = items.map(item => 
      item.id === itemId ? { ...item, cantidad: nuevaCantidad } : item
    );
    setItems(itemsActualizados);
    calcularTotal(itemsActualizados);

    // Aviso al Backend
    const exito = await actualizarCantidad(itemId, nuevaCantidad);
    if (!exito) {
      cargarDatos(); // Si falla, recargamos lo real
    }
  };

  // 3. NUEVA FUNCIÓN: FINALIZAR COMPRA (Checkout)
  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("🔒 Tu sesión expiró. Inicia sesión de nuevo.");
        return;
    }

    if (!window.confirm(`¿Confirmar compra por $${total.toFixed(2)}? 💳`)) return;

    try {
      const response = await fetch(`${API_URL}/api/ordenes/checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        alert("🎉 ¡Compra Exitosa! Gracias por tu preferencia.");
        
        // Limpiamos la pantalla
        setItems([]);
        setTotal(0);
        
        // Opcional: Redirigir al inicio
        // window.location.href = "/"; 
      } else {
        // ERROR DE NEGOCIO
        const mensajeError = await response.text();
        alert("❌ Error: " + mensajeError);
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Error de conexión con el servidor.");
    }
  };

  if (loading) return <div className="tienda-container"><h2>Cargando...</h2></div>;

  return (
    <div className="tienda-container">
      <h1 className="titulo-principal">Tu Carrito 🛒</h1>
      
      {items.length === 0 ? (
        <div style={{textAlign: 'center', padding: '2rem'}}>
            <h2>Tu carrito está vacío 🕸️</h2>
            <p>Ve a buscar algo delicioso.</p>
            <a href="/" className="btn-agregar" style={{textDecoration:'none', marginTop:'10px', display:'inline-block'}}>Ir a Comprar</a>
        </div>
      ) : (
        <>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{borderBottom: '2px solid #ddd'}}>
                <th style={{padding: '10px'}}>Producto</th>
                <th style={{padding: '10px'}}>Precio</th>
                <th style={{padding: '10px'}}>Cantidad</th>
                <th style={{padding: '10px'}}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{borderBottom: '1px solid #eee'}}>
                  <td style={{padding: '10px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                     <img 
                        src={item.producto.imageUrl || "https://images.unsplash.com/photo-1559056199-641a0ac8b55e"} 
                        alt="" 
                        style={{width:'50px', height:'50px', objectFit:'cover', borderRadius:'5px'}} 
                     />
                     {item.producto.nombre}
                  </td>
                  <td style={{textAlign: 'center'}}>${item.producto.precio}</td>
                  
                  <td style={{textAlign: 'center'}}>
                    <button onClick={() => handleCambiarCantidad(item.id, item.cantidad, 'restar')} style={{marginRight:'5px', padding:'5px 10px', cursor:'pointer'}}>-</button>
                    <strong>{item.cantidad}</strong>
                    <button onClick={() => handleCambiarCantidad(item.id, item.cantidad, 'sumar')} style={{marginLeft:'5px', padding:'5px 10px', cursor:'pointer'}}>+</button>
                  </td>

                  <td style={{textAlign: 'center'}}>
                    <button onClick={() => handleEliminar(item.id)} style={{border:'none', background:'none', cursor:'pointer', fontSize:'1.2rem'}}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{textAlign:'right', marginTop:'20px', borderTop:'2px solid #eee', paddingTop:'20px'}}>
            <h2 style={{color: '#2c3e50'}}>Total: ${total.toFixed(2)}</h2>
            
            <button 
                className="btn-agregar" 
                style={{fontSize: '1.2rem', padding: '10px 30px'}}
                onClick={handleCheckout}
            >
                ✅ Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default Cart;