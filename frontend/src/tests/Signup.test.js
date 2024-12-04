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
