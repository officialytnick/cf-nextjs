import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Download, X, Combine, Loader2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import FileUploadZone from "@/components/shared/FileUploadZone";
import DownloadPopup from "@/components/shared/DownloadPopup";

import { imagesToPdf, imageToPdf, downloadZip } from "@/lib/imageUtils";
import Sortable from "sortablejs";

const MAX_FILES = 20;

export default function ImageToPDF() {
  const { toast } = useToast();

  const [files, setFiles] = useState([]);
  const [paddingPreset, setPaddingPreset] = useState("none");
  const [mergeAll, setMergeAll] = useState(true);
  const [converting, setConverting] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const paddingMap = { none: 0, small: 10, big: 25 };
  const paddingValue = paddingMap[paddingPreset];

  /** REORDER GRID REF **/
  const gridRef = useRef(null);
  const sortableRef = useRef(null);
  const previewUrlsRef = React.useRef(new Set());

  /* -------------------------------------------------
     ENABLE SORTABLE REORDER (GRID)
  --------------------------------------------------- */
  useEffect(() => {
    if (!gridRef.current) return;

    if (sortableRef.current) {
      sortableRef.current.destroy();
    }

    sortableRef.current = Sortable.create(gridRef.current, {
      animation: 200,
      ghostClass: "opacity-40",
      chosenClass: "opacity-60",
      fallbackOnBody: true,
      swapThreshold: 0.65,
      forceFallback: false,
      handle: ".drag-handle",

      onEnd: (evt) => {
        setFiles((prev) => {
          const arr = [...prev];
          const [moved] = arr.splice(evt.oldIndex, 1);
          arr.splice(evt.newIndex, 0, moved);
          return arr;
        });
      },
    });
  }, [files.length]);

  // If only one (or zero) image is present, disable merge mode and ensure it's unchecked
  useEffect(() => {
    if (files.length <= 1 && mergeAll) {
      setMergeAll(false);
    }
  }, [files.length, mergeAll]);

  /* -------------------------------------------------
        ADD FILES
  --------------------------------------------------- */
  const handleFileSelect = useCallback(
    (selectedFiles) => {
      const incoming = Array.isArray(selectedFiles)
        ? selectedFiles
        : [selectedFiles];

      if (files.length + incoming.length > MAX_FILES) {
        toast({
          title: "Limit reached",
          description: `Maximum ${MAX_FILES} images allowed.`,
          variant: "destructive",
        });
        return;
      }

      const prepared = incoming.map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
        loading: true,
        converted: false,
      }));

      prepared.forEach((p) => previewUrlsRef.current.add(p.preview));

      setFiles((prev) => [
        ...prev.map((f) => ({ ...f, converted: false })),
        ...prepared,
      ]);

      prepared.forEach((entry) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          setFiles((prev) =>
            prev.map((f) => (f.id === entry.id ? { ...f, loading: false } : f))
          );
        };
        img.src = entry.preview;
      });
    },
    [files.length, toast]
  );

  /* -------------------------------------------------
        REMOVE FILE
  --------------------------------------------------- */
  const removeFile = (id) => {
    setFiles((prev) => {
      const found = prev.find((f) => f.id === id);
      if (found) {
        try { URL.revokeObjectURL(found.preview); } catch (e) {}
        previewUrlsRef.current.delete(found.preview);
      }
      return prev
        .filter((x) => x.id !== id)
        .map((f) => ({ ...f, converted: false }));
    });
  };

  /* -------------------------------------------------
        CONVERT
  --------------------------------------------------- */
  const handleConvert = async () => {
    if (files.length === 0) {
      toast({
        title: "No images",
        description: "Upload at least one image.",
        variant: "destructive",
      });
      return;
    }

    // Validate that selected items are valid image files (guard for revoked or invalid entries)
    for (const f of files) {
      if (!f?.file || !(f.file instanceof Blob) || !f.file.type?.startsWith("image/")) {
        toast({
          title: "Invalid image",
          description: "One or more selected items are not valid image files. Please re-add them.",
          variant: "destructive",
        });
        return;
      }
    }

    setConverting(true);

    try {
      if (mergeAll) {
        const result = await imagesToPdf(
          files.map((f) => f.file),
          paddingValue
        );

        // revoke previous merged URL if present
        try {
          if (window.__mergedPdfUrl) {
            URL.revokeObjectURL(window.__mergedPdfUrl);
          }
        } catch (e) {}

        const blobUrl = result instanceof Blob ? URL.createObjectURL(result) : result;
        window.__mergedPdfUrl = blobUrl;

        setFiles((prev) => prev.map((f) => ({ ...f, converted: true })));

        setTimeout(() => setPopupOpen(true), 800);
      } else {
        const pdfList = await Promise.all(
          files.map(async (f) => {
            const blob = await imageToPdf(f.file, paddingValue);
            const base = f.file.name.replace(/\.[^.]+$/, "");
            return { name: `${base}.pdf`, blob };
          })
        );

        // Store generated PDFs and open popup; do NOT auto-download
        setGeneratedPdfs(pdfList);
        setFiles((prev) => prev.map((f) => ({ ...f, converted: true })));

        setTimeout(() => setPopupOpen(true), 800);
      }

      toast({
        title: "PDFs ready!",
        description: mergeAll ? "Merged PDF created." : "PDFs generated. Open download popup to save them.",
      });
    } catch (err) {
      console.error("ImageToPDF conversion error:", err);
      toast({
        title: "Conversion failed",
        description: err?.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setConverting(false);
    }
  };

  /* -------------------------------------------------
        DOWNLOAD MERGED PDF
  --------------------------------------------------- */
  const downloadMerged = () => {
    const url = window.__mergedPdfUrl;
    if (!url) return;

    const a = document.createElement("a");
    a.href = url;
    a.download = "convertfreely.pdf";
    a.click();
  };

  const [generatedPdfs, setGeneratedPdfs] = useState([]);

  const handleDownloadGeneratedPdfs = async () => {
    if (!generatedPdfs || !generatedPdfs.length) return;

    if (generatedPdfs.length === 1) {
      const f = generatedPdfs[0];
      const url = URL.createObjectURL(f.blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = f.name;
      a.click();
      setTimeout(() => { try { URL.revokeObjectURL(url); } catch (e) {} }, 1500);
    } else {
      await downloadZip(generatedPdfs, "convertfreely_imgtopdf.zip");
    }

    // cleanup state and close popup
    setGeneratedPdfs([]);
    setPopupOpen(false);
  };

  // cleanup previews and merged URL on unmount
  useEffect(() => {
    return () => {
      for (const url of previewUrlsRef.current) {
        try { URL.revokeObjectURL(url); } catch (e) {}
      }
      previewUrlsRef.current.clear();

      try {
        if (window.__mergedPdfUrl) {
          URL.revokeObjectURL(window.__mergedPdfUrl);
          window.__mergedPdfUrl = null;
        }
      } catch (e) {}
    };
  }, []);

  const allConverted = files.length > 0 && files.every((f) => f.converted === true);
  const downloadDisabled =
    converting || !allConverted || (mergeAll && !window.__mergedPdfUrl);

  /* -------------------------------------------------
        UI
  --------------------------------------------------- */
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl p-6 border border-gray-200"
      >
        {/* Upload First */}
        {files.length === 0 && (
          <FileUploadZone
            onFileSelect={handleFileSelect}
            prompt="Choose images"
            multiple
          />
        )}

        {/* Add More */}
        {files.length > 0 && (
          <div className="mb-4">
            <FileUploadZone
              onFileSelect={handleFileSelect}
              prompt="Add more images"
              multiple
            />
          </div>
        )}

        {/* REORDER GRID */}
        {files.length > 0 && (
          <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {files.map((f) => (
              <div
                key={f.id}
                className="relative bg-white rounded-md shadow-sm overflow-hidden cursor-grab active:cursor-grabbing"
              >
                {/* Drag handle */}
                <div className="drag-handle absolute inset-0 z-0"></div>

                <img src={f.preview} className="w-full h-28 object-cover pointer-events-none" />

                {/* Remove */}
                <button
                  onClick={() => removeFile(f.id)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 z-20"
                >
                  <X className="w-3 h-3" />
                </button>

                {/* Loading */}
                {f.loading && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}

                {/* Checkmark */}
                {!f.loading && f.converted && (
                  <div className="absolute bottom-1 left-1 bg-white rounded-full p-0.5 z-20">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Margin Options */}
        {files.length > 0 && (
          <div className="mb-6">
            <Label className="block mb-2 font-medium">Margin</Label>

            <div className="flex gap-4">
              {["none", "small", "big"].map((key) => (
                <button
                  key={key}
                  onClick={() => setPaddingPreset(key)}
                  className={`p-4 rounded-lg w-28 text-center shadow-sm transition ${
                    paddingPreset === key
                      ? "border-2 border-red-500 bg-red-50 text-red-600"
                      : "bg-gray-50 text-gray-600"
                  }`}
                >
                  {key === "none" ? "No" : key} margin
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Merge Checkbox */}
        {files.length > 0 && (
          <div className="flex items-center gap-2 mb-6">
            <input
              type="checkbox"
              checked={mergeAll}
              onChange={(e) => setMergeAll(e.target.checked)}
              className="h-4 w-4"
              disabled={files.length <= 1}
              title={files.length <= 1 ? "Requires at least two images" : "Merge all into one PDF"}
            />
            <span className="text-sm text-gray-700 flex items-center">
              Merge all into one PDF
              {files.length <= 1 && (
                <span className="ml-2 text-xs text-gray-400">(requires 2+ images)</span>
              )}
            </span>
          </div>
        )}

        {/* Buttons */}
        {files.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4">
            <Button
              onClick={handleConvert}
              disabled={converting}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              {converting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Combine className="w-4 h-4 mr-2" />
              )}
              {converting ? "Converting..." : "Convert"}
            </Button>

            <Button
              onClick={mergeAll ? downloadMerged : (generatedPdfs.length ? handleDownloadGeneratedPdfs : undefined)}
              disabled={downloadDisabled}
              className={`w-full text-white ${
                downloadDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        )}
      </motion.div>

      {/* Popup */}
      <DownloadPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        fileCount={generatedPdfs.length || files.filter((f) => f.converted).length}
        onDownload={mergeAll ? downloadMerged : handleDownloadGeneratedPdfs}
        toolId="image-to-pdf"
      />
    </>
  );
}
