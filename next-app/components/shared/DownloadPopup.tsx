"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Download } from 'lucide-react';
import { Button } from '../ui/button';

export default function DownloadPopup({ isOpen, onClose, onDownload, fileCount }: any) {
  const [rating, setRating] = useState(0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 relative" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}>
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black"><X className="w-5 h-5" /></button>

            <h2 className="text-2xl font-bold text-center mb-5">🎉 Conversion Complete!</h2>

            <div className="text-center mb-5">
              <p className="text-gray-700 mb-2 text-lg">Rate this tool:</p>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} onClick={() => setRating(s)} className={`w-8 h-8 cursor-pointer transition ${rating >= s ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>

            <Button onClick={onDownload} className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center py-6 text-lg" size="lg">
              <Download className="w-6 h-6 mr-2" />
              Download {fileCount > 1 ? `${fileCount} Files` : 'File'}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
