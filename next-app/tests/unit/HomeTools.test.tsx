import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeTools from '../../components/HomeTools';

describe('HomeTools', () => {
  test('renders tools region', () => {
    render(<HomeTools />);
    const region = screen.getByRole('region', { name: /tools list/i });
    expect(region).toBeInTheDocument();
  });
});
