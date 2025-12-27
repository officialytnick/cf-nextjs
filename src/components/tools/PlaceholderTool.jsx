import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Construction } from 'lucide-react';

const PlaceholderTool = ({ tool }) => {
  const { toast } = useToast();

  const notify = () => {
    toast({
      title: `🚧 ${tool.title} is on the way!`,
      description: "This feature isn't implemented yet-but I can build it for you in the next step! 🚀",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-[#202124] rounded-xl p-8 border border-gray-200 dark:border-gray-800 text-center"
    >
      <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
        <Construction className="w-16 h-16 text-yellow-500 mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Coming Soon!</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
          The "{tool.title}" tool is currently under development. You can request this feature in your next prompt!
        </p>
        <Button onClick={notify} size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
          Notify Me (Request Feature)
        </Button>
      </div>
    </motion.div>
  );
};

export default PlaceholderTool;