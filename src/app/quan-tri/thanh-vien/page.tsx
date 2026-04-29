import sql from "@/lib/db";
import { Users, Search } from 'lucide-react';
import Link from 'next/link';
import MemberDeleteBtn from "@/components/MemberDeleteBtn";

export const dynamic = 'force-dynamic';

export default async function AdminMembers() {
  let members: any[] = [];
  try {
    members = await sql`SELECT * FROM khach_hang ORDER BY ma_kh ASC`;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-4xl font-bold text-[#2D3436]">Quản Lý Khách Hàng</h1>
        
        <div className="flex gap-4">
            <div className="nm-inset px-6 py-3 rounded-2xl flex items-center gap-4 bg-white/50">
                <span className="text-[10px] font-black text-sage uppercase tracking-widest whitespace-nowrap">Nhập Tên Đăng Nhập:</span>
                <input type="text" className="bg-transparent border-none outline-none text-xs text-text-main w-48" />
                <button className="nm-raised-sm px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-[#2D3436] hover:text-sage">Tìm</button>
            </div>
            <div className="nm-raised px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-sage">
                {members.length} Khách hàng
            </div>
        </div>
      </div>

      <div className="nm-raised rounded-[40px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sage text-white">
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] border-r border-white/20 w-20">STT</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] border-r border-white/20">Tên Khách Hàng</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] border-r border-white/20">Tên Đăng Nhập</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 bg-white/40">
              {members.map((m, index) => (
                <tr key={m.ma_kh} className="hover:bg-white transition-colors group">
                  <td className="px-10 py-8 text-xs font-bold text-text-muted border-r border-black/5">{index + 1}</td>
                  <td className="px-10 py-8 border-r border-black/5">
                    <p className="font-bold text-[#2D3436]">{m.ho_kh} {m.ten_kh}</p>
                    <p className="text-[9px] text-[#2D3436] opacity-50 uppercase tracking-widest mt-1">Mã KH: {m.ma_kh}</p>
                  </td>
                  <td className="px-10 py-8 text-sm font-medium text-[#2D3436] opacity-70 border-r border-black/5">
                    {m.ten_dn}
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex gap-4">
                      <Link href={`/quan-tri/thanh-vien/${m.ma_kh}`} className="nm-raised px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-sage hover:text-[#2D3436] transition-all">
                        Xem
                      </Link>
                      <MemberDeleteBtn id={m.ma_kh} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
