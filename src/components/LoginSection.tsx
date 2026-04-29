"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { Suspense, useState } from 'react';

function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [showPassword, setShowPassword] = useState(false);

  const errorMessages: Record<string, string> = {
    empty: 'Vui lòng nhập đầy đủ thông tin.',
    invalid: 'Sai tên đăng nhập hoặc mật khẩu.',
    server: 'Lỗi hệ thống. Vui lòng thử lại.',
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <div className="nm-raised-sm p-2 rounded-xl text-text-main">
          <LogIn size={18} />
        </div>
        <h2 className="font-black text-xs uppercase tracking-widest text-text-main">Thành Viên</h2>
      </div>

      {error && (
        <div className="space-y-3 mb-6">
          <div className="bg-red-50 text-red-500 text-[10px] font-bold p-3 rounded-xl text-center animate-pulse border border-red-100">
            ⚠️ {errorMessages[error] || 'Đã xảy ra lỗi.'}
          </div>
          {error === 'invalid' && (
            <div className="text-center">
              <Link href="/quan-tri/dang-nhap" className="text-[9px] font-black text-sage uppercase tracking-widest hover:underline">
                Bạn là quản trị viên? Nhấn vào đây
              </Link>
            </div>
          )}
        </div>
      )}

      <form className="space-y-6" action="/api/auth/login" method="POST">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">Tên đăng nhập</label>
          <input 
            type="text" 
            name="ten_dn"
            required
            className="w-full nm-inset px-6 py-4 rounded-2xl outline-none text-sm text-text-main placeholder-text-muted/30"
            placeholder="Username..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">Mật khẩu</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              name="mat_khau"
              required
              className="w-full nm-inset px-6 py-4 rounded-2xl outline-none text-sm text-text-main placeholder-text-muted/30 pr-12"
              placeholder="••••••••"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <button 
          type="submit"
          className="w-full nm-button py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-text-main hover:scale-[1.02] transition-transform"
        >
          Đăng Nhập
        </button>
        <div className="flex justify-between px-2 text-[10px] font-black text-text-muted uppercase tracking-tighter">
          <Link href="/dang-ky" className="hover:text-text-main underline decoration-text-muted/20 underline-offset-4">Đăng Ký</Link>
          <Link href="/quen-mk" className="hover:text-text-main underline decoration-text-muted/20 underline-offset-4">Quên Mật Khẩu</Link>
        </div>
      </form>
    </>
  );
}

export default function LoginSection() {
  return (
    <Suspense fallback={<div className="h-40 animate-pulse bg-gray-100 rounded-2xl" />}>
      <LoginForm />
    </Suspense>
  );
}
