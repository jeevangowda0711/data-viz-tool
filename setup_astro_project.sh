#!/bin/bash

# Navigate to the project root directory
cd "$(dirname "$0")" || exit

# Step 1: Create folder structure
echo "Creating folder structure..."
mkdir -p frontend/src/components/Auth \
         frontend/src/components \
         frontend/src/services \
         frontend/src/pages \
         frontend/public \
         frontend/.vscode

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

# Step 5: Create Signup Component
echo "Creating Signup component..."
cat <<EOL > frontend/src/components/Auth/Signup.jsx
import React, { useState } from 'react';
import { signup } from '../../services/auth';

/**
 * Signup component for new user registration.
 */

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(email, password);
      console.log('Signup successful:', response);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
EOL

# Step 6: Create DatasetUpload Component
echo "Creating DatasetUpload component..."
cat <<EOL > frontend/src/components/DatasetUpload.jsx
import React, { useState } from 'react';
import API from '../services/api';

/**
 * Component for uploading datasets for visualization.
 */

function DatasetUpload() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await API.post('/datasets/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus('Upload successful!');
      console.log('Upload successful:', response.data);
    } catch (error) {
      setUploadStatus('Upload failed.');
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <h2>Upload Dataset</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}

export default DatasetUpload;
EOL

# Step 7: Create VisualizationConfig Component
echo "Creating VisualizationConfig component..."
cat <<EOL > frontend/src/components/VisualizationConfig.jsx
import React, { useState } from 'react';
import API from '../services/api';

/**
 * Component for configuring visualization settings.
 */

function VisualizationConfig() {
  const [datasetId, setDatasetId] = useState('');
  const [xColumn, setXColumn] = useState('');
  const [yColumn, setYColumn] = useState('');
  const [chartType, setChartType] = useState('bar');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/visualizations/create', {
        dataset_id: datasetId,
        x_column: xColumn,
        y_column: yColumn,
        chart_type: chartType,
      });
      console.log('Visualization created:', response.data);
    } catch (error) {
      console.error('Visualization creation failed:', error);
    }
  };

  return (
    <div>
      <h2>Configure Visualization</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Dataset ID:</label>
          <input type="text" value={datasetId} onChange={(e) => setDatasetId(e.target.value)} required />
        </div>
        <div>
          <label>X Column:</label>
          <input type="text" value={xColumn} onChange={(e) => setXColumn(e.target.value)} required />
        </div>
        <div>
          <label>Y Column:</label>
          <input type="text" value={yColumn} onChange={(e) => setYColumn(e.target.value)} required />
        </div>
        <div>
          <label>Chart Type:</label>
          <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
          </select>
        </div>
        <button type="submit">Create Visualization</button>
      </form>
    </div>
  );
}

export default VisualizationConfig;
EOL

# Step 8: Create AIInsights Component
echo "Creating AIInsights component..."
cat <<EOL > frontend/src/components/AIInsights.jsx
import React, { useState } from 'react';
import API from '../services/api';

/**
 * Component for showing AI-generated insights from datasets.
 */

function AIInsights() {
  const [datasetId, setDatasetId] = useState('');
  const [insights, setInsights] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/ai/insights', { dataset_id: datasetId });
      setInsights(response.data.insights);
    } catch (error) {
      console.error('Failed to generate insights:', error);
    }
  };

  return (
    <div>
      <h2>AI Insights</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Dataset ID:</label>
          <input type="text" value={datasetId} onChange={(e) => setDatasetId(e.target.value)} required />
        </div>
        <button type="submit">Generate Insights</button>
      </form>
      {insights && (
        <div>
          <h3>Insights:</h3>
          <pre>{JSON.stringify(insights, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default AIInsights;
EOL

# Step 9: Create Auth Service
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

# Step 10: Create API Service
echo "Creating API service..."
cat <<EOL > frontend/src/services/api.js
/**
 * Handles API requests to the backend.
 */
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default API;
EOL

# Step 11: Create .gitignore
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

# Step 12: Create VS Code Launch Configuration
echo "Creating VS Code launch configuration..."
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

# Step 13: Create tsconfig.json
echo "Creating tsconfig.json..."
cat <<EOL > frontend/tsconfig.json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
EOL

# Step 14: Create public/index.html
echo "Creating public/index.html..."
cat <<EOL > frontend/public/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using Astro"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Astro App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
EOL

echo "Setup complete! Your Astro project is ready."