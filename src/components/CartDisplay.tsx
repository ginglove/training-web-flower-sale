"use client";

import { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartDisplay() {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
    setLoading(false);
  };

  useEffect(() => {
    loadCart();
    
    // Listen for internal app updates
    window.addEventListener('cart-updated', loadCart);
    
    // Listen for updates from other tabs
    window.addEventListener('storage', (e) => {
      if (e.key === 'cart') loadCart();
    });

    return () => {
      window.removeEventListener('cart-updated', loadCart);
      window.removeEventListener('storage', loadCart);
    };
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
          Thêm Sản Phẩm Vào Giỏ
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Table Header Labels - Desktop Only */}
      <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-4 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">
        <div className="col-span-1">STT</div>
        <div className="col-span-5">Tên Sản Phẩm</div>
        <div className="col-span-2 text-center">Số Lượng</div>
        <div className="col-span-2 text-right">Đơn Giá</div>
        <div className="col-span-2 text-right">Thành Tiền</div>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item, index) => (
          <div key={item.ma_hoa} className="nm-raised rounded-[40px] p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-4 lg:gap-4 transition-all hover:scale-[1.01]">
            {/* STT & Image (Mobile: Header) */}
            <div className="col-span-1 flex items-center gap-4 lg:block">
              <span className="text-[10px] font-black text-text-muted lg:hidden">STT:</span>
              <span className="text-xs font-black text-text-main">{index + 1}</span>
            </div>
            
            {/* Tên Hàng - Expanded column */}
            <div className="col-span-5 flex items-center gap-5">
              <div className="w-14 h-14 lg:w-16 lg:h-16 nm-inset p-1 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={item.hinh_anh} alt={item.ten_hoa} className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 text-sm lg:text-lg leading-tight break-words">
                  {item.ten_hoa}
                </h4>
                <button 
                  onClick={() => removeItem(item.ma_hoa)} 
                  className="text-[9px] font-black text-red-500 uppercase tracking-widest mt-2 hover:text-red-600 transition-colors flex items-center gap-1 bg-white/50 px-2 py-1 rounded-lg w-fit nm-raised-sm"
                >
                  <Trash2 size={10} /> [Xóa]
                </button>
              </div>
            </div>
            
            {/* Số Lượng - Narrowed column */}
            <div className="col-span-2 flex lg:justify-center items-center gap-4">
              <span className="text-[10px] font-black text-text-muted lg:hidden uppercase tracking-widest">Số lượng:</span>
              <div className="flex items-center gap-2 nm-inset p-1 rounded-xl">
                <button 
                  onClick={() => updateQuantity(item.ma_hoa, -1)} 
                  className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-text-main hover:nm-raised rounded-lg transition-all"
                >
                  <Minus size={10} />
                </button>
                <input 
                  type="text" 
                  value={item.quantity} 
                  readOnly 
                  className="bg-transparent text-xs font-black text-text-main w-6 text-center outline-none"
                />
                <button 
                  onClick={() => updateQuantity(item.ma_hoa, 1)} 
                  className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-text-main hover:nm-raised rounded-lg transition-all"
                >
                  <Plus size={10} />
                </button>
              </div>
            </div>

            {/* Đơn Giá */}
            <div className="col-span-2 flex lg:block justify-between items-center lg:text-right border-t lg:border-none border-text-main/5 pt-4 lg:pt-0">
              <span className="text-[10px] font-black text-text-muted lg:hidden uppercase tracking-widest">Đơn giá:</span>
              <p className="text-xs font-bold text-text-muted">
                {new Intl.NumberFormat('vi-VN').format(item.gia)}
              </p>
            </div>

            {/* Thành Tiền */}
            <div className="col-span-2 flex lg:block justify-between items-center lg:text-right">
              <span className="text-[10px] font-black text-text-muted lg:hidden uppercase tracking-widest">Thành tiền:</span>
              <p className="text-sm font-black text-sage">
                {new Intl.NumberFormat('vi-VN').format(item.gia * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="nm-inset rounded-[50px] p-8 lg:p-12 mt-12 space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 nm-raised rounded-full flex items-center justify-center text-sage">
              <ShoppingBag size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Tổng giá trị đơn hàng</p>
              <h2 className="text-3xl lg:text-4xl font-black text-sage tracking-tighter">
                {new Intl.NumberFormat('vi-VN').format(total)} <span className="text-xl">VNĐ</span>
              </h2>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/hoa" className="nm-raised px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text-main hover:nm-inset transition-all">
              Thêm Sản Phẩm Vào Giỏ
            </Link>
            <button 
              onClick={() => window.location.reload()} 
              className="nm-raised px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-sage hover:nm-inset transition-all"
            >
              Cập Nhật Giỏ Hàng
            </button>
          </div>
        </div>
        
        <div className="pt-8 border-t border-text-main/5 flex justify-center">
          <Link href="/thanh-toan" className="nm-button-sage w-full max-w-md py-6 rounded-[30px] text-xs font-black uppercase tracking-[0.4em] text-white text-center shadow-xl hover:scale-105 transition-all">
            Tiến Hành Thanh Toán
          </Link>
        </div>
      </div>
    </div>
  );
}
