"use client";

import { CheckCircle2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Toast({ message, visible, onClose }: { message: string, visible: boolean, onClose: () => void }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-12 right-12 z-[100] animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="nm-raised bg-white/90 backdrop-blur-xl border border-sage/20 rounded-[30px] p-6 flex items-center gap-6 shadow-2xl">
        <div className="w-12 h-12 nm-inset rounded-2xl flex items-center justify-center text-sage">
          <CheckCircle2 size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1">Thành công</p>
          <p className="text-sm font-bold text-text-main pr-8">{message}</p>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 text-text-muted hover:text-text-main transition-colors">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
