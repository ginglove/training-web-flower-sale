'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // In a real app this would fetch fresh data from API using token
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/dang-nhap');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    // Also would need to clear HTTP-only cookie via API
    router.push('/');
  };

  const handleSave = () => {
    // BUG: Visual save only, doesn't actually call API to update DB
    setEditing(false);
    localStorage.setItem('user', JSON.stringify(user));
    alert('Đã cập nhật thông tin thành công!');
  };

  if (!user) return <div className="min-h-[50vh] flex justify-center items-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-serif text-4xl font-bold text-forest">Tài khoản của tôi</h1>
        <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-bold border border-red-200 hover:bg-red-50 px-6 py-2 rounded-full transition-colors">
          Đăng xuất
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="glass p-8 rounded-3xl text-center sticky top-24">
            <div className="w-24 h-24 bg-forest text-ivory rounded-full flex items-center justify-center text-4xl font-serif font-bold mx-auto mb-4 shadow-lg">
              {user.ten_kh?.charAt(0) || user.ten_dn?.charAt(0) || 'U'}
            </div>
            <h2 className="font-bold text-xl text-forest mb-1">{user.ho_kh} {user.ten_kh}</h2>
            <p className="text-sm text-forest/60 mb-6">@{user.ten_dn}</p>
            
            <div className="flex flex-col gap-2">
              <button className="bg-forest text-ivory px-4 py-3 rounded-xl font-medium shadow-md text-sm transition-colors">Thông tin tài khoản</button>
              <button className="bg-white/50 text-forest hover:bg-white/80 px-4 py-3 rounded-xl font-medium text-sm transition-colors">Lịch sử đơn hàng</button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="glass p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blush/20 rounded-bl-full -z-10"></div>
            
            <div className="flex justify-between items-center mb-8 border-b border-forest/10 pb-4">
              <h2 className="font-serif text-2xl font-bold text-forest">Thông tin cá nhân</h2>
              {!editing ? (
                <button onClick={() => setEditing(true)} className="text-blush-dark hover:text-forest font-bold transition-colors">Chỉnh sửa</button>
              ) : (
                <div className="flex gap-4">
                  <button onClick={() => setEditing(false)} className="text-forest/60 hover:text-forest font-medium transition-colors">Hủy</button>
                  <button onClick={handleSave} className="bg-forest text-ivory px-4 py-1 rounded-full text-sm font-bold shadow-md">Lưu</button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-forest/50 uppercase tracking-wider mb-2">Họ</label>
                  {editing ? (
                    <input type="text" value={user.ho_kh} onChange={(e) => setUser({...user, ho_kh: e.target.value})} className="w-full bg-white/60 border border-forest/20 rounded-lg px-4 py-2" />
                  ) : (
                    <p className="font-medium text-forest text-lg">{user.ho_kh}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-forest/50 uppercase tracking-wider mb-2">Tên</label>
                  {editing ? (
                    <input type="text" value={user.ten_kh} onChange={(e) => setUser({...user, ten_kh: e.target.value})} className="w-full bg-white/60 border border-forest/20 rounded-lg px-4 py-2" />
                  ) : (
                    <p className="font-medium text-forest text-lg">{user.ten_kh}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest/50 uppercase tracking-wider mb-2">Email</label>
                {editing ? (
                  <input type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} className="w-full bg-white/60 border border-forest/20 rounded-lg px-4 py-2" />
                ) : (
                  <p className="font-medium text-forest text-lg">{user.email}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-forest/50 uppercase tracking-wider mb-2">Số điện thoại</label>
                  {editing ? (
                    <input type="tel" value={user.sdt} onChange={(e) => setUser({...user, sdt: e.target.value})} className="w-full bg-white/60 border border-forest/20 rounded-lg px-4 py-2" />
                  ) : (
                    <p className="font-medium text-forest text-lg">{user.sdt}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-forest/50 uppercase tracking-wider mb-2">Giới tính</label>
                  {editing ? (
                    <select value={user.gioi_tinh} onChange={(e) => setUser({...user, gioi_tinh: e.target.value})} className="w-full bg-white/60 border border-forest/20 rounded-lg px-4 py-2">
                      <option value={1}>Nam</option>
                      <option value={0}>Nữ</option>
                    </select>
                  ) : (
                    <p className="font-medium text-forest text-lg">{user.gioi_tinh === 1 ? 'Nam' : 'Nữ'}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-forest/50 uppercase tracking-wider mb-2">Địa chỉ mặc định</label>
                {editing ? (
                  <textarea value={user.dia_chi} onChange={(e) => setUser({...user, dia_chi: e.target.value})} className="w-full bg-white/60 border border-forest/20 rounded-lg px-4 py-2 rows-3" />
                ) : (
                  <p className="font-medium text-forest text-lg">{user.dia_chi}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
