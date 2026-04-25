import { jwtVerify, SignJWT } from "jose";

type ApprovalPayload = {
  email: string;
  name: string;
  purpose: "visitor-access-approval";
};

function getSecret() {
  return new TextEncoder().encode(
    process.env.ACCESS_APPROVAL_SECRET ?? process.env.JWT_SECRET ?? "fallback-secret"
  );
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function createApprovalToken(email: string, name: string) {
  return new SignJWT({
    email: normalizeEmail(email),
    name: name.trim(),
    purpose: "visitor-access-approval",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getSecret());
}

export async function verifyApprovalToken(token: string): Promise<ApprovalPayload> {
  const { payload } = await jwtVerify(token, getSecret());

  if (payload.purpose !== "visitor-access-approval") {
    throw new Error("Invalid approval token purpose");
  }

  if (typeof payload.email !== "string" || typeof payload.name !== "string") {
    throw new Error("Invalid approval token payload");
  }

  return {
    email: normalizeEmail(payload.email),
    name: payload.name.trim(),
    purpose: "visitor-access-approval",
  };
}
