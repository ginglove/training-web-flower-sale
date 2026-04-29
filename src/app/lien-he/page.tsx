'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    ten_nguoi_lh: '',
    sdt_nguoi_lh: '',
    email_nguoi_lh: '',
    diachi_nguoi_lh: '',
    noi_dung: '',
    gioi_nguoi_lh: 1
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // BUG: Missing actual API call to save contact info
    setSuccess(true);
    setFormData({
      ten_nguoi_lh: '',
      sdt_nguoi_lh: '',
      email_nguoi_lh: '',
      diachi_nguoi_lh: '',
      noi_dung: '',
      gioi_nguoi_lh: 1
    });
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-forest mb-4">Liên hệ với chúng tôi</h1>
        <p className="text-forest/70 max-w-2xl mx-auto">Chúng tôi luôn lắng nghe và sẵn sàng hỗ trợ bạn. Vui lòng để lại thông tin hoặc đến trực tiếp cửa hàng.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="glass p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blush/20 rounded-bl-full -z-10"></div>
          
          <h2 className="font-serif text-2xl font-bold text-forest mb-6">Gửi tin nhắn</h2>
          
          {success && (
            <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 border border-green-200">
              Cảm ơn bạn! Tin nhắn đã được gửi thành công.
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input 
                  type="text" placeholder="Họ và tên" required
                  value={formData.ten_nguoi_lh} onChange={e => setFormData({...formData, ten_nguoi_lh: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-blush focus:ring-2 focus:ring-blush/30 bg-white/60"
                />
              </div>
              <div>
                <input 
                  type="tel" placeholder="Số điện thoại" required
                  value={formData.sdt_nguoi_lh} onChange={e => setFormData({...formData, sdt_nguoi_lh: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-blush focus:ring-2 focus:ring-blush/30 bg-white/60"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input 
                  type="email" placeholder="Email" required
                  value={formData.email_nguoi_lh} onChange={e => setFormData({...formData, email_nguoi_lh: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-blush focus:ring-2 focus:ring-blush/30 bg-white/60"
                />
              </div>
              <div>
                <select 
                  value={formData.gioi_nguoi_lh} onChange={e => setFormData({...formData, gioi_nguoi_lh: Number(e.target.value)})}
                  className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-blush focus:ring-2 focus:ring-blush/30 bg-white/60"
                >
                  <option value={1}>Anh</option>
                  <option value={0}>Chị</option>
                </select>
              </div>
            </div>
            
            <div>
              <input 
                type="text" placeholder="Địa chỉ" required
                value={formData.diachi_nguoi_lh} onChange={e => setFormData({...formData, diachi_nguoi_lh: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-blush focus:ring-2 focus:ring-blush/30 bg-white/60"
              />
            </div>
            
            <div>
              <textarea 
                placeholder="Nội dung lời nhắn" required rows={4}
                value={formData.noi_dung} onChange={e => setFormData({...formData, noi_dung: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-forest/20 focus:border-blush focus:ring-2 focus:ring-blush/30 bg-white/60"
              ></textarea>
            </div>
            
            <button type="submit" className="bg-forest text-ivory px-8 py-3 rounded-xl font-bold hover:bg-blush hover:text-forest transition-colors shadow-md">
              Gửi thông tin
            </button>
          </form>
        </div>
        
        <div className="flex flex-col gap-8">
          <div className="glass p-8 rounded-3xl flex-grow flex flex-col justify-center">
            <h2 className="font-serif text-2xl font-bold text-forest mb-6">Thông tin cửa hàng</h2>
            
            <div className="space-y-6 text-forest/80">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blush/20 text-blush-dark flex items-center justify-center shrink-0 text-xl">📍</div>
                <div>
                  <h3 className="font-bold text-forest mb-1">Địa chỉ</h3>
                  <p>123 Đường Hoa, Phường Đa Kao,<br/>Quận 1, TP. Hồ Chí Minh</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blush/20 text-blush-dark flex items-center justify-center shrink-0 text-xl">📞</div>
                <div>
                  <h3 className="font-bold text-forest mb-1">Điện thoại</h3>
                  <p>0123 456 789 (Hotline 24/7)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blush/20 text-blush-dark flex items-center justify-center shrink-0 text-xl">✉️</div>
                <div>
                  <h3 className="font-bold text-forest mb-1">Email</h3>
                  <p>contact@floralcharm.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-3xl overflow-hidden h-64 shadow-xl">
            {/* Mock map image */}
            <div className="w-full h-full bg-gray-200 relative">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format" alt="Map" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-forest text-ivory px-4 py-2 rounded-lg font-bold shadow-lg">Floral Charm Location</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
