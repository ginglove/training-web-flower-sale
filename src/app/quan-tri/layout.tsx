"use client";

import { LayoutDashboard, Tag, Flower2, ShoppingCart, Users, Newspaper, MessageSquare, LogOut, ChevronRight, User, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import SessionMonitor from '@/components/SessionMonitor';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data.stats))
      .catch(console.error);
  }, []);

  const menuItems = [
    { label: 'Tổng quan', href: '/quan-tri/tong-quan', icon: <LayoutDashboard size={20} /> },
    { label: 'Loại hoa', href: '/quan-tri/loai-hoa', icon: <Tag size={20} /> },
    { label: 'Hoa', href: '/quan-tri/hoa', icon: <Flower2 size={20} /> },
    { label: 'Đơn hàng', href: '/quan-tri/don-hang', icon: <ShoppingCart size={20} /> },
    { label: 'Thành viên', href: '/quan-tri/thanh-vien', icon: <Users size={20} /> },
    { label: 'Tin tức', href: '/quan-tri/tin-tuc', icon: <Newspaper size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#1E2122]">
      <SessionMonitor />
      {/* Sidebar - Premium Charcoal */}
      <aside className="w-80 flex flex-col fixed h-full z-50 bg-[#1E2122] border-r border-white/5 overflow-y-auto no-scrollbar">
        <div className="p-10">
          <Link href="/quan-tri/tong-quan" className="group">
            <h2 className="font-serif text-3xl font-black text-white group-hover:text-sage transition-colors">Admin Portal</h2>
            <p className="text-[10px] font-black text-sage uppercase tracking-[0.4em] mt-2">Floral Soul Management</p>
          </Link>
        </div>
        
        <nav className="px-6 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className="flex items-center justify-between px-6 py-4 rounded-2xl text-text-muted hover:nm-raised hover:text-white transition-all group"
            >
              <div className="flex items-center gap-4">
                <span className="text-sage group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="text-xs font-bold tracking-wide">{item.label}</span>
              </div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </nav>

        {/* Real-time Stats Module */}
        <div className="m-6 nm-inset p-8 rounded-[35px] border border-white/5 space-y-6">
            <div className="flex items-center gap-3 text-sage">
                <BarChart3 size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Thống kê chi tiết</span>
            </div>
            <div className="space-y-4">
                {[
                  { label: 'Tổng Số Loại Hoa', value: stats?.categories || '--' },
                  { label: 'Tổng Số Hoa', value: stats?.products || '--' },
                  { label: 'Số Khách Hàng', value: stats?.customers || '--' },
                  { label: 'Số Tin Tức', value: stats?.news || '--' },
                  { label: 'Số Góp Ý', value: 0 },
                  { label: 'Số Đơn Đặt Hàng', value: stats?.orders || '--' },
                ].map((s, i) => (
                    <div key={i} className="flex justify-between items-center text-[11px] border-b border-black/5 pb-2">
                       <span className="text-[#2D3436] font-bold opacity-60">{s.label}:</span>
                       <span className="font-black text-sage">{s.value}</span>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="p-8 mt-auto">
          <form action="/api/auth/logout" method="POST">
            <button 
                type="submit"
                className="w-full nm-button py-4 rounded-2xl flex items-center justify-center gap-3 text-red-400 font-black text-[10px] uppercase tracking-widest hover:text-red-500 transition-colors"
            >
                <LogOut size={16} /> Đăng xuất
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-80 flex flex-col min-h-screen bg-[#F7F5F2] rounded-l-[60px] shadow-[-20px_0_60px_rgba(0,0,0,0.3)] relative z-10 overflow-hidden">
        {/* Header */}
        <header className="px-12 py-8 flex items-center justify-between sticky top-0 z-40 bg-[#F7F5F2]/80 backdrop-blur-xl border-b border-black/5">
          <div>
             <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Hệ thống quản trị</span>
             <h1 className="font-serif text-2xl font-bold text-text-main">Bảng Điều Khiển</h1>
          </div>
          
          <div className="flex items-center gap-8">
             <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-text-main leading-none">Nguyễn Xuân Hùng</p>
                <p className="text-[10px] text-sage font-black uppercase tracking-widest mt-1">Admin • Trực tuyến</p>
             </div>
             <div className="nm-raised w-14 h-14 rounded-2xl flex items-center justify-center bg-white">
                <div className="nm-inset w-10 h-10 rounded-xl flex items-center justify-center text-sage">
                    <User size={20} />
                </div>
             </div>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="p-12 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
