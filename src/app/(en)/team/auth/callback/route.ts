import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isApprovedPublisher } from "@/lib/blog/access";
import { startMicrosoftSession } from "@/lib/blog/auth";
import { completeMicrosoftSignIn, FLOW_COOKIE, FLOW_COOKIE_PATH, microsoftConfig, readMicrosoftFlow } from "@/lib/blog/microsoft";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const config = microsoftConfig();
  if (!config) redirect("/team/login");
  const jar = await cookies();
  const flow = readMicrosoftFlow(config, jar.get(FLOW_COOKIE)?.value);
  jar.delete({ name: FLOW_COOKIE, path: FLOW_COOKIE_PATH });
  const query = new URL(request.url).searchParams;
  const code = query.get("code");
  let destination = "/team/login?error=signin";
  if (flow && code && query.get("state") === flow.state) {
    try {
      const member = await completeMicrosoftSignIn(config, code, flow);
      if (isApprovedPublisher(member.email)) {
        await startMicrosoftSession(member, config.secret);
        destination = "/team/blogs";
      } else destination = "/team/login?error=denied";
    } catch (error) {
      console.error("Blog sign-in failed:", error instanceof Error ? error.message : "unknown error");
    }
  }
  redirect(destination);
}
