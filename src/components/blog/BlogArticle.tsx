import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog/types";
import { formatDate, readingMinutes } from "@/lib/blog/types";
import { articleSections, parseBlogBody } from "@/lib/blog/content";
import { BlogBody } from "./BlogBody";
import { BlogThemeSwitch } from "./BlogThemeSwitch";
import { ArticleContents } from "./ArticleContents";
import styles from "./Article.module.css";

export function BlogArticle({ post, preview = false }: { post: BlogPost; preview?: boolean }) {
  const ar = post.locale === "ar";
  const categoryAr: Record<string, string> = { "Lighting design": "تصميم الإضاءة", "Smart controls": "التحكم الذكي", "Project stories": "قصص المشاريع", "Company news": "أخبار الشركة" };
  const category = ar ? categoryAr[post.category] : post.category;
  const articleId = `blog-${post.id}`;
  const blocks = parseBlogBody(post.body);
  const sections = articleSections(blocks);

  return <article id={articleId} className={`${styles.article} ${preview ? styles.preview : ""}`} lang={post.locale} dir={ar ? "rtl" : "ltr"}>
    <header className={styles.introduction}>
      <div className={styles.articleTools}>
      <div className={styles.breadcrumb}>
        {preview ? <span>{ar ? "معاينة خاصة للفريق" : "Private team preview"}</span> : <Link href={ar ? "/ar/blogs" : "/blogs"}>{ar ? "المدونة" : "Blogs"}</Link>}
        <span aria-hidden="true">/</span><span>{category}</span>
      </div>
      <BlogThemeSwitch ar={ar} />
      </div>
      <h1 tabIndex={preview ? -1 : undefined}>{post.title || (ar ? "عنوان المقال" : "Your article title")}</h1>
      <p className={styles.lead}>{post.excerpt}</p>
      <dl className={styles.metadata}>
        <div><dt>{ar ? "التصنيف" : "Category"}</dt><dd>{category}</dd></div>
        <div><dt>{ar ? "الكاتب" : "Author"}</dt><dd>{post.author}</dd></div>
        <div><dt>{ar ? "تاريخ النشر" : post.status === "published" ? "Published" : "Draft updated"}</dt><dd><time dateTime={post.publishedAt || post.updatedAt}>{formatDate(post.publishedAt || post.updatedAt, post.locale)}</time></dd></div>
        <div><dt>{ar ? "وقت القراءة" : "Reading time"}</dt><dd>{readingMinutes(post.body)} {ar ? "دقائق" : "min read"}</dd></div>
      </dl>
      {!post.cover && preview && <p className={styles.previewCoverNote}>{ar ? "لم تتم إضافة صورة الغلاف بعد. يمكنك إضافتها من المحرر قبل النشر." : "No cover photo yet. Add one in the editor before publishing."}</p>}
      {post.sample && !preview && <p className={styles.sample}>{ar ? "مقال تجريبي للمعاينة المحلية" : "Sample article for local design review"}</p>}
    </header>
    {post.cover ? <figure className={styles.cover}><Image src={post.cover} alt={post.coverAlt} fill sizes="(max-width: 1600px) 100vw, 1600px" quality={60} unoptimized={post.cover.startsWith("/blog-media/") || post.cover.startsWith("blob:")} priority /></figure> : !preview ? <div className={styles.placeholder}>{ar ? "ستظهر صورة الغلاف هنا" : "Your cover image will appear here"}</div> : null}
    <div className={`${styles.readingGrid} ${!sections.length ? styles.withoutContents : ""}`}>
      <ArticleContents sections={sections} articleId={articleId} ar={ar} preview={preview} />
      <div className={styles.body}>
        <BlogBody blocks={blocks} articleId={articleId} />
        {!preview && <div className={styles.articleEnd}><p>{ar ? "لنناقش مشروعك القادم." : "A different perspective on your next project."}</p><Link href={ar ? "/ar/contact" : "/contact"}>{ar ? "تواصل مع الفريق" : "Talk to our team"}<span aria-hidden="true">↗</span></Link><Link className={styles.backLink} href={ar ? "/ar/blogs" : "/blogs"}>{ar ? "العودة إلى جميع المقالات" : "Back to all articles"}</Link></div>}
      </div>
    </div>
  </article>;
}
