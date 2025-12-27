import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import FileUploadZone from "@/components/shared/FileUploadZone";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const BulkFileRename = ({ tool = { title: "Bulk File Rename" } }) => {
  const [files, setFiles] = useState([]);
  const { toast } = useToast();

  const [renameMode, setRenameMode] = useState("custom");
  const [autoPattern, setAutoPattern] = useState("original-counter");
  const [customPrefix, setCustomPrefix] = useState("");
  const [counterStart, setCounterStart] = useState(1);

  const handleFileSelect = useCallback((selectedFiles) => {
    const newFiles = Array.isArray(selectedFiles)
      ? selectedFiles
      : [selectedFiles];

    const processedFiles = newFiles.map((file) => ({
      file,
      id: Date.now() + Math.random(),
      preview: URL.createObjectURL(file),
      newName: file.name,
    }));

    setFiles((prev) => [...prev, ...processedFiles]);
  }, []);

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const generateNewName = (fileWrapper, index) => {
    const original = fileWrapper.file.name;
    const ext = original.includes(".")
      ? original.split(".").pop()
      : "";
    const base = ext ? original.replace(/\.[^/.]+$/, "") : original;

    const counter = counterStart + index;

    if (renameMode === "auto") {
      switch (autoPattern) {
        case "original-counter":
          return `${base}-${counter}.${ext}`;
        case "file-counter":
          return `file-${counter}.${ext}`;
        case "counter":
          return `${counter}.${ext}`;
        case "date-counter":
          return `${new Date().toISOString().split("T")[0]}-${counter}.${ext}`;
        default:
          return `${base}-${counter}.${ext}`;
      }
    }

    // CUSTOM MODE
    const prefix =
      customPrefix.trim() !== "" ? customPrefix.trim() : "file";

    return `${prefix}-${counter}.${ext}`;
  };

  const updatePreviewNames = useCallback(() => {
    setFiles((prev) =>
      prev.map((file, i) => ({
        ...file,
        newName: generateNewName(file, i),
      }))
    );
  }, [renameMode, autoPattern, customPrefix, counterStart]);

  useEffect(() => {
    updatePreviewNames();
  }, [files.length, renameMode, autoPattern, customPrefix, counterStart]);

  const handleDownload = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Upload files to rename.",
        variant: "destructive",
      });
      return;
    }

    const zip = new JSZip();

    files.forEach((f, index) => {
      const newName = generateNewName(f, index);
      zip.file(newName, f.file);
    });

    try {
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, "convert_freely_renamed_files.zip");
      toast({
        title: "🎉 Download ready!",
        description: "Renamed files downloading as ZIP.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "ZIP Error",
        description: "Could not generate ZIP file.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-[#202124] rounded-xl p-6 border border-gray-200 dark:border-gray-800"
    >
      {files.length === 0 ? (
        <FileUploadZone
          onFileSelect={handleFileSelect}
          prompt="Choose or drop files to rename"
          multiple
          accept="*/*"
        />
      ) : (
        <>
          {/* Add More */}
          <div className="mb-6">
            <FileUploadZone
              onFileSelect={handleFileSelect}
              prompt="Add more files"
              multiple
              accept="*/*"
            />
          </div>

          {/* File Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {files.map((f) => (
              <div
                key={f.id}
                className="relative p-4 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
              >
                {/* ORIGINAL NAME */}
                <p className="text-sm text-gray-700 dark:text-gray-200 font-medium break-all max-w-full">
                  {f.file.name}
                </p>

                {/* NEW NAME */}
                <p className="text-xs mt-2 text-green-600 dark:text-green-400 break-all max-w-full">
                  New: {f.newName}
                </p>

                <button
                  onClick={() => removeFile(f.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Rename Controls */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Rename Options
              </h3>

              <div className="space-y-4">
                {/* Mode */}
                <div>
                  <label className="font-medium text-gray-700 dark:text-gray-300">
                    Mode:
                  </label>
                  <select
                    className="w-full mt-2 p-2 rounded border"
                    value={renameMode}
                    onChange={(e) => setRenameMode(e.target.value)}
                  >
                    <option value="auto">Automatic</option>
                    <option value="custom">Custom Prefix</option>
                  </select>
                </div>

                {/* Auto Mode Options */}
                {renameMode === "auto" && (
                  <>
                    <label className="font-medium">Pattern:</label>
                    <select
                      className="w-full mt-2 p-2 rounded border"
                      value={autoPattern}
                      onChange={(e) =>
                        setAutoPattern(e.target.value)
                      }
                    >
                      <option value="original-counter">
                        original-name + counter
                      </option>
                      <option value="file-counter">
                        file + counter
                      </option>
                      <option value="counter">counter only</option>
                      <option value="date-counter">
                        date + counter
                      </option>
                    </select>
                  </>
                )}

                {/* Custom Prefix */}
                {renameMode === "custom" && (
                  <div>
                    <label className="font-medium">Custom Prefix</label>
                    <input
                      type="text"
                      className="w-full mt-2 p-2 rounded border"
                      placeholder="Example: holiday"
                      value={customPrefix}
                      onChange={(e) => setCustomPrefix(e.target.value)}
                    />
                  </div>
                )}

                {/* Counter */}
                <div>
                  <label className="font-medium">Start Counter</label>
                  <input
                    type="number"
                    className="w-full mt-2 p-2 rounded border"
                    min="0"
                    value={counterStart}
                    onChange={(e) =>
                      setCounterStart(Number(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="self-end space-y-4">
              <Button
                onClick={handleDownload}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Renamed Files (ZIP)
              </Button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default BulkFileRename;
