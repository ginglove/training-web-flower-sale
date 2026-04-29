import sql from "@/lib/db";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import MemberProfileForm from "@/components/MemberProfileForm";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function MemberProfile({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const decoded = token ? verifyToken(token) as any : null;

  if (!decoded) {
    redirect('/');
  }

  const isEdit = params.edit === 'true';

  let user: any = null;
  try {
    const users = await sql`SELECT * FROM khach_hang WHERE ten_dn = ${decoded.ten_dn}`;
    user = users[0];
  } catch (error) {
    console.error(error);
  }

  if (!user) return <div>User not found</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-3">
          <SidebarLeft />
        </aside>

        <main className="lg:col-span-6 space-y-12">
          <div className="nm-raised rounded-xl overflow-hidden">
            <div className="bg-[#EAE7D9] px-4 py-2 border-b border-gray-300">
              <h2 className="text-[#7FB069] text-center font-bold text-sm">Thông Tin Thành Viên</h2>
            </div>

            <div className="p-12 bg-white/40 flex flex-col items-center">
              {isEdit ? (
                <MemberProfileForm user={user} />
              ) : (
                /* VIEW MODE */
                <div className="flex flex-col items-center gap-6">
                  <div className="space-y-1 text-center text-sm font-medium text-text-muted">
                    <p className="text-[#7FB069]">Tên Tài Khoản: <span className="text-gray-500 font-bold uppercase">{user.ten_dn}</span></p>
                    <p className="text-[#7FB069]">Mật Khẩu: <span className="text-gray-500">••••</span></p>
                    <p className="text-[#7FB069]">Họ Và Tên: <span className="text-gray-500">{user.ho_kh} {user.ten_kh}</span></p>
                    <p className="text-[#7FB069]">Địa Chỉ: <span className="text-gray-500">{user.dia_chi}</span></p>
                    <p className="text-[#7FB069]">Số Điện Thoại: <span className="text-gray-500">{user.sdt}</span></p>
                    <p className="text-[#7FB069]">Email: <span className="text-gray-500">{user.email}</span></p>
                    <p className="text-[#7FB069]">Giới Tính: <span className="text-gray-500">{user.gioi_tinh === 1 ? 'Nam' : 'Nữ'}</span></p>
                  </div>
                  <Link href="/thanh-vien?edit=true" className="nm-button px-8 py-3 rounded-xl text-orange-500 font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
                    Thay Đổi Thông Tin
                  </Link>
                </div>
              )}
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
