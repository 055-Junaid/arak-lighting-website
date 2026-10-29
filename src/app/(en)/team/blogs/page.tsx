import Image from "next/image";
import Link from "next/link";
import { requireMember } from "@/lib/blog/auth";
import { allPosts } from "@/lib/blog/storage";
import { blogPath, formatDate } from "@/lib/blog/types";
import shared from "@/components/blog/Blogs.module.css";
import styles from "@/components/blog/Team.module.css";
export default async function Page() {
  await requireMember();
  const posts = await allPosts();
  return <><div className={styles.heading}><div><h1>Your stories, in one place.</h1><p>Create a draft, check the preview, and publish when it’s ready.</p></div><Link className={shared.button} href="/team/blogs/new">Create a blog</Link></div><div className={styles.stats}><span><strong>{posts.length}</strong>All articles</span><span><strong>{posts.filter(p => p.status === "published").length}</strong>Published</span><span><strong>{posts.filter(p => p.status === "draft").length}</strong>Drafts</span></div>
    <div className={styles.list}>{posts.map(post => <article className={styles.row} key={post.id}><div className={styles.thumbnail}>{post.cover && <Image src={post.cover} alt="" fill sizes="82px" quality={60} unoptimized={post.cover.startsWith("/blog-media/")} />}</div><div><h2><Link href={`/team/blogs/${post.id}`}>{post.title}</Link></h2><div className={styles.rowMeta}><span>{post.category}</span><span>{post.locale === "ar" ? "Arabic" : "English"}</span><span>Updated {formatDate(post.updatedAt)}</span>{post.sample && <span>Design sample</span>}</div></div><span className={`${styles.status} ${post.status === "published" ? styles.published : ""}`}>{post.status === "published" ? "Published" : "Draft"}</span><div className={styles.rowActions}><Link href={`/team/blogs/${post.id}`}>Edit</Link><Link href={post.status === "published" ? blogPath(post) : `/team/blogs/${post.id}/preview`}>View</Link></div></article>)}</div>
    {posts.length === 0 && <div className={shared.empty}><h3>Your first story starts here.</h3><p>Create a draft and take your time. It stays private until you publish.</p><Link href="/team/blogs/new" className={shared.button}>Create a blog</Link></div>}
    <p className={styles.localNote}>Local workspace: posts and uploads are stored on this computer. Approved members can publish directly. Drafts and unpublished cover images are private. Shared storage and company sign-in are required before this workspace goes live.</p></>;
}
