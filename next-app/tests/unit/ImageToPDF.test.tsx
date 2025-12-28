import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageToPDF from '../../components/tools/ImageToPDF';

describe('ImageToPDF', () => {
  test('renders file input and convert button', () => {
    render(<ImageToPDF />);
    expect(screen.getByLabelText(/Choose images/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Convert to PDF/i })).toBeInTheDocument();
  });
});