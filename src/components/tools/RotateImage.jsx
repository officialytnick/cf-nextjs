import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Download,
  RotateCcw,
  RotateCw,
  X,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import FileUploadZone from "@/components/shared/FileUploadZone";
import DownloadPopup from "@/components/shared/DownloadPopup";
import { transformImage, downloadZip } from "@/lib/imageUtils";

const MAX_FILES = 20;

const RotateImage = () => {
  const { toast } = useToast();

  const [files, setFiles] = useState([]);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  /** ------------------------------------------
   * HANDLE FILE UPLOAD
   ------------------------------------------- */
  const handleFileSelect = useCallback(
    (selectedFiles) => {
      const incoming = Array.isArray(selectedFiles)
        ? selectedFiles
        : [selectedFiles];

      if (files.length + incoming.length > MAX_FILES) {
        toast({
          title: "Limit Reached",
          description: `You can upload a maximum of ${MAX_FILES} images.`,
          variant: "destructive",
        });
        return;
      }

      const prepared = incoming.map((file) => ({
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
        rotatedPreview: null,
        rotatedBlob: null,
        loading: false,
        rotation: 0,
      }));

      setFiles((prev) => [...prev, ...prepared]);
    },
    [files.length]
  );

  /** ------------------------------------------
   * REMOVE FILE
   ------------------------------------------- */
  const removeFile = (id) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  /** ------------------------------------------
   * LIVE PREVIEW ROTATION
   ------------------------------------------- */
  const rotatePreview = async (f, degrees) => {
    const rotation = (f.rotation + degrees + 360) % 360;

    const img = new Image();
    img.src = f.preview;

    await new Promise((res) => (img.onload = res));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const angle = (rotation * Math.PI) / 180;
    const sin = Math.abs(Math.sin(angle));
    const cos = Math.abs(Math.cos(angle));

    canvas.width = img.width * cos + img.height * sin;
    canvas.height = img.width * sin + img.height * cos;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);

    return {
      rotation,
      preview: canvas.toDataURL("image/png"),
    };
  };

  const handleRotatePreview = async (degrees) => {
    const updated = await Promise.all(
      files.map(async (f) => {
        const { preview, rotation } = await rotatePreview(f, degrees);
        return {
          ...f,
          rotatedPreview: preview,
          rotation,
          rotatedBlob: null,
        };
      })
    );
    setFiles(updated);
  };

  /** ------------------------------------------
   * PROCESS ROTATION
   ------------------------------------------- */
  const handleRotateProcess = async () => {
    if (files.length === 0) {
      toast({
        title: "No images",
        description: "Please upload images first.",
        variant: "destructive",
      });
      return;
    }

    setGlobalLoading(true);

    const results = await Promise.all(
      files.map(async (f) => {
        try {
          const res = await transformImage(f.file, f.rotation, {
            horizontal: false,
            vertical: false,
          });

          return {
            ...f,
            rotatedBlob: res.blob,
          };
        } catch {
          return { ...f };
        }
      })
    );

    setFiles(results);
    setGlobalLoading(false);

    toast({
      title: "Rotation Complete",
      description: "Opening download popup...",
    });

    setTimeout(() => setShowPopup(true), 3000);
  };

  /** ------------------------------------------
   * DOWNLOAD
   ------------------------------------------- */
  const handleDownloadAll = async () => {
    const ready = files.filter((f) => f.rotatedBlob);
    if (!ready.length) return;

    if (ready.length === 1) {
      const f = ready[0];
      const url = URL.createObjectURL(f.rotatedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = f.file.name;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    await downloadZip(
      ready.map((f) => ({ name: f.file.name, blob: f.rotatedBlob })),
      "convertfreely_rotateimage.zip"
    );
  };

  const anyRotated = files.some((f) => f.rotatedBlob);

  /** ------------------------------------------
   * UI
   ------------------------------------------- */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl p-6 border"
    >
      {/* Upload Zone */}
      {files.length === 0 ? (
        <FileUploadZone
          onFileSelect={handleFileSelect}
          prompt="Choose or drop images to rotate"
          multiple
        />
      ) : (
        <>
          {/* Add More */}
          <div className="mb-4">
            <FileUploadZone
              onFileSelect={handleFileSelect}
              prompt="Add more images"
              multiple
            />
          </div>

          {/* SLIDER PREVIEW */}
          <div className="mb-6 mt-4">
            <div className="flex gap-4 overflow-x-auto hide-scrollbar py-2">
              {files.map((f) => (
                <div
                  key={f.id}
                  className="relative bg-white rounded-md shadow-sm overflow-hidden flex-shrink-0 w-40"
                >
                  <img
                    src={f.rotatedPreview || f.preview}
                    className="w-40 h-24 object-cover"
                  />

                  {/* Remove */}
                  <button
                    onClick={() => removeFile(f.id)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>

                  {/* Loading overlay */}
                  {globalLoading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}

                  {/* Checkmark */}
                  {!globalLoading && f.rotatedBlob && (
                    <div className="absolute bottom-1 left-1 bg-white rounded-full p-0.5">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                  )}

                  {/* Rotation Label */}
                  {f.rotation !== 0 && (
                    <div className="absolute bottom-1 right-1 bg-white/80 text-[10px] px-1 rounded">
                      {f.rotation}°
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* TOP CONTROLS */}
          <div className="flex justify-center gap-4 mb-6">
            <Button
              onClick={() => handleRotatePreview(-90)}
              variant="outline"
              className="px-4 py-2 md:px-6 md:py-3"
            >
              <RotateCcw className="w-5 h-5 mr-2" /> Rotate Left
            </Button>

            <Button
              onClick={() => handleRotatePreview(90)}
              variant="outline"
              className="px-4 py-2 md:px-6 md:py-3"
            >
              <RotateCw className="w-5 h-5 mr-2" /> Rotate Right
            </Button>
          </div>

          {/* PROCESS + DOWNLOAD (Desktop side-by-side, Mobile stacked) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Button
              onClick={handleRotateProcess}
              disabled={globalLoading}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              {globalLoading && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {globalLoading
                ? "Rotating..."
                : `Rotate ${files.length} Image(s)`}
            </Button>

            <Button
              onClick={() => setShowPopup(true)}
              disabled={!anyRotated || globalLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" /> Download Rotated Images
            </Button>
          </div>
        </>
      )}

      {/* Popup */}
      <DownloadPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        fileCount={files.filter((f) => f.rotatedBlob).length}
        onDownload={handleDownloadAll}
      />
    </motion.div>
  );
};

export default RotateImage;
