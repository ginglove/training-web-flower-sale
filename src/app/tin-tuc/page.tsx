import sql from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function News() {
  let newsList: any[] = [];
  try {
    newsList = await sql`SELECT * FROM tin_tuc ORDER BY ngay_dang DESC`;
  } catch (error) {
    console.error("DB error", error);
  }

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-forest mb-4">Tin tức & Sự kiện</h1>
        <p className="text-forest/70 max-w-2xl mx-auto">Những câu chuyện về hoa, nghệ thuật cắm hoa và các chương trình ưu đãi đặc biệt từ Floral Charm.</p>
      </div>

      {newsList.length === 0 ? (
        <div className="glass p-12 rounded-3xl text-center text-forest/70">
          Chưa có tin tức nào được đăng.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((item) => (
            <div key={item.ma_tt} className="glass rounded-3xl overflow-hidden group flex flex-col h-full">
              <div className="relative h-56 bg-white/50 overflow-hidden">
                <img 
                  src={item.hinh_anh || 'https://images.unsplash.com/photo-1490750967868-88cb4ecb0701?q=80&w=800&auto=format'} 
                  alt={item.tieu_de}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-xs text-forest/50 mb-3 font-medium uppercase tracking-wider">
                  {new Date(item.ngay_dang).toLocaleDateString('vi-VN')}
                </p>
                <h2 className="font-serif text-xl font-bold text-forest mb-3 line-clamp-2 group-hover:text-blush-dark transition-colors">
                  {item.tieu_de}
                </h2>
                <div className="text-forest/70 mb-6 line-clamp-3 text-sm">
                  {/* BUG: Renders raw HTML string as text or could be XSS if rendered unsafely */}
                  {item.noi_dung}
                </div>
                <button className="mt-auto text-left text-blush-dark font-bold hover:text-forest transition-colors text-sm uppercase tracking-wider">
                  Đọc tiếp →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
