import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { beginMicrosoftSignIn, FLOW_COOKIE, FLOW_COOKIE_PATH, microsoftConfig } from "@/lib/blog/microsoft";
export const dynamic = "force-dynamic";
export async function GET() {
  const config = microsoftConfig();
  if (!config) redirect("/team/login");
  const signIn = beginMicrosoftSignIn(config);
  (await cookies()).set(FLOW_COOKIE, signIn.cookie, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: FLOW_COOKIE_PATH, maxAge: signIn.maxAge });
  redirect(signIn.url);
}
