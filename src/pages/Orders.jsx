import { useState, useEffect } from 'react';
import { getMisOrdenes } from '../services/OrderService';
import '../App.css';

function Orders() {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarOrdenes();
  }, []);

  const cargarOrdenes = async () => {
    try {
      const data = await getMisOrdenes();
      // Ordenamos para ver la más reciente primero
      setOrdenes(data.reverse()); 
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  if (loading) return <div className="tienda-container"><h2>Cargando historial... 📜</h2></div>;

  return (
    <div className="tienda-container">
      <h1 className="titulo-principal">Mis Compras 📦</h1>

      {ordenes.length === 0 ? (
        <div style={{textAlign: 'center', padding: '2rem'}}>
          <h2>Aún no tienes pedidos.</h2>
          <p>¡Tu historial está esperando su primer café!</p>
        </div>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          {ordenes.map((orden) => (
            <div key={orden.id} style={{border: '1px solid #ddd', borderRadius: '8px', padding: '1.5rem', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
              
              {/* ENCABEZADO DE LA ORDEN */}
              <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem'}}>
                <div>
                  <strong style={{fontSize: '1.2rem'}}>Orden #{orden.id}</strong>
                  <br/>
                  <span style={{color: '#666', fontSize: '0.9rem'}}>
                    {new Date(orden.fechaOrden).toLocaleDateString()} - {new Date(orden.fechaOrden).toLocaleTimeString()}
                  </span>
                </div>
                <div style={{textAlign: 'right'}}>
                  <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#27ae60'}}>
                    ${orden.total}
                  </div>
                  <span style={{background: '#e8f5e9', color: '#2e7d32', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold'}}>
                    {orden.estado || "COMPLETADO"}
                  </span>
                </div>
              </div>

              {/* LISTA DE ITEMS */}
              <table style={{width: '100%', fontSize: '0.9rem'}}>
                <tbody>
                  {orden.items && orden.items.map((item, index) => (
                    <tr key={index}>
                      <td style={{padding: '5px 0'}}>
                        ☕ {item.nombreProducto} <span style={{color:'#888'}}>x{item.cantidad}</span>
                      </td>
                      <td style={{textAlign: 'right', fontWeight: 'bold'}}>
                        ${item.subtotal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;