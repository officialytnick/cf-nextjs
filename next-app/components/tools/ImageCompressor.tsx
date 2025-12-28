"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Zap, X, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import Slider from '../ui/slider';
import { useToast } from '../ui/use-toast';

import FileUploadZone from '../shared/FileUploadZone';
import DownloadPopup from '../shared/DownloadPopup';
import { compressImage, downloadZip } from '../../lib/imageUtils';

const MAX_FILES = 20;

export default function ImageCompressor() {
  const { toast } = useToast();

  const [files, setFiles] = useState<any[]>([]);
  const [quality, setQuality] = useState<number[]>([80]);
  const [globalLoading, setGlobalLoading] = useState(false);

  const [convertedCount, setConvertedCount] = useState(0);
  const [totalToConvert, setTotalToConvert] = useState(0);
  const [toastShown, setToastShown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleFileSelect = useCallback((selected: File | File[]) => {
    const incoming = Array.isArray(selected) ? selected : [selected];

    if (files.length + incoming.length > MAX_FILES) {
      toast({ title: 'Limit Reached', description: `You can upload a maximum of ${MAX_FILES} images.`, variant: 'destructive' });
      return;
    }

    const newFiles = incoming.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      originalSize: file.size,
      compressedSize: null,
      compressedBlob: null,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  }, [files.length, toast]);

  const removeFile = (id: any) => {
    setFiles((prev) => {
      const found = prev.find((f) => f.id === id);
      if (found) URL.revokeObjectURL(found.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  useEffect(() => {
    if (files.length === 0) return;
    let cancelled = false;

    const t = setTimeout(async () => {
      try {
        const updated = await Promise.all(
          files.map(async (f) => {
            const res = await compressImage(f.file, quality[0] / 100);
            return { ...f, compressedSize: res.blob.size };
          })
        );
        if (!cancelled) setFiles(updated);
      } catch (err) {
        // ignore preview errors
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [quality, files.length]);

  const handleCompress = async () => {
    if (files.length === 0) {
      toast({ title: 'No images', description: 'Please upload images first.', variant: 'destructive' });
      return;
    }

    setGlobalLoading(true);
    setConvertedCount(0);
    setTotalToConvert(files.length);
    setToastShown(false);

    try {
      const results = await Promise.all(
        files.map(async (f) => {
          try {
            const res = await compressImage(f.file, quality[0] / 100);
            setConvertedCount((c) => c + 1);
            return { ...f, compressedBlob: res.blob, compressedSize: res.blob.size };
          } catch (err) {
            setConvertedCount((c) => c + 1);
            return { ...f };
          }
        })
      );
      setFiles(results);
    } finally {
      setGlobalLoading(false);
    }
  };

  useEffect(() => {
    if (totalToConvert > 0 && convertedCount === totalToConvert && !toastShown && convertedCount !== 0) {
      setToastShown(true);
      toast({ title: 'Compression Complete', description: 'Opening download popup...' });
      setTimeout(() => setShowPopup(true), 1500);
    }
  }, [convertedCount, totalToConvert, toastShown, toast]);

  const handleDownloadAll = async () => {
    const ready = files.filter((f) => f.compressedBlob);
    if (!ready.length) return;

    if (ready.length === 1) {
      const f = ready[0];
      const url = URL.createObjectURL(f.compressedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = f.file.name;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    await downloadZip(ready.map((f) => ({ name: f.file.name, blob: f.compressedBlob })), 'convertfreely_compressed.zip');
  };

  const formatSize = (b: any) => {
    if (b === null || b === undefined) return '0 KB';
    const kb = b / 1024;
    return kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(2)} MB`;
  };

  const anyCompressed = files.some((f) => f.compressedBlob);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl p-6 border">
      {files.length === 0 ? (
        <FileUploadZone onFileSelect={handleFileSelect} prompt="Choose or drop images" multiple />
      ) : (
        <>
          <div className="mb-4">
            <FileUploadZone onFileSelect={handleFileSelect} prompt="Add more images" multiple />
          </div>

          <div className="mb-6 mt-4">
            <div className="flex gap-4 overflow-x-auto py-2 hide-scrollbar">
              {files.map((f) => (
                <div key={f.id} className="relative bg-white rounded-md shadow-sm overflow-hidden flex-shrink-0 w-40">
                  <img src={f.preview} alt={f.file.name} className="w-40 h-24 object-cover" />

                  <button onClick={() => removeFile(f.id)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1" aria-label="Remove">
                    <X className="w-3 h-3" />
                  </button>

                  {globalLoading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}

                  {!globalLoading && f.compressedBlob && (
                    <div className="absolute bottom-1 left-1 bg-white rounded-full p-0.5">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                  )}

                  <div className="absolute bottom-1 right-1 bg-white/90 p-1 rounded text-[10px] leading-tight text-right">
                    <div className="font-medium">Original: {formatSize(f.originalSize)}</div>
                    {f.compressedSize !== null && <div className="text-green-700">Compressed: {formatSize(f.compressedSize)}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Compression Settings</h3>
              <Label>Quality: {quality[0]}%</Label>
              <Slider value={quality} onValueChange={setQuality} min={10} max={100} step={5} />
              <p className="text-xs text-gray-500 mt-2">Lower quality = smaller file size. Recommended 70–85%.</p>
            </div>

            <div className="self-end space-y-3">
              <Button onClick={handleCompress} disabled={globalLoading} size="lg" className="w-full bg-red-500 text-white">
                {globalLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
                {globalLoading ? 'Compressing...' : `Compress ${files.length} Image(s)`}
              </Button>

              <Button onClick={() => setShowPopup(true)} disabled={!anyCompressed} size="lg" className="w-full bg-green-600 text-white">
                <Download className="w-4 h-4 mr-2" /> Download Compressed
              </Button>
            </div>
          </div>
        </>
      )}

      <DownloadPopup isOpen={showPopup} onClose={() => setShowPopup(false)} fileCount={files.filter((f) => f.compressedBlob).length} onDownload={handleDownloadAll} />
    </motion.div>
  );
}