"use server";

import sql from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteMember(ma_kh: number) {
  try {
    // 1. Check for dependencies (orders)
    const orders = await sql`SELECT count(*) FROM don_dat_hang WHERE ma_kh = ${ma_kh}`;
    if (parseInt(orders[0].count) > 0) {
      return { success: false, error: "Không thể xóa thành viên đã có lịch sử đặt hàng" };
    }

    await sql`DELETE FROM khach_hang WHERE ma_kh = ${ma_kh}`;

    revalidatePath('/quan-tri/thanh-vien');
    
    return { success: true };
  } catch (error) {
    console.error("Delete member error:", error);
    return { success: false, error: "Lỗi hệ thống khi xóa thành viên" };
  }
}
