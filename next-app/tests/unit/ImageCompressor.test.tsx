import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageCompressor from '../../components/tools/ImageCompressor';

describe('ImageCompressor', () => {
  test('renders upload input and quality slider', () => {
    render(<ImageCompressor />);
    expect(screen.getByLabelText(/Choose Image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quality/i)).toBeInTheDocument();
  });
});
