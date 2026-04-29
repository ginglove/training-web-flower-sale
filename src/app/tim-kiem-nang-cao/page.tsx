import sql from "@/lib/db";
import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import Link from "next/link";
import AddToCart from "@/components/AddToCart";

export const dynamic = 'force-dynamic';

export default async function AdvancedSearch({
  searchParams,
}: {
  searchParams: { ten?: string; mota?: string; loai?: string };
}) {
  const params = await searchParams;
  const { ten = '', mota = '', loai = '' } = params;
  
  let categories: any[] = [];
  let results: any[] = [];

  try {
    categories = await sql`SELECT * FROM loai_hoa ORDER BY ten_loai ASC`;
    
    if (ten || mota || loai) {
      results = await sql`
        SELECT h.*, l.ten_loai 
        FROM hoa h 
        LEFT JOIN loai_hoa l ON h.ma_loai = l.ma_loai
        WHERE 1=1
        ${ten ? sql`AND h.ten_hoa ILIKE ${'%' + ten + '%'}` : sql``}
        ${mota ? sql`AND h.mo_ta ILIKE ${'%' + mota + '%'}` : sql``}
        ${loai ? sql`AND h.ma_loai = ${parseInt(loai)}` : sql``}
      `;
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-12 gap-16">
        <aside className="lg:col-span-3">
          <SidebarLeft currentLoai={loai} />
        </aside>

        <main className="lg:col-span-6 space-y-12">
          {/* SEARCH FORM (Standardized Design) */}
          <div className="nm-raised rounded-[40px] overflow-hidden">
            <div className="bg-sage px-8 py-5">
              <h2 className="text-white text-center font-black text-xs uppercase tracking-[0.3em]">Tìm Kiếm Nâng Cao</h2>
            </div>
            
            <div className="p-10 space-y-8">
              <form action="/tim-kiem-nang-cao" method="GET" className="space-y-6 max-w-lg mx-auto">
                <div className="grid grid-cols-3 items-center gap-6">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest text-right">Tên Sản Phẩm</label>
                  <input name="ten" defaultValue={ten} className="col-span-2 nm-inset px-5 py-3 rounded-xl outline-none text-sm text-text-main" placeholder="..." />
                </div>
                <div className="grid grid-cols-3 items-center gap-6">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest text-right">Mô Tả</label>
                  <input name="mota" defaultValue={mota} className="col-span-2 nm-inset px-5 py-3 rounded-xl outline-none text-sm text-text-main" placeholder="..." />
                </div>
                <div className="grid grid-cols-3 items-center gap-6">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest text-right">Loại Hoa</label>
                  <div className="col-span-2 nm-inset rounded-xl px-2">
                    <select name="loai" defaultValue={loai} className="w-full bg-transparent px-3 py-3 text-sm text-text-main outline-none appearance-none cursor-pointer">
                        <option value="">Tất cả các loài</option>
                        {categories.map(c => <option key={c.ma_loai} value={c.ma_loai}>{c.ten_loai}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex justify-center pt-6">
                  <button type="submit" className="nm-button px-16 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-text-main hover:scale-105 transition-transform">
                    Tìm Kiếm
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RESULTS (Standardized Design) */}
          {results.length > 0 && (
            <div className="space-y-10">
              <div className="flex items-center gap-4 px-6">
                <div className="h-[1px] flex-1 bg-text-muted/10"></div>
                <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Kết quả ({results.length})</span>
                <div className="h-[1px] flex-1 bg-text-muted/10"></div>
              </div>
              
              <div className="space-y-8">
                {results.map(p => (
                  <div key={p.ma_hoa} className="nm-raised rounded-[40px] p-8 group transition-all hover:shadow-2xl">
                    <div className="flex flex-col md:flex-row gap-10">
                      <div className="w-full md:w-56 h-56 nm-inset p-3 rounded-[35px] overflow-hidden flex-shrink-0">
                        <img src={p.hinh_anh} alt={p.ten_hoa} className="w-full h-full object-cover rounded-[25px] group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex-1 space-y-4 pt-2">
                        <div>
                            <span className="text-[10px] font-black text-sage uppercase tracking-widest mb-1 block">{p.ten_loai}</span>
                            <h3 className="font-serif text-3xl font-bold text-text-main group-hover:text-sage transition-colors">{p.ten_hoa}</h3>
                        </div>
                        <p className="text-lg font-black text-text-main tracking-tighter">
                            {new Intl.NumberFormat('vi-VN').format(p.gia)} đ
                        </p>
                        <p className="text-xs text-text-muted leading-relaxed italic line-clamp-3">{p.mo_ta}</p>
                        <div className="pt-6 flex items-center gap-8">
                          <Link href={`/hoa/${p.ma_hoa}`} className="text-[10px] font-black text-sage uppercase tracking-widest hover:underline underline-offset-8">
                            Chi tiết
                          </Link>
                          <AddToCart product={p} variant="button" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        <aside className="lg:col-span-3">
          <SidebarRight />
        </aside>
      </div>
    </div>
  );
}
