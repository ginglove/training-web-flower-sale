"use server";

import sql from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addCategory(formData: FormData) {
  try {
    const ten_loai = formData.get('ten_loai') as string;
    if (!ten_loai) return { success: false, error: "Tên loại không được để trống" };

    await sql`INSERT INTO loai_hoa (ten_loai) VALUES (${ten_loai})`;

    revalidatePath('/quan-tri/loai-hoa');
    revalidatePath('/quan-tri/hoa');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error("Add category error:", error);
    return { success: false, error: "Loại hoa này đã tồn tại hoặc lỗi hệ thống" };
  }
}

export async function updateCategory(ma_loai: number, formData: FormData) {
  try {
    const ten_loai = formData.get('ten_loai') as string;
    if (!ten_loai) return { success: false, error: "Tên loại không được để trống" };

    await sql`UPDATE loai_hoa SET ten_loai = ${ten_loai} WHERE ma_loai = ${ma_loai}`;

    revalidatePath('/quan-tri/loai-hoa');
    revalidatePath('/quan-tri/hoa');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error("Update category error:", error);
    return { success: false, error: "Lỗi khi cập nhật loại hoa" };
  }
}

export async function deleteCategory(ma_loai: number) {
  try {
    // Check if category has flowers
    const flowers = await sql`SELECT count(*) FROM hoa WHERE ma_loai = ${ma_loai}`;
    if (parseInt(flowers[0].count) > 0) {
      return { success: false, error: "Không thể xóa loại hoa đang có sản phẩm" };
    }

    await sql`DELETE FROM loai_hoa WHERE ma_loai = ${ma_loai}`;

    revalidatePath('/quan-tri/loai-hoa');
    
    return { success: true };
  } catch (error) {
    console.error("Delete category error:", error);
    return { success: false, error: "Lỗi khi xóa loại hoa" };
  }
}
