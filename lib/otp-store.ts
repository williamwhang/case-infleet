interface OtpEntry {
  code: string;
  name: string;
  expiresAt: number;
}

// In-memory store — works for single-process environments (dev + single-instance prod).
const store = new Map<string, OtpEntry>();

export function setOtp(email: string, code: string, name: string, ttlSeconds = 900) {
  store.set(email.toLowerCase(), {
    code,
    name,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

export function getOtp(email: string): OtpEntry | null {
  const entry = store.get(email.toLowerCase());
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(email.toLowerCase());
    return null;
  }
  return entry;
}

export function deleteOtp(email: string) {
  store.delete(email.toLowerCase());
}
