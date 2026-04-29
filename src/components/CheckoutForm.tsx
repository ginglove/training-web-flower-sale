"use client";

import { useState, useEffect } from 'react';
import { CreditCard, Truck, Calendar, User, CheckCircle2 } from 'lucide-react';
import { processCheckout } from '@/app/actions/checkout';

export default function CheckoutForm() {
  const [cart, setCart] = useState<any[]>([]);
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const total = cart.reduce((sum, item) => sum + (item.gia * item.quantity), 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      tenKhach: formData.get('tenKhach'),
      email: formData.get('email'),
      sdt: formData.get('sdt'),
      diaChi: formData.get('diaChi'),
      ngayGiaoHang: formData.get('ngayGiaoHang'),
      diaChiGiaoHang: formData.get('diaChiGiaoHang'),
    };

    const result = await processCheckout(data, cart);
    
    if (result.success) {
      setIsOrdered(true);
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cart-updated'));
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  if (isOrdered) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-center space-y-8">
        <div className="nm-raised w-32 h-32 rounded-full flex items-center justify-center text-sage animate-bounce">
          <CheckCircle2 size={64} />
        </div>
        <h1 className="font-serif text-5xl font-bold text-text-main">Đặt hàng thành công!</h1>
        <p className="text-text-muted italic">Cảm ơn bạn đã tin tưởng Floral Soul. Đơn hàng của bạn đang được chuẩn bị.</p>
        <a href="/" className="nm-button px-12 py-5 rounded-3xl font-black text-xs uppercase tracking-widest text-text-main">
          Quay lại trang chủ
        </a>
      </div>
    );
  }

  return (
    <div className="nm-raised rounded-[50px] overflow-hidden">
      <div className="bg-[#2D3436] px-10 py-8 text-white flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">Thanh Toán</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 mt-1">Hoàn tất đơn hàng của bạn</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-widest block opacity-60 mb-1">Tổng cộng</span>
          <span className="text-3xl font-black tracking-tighter">{new Intl.NumberFormat('vi-VN').format(total)} đ</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-12 grid md:grid-cols-2 gap-16">
        {/* Left Column: Customer Info */}
        <div className="space-y-12">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 nm-inset rounded-lg flex items-center justify-center text-sage">
                <User size={16} />
              </div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-main">Thông Tin Người Thanh Toán</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-text-muted uppercase tracking-widest ml-4">Tên Khách Hàng</label>
                <input name="tenKhach" type="text" defaultValue="Nguyễn Xuân Hùng" className="w-full nm-inset px-6 py-4 rounded-2xl outline-none text-sm text-text-main" required />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-text-muted uppercase tracking-widest ml-4">Email</label>
                <input name="email" type="email" defaultValue="hung@yahoo.com" className="w-full nm-inset px-6 py-4 rounded-2xl outline-none text-sm text-text-main" required />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-text-muted uppercase tracking-widest ml-4">Số Điện Thoại</label>
                <input name="sdt" type="tel" defaultValue="1699914834" className="w-full nm-inset px-6 py-4 rounded-2xl outline-none text-sm text-text-main" required />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-text-muted uppercase tracking-widest ml-4">Địa Chỉ</label>
                <input name="diaChi" type="text" defaultValue="Số 22 Phạm Hùng, Cầu Giấy, Hà Nội" className="w-full nm-inset px-6 py-4 rounded-2xl outline-none text-sm text-text-main" required />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Delivery Info */}
        <div className="space-y-12">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 nm-inset rounded-lg flex items-center justify-center text-sage">
                <Truck size={16} />
              </div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-main">Thông Tin Giao Hàng</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-text-muted uppercase tracking-widest ml-4">Ngày Giao Hàng</label>
                <div className="relative">
                  <input name="ngayGiaoHang" type="date" className="w-full nm-inset px-6 py-4 rounded-2xl outline-none text-sm text-text-main appearance-none" required />
                  <Calendar size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-text-muted uppercase tracking-widest ml-4">Nơi Giao Hàng</label>
                <textarea name="diaChiGiaoHang" rows={4} className="w-full nm-inset px-6 py-4 rounded-2xl outline-none text-sm text-text-main resize-none" defaultValue="Số 22 Phạm Hùng, Cầu Giấy, Hà Nội" required></textarea>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button 
                type="submit" 
                disabled={loading || cart.length === 0}
                className="w-full nm-button-sage py-6 rounded-[30px] font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              <CreditCard size={20} /> {loading ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN THANH TOÁN'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
