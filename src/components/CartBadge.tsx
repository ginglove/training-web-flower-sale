"use client";

import { ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CartBadge() {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
    setCount(totalItems);
  };

  useEffect(() => {
    updateCount();
    window.addEventListener('cart-updated', updateCount);
    window.addEventListener('storage', (e) => {
      if (e.key === 'cart') updateCount();
    });
    return () => {
      window.removeEventListener('cart-updated', updateCount);
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  return (
    <Link href="/gio-hang" className="relative group">
      <div className="nm-raised w-16 h-16 rounded-full flex items-center justify-center text-text-main group-hover:scale-110 transition-all duration-500">
        <div className="nm-inset p-2 rounded-full text-sage group-hover:text-text-main transition-colors">
          <ShoppingBag size={24} />
        </div>
      </div>
      
      {count > 0 && (
        <div className="absolute -top-1 -right-1 w-8 h-8 bg-[#F3D5D9] rounded-full border-4 border-[#F7F5F2] flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
          <span className="text-[11px] font-black text-[#2D3436] leading-none">{count}</span>
        </div>
      )}
    </Link>
  );
}
