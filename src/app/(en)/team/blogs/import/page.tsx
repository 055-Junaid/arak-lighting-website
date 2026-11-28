import { requireMember } from "@/lib/blog/auth";
import { GoogleDocImport } from "@/components/blog/GoogleDocImport";
import styles from "@/components/blog/Team.module.css";
export default async function Page() {
  await requireMember();
  return <><div className={styles.heading}><div><h1>Import from Google Docs.</h1><p>Turn a finished Google Doc into a private draft, then review it in the editor and publish.</p></div></div><GoogleDocImport /></>;
}
