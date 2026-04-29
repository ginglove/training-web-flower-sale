import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import CartDisplay from "@/components/CartDisplay";
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const userData = token ? verifyToken(token) as any : null;
  const userName = userData ? userData.ten_dn : "Bạn";

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-3">
          <SidebarLeft />
        </aside>

        <main className="lg:col-span-6 space-y-12">
          <div className="nm-raised rounded-[40px] overflow-hidden">
            <div className="bg-sage px-8 py-5 flex items-center justify-between">
              <h2 className="text-white font-black text-xs uppercase tracking-[0.3em]">
                Giỏ Hàng Của {userName}
              </h2>
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
