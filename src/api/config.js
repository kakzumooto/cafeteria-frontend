export const API_URL = import.meta.env.PROD 
  ? ''  // En producción, usa ruta relativa (ej: /api/productos)
  : 'https://aroma-borealis-production.up.railway.app';             