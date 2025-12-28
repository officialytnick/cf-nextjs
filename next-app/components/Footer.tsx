import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t mt-12 bg-white dark:bg-[#071025]">
      <div className="container mx-auto px-4 py-8 text-sm text-gray-600 flex justify-between items-center">
        <div>© {new Date().getFullYear()} Convert Freely</div>
        <div className="flex gap-4">
          <Link href="/privacy">Privacy</Link>
          <Link href="/cookies">Cookies</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
