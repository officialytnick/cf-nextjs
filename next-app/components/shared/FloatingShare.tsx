"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { FaFacebookF, FaWhatsapp, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa';
import { SiX } from 'react-icons/si';

export default function FloatingShare({ title = 'Share this tool' }: any) {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const social = [
    { icon: <FaFacebookF />, color: '#1877F2', link: `https://facebook.com/sharer/sharer.php?u=${url}` },
    { icon: <FaWhatsapp />, color: '#25D366', link: `https://wa.me/?text=${url}` },
    { icon: <SiX />, color: '#000', link: `https://twitter.com/intent/tweet?url=${url}&text=${title}` },
    { icon: <FaLinkedinIn />, color: '#0077B5', link: `https://linkedin.com/shareArticle?url=${url}` },
    { icon: <FaTelegramPlane />, color: '#0088cc', link: `https://t.me/share/url?url=${url}` },
  ];

  return (
    <>
      <style>{`@keyframes floatAnim {0%,100% { transform: translateY(0px); }50% { transform: translateY(-6px); }} @keyframes glowPulse {0% { box-shadow: 0 0 0 rgba(124,95,255,0.4); }70% { box-shadow: 0 0 22px rgba(124,95,255,0.9); }100% { box-shadow: 0 0 0 rgba(124,95,255,0.4); } }`}</style>

      <div ref={ref} className="fixed bottom-6 right-6 z-[999] flex flex-col items-end">
        {!mobile && open && <div className="absolute right-[80px] bottom-[18px] bg-black text-white rounded-md text-sm px-3 py-1 shadow-md whitespace-nowrap">{title}</div>}

        <motion.div initial={false} animate={{ height: open ? social.length * 52 : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.18, ease: 'easeOut' }} className="overflow-hidden flex flex-col gap-3 pr-2 pb-3">
          {social.map((s, i) => (
            <a key={i} href={s.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition" style={{ background: s.color }}>
              {s.icon}
            </a>
          ))}
        </motion.div>

        <button onClick={() => setOpen(!open)} style={{ animation: `floatAnim 3s ease-in-out infinite, glowPulse 2.2s ease infinite` }} className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white shadow-xl cursor-pointer active:scale-95 transition">
          <Share2 size={26} />
        </button>
      </div>
    </>
  );
}