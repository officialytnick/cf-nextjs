import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JsonFormatter from '../../components/tools/JsonFormatter';

describe('JsonFormatter', () => {
  beforeEach(() => {
    // mock clipboard
    // @ts-ignore
    global.navigator.clipboard = { writeText: vi.fn().mockResolvedValue(undefined) } as any;
  });

  test('formats and minifies JSON', async () => {
    render(<JsonFormatter />);

    const formatBtn = screen.getByRole('button', { name: /Beautify \/ Format/i });
    const minifyBtn = screen.getByRole('button', { name: /Minify \/ Compress/i });
    const copyBtn = screen.getByRole('button', { name: /copy-json/i });

    fireEvent.click(formatBtn);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.value).toContain('\n  "name": "John Doe"');

    fireEvent.click(minifyBtn);
    expect(textarea.value).not.toContain('\n');

    fireEvent.click(copyBtn);
    // @ts-ignore
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textarea.value);
  });
});
