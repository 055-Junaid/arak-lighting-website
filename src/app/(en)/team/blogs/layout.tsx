import { TeamWorkspace } from "@/components/blog/TeamWorkspace";
import { requireMember } from "@/lib/blog/auth";
import { logoutAction } from "@/lib/blog/actions";
import styles from "@/components/blog/Team.module.css";
export default async function Layout({ children }: { children: React.ReactNode }) {
  const member = await requireMember();
  return <TeamWorkspace heading={<div className={styles.top}><div className={styles.brand}><strong>ARAK publishing</strong><span className={styles.private}>Team only</span></div><div className={styles.account}><span>{member.name}</span><form action={logoutAction}><button className={styles.textButton}>Sign out</button></form></div></div>}>{children}</TeamWorkspace>;
}
