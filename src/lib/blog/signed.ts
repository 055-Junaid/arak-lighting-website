import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

type Signed = { purpose: string; expires: number };
const signature = (payload: string, secret: string) => createHmac("sha256", secret).update(payload).digest("base64url");

export function signValue(value: Signed & Record<string, unknown>, secret: string) {
  const payload = Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${payload}.${signature(payload, secret)}`;
}

export function readSignedValue<T extends Signed>(token: string | undefined, secret: string, purpose: T["purpose"]): T | null {
  if (!token || token.length > 2048) return null;
  const [payload, received, extra] = token.split(".");
  if (!payload || !received || extra !== undefined) return null;
  const expected = Buffer.from(signature(payload, secret));
  const actual = Buffer.from(received);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
  try {
    const value = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as T;
    return value.purpose === purpose && typeof value.expires === "number" && value.expires > Date.now() ? value : null;
  } catch { return null; }
}
