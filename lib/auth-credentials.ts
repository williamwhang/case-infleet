import { timingSafeEqual } from "crypto";

type UserRole = "admin" | "user";

type UserCredentials = {
  email: string;
  password: string;
  role: UserRole;
  displayName: string;
};

export type AuthenticatedUser = {
  email: string;
  role: UserRole;
  name: string;
};

function safeCompare(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);

  if (aBuf.length !== bBuf.length) {
    return false;
  }

  return timingSafeEqual(aBuf, bBuf);
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normalizeSecret(value: string): string {
  return value.trim();
}

function getConfiguredUsers(): UserCredentials[] {
  const configured: UserCredentials[] = [];

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    configured.push({
      email: normalizeEmail(adminEmail),
      password: normalizeSecret(adminPassword),
      role: "admin",
      displayName: "Admin",
    });
  }

  const userEmail = process.env.USER_EMAIL;
  const userPassword = process.env.USER_PASSWORD;
  if (userEmail && userPassword) {
    configured.push({
      email: normalizeEmail(userEmail),
      password: normalizeSecret(userPassword),
      role: "user",
      displayName: "Convidado",
    });
  }

  return configured;
}

export function authenticateWithPassword(rawEmail: string, rawPassword: string): AuthenticatedUser | null {
  const email = normalizeEmail(rawEmail);
  const password = rawPassword;
  const users = getConfiguredUsers();

  for (const user of users) {
    if (!safeCompare(email, user.email)) {
      continue;
    }

    if (!safeCompare(password, user.password)) {
      return null;
    }

    return {
      email: user.email,
      role: user.role,
      name: user.displayName,
    };
  }

  return null;
}

export function hasPasswordAuthConfigured(): boolean {
  return getConfiguredUsers().length > 0;
}
