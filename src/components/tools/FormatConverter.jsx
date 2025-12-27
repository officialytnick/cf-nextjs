import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import FileUploadZone from "@/components/shared/FileUploadZone";
import FormatSelector from "@/components/shared/FormatSelector";
import DownloadPopup from "@/components/shared/DownloadPopup";

import { convertImageFormat, downloadZip } from "@/lib/imageUtils";

const MAX_FILES = 20;

const TOOL_RULES = {
  "png-to-jpg": { input: ["png"], output: "jpg", userSelect: false },
  "jpg-to-png": { input: ["jpg", "jpeg"], output: "png", userSelect: false },
  "png-to-webp": { input: ["png"], output: "webp", userSelect: false },
  "webp-to-png": { input: ["webp"], output: "png", userSelect: false },
  "jpg-to-webp": { input: ["jpg", "jpeg"], output: "webp", userSelect: false },
  "webp-to-jpg": { input: ["webp"], output: "jpg", userSelect: false },

  "image-converter": {
    input: ["png", "jpg", "jpeg", "webp"],
    output: null,
    userSelect: true,
  },
};

const FormatConverter = ({ tool }) => {
  const { toast } = useToast();
  const rule = TOOL_RULES[tool.id] || TOOL_RULES["image-converter"];
  const acceptString = rule.input.map((e) => "." + e).join(",");

  const [files, setFiles] = useState([]);
  const [outputFormat, setOutputFormat] = useState(
    rule.userSelect ? "webp" : rule.output
  );
  const [showPopup, setShowPopup] = useState(false);

  const [convertedCount, setConvertedCount] = useState(0);
  const [totalToConvert, setTotalToConvert] = useState(0);
  const [toastShown, setToastShown] = useState(false);

  const getExt = (name = "") =>
    name.includes(".") ? name.split(".").pop().toLowerCase() : "";

  /** Reset converted files when format changes */
  useEffect(() => {
    if (rule.userSelect) {
      setFiles((prev) => prev.map((f) => ({ ...f, convertedBlob: null })));
    }
  }, [outputFormat, rule.userSelect]);

  /** Show popup when conversion finished */
  useEffect(() => {
    if (
      totalToConvert > 0 &&
      convertedCount === totalToConvert &&
      !toastShown &&
      convertedCount !== 0
    ) {
      setToastShown(true);

      toast({
        title: "Conversion Complete",
        description: "Opening download popup...",
      });

      setTimeout(() => setShowPopup(true), 2000);
    }
  }, [convertedCount, totalToConvert, toastShown, toast]);

  /** Handle File Upload (NO auto convert now) */
  const handleFileSelect = useCallback(
    async (selected) => {
      const incoming = Array.isArray(selected) ? selected : [selected];

      if (files.length + incoming.length > MAX_FILES) {
        return toast({
          title: "Maximum reached",
          description: `You can upload up to ${MAX_FILES} images.`,
          variant: "destructive",
        });
      }

      setConvertedCount(0);
      setToastShown(false);

      for (const file of incoming) {
        const ext = getExt(file.name);
        if (!rule.input.includes(ext)) {
          toast({
            title: "Invalid file type",
            description: `Accepted: ${rule.input.join(", ").toUpperCase()}`,
            variant: "destructive",
          });
          continue;
        }

        const id =
          Date.now().toString(36) + Math.random().toString(36).slice(2);

        const newEntry = {
          id,
          file,
          preview: URL.createObjectURL(file),
          convertedBlob: null,
          loading: false, // NO auto loading
        };

        setFiles((prev) => [...prev, newEntry]);
      }
    },
    [files.length, rule, toast]
  );

  /** Convert only when user clicks */
  const handleManualConvert = async () => {
    if (files.length === 0)
      return toast({
        title: "No images",
        description: "Please upload images first.",
        variant: "destructive",
      });

    const out = rule.userSelect ? outputFormat : rule.output;

    setConvertedCount(0);
    setToastShown(false);
    setTotalToConvert(files.length);

    setFiles((prev) =>
      prev.map((f) => ({ ...f, loading: true, convertedBlob: null }))
    );

    const updated = await Promise.all(
      files.map(async (f) => {
        try {
          const res = await convertImageFormat(f.file, out);
          setConvertedCount((c) => c + 1);
          return { ...f, convertedBlob: res.blob, loading: false };
        } catch (err) {
          toast({
            title: "Conversion failed",
            description: err?.message,
            variant: "destructive",
          });
          setConvertedCount((c) => c + 1);
          return { ...f, loading: false };
        }
      })
    );

    setFiles(updated);
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const found = prev.find((f) => f.id === id);
      if (found) URL.revokeObjectURL(found.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleDownloadAll = async () => {
    const ready = files.filter((f) => f.convertedBlob);
    if (!ready.length) return;

    const ext = rule.userSelect ? outputFormat : rule.output;

    if (ready.length === 1) {
      const f = ready[0];
      const base = f.file.name.replace(/\.[^.]+$/, "");
      const filename = `${base}.${ext}`;
      const url = URL.createObjectURL(f.convertedBlob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    await downloadZip(
      ready.map((f) => ({
        name: f.file.name.replace(/\.[^.]+$/, `.${ext}`),
        blob: f.convertedBlob,
      })),
      "convertfreely.zip"
    );
  };

  const convertDisabled = () => {
    if (files.length === 0) return true;
    return files.some((f) => f.loading);
  };

  const anyConverted = files.some((f) => f.convertedBlob);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl p-6 border border-gray-200">
      <FileUploadZone
        onFileSelect={handleFileSelect}
        accept={acceptString}
        prompt={files.length === 0 ? "Choose or drop images" : "Add more images"}
        multiple
      />

      {files.length > 0 && (
        <div className="mb-6 mt-4">
          <div className="flex gap-4 overflow-x-auto py-2 hide-scrollbar">
            {files.map((f) => (
              <div key={f.id} className="relative bg-white rounded-md shadow-sm overflow-hidden">
                <img src={f.preview} alt={f.file.name} className="w-40 h-24 object-cover" />

                <button
                  onClick={() => removeFile(f.id)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                >
                  <X className="w-3 h-3" />
                </button>

                {f.loading && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}

                {!f.loading && f.convertedBlob && (
                  <div className="absolute bottom-1 left-1 bg-white rounded-full p-0.5">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 md:flex md:items-end md:justify-between gap-6">
        <div className="md:flex-1">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Convert Settings</h3>

          {rule.userSelect ? (
            <FormatSelector value={outputFormat} onChange={setOutputFormat} />
          ) : (
            <div className="px-4 py-3 border rounded-md bg-gray-50 text-sm">
              Output format: <strong>{rule.output.toUpperCase()}</strong>
            </div>
          )}
        </div>

        <div className="mt-4 md:mt-0 md:w-1/3 space-y-3">
          <Button
            onClick={handleManualConvert}
            disabled={convertDisabled()}
            size="lg"
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            Convert {files.length} Image{files.length > 1 ? "s" : ""}
          </Button>

          <Button
            onClick={() => setShowPopup(true)}
            disabled={!anyConverted}
            size="lg"
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Converted Images
          </Button>
        </div>
      </div>

      <DownloadPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        fileCount={files.filter((f) => f.convertedBlob).length}
        onDownload={handleDownloadAll}
      />
    </motion.div>
  );
};

export default FormatConverter;