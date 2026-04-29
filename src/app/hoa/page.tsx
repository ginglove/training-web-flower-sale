import sql from "@/lib/db";
import Link from "next/link";
import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import ProductSort from "@/components/ProductSort";
import AddToCart from "@/components/AddToCart";

export const dynamic = 'force-dynamic';

export default async function ProductList({
  searchParams,
}: {
  searchParams: { keyword?: string; loai?: string; gia?: string; sort?: string };
}) {
  // Await searchParams for Next.js 15+ compatibility
  const params = await searchParams;
  const keyword = params.keyword || '';
  const loai = params.loai || '';
  const gia = params.gia || '';
  const sort = params.sort || 'newest';

  let products: any[] = [];
  
  try {
    // Base Query - Selecting necessary fields
    let query = sql`
      SELECT h.*, l.ten_loai 
      FROM hoa h 
      LEFT JOIN loai_hoa l ON h.ma_loai = l.ma_loai
      WHERE 1=1
    `;

    // Filter by Keyword
    if (keyword) {
      query = sql`${query} AND (h.ten_hoa ILIKE ${'%' + keyword + '%'} OR h.mo_ta ILIKE ${'%' + keyword + '%'})`;
    }

    // Filter by Category (loai) - CRITICAL FIX: Ensuring it uses the correct column
    if (loai) {
      query = sql`${query} AND h.ma_loai = ${parseInt(loai)}`;
    }

    // Filter by Price (gia)
    if (gia === '0-100000') {
      query = sql`${query} AND h.gia < 100000`;
    } else if (gia === '100000-200000') {
      query = sql`${query} AND h.gia BETWEEN 100000 AND 200000`;
    } else if (gia === '200000-500000') {
      query = sql`${query} AND h.gia BETWEEN 200000 AND 500000`;
    } else if (gia === '500000-up') {
      query = sql`${query} AND h.gia > 500000`;
    }

    // Sorting
    if (sort === 'price_asc') {
      query = sql`${query} ORDER BY h.gia ASC`;
    } else if (sort === 'price_desc') {
      query = sql`${query} ORDER BY h.gia DESC`;
    } else {
      query = sql`${query} ORDER BY h.ngay_d DESC`;
    }

    products = await query;
  } catch (error) {
    console.error("DB fetch failed", error);
  }

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16">
        {/* LEFT SIDEBAR */}
        <aside className="lg:col-span-3">
          <SidebarLeft currentLoai={loai} />
        </aside>

        {/* CENTER CONTENT */}
        <main className="lg:col-span-6 space-y-12">
          {/* Header Section */}
          <div className="nm-raised rounded-[40px] p-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-left">
              <h1 className="font-serif text-4xl font-black text-text-main leading-none">
                {keyword ? `Kết quả cho "${keyword}"` : 'Bộ Sưu Tập Hoa'}
              </h1>
              <p className="text-[10px] font-black text-sage uppercase tracking-[0.3em] mt-3 opacity-60">
                {products.length} sản phẩm tinh hoa được tìm thấy
              </p>
            </div>
            <ProductSort currentSort={sort} />
          </div>

          {/* Product Grid */}
          {products.length === 0 ? (
            <div className="nm-inset rounded-[50px] p-24 text-center">
              <div className="text-7xl mb-8 opacity-40">🍃</div>
              <p className="text-text-muted font-bold text-lg italic">Hiện chưa có sản phẩm nào trong danh mục này.</p>
              <Link href="/hoa" className="mt-8 inline-block text-sage font-black text-[11px] uppercase tracking-[0.2em] hover:tracking-[0.3em] transition-all">
                Khám phá tất cả các loài hoa →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {products.map((p) => (
                <div key={p.ma_hoa} className="flex flex-col group cursor-pointer relative">
                  <div className="nm-raised rounded-[60px] p-4 overflow-hidden aspect-[4/5] relative transition-all duration-500 hover:shadow-2xl">
                    <img 
                      src={p.hinh_anh} 
                      alt={p.ten_hoa} 
                      className="w-full h-full object-cover rounded-[50px] group-hover:scale-110 transition-transform duration-1000" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sage/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Add to Cart Icon Component */}
                    <AddToCart product={p} />
                    
                    <Link href={`/hoa/${p.ma_hoa}`} className="absolute inset-0 z-10"></Link>
                  </div>
                  <div className="mt-10 px-6 text-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-sage mb-3 block">{p.ten_loai}</span>
                    <h3 className="font-serif text-3xl font-bold text-text-main mb-3 group-hover:text-sage transition-colors line-clamp-1">
                      {p.ten_hoa}
                    </h3>
                    <p className="text-text-main font-black text-lg tracking-tighter mb-8">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.gia)}
                    </p>
                    <AddToCart product={p} variant="button" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center gap-6 pt-16 pb-24">
            {[1, 2].map(n => (
              <button key={n} className={`w-12 h-12 rounded-full font-black text-xs transition-all ${n === 1 ? 'nm-inset text-sage scale-110' : 'nm-raised text-text-muted hover:text-text-main hover:scale-105'}`}>
                {n}
              </button>
            ))}
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="lg:col-span-3">
          <SidebarRight />
        </aside>
      </div>
    </div>
  );
}
