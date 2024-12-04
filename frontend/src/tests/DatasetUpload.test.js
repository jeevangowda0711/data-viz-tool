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
