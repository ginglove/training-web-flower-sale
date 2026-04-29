import sql from "@/lib/db";
import { Plus, Trash2, Edit3, Flower2, Tag, DollarSign, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import DeleteProductBtn from "@/components/DeleteProductBtn";

export const dynamic = 'force-dynamic';

export default async function AdminProducts({
  searchParams,
}: {
  searchParams: { keyword?: string; loai?: string };
}) {
  const params = await searchParams;
  const keyword = params.keyword || '';
  const loai = params.loai || '';

  let products: any[] = [];
  let categories: any[] = [];
  
  try {
    categories = await sql`SELECT * FROM loai_hoa ORDER BY ten_loai ASC`;
    
    products = await sql`
      SELECT h.*, l.ten_loai 
      FROM hoa h 
      LEFT JOIN loai_hoa l ON h.ma_loai = l.ma_loai 
      WHERE (h.ten_hoa ILIKE ${'%' + keyword + '%'})
      ${loai ? sql`AND h.ma_loai = ${loai}` : sql``}
      ORDER BY h.ngay_d DESC
    `;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="font-serif text-4xl font-bold text-text-main">Quản Lý Hoa</h1>
           <p className="text-text-muted italic mt-1 opacity-60">Danh mục sản phẩm boutique của bạn.</p>
        </div>
        <Link href="/quan-tri/hoa/them" className="nm-raised px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-sage hover:scale-105 transition-transform">
          <Plus size={16} /> Thêm hoa mới
        </Link>
      </div>

      {/* SEARCH & FILTER TOOLBAR */}
      <div className="nm-raised rounded-[30px] p-8">
        <form className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-4 mb-2 block">Tìm kiếm tên hoa</label>
            <div className="relative">
              <input 
                name="keyword" 
                defaultValue={keyword}
                placeholder="Nhập tên hoa để tìm..." 
                className="w-full nm-inset px-6 py-4 rounded-2xl outline-none text-xs text-text-main"
              />
            </div>
          </div>
          <div className="w-full md:w-64">
            <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-4 mb-2 block">Lọc theo loại</label>
            <select 
              name="loai" 
              defaultValue={loai}
              className="w-full nm-inset px-6 py-4 rounded-2xl outline-none text-xs text-text-main appearance-none bg-transparent"
            >
              <option value="">Tất cả loại hoa</option>
              {categories.map(c => (
                <option key={c.ma_loai} value={c.ma_loai}>{c.ten_loai}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" className="nm-button px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-sage hover:text-sage-dark transition-all">
              Áp Dụng
            </button>
          </div>
        </form>
      </div>

      <div className="nm-raised rounded-[40px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-sage/10">
                <th className="px-10 py-6 text-[10px] font-black text-sage uppercase tracking-[0.2em]">Sản phẩm</th>
                <th className="px-10 py-6 text-[10px] font-black text-sage uppercase tracking-[0.2em]">Loại</th>
                <th className="px-10 py-6 text-[10px] font-black text-sage uppercase tracking-[0.2em]">Giá bán</th>
                <th className="px-10 py-6 text-[10px] font-black text-sage uppercase tracking-[0.2em]">Trạng thái</th>
                <th className="px-10 py-6 text-[10px] font-black text-sage uppercase tracking-[0.2em] text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-20 text-center text-text-muted italic">Chưa có sản phẩm nào trong cửa hàng.</td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.ma_hoa} className="hover:bg-white/40 transition-colors group">
                    <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 nm-inset p-2 rounded-2xl overflow-hidden flex-shrink-0">
                                <img src={p.hinh_anh} alt={p.ten_hoa} className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div>
                                <p className="font-bold text-text-main text-sm">{p.ten_hoa}</p>
                                <p className="text-[10px] text-text-muted uppercase tracking-widest mt-1">Mã: #{p.ma_hoa}</p>
                            </div>
                        </div>
                    </td>
                    <td className="px-10 py-8">
                        <span className="nm-inset px-4 py-1.5 rounded-lg text-[10px] font-black text-text-muted uppercase tracking-widest">
                            {p.ten_loai}
                        </span>
                    </td>
                    <td className="px-10 py-8">
                        <p className="font-black text-text-main text-sm">{new Intl.NumberFormat('vi-VN').format(p.gia)} đ</p>
                    </td>
                    <td className="px-10 py-8">
                        <div className="flex items-center gap-2">
                            {p.trang_thai === 1 ? (
                                <span className="flex items-center gap-2 text-[10px] font-black text-sage uppercase tracking-widest">
                                    <Eye size={12} /> Hiển thị
                                </span>
                            ) : (
                                <span className="flex items-center gap-2 text-[10px] font-black text-red-400 uppercase tracking-widest">
                                    <EyeOff size={12} /> Đã ẩn
                                </span>
                            )}
                        </div>
                    </td>
                    <td className="px-10 py-8">
                        <div className="flex gap-4 justify-end">
                            <Link href={`/quan-tri/hoa/sua/${p.ma_hoa}`} className="nm-button w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-sage transition-colors">
                                <Edit3 size={16} />
                            </Link>
                            <DeleteProductBtn id={p.ma_hoa} />
                        </div>
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
