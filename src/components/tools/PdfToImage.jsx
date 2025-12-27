// src/components/tools/PdfToImage.jsx
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Trash2, ZoomIn, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import FileUploadZone from "@/components/shared/FileUploadZone";
import DownloadPopup from "@/components/shared/DownloadPopup";

import { pdfThumbnails, pdfToImages, downloadZip } from "@/lib/imageUtils";

const ChangePdfButton = ({ onFileSelect }) => {
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
    e.target.value = "";
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFile}
      />

      <Button
        onClick={() => inputRef.current?.click()}
        className="bg-red-500 hover:bg-red-600 text-white px-6"
      >
        Change PDF
      </Button>
    </div>
  );
};

const PdfToImage = () => {
  const [pdf, setPdf] = useState(null);
  const [thumbs, setThumbs] = useState([]);
  const [keptPages, setKeptPages] = useState(new Set());

  const [outputFormat, setOutputFormat] = useState("png");
  const [processing, setProcessing] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);

  const [loadingPdf, setLoadingPdf] = useState(false); // 👈 NEW

  const [showPopup, setShowPopup] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (file) => {
    try {
      setLoadingPdf(true); // 👈 START loading screen

      const t = await pdfThumbnails(file, { thumbScale: 0.35 });

      setPdf(file);
      setThumbs(t);
      setKeptPages(new Set(t.map((x) => x.pageNumber)));
    } catch (err) {
      toast({
        title: "Cannot load PDF",
        description: "Failed to render PDF preview.",
        variant: "destructive",
      });
    }

    setLoadingPdf(false); // 👈 END loading
  };

  const handleChangePDF = handleUpload;

  const deletePage = (page) => {
    setKeptPages((prev) => {
      const next = new Set(prev);
      next.delete(page);
      return next;
    });

    setThumbs((prev) => prev.filter((t) => t.pageNumber !== page));
  };

  const convertPDF = async () => {
    if (!pdf) return;

    setProcessing(true);

    try {
      if (keptPages.size === 0) {
        toast({
          title: "No pages left",
          description: "You removed all pages. Upload PDF again.",
          variant: "destructive",
        });
        setProcessing(false);
        return;
      }

      const pages = await pdfToImages(pdf, {
        outputFormat,
        onlyPages: Array.from(keptPages),
      });

      if (!pages.length) {
        toast({
          title: "No pages selected",
          description: "You must keep at least 1 page.",
          variant: "destructive",
        });
        setProcessing(false);
        return;
      }

      window.__pdfToImageResults = pages;
      setShowPopup(true);
    } catch (err) {
      toast({
        title: "Conversion Error",
        description: err.message || "Failed to convert PDF.",
        variant: "destructive",
      });
    }

    setProcessing(false);
  };

  const handleDownload = async () => {
    const files = window.__pdfToImageResults || [];
    if (!files.length) return;

    if (files.length === 1) {
      const f = files[0];
      const url = URL.createObjectURL(f.blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = f.name;
      a.click();
      URL.revokeObjectURL(url);
      setShowPopup(false);
      return;
    }

    await downloadZip(files, "convertfreely_pdftoimage.zip");
    setShowPopup(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

      {/* --------------------------------------------------- */}
      {/* Step 1: Upload or Loading Screen */}
      {/* --------------------------------------------------- */}
      {!pdf && !loadingPdf && (
        <div className="bg-white rounded-2xl p-10 shadow-sm">
          <div className="max-w-4xl mx-auto">
            <FileUploadZone
              onFileSelect={handleUpload}
              multiple={false}
              accept=".pdf"
              prompt="Choose or drop PDF"
            />
          </div>
        </div>
      )}

      {/* --------------------------------------------------- */}
      {/* 🚀 Loading State (NEW) */}
      {/* --------------------------------------------------- */}
      {loadingPdf && (
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-red-500 animate-spin" />
          <p className="text-gray-700 font-medium text-lg">
            Uploading PDF... Please wait
          </p>
        </div>
      )}

      {/* --------------------------------------------------- */}
      {/* Step 2: Main Tool (after loading) */}
      {/* --------------------------------------------------- */}
      {pdf && !loadingPdf && (
        <>
          {/* Header */}
          <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between gap-4">
            <div>
              <div className="text-lg font-semibold">{pdf.name}</div>
              <div className="text-sm text-muted-foreground">{thumbs.length} page(s)</div>
            </div>

            <ChangePdfButton onFileSelect={handleChangePDF} />
          </div>

          {/* Page Grid */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {thumbs.map((t) => (
                <div key={t.pageNumber} className="relative border rounded overflow-hidden">
                  <img
                    src={t.dataUrl}
                    className="w-full h-28 object-cover cursor-pointer"
                    onClick={() => setZoomImage(t.dataUrl)}
                  />

                  <div className="absolute top-1 right-1 flex gap-1">
                    {thumbs.length > 1 && (
                      <button
                        onClick={() => deletePage(t.pageNumber)}
                        className="bg-white p-1 rounded shadow"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    )}
                    <button
                      onClick={() => setZoomImage(t.dataUrl)}
                      className="bg-white p-1 rounded shadow"
                    >
                      <ZoomIn className="h-4 w-4 text-gray-800" />
                    </button>
                  </div>

                  <div className="p-1 text-xs text-center">{t.pageNumber}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Convert Button */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6 md:items-end">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Output Format</label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  className="border rounded-lg px-3 py-2 w-full"
                >
                  <option value="png">PNG (High Quality)</option>
                  <option value="jpg">JPG (Universal)</option>
                </select>
              </div>

              <Button
                onClick={convertPDF}
                disabled={processing}
                className="bg-red-500 hover:bg-red-600 w-full md:w-1/3 text-white"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Converting...
                  </>
                ) : (
                  `Convert to ${outputFormat.toUpperCase()}`
                )}
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Download Popup */}
      <DownloadPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        fileCount={(window.__pdfToImageResults || []).length}
        onDownload={handleDownload}
      />

      {/* Zoom Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="bg-white p-4 rounded max-w-4xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={zoomImage} className="w-full rounded" />
            <div className="text-right mt-2">
              <Button onClick={() => setZoomImage(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PdfToImage;
