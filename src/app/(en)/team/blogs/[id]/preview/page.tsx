import Link from "next/link";
import { notFound } from "next/navigation";
import { requireMember } from "@/lib/blog/auth";
import { postById } from "@/lib/blog/storage";
import { BlogArticle } from "@/components/blog/BlogArticle";
import styles from "@/components/blog/Blogs.module.css";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  await requireMember();
  const post = await postById((await params).id);
  if (!post) notFound();
  return <><Link className={styles.back} href={`/team/blogs/${post.id}`}>Back to editor</Link><p className={styles.notice}>Private preview of the last saved version. Only signed-in team members can open this page.</p><BlogArticle post={post} preview /></>;
}
