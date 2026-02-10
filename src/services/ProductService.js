// src/services/ProductService.js

const API_URL = 'http://localhost:8080/api/productos';

// 1. Obtener todos los productos (Para el Catálogo y el Admin)
export const getAllProductos = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo productos:", error);
        return [];
    }
};

// 2. Eliminar un producto (Solo para Admin)
export const deleteProducto = async (id) => {
    const token = localStorage.getItem('token'); // Necesitamos el token de admin
    if (!token) return false;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}` // Importante: Sin esto, el backend te dirá "403 Prohibido"
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
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // ¡Seguridad ante todo!
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
export const updateProducto = async (id, producto) => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT', // Método PUT para actualizar
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