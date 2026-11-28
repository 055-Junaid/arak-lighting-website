"use client";
import { useEffect } from "react";
import { LAST_ARTICLE_KEY, trackEvent } from "@/lib/analytics";

// Reports reads and contact clicks for one public article. See lib/analytics.ts.
export function BlogAnalytics({ articleId, slug, category, locale }: { articleId: string; slug: string; category: string; locale: string }) {
  useEffect(() => {
    const article = document.getElementById(articleId);
    const end = article?.querySelector("[data-article-end]");
    if (!article) return;
    const params = { article: slug, article_category: category, article_language: locale };
    // Remembered for this tab only, so an enquiry sent after reading can name the article.
    try { sessionStorage.setItem(LAST_ARTICLE_KEY, slug); } catch { /* storage blocked */ }
    let read = false;
    const observer = new IntersectionObserver(entries => {
      if (read || !entries.some(entry => entry.isIntersecting)) return;
      read = true;
      trackEvent("blog_read", params);
      observer.disconnect();
    });
    if (end) observer.observe(end);
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      const href = link?.getAttribute("href") || "";
      if (!link || !/^(\/ar)?\/contact\/?(?:[?#].*)?$/.test(href)) return;
      trackEvent("blog_contact_click", { ...params, link_location: link.closest("[data-article-end]") ? "article_end" : "in_article" });
    };
    article.addEventListener("click", onClick, true);
    return () => { observer.disconnect(); article.removeEventListener("click", onClick, true); };
  }, [articleId, slug, category, locale]);
  return null;
}
