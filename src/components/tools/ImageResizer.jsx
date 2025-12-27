import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Maximize2,
  X,
  CheckCircle2,
  Loader2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

import FileUploadZone from "@/components/shared/FileUploadZone";
import DownloadPopup from "@/components/shared/DownloadPopup";
import { resizeImage, downloadZip } from "@/lib/imageUtils";

const MAX_FILES = 20;

const ImageResizer = () => {
  const { toast } = useToast();

  const [files, setFiles] = useState([]);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [maintainAspect, setMaintainAspect] = useState(true);

  const [globalLoading, setGlobalLoading] = useState(false);
  const [convertedCount, setConvertedCount] = useState(0);
  const [totalToConvert, setTotalToConvert] = useState(0);
  const [toastShown, setToastShown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const parse = (v) => {
    const n = parseInt(v, 10);
    return Number.isFinite(n) && n > 0 ? n : null;
  };

  /** ---------------- FILE UPLOAD ---------------- */
  const handleFileSelect = useCallback(
    (selected) => {
      const incoming = Array.isArray(selected) ? selected : [selected];

      if (files.length + incoming.length > MAX_FILES) {
        toast({
          title: "Limit Reached",
          description: `Maximum ${MAX_FILES} images allowed.`,
          variant: "destructive"
        });
        return;
      }

      const mapped = incoming.map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
        resizedBlob: null,
        originalDimensions: null,
        resizedDimensions: null
      }));

      setFiles((prev) => [...prev, ...mapped]);

      // asynchronously load original image dimensions
      mapped.forEach((entry) => {
        const img = new Image();
        img.onload = () => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === entry.id
                ? {
                    ...f,
                    originalDimensions: {
                      width: img.width,
                      height: img.height
                    }
                  }
                : f
            )
          );
        };
        img.src = entry.preview;
      });
    },
    [files.length, toast]
  );

  /** ---------------- REMOVE ---------------- */
  const removeFile = (id) => {
    setFiles((prev) => {
      const t = prev.find((f) => f.id === id);
      if (t) URL.revokeObjectURL(t.preview);
      return prev.filter((x) => x.id !== id);
    });
  };

  /** ---------------- PREVIEW DIM CALC ---------------- */
  const calculatePreviewSize = (f) => {
    const orig = f.originalDimensions;
    if (!orig) return null;

    const w = parse(width);
    const h = parse(height);

    if (maintainAspect) {
      // Option A behavior: user provides width OR height (not both ideally)
      if (w && !h) {
        const scale = w / orig.width;
        return { width: w, height: Math.round(orig.height * scale) };
      }
      if (h && !w) {
        const scale = h / orig.height;
        return { width: Math.round(orig.width * scale), height: h };
      }
      // if both present while maintainAspect is true: we follow Option A
      // but we keep width and compute height as scaled based on width.
      if (w && h) {
        const scale = w / orig.width;
        return { width: w, height: Math.round(orig.height * scale) };
      }
      // nothing provided
      return null;
    }

    // aspect OFF: both required
    if (w && h) return { width: w, height: h };
    return null;
  };

  useEffect(() => {
    if (!files.length) return;
    setFiles((prev) =>
      prev.map((f) =>
        f.originalDimensions
          ? { ...f, resizedDimensions: calculatePreviewSize(f) }
          : f
      )
    );
  }, [width, height, maintainAspect]);

  /** ---------------- ASPECT TOGGLE (Option A behavior) ---------------- */
  const handleAspectToggle = () => {
    // Toggle state
    setMaintainAspect((prev) => {
      const next = !prev;

      // If switching ON and both width+height were filled, keep width and clear height
      if (next === true) {
        const w = parse(width);
        const h = parse(height);
        if (w && h) {
          // keep width, clear height so height shows Auto and becomes disabled
          setHeight("");
        }
      }
      // when switching OFF we do nothing to inputs (user can edit both)
      // refresh previews will be handled by useEffect dependency on maintainAspect
      return next;
    });
  };

  /** ---------------- RESIZE ---------------- */
  const handleResize = async () => {
    const w = parse(width);
    const h = parse(height);

    if (!files.length) {
      toast({
        title: "Missing Images",
        description: "Upload images first.",
        variant: "destructive"
      });
      return;
    }

    if (maintainAspect && !w && !h) {
      toast({
        title: "Missing Dimensions",
        description: "Enter width OR height.",
        variant: "destructive"
      });
      return;
    }

    if (!maintainAspect && (!w || !h)) {
      toast({
        title: "Missing Dimensions",
        description: "Enter both width and height.",
        variant: "destructive"
      });
      return;
    }

    setGlobalLoading(true);
    setToastShown(false);
    setConvertedCount(0);
    setTotalToConvert(files.length);

    const results = await Promise.all(
      files.map(async (f) => {
        const dims = calculatePreviewSize(f);
        if (!dims) return f;

        try {
          const res = await resizeImage(f.file, dims.width, dims.height);
          setConvertedCount((c) => c + 1);
          return {
            ...f,
            resizedBlob: res.blob || res,
            resizedDimensions: dims
          };
        } catch {
          setConvertedCount((c) => c + 1);
          return f;
        }
      })
    );

    setFiles(results);
    setGlobalLoading(false);
  };

  /** ---------------- AUTO POPUP ---------------- */
  useEffect(() => {
    if (
      totalToConvert > 0 &&
      convertedCount === totalToConvert &&
      !toastShown &&
      convertedCount !== 0
    ) {
      setToastShown(true);
      toast({
        title: "Resize Complete",
        description: "Opening download popup..."
      });

      setTimeout(() => setShowPopup(true), 3000);
    }
  }, [convertedCount, totalToConvert, toastShown, toast]);

  /** ---------------- DOWNLOAD ---------------- */
  const handleDownloadAll = async () => {
    const ready = files.filter((f) => f.resizedBlob);
    if (!ready.length) return;

    if (ready.length === 1) {
      const f = ready[0];
      const url = URL.createObjectURL(f.resizedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = f.file.name;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    await downloadZip(
      ready.map((f) => ({ name: f.file.name, blob: f.resizedBlob })),
      "convertfreely_resize.zip"
    );
  };

  const anyResized = files.some((f) => f.resizedBlob);

  /** ---------------- INPUT DISABLE LOGIC (A: keep width when both filled on toggle) ---------------- */
  // When maintainAspect is true:
  // - disable height if width has a value
  // - disable width if height has a value
  const widthDisabled =
    maintainAspect && parse(height) !== null && height !== "";

  const heightDisabled =
    maintainAspect && parse(width) !== null && width !== "";

  return (
    <motion.div className="bg-white rounded-xl p-6 border">
      {files.length === 0 ? (
        <FileUploadZone
          onFileSelect={handleFileSelect}
          prompt="Choose or drop images to resize"
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

          {/* Preview */}
          <div className="flex gap-4 overflow-x-auto py-2 hide-scrollbar mb-6">
            {files.map((f) => (
              <div
                key={f.id}
                className="relative bg-white rounded-md shadow-sm overflow-hidden flex-shrink-0 w-40"
              >
                <img src={f.preview} className="w-40 h-24 object-cover" />

                <button
                  onClick={() => removeFile(f.id)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                >
                  <X className="w-3 h-3" />
                </button>

                {globalLoading && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}

                {!globalLoading && f.resizedBlob && (
                  <div className="absolute bottom-1 left-1 bg-white rounded-full p-0.5">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                )}

                <div className="absolute bottom-1 right-1 bg-white/90 p-1 rounded text-[10px] leading-tight">
                  <div>
                    Original:{" "}
                    {f.originalDimensions
                      ? `${f.originalDimensions.width}×${f.originalDimensions.height}`
                      : "-"}
                  </div>
                  <div className="text-green-700">
                    Resized:{" "}
                    {f.resizedDimensions
                      ? `${f.resizedDimensions.width}×${f.resizedDimensions.height}`
                      : "-"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Settings */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Resize Settings</h3>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <Label>Width (px)</Label>
                  <Input
                    value={width}
                    disabled={widthDisabled}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder={widthDisabled ? "Auto" : "Width"}
                  />
                </div>

                <div>
                  <Label>Height (px)</Label>
                  <Input
                    value={height}
                    disabled={heightDisabled}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={heightDisabled ? "Auto" : "Height"}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Checkbox
                  checked={maintainAspect}
                  onCheckedChange={handleAspectToggle}
                />
                <Label className="cursor-pointer">Maintain Aspect Ratio</Label>
              </div>

              <p className="text-xs text-gray-500">
                {maintainAspect
                  ? "Enter width OR height. The other dimension shows Auto and is locked."
                  : "Enter both width and height for exact resizing (may stretch images)."}
              </p>
            </div>

            <div className="space-y-4 self-end">
              <Button
                onClick={handleResize}
                disabled={globalLoading}
                size="lg"
                className="w-full bg-red-500 text-white"
              >
                {globalLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Resizing...
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-4 h-4 mr-2" />
                    Resize {files.length} Image(s)
                  </>
                )}
              </Button>

              <Button
                onClick={() => setShowPopup(true)}
                disabled={!anyResized}
                size="lg"
                className="w-full bg-green-600 text-white"
              >
                <Download className="w-4 h-4 mr-2" /> Download Resized
              </Button>
            </div>
          </div>
        </>
      )}

      <DownloadPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        fileCount={files.filter((f) => f.resizedBlob).length}
        onDownload={handleDownloadAll}
      />
    </motion.div>
  );
};

export default ImageResizer;
