import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Dashboard from './Dashboard';
import DatasetUpload from './DatasetUpload';
import VisualizationConfigAndDisplay from './VisualizationConfigAndDisplay';  // Import the new component
import AIInsights from './AIInsights';
import Nav from './Nav';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dataset-upload"
            element={
              <ProtectedRoute>
                <DatasetUpload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/visualization-config"
            element={
              <ProtectedRoute>
                <VisualizationConfigAndDisplay />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-insights"
            element={
              <ProtectedRoute>
                <AIInsights />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;