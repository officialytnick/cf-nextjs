import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JsonToCsv from '../../components/tools/JsonToCsv';

describe('JsonToCsv', () => {
  beforeEach(() => {
    // mock clipboard
    // @ts-ignore
    global.navigator.clipboard = { writeText: vi.fn().mockResolvedValue(undefined) } as any;
  });

  test('converts JSON array to CSV and copies', () => {
    render(<JsonToCsv />);
    const convertBtn = screen.getByRole('button', { name: /Convert/i });
    fireEvent.click(convertBtn);

    // CSV header should be present
    expect(screen.getByText(/name,age,city/i)).toBeInTheDocument();

    const copyBtn = screen.getByRole('button', { name: /Copy CSV/i });
    fireEvent.click(copyBtn);
    // @ts-ignore
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
