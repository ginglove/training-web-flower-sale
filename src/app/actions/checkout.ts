"use server";

import sql from "@/lib/db";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function processCheckout(formData: any, cart: any[]) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const userData = token ? verifyToken(token) as any : null;
    
    // In this training app, we'll allow checkout even for guests or use a default customer ID
    const customerId = userData?.id || 1; 

    const noiGiao = formData.diaChiGiaoHang;
    const ngayGH = formData.ngayGiaoHang || new Date();

    // 1. Create Order
    const orderResult = await sql`
      INSERT INTO don_dat_hang (ma_kh, ngay_gh, noi_giao, hien_trang)
      VALUES (${customerId}, ${ngayGH}, ${noiGiao}, 0)
      RETURNING ma_dh
    `;
    
    const maDH = orderResult[0].ma_dh;

    // 2. Create Order Details
    for (const item of cart) {
      await sql`
        INSERT INTO ct_don_dat_hang (ma_dh, ma_hoa, gia_ban, sl_dat)
        VALUES (${maDH}, ${item.ma_hoa}, ${item.gia}, ${item.quantity})
      `;
    }

    return { success: true, orderId: maDH };
  } catch (error) {
    console.error("Checkout error:", error);
    return { success: false, error: "Lỗi xử lý đơn hàng" };
  }
}
