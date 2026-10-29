import "server-only";
import { createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BLOG_DATA_DIR, localBlogsEnabled } from "./storage";
const scrypt = promisify(scryptCallback);
const COOKIE = "arak-blog-team";
type Member = { email: string; name: string; salt: string; hash: string };
type Team = { secret: string; members: Member[] };
export async function readTeam(): Promise<Team | null> {
  if (!localBlogsEnabled()) return null;
  try { return JSON.parse(await readFile(path.join(BLOG_DATA_DIR, "team.json"), "utf8")); }
  catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") return null; throw error; }
}
export async function currentMember() {
  const team = await readTeam();
  const cookie = (await cookies()).get(COOKIE)?.value;
  if (!team || !cookie || cookie.length > 2048) return null;
  const [payload, signature] = cookie.split(".");
  if (!payload || !signature) return null;
  const expected = createHmac("sha256", team.secret).update(payload).digest("base64url");
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof session.expires !== "number" || session.expires < Date.now()) return null;
    const member = team.members.find(m => m.email === session.email && createHmac("sha256", team.secret).update(m.hash).digest("hex") === session.version);
    return member ? { email: member.email, name: member.name } : null;
  } catch { return null; }
}
export async function requireMember() { const member = await currentMember(); if (!member) redirect("/team/login"); return member; }
export async function signIn(email: string, password: string) {
  const team = await readTeam();
  const member = team?.members.find(m => m.email === email);
  // Do the password work for unknown accounts too; never reveal registered emails.
  const hash = await scrypt(password, member?.salt || "arak-unknown-account", 64) as Buffer;
  if (!team || !member || !timingSafeEqual(hash, Buffer.from(member.hash, "hex"))) return false;
  const payload = Buffer.from(JSON.stringify({ email, version: createHmac("sha256", team.secret).update(member.hash).digest("hex"), expires: Date.now() + 8 * 60 * 60 * 1000, nonce: randomBytes(12).toString("hex") })).toString("base64url");
  const signature = createHmac("sha256", team.secret).update(payload).digest("base64url");
  (await cookies()).set(COOKIE, `${payload}.${signature}`, { httpOnly: true, sameSite: "strict", secure: false, path: "/", maxAge: 8 * 60 * 60 });
  return true;
}
export async function signOut() { (await cookies()).delete(COOKIE); }
