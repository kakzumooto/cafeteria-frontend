// src/services/OrderService.js
import { API_URL } from '../api/config';

const ORDENES_URL = `${API_URL}/ordenes`;

export const getMisOrdenes = async () => {
    const token = localStorage.getItem('token');
    if (!token) return [];

    try {
        const response = await fetch(`${ORDENES_URL}/mis-ordenes`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Error al cargar historial');
        return await response.json();
    } catch (error) {
        console.error("Error obteniendo órdenes:", error);
        return [];
    }
};