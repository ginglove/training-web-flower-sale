"use client";

import { usePathname } from 'next/navigation';
import CartBadge from "@/components/CartBadge";

export default function LayoutWrapper({
  children,
  userData
}: {
  children: React.ReactNode;
  userData: any;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/quan-tri');

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <header className="fixed top-6 left-0 w-full z-50 px-6 md:px-12 pointer-events-none">
        <div className="container mx-auto flex justify-between items-center pointer-events-auto">
          {/* Logo */}
          <div className="floating-nav px-8 py-3 rounded-[30px] border border-white/40 shadow-xl group">
            <a href="/" className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-black text-sage tracking-tighter group-hover:scale-105 transition-transform inline-block">Siêu Thị Hoa</span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted mt-1">OnLine</span>
            </a>
          </div>
          
          {/* Minimalist Nav */}
          <nav className="hidden lg:flex gap-2 floating-nav p-1.5 rounded-full border border-white/40 shadow-xl">
            {[
              { label: 'Trang chủ', href: '/' },
              { label: 'Giới thiệu', href: '/gioi-thieu' },
              { label: 'Sản phẩm', href: '/hoa' },
              { label: 'Tin tức', href: '/tin-tuc' },
              { label: 'Dịch vụ', href: '/dich-vu' },
              { label: 'Giỏ hàng', href: '/gio-hang' },
              { label: 'Liên hệ', href: '/lien-he' }
            ].map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className="px-6 py-2.5 rounded-full hover:bg-sage/10 transition-all font-bold text-[10px] uppercase tracking-widest text-text-muted hover:text-sage"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Cart & Identity */}
          <div className="flex gap-6 items-center">
            <CartBadge />
            <a 
              href={userData ? "/thanh-vien" : "/dang-nhap"} 
              className={`floating-nav h-16 w-16 flex items-center justify-center rounded-full border border-white/40 shadow-xl hover:scale-105 transition-all ${userData ? 'text-sage' : ''}`}
            >
              <span className="text-xl">👤</span>
            </a>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 flex-grow">
        {children}
      </main>

      <footer className="nm-raised rounded-t-[80px] py-24 px-12 mt-20 relative overflow-hidden border-t border-white/60">
        <div className="absolute top-0 left-0 w-64 h-64 bg-sage/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-petal/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
          <div className="md:col-span-2">
            <h3 className="font-serif text-4xl font-black text-text-main mb-8">
              Hơi thở của <span className="text-sage italic">Hoa Tươi</span>
            </h3>
            <p className="text-text-muted font-medium max-w-md leading-relaxed text-sm">
              Chúng tôi không chỉ bán hoa, chúng tôi mang đến những câu chuyện về cảm xúc. Mỗi nhành hoa là một lời nhắn nhủ, mỗi bó hoa là một kỷ niệm khó quên.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-text-main mb-8">Khám phá</h4>
            <ul className="space-y-4 font-bold text-xs tracking-wide text-text-muted">
              <li><a href="/hoa" className="hover:text-sage transition-colors">Bộ sưu tập Mùa Xuân</a></li>
              <li><a href="/tin-tuc" className="hover:text-sage transition-colors">Bí quyết cắm hoa</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-text-main mb-8">Kết nối</h4>
            <div className="space-y-4 text-text-muted font-bold text-xs tracking-wide">
              <p>📍 123 Botanical Ave, Quận 1, TP.HCM</p>
              <p>📞 1900 8888</p>
            </div>
          </div>
        </div>
        <div className="mt-24 pt-10 border-t border-text-main/5 text-center">
          <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.5em]">
            © 2026 Siêu Thị Hoa OnLine • Inspired by Nature
          </p>
        </div>
      </footer>
    </>
  );
}
