import React from 'react';
import { render, screen } from '@testing-library/react';
import MergePdf from '../../components/tools/MergePdf';

describe('MergePdf', () => {
  test('renders file input and merge button', () => {
    render(<MergePdf />);
    expect(screen.getByLabelText(/Choose PDFs/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Merge PDFs/i })).toBeInTheDocument();
  });
});