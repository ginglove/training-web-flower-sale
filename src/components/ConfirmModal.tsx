"use client";

import { AlertCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "XÁC NHẬN", 
  cancelText = "HỦY BỎ" 
}: ConfirmModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  const handleConfirm = () => {
    setShow(false);
    onConfirm();
  };

  if (!isOpen && !show) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 transition-all duration-300 ${
      show ? 'opacity-100 backdrop-blur-sm bg-black/10' : 'opacity-0 pointer-events-none'
    }`}>
      <div className={`nm-raised max-w-sm w-full rounded-[40px] p-10 transform transition-all duration-500 ${
        show ? 'translate-y-0 scale-100' : 'translate-y-12 scale-90'
      }`}>
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 nm-inset p-2 rounded-[30px] flex items-center justify-center text-sage">
            <div className="w-full h-full nm-raised rounded-[22px] flex items-center justify-center bg-white">
                <AlertCircle size={32} />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-[#2D3436]">
                {title}
            </h3>
            <p className="text-sm font-medium text-text-muted leading-relaxed">
              {message}
            </p>
          </div>

          <div className="w-full flex gap-4 pt-4">
            <button 
              onClick={handleClose}
              className="flex-1 nm-raised py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-red-400 transition-all"
            >
              {cancelText}
            </button>
            <button 
              onClick={handleConfirm}
              className="flex-1 nm-button-sage py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#2D3436] transition-all"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
