import sql from "@/lib/db";
import { notFound } from "next/navigation";
import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import AddToCart from "@/components/AddToCart";
import { Calendar, Tag, Info } from 'lucide-react';

export default async function FlowerDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  let flower;
  try {
    const results = await sql`
      SELECT h.*, l.ten_loai 
      FROM hoa h 
      LEFT JOIN loai_hoa l ON h.ma_loai = l.ma_loai 
      WHERE h.ma_hoa = ${parseInt(id)}
    `;
    if (results.length === 0) return notFound();
    flower = results[0];
  } catch (error) {
    console.error("Failed to fetch flower details", error);
    return notFound();
  }

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16">
        {/* LEFT SIDEBAR */}
        <aside className="lg:col-span-3">
          <SidebarLeft currentLoai={flower.ma_loai.toString()} />
        </aside>

        {/* CENTER CONTENT - DETAIL CARD */}
        <main className="lg:col-span-6">
          <div className="nm-raised rounded-[40px] overflow-hidden mb-8">
            <div className="bg-sage/10 px-8 py-4 border-b border-white/40">
              <h2 className="text-sage font-black text-xs uppercase tracking-[0.3em]">
                3.3. Giới thiệu chi tiết sản phẩm
              </h2>
            </div>
          </div>

          <div className="nm-raised rounded-[80px] overflow-hidden p-12 md:p-16 bg-white/40 backdrop-blur-sm relative">
            {/* Header / Title from Requirement */}
            <div className="text-center mb-12">
               <h3 className="nm-inset-sm inline-block px-8 py-2 rounded-full text-text-muted font-bold text-xs mb-6">
                 {flower.ten_hoa}
               </h3>
               <h1 className="font-serif text-4xl md:text-5xl font-black text-sage leading-tight mb-2">
                 {flower.ten_hoa}
               </h1>
               <div className="h-1 w-20 bg-sage/20 mx-auto rounded-full"></div>
            </div>

            {/* Main Image in Inset Well */}
            <div className="nm-inset rounded-[60px] p-4 mb-16 aspect-square max-w-md mx-auto overflow-hidden">
               <img 
                 src={flower.hinh_anh} 
                 alt={flower.ten_hoa} 
                 className="w-full h-full object-cover rounded-[50px] shadow-sm"
               />
            </div>

            {/* Meta Information Grid */}
            <div className="space-y-8 text-center max-w-xl mx-auto mb-16">
               <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted flex items-center gap-2">
                    <Tag size={12} className="text-sage" /> Tên Sản Phẩm
                  </span>
                  <p className="text-2xl font-bold text-text-main">{flower.ten_hoa}</p>
               </div>

               <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted flex items-center gap-2">
                    <Calendar size={12} className="text-sage" /> Ngày Đăng
                  </span>
                  <p className="text-sm font-bold text-text-main/70">
                    {flower.ngay_d ? new Date(flower.ngay_d).toLocaleString('vi-VN') : '0000-00-00 00:00:00'}
                  </p>
               </div>

               <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted flex items-center gap-2">
                    <Info size={12} className="text-sage" /> Giá Bán
                  </span>
                  <p className="text-4xl font-black text-sage tracking-tighter">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(flower.gia)}
                  </p>
               </div>
            </div>

            {/* Artisanal Description */}
            <div className="nm-inset rounded-[40px] p-10 mb-16 text-center bg-white/20">
               <p className="text-text-muted font-medium leading-relaxed italic">
                 "{flower.mo_ta || 'Sản phẩm hoa tươi nghệ thuật được thiết kế riêng bởi các chuyên gia tại Siêu Thị Hoa OnLine.'}"
               </p>
            </div>

            {/* Action Button */}
            <div className="text-center">
               <AddToCart product={flower} variant="button" />
            </div>
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
