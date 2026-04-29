import sql from "@/lib/db";
import { ShoppingBag, User, MapPin, Phone, Mail, Calendar, CheckCircle, Clock, Undo2, ChevronRight, Flower2 } from 'lucide-react';
import Link from 'next/link';
import { updateOrderStatus } from "@/app/actions/order";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const ma_dh = parseInt(id);

  // 1. Fetch Order and Customer info
  const orderResult = await sql`
    SELECT dh.*, kh.ho_kh, kh.ten_kh, kh.sdt, kh.email, kh.dia_chi as customer_address
    FROM don_dat_hang dh
    JOIN khach_hang kh ON dh.ma_kh = kh.ma_kh
    WHERE dh.ma_dh = ${ma_dh}
  `;

  if (orderResult.length === 0) notFound();
  const order = orderResult[0];

  // 2. Fetch Order Items
  const items = await sql`
    SELECT ct.*, h.ten_hoa, h.hinh_anh
    FROM ct_don_dat_hang ct
    JOIN hoa h ON ct.ma_hoa = h.ma_hoa
    WHERE ct.ma_dh = ${ma_dh}
  `;

  const totalValue = items.reduce((sum, item) => sum + (item.gia_ban * item.sl_dat), 0);

  // Bind the action
  const confirmDelivery = updateOrderStatus.bind(null, ma_dh, 1);

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
            <Link href="/quan-tri/don-hang" className="nm-raised w-14 h-14 rounded-2xl flex items-center justify-center text-text-muted hover:text-sage transition-colors">
                <Undo2 size={20} />
            </Link>
            <div>
                <h1 className="font-serif text-4xl font-bold text-text-main">Chi Tiết Đơn Hàng</h1>
                <p className="text-text-muted italic mt-1 opacity-60">Đơn hàng số: <span className="text-sage font-bold">#{order.ma_dh}</span></p>
            </div>
        </div>
        <div className={`nm-raised px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest ${
            order.hien_trang === 0 ? 'text-yellow-600' : 'text-green-600'
        }`}>
            {order.hien_trang === 0 ? <Clock size={16} /> : <CheckCircle size={16} />}
            {order.hien_trang === 0 ? 'Đang xử lý' : 'Đã hoàn thành'}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left Column: Customer Info */}
        <div className="lg:col-span-1 space-y-8">
            <div className="nm-raised rounded-[40px] p-10 space-y-8">
                <div className="flex items-center gap-3 text-sage">
                    <User size={20} />
                    <h2 className="text-[10px] font-black uppercase tracking-widest">Thông tin khách hàng</h2>
                </div>
                
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="nm-inset w-10 h-10 rounded-xl flex items-center justify-center text-text-muted shrink-0">
                            <User size={16} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Họ tên</p>
                            <p className="text-sm font-bold text-text-main">{order.ho_kh} {order.ten_kh}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="nm-inset w-10 h-10 rounded-xl flex items-center justify-center text-text-muted shrink-0">
                            <Phone size={16} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Số điện thoại</p>
                            <p className="text-sm font-bold text-text-main">{order.sdt}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="nm-inset w-10 h-10 rounded-xl flex items-center justify-center text-text-muted shrink-0">
                            <Mail size={16} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Email</p>
                            <p className="text-sm font-bold text-text-main">{order.email}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="nm-inset w-10 h-10 rounded-xl flex items-center justify-center text-text-muted shrink-0">
                            <MapPin size={16} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Địa chỉ giao hàng</p>
                            <p className="text-sm font-bold text-text-main leading-relaxed">{order.noi_giao}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="nm-inset p-10 rounded-[40px] space-y-6">
                <div className="flex items-center gap-3 text-text-muted">
                    <Calendar size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Lịch sử đơn hàng</span>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-text-muted">Ngày đặt:</span>
                        <span className="font-bold text-text-main">{new Date(order.ngay_dh).toLocaleString('vi-VN')}</span>
                    </div>
                    {order.ngay_gh && (
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-text-muted">Ngày giao:</span>
                            <span className="font-bold text-text-main">{new Date(order.ngay_gh).toLocaleString('vi-VN')}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Right Column: Order Items */}
        <div className="lg:col-span-2 space-y-10">
            <div className="nm-raised rounded-[50px] overflow-hidden">
                <div className="bg-sage/5 p-10 flex items-center gap-4 border-b border-black/5">
                    <ShoppingBag className="text-sage" size={24} />
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">Sản phẩm trong đơn hàng</h2>
                </div>
                
                <div className="p-4">
                    <div className="space-y-4">
                        {items.map((item, idx) => (
                            <div key={idx} className="nm-inset p-6 rounded-[35px] flex items-center justify-between group hover:nm-raised transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 nm-raised p-2 rounded-2xl flex-shrink-0">
                                        <img src={item.hinh_anh} alt={item.ten_hoa} className="w-full h-full object-cover rounded-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text-main text-sm">{item.ten_hoa}</h3>
                                        <p className="text-[10px] text-text-muted font-black uppercase tracking-widest mt-1">
                                            {new Intl.NumberFormat('vi-VN').format(item.gia_ban)} đ × {item.sl_dat}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right px-6">
                                    <p className="text-xs font-black text-sage">
                                        {new Intl.NumberFormat('vi-VN').format(item.gia_ban * item.sl_dat)} đ
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-10 bg-sage/5 border-t border-black/5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em]">Tổng giá trị đơn hàng</p>
                            <p className="text-4xl font-serif font-black text-text-main mt-2">
                                {new Intl.NumberFormat('vi-VN').format(totalValue)} <span className="text-sm font-sans font-bold">VNĐ</span>
                            </p>
                        </div>
                        {order.hien_trang === 0 ? (
                            <form action={confirmDelivery}>
                                <button className="nm-button-sage px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:scale-105 transition-transform flex items-center gap-3">
                                    <CheckCircle size={18} /> Xác nhận đã giao
                                </button>
                            </form>
                        ) : (
                            <div className="nm-inset px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-sage flex items-center gap-3">
                                <CheckCircle size={18} /> Hoàn tất đơn hàng
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
