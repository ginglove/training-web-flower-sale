import Link from 'next/link';
import CartBadge from './CartBadge';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 px-6 py-6 flex justify-center">
      <div className="w-full max-w-7xl nm-raised rounded-[40px] px-10 py-4 bg-white/70 backdrop-blur-xl border border-white/40 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-4">
          <div className="nm-raised w-12 h-12 rounded-2xl flex items-center justify-center bg-sage text-white group-hover:rotate-12 transition-transform duration-500">
            <span className="font-serif text-2xl font-bold italic">F</span>
          </div>
          <div>
            <h1 className="font-serif text-2xl font-black text-text-main leading-none">Floral Soul</h1>
            <p className="text-[9px] font-black text-sage uppercase tracking-[0.4em] mt-1">Boutique Flowers</p>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-10">
                <Link href="/hoa" className="text-[10px] font-black text-text-muted uppercase tracking-widest hover:text-sage transition-colors">Cửa Hàng</Link>
                <Link href="/tim-kiem-nang-cao" className="text-[10px] font-black text-text-muted uppercase tracking-widest hover:text-sage transition-colors">Tìm Kiếm</Link>
                <Link href="/tin-tuc" className="text-[10px] font-black text-text-muted uppercase tracking-widest hover:text-sage transition-colors">Tin Tức</Link>
            </nav>
            <div className="h-8 w-[1px] bg-text-muted/10 mx-2 hidden md:block"></div>
            <CartBadge />
        </div>
      </div>
    </header>
  );
}
