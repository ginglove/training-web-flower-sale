'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      // Clear login fails on reset request
      localStorage.removeItem('login_fails');
    }, 1500);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="nm-raised rounded-[50px] p-10 md:p-14 w-full max-w-md bg-ivory/50">
        <Link href="/dang-nhap" className="inline-flex items-center gap-2 text-xs font-black text-text-muted uppercase tracking-widest hover:text-sage transition-colors mb-8">
          <ArrowLeft size={14} /> Quay lại đăng nhập
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl font-black text-sage tracking-tighter mb-2">Quên Mật Khẩu?</h1>
          <p className="text-xs font-medium text-text-muted">Nhập email của bạn để nhận hướng dẫn khôi phục tài khoản.</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-4">Địa chỉ Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email@example.com"
                className="w-full nm-inset px-6 py-4 rounded-2xl text-sm font-medium text-text-main focus:outline-none focus:ring-2 focus:ring-sage/20 transition-all bg-transparent"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full nm-button-sage py-5 rounded-[25px] text-xs font-black uppercase tracking-[0.3em] text-white hover:scale-[1.02] transition-transform disabled:opacity-50"
            >
              {loading ? 'Đang gửi...' : 'Gửi Yêu Cầu'}
            </button>
          </form>
        ) : (
          <div className="nm-inset p-8 rounded-3xl text-center space-y-6">
            <div className="w-16 h-16 nm-raised rounded-full flex items-center justify-center mx-auto text-sage">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-text-main mb-2">Đã gửi yêu cầu!</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Chúng tôi đã gửi link khôi phục mật khẩu đến <strong>{email}</strong>. Vui lòng kiểm tra hộp thư đến của bạn.
              </p>
            </div>
            <Link href="/dang-nhap" className="inline-block text-xs font-black text-sage uppercase tracking-widest border-b-2 border-sage pb-1">
              Quay lại đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
