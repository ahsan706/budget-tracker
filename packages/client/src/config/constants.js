const BASE_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080/';
const isProduction = import.meta.env.MODE === 'production';
export { BASE_URL, isProduction };
