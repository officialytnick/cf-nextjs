import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JsMinifier from '../../components/tools/JsMinifier';

describe('JsMinifier', () => {
  beforeEach(() => {
    // mock clipboard
    // @ts-ignore
    global.navigator.clipboard = { writeText: vi.fn().mockResolvedValue(undefined) } as any;
  });

  test('minifies JS and copies', () => {
    render(<JsMinifier />);
    const useExampleBtn = screen.getByRole('button', { name: /Use example/i });
    fireEvent.click(useExampleBtn);

    const minifyBtn = screen.getByRole('button', { name: /Minify JavaScript/i });
    fireEvent.click(minifyBtn);

    expect(screen.getByText(/Minified Output/i)).toBeInTheDocument();
    const copyBtn = screen.getByRole('button', { name: /Copy/i });
    fireEvent.click(copyBtn);
    // @ts-ignore
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
