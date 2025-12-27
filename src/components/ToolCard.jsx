
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as icons from 'lucide-react';

const ToolCard = ({ id, title, description, icon, color, isNew }) => {
  const IconComponent = icons[icon] || icons['Wrench'];

  // Explicitly map colors for Tailwind JIT to pick up
  const bgColorClass = {
    blue: 'bg-blue-100 dark:bg-blue-900/50',
    green: 'bg-green-100 dark:bg-green-900/50',
    purple: 'bg-purple-100 dark:bg-purple-900/50',
    indigo: 'bg-indigo-100 dark:bg-indigo-900/50',
    red: 'bg-red-100 dark:bg-red-900/50',
    pink: 'bg-pink-100 dark:bg-pink-900/50',
    cyan: 'bg-cyan-100 dark:bg-cyan-900/50',
    orange: 'bg-orange-100 dark:bg-orange-900/50',
    teal: 'bg-teal-100 dark:bg-teal-900/50',
  }[color] || 'bg-gray-100 dark:bg-gray-700';

  const textColorClass = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    indigo: 'text-indigo-600 dark:text-indigo-400',
    red: 'text-red-600 dark:text-red-400',
    pink: 'text-pink-600 dark:text-pink-400',
    cyan: 'text-cyan-600 dark:text-cyan-400',
    orange: 'text-orange-600 dark:text-orange-400',
    teal: 'text-teal-600 dark:text-teal-400',
  }[color] || 'text-gray-600 dark:text-gray-400';

  const borderColorClass = {
    blue: 'hover:border-blue-500 dark:hover:border-blue-400',
    green: 'hover:border-green-500 dark:hover:border-green-400',
    purple: 'hover:border-purple-500 dark:hover:border-purple-400',
    indigo: 'hover:border-indigo-500 dark:hover:border-indigo-400',
    red: 'hover:border-red-500 dark:hover:border-red-400',
    pink: 'hover:border-pink-500 dark:hover:border-pink-400',
    cyan: 'hover:border-cyan-500 dark:hover:border-cyan-400',
    orange: 'hover:border-orange-500 dark:hover:border-orange-400',
    teal: 'hover:border-teal-500 dark:hover:border-teal-400',
  }[color] || 'hover:border-gray-500 dark:hover:border-gray-400';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <Link to={`/${id}`} className={`group block h-full rounded-lg bg-white dark:bg-[#202124] p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-transparent ${borderColorClass}`}>
        <div className="flex items-center gap-4 mb-3">
          {IconComponent && (
            <div className={`p-3 rounded-md ${bgColorClass}`}>
              <IconComponent className={`w-6 h-6 ${textColorClass}`} />
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-left">{title}</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-left">{description}</p>
        {isNew && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            New!
          </div>
        )}
      </Link>
    </motion.div>
  );
};

export default ToolCard;
