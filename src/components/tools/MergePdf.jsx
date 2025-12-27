import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Download,
  FileText,
  X,
  GripVertical,
  Combine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { mergePdfs } from "@/lib/imageUtils";
import DownloadPopup from "@/components/shared/DownloadPopup";

// Sortable libs
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* -------------------------------
    Sortable Item Component
------------------------------- */
const SortableItem = ({ f, removeFile }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: f.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <button {...attributes} {...listeners} className="cursor-grab">
        <GripVertical className="text-gray-500" />
      </button>

      <FileText className="w-6 h-6 text-red-500" />

      <p className="flex-1 text-sm font-medium truncate text-gray-800 dark:text-gray-200">
        {f.file.name}
      </p>

      <button
        onClick={() => removeFile(f.id)}
        className="text-gray-400 hover:text-red-500 shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

/* -------------------------------
        MAIN COMPONENT
------------------------------- */
const MergePdf = () => {
  const [files, setFiles] = useState([]);
  const [converting, setConverting] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const mergedUrlRef = React.useRef(null);

  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  /* ---------------------------------------
      ADD FILES
  --------------------------------------- */
  const handleFileSelect = useCallback(
    (e) => {
      const pdfFiles = Array.from(e.target.files).filter(
        (f) => f.type === "application/pdf"
      );
      if (!pdfFiles.length) {
        toast({
          title: "Invalid file",
          description: "Only PDF files are allowed.",
          variant: "destructive",
        });
        return;
      }

      setFiles((prev) => [
        ...prev,
        ...pdfFiles.map((f) => ({
          file: f,
          id: crypto.randomUUID(),
        })),
      ]);
    },
    [toast]
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const pdfFiles = Array.from(e.dataTransfer.files).filter(
        (f) => f.type === "application/pdf"
      );

      if (!pdfFiles.length) {
        toast({
          title: "Invalid file",
          description: "Only PDF files are allowed.",
          variant: "destructive",
        });
        return;
      }

      setFiles((prev) => [
        ...prev,
        ...pdfFiles.map((f) => ({
          file: f,
          id: crypto.randomUUID(),
        })),
      ]);
    },
    [toast]
  );

  /* ---------------------------------------
      REMOVE
  --------------------------------------- */
  const removeFile = (id) =>
    setFiles((prev) => prev.filter((f) => f.id !== id));

  /* ---------------------------------------
      SORT HANDLING
  --------------------------------------- */
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = files.findIndex((x) => x.id === active.id);
    const newIndex = files.findIndex((x) => x.id === over.id);

    setFiles((prev) => arrayMove(prev, oldIndex, newIndex));
  };

  /* ---------------------------------------
      MERGE PDFs
  --------------------------------------- */
  const handleMerge = async () => {
    if (files.length < 2) {
      toast({
        title: "Add more PDFs",
        description: "Need at least 2 PDFs to merge.",
        variant: "destructive",
      });
      return;
    }

    setConverting(true);
    try {
      const url = await mergePdfs(files.map((f) => f.file));
      mergedUrlRef.current = url;

      setTimeout(() => setPopupOpen(true), 600);

      toast({
        title: "Merged successfully!",
        description: `Combined ${files.length} PDFs.`,
      });
    } catch (err) {
      toast({
        title: "Merge failed",
        description: err?.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setConverting(false);
    }
  };

  /* ---------------------------------------
      DOWNLOAD
  --------------------------------------- */
  const handleDownload = () => {
    const url = mergedUrlRef.current;
    if (!url) return;

    const a = document.createElement("a");
    a.href = url;
    a.download = "convertfreely_merged_pdf.pdf";
    a.click();
  };

  /* ---------------------------------------
      UI
  --------------------------------------- */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl p-6 border border-gray-200"
    >
      {/* Upload Zone */}
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg text-center mb-6"
      >
        <input
          type="file"
          id="pdf-upload"
          className="hidden"
          accept="application/pdf"
          multiple
          onChange={handleFileSelect}
        />
        <FileText className="w-16 h-16 text-red-500 mb-4" />
        <label htmlFor="pdf-upload">
          <Button asChild size="lg" className="bg-red-500 text-white">
            <span>Choose PDFs</span>
          </Button>
        </label>
        <p className="mt-3 text-gray-500">or drop PDF files here</p>
      </div>

      {/* PDF List */}
      {files.length > 0 && (
        <>
          <h3 className="font-semibold mb-3 text-lg">
            PDFs ({files.length})
          </h3>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={files.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3 mb-6">
                {files.map((f) => (
                  <SortableItem
                    key={f.id}
                    f={f}
                    removeFile={removeFile}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {/* Merge Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleMerge}
              disabled={converting}
              size="lg"
              className="w-full md:w-1/2 bg-red-500 hover:bg-red-600 text-white"
            >
              {converting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2 animate-spin" />
              ) : (
                <Combine className="w-4 h-4 mr-2" />
              )}
              {converting ? "Merging..." : `Merge ${files.length} PDFs`}
            </Button>
          </div>
        </>
      )}

      {/* Popup */}
      <DownloadPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        fileCount={1}
        onDownload={handleDownload}
      />
    </motion.div>
  );
};

export default MergePdf;
