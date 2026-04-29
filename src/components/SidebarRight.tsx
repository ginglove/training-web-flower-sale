import sql from "@/lib/db";
import Link from "next/link";
import { LogIn, Search, Star, UserCheck, LogOut, Settings } from 'lucide-react';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import LoginSection from './LoginSection';

export default async function SidebarRight() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const userData = token ? verifyToken(token) as any : null;

  let featuredFlowers: any[] = [];
  try {
    featuredFlowers = await sql`
      SELECT h.*, l.ten_loai 
      FROM hoa h 
      LEFT JOIN loai_hoa l ON h.ma_loai = l.ma_loai 
      ORDER BY RANDOM() 
      LIMIT 5
    `;
  } catch (error) {
    console.error("Failed to fetch featured flowers", error);
  }

  return (
    <aside className="flex flex-col gap-10">
      {/* THÀNH VIÊN SECTION */}
      <div className="nm-raised rounded-[40px] overflow-hidden p-8">
        {!userData ? (
          <LoginSection />
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="nm-inset p-4 rounded-full text-sage relative">
                <UserCheck size={40} />
                <div className="absolute top-0 right-0 w-4 h-4 bg-sage rounded-full border-2 border-base"></div>
              </div>
            </div>
            <h3 className="font-serif text-xl font-black text-text-main mb-1">Chào, {userData.ten_dn}!</h3>
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-8">Thành viên thân thiết</p>
            
            <div className="space-y-3 mb-8">
              <Link href="/thanh-vien" className="flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-bold text-text-muted hover:nm-inset hover:text-text-main transition-all">
                <Settings size={14} /> Quản lý tài khoản
              </Link>
              <form action="/api/auth/logout" method="POST">
                <button 
                  type="submit"
                  className="w-full flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-bold text-red-400 hover:nm-inset hover:text-red-500 transition-all"
                >
                  <LogOut size={14} /> Đăng xuất
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* TÌM KIẾM NHANH (Modernized Neumorphic) */}
      <div className="nm-raised rounded-[40px] overflow-hidden">
        {/* Header Bar - Modern Neumorphic */}
        <div className="bg-sage px-6 py-4 flex items-center gap-3">
          <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center text-white font-black text-lg leading-none shadow-sm">+</div>
          <h2 className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Tìm Kiếm Nhanh</h2>
        </div>
        
        <div className="p-8">
          <form action="/hoa" method="GET" className="flex flex-col items-center gap-6">
            <div className="w-full">
              <input 
                type="text" 
                name="keyword"
                className="w-full nm-inset px-6 py-4 rounded-2xl outline-none text-sm text-text-main placeholder-text-muted/40"
                placeholder="Nhập tên hoa..."
              />
            </div>
            <button 
              type="submit"
              className="nm-button w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-text-main hover:scale-[1.02] transition-transform"
            >
              Tìm
            </button>
            <Link 
              href="/tim-kiem-nang-cao" 
              className="text-[10px] text-sage font-black uppercase tracking-widest hover:underline decoration-sage/30 underline-offset-8"
            >
              Tìm Kiếm Nâng Cao
            </Link>
          </form>
        </div>
      </div>

      {/* Hoa Đặc Biệt */}
      <div className="nm-raised rounded-[40px] overflow-hidden p-6">
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="nm-raised-sm p-2 rounded-xl text-text-main">
            <Star size={18} />
          </div>
          <h2 className="font-black text-xs uppercase tracking-widest text-text-main">Hoa Đặc Biệt</h2>
        </div>
        <div className="flex flex-col gap-6">
          {featuredFlowers.map((flower) => (
            <div key={flower.ma_hoa} className="flex gap-4 group nm-inset p-3 rounded-3xl transition-all hover:scale-[1.02]">
              <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 nm-raised-sm p-1.5">
                <img 
                  src={flower.hinh_anh} 
                  alt={flower.ten_hoa} 
                  className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col justify-center">
                <Link href={`/hoa/${flower.ma_hoa}`} className="text-xs font-bold text-text-main hover:text-text-muted line-clamp-1 transition-colors leading-tight mb-1">
                  {flower.ten_hoa}
                </Link>
                <p className="text-[10px] font-black text-text-muted uppercase">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(flower.gia)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
