import React from 'react';
import { render, screen } from '@testing-library/react';
import PdfToImage from '../../components/tools/PdfToImage';

describe('PdfToImage', () => {
  test('renders file input and extract button', () => {
    render(<PdfToImage />);
    expect(screen.getByLabelText(/Choose PDF/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Extract First Page/i })).toBeInTheDocument();
  });
});