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
          Thêm Sản Phẩm Vào Giỏ
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Table Header Labels for RSD matching */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-10 text-[10px] font-black text-text-muted uppercase tracking-widest border-b border-text-main/5 pb-4">
        <div className="col-span-1">STT</div>
        <div className="col-span-5">Tên Hàng</div>
        <div className="col-span-2 text-center">Số Lượng</div>
        <div className="col-span-2 text-right">Đơn Giá</div>
        <div className="col-span-2 text-right">Thành Tiền</div>
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {cart.map((item, index) => (
          <div key={item.ma_hoa} className="nm-raised rounded-[30px] p-6 grid grid-cols-1 md:grid-cols-12 items-center gap-6 group transition-all hover:translate-x-2">
            <div className="col-span-1 flex items-center gap-4">
              <span className="text-[10px] font-black text-text-muted w-4">{index + 1}</span>
              <div className="w-16 h-16 nm-inset p-1.5 rounded-2xl overflow-hidden flex-shrink-0 md:hidden">
                <img src={item.hinh_anh} alt={item.ten_hoa} className="w-full h-full object-cover rounded-xl" />
              </div>
            </div>
            
            <div className="col-span-5 flex items-center gap-6">
              <div className="w-16 h-16 nm-inset p-1.5 rounded-2xl overflow-hidden flex-shrink-0 hidden md:block">
                <img src={item.hinh_anh} alt={item.ten_hoa} className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-text-main text-sm truncate">{item.ten_hoa}</h4>
                <button onClick={() => removeItem(item.ma_hoa)} className="text-[10px] font-black text-red-400 uppercase tracking-widest mt-1 hover:text-red-500 transition-colors">
                  [Xóa]
                </button>
              </div>
            </div>
            
            {/* Quantity Controls */}
            <div className="col-span-2 flex justify-center">
              <div className="flex items-center gap-3 nm-inset px-3 py-2 rounded-xl">
                <button onClick={() => updateQuantity(item.ma_hoa, -1)} className="text-text-muted hover:text-text-main transition-colors">
                  <Minus size={14} />
                </button>
                <input 
                  type="text" 
                  value={item.quantity} 
                  readOnly 
                  className="bg-transparent text-xs font-black text-text-main w-8 text-center outline-none"
                />
                <button onClick={() => updateQuantity(item.ma_hoa, 1)} className="text-text-muted hover:text-text-main transition-colors">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="col-span-2 text-right">
              <p className="text-xs font-black text-text-muted">
                {new Intl.NumberFormat('vi-VN').format(item.gia)}
              </p>
            </div>

            <div className="col-span-2 text-right">
              <p className="text-xs font-black text-text-main">
                {new Intl.NumberFormat('vi-VN').format(item.gia * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="nm-inset rounded-[30px] p-8 space-y-8">
        <div className="text-right">
          <span className="text-xs font-black text-sage uppercase tracking-[0.2em] mr-4">tổng giá trị giỏ hàng:</span>
          <span className="text-2xl font-black text-sage tracking-tighter">
            {new Intl.NumberFormat('vi-VN').format(total)} VNĐ
          </span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/hoa" className="nm-button px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-text-main transition-all hover:scale-105">
            Thêm Sản Phẩm Vào Giỏ
          </Link>
          <button 
            onClick={() => window.location.reload()} 
            className="nm-button px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-sage transition-all hover:scale-105"
          >
            Cập Nhật Giỏ Hàng
          </button>
          <Link href="/thanh-toan" className="nm-button-sage px-12 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all hover:scale-110 shadow-lg">
            Thanh Toán
          </Link>
        </div>
      </div>
    </div>
  );
}
