#!/bin/bash

# Navigate to the project root directory
cd "$(dirname "$0")" || exit

# Step 1: Create Backend Test Files
echo "Creating backend test files..."

mkdir -p backend/tests

cat <<EOL > backend/tests/test_main.py
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}
EOL

cat <<EOL > backend/tests/test_auth.py
from fastapi.testclient import TestClient
from app.main import app
from app.schemas.user import UserCreate

client = TestClient(app)

def test_signup():
    response = client.post("/auth/signup", json={"email": "test@example.com", "password": "testpassword"})
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login():
    response = client.post("/auth/login", data={"username": "test@example.com", "password": "testpassword"})
    assert response.status_code == 200
    assert "access_token" in response.json()
EOL

cat <<EOL > backend/tests/test_dataset_upload.py
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_upload_dataset():
    with open("test.csv", "w") as f:
        f.write("column1,column2\nvalue1,value2")
    with open("test.csv", "rb") as f:
        response = client.post("/datasets/upload", files={"file": f})
    assert response.status_code == 200
    assert "id" in response.json()
EOL

cat <<EOL > backend/tests/test_visualization.py
from fastapi.testclient import TestClient
from app.main import app
from app.schemas.visualization import VisualizationCreate

client = TestClient(app)

def test_create_visualization():
    visualization_data = {
        "user_id": 1,
        "chart_type": "bar",
        "config_data": '{"x": "column1", "y": "column2"}'
    }
    response = client.post("/visualizations/create", json=visualization_data)
    assert response.status_code == 200
    assert "id" in response.json()

def test_get_visualization():
    response = client.get("/visualizations/1")
    assert response.status_code == 200
    assert "id" in response.json()
EOL

# Step 2: Create Frontend Test Files
echo "Creating frontend test files..."

mkdir -p frontend/src/tests

cat <<EOL > frontend/src/tests/App.test.js
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders welcome message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to the FastAPI Backend!/i);
  expect(linkElement).toBeInTheDocument();
});
EOL

cat <<EOL > frontend/src/tests/Login.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Auth/Login';
import { login } from '../services/auth';

jest.mock('../services/auth');

test('renders login form', () => {
  render(<Login />);
  const loginButton = screen.getByText(/Login/i);
  expect(loginButton).toBeInTheDocument();
});

test('handles login', async () => {
  login.mockResolvedValue({ access_token: 'test_token' });
  render(<Login />);
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'testpassword' } });
  fireEvent.click(screen.getByText(/Login/i));
  expect(await screen.findByText(/Login successful/i)).toBeInTheDocument();
});
EOL

cat <<EOL > frontend/src/tests/Signup.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Signup from '../components/Auth/Signup';
import { signup } from '../services/auth';

jest.mock('../services/auth');

test('renders signup form', () => {
  render(<Signup />);
  const signupButton = screen.getByText(/Signup/i);
  expect(signupButton).toBeInTheDocument();
});

test('handles signup', async () => {
  signup.mockResolvedValue({ access_token: 'test_token' });
  render(<Signup />);
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'testpassword' } });
  fireEvent.click(screen.getByText(/Signup/i));
  expect(await screen.findByText(/Signup successful/i)).toBeInTheDocument();
});
EOL

cat <<EOL > frontend/src/tests/DatasetUpload.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import DatasetUpload from '../components/DatasetUpload';

test('renders dataset upload form', () => {
  render(<DatasetUpload />);
  const uploadButton = screen.getByText(/Upload/i);
  expect(uploadButton).toBeInTheDocument();
});

test('handles file upload', () => {
  render(<DatasetUpload />);
  const fileInput = screen.getByLabelText(/Choose file/i);
  fireEvent.change(fileInput, { target: { files: [new File(['dummy content'], 'example.csv', { type: 'text/csv' })] } });
  expect(fileInput.files[0].name).toBe('example.csv');
});
EOL

echo "Test files created successfully!"