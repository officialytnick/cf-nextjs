import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PlaceholderTool from '../../components/tools/PlaceholderTool';

describe('PlaceholderTool', () => {
  test('renders and notifies', () => {
    render(<PlaceholderTool title="Bulk Rename" />);
    const btn = screen.getByRole('button', { name: /Notify Me/i });
    fireEvent.click(btn);
    expect(screen.getByRole('status')).toHaveTextContent(/Requested/i);
  });
});
