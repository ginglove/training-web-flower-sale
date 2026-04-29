import sql from "@/lib/db";
import Link from "next/link";
import { Layers, DollarSign, BarChart3, ShoppingBag } from 'lucide-react';

export default async function SidebarLeft({ currentLoai }: { currentLoai?: string }) {
  let categories: any[] = [];
  let stats = {
    totalCategories: 0,
    totalProducts: 0,
    totalCustomers: 0
  };

  try {
    categories = await sql`SELECT * FROM loai_hoa ORDER BY ma_loai ASC`;
    const counts = await sql`
      SELECT 
        (SELECT COUNT(*) FROM loai_hoa) as cat_count,
        (SELECT COUNT(*) FROM hoa) as product_count,
        (SELECT COUNT(*) FROM khach_hang) as customer_count
    `;
    if (counts.length > 0) {
      stats = {
        totalCategories: parseInt(counts[0].cat_count),
        totalProducts: parseInt(counts[0].product_count),
        totalCustomers: parseInt(counts[0].customer_count)
      };
    }
  } catch (error) {
    console.error("Failed to fetch sidebar data", error);
  }

  const priceRanges = [
    { label: "Dưới 100.000đ", value: "0-100000" },
    { label: "100.000đ - 200.000đ", value: "100000-200000" },
    { label: "200.000đ - 300.000đ", value: "200000-300000" },
    { label: "300.000đ - 400.000đ", value: "300000-400000" },
    { label: "400.000đ - 500.000đ", value: "400000-500000" },
    { label: "500.000đ - 600.000đ", value: "500000-600000" },
    { label: "600.000đ - 700.000đ", value: "600000-700000" },
    { label: "700.000đ - 800.000đ", value: "700000-800000" },
    { label: "800.000đ - 900.000đ", value: "800000-900000" },
    { label: "Trên 900.000đ", value: "900000-up" },
  ];

  return (
    <aside className="flex flex-col gap-10">
      {/* DANH MỤC */}
      <div className="nm-raised rounded-[40px] overflow-hidden p-8">
        <div className="flex items-center gap-3 px-4 mb-8">
          <div className="nm-raised-sm p-2 rounded-xl text-text-main">
            <Layers size={18} />
          </div>
          <h2 className="font-black text-xs uppercase tracking-widest text-text-main">Danh Mục</h2>
        </div>
        <ul className="space-y-4">
          {/* All Flowers option */}
          <li>
            <Link 
              href="/hoa" 
              className={`block px-6 py-4 rounded-3xl text-sm font-bold transition-all ${
                !currentLoai 
                ? 'nm-inset text-sage border border-sage/20 shadow-inner' 
                : 'text-text-muted hover:nm-inset hover:text-text-main'
              }`}
            >
              Tất cả các loài hoa
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.ma_loai}>
              <Link 
                href={`/hoa?loai=${cat.ma_loai}`} 
                className={`block px-6 py-4 rounded-3xl text-sm font-bold transition-all ${
                  currentLoai === cat.ma_loai.toString() 
                  ? 'nm-inset text-sage border border-sage/30 shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] ring-2 ring-sage/10' 
                  : 'text-text-muted hover:nm-inset hover:text-text-main'
                }`}
              >
                {cat.ten_loai}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* LỌC THEO GIÁ */}
      <div className="nm-raised rounded-[40px] overflow-hidden p-8">
        <div className="flex items-center gap-3 px-4 mb-8">
          <div className="nm-raised-sm p-2 rounded-xl text-text-main">
            <DollarSign size={18} />
          </div>
          <h2 className="font-black text-xs uppercase tracking-widest text-text-main">Giá Sản Phẩm</h2>
        </div>
        <ul className="space-y-4">
          {priceRanges.map((range, index) => (
            <li key={index}>
              <Link 
                href={`/hoa?gia=${range.value}${currentLoai ? `&loai=${currentLoai}` : ''}`} 
                className="block px-6 py-4 rounded-3xl text-sm font-bold text-text-muted hover:nm-inset hover:text-text-main transition-all"
              >
                {range.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* THỐNG KÊ */}
      <div className="nm-raised rounded-[40px] overflow-hidden p-8">
        <div className="flex items-center gap-3 px-4 mb-8">
          <div className="nm-raised-sm p-2 rounded-xl text-text-main">
            <BarChart3 size={18} />
          </div>
          <h2 className="font-black text-xs uppercase tracking-widest text-text-main">Thống Kê</h2>
        </div>
        <div className="px-4 space-y-8">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Tổng Số Loại Hoa</span>
            <span className="nm-inset px-5 py-2 rounded-full text-xs font-black text-text-main">
              {stats.totalCategories}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Tổng Số Hoa</span>
            <span className="nm-inset px-5 py-2 rounded-full text-xs font-black text-text-main">
              {stats.totalProducts}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Số Khách Hàng</span>
            <span className="nm-inset px-5 py-2 rounded-full text-xs font-black text-text-main">
              {stats.totalCustomers}
            </span>
          </div>
        </div>
      </div>

      {/* DELIVERY PARTNERSHIPS */}
      <div className="space-y-6">
        <Link href="/hoa" className="block nm-raised rounded-[30px] p-2 overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
          <img 
            src="/images/global_delivery.png" 
            alt="Điện Hoa Toàn Cầu" 
            className="w-full h-auto rounded-[25px]"
          />
        </Link>
        <Link href="/hoa" className="block nm-raised rounded-[30px] p-2 overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
          <img 
            src="/images/national_delivery.png" 
            alt="Gửi Hoa Toàn Quốc" 
            className="w-full h-auto rounded-[25px]"
          />
        </Link>
      </div>
    </aside>
  );
}
