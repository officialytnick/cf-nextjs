import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Base64EncodeDecode from '../../components/tools/Base64EncodeDecode';

describe('Base64EncodeDecode', () => {
  test('renders input and output areas and encodes text', () => {
    render(<Base64EncodeDecode />);
    expect(screen.getByRole('textbox', { name: /Input/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Output/i })).toBeInTheDocument();

    const input = screen.getByRole('textbox', { name: /Input/i }) as HTMLTextAreaElement;
    const encodeBtn = screen.getByRole('button', { name: /Encode to Base64/i });

    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.click(encodeBtn);

    const output = screen.getByRole('textbox', { name: /Output/i }) as HTMLTextAreaElement;
    expect(output.value).not.toBe('');
  });
});
