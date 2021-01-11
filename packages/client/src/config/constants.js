const BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080/';
const isProduction = process.env.NODE_ENV === 'production';
export { BASE_URL, isProduction };
