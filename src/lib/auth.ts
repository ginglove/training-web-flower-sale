import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'flower_sale_secret';

export function signToken(payload: object, expiresIn = '1h') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function getTokenFromRequest(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  const cookie = request.headers.get('cookie');
  if (cookie) {
    const tokenCookie = cookie.split(';').find(c => c.trim().startsWith('token='));
    if (tokenCookie) return tokenCookie.split('=')[1];
  }
  return null;
}
