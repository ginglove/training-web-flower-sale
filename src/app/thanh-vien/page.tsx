import sql from "@/lib/db";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function MemberProfile({
  searchParams,
}: {
  searchParams: { edit?: string };
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const decoded = token ? verifyToken(token) as any : null;

  if (!decoded) {
    redirect('/');
  }

  const isEdit = searchParams.edit === 'true';

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
                /* EDIT MODE (Image 3.9) */
                <form className="w-full max-w-md space-y-0 border border-gray-200">
                  <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-[#F9F9F9] px-4 py-2 text-xs font-bold text-text-muted border-r border-gray-200">Tên Đăng Nhập</div>
                    <div className="col-span-2 px-4 py-2 text-xs text-text-muted">{user.ten_dn}</div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-[#F9F9F9] px-4 py-2 text-xs font-bold text-text-muted border-r border-gray-200">Mật Khẩu</div>
                    <div className="col-span-2 px-4 py-2"><input type="password" defaultValue="••••" className="w-full px-2 py-1 border border-gray-200 text-xs" /></div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-[#F9F9F9] px-4 py-2 text-xs font-bold text-text-muted border-r border-gray-200">Họ</div>
                    <div className="px-4 py-2"><input defaultValue={user.ho_kh} className="w-full px-2 py-1 border border-gray-200 text-xs" /></div>
                    <div className="grid grid-cols-2">
                        <div className="bg-[#F9F9F9] px-2 py-2 text-xs font-bold text-text-muted border-r border-l border-gray-200 text-center">Tên</div>
                        <div className="px-2 py-2"><input defaultValue={user.ten_kh} className="w-full px-2 py-1 border border-gray-200 text-xs" /></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-[#F9F9F9] px-4 py-2 text-xs font-bold text-text-muted border-r border-gray-200">Số Điện Thoại</div>
                    <div className="col-span-2 px-4 py-2"><input defaultValue={user.sdt} className="w-full px-2 py-1 border border-gray-200 text-xs" /></div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-[#F9F9F9] px-4 py-2 text-xs font-bold text-text-muted border-r border-gray-200">Email</div>
                    <div className="col-span-2 px-4 py-2"><input defaultValue={user.email} className="w-full px-2 py-1 border border-gray-200 text-xs" /></div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-[#F9F9F9] px-4 py-2 text-xs font-bold text-text-muted border-r border-gray-200 h-20">Địa Chỉ Nhà</div>
                    <div className="col-span-2 px-4 py-2"><textarea defaultValue={user.dia_chi} className="w-full h-16 px-2 py-1 border border-gray-200 text-xs resize-none" /></div>
                  </div>
                  <div className="grid grid-cols-3 border-b border-gray-200">
                    <div className="bg-[#F9F9F9] px-4 py-2 text-xs font-bold text-text-muted border-r border-gray-200">Giới Tính</div>
                    <div className="col-span-2 px-4 py-2">
                        <select defaultValue={user.gioi_tinh === 1 ? 'Nam' : 'Nữ'} className="px-2 py-1 border border-gray-200 text-xs">
                            <option>Nam</option>
                            <option>Nữ</option>
                        </select>
                    </div>
                  </div>
                  <div className="p-2 flex justify-start">
                    <button type="button" className="border border-gray-300 px-4 py-1 text-[10px] font-bold bg-[#F9F9F9] hover:bg-gray-100 transition-colors">
                        Cập Nhật Thông Tin
                    </button>
                  </div>
                </form>
              ) : (
                /* VIEW MODE (Image 3.8) */
                <div className="flex flex-col items-center gap-6">
                  <div className="space-y-1 text-center text-sm font-medium text-text-muted">
                    <p className="text-[#7FB069]">Tên Tài Khoản: <span className="text-gray-500">{user.ten_dn}</span></p>
                    <p className="text-[#7FB069]">Mật Khẩu: <span className="text-gray-500">••••</span></p>
                    <p className="text-[#7FB069]">Họ Và Tên: <span className="text-gray-500">{user.ho_kh} {user.ten_kh}</span></p>
                    <p className="text-[#7FB069]">Địa Chỉ: <span className="text-gray-500">{user.dia_chi}</span></p>
                    <p className="text-[#7FB069]">Số Điện Thoại: <span className="text-gray-500">{user.sdt}</span></p>
                    <p className="text-[#7FB069]">Email: <span className="text-gray-500">{user.email}</span></p>
                    <p className="text-[#7FB069]">Giới Tính: <span className="text-gray-500">{user.gioi_tinh === 1 ? 'Nam' : 'Nữ'}</span></p>
                  </div>
                  <Link href="/thanh-vien?edit=true" className="text-orange-500 font-bold text-xs hover:underline decoration-orange-200 underline-offset-4">
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
