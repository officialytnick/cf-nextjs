"use client";

import React from 'react';

export default function PlaceholderTool({ title = 'Placeholder' }: { title?: string }) {
  const [msg, setMsg] = React.useState<string | null>(null);

  function notify() {
    setMsg('Requested');
    setTimeout(() => setMsg(null), 1500);
  }

  return (
    <div className="bg-white dark:bg-[#202124] rounded-xl p-8 border border-gray-200 dark:border-gray-800 text-center">
      <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
        <h2 className="text-2xl font-bold mb-2">Coming Soon!</h2>
        <p className="text-gray-500 mb-6 max-w-md">The "{title}" tool is currently under development.</p>
        <button onClick={notify} className="bg-yellow-500 px-4 py-2 rounded">Notify Me</button>
        {msg && <div role="status" className="mt-4 text-sm">{msg}</div>}
      </div>
    </div>
  );
}
