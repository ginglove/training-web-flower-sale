import Form from 'next/form';

export default function SearchPage() {
  return (
    <div className="max-w-3xl mx-auto my-20">
      <div className="glass p-12 rounded-3xl text-center shadow-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blush/20 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-forest/10 rounded-tr-full"></div>
        
        <h1 className="font-serif text-4xl font-bold text-forest mb-4 relative z-10">Tìm kiếm Hoa</h1>
        <p className="text-forest/70 mb-8 relative z-10">Khám phá bộ sưu tập hoa tươi của chúng tôi</p>
        
        <Form action="/hoa" className="relative z-10 max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
          <input 
            name="keyword" 
            type="text" 
            placeholder="Nhập tên hoa, loại hoa..." 
            className="flex-grow px-6 py-4 rounded-full border border-forest/20 focus:outline-none focus:border-blush focus:ring-2 focus:ring-blush/30 bg-white/80"
            autoFocus
          />
          <button 
            type="submit" 
            className="bg-forest text-ivory px-8 py-4 rounded-full font-bold hover:bg-blush hover:text-forest transition-colors shadow-md"
          >
            Tìm kiếm
          </button>
        </Form>
        
        <div className="mt-12 text-left relative z-10">
          <h3 className="font-medium text-forest mb-4 border-b border-forest/10 pb-2">Từ khóa phổ biến</h3>
          <div className="flex flex-wrap gap-2">
            <a href="/hoa?keyword=hồng" className="px-4 py-2 rounded-full glass hover:bg-blush/30 text-sm transition-colors text-forest">Hoa hồng</a>
            <a href="/hoa?keyword=cưới" className="px-4 py-2 rounded-full glass hover:bg-blush/30 text-sm transition-colors text-forest">Hoa cưới</a>
            <a href="/hoa?keyword=sinh+nhật" className="px-4 py-2 rounded-full glass hover:bg-blush/30 text-sm transition-colors text-forest">Hoa sinh nhật</a>
            <a href="/hoa?keyword=lan" className="px-4 py-2 rounded-full glass hover:bg-blush/30 text-sm transition-colors text-forest">Hoa lan</a>
          </div>
        </div>
      </div>
    </div>
  );
}
