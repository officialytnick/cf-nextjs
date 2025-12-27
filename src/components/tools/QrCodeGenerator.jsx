
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download } from 'lucide-react';
import QRCode from 'qrcode';

const QrCodeGenerator = () => {
  const [text, setText] = useState('https://convertfreely.com');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    if (text) {
      QRCode.toDataURL(text, { width: 300, margin: 2 }, (err, url) => {
        if (!err) setQrCodeUrl(url);
      });
    } else {
      setQrCodeUrl('');
    }
  }, [text]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-[#202124] rounded-xl p-6 border border-gray-200 dark:border-gray-800 text-center space-y-6"
    >
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter URL or text"
        className="max-w-lg mx-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
      />
      {qrCodeUrl && (
        <div className="flex flex-col items-center gap-4">
          <img src={qrCodeUrl} alt="Generated QR Code" className="rounded-lg border border-gray-300 dark:border-gray-700" />
          <Button onClick={handleDownload} className="bg-red-500 hover:bg-red-600 text-white">
            <Download className="w-4 h-4 mr-2" /> Download QR Code
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default QrCodeGenerator;
