"use server";

import sql from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addNews(formData: FormData) {
  try {
    const tieu_de = formData.get('tieu_de') as string;
    const hinh_anh = formData.get('hinh_anh') as string;
    const noi_dung = formData.get('noi_dung') as string;

    if (!tieu_de || !noi_dung) return { success: false, error: "Tiêu đề và nội dung không được để trống" };

    await sql`
      INSERT INTO tin_tuc (tieu_de, hinh_anh, noi_dung, ngay_dang) 
      VALUES (${tieu_de}, ${hinh_anh}, ${noi_dung}, NOW())
    `;

    revalidatePath('/quan-tri/tin-tuc');
    revalidatePath('/tin-tuc');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error("Add news error:", error);
    return { success: false, error: "Lỗi khi đăng tin tức" };
  }
}

export async function updateNews(ma_tt: number, formData: FormData) {
  try {
    const tieu_de = formData.get('tieu_de') as string;
    const hinh_anh = formData.get('hinh_anh') as string;
    const noi_dung = formData.get('noi_dung') as string;

    if (!tieu_de || !noi_dung) return { success: false, error: "Tiêu đề và nội dung không được để trống" };

    await sql`
      UPDATE tin_tuc 
      SET tieu_de = ${tieu_de}, hinh_anh = ${hinh_anh}, noi_dung = ${noi_dung}
      WHERE ma_tt = ${ma_tt}
    `;

    revalidatePath('/quan-tri/tin-tuc');
    revalidatePath('/tin-tuc');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error("Update news error:", error);
    return { success: false, error: "Lỗi khi cập nhật tin tức" };
  }
}

export async function deleteNews(ma_tt: number) {
  try {
    await sql`DELETE FROM tin_tuc WHERE ma_tt = ${ma_tt}`;
    revalidatePath('/quan-tri/tin-tuc');
    revalidatePath('/tin-tuc');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error("Delete news error:", error);
    return { success: false, error: "Không thể xóa tin tức này" };
  }
}
