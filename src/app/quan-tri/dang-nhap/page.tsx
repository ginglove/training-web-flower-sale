"use client";

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LogIn, Eye, EyeOff, ShieldCheck } from 'lucide-react';

function AdminLoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [showPassword, setShowPassword] = useState(false);

  const errorMessages: Record<string, string> = {
    empty: 'Vui lòng nhập đầy đủ thông tin quản trị.',
    invalid: 'Tài khoản hoặc mật khẩu quản trị không chính xác.',
    server: 'Lỗi hệ thống quản trị. Vui lòng thử lại.',
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="nm-raised rounded-[50px] overflow-hidden">
          {/* Header */}
          <div className="bg-[#2D3436] px-8 py-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 nm-inset rounded-2xl mb-6 text-white/20">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-white font-serif text-3xl font-black mb-2 tracking-tight">Admin Portal</h1>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Hệ Thống Quản Trị Floral Soul</p>
          </div>

          {/* Form */}
          <div className="p-12 space-y-8 bg-white/20">
            {error && (
              <div className="bg-red-50 text-red-500 text-[10px] font-black p-4 rounded-2xl text-center border border-red-100 animate-pulse">
                ⚠️ {errorMessages[error] || 'Đã xảy ra lỗi bảo mật.'}
              </div>
            )}

            <form action="/api/admin/login" method="POST" className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-6">Tên đăng nhập</label>
                <input 
                  type="text" 
                  name="ten_dn"
                  required
                  className="w-full nm-inset px-8 py-5 rounded-3xl outline-none text-sm text-text-main placeholder-text-muted/30"
                  placeholder="admin_id..."
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-6">Mật khẩu bảo mật</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="mat_khau"
                    required
                    className="w-full nm-inset px-8 py-5 rounded-3xl outline-none text-sm text-text-main placeholder-text-muted/30 pr-16"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full nm-button py-5 rounded-[30px] font-black text-xs uppercase tracking-[0.3em] text-text-main hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
                >
                  <LogIn size={18} /> Xác Nhận Truy Cập
                </button>
              </div>
            </form>

            <div className="text-center pt-4">
              <a href="/" className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] hover:text-text-main transition-colors">
                Quay lại Trang Chủ
              </a>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-12 text-[10px] font-black text-text-muted uppercase tracking-[0.4em] opacity-40">
          Secure Environment © 2026 Floral Soul
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">Loading...</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
