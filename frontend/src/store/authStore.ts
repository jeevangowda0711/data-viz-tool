import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import config from '../config';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  setToken: (token: string) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      user: null,
      setToken: (token: string) => set({ token }),
      login: async (email: string, password: string) => {
        try {
          const response = await fetch(`${config.apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            throw new Error('Login failed');
          }

          const data = await response.json();
          set({ isAuthenticated: true, user: { email, name: 'User' }, token: data.access_token });
        } catch (error) {
          throw new Error('Login failed');
        }
      },
      signup: async (email: string, password: string, name: string) => {
        try {
          const response = await fetch(`${config.apiUrl}/auth/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name }),
          });

          if (!response.ok) {
            throw new Error('Signup failed');
          }

          const data = await response.json();
          set({ isAuthenticated: true, user: { email, name }, token: data.access_token });
        } catch (error) {
          throw new Error('Signup failed');
        }
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (optional)
      storage: createJSONStorage(() => localStorage), // use localStorage
    }
  )
);