import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { readSignedValue, signValue } from "./signed";

export const FLOW_COOKIE = "arak-blog-signin";
export const FLOW_COOKIE_PATH = "/team/auth";
const FLOW_MINUTES = 10;
type Flow = { purpose: "microsoft-signin"; expires: number; state: string; nonce: string; verifier: string };
type Config = NonNullable<ReturnType<typeof microsoftConfig>>;
const keySets = new Map<string, ReturnType<typeof createRemoteJWKSet>>();
const random = () => randomBytes(32).toString("base64url");

export function microsoftConfig() {
  const tenant = process.env.BLOG_ENTRA_TENANT_ID?.trim().toLowerCase();
  const clientId = process.env.BLOG_ENTRA_CLIENT_ID?.trim();
  const clientSecret = process.env.BLOG_ENTRA_CLIENT_SECRET;
  const origin = process.env.BLOG_AUTH_ORIGIN?.trim().replace(/\/$/, "");
  const secret = process.env.BLOG_SESSION_SECRET;
  // A GUID is required: "common" or "organizations" would admit other companies.
  if (!tenant || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(tenant)) return null;
  if (!clientId || !clientSecret || !origin || !secret || secret.length < 32) return null;
  const authority = `https://login.microsoftonline.com/${tenant}`;
  return { tenant, clientId, clientSecret, secret, redirectUri: `${origin}/team/auth/callback`, authorizeUrl: `${authority}/oauth2/v2.0/authorize`, tokenUrl: `${authority}/oauth2/v2.0/token`, keysUrl: `${authority}/discovery/v2.0/keys`, issuer: `${authority}/v2.0` };
}

export function beginMicrosoftSignIn(config: Config) {
  const flow: Flow = { purpose: "microsoft-signin", expires: Date.now() + FLOW_MINUTES * 60 * 1000, state: random(), nonce: random(), verifier: random() };
  const url = new URL(config.authorizeUrl);
  url.search = new URLSearchParams({ client_id: config.clientId, response_type: "code", redirect_uri: config.redirectUri, response_mode: "query", scope: "openid profile email", state: flow.state, nonce: flow.nonce, code_challenge: createHash("sha256").update(flow.verifier).digest("base64url"), code_challenge_method: "S256", prompt: "select_account" }).toString();
  return { url: url.toString(), cookie: signValue(flow, config.secret), maxAge: FLOW_MINUTES * 60 };
}

export const readMicrosoftFlow = (config: Config, cookie?: string) => readSignedValue<Flow>(cookie, config.secret, "microsoft-signin");

export async function completeMicrosoftSignIn(config: Config, code: string, flow: Flow) {
  const response = await fetch(config.tokenUrl, {
    method: "POST",
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: config.clientId, client_secret: config.clientSecret, grant_type: "authorization_code", code, redirect_uri: config.redirectUri, code_verifier: flow.verifier }),
  });
  if (!response.ok) throw new Error(`Microsoft token request failed (${response.status})`);
  const { id_token: idToken } = await response.json() as { id_token?: string };
  if (!idToken) throw new Error("Microsoft returned no identity token");
  if (!keySets.has(config.keysUrl)) keySets.set(config.keysUrl, createRemoteJWKSet(new URL(config.keysUrl)));
  const { payload } = await jwtVerify(idToken, keySets.get(config.keysUrl)!, { issuer: config.issuer, audience: config.clientId, algorithms: ["RS256"] });
  if (payload.nonce !== flow.nonce || payload.tid !== config.tenant) throw new Error("Microsoft identity did not match this sign-in");
  // An idp claim marks a guest from another directory, whose address we do not control.
  if (payload.idp !== undefined) throw new Error("Guest accounts cannot publish");
  if (typeof payload.preferred_username !== "string") throw new Error("Microsoft identity has no work account");
  const email = payload.preferred_username.trim().toLowerCase();
  return { email, name: typeof payload.name === "string" && payload.name.trim() ? payload.name.trim().slice(0, 120) : email.split("@")[0] };
}
