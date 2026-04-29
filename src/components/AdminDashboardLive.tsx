"use client";

import { useState, useEffect } from 'react';
import { ShoppingCart, DollarSign, Flower2, Users, Clock, UserPlus } from 'lucide-react';

export default function AdminDashboardLive() {
  const [data, setData] = useState<any>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Sync every 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (!data) return (
    <div className="grid grid-cols-4 gap-8 animate-pulse">
        {[1,2,3,4].map(i => <div key={i} className="h-32 nm-inset rounded-3xl"></div>)}
    </div>
  );

  return (
    <div className="space-y-12">
      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'TỔNG ĐƠN HÀNG', value: data.stats.orders, icon: <ShoppingCart />, color: 'blue' },
          { label: 'DOANH THU', value: `${new Intl.NumberFormat('vi-VN').format(data.stats.revenue)} đ`, icon: <DollarSign />, color: 'green' },
          { label: 'SẢN PHẨM', value: data.stats.products, icon: <Flower2 />, color: 'yellow' },
          { label: 'KHÁCH HÀNG', value: data.stats.customers, icon: <Users />, color: 'purple' },
        ].map((stat, i) => (
          <div key={i} className="nm-raised rounded-[40px] p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-2 h-full bg-${stat.color}-400`}></div>
            <div className="flex items-center justify-between mb-4">
               <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{stat.label}</span>
               <div className="nm-inset-sm p-2 rounded-xl text-text-muted opacity-40">
                  {stat.icon}
               </div>
            </div>
            <p className="text-3xl font-black text-text-main tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* RECENT ORDERS */}
        <div className="nm-raised rounded-[50px] p-10 space-y-8">
          <div className="flex items-center gap-3">
             <div className="nm-raised-sm p-3 rounded-2xl text-sage">
                <Clock size={20} />
             </div>
             <h3 className="font-serif text-2xl font-bold text-text-main">Đơn hàng gần đây</h3>
          </div>
          
          <div className="space-y-6">
            {data.recentOrders.length === 0 ? (
                <p className="text-sm text-text-muted italic px-4">Chưa có đơn hàng nào.</p>
            ) : (
                data.recentOrders.map((order: any) => (
                    <div key={order.ma_dh} className="nm-inset p-6 rounded-3xl flex items-center justify-between group hover:nm-raised transition-all">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-sage">#{order.ma_dh}</span>
                            <div>
                                <p className="text-sm font-bold text-text-main">{order.ten_kh || 'Khách vãng lai'}</p>
                                <p className="text-[9px] text-text-muted uppercase tracking-widest mt-1">
                                    {new Date(order.ngay_dh).toLocaleTimeString('vi-VN')}
                                </p>
                            </div>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            order.hien_trang === 0 ? 'bg-yellow-400/10 text-yellow-600' : 'bg-green-400/10 text-green-600'
                        }`}>
                            {order.hien_trang === 0 ? 'Đang xử lý' : 'Đã giao'}
                        </span>
                    </div>
                ))
            )}
          </div>
        </div>

        {/* NEW USERS */}
        <div className="nm-raised rounded-[50px] p-10 space-y-8">
          <div className="flex items-center gap-3">
             <div className="nm-raised-sm p-3 rounded-2xl text-sage">
                <UserPlus size={20} />
             </div>
             <h3 className="font-serif text-2xl font-bold text-text-main">Người dùng mới</h3>
          </div>
          
          <div className="space-y-6">
            {data.newUsers.map((user: any) => (
                <div key={user.ma_kh} className="flex items-center gap-6 px-4">
                    <div className="nm-raised-sm w-14 h-14 rounded-full flex items-center justify-center text-text-muted">
                        <Users size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-text-main">{user.ten_dn} ({user.ten_kh})</p>
                        <p className="text-[9px] text-text-muted uppercase tracking-widest mt-1">Mã KH: #{user.ma_kh}</p>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
