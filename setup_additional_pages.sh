#!/bin/bash

# Function to create a file if it doesn't exist
create_file_if_not_exists() {
  local file_path="$1"
  local file_content="$2"

  if [ -f "$file_path" ]; then
    echo "File $file_path already exists. Skipping..."
  else
    echo "Creating $file_path..."
    echo "$file_content" > "$file_path"
  fi
}

# Navigate to the project root directory
cd "$(dirname "$0")" || exit

# Step 1: Create Signup Page
create_file_if_not_exists "frontend/src/pages/signup.astro" "---\nimport Signup from '../components/Auth/Signup';\n---\n\n<html>\n  <head>\n    <title>Signup - My Astro App</title>\n  </head>\n  <body>\n    <Signup />\n  </body>\n</html>\n"

# Step 2: Create Dataset Upload Page
create_file_if_not_exists "frontend/src/pages/dataset-upload.astro" "---\nimport DatasetUpload from '../components/DatasetUpload';\n---\n\n<html>\n  <head>\n    <title>Dataset Upload - My Astro App</title>\n  </head>\n  <body>\n    <DatasetUpload />\n  </body>\n</html>\n"

# Step 3: Create Visualization Configuration Page
create_file_if_not_exists "frontend/src/pages/visualization-config.astro" "---\nimport VisualizationConfig from '../components/VisualizationConfig';\n---\n\n<html>\n  <head>\n    <title>Visualization Config - My Astro App</title>\n  </head>\n  <body>\n    <VisualizationConfig />\n  </body>\n</html>\n"

# Step 4: Create AI Insights Page
create_file_if_not_exists "frontend/src/pages/ai-insights.astro" "---\nimport AIInsights from '../components/AIInsights';\n---\n\n<html>\n  <head>\n    <title>AI Insights - My Astro App</title>\n  </head>\n  <body>\n    <AIInsights />\n  </body>\n</html>\n"

# Step 5: Create Navigation Component
create_file_if_not_exists "frontend/src/components/Nav.jsx" "import React from 'react';\nimport { Link } from 'react-router-dom';\n\nfunction Nav() {\n  return (\n    <nav>\n      <ul>\n        <li><Link to=\"/\">Login</Link></li>\n        <li><Link to=\"/signup\">Signup</Link></li>\n        <li><Link to=\"/dataset-upload\">Dataset Upload</Link></li>\n        <li><Link to=\"/visualization-config\">Visualization Config</Link></li>\n        <li><Link to=\"/ai-insights\">AI Insights</Link></li>\n      </ul>\n    </nav>\n  );\n}\n\nexport default Nav;\n"

# Step 6: Create Layout Component
create_file_if_not_exists "frontend/src/layouts/Layout.astro" "---\nimport Nav from '../components/Nav';\n---\n\n<html>\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>My Astro App</title>\n  </head>\n  <body>\n    <Nav />\n    <slot />\n  </body>\n</html>\n"

# Step 7: Update Index Page to Use Layout
create_file_if_not_exists "frontend/src/pages/index.astro" "---\nimport Layout from '../layouts/Layout.astro';\nimport Login from '../components/Auth/Login';\n---\n\n<Layout>\n  <Login />\n</Layout>\n"

# Step 8: Update Signup Page to Use Layout
create_file_if_not_exists "frontend/src/pages/signup.astro" "---\nimport Layout from '../layouts/Layout.astro';\nimport Signup from '../components/Auth/Signup';\n---\n\n<Layout>\n  <Signup />\n</Layout>\n"

# Step 9: Update Dataset Upload Page to Use Layout
create_file_if_not_exists "frontend/src/pages/dataset-upload.astro" "---\nimport Layout from '../layouts/Layout.astro';\nimport DatasetUpload from '../components/DatasetUpload';\n---\n\n<Layout>\n  <DatasetUpload />\n</Layout>\n"

# Step 10: Update Visualization Configuration Page to Use Layout
create_file_if_not_exists "frontend/src/pages/visualization-config.astro" "---\nimport Layout from '../layouts/Layout.astro';\nimport VisualizationConfig from '../components/VisualizationConfig';\n---\n\n<Layout>\n  <VisualizationConfig />\n</Layout>\n"

# Step 11: Update AI Insights Page to Use Layout
create_file_if_not_exists "frontend/src/pages/ai-insights.astro" "---\nimport Layout from '../layouts/Layout.astro';\nimport AIInsights from '../components/AIInsights';\n---\n\n<Layout>\n  <AIInsights />\n</Layout>\n"

echo "Setup complete! All pages and navigation are set up."