"use server";

import sql from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(ma_dh: number, status: number) {
  try {
    await sql`
      UPDATE don_dat_hang 
      SET hien_trang = ${status}
      WHERE ma_dh = ${ma_dh}
    `;

    revalidatePath('/quan-tri/don-hang');
    revalidatePath(`/quan-tri/don-hang/${ma_dh}`);
    
    return { success: true };
  } catch (error) {
    console.error("Update order status error:", error);
    return { success: false, error: "Lỗi khi cập nhật trạng thái đơn hàng" };
  }
}

export async function deleteOrder(ma_dh: number) {
    try {
      // 1. Delete details first
      await sql`DELETE FROM ct_don_dat_hang WHERE ma_dh = ${ma_dh}`;
      
      // 2. Delete order
      await sql`DELETE FROM don_dat_hang WHERE ma_dh = ${ma_dh}`;
  
      revalidatePath('/quan-tri/don-hang');
      
      return { success: true };
    } catch (error) {
      console.error("Delete order error:", error);
      return { success: false, error: "Không thể xóa đơn hàng này" };
    }
  }
