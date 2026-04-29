"use client";

import { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartDisplay() {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
    setLoading(false);
  }, []);

  const updateQuantity = (id: number, delta: number) => {
    const newCart = cart.map(item => {
      if (item.ma_hoa === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    // Dispatch event to update other components if needed
    window.dispatchEvent(new Event('cart-updated'));
  };

  const removeItem = (id: number) => {
    const newCart = cart.filter(item => item.ma_hoa !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const total = cart.reduce((sum, item) => sum + (item.gia * item.quantity), 0);

  if (loading) return <div className="h-64 nm-inset rounded-[40px] animate-pulse"></div>;

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 space-y-6">
        <div className="nm-inset w-24 h-24 rounded-full flex items-center justify-center mx-auto text-text-muted/30">
          <ShoppingBag size={40} />
        </div>
        <p className="text-sm text-text-muted italic">Giỏ hàng của bạn đang trống...</p>
        <Link href="/hoa" className="inline-block nm-button px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text-main">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Cart Items */}
      <div className="space-y-6">
        {cart.map((item, index) => (
          <div key={item.ma_hoa} className="nm-raised rounded-[30px] p-6 flex items-center gap-6 group transition-all hover:translate-x-2">
            <span className="text-[10px] font-black text-text-muted w-4">{index + 1}</span>
            <div className="w-20 h-20 nm-inset p-2 rounded-2xl overflow-hidden flex-shrink-0">
              <img src={item.hinh_anh} alt={item.ten_hoa} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-text-main text-sm truncate">{item.ten_hoa}</h4>
              <p className="text-[10px] font-black text-sage uppercase tracking-widest mt-1">
                {new Intl.NumberFormat('vi-VN').format(item.gia)} đ
              </p>
            </div>
            
            {/* Quantity Controls */}
            <div className="flex items-center gap-3 nm-inset px-3 py-2 rounded-xl">
              <button onClick={() => updateQuantity(item.ma_hoa, -1)} className="text-text-muted hover:text-text-main transition-colors">
                <Minus size={14} />
              </button>
              <span className="text-xs font-black text-text-main min-w-[20px] text-center">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.ma_hoa, 1)} className="text-text-muted hover:text-text-main transition-colors">
                <Plus size={14} />
              </button>
            </div>

            <div className="w-24 text-right">
              <p className="text-xs font-black text-text-main">
                {new Intl.NumberFormat('vi-VN').format(item.gia * item.quantity)} đ
              </p>
            </div>

            <button onClick={() => removeItem(item.ma_hoa)} className="nm-button-petal w-10 h-10 rounded-xl flex items-center justify-center text-red-500 hover:scale-110 transition-transform">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="nm-inset rounded-[30px] p-8 space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Tổng giá trị giỏ hàng:</span>
          <span className="text-2xl font-black text-text-main tracking-tighter">
            {new Intl.NumberFormat('vi-VN').format(total)} đ
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-6 pt-4">
          <Link href="/hoa" className="nm-button py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-center flex items-center justify-center gap-2">
            Tiếp tục mua hàng
          </Link>
          <Link href="/thanh-toan" className="nm-button-sage py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-center flex items-center justify-center gap-2">
            Thanh toán ngay <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
