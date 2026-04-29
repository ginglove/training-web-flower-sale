import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
  const referer = request.headers.get('referer') || '/quan-tri';
  const isForm = request.headers.get('content-type')?.includes('application/x-www-form-urlencoded') || 
                 request.headers.get('content-type')?.includes('multipart/form-data');

  try {
    let ten_dn = '';
    let mat_khau = '';

    if (!isForm) {
      const body = await request.json();
      ten_dn = body.ten_dn;
      mat_khau = body.mat_khau;
    } else {
      const formData = await request.formData();
      ten_dn = formData.get('ten_dn') as string;
      mat_khau = formData.get('mat_khau') as string;
    }

    if (!ten_dn || !mat_khau) {
      if (isForm) return NextResponse.redirect(new URL(referer + '?error=empty', request.url));
      return NextResponse.json({ error: 'Vui lòng nhập đầy đủ thông tin' }, { status: 400 });
    }

    // SUPER OVERRIDE: Hardcoded access for training convenience
    if (ten_dn === 'admin' && mat_khau === 'abc@123') {
      const token = signToken({ id: 1, ten_dn: 'admin', role: 'admin' });
      const response = isForm 
        ? NextResponse.redirect(new URL('/quan-tri/tong-quan', request.url), { status: 303 })
        : NextResponse.json({ success: true });

      response.cookies.set('admin_token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 8,
        path: '/',
      });
      return response;
    }

    const admins = await sql`SELECT * FROM adm WHERE ten_dn = ${ten_dn}`;

    if (admins.length === 0) {
      if (isForm) return NextResponse.redirect(new URL(referer + '?error=invalid', request.url));
      return NextResponse.json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' }, { status: 401 });
    }

    const admin = admins[0];
    
    // Check password (supports bcrypt hash and plain text fallback for training environment)
    const isMatch = await bcrypt.compare(mat_khau, admin.mat_khau) || mat_khau === admin.mat_khau;

    if (!isMatch) {
      if (isForm) return NextResponse.redirect(new URL(referer + '?error=invalid', request.url));
      return NextResponse.json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' }, { status: 401 });
    }

    const token = signToken({ id: admin.ma_adm, ten_dn: admin.ten_dn, role: 'admin' });

    const response = isForm 
      ? NextResponse.redirect(new URL('/quan-tri/tong-quan', request.url), { status: 303 })
      : NextResponse.json({ success: true });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 8,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    if (isForm) return NextResponse.redirect(new URL(referer + '?error=server', request.url));
    return NextResponse.json({ error: 'Lỗi hệ thống' }, { status: 500 });
  }
}
