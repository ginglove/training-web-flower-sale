'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [ten_dn, setTenDn] = useState('');
  const [mat_khau, setMatKhau] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        throw new Error(data.error || 'Đăng nhập thất bại');
      }

      // Store basic user info in localStorage for client-side use
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // BUG: Redirects to home instead of previous page
      router.push('/');
      router.refresh(); // Refresh layout to show logged in state
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="glass p-10 md:p-14 rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blush/20 rounded-bl-full -z-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-forest/10 rounded-tr-full -z-10"></div>

        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl font-bold text-forest mb-2">Đăng nhập</h1>
          <p className="text-forest/70">Chào mừng trở lại với Floral Charm</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-medium text-forest mb-2">Tên đăng nhập</label>
            <input 
              type="text" 
              value={ten_dn}
              onChange={(e) => setTenDn(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-forest/20 focus:border-blush focus:ring-2 focus:ring-blush/30 bg-white/60 transition-all"
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-forest">Mật khẩu</label>
              <a href="#" className="text-xs text-forest/60 hover:text-blush">Quên mật khẩu?</a>
            </div>
            <input 
              type="password" 
              value={mat_khau}
              onChange={(e) => setMatKhau(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-forest/20 focus:border-blush focus:ring-2 focus:ring-blush/30 bg-white/60 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-forest text-ivory py-4 rounded-xl font-bold hover:bg-blush hover:text-forest transition-colors shadow-lg disabled:opacity-70 mt-4"
          >
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-forest/80 relative z-10">
          Chưa có tài khoản? <Link href="/dang-ky" className="font-bold text-forest hover:text-blush underline underline-offset-4">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
}
