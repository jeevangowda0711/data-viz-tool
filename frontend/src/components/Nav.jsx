import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/dataset-upload">Dataset Upload</Link></li>
        <li><Link to="/visualization-config">Visualization Config</Link></li>
        <li><Link to="/ai-insights">AI Insights</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;
