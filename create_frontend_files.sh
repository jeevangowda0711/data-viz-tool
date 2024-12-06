#!/bin/bash

# Navigate to the project root directory
cd "$(dirname "$0")" || exit

# Step 1: Create folder structure
echo "Creating folder structure..."
mkdir -p frontend/src/components/Auth \
         frontend/src/services \
         frontend/src/pages

# Step 2: Create Astro Configuration File
echo "Creating Astro configuration file..."
cat <<EOL > frontend/astro.config.mjs
// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
});
EOL

# Step 3: Create Astro Page
echo "Creating Astro page..."
cat <<EOL > frontend/src/pages/index.astro
---
import Login from '../components/Auth/Login';
---

<html>
  <head>
    <title>My Astro App</title>
  </head>
  <body>
    <Login />
  </body>
</html>
EOL

# Step 4: Create Login Component
echo "Creating Login component..."
cat <<EOL > frontend/src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { login } from '../../services/auth';

/**
 * Login component for user authentication.
 */

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log('Login successful:', response);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
EOL

# Step 5: Create Auth Service
echo "Creating Auth service..."
cat <<EOL > frontend/src/services/auth.js
/**
 * Manages authentication-related API calls.
 */
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const login = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  return response.data;
};

export const signup = async (email, password) => {
  const response = await API.post('/auth/signup', { email, password });
  return response.data;
};
EOL

# Step 6: Create .gitignore
echo "Creating .gitignore..."
cat <<EOL > frontend/.gitignore
# build output
dist/

# generated types
.astro/

# dependencies
node_modules/

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# environment variables
.env
.env.production

# macOS-specific files
.DS_Store

# jetbrains setting folder
.idea/
EOL

# Step 7: Create VS Code Launch Configuration
echo "Creating VS Code launch configuration..."
mkdir -p frontend/.vscode
cat <<EOL > frontend/.vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "command": "./node_modules/.bin/astro dev",
      "name": "Development server",
      "request": "launch",
      "type": "node-terminal"
    }
  ]
}
EOL

# Step 8: Create tsconfig.json
echo "Creating tsconfig.json..."
cat <<EOL > frontend/tsconfig.json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
EOL

echo "Setup complete! Your Astro project is ready."