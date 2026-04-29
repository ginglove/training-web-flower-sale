import sql from "@/lib/db";
import { Undo2, User, Phone, Mail, MapPin, ShieldCheck, ShoppingBag, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from "next/navigation";
import MemberDeleteBtn from "@/components/MemberDeleteBtn";

export const dynamic = 'force-dynamic';

export default async function MemberDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const ma_kh = parseInt(id);

  // 1. Fetch Member Info
  const memberResult = await sql`SELECT * FROM khach_hang WHERE ma_kh = ${ma_kh}`;
  if (memberResult.length === 0) notFound();
  const member = memberResult[0];

  // 2. Fetch Member Orders
  const orders = await sql`
    SELECT * FROM don_dat_hang 
    WHERE ma_kh = ${ma_kh} 
    ORDER BY ngay_dh DESC
  `;

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
            <Link href="/quan-tri/thanh-vien" className="nm-raised w-14 h-14 rounded-2xl flex items-center justify-center text-[#2D3436] hover:text-sage transition-colors">
                <Undo2 size={20} />
            </Link>
            <div>
                <h1 className="font-serif text-4xl font-bold text-[#2D3436]">Thông Tin Chi Tiết Thành Viên</h1>
                <p className="text-text-muted italic mt-1 opacity-60">Khách hàng: <span className="text-sage font-bold">{member.ho_kh} {member.ten_kh}</span></p>
            </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left Column: Full Profile Info */}
        <div className="lg:col-span-1 space-y-8">
            <div className="nm-raised rounded-[40px] overflow-hidden">
                <div className="bg-sage p-8 text-center">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Thông Tin Chi Tiết Của Khách Hàng: {member.ten_kh}</h2>
                </div>
                
                <div className="p-10 space-y-8">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-black/5 pb-4">
                            <span className="text-[10px] font-black text-sage uppercase tracking-widest">Tên Tài Khoản:</span>
                            <span className="text-sm font-bold text-[#2D3436]">{member.ten_dn}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-black/5 pb-4">
                            <span className="text-[10px] font-black text-sage uppercase tracking-widest">Mật Khẩu:</span>
                            <span className="text-sm font-bold text-[#2D3436]">****</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-black/5 pb-4">
                            <span className="text-[10px] font-black text-sage uppercase tracking-widest">Họ Và Tên:</span>
                            <span className="text-sm font-bold text-[#2D3436]">{member.ho_kh} {member.ten_kh}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-black/5 pb-4">
                            <span className="text-[10px] font-black text-sage uppercase tracking-widest">Địa Chỉ:</span>
                            <span className="text-sm font-bold text-[#2D3436]">{member.dia_chi}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-black/5 pb-4">
                            <span className="text-[10px] font-black text-sage uppercase tracking-widest">Số Điện Thoại:</span>
                            <span className="text-sm font-bold text-[#2D3436]">{member.sdt}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-black/5 pb-4">
                            <span className="text-[10px] font-black text-sage uppercase tracking-widest">Email:</span>
                            <span className="text-sm font-bold text-[#2D3436]">{member.email}</span>
                        </div>
                        <div className="flex justify-between items-center pb-4">
                            <span className="text-[10px] font-black text-sage uppercase tracking-widest">Giới Tính:</span>
                            <span className="text-sm font-bold text-[#2D3436]">{member.phai === 0 ? 'Nữ' : 'Nam'}</span>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-black/5 flex flex-col items-center gap-4">
                        <MemberDeleteBtn id={member.ma_kh} />
                        <span className="text-[10px] font-black text-red-400 uppercase tracking-widest italic">Xóa Khách Hàng Này</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column: Order History Breakdown */}
        <div className="lg:col-span-2 space-y-10">
            <div className="nm-raised rounded-[50px] overflow-hidden">
                <div className="bg-sage/5 p-10 flex items-center justify-between border-b border-black/5">
                    <div className="flex items-center gap-4">
                        <ShoppingBag className="text-sage" size={24} />
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2D3436]">Lịch sử giao dịch boutique</h2>
                    </div>
                    <span className="nm-inset px-6 py-2 rounded-full text-[10px] font-black text-sage uppercase tracking-widest">
                        {orders.length} Đơn hàng
                    </span>
                </div>
                
                <div className="p-8">
                    {orders.length === 0 ? (
                        <div className="py-20 text-center space-y-4">
                            <div className="w-16 h-16 nm-inset rounded-full flex items-center justify-center mx-auto text-sage opacity-20 mb-6">
                                <ShoppingBag size={30} />
                            </div>
                            <p className="text-text-muted italic">Thành viên này chưa có lịch sử mua sắm.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <Link 
                                    key={order.ma_dh} 
                                    href={`/quan-tri/don-hang/${order.ma_dh}`}
                                    className="nm-inset p-8 rounded-[40px] flex items-center justify-between group hover:nm-raised transition-all"
                                >
                                    <div className="flex items-center gap-8">
                                        <div className="nm-raised w-14 h-14 rounded-2xl flex items-center justify-center text-sage">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-sage uppercase tracking-widest">Mã ĐH #{order.ma_dh}</p>
                                            <p className="text-sm font-bold text-[#2D3436] mt-1">{new Date(order.ngay_dh).toLocaleDateString('vi-VN')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-10">
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Hiện trạng</p>
                                            <p className={`text-xs font-bold mt-1 ${order.hien_trang === 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                                                {order.hien_trang === 0 ? 'Đang xử lý' : 'Đã giao'}
                                            </p>
                                        </div>
                                        <ChevronRight size={20} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
