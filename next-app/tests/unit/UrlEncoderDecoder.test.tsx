import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UrlEncoderDecoder from '../../components/tools/UrlEncoderDecoder';

describe('UrlEncoderDecoder', () => {
  beforeEach(() => {
    // mock clipboard
    // @ts-ignore
    global.navigator.clipboard = { writeText: vi.fn().mockResolvedValue(undefined) } as any;
  });

  test('encodes and decodes URLs', () => {
    render(<UrlEncoderDecoder />);

    const input = screen.getByRole('textbox', { name: /Input/i }) as HTMLTextAreaElement;
    expect(input).toBeInTheDocument();

    const encodeBtn = screen.getByRole('button', { name: /Encode URL/i });
    fireEvent.change(input, { target: { value: 'hello world' } });
    fireEvent.click(encodeBtn);

    const output = screen.getByRole('textbox', { name: /Output/i }) as HTMLTextAreaElement;
    expect(output.value).toContain('%20');

    const decodeBtn = screen.getByRole('button', { name: /Decode URL/i });
    fireEvent.change(input, { target: { value: 'hello%20world' } });
    fireEvent.click(decodeBtn);

    expect(output.value).toMatch(/hello world/);
  });
});
