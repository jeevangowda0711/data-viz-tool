import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.PUBLIC_API_BASE_URL,
});

export default API;
