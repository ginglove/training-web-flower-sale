"use client";

import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import Toast from './Toast';

export default function AddToCart({ product, variant = 'icon' }: { product: any, variant?: 'icon' | 'button' }) {
  const [adding, setAdding] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAdding(true);
    
    // Get existing cart
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if exists
    const existing = cart.find((item: any) => item.ma_hoa === product.ma_hoa);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    // Save back
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Dispatch event for other components
    window.dispatchEvent(new Event('cart-updated'));
    
    // Show feedback
    setTimeout(() => {
      setAdding(false);
      setShowToast(true);
    }, 500);
  };

  return (
    <>
      <Toast 
        message={`Đã thêm "${product.ten_hoa}" vào giỏ hàng!`} 
        visible={showToast} 
        onClose={() => setShowToast(false)} 
      />

      {variant === 'button' ? (
        <button 
          onClick={handleAdd}
          disabled={adding}
          className="nm-button-sage w-full py-5 rounded-[30px] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-[1.03] transition-transform disabled:opacity-50"
        >
          <ShoppingCart size={18} /> {adding ? 'Đang thêm...' : 'Thêm vào giỏ'}
        </button>
      ) : (
        <button 
          onClick={handleAdd}
          className={`absolute top-8 right-8 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 z-20 ${
            adding ? 'nm-inset bg-sage text-white' : 'bg-sage/40 text-white hover:bg-sage hover:scale-110 shadow-lg backdrop-blur-sm'
          }`}
        >
          <ShoppingCart size={20} className={adding ? 'animate-bounce' : ''} />
        </button>
      )}
    </>
  );
}
