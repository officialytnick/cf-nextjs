import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download,
  FlipHorizontal,
  FlipVertical,
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

// Optional dev/sample path from your session (won't be used unless you call loadSampleLocal)
const SAMPLE_LOCAL_PATH = "/mnt/data/c1cd9aa3-9011-4702-bc6b-70aff64e4c0c.png";

const FlipImage = () => {
  const { toast } = useToast();

  // file shape:
  // { id, file (File|null), preview (blob/object|dataURL), flippedPreview (dataURL|null), flippedBlob (Blob|null), loading (bool) }
  const [files, setFiles] = useState([]);
  const [flipState, setFlipState] = useState({ horizontal: false, vertical: false });
  const [globalProcessing, setGlobalProcessing] = useState(false);

  const [convertedCount, setConvertedCount] = useState(0);
  const [totalToConvert, setTotalToConvert] = useState(0);
  const [toastShown, setToastShown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  /** -------------------------
   * helper: create preview URL from File
   * set loading true until image loads
   * ------------------------- */
  const buildFileEntries = async (incoming) => {
    const entries = incoming.map((file) => {
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
      return {
        id,
        file,
        preview: URL.createObjectURL(file),
        flippedPreview: null,
        flippedBlob: null,
        loading: true, // true until we load image
      };
    });

    // append then load images to clear loading flag (so UI shows spinner on upload)
    setFiles((prev) => [...prev, ...entries]);

    // asynchronously wait for each image to load and then clear loading
    entries.forEach((entry) => {
      const img = new Image();
      img.onload = () => {
        setFiles((prev) =>
          prev.map((f) => (f.id === entry.id ? { ...f, loading: false, flippedPreview: f.preview } : f))
        );
      };
      img.onerror = () => {
        setFiles((prev) => prev.map((f) => (f.id === entry.id ? { ...f, loading: false, flippedPreview: f.preview } : f)));
      };
      img.src = entry.preview;
    });
  };

  /** -------------------------
   * Handle files from FileUploadZone
   * ------------------------- */
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

      // Build entries and start loading sequence
      buildFileEntries(incoming);
    },
    [files.length, toast]
  );

  /** Optional dev loader -call manually if you want (not used by default) */
  const loadSampleLocal = useCallback(() => {
    // create fake File-like entry using preview path only (file=null)
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    const entry = {
      id,
      file: null,
      preview: SAMPLE_LOCAL_PATH,
      flippedPreview: SAMPLE_LOCAL_PATH,
      flippedBlob: null,
      loading: false,
    };
    setFiles((prev) => [...prev, entry]);
  }, []);

  /** -------------------------
   * remove file & revoke URLs
   * ------------------------- */
  const removeFile = (id) => {
    setFiles((prev) => {
      const t = prev.find((f) => f.id === id);
      if (t && typeof t.preview === "string" && t.preview.startsWith("blob:")) URL.revokeObjectURL(t.preview);
      if (t && typeof t.flippedPreview === "string" && t.flippedPreview.startsWith("blob:")) URL.revokeObjectURL(t.flippedPreview);
      return prev.filter((f) => f.id !== id);
    });
  };

  /** -------------------------
   * Canvas flip preview for a single file
   * returns dataURL
   * ------------------------- */
  const createFlippedDataURL = async (previewUrl, { horizontal, vertical }) => {
    // previewUrl may be object URL or data URL; load into Image
    const img = new Image();
    // to avoid cross-origin issues, set crossOrigin when needed -if your previews are blob/object URLs it's fine
    img.crossOrigin = "anonymous";
    img.src = previewUrl;

    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = () => rej(new Error("Image load failed"));
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // flipping via scaling: horizontal => scaleX = -1 ; vertical => scaleY = -1
    const flipX = horizontal ? -1 : 1;
    const flipY = vertical ? -1 : 1;

    // If both flips and rotate not needed, canvas size same
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(flipX, flipY);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();

    return canvas.toDataURL("image/png");
  };

  /** -------------------------
   * Apply live preview flip to all files (no processing)
   * ------------------------- */
  const applyPreviewFlipToAll = async (nextFlipState) => {
    // show per-file loading while generating previews (small spinner)
    setFiles((prev) => prev.map((f) => ({ ...f, loading: true })));

    const updated = await Promise.all(
      files.map(async (f) => {
        try {
          const dataURL = await createFlippedDataURL(f.preview, nextFlipState);
          return { ...f, flippedPreview: dataURL, loading: false, flippedBlob: null };
        } catch {
          // on failure fallback to original preview
          return { ...f, flippedPreview: f.preview, loading: false };
        }
      })
    );

    setFiles(updated);
  };

  /** -------------------------
   * Toggle flip buttons (live preview) -Horizontal or Vertical
   * ------------------------- */
  const handleFlipToggle = async (direction) => {
    const next = { ...flipState };
    if (direction === "horizontal") next.horizontal = !next.horizontal;
    else next.vertical = !next.vertical;

    setFlipState(next);

    // Apply live preview flip
    if (files.length > 0) {
      await applyPreviewFlipToAll(next);
    }
  };

  /** -------------------------
   * Process (actual flip) -create blobs via transformImage
   * ------------------------- */
  const handleProcessFlip = async () => {
    if (files.length === 0) {
      toast({ title: "No images", description: "Please upload images first.", variant: "destructive" });
      return;
    }

    setGlobalProcessing(true);
    setConvertedCount(0);
    setTotalToConvert(files.length);
    setToastShown(false);

    try {
      const results = await Promise.all(
        files.map(async (f) => {
          try {
            const res = await transformImage(f.file, 0, flipState);
            // res should return { url, blob }
            setConvertedCount((c) => c + 1);
            return {
              ...f,
              flippedBlob: res.blob || null,
              flippedPreview: res.url || f.flippedPreview || f.preview,
            };
          } catch (err) {
            setConvertedCount((c) => c + 1);
            // keep file unchanged on error
            toast({ title: "Flip failed for one image", description: err?.message || "Unknown", variant: "destructive" });
            return { ...f };
          }
        })
      );

      setFiles(results);
      // success toast
      toast({ title: "Flip Complete", description: `${results.filter(r => r.flippedBlob || r.flippedPreview).length} image(s) flipped.` });
    } finally {
      setGlobalProcessing(false);
    }
  };

  /** -------------------------
   * Auto popup after all processed
   * ------------------------- */
  useEffect(() => {
    if (totalToConvert > 0 && convertedCount === totalToConvert && !toastShown && convertedCount !== 0) {
      setToastShown(true);
      toast({ title: "Flip Complete", description: "Opening download popup..." });
      setTimeout(() => setShowPopup(true), 3000);
    }
  }, [convertedCount, totalToConvert, toastShown, toast]);

  /** -------------------------
   * Download logic (single -> direct, multiple -> zip)
   * ------------------------- */
  const handleDownloadAll = async () => {
    const ready = files.filter((f) => f.flippedBlob);
    if (ready.length === 0) {
      toast({ title: "No images to download", description: "Flip your images first.", variant: "destructive" });
      return;
    }

    if (ready.length === 1) {
      const f = ready[0];
      const url = URL.createObjectURL(f.flippedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = f.file?.name || `flipped-${f.id}.png`;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    await downloadZip(
      ready.map((f) => ({ name: f.file?.name || `flipped-${f.id}.png`, blob: f.flippedBlob })),
      "convertfreely_flipped.zip"
    );
  };

  const anyFlipped = files.some((f) => f.flippedBlob);

  /** -------------------------
   * UI
   * ------------------------- */
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl p-6 border">
      {files.length === 0 ? (
        <FileUploadZone onFileSelect={handleFileSelect} prompt="Choose or drop images to flip" multiple />
      ) : (
        <>
          {/* Add more */}
          <div className="mb-4">
            <FileUploadZone onFileSelect={handleFileSelect} prompt="Add more images" multiple />
          </div>

          {/* Slider preview */}
          <div className="mb-6 mt-4">
            <div className="flex gap-4 overflow-x-auto hide-scrollbar py-2">
              {files.map((f) => (
                <div key={f.id} className="relative bg-white rounded-md shadow-sm overflow-hidden flex-shrink-0 w-40">
                  {/* preview image */}
                  <img src={f.flippedPreview || f.preview} alt={f.file?.name || f.id} className="w-40 h-24 object-cover" />

                  {/* delete */}
                  <button onClick={() => removeFile(f.id)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1">
                    <X className="w-3 h-3" />
                  </button>

                  {/* loading overlay during preview generation or global processing */}
                  {(f.loading || globalProcessing) && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}

                  {/* green check when processed */}
                  {!globalProcessing && f.flippedBlob && (
                    <div className="absolute bottom-1 left-1 bg-white rounded-full p-0.5">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Top controls: Flip buttons (side-by-side, compact on mobile) */}
          <div className="flex justify-center gap-4 mb-4">
            <Button onClick={() => handleFlipToggle("horizontal")} variant="outline" size="lg" className="px-3 py-2 sm:px-4 sm:py-3">
              <FlipHorizontal className="w-5 h-5 mr-2" />
              Flip Horizontal
            </Button>

            <Button onClick={() => handleFlipToggle("vertical")} variant="outline" size="lg" className="px-3 py-2 sm:px-4 sm:py-3">
              <FlipVertical className="w-5 h-5 mr-2" />
              Flip Vertical
            </Button>
          </div>

          {/* Current flip indicator */}
          {(flipState.horizontal || flipState.vertical) && (
            <p className="text-center text-sm text-gray-500 mb-4">
              Current Flip:{" "}
              {flipState.horizontal && "Horizontal "}
              {flipState.horizontal && flipState.vertical && "& "}
              {flipState.vertical && "Vertical"}
            </p>
          )}

          {/* Bottom: Process + Download -desktop side-by-side (50/50), mobile stacked */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={handleProcessFlip}
              disabled={globalProcessing}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              {globalProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
                </>
              ) : (
                `Flip ${files.length} Image(s)`
              )}
            </Button>

            <Button
              onClick={() => setShowPopup(true)}
              disabled={!anyFlipped || globalProcessing}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" /> Download Flipped Image(s)
            </Button>
          </div>
        </>
      )}

      {/* Download popup */}
      <DownloadPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        fileCount={files.filter((f) => f.flippedBlob).length}
        onDownload={handleDownloadAll}
      />
    </motion.div>
  );
};

export default FlipImage;
