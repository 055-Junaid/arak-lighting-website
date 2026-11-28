"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogPath, CATEGORIES, categoryLabel, formatDate, type BlogSummary } from "@/lib/blog/types";
import { BlogThemeSwitch } from "./BlogThemeSwitch";
import styles from "./Blogs.module.css";
export function BlogListing({ posts, locale }: { posts: BlogSummary[]; locale: "en" | "ar" }) {
  const ar = locale === "ar";
  const [category, setCategory] = useState("All articles");
  const [query, setQuery] = useState("");
  const filtered = posts.filter(post => (category === "All articles" || post.category === category) && `${post.title} ${post.excerpt} ${categoryLabel(post.category, locale)}`.toLowerCase().includes(query.toLowerCase().trim()));
  return <div className={styles.page}>
    <header className={styles.hero}><div className={styles.heroTools}><p className={styles.eyebrow}>{ar ? "من فريق أراك" : "From the ARAK team"}</p><BlogThemeSwitch ar={ar} /></div><div className={styles.heroRow}><h1>{ar ? "المدونة" : "Blogs"}<span className={styles.titleDot}>.</span></h1><p>{ar ? "أفكار في الإضاءة والعمارة والمساحات التي تجمعنا." : "Ideas on light, architecture, and the spaces we share."}</p></div></header>
    {posts.some(p => p.sample) && <p className={styles.notice}>{ar ? "معاينة محلية بمقالات تجريبية. تُدار المقالات من مساحة الفريق الخاصة." : "Local preview with sample articles. Manage content in the private team workspace."}</p>}
    <section className={styles.library} aria-label={ar ? "المقالات" : "Articles"}><div className={styles.libraryHead}><h2>{ar ? "اكتشف المزيد" : "Explore the journal"}</h2><label className={styles.search}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="m15 15 5 5" stroke="currentColor" strokeWidth="1.5"/></svg><span className={styles.srOnly}>{ar ? "ابحث في المقالات" : "Search articles"}</span><input value={query} onChange={e => setQuery(e.target.value)} type="search" placeholder={ar ? "ابحث في المقالات" : "Search articles"} /></label></div>
    <div className={styles.filters} aria-label={ar ? "التصنيفات" : "Categories"}>{["All articles", ...CATEGORIES].map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)} className={category === item ? styles.filterActive : ""}>{item === "All articles" ? (ar ? "جميع المقالات" : item) : categoryLabel(item, locale)}</button>)}</div>
    <p className={styles.srOnly} aria-live="polite">{filtered.length} {ar ? "مقالات" : "articles found"}</p>
    {/* One grid for every filter, so an article looks the same wherever it is listed. */}
    <div className={styles.grid}>{filtered.map((post, index) => {
      // Both language pages list every article; one in the other language says so and keeps its own direction.
      const other = post.locale !== locale;
      return <Link href={blogPath(post)} className={styles.card} key={post.id} lang={post.locale} dir={post.locale === "ar" ? "rtl" : "ltr"}><div className={styles.cardImage}><Image src={post.cover} alt={post.coverAlt} fill priority={index < 3} sizes="(max-width: 680px) 100vw, (max-width: 1080px) 50vw, 33vw" quality={60} unoptimized={post.cover.startsWith("/blog-media/")} /></div><p className={styles.category}>{categoryLabel(post.category, post.locale)}{other && <span className={styles.languageTag} lang={locale} dir={ar ? "rtl" : "ltr"}>{ar ? "مقال بالإنجليزية" : "In Arabic"}</span>}</p><h3>{post.title}</h3><p className={styles.cardExcerpt}>{post.excerpt}</p><div className={styles.meta}><time dateTime={post.publishedAt}>{formatDate(post.publishedAt || post.updatedAt, post.locale)}</time><span>{post.minutes} {post.locale === "ar" ? "دقائق للقراءة" : "min read"}</span></div></Link>;
    })}</div>
    {filtered.length === 0 && <div className={styles.empty}><h3>{posts.length ? (ar ? "لم نعثر على مقالات" : "No articles found") : (ar ? "قصص جديدة قريباً" : "New stories are on the way.")}</h3><p>{posts.length ? (ar ? "جرّب كلمات بحث أو تصنيفاً آخر." : "Try another search or choose a different category.") : (ar ? "أفكار وقصص من فريق أراك. تابعونا قريباً." : "Thoughts and stories from the ARAK team. Check back soon.")}</p>{posts.length > 0 && <button type="button" className={styles.secondary} onClick={() => { setQuery(""); setCategory("All articles"); }}>{ar ? "مسح الفلاتر" : "Clear filters"}</button>}</div>}
    </section>
    <aside className={styles.journalEnd}><div><h2>{ar ? "مساحة تستحق إضاءة أفضل؟" : "A space worth seeing differently?"}</h2><p>{ar ? "لنبدأ بالحديث عن مشروعك." : "A good lighting conversation starts with your project."}</p></div><Link className={styles.button} href={ar ? "/ar/contact" : "/contact"}>{ar ? "تواصل معنا" : "Start a conversation"}</Link></aside>
  </div>;
}
