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
