import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextCaseConverter from '../../components/tools/TextCaseConverter';

describe('TextCaseConverter', () => {
  beforeEach(() => {
    // mock clipboard
    // @ts-ignore
    global.navigator.clipboard = { writeText: vi.fn().mockResolvedValue(undefined) } as any;
  });

  test('renders and transforms text correctly', async () => {
    render(<TextCaseConverter />);

    const textbox = screen.getByRole('textbox', { name: /Input/i }) as HTMLTextAreaElement;
    expect(textbox).toBeInTheDocument();
    expect(textbox.value).toMatch(/Hello World/i);

    const lowerBtn = screen.getByRole('button', { name: /lowercase/i });
    fireEvent.click(lowerBtn);
    expect(textbox.value).toMatch(/hello world/i);

    const upperBtn = screen.getByRole('button', { name: /UPPERCASE/i });
    fireEvent.click(upperBtn);
    expect(textbox.value).toMatch(/HELLO WORLD/i);

    const titleBtn = screen.getByRole('button', { name: /Title Case/i });
    fireEvent.click(titleBtn);
    expect(textbox.value).toMatch(/Hello World/i);

    const copyBtn = screen.getByRole('button', { name: /copy-text/i });
    fireEvent.click(copyBtn);
    // @ts-ignore
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textbox.value);
  });
});
