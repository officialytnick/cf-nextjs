"use client";

import React, { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import { Button } from '../ui/button';

export default function FileUploadZone({ onFileSelect, prompt = 'Choose files', multiple = false, accept = 'image/*' }: any) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from((e.dataTransfer as DataTransfer).files);
    if (files.length > 0) {
      onFileSelect(multiple ? files : files[0]);
      toast({ title: 'File added', duration: 1500 });
    }

    if (inputRef.current) inputRef.current.value = '';
  }, [onFileSelect, multiple, toast]);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files && files.length > 0) {
      onFileSelect(multiple ? files : files[0]);
      toast({ title: 'File selected', duration: 1500 });
    }
    e.target.value = '';
  }, [onFileSelect, multiple, toast]);

  return (
    <div onDrop={onDrop} onDragOver={onDragOver} className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center">
      <input ref={inputRef} type="file" id="file-upload-input" className="hidden" accept={accept} multiple={multiple} onChange={onFileChange} />

      <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center">
        <Upload className="w-16 h-16 text-red-500 mb-4" />

        <label htmlFor="file-upload-input">
          <Button asChild size="lg" className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"><span>{prompt}</span></Button>
        </label>

        <p className="mt-4 text-gray-500 dark:text-gray-400">or drop files here</p>
      </motion.div>
    </div>
  );
}
