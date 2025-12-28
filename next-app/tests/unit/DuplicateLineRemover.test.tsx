import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DuplicateLineRemover from '../../components/tools/DuplicateLineRemover';

describe('DuplicateLineRemover', () => {
  beforeEach(() => {
    // mock clipboard
    // @ts-ignore
    global.navigator.clipboard = { writeText: vi.fn().mockResolvedValue(undefined) } as any;
  });

  test('removes duplicate lines and copies', () => {
    render(<DuplicateLineRemover />);
    const removeBtn = screen.getByRole('button', { name: /Remove Duplicate Lines/i });
    fireEvent.click(removeBtn);

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.value.split('\n').filter(Boolean).length).toBeLessThanOrEqual(4);

    const copyBtn = screen.getByRole('button', { name: /copy-text/i });
    fireEvent.click(copyBtn);
    // @ts-ignore
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
