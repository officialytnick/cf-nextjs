import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Pipette, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import FileUploadZone from '@/components/shared/FileUploadZone';

const ColorPicker = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [pickedColor, setPickedColor] = useState(null);
  const [hoverColor, setHoverColor] = useState(null);
  const canvasRef = useRef(null);
  const { toast } = useToast();

  const handleFileSelect = useCallback((file) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    img.src = url;
  }, []);

  // 🟢 LIVE HOVER COLOR PREVIEW
  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    try {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
      const hex = `#${pixel[0].toString(16).padStart(2, '0')}${pixel[1]
        .toString(16)
        .padStart(2, '0')}${pixel[2].toString(16).padStart(2, '0')}`;
      setHoverColor({ rgb, hex });
    } catch (err) {
      setHoverColor(null);
    }
  };

  const handleCanvasMouseLeave = () => {
    setHoverColor(null); // clear when mouse leaves image
  };

  // 🟢 FINAL SELECTED COLOR (on click)
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    try {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
      const hex = `#${pixel[0].toString(16).padStart(2, '0')}${pixel[1]
        .toString(16)
        .padStart(2, '0')}${pixel[2].toString(16).padStart(2, '0')}`;
      setPickedColor({ rgb, hex });
    } catch (err) {
      console.error('Error picking color:', err);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!', description: text });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-[#202124] rounded-xl p-6 border border-gray-200 dark:border-gray-800"
    >
      {!selectedFile ? (
        <FileUploadZone
          onFileSelect={handleFileSelect}
          prompt="Choose or drop an image to pick colors"
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-6 items-start relative">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Hover or click image to pick a color
            </h3>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 cursor-crosshair"
            >
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                onMouseMove={handleCanvasMouseMove}
                onMouseLeave={handleCanvasMouseLeave}
                className="w-full h-auto block"
              />

              {/* 🟢 Floating hover preview box */}
              {hoverColor && (
                <div
                  className="absolute top-2 left-2 flex items-center gap-2 px-3 py-1 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-black/50 backdrop-blur-sm"
                >
                  <div
                    className="w-5 h-5 rounded border border-gray-300"
                    style={{ backgroundColor: hoverColor.hex }}
                  ></div>
                  <p className="font-mono text-sm text-gray-700 dark:text-gray-200">
                    {hoverColor.hex.toUpperCase()}
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          <div className="sticky top-24">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Picked Color
            </h3>
            {pickedColor ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-lg border border-gray-300"
                    style={{ backgroundColor: pickedColor.hex }}
                  ></div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-mono text-lg text-gray-800 dark:text-white">
                        {pickedColor.hex.toUpperCase()}
                      </p>
                      <Copy
                        className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer"
                        onClick={() => copyToClipboard(pickedColor.hex)}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                        {pickedColor.rgb}
                      </p>
                      <Copy
                        className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer"
                        onClick={() => copyToClipboard(pickedColor.rgb)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <Pipette className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-gray-500">Your picked color will appear here</p>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ColorPicker;
