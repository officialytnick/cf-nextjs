"use client";

import React from 'react';
import { Label } from '../ui/label';
import { Select, SelectItem } from '../ui/select';

export default function FormatSelector({ value, onChange }: any) {
  const formats = [
    { value: 'webp', label: 'WebP', description: 'Modern, smaller file size' },
    { value: 'jpeg', label: 'JPEG', description: 'Universal compatibility' },
    { value: 'png', label: 'PNG', description: 'Lossless, supports transparency' },
  ];

  const selectedFormat = formats.find((f) => f.value === value);

  return (
    <div className="space-y-2">
      <Label htmlFor="output-format-select">Output Format</Label>
      <Select id="output-format-select" value={value} onValueChange={onChange}>
        {formats.map((format) => (
          <SelectItem key={format.value} value={format.value}>
            {format.label}
          </SelectItem>
        ))}
      </Select>
      {selectedFormat && <div className="text-xs text-muted-foreground mt-1">{selectedFormat.description}</div>}
    </div>
  );
}
