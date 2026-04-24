import { jwtVerify } from "jose";

export async function hasValidSession(token?: string | null) {
  if (!token) {
    return false;
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "fallback-secret");
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}
