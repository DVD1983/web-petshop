import type { APIContext } from 'astro';

const SESSION_COOKIE = 'milo-session';
const SESSION_DURATION = 60 * 60 * 4;

function generateToken(): string {
  const buf = new Uint8Array(48);
  crypto.getRandomValues(buf);
  return Array.from(buf, b => b.toString(16).padStart(2, '0')).join('');
}

function encodeSession(token: string, username: string): string {
  const data = JSON.stringify({ token, username, exp: Date.now() + SESSION_DURATION * 1000 });
  const encoded = Buffer.from(data).toString('base64');
  return encoded;
}

function decodeSession(encoded: string): { token: string; username: string; exp: number } | null {
  try {
    const data = JSON.parse(Buffer.from(encoded, 'base64').toString());
    if (data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export function createSession(username: string): string {
  const token = generateToken();
  return encodeSession(token, username);
}

export function getSession(context: APIContext): { username: string } | null {
  const cookie = context.cookies.get(SESSION_COOKIE);
  if (!cookie || !cookie.value) return null;
  const session = decodeSession(cookie.value);
  if (!session) return null;
  return { username: session.username };
}

export function setSessionCookie(context: APIContext, session: string): void {
  context.cookies.set(SESSION_COOKIE, session, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
  });
}

export function clearSessionCookie(context: APIContext): void {
  context.cookies.delete(SESSION_COOKIE, { path: '/' });
}

export function validateCredentials(username: string, password: string): boolean {
  const adminUser = import.meta.env.ADMIN_USERNAME;
  const adminPass = import.meta.env.ADMIN_PASSWORD;
  return username === adminUser && password === adminPass;
}
