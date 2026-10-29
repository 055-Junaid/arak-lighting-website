import Link from "next/link";
import { redirect } from "next/navigation";
import { currentMember, readTeam } from "@/lib/blog/auth";
import { localBlogsEnabled } from "@/lib/blog/storage";
import { TeamLogin } from "@/components/blog/TeamLogin";
import styles from "@/components/blog/Team.module.css";
export default async function Page() {
  if (await currentMember()) redirect("/team/blogs");
  const team = await readTeam();
  return <div className={styles.login}><section className={styles.loginIntro}><div><span>ARAK team workspace</span><h1>Good stories start with your perspective.</h1><p>A private space for our team to write, refine, and publish ideas about light.</p></div><Link href="/blogs">Back to the website</Link></section><section className={styles.loginPanel}>
    {!localBlogsEnabled() ? <><h2>Publishing is not enabled</h2><p>This local publishing workspace is disabled in production. Company sign-in and shared content storage must be connected before launch.</p></> : team?.members.length ? <><h2>Team sign-in</h2><p>Use your approved employee account to continue.</p><TeamLogin /></> : <><h2>Set up team access</h2><p>This local workspace is ready. Your website administrator can add approved employees from the project terminal:</p><code className={styles.setupCode}>node scripts/blog-team.mjs add employee@company.com &quot;Employee Name&quot;</code><p>Each member gets an individual password. After an account is added, refresh this page to sign in.</p></>}
  </section></div>;
}
