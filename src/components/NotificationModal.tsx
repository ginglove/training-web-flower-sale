"use client";

import { CheckCircle, XCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NotificationModalProps {
  message: string;
  type: 'success' | 'error';
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationModal({ message, type, isOpen, onClose }: NotificationModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300); // Wait for animation
  };

  if (!isOpen && !show) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 transition-all duration-300 ${
      show ? 'opacity-100 backdrop-blur-sm bg-black/10' : 'opacity-0 pointer-events-none'
    }`}>
      <div className={`nm-raised max-w-sm w-full rounded-[40px] p-10 transform transition-all duration-500 ${
        show ? 'translate-y-0 scale-100 rotate-0' : 'translate-y-12 scale-90 rotate-2'
      }`}>
        <div className="flex flex-col items-center text-center space-y-6">
          <div className={`w-20 h-20 nm-inset p-2 rounded-[30px] flex items-center justify-center ${
            type === 'success' ? 'text-sage' : 'text-red-400'
          }`}>
            <div className="w-full h-full nm-raised rounded-[22px] flex items-center justify-center bg-white">
                {type === 'success' ? <CheckCircle size={32} /> : <XCircle size={32} />}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-[#2D3436]">
                {type === 'success' ? 'Tuyệt vời!' : 'Opps!'}
            </h3>
            <p className="text-sm font-medium text-text-muted leading-relaxed">
              {message}
            </p>
          </div>

          <button 
            onClick={handleClose}
            className="w-full nm-button py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-[#2D3436] hover:text-sage transition-all"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
}
