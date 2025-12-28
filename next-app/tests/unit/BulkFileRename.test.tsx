import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BulkFileRename from '../../components/tools/BulkFileRename';

describe('BulkFileRename', () => {
  test('accepts files, shows new name preview and triggers download', async () => {
    render(<BulkFileRename />);
    const input = screen.getByTestId('file-input') as HTMLInputElement;

    // create a fake file
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    Object.defineProperty(input, 'files', { value: [file] });

    fireEvent.change(input);

    expect(await screen.findByText(/Original: hello.txt/i)).toBeInTheDocument();
    const downloadBtn = screen.getByRole('button', { name: /Download Renamed Files/i });

    // mock URL.createObjectURL + click anchor
    const create = jest.spyOn(URL, 'createObjectURL').mockReturnValue('blob:url');
    const revoke = jest.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    fireEvent.click(downloadBtn);

    expect(await screen.findByText(/Download started|Download/i)).toBeInTheDocument();

    create.mockRestore();
    revoke.mockRestore();
  });
});
