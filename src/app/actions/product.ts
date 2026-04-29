"use server";

import sql from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addProduct(formData: FormData) {
  try {
    const ten_hoa = formData.get('ten_hoa') as string;
    const ma_loai = parseInt(formData.get('ma_loai') as string);
    const gia = parseFloat(formData.get('gia') as string);
    const trang_thai = parseInt(formData.get('trang_thai') as string);
    const mo_ta = formData.get('mo_ta') as string;
    const hinh_anh = formData.get('hinh_anh') as string;

    // 1. Validation Logic
    if (!ten_hoa || ten_hoa.length < 5 || ten_hoa.length > 20) {
      return { success: false, error: "Tên hoa phải từ 5 đến 20 ký tự" };
    }
    if (!gia || gia < 5000 || gia > 7000000) {
      return { success: false, error: "Giá bán phải từ 5.000đ đến 7.000.000đ" };
    }
    if (!mo_ta || mo_ta.length > 250) {
      return { success: false, error: "Mô tả không được để trống và không quá 250 ký tự" };
    }

    await sql`
      INSERT INTO hoa (ten_hoa, ma_loai, gia, trang_thai, mo_ta, hinh_anh)
      VALUES (${ten_hoa}, ${ma_loai}, ${gia}, ${trang_thai}, ${mo_ta}, ${hinh_anh})
    `;

    revalidatePath('/quan-tri/hoa');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error("Add product error:", error);
    return { success: false, error: "Lỗi hệ thống khi thêm sản phẩm" };
  }
}

export async function updateProduct(ma_hoa: number, formData: FormData) {
  try {
    const ten_hoa = formData.get('ten_hoa') as string;
    const ma_loai = parseInt(formData.get('ma_loai') as string);
    const gia = parseFloat(formData.get('gia') as string);
    const trang_thai = parseInt(formData.get('trang_thai') as string);
    const mo_ta = formData.get('mo_ta') as string;
    const hinh_anh = formData.get('hinh_anh') as string;

    if (!ten_hoa || ten_hoa.length < 5 || ten_hoa.length > 20) {
      return { success: false, error: "Tên hoa phải từ 5 đến 20 ký tự" };
    }
    if (!gia || gia < 5000 || gia > 7000000) {
      return { success: false, error: "Giá bán phải từ 5.000đ đến 7.000.000đ" };
    }
    if (!mo_ta || mo_ta.length > 250) {
      return { success: false, error: "Mô tả không được để trống và không quá 250 ký tự" };
    }

    await sql`
      UPDATE hoa 
      SET ten_hoa = ${ten_hoa}, ma_loai = ${ma_loai}, gia = ${gia}, 
          trang_thai = ${trang_thai}, mo_ta = ${mo_ta}, hinh_anh = ${hinh_anh}
      WHERE ma_hoa = ${ma_hoa}
    `;

    revalidatePath('/quan-tri/hoa');
    revalidatePath(`/hoa/${ma_hoa}`);
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error("Update product error:", error);
    return { success: false, error: "Lỗi hệ thống khi cập nhật sản phẩm" };
  }
}

export async function deleteProduct(ma_hoa: number) {
  try {
    // 1. Delete from order details first (if any) to prevent FK errors
    await sql`DELETE FROM ct_don_dat_hang WHERE ma_hoa = ${ma_hoa}`;
    
    // 2. Delete product
    await sql`DELETE FROM hoa WHERE ma_hoa = ${ma_hoa}`;

    revalidatePath('/quan-tri/hoa');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error("Delete product error:", error);
    return { success: false, error: "Không thể xóa sản phẩm này" };
  }
}
