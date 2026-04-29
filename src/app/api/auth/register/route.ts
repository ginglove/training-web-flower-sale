import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    let data: any = {};

    // Handle both JSON and Form Data
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        data[key] = value;
      });
    }

    const { 
      ho, ho_kh, 
      ten, ten_kh, 
      sdt, 
      dia_chi, 
      email, 
      gioi_tinh, 
      ten_dn, 
      mat_khau,
      captcha
    } = data;

    const final_ho = (ho || ho_kh || '').toString().trim();
    const final_ten = (ten || ten_kh || '').toString().trim();

    // 1. Validation Logic
    if (!ten_dn || ten_dn.length < 11 || ten_dn.length > 30) {
      return NextResponse.json({ error: 'Tên đăng nhập phải từ 11 đến 30 ký tự' }, { status: 400 });
    }
    if (!mat_khau || mat_khau.length < 11 || mat_khau.length > 30) {
      return NextResponse.json({ error: 'Mật khẩu phải từ 11 đến 30 ký tự' }, { status: 400 });
    }
    if (!final_ho || !final_ten) {
      return NextResponse.json({ error: 'Họ và tên không được để trống' }, { status: 400 });
    }
    if (/\d/.test(final_ho) || /\d/.test(final_ten)) {
      return NextResponse.json({ error: 'Họ và tên không được chứa chữ số' }, { status: 400 });
    }
    if (!sdt || !sdt.startsWith('0') || sdt.length < 9 || sdt.length > 12 || !/^\d+$/.test(sdt)) {
      return NextResponse.json({ error: 'Số điện thoại không hợp lệ (phải từ 9-12 số và bắt đầu bằng 0)' }, { status: 400 });
    }
    if (!email || email.length > 50 || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Email không hợp lệ và không quá 50 ký tự' }, { status: 400 });
    }
    if (!dia_chi || dia_chi.length > 200) {
      return NextResponse.json({ error: 'Địa chỉ không được để trống và không quá 200 ký tự' }, { status: 400 });
    }

    // 2. Captcha Validation (Static check for KS72W as seen in UI)
    if (!captcha || captcha.toUpperCase() !== 'KS72W') {
      return NextResponse.json({ error: 'Mã xác nhận (Captcha) không chính xác' }, { status: 400 });
    }

    // 3. Check duplicate Username
    const existingUser = await sql`SELECT ma_kh FROM khach_hang WHERE ten_dn = ${ten_dn}`;
    if (existingUser.length > 0) {
      return NextResponse.json({ error: 'Tên đăng nhập này đã được sử dụng' }, { status: 400 });
    }

    // 4. Check duplicate Email
    const existingEmail = await sql`SELECT ma_kh FROM khach_hang WHERE email = ${email}`;
    if (existingEmail.length > 0) {
      return NextResponse.json({ error: 'Địa chỉ Email này đã được đăng ký' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(mat_khau, 10);

    const result = await sql`
      INSERT INTO khach_hang (ho_kh, ten_kh, sdt, dia_chi, email, gioi_tinh, ten_dn, mat_khau)
      VALUES (${final_ho}, ${final_ten}, ${sdt}, ${dia_chi}, ${email}, ${gioi_tinh || 1}, ${ten_dn}, ${hashedPassword})
      RETURNING ma_kh, ten_dn, ho_kh, ten_kh, email
    `;

    return NextResponse.json({ success: true, user: result[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Fallback for any unhandled DB constraints
    if (error.message?.includes('khach_hang_email_key')) {
      return NextResponse.json({ error: 'Địa chỉ Email đã tồn tại' }, { status: 400 });
    }
    if (error.message?.includes('khach_hang_ten_dn_key')) {
      return NextResponse.json({ error: 'Tên đăng nhập đã tồn tại' }, { status: 400 });
    }
    if (error.message?.includes('khach_hang_sdt_key')) {
      return NextResponse.json({ error: 'Số điện thoại đã tồn tại' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Lỗi hệ thống, vui lòng thử lại sau' }, { status: 500 });
  }
}
