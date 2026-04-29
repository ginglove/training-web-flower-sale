import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  cookieStore.delete('admin_token');
  cookieStore.delete('session_expiry');
  const url = new URL(request.url);
  return NextResponse.redirect(new URL('/', url.origin));
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  cookieStore.delete('admin_token');
  cookieStore.delete('session_expiry');
  const url = new URL(request.url);
  return NextResponse.redirect(new URL('/', url.origin), { status: 303 });
}
