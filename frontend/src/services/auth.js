import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.PUBLIC_API_BASE_URL,
});

export const login = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);
  
  const response = await API.post('/auth/login', formData);
  return response.data;
};

export const signup = async (email, password) => {
  const response = await API.post('/auth/signup', { email, password });
  return response.data;
};
