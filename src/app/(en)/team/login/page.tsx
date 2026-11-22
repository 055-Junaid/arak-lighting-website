import Link from "next/link";
import { redirect } from "next/navigation";
import { currentMember, readTeam } from "@/lib/blog/auth";
import { microsoftConfig } from "@/lib/blog/microsoft";
import { blogStorageEnabled, localBlogsEnabled } from "@/lib/blog/storage";
import { TeamLogin } from "@/components/blog/TeamLogin";
import shared from "@/components/blog/Blogs.module.css";
import styles from "@/components/blog/Team.module.css";
const ERRORS: Record<string, string> = {
  denied: "This Microsoft account does not have blog publishing access. Contact your website administrator.",
  signin: "We could not complete your sign-in. Please try again.",
};
export default async function Page({ searchParams }: { searchParams: Promise<{ error?: string | string[] }> }) {
  if (await currentMember()) redirect("/team/blogs");
  const team = await readTeam();
  const { error } = await searchParams;
  const message = typeof error === "string" && Object.hasOwn(ERRORS, error) ? ERRORS[error] : "";
  const microsoftReady = !localBlogsEnabled() && blogStorageEnabled() && Boolean(microsoftConfig());
  return <div className={styles.login}><section className={styles.loginIntro}><div><span>ARAK team workspace</span><h1>Good stories start with your perspective.</h1><p>A private space for our team to write, refine, and publish ideas about light.</p></div><Link href="/blogs">Back to the website</Link></section><section className={styles.loginPanel}>
    {microsoftReady ? <><h2>Team sign-in</h2><p>Use your ARAK Microsoft work account to continue.</p>{message && <p className={styles.error} role="alert">{message}</p>}<a className={shared.button} href="/team/auth/microsoft">Sign in with Microsoft</a><p className={styles.hint}>Access is limited to approved team members.</p></> : !localBlogsEnabled() ? <><h2>Publishing is not enabled</h2><p>Team sign-in has not been configured for this website yet.</p></> : team?.members.length ? <><h2>Team sign-in</h2><p>Use your approved employee account to continue.</p><TeamLogin /></> : <><h2>Set up team access</h2><p>This local workspace is ready. Your website administrator can add approved employees from the project terminal:</p><code className={styles.setupCode}>node scripts/blog-team.mjs add employee@company.com &quot;Employee Name&quot;</code><p>Each member gets an individual password. After an account is added, refresh this page to sign in.</p></>}
  </section></div>;
}
