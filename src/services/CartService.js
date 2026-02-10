
const API_URL = `${API_URL}/api/carrito`; 

// 1. Obtener el carrito
export const getCarrito = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Error al cargar carrito');
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo carrito:", error);
        return [];
    }
};

// 2. Eliminar un item (NUEVO)
export const eliminarItem = async (itemId) => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const response = await fetch(`${API_URL}/items/${itemId}`, { // Ojo a la comilla invertida `
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.ok;
    } catch (error) {
        console.error("Error borrando item:", error);
        return false;
    }
};

// 3. Actualizar cantidad (NUEVO)
export const actualizarCantidad = async (itemId, nuevaCantidad) => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const response = await fetch(`${API_URL}/items/${itemId}`, { // Ojo a la comilla invertida `
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(nuevaCantidad) 
        });
        return response.ok;
    } catch (error) {
        console.error("Error actualizando cantidad:", error);
        return false;
    }
};