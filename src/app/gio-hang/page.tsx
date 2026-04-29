import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import CartDisplay from "@/components/CartDisplay";

export const dynamic = 'force-dynamic';

export default function CartPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-3">
          <SidebarLeft />
        </aside>

        <main className="lg:col-span-6 space-y-12">
          <div className="nm-raised rounded-[40px] overflow-hidden">
            <div className="bg-sage px-8 py-5 flex items-center justify-between">
              <h2 className="text-white font-black text-xs uppercase tracking-[0.3em]">Giỏ Hàng Của Bạn</h2>
            </div>

            <div className="p-10">
              <CartDisplay />
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
