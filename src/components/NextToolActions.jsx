import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getRelatedTools } from "@/lib/toolRelations";

/**
 * Small horizontal bar that appears directly under the active tool.
 * It suggests the most common next actions (e.g. Compress, Convert, etc.).
 */
const NextToolActions = ({ tool }) => {
  if (!tool) return null;

  const related = getRelatedTools(tool);
  if (!related.length) return null;

  return (
    <section className="mb-8 mt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
          Continue with another tool
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Finished with <span className="font-medium">{tool.title}</span>? Try one of these next:
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {related.map((t) => (
          <Link
            key={t.id}
            to={`/${t.id}`}
            className="inline-flex items-center px-3 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#202124] hover:bg-red-50 hover:border-red-400 dark:hover:border-red-400 transition text-sm text-gray-800 dark:text-gray-100"
          >
            <span className="font-medium mr-1">{t.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NextToolActions;
