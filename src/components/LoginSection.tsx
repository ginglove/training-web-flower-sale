"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { Suspense, useState, useEffect } from 'react';

function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlError = searchParams.get('error');
  
  const [ten_dn, setTenDn] = useState('');
  const [mat_khau, setMatKhau] = useState('');
  const [error, setError] = useState(urlError || '');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failCount, setFailCount] = useState(0);

  const getFailCount = (username: string) => {
    if (typeof window === 'undefined') return 0;
    return parseInt(localStorage.getItem(`login_fails_${username.trim().toLowerCase()}`) || '0');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ten_dn, mat_khau })
      });

      const data = await res.json();

      if (!res.ok) {
        const isAdmin = ten_dn.toLowerCase() === 'admin';
        
        if (!isAdmin) {
          const failKey = `login_fails_${ten_dn.trim().toLowerCase()}`;
          const newCount = parseInt(localStorage.getItem(failKey) || '0') + 1;
          localStorage.setItem(failKey, newCount.toString());
          setFailCount(newCount);

          if (newCount >= 5) {
            setError(`Tài khoản "${ten_dn}" đã sai ${newCount} lần. Đang chuyển hướng...`);
            setTimeout(() => {
              router.push('/quen-mat-khau');
            }, 2000);
            return;
          }

          setError(`${data.error || 'Đăng nhập thất bại'} (Lần ${newCount}/5)`);
        } else {
          setError('Cảnh báo: Thông tin xác thực Quản trị viên không chính xác. Đang chuyển hướng về Cổng Quản trị...');
          setTimeout(() => {
            router.push('/quan-tri/dang-nhap');
          }, 2500);
        }
        return;
      }

      localStorage.removeItem(`login_fails_${ten_dn.trim().toLowerCase()}`);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Lỗi kết nối');
    } finally {
      setLoading(false);
    }
  };

  const errorMessages: Record<string, string> = {
    empty: 'Vui lòng nhập đầy đủ thông tin.',
    invalid: 'Sai tên đăng nhập hoặc mật khẩu.',
    server: 'Lỗi hệ thống. Vui lòng thử lại.',
  };

  const displayError = errorMessages[error] || error;

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
            ⚠️ {displayError}
          </div>
          {(error.includes('invalid') || error.includes('sai')) && (
            <div className="text-center">
              <Link href="/quan-tri/dang-nhap" className="text-[9px] font-black text-sage uppercase tracking-widest hover:underline">
                Bạn là quản trị viên? Nhấn vào đây
              </Link>
            </div>
          )}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleLogin}>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-4">Tên đăng nhập</label>
          <input 
            type="text" 
            value={ten_dn}
            onChange={(e) => setTenDn(e.target.value)}
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
              value={mat_khau}
              onChange={(e) => setMatKhau(e.target.value)}
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
          disabled={loading}
          className="w-full nm-button py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-text-main hover:scale-[1.02] transition-transform disabled:opacity-50"
        >
          {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
        </button>
        <div className="flex justify-between px-2 text-[10px] font-black text-text-muted uppercase tracking-tighter">
          <Link href="/dang-ky" className="hover:text-text-main underline decoration-text-muted/20 underline-offset-4">Đăng Ký</Link>
          <Link href="/quen-mat-khau" className="hover:text-text-main underline decoration-text-muted/20 underline-offset-4">Quên Mật Khẩu</Link>
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
