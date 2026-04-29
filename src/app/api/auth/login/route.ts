import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
  const referer = request.headers.get('referer') || '/';
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
      if (isForm) return NextResponse.redirect(new URL(referer.split('?')[0] + '?error=empty', request.url));
      return NextResponse.json({ error: 'Vui lòng nhập đầy đủ thông tin' }, { status: 400 });
    }

    const users = await sql`SELECT * FROM khach_hang WHERE ten_dn = ${ten_dn}`;

    if (users.length === 0) {
      if (isForm) return NextResponse.redirect(new URL(referer.split('?')[0] + '?error=invalid', request.url));
      return NextResponse.json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' }, { status: 401 });
    }

    const user = users[0];
    const isMatch = mat_khau === user.mat_khau || await bcrypt.compare(mat_khau, user.mat_khau);

    if (!isMatch) {
      if (isForm) return NextResponse.redirect(new URL(referer.split('?')[0] + '?error=invalid', request.url));
      return NextResponse.json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' }, { status: 401 });
    }

    const token = signToken({ id: user.ma_kh, ten_dn: user.ten_dn, role: 'customer' });

    const response = isForm 
      ? NextResponse.redirect(new URL('/', request.url), { status: 303 })
      : NextResponse.json({ success: true });

    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 3600,
      path: '/',
    });

    response.cookies.set('session_expiry', (Date.now() + 3600 * 1000).toString(), {
      httpOnly: false, // Accessible by JS
      maxAge: 3600,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('CRITICAL LOGIN ERROR:', error);
    if (isForm) return NextResponse.redirect(new URL(referer.split('?')[0] + '?error=server', request.url));
    return NextResponse.json({ 
      error: 'Lỗi hệ thống. Vui lòng thử lại.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}
