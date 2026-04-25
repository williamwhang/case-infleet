import { kv } from "@vercel/kv";

export interface OtpEntry {
  code: string;
  name: string;
  expiresAt: number;
}

const memoryStore = new Map<string, OtpEntry>();

function keyFor(email: string) {
  return `otp:${email.trim().toLowerCase()}`;
}

function hasKvConfigured() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function setOtp(email: string, code: string, name: string, ttlSeconds = 900) {
  const entry: OtpEntry = {
    code,
    name,
    expiresAt: Date.now() + ttlSeconds * 1000,
  };

  if (hasKvConfigured()) {
    await kv.set(keyFor(email), entry, { ex: ttlSeconds });
    return;
  }

  memoryStore.set(keyFor(email), entry);
}

export async function getOtp(email: string): Promise<OtpEntry | null> {
  if (hasKvConfigured()) {
    const entry = await kv.get<OtpEntry>(keyFor(email));
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      await kv.del(keyFor(email));
      return null;
    }
    return entry;
  }

  const entry = memoryStore.get(keyFor(email));
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    memoryStore.delete(keyFor(email));
    return null;
  }
  return entry;
}

export async function deleteOtp(email: string) {
  if (hasKvConfigured()) {
    await kv.del(keyFor(email));
    return;
  }

  memoryStore.delete(keyFor(email));
}
