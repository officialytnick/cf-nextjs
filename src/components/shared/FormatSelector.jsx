
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FormatSelector = ({ value, onChange }) => {
  const formats = [
    { value: 'webp', label: 'WebP', description: 'Modern, smaller file size' },
    { value: 'jpeg', label: 'JPEG', description: 'Universal compatibility' },
    { value: 'png', label: 'PNG', description: 'Lossless, supports transparency' }
  ];

  const selectedFormat = formats.find(f => f.value === value);

  return (
    <div className="space-y-2">
      <Label htmlFor="output-format-select">Output Format</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="output-format-select" className="bg-white dark:bg-gray-900">
          <SelectValue>
             {selectedFormat && (
                <div className="text-gray-800 dark:text-gray-200">
                  <span className="font-medium">{selectedFormat.label}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{selectedFormat.description}</span>
                </div>
              )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {formats.map((format) => (
            <SelectItem key={format.value} value={format.value}>
              <div className="flex flex-col">
                <span className="font-medium">{format.label}</span>
                <span className="text-xs text-muted-foreground">{format.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormatSelector;
