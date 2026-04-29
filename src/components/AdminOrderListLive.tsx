"use client";

import { useState, useEffect } from 'react';
import { ShoppingBag, Eye, Trash2, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function AdminOrderListLive() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      setOrders(data.recentOrders);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="h-64 nm-inset rounded-[40px] animate-pulse"></div>;

  return (
    <div className="nm-raised rounded-[40px] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-sage/10">
              <th className="px-10 py-6 text-[10px] font-black text-sage uppercase tracking-[0.2em]">Mã ĐH</th>
              <th className="px-10 py-6 text-[10px] font-black text-sage uppercase tracking-[0.2em]">Khách Hàng</th>
              <th className="px-10 py-6 text-[10px] font-black text-sage uppercase tracking-[0.2em]">Ngày Đặt</th>
              <th className="px-10 py-6 text-[10px] font-black text-sage uppercase tracking-[0.2em]">Nơi Giao</th>
              <th className="px-10 py-6 text-[10px] font-black text-sage uppercase tracking-[0.2em]">Trạng Thái</th>
              <th className="px-10 py-6 text-[10px] font-black text-sage uppercase tracking-[0.2em]">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {orders.length === 0 ? (
                <tr>
                    <td colSpan={6} className="px-10 py-20 text-center text-text-muted italic">Chưa có đơn hàng nào.</td>
                </tr>
            ) : (
                orders.map((o) => (
                    <tr key={o.ma_dh} className="hover:bg-white/40 transition-colors group">
                        <td className="px-10 py-8 text-xs font-black text-sage">#{o.ma_dh}</td>
                        <td className="px-10 py-8">
                            <p className="font-bold text-text-main text-sm">{o.ten_kh || 'Khách vãng lai'}</p>
                        </td>
                        <td className="px-10 py-8 text-xs text-text-muted">
                            {new Date(o.ngay_dh).toLocaleDateString('vi-VN')}
                        </td>
                        <td className="px-10 py-8 text-xs text-text-muted truncate max-w-[200px]">
                            {o.noi_giao}
                        </td>
                        <td className="px-10 py-8">
                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${
                                o.hien_trang === 0 ? 'bg-yellow-400/10 text-yellow-600' : 'bg-green-400/10 text-green-600'
                            }`}>
                                {o.hien_trang === 0 ? <Clock size={10} /> : <CheckCircle size={10} />}
                                {o.hien_trang === 0 ? 'Đang xử lý' : 'Đã giao'}
                            </span>
                        </td>
                        <td className="px-10 py-8">
                            <div className="flex gap-4">
                                <Link href={`/quan-tri/don-hang/${o.ma_dh}`} className="nm-button-sage px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest text-white">
                                    Xem
                                </Link>
                                <button 
                                    onClick={async () => {
                                        if (window.confirm("Bạn có thực sự muốn xóa đơn hàng này không?")) {
                                            const { deleteOrder } = await import('@/app/actions/order');
                                            const res = await deleteOrder(o.ma_dh);
                                            if (res.success) {
                                                alert("Xóa đơn hàng thành công!");
                                                fetchOrders();
                                            } else {
                                                alert(res.error);
                                            }
                                        }
                                    }}
                                    className="nm-button w-10 h-10 rounded-xl flex items-center justify-center text-red-400 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
