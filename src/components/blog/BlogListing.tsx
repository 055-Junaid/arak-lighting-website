"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogPath, CATEGORIES, formatDate, type BlogSummary } from "@/lib/blog/types";
import { BlogThemeSwitch } from "./BlogThemeSwitch";
import styles from "./Blogs.module.css";
const categoryAr: Record<string, string> = { "Lighting design": "تصميم الإضاءة", "Smart controls": "التحكم الذكي", "Project stories": "قصص المشاريع", "Company news": "أخبار الشركة" };
export function BlogListing({ posts, locale }: { posts: BlogSummary[]; locale: "en" | "ar" }) {
  const ar = locale === "ar";
  const [category, setCategory] = useState("All articles");
  const [query, setQuery] = useState("");
  const filtered = posts.filter(post => (category === "All articles" || post.category === category) && `${post.title} ${post.excerpt} ${post.author} ${post.category}`.toLowerCase().includes(query.toLowerCase().trim()));
  const featured = !query && category === "All articles" ? filtered[0] : undefined;
  const cards = featured ? filtered.slice(1) : filtered;
  return <div className={styles.page}>
    <header className={styles.hero}><div className={styles.heroTools}><p className={styles.eyebrow}>{ar ? "من فريق أراك" : "From the ARAK team"}</p><BlogThemeSwitch ar={ar} /></div><div className={styles.heroRow}><h1>{ar ? "المدونة" : "Blogs"}<span className={styles.titleDot}>.</span></h1><p>{ar ? "أفكار في الإضاءة والعمارة والمساحات التي تجمعنا." : "Ideas on light, architecture, and the spaces we share."}</p></div></header>
    {posts.some(p => p.sample) && <p className={styles.notice}>{ar ? "معاينة محلية بمقالات تجريبية. تُدار المقالات من مساحة الفريق الخاصة." : "Local preview with sample articles. Manage content in the private team workspace."}</p>}
    {featured && <Link href={blogPath(featured)} className={styles.featured}>
      <div className={styles.featuredImage}><Image src={featured.cover} alt={featured.coverAlt} fill priority sizes="(max-width: 960px) 100vw, 65vw" quality={60} unoptimized={featured.cover.startsWith("/blog-media/")} /></div>
      <div className={styles.featuredCopy}><span className={styles.category}>{ar ? categoryAr[featured.category] : featured.category}</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><div className={styles.meta}><time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt || featured.updatedAt, locale)}</time><span>{featured.minutes} {ar ? "دقائق للقراءة" : "min read"}</span></div><span className={styles.read}>{ar ? "اقرأ المقال" : "Read the story"}<svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" /></svg></span></div>
    </Link>}
    <section className={styles.library} aria-label={ar ? "المقالات" : "Articles"}><div className={styles.libraryHead}><h2>{ar ? "اكتشف المزيد" : "Explore the journal"}</h2><label className={styles.search}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="m15 15 5 5" stroke="currentColor" strokeWidth="1.5"/></svg><span className={styles.srOnly}>{ar ? "ابحث في المقالات" : "Search articles"}</span><input value={query} onChange={e => setQuery(e.target.value)} type="search" placeholder={ar ? "ابحث في المقالات" : "Search articles"} /></label></div>
    <div className={styles.filters} aria-label={ar ? "التصنيفات" : "Categories"}>{["All articles", ...CATEGORIES].map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)} className={category === item ? styles.filterActive : ""}>{ar ? (item === "All articles" ? "جميع المقالات" : categoryAr[item]) : item}</button>)}</div>
    <p className={styles.srOnly} aria-live="polite">{filtered.length} {ar ? "مقالات" : "articles found"}</p>
    <div className={styles.grid}>{cards.map(post => <Link href={blogPath(post)} className={styles.card} key={post.id}><div className={styles.cardImage}><Image src={post.cover} alt={post.coverAlt} fill sizes="(max-width: 680px) 100vw, (max-width: 1080px) 50vw, 33vw" quality={60} unoptimized={post.cover.startsWith("/blog-media/")} /></div><p className={styles.category}>{ar ? categoryAr[post.category] : post.category}</p><h3>{post.title}</h3><p className={styles.cardExcerpt}>{post.excerpt}</p><div className={styles.meta}><time dateTime={post.publishedAt}>{formatDate(post.publishedAt || post.updatedAt, locale)}</time><span>{post.minutes} {ar ? "دقائق للقراءة" : "min read"}</span></div></Link>)}</div>
    {filtered.length === 0 && <div className={styles.empty}><h3>{posts.length ? (ar ? "لم نعثر على مقالات" : "No articles found") : (ar ? "قصص جديدة قريباً" : "New stories are on the way.")}</h3><p>{posts.length ? (ar ? "جرّب كلمات بحث أو تصنيفاً آخر." : "Try another search or choose a different category.") : (ar ? "أفكار وقصص من فريق أراك. تابعونا قريباً." : "Thoughts and stories from the ARAK team. Check back soon.")}</p>{posts.length > 0 && <button type="button" className={styles.secondary} onClick={() => { setQuery(""); setCategory("All articles"); }}>{ar ? "مسح الفلاتر" : "Clear filters"}</button>}</div>}
    </section>
    <aside className={styles.journalEnd}><div><h2>{ar ? "مساحة تستحق إضاءة أفضل؟" : "A space worth seeing differently?"}</h2><p>{ar ? "لنبدأ بالحديث عن مشروعك." : "A good lighting conversation starts with your project."}</p></div><Link className={styles.button} href={ar ? "/ar/contact" : "/contact"}>{ar ? "تواصل معنا" : "Start a conversation"}</Link></aside>
  </div>;
}
