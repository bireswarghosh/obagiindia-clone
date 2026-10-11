/**
 * CMS admin guard — shared by /api/obagi-cms and /api/upload.
 * Design-lock note: text/image/video values only; this file only gates
 * WHO can write, never touches public-page visuals.
 */

export function getAdminPin(): string {
  return (
    process.env.CMS_ADMIN_PIN ||
    process.env.ADMIN_CMS_PIN ||
    '1234'
  );
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/** Accepts `x-cms-pin: <pin>` header or `Authorization: Bearer <pin>`. */
export function requestHasValidPin(req: Request): boolean {
  const expected = getAdminPin();
  if (!expected) return false;
  const headerPin = req.headers.get('x-cms-pin') || '';
  const auth = req.headers.get('authorization') || '';
  const bearer = auth.toLowerCase().startsWith('bearer ')
    ? auth.slice(7).trim()
    : '';
  const provided = (headerPin || bearer || '').trim();
  if (!provided) return false;
  return timingSafeEqual(provided, expected);
}

export function verifyPin(pin: unknown): boolean {
  if (typeof pin !== 'string' || !pin) return false;
  return timingSafeEqual(pin.trim(), getAdminPin());
}
