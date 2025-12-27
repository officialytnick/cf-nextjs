import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Zap, X, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

import FileUploadZone from "@/components/shared/FileUploadZone";
import DownloadPopup from "@/components/shared/DownloadPopup";
import { compressImage, downloadZip } from "@/lib/imageUtils";

const MAX_FILES = 20;

const ImageCompressor = () => {
  const { toast } = useToast();

  const [files, setFiles] = useState([]); // {id,file,preview,originalSize,compressedSize,compressedBlob}
  const [quality, setQuality] = useState([80]);
  const [globalLoading, setGlobalLoading] = useState(false);

  const [convertedCount, setConvertedCount] = useState(0);
  const [totalToConvert, setTotalToConvert] = useState(0);
  const [toastShown, setToastShown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  /** HANDLE SELECT - enforce MAX_FILES and add previews immediately */
  const handleFileSelect = useCallback(
    (selected) => {
      const incoming = Array.isArray(selected) ? selected : [selected];

      if (files.length + incoming.length > MAX_FILES) {
        toast({
          title: "Limit Reached",
          description: `You can upload a maximum of ${MAX_FILES} images.`,
          variant: "destructive",
        });
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
    },
    [files.length, toast]
  );

  /** REMOVE FILE */
  const removeFile = (id) => {
    setFiles((prev) => {
      const found = prev.find((f) => f.id === id);
      if (found) URL.revokeObjectURL(found.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  /** LIVE PREVIEW SIZES (debounced) */
  useEffect(() => {
    if (files.length === 0) return;
    let cancelled = false;

    const t = setTimeout(async () => {
      try {
        const updated = await Promise.all(
          files.map(async (f) => {
            // only compute compressedSize for preview (don't overwrite compressedBlob)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quality, files.length]); // only depend on quality and files count to avoid stomping concurrent state

  /** FINAL COMPRESS: batch all files in one Promise.all to avoid many partial state updates */
  const handleCompress = async () => {
    if (files.length === 0) {
      toast({
        title: "No images",
        description: "Please upload images first.",
        variant: "destructive",
      });
      return;
    }

    setGlobalLoading(true);
    setConvertedCount(0);
    setTotalToConvert(files.length);
    setToastShown(false);

    try {
      // mark all as "processing" visually by leaving preview intact and using globalLoading
      const results = await Promise.all(
        files.map(async (f) => {
          try {
            const res = await compressImage(f.file, quality[0] / 100);
            setConvertedCount((c) => c + 1);
            return {
              ...f,
              compressedBlob: res.blob,
              compressedSize: res.blob.size,
            };
          } catch (err) {
            setConvertedCount((c) => c + 1);
            // keep original entry if compression fails
            return { ...f };
          }
        })
      );
      // update once with whole array -avoids intermediate re-renders that cause flicker
      setFiles(results);
    } finally {
      setGlobalLoading(false);
    }
  };

  /** AUTO POPUP when all compressed */
  useEffect(() => {
    if (
      totalToConvert > 0 &&
      convertedCount === totalToConvert &&
      !toastShown &&
      convertedCount !== 0
    ) {
      setToastShown(true);
      toast({
        title: "Compression Complete",
        description: "Opening download popup...",
      });
      setTimeout(() => setShowPopup(true), 3000);
    }
  }, [convertedCount, totalToConvert, toastShown, toast]);

  /** DOWNLOAD logic */
  const handleDownloadAll = async () => {
    const ready = files.filter((f) => f.compressedBlob);
    if (!ready.length) return;

    if (ready.length === 1) {
      const f = ready[0];
      const url = URL.createObjectURL(f.compressedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = f.file.name;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    await downloadZip(
      ready.map((f) => ({ name: f.file.name, blob: f.compressedBlob })),
      "convertfreely_compressed.zip"
    );
  };

  const formatSize = (b) => {
    if (!b && b !== 0) return "0 KB";
    const kb = b / 1024;
    return kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(2)} MB`;
  };

  const anyCompressed = files.some((f) => f.compressedBlob);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl p-6 border"
    >
      {/* If no files: show full upload zone */}
      {files.length === 0 ? (
        <FileUploadZone
          onFileSelect={handleFileSelect}
          prompt="Choose or drop images"
          multiple
        />
      ) : (
        <>
        {/* Add More box -placed below slider (normal style) */}
          <div className="mb-4">
            <FileUploadZone onFileSelect={handleFileSelect} prompt="Add more images" multiple />
          </div>
          {/* Slider preview -thumbnails left-to-right */}
          <div className="mb-6 mt-4">
            <div className="flex gap-4 overflow-x-auto py-2 hide-scrollbar">
              {files.map((f) => (
                <div
                  key={f.id}
                  className="relative bg-white rounded-md shadow-sm overflow-hidden flex-shrink-0 w-40"
                >
                  <img src={f.preview} alt={f.file.name} className="w-40 h-24 object-cover" />

                  <button
                    onClick={() => removeFile(f.id)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                    aria-label="Remove"
                  >
                    <X className="w-3 h-3" />
                  </button>

                  {/* global loading overlay (shows while batch compressing) */}
                  {globalLoading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}

                  {/* checkmark after compression */}
                  {!globalLoading && f.compressedBlob && (
                    <div className="absolute bottom-1 left-1 bg-white rounded-full p-0.5">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                  )}

                  {/* size info box -clearer labels */}
                  <div className="absolute bottom-1 right-1 bg-white/90 p-1 rounded text-[10px] leading-tight text-right">
                    <div className="font-medium">Original: {formatSize(f.originalSize)}</div>
                    {f.compressedSize !== null && (
                      <div className="text-green-700">Compressed: {formatSize(f.compressedSize)}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        
          {/* Controls */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Compression Settings</h3>
              <Label>Quality: {quality[0]}%</Label>
              <Slider value={quality} onValueChange={setQuality} min={10} max={100} step={5} />
              <p className="text-xs text-gray-500 mt-2">Lower quality = smaller file size. Recommended 70–85%.</p>
            </div>

            <div className="self-end space-y-3">
              <Button
                onClick={handleCompress}
                disabled={globalLoading}
                size="lg"
                className="w-full bg-red-500 text-white"
              >
                {globalLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
                {globalLoading ? "Compressing..." : `Compress ${files.length} Image(s)`}
              </Button>

              <Button onClick={() => setShowPopup(true)} disabled={!anyCompressed} size="lg" className="w-full bg-green-600 text-white">
                <Download className="w-4 h-4 mr-2" /> Download Compressed
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Download popup */}
      <DownloadPopup isOpen={showPopup} onClose={() => setShowPopup(false)} fileCount={files.filter((f) => f.compressedBlob).length} onDownload={handleDownloadAll} />
    </motion.div>
  );
};

export default ImageCompressor;
