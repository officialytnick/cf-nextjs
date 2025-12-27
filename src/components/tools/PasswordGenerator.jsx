
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([16]);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const { toast } = useToast();

  const generatePassword = () => {
    const chars = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>/?',
    };
    let charset = '';
    for (const key in options) {
      if (options[key]) charset += chars[key];
    }
    if (!charset) {
        setPassword('Select at least one option!');
        return;
    }
    let newPassword = '';
    for (let i = 0; i < length[0]; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };
  
  useEffect(generatePassword, [length, options]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast({ title: 'Password copied to clipboard!' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-[#202124] rounded-xl p-6 border border-gray-200 dark:border-gray-800 max-w-lg mx-auto space-y-6">
      <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="font-mono text-xl flex-grow break-all text-gray-800 dark:text-white">{password}</p>
        <Button variant="ghost" size="icon" onClick={copyToClipboard}><Copy className="w-5 h-5 text-gray-500 dark:text-gray-400" /></Button>
        <Button variant="ghost" size="icon" onClick={generatePassword}><RefreshCw className="w-5 h-5 text-gray-500 dark:text-gray-400" /></Button>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
            <Label>Length: {length[0]}</Label>
        </div>
        <Slider value={length} onValueChange={setLength} min={8} max={64} step={1} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.keys(options).map(key => (
            <div key={key} className="flex items-center space-x-2">
                <Checkbox id={key} checked={options[key]} onCheckedChange={(checked) => setOptions(prev => ({...prev, [key]: checked }))} />
                <Label htmlFor={key} className="capitalize">{key}</Label>
            </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PasswordGenerator;
