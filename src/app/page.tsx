import Link from "next/link";
import sql from "@/lib/db";
import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let products: any[] = [];
  let news: any[] = [];
  try {
    products = await sql`
      SELECT h.*, l.ten_loai 
      FROM hoa h 
      LEFT JOIN loai_hoa l ON h.ma_loai = l.ma_loai 
      ORDER BY h.ngay_d DESC 
      LIMIT 4
    `;
    news = await sql`SELECT * FROM tin_tuc ORDER BY ngay_dang DESC LIMIT 1`;
  } catch (error) {
    console.error("DB fetch failed", error);
  }

  return (
    <div className="container mx-auto px-6">
      {/* --- EXPERT HERO SECTION --- */}
      <section className="relative mb-32 group">
        <div className="nm-raised rounded-[60px] p-2 overflow-hidden h-[500px] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-sage/20 to-petal/20 z-0"></div>
          {news.length > 0 ? (
            <img 
              src={news[0].hinh_anh} 
              alt="Floral Boutique" 
              className="w-full h-full object-cover rounded-[58px] opacity-90 group-hover:scale-105 transition-transform duration-1000"
            />
          ) : (
            <div className="w-full h-full bg-sage/10 rounded-[58px]"></div>
          )}
          
          {/* Hero Content Overlay */}
          <div className="absolute inset-0 flex items-center px-12 md:px-24 z-10">
            <div className="max-w-xl">
              <span className="nm-raised-sm px-4 py-1.5 rounded-full text-[10px] font-black text-sage uppercase tracking-widest bg-white/80 backdrop-blur-sm mb-6 inline-block">
                Xu hướng Mùa Xuân 2026
              </span>
              <h1 className="font-serif text-5xl md:text-7xl font-black text-text-main mb-6 leading-[0.9]">
                Đánh thức <br />
                <span className="text-sage italic">Giác quan</span>
              </h1>
              <p className="text-text-main/70 font-medium text-lg mb-10 leading-relaxed">
                Khám phá bộ sưu tập hoa tươi nghệ thuật được thiết kế riêng để tôn vinh những khoảnh khắc quý giá nhất của bạn.
              </p>
              <Link href="/hoa" className="nm-button-sage px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] inline-block">
                Khám phá ngay
              </Link>
            </div>
          </div>
        </div>
        
        {/* Asymmetrical Decorative Card */}
        <div className="hidden lg:block absolute -bottom-10 -right-10 w-80 nm-raised rounded-[40px] p-8 z-20 bg-white/90 backdrop-blur-xl rotate-3 hover:rotate-0 transition-transform duration-500">
          <div className="flex gap-4 items-center mb-4">
            <div className="w-12 h-12 nm-inset rounded-full flex items-center justify-center text-xl">✨</div>
            <h3 className="font-serif text-xl font-black text-text-main">Chất lượng</h3>
          </div>
          <p className="text-xs text-text-muted font-bold leading-relaxed tracking-wide">
            Từng nhành hoa được chọn lọc thủ công tại các trang trại hữu cơ, đảm bảo độ tươi từ 7-10 ngày.
          </p>
        </div>
      </section>

      {/* --- MAIN LAYOUT --- */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16">
        {/* LEFT SIDEBAR */}
        <aside className="lg:col-span-3 order-2 lg:order-1">
          <SidebarLeft />
        </aside>

        {/* CENTER CONTENT */}
        <main className="lg:col-span-6 order-1 lg:order-2 space-y-24">
          
          {/* Featured Title */}
          <div className="text-center relative">
            <h2 className="font-serif text-4xl font-black text-text-main relative z-10">Thiết Kế Mới Nhất</h2>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl text-sage/5 font-black uppercase pointer-events-none tracking-tighter">
              Boutique
            </div>
          </div>

          {/* Product Grid - Expert Variation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {products.map((p, idx) => (
              <div 
                key={p.ma_hoa} 
                className={`flex flex-col group ${idx % 2 !== 0 ? 'md:mt-12' : ''}`}
              >
                <div className="nm-raised rounded-[50px] p-3 overflow-hidden aspect-[4/5] relative">
                  <img 
                    src={p.hinh_anh} 
                    alt={p.ten_hoa} 
                    className="w-full h-full object-cover rounded-[40px] group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="nm-raised-sm w-12 h-12 rounded-full flex items-center justify-center bg-white/90 text-xl hover:bg-sage hover:text-white transition-colors">
                      🛒
                    </button>
                  </div>
                </div>
                <div className="mt-8 px-4 text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-sage mb-2 block">{p.ten_loai}</span>
                  <h3 className="font-serif text-2xl font-bold text-text-main mb-2 hover:text-sage transition-colors cursor-pointer">
                    {p.ten_hoa}
                  </h3>
                  <p className="text-text-main font-black tracking-tighter">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.gia)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pb-20">
            <Link href="/hoa" className="nm-button-petal px-12 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] inline-block">
              Xem toàn bộ sưu tập
            </Link>
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="lg:col-span-3 order-3">
          <SidebarRight />
        </aside>
      </div>
    </div>
  );
}
