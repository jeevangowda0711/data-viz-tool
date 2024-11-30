/**
 * Manages authentication-related API calls.
 */
import API from './api';

export const login = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  return response.data;
};

export const signup = async (email, password) => {
  const response = await API.post('/auth/signup', { email, password });
  return response.data;
};
