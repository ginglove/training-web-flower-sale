"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function SessionMonitor() {
  const [isTimedOut, setIsTimedOut] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = () => {
      // Don't monitor on login pages themselves
      if (pathname === '/dang-nhap' || pathname === '/quan-tri/dang-nhap') {
        setIsTimedOut(false);
        return;
      }

      const cookies = document.cookie.split(';');
      const expiryCookie = cookies.find(c => c.trim().startsWith('session_expiry='));
      
      // If we don't have the expiry cookie, it means either:
      // 1. User is not logged in (fine)
      // 2. Session expired and browser deleted the cookie (Timeout!)
      
      // We need to know if the user WAS logged in. 
      // We can check if we are on a protected route or have other indicators.
      // For this training app, let's assume if we are on /thanh-vien or /quan-tri/* and no cookie, it's a timeout.
      const isProtectedRoute = pathname.startsWith('/thanh-vien') || 
                             pathname.startsWith('/quan-tri') || 
                             pathname.startsWith('/thanh-toan');

      if (isProtectedRoute && !expiryCookie && !isTimedOut) {
        setIsTimedOut(true);
        return;
      }

      if (expiryCookie) {
        const expiryTime = parseInt(expiryCookie.split('=')[1]);
        if (Date.now() >= expiryTime && !isTimedOut) {
          setIsTimedOut(true);
        }
      }
    };

    const interval = setInterval(checkSession, 1000);
    return () => clearInterval(interval);
  }, [pathname, isTimedOut]);

  useEffect(() => {
    if (isTimedOut) {
      const redirectUrl = pathname.startsWith('/quan-tri') ? '/quan-tri/dang-nhap' : '/dang-nhap';
      const timer = setTimeout(() => {
        window.location.href = redirectUrl;
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isTimedOut, pathname]);

  return (
    <AnimatePresence>
      {isTimedOut && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="nm-raised w-full max-w-sm bg-white p-10 rounded-[40px] text-center space-y-6"
          >
            <div className="flex justify-center">
              <div className="w-20 h-20 nm-inset rounded-full flex items-center justify-center text-red-500 animate-pulse">
                <Clock size={40} />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-black text-text-main uppercase tracking-widest flex items-center justify-center gap-2">
                <AlertTriangle size={20} className="text-orange-500" /> Hết Hạn Phiên
              </h3>
              <p className="text-sm font-medium text-text-muted leading-relaxed">
                Phiên làm việc của bạn đã hết hạn (70 giây).
              </p>
              <p className="text-[11px] font-black text-orange-500 uppercase tracking-widest mt-4">
                Đang chuyển hướng về trang đăng nhập...
              </p>
            </div>

            <div className="pt-4 flex justify-center">
              <div className="w-full h-1.5 nm-inset rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "linear" }}
                  className="h-full bg-orange-400"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
