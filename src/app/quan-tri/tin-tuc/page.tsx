import sql from "@/lib/db";
import { Newspaper, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import NewsItemActions from "@/components/NewsItemActions";

export const dynamic = 'force-dynamic';

export default async function AdminNews() {
  let news: any[] = [];
  try {
    news = await sql`SELECT * FROM tin_tuc ORDER BY ma_tt DESC`;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-4xl font-bold text-[#2D3436]">Quản Lý Tin Tức</h1>
        
        <div className="flex gap-4">
            <div className="nm-inset px-6 py-3 rounded-2xl flex items-center gap-4 bg-white/50">
                <span className="text-[10px] font-black text-sage uppercase tracking-widest whitespace-nowrap">Tìm Kiếm Tin:</span>
                <input type="text" className="bg-transparent border-none outline-none text-xs text-text-main w-48" />
                <button className="nm-raised-sm px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-[#2D3436] hover:text-sage">Tìm</button>
            </div>
            <Link href="/quan-tri/tin-tuc/dang-tin" className="nm-raised px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-sage hover:scale-105 transition-transform">
                <Plus size={16} /> Thêm Tin Tức Mới
            </Link>
        </div>
      </div>

      <div className="nm-raised rounded-[40px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sage text-white">
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] border-r border-white/20 w-20">STT</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] border-r border-white/20 w-32">Mã Tin Tức</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] border-r border-white/20">Tiêu Đề</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em]">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 bg-white/40">
              {news.length === 0 ? (
                <tr>
                    <td colSpan={4} className="px-10 py-20 text-center text-text-muted italic">Chưa có bản tin nào.</td>
                </tr>
              ) : (
                news.map((item, index) => (
                  <tr key={item.ma_tt} className="hover:bg-white transition-colors group">
                    <td className="px-10 py-8 text-xs font-bold text-text-muted border-r border-black/5">{index + 1}</td>
                    <td className="px-10 py-8 text-xs font-bold text-sage border-r border-black/5">#{item.ma_tt}</td>
                    <td className="px-10 py-8 border-r border-black/5">
                        <p className="font-bold text-[#2D3436] line-clamp-1">{item.tieu_de}</p>
                    </td>
                    <td className="px-10 py-8">
                        <NewsItemActions id={item.ma_tt} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
