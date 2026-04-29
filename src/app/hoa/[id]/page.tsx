import sql from "@/lib/db";
import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import Link from "next/link";
import { ChevronLeft, Heart, Share2 } from 'lucide-react';
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";

export const dynamic = 'force-dynamic';

export default async function FlowerDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  
  let flower: any = null;
  let relatedFlowers: any[] = [];

  try {
    const results = await sql`
      SELECT h.*, l.ten_loai 
      FROM hoa h 
      LEFT JOIN loai_hoa l ON h.ma_loai = l.ma_loai 
      WHERE h.ma_hoa = ${parseInt(id)}
    `;
    
    if (results.length === 0) return notFound();
    flower = results[0];

    relatedFlowers = await sql`
      SELECT * FROM hoa 
      WHERE ma_loai = ${flower.ma_loai} AND ma_hoa != ${flower.ma_hoa} 
      LIMIT 4
    `;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16">
        <aside className="lg:col-span-3">
          <SidebarLeft currentLoai={flower.ma_loai.toString()} />
        </aside>

        <main className="lg:col-span-6 space-y-12">
          {/* Back Link */}
          <Link href="/hoa" className="inline-flex items-center gap-2 text-[10px] font-black text-sage uppercase tracking-[0.2em] hover:translate-x-[-4px] transition-transform">
            <ChevronLeft size={14} /> Quay lại danh sách
          </Link>

          {/* Product Section */}
          <div className="nm-raised rounded-[60px] p-10 bg-white/20">
            <div className="flex flex-col gap-12">
              {/* Image */}
              <div className="nm-inset p-4 rounded-[50px] overflow-hidden aspect-square shadow-inner">
                <img src={flower.hinh_anh} alt={flower.ten_hoa} className="w-full h-full object-cover rounded-[40px]" />
              </div>

              {/* Info */}
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] font-black text-sage uppercase tracking-[0.3em] mb-3 block">{flower.ten_loai}</span>
                  <h1 className="font-serif text-5xl font-bold text-text-main leading-tight">{flower.ten_hoa}</h1>
                  <p className="text-3xl font-black text-text-main tracking-tighter mt-4">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(flower.gia)}
                  </p>
                </div>

                <div className="h-[1px] w-full bg-text-muted/10"></div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-text-muted uppercase tracking-widest">Mô tả sản phẩm</h3>
                  <p className="text-sm text-text-main leading-relaxed italic opacity-80">
                    {flower.mo_ta || "Hương thơm dịu nhẹ, sắc hoa tươi thắm, món quà hoàn hảo cho những dịp đặc biệt."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-6 pt-6">
                  <AddToCart product={flower} variant="button" />
                  <button className="nm-button w-16 h-16 rounded-full flex items-center justify-center text-text-muted hover:text-red-400 transition-colors">
                    <Heart size={20} />
                  </button>
                  <button className="nm-button w-16 h-16 rounded-full flex items-center justify-center text-text-muted hover:text-sage transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="space-y-10 pt-12">
            <h2 className="font-serif text-3xl font-bold text-text-main text-center">Hoa cùng loại</h2>
            <div className="grid grid-cols-2 gap-8">
              {relatedFlowers.map(rf => (
                <Link key={rf.ma_hoa} href={`/hoa/${rf.ma_hoa}`} className="group space-y-4 text-center">
                  <div className="nm-raised p-2 rounded-[40px] aspect-square overflow-hidden">
                    <img src={rf.hinh_anh} alt={rf.ten_hoa} className="w-full h-full object-cover rounded-[30px] group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <h4 className="font-bold text-sm text-text-main group-hover:text-sage transition-colors">{rf.ten_hoa}</h4>
                </Link>
              ))}
            </div>
          </div>
        </main>

        <aside className="lg:col-span-3">
          <SidebarRight />
        </aside>
      </div>
    </div>
  );
}
