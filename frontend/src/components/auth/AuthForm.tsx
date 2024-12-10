import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import config from '../../config';

interface AuthFormProps {
  type: 'login' | 'signup';
}

export default function AuthForm({ type }: AuthFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const store = useAuthStore.getState();
      if (type === 'login') {
        const payload = new URLSearchParams({ username: formData.email, password: formData.password });
        const response = await fetch(`${config.apiUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        });
        if (!response.ok) {
          throw new Error('Login failed');
        }
        const data = await response.json();
        localStorage.setItem('token', data.access_token); // Store the token in localStorage
        store.setToken(data.access_token);
        toast.success('Logged in successfully!');
      } else {
        const response = await fetch(`${config.apiUrl}/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email, password: formData.password, name: formData.name }),
        });
        if (!response.ok) {
          throw new Error('Signup failed');
        }
        const data = await response.json();
        localStorage.setItem('token', data.access_token); // Store the token in localStorage
        store.setToken(data.access_token);
        toast.success('Signed up successfully!');
      }
      window.location.href = '/dashboard';
    } catch (error) {
      toast.error('Authentication failed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'signup' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          {type === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>
    </>
  );
}