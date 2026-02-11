// src/services/ProductService.js
import { API_URL } from '../api/config';


// Esta es la ruta base correcta para productos
const PRODUCTOS_URL = `${API_URL}/api/productos`;

// 1. Obtener todos los productos
export const getAllProductos = async () => {
    try {
        const response = await fetch(PRODUCTOS_URL);
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo productos:", error);
        return [];
    }
};

// 2. Eliminar un producto
export const deleteProducto = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {

        const response = await fetch(`${PRODUCTOS_URL}/${id}`, { 
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.ok;
    } catch (error) {
        console.error("Error eliminando producto:", error);
        return false;
    }
};

// 3. Crear nuevo producto
export const createProducto = async (producto) => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const response = await fetch(PRODUCTOS_URL, { 
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        if (!response.ok) throw new Error('Error al crear producto');
        return await response.json();
    } catch (error) {
        console.error("Error creando producto:", error);
        return null;
    }
};

// 4. Actualizar producto
export const updateProducto = async (id, producto) => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        // CORREGIDO: Usamos PRODUCTOS_URL
        const response = await fetch(`${PRODUCTOS_URL}/${id}`, { 
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        if (!response.ok) throw new Error('Error al actualizar');
        return await response.json();
    } catch (error) {
        console.error("Error actualizando producto:", error);
        return null;
    }
};