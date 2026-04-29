"use server";

import sql from "@/lib/db";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateUser(formData: any) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const decoded = token ? verifyToken(token) as any : null;

    if (!decoded) {
      return { success: false, error: "Phiên đăng nhập hết hạn" };
    }

    const { ho, ten, sdt, email, dia_chi, gioi_tinh, mat_khau } = formData;

    // 1. Server-side Validation
    if (!ho || /\d/.test(ho)) return { success: false, error: "Họ không hợp lệ" };
    if (!ten || /\d/.test(ten)) return { success: false, error: "Tên không hợp lệ" };
    if (!sdt || !sdt.startsWith('0') || sdt.length < 9 || sdt.length > 12 || !/^\d+$/.test(sdt)) {
      return { success: false, error: "Số điện thoại không hợp lệ (9-12 số, bắt đầu bằng 0)" };
    }
    if (!email || email.length > 50 || !/^\S+@\S+\.\S+$/.test(email)) {
      return { success: false, error: "Email không hợp lệ" };
    }
    if (!dia_chi || dia_chi.length > 200) {
      return { success: false, error: "Địa chỉ không quá 200 ký tự" };
    }

    // 2. Update logic
    const gioiTinhBit = gioi_tinh === 'Nam' ? 1 : 0;

    if (mat_khau && mat_khau !== "••••") {
      if (mat_khau.length < 11) return { success: false, error: "Mật khẩu mới phải tối thiểu 11 ký tự" };
      const hashedPassword = await bcrypt.hash(mat_khau, 10);
      await sql`
        UPDATE khach_hang 
        SET ho_kh = ${ho}, ten_kh = ${ten}, sdt = ${sdt}, email = ${email}, 
            dia_chi = ${dia_chi}, gioi_tinh = ${gioiTinhBit}, mat_khau = ${hashedPassword}
        WHERE ten_dn = ${decoded.ten_dn}
      `;
    } else {
      await sql`
        UPDATE khach_hang 
        SET ho_kh = ${ho}, ten_kh = ${ten}, sdt = ${sdt}, email = ${email}, 
            dia_chi = ${dia_chi}, gioi_tinh = ${gioiTinhBit}
        WHERE ten_dn = ${decoded.ten_dn}
      `;
    }

    revalidatePath('/thanh-vien');
    return { success: true };
  } catch (error) {
    console.error("Update user error:", error);
    return { success: false, error: "Lỗi hệ thống khi cập nhật" };
  }
}
