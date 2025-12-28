import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WordCounter from '../../components/tools/WordCounter';

describe('WordCounter', () => {
  test('counts words and characters', () => {
    render(<WordCounter />);
    const textbox = screen.getByRole('textbox') as HTMLTextAreaElement;
    fireEvent.change(textbox, { target: { value: 'Hello world!\nThis is two lines.' } });

    // Use label-based checks to avoid ambiguous matches
    expect(screen.getByText(/paragraphs/i).previousElementSibling?.textContent).toBe('2');
    expect(screen.getByText(/words/i).previousElementSibling?.textContent).toBe('6');
    expect(screen.getByText(/characters/i).previousElementSibling?.textContent).toBe('31');
  });
});
