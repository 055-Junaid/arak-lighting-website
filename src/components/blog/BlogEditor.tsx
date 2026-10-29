"use client";
import { useActionState, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { saveBlogAction } from "@/lib/blog/actions";
import { CATEGORIES, blogPath, readingMinutes, type BlogPost } from "@/lib/blog/types";
import { blogBodyText } from "@/lib/blog/rich-text";
import { BlogArticle } from "./BlogArticle";
import { RichTextEditor } from "./RichTextEditor";
import { EditorDialog } from "./EditorDialog";
import styles from "./Editor.module.css";
function slugify(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 100).replace(/-$/g, ""); }
export function BlogEditor({ post, author }: { post?: BlogPost; author: string }) {
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [manualSlug, setManualSlug] = useState(!!post);
  const [body, setBody] = useState(post?.body || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [category, setCategory] = useState(post?.category || CATEGORIES[0]);
  const [locale, setLocale] = useState(post?.locale || "en");
  const [coverAlt, setCoverAlt] = useState(post?.coverAlt || "");
  const [cover, setCover] = useState(post?.cover || "");
  const [preview, setPreview] = useState(false);
  const [settings, setSettings] = useState(false);
  const [coverDialog, setCoverDialog] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileError, setFileError] = useState("");
  const [leaveOpen, setLeaveOpen] = useState(false);
  const blobRef = useRef<string | null>(null);
  const fileRef = useRef<File | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const toolbarRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const writingScroll = useRef(0);
  const nextScroll = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const saveRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const introRef = useRef<HTMLTextAreaElement>(null);
  const [publishState, setPublishState] = useState(post?.status || "draft");
  const [state, action, pending] = useActionState(async (previous: import("@/lib/blog/types").ActionResult, form: FormData) => {
    for (const [key, value] of Object.entries({title, slug, body, excerpt, category, locale, coverAlt})) form.set(key, value);
    if (fileRef.current) form.set("coverFile", fileRef.current);
    const result = await saveBlogAction(previous, form);
    setCoverDialog(false);
    if (result.error) { setPreview(false); setPublishing(false); setSettings(true); }
    else { setDirty(false); fileRef.current = null; if (result.cover) setCover(result.cover); if (result.status) setPublishState(result.status); setSettings(false); }
    return result;
  }, {});
  // Preview uses the current unsaved draft and starts at the article's beginning.
  // Returning to the canvas restores the writer's place without remounting the editor.
  function togglePreview() {
    if (preview) nextScroll.current = writingScroll.current;
    else { writingScroll.current = window.scrollY; nextScroll.current = 0; }
    setPreview(!preview);
  }
  useLayoutEffect(() => {
    if (nextScroll.current === null) return;
    window.scrollTo({top: nextScroll.current, behavior: "instant"});
    nextScroll.current = null;
    if (preview) previewRef.current?.querySelector("h1")?.focus({preventScroll: true});
  }, [preview]);
  useEffect(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar) return;
    const measure = () => rootRef.current?.style.setProperty("--editor-toolbar-height", `${toolbar.offsetHeight}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(toolbar);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  useEffect(() => {
    const save = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") { event.preventDefault(); if (!pending && !uploading) formRef.current?.requestSubmit(saveRef.current); } };
    document.addEventListener("keydown", save); return () => document.removeEventListener("keydown", save);
  }, [pending, uploading]);
  useEffect(() => {
    const fit = () => { for (const field of [titleRef.current, introRef.current]) if (field && field.offsetWidth) { field.style.height = "auto"; field.style.height = `${field.scrollHeight}px`; } };
    fit(); window.addEventListener("resize", fit);
    let width = 0;
    const observer = new ResizeObserver(entries => { const next = entries[0]?.contentRect.width || 0; if (next && next !== width) { width = next; fit(); } });
    const canvas = titleRef.current?.parentElement;
    if (canvas) observer.observe(canvas);
    return () => { observer.disconnect(); window.removeEventListener("resize", fit); };
  }, [title, excerpt, preview]);
  useEffect(() => () => { if (blobRef.current) URL.revokeObjectURL(blobRef.current); }, []);
  const draft: BlogPost = { id: post?.id || "preview", title, slug, body, excerpt, category, locale, author: post?.author || author, cover, coverAlt, status: publishState, createdAt: post?.createdAt || new Date().toISOString(), updatedAt: state.updatedAt || post?.updatedAt || new Date().toISOString(), publishedAt: post?.publishedAt };
  const wordCount = blogBodyText(body).trim().split(/\s+/).filter(Boolean).length;
  const missing = [!title.trim() && "Title", !slug && "Blog URL", !excerpt.trim() && "Introduction", !wordCount && "Article text", !cover && "Cover image", !coverAlt.trim() && "Cover description"].filter(Boolean);
  function openCover() { setSettings(false); setCoverDialog(true); }
  const coverFields = <>
          <label className={styles.field}>Cover photo<div className={styles.coverPicker}>{cover ? <div className={styles.coverPreview}><Image src={cover} alt={coverAlt || "Selected cover"} fill sizes="400px" unoptimized /></div> : <span className={styles.emptyCover}>+ Add a cover image</span>}<input type="file" accept="image/jpeg,image/png,image/webp" aria-label="Choose cover photo" onChange={e => {
            const file = e.target.files?.[0]; if (!file) return;
            if (file.size > 5 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) { setFileError("Choose a JPG, PNG or WebP image smaller than 5 MB."); e.target.value = ""; return; }
            setDirty(true); setFileError(""); fileRef.current = file; if (blobRef.current) URL.revokeObjectURL(blobRef.current); blobRef.current = URL.createObjectURL(file); setCover(blobRef.current);
          }} /></div><small>JPG, PNG or WebP. Up to 5 MB. A wide image works best.</small></label>
          {fileError && <p className={styles.error} role="alert">{fileError}</p>}
          <label className={styles.field}>Cover description<input value={coverAlt} onChange={e => { setCoverAlt(e.target.value); setDirty(true); }} maxLength={240} placeholder="Describe what the cover image shows" dir="auto" /></label>
  </>;
  return <main ref={rootRef} id="main" tabIndex={-1} className={styles.editorShell}>
    <form ref={formRef} action={action} noValidate>
      <input type="hidden" name="id" value={post?.id || ""} /><input type="hidden" name="updatedAt" value={state.updatedAt || post?.updatedAt || ""} />
      <header ref={toolbarRef} className={styles.topbar}>
        <div className={styles.identity}><Link href="/team/blogs" aria-label="Back to all blogs" className={styles.back} onClick={e => { if (dirty) { e.preventDefault(); setLeaveOpen(true); } }}><span aria-hidden="true">←</span><span>All blogs</span></Link><span className={styles.separator} /><strong>ARAK</strong><span className={styles.draftLabel}>{publishState === "published" ? "Published" : "Draft"}</span><span className={styles.saveStatus} role="status">{pending ? "Saving…" : uploading ? "Uploading image…" : dirty ? "Unsaved changes" : post ? "Saved" : "New story"}</span></div>
        <div className={styles.buttons}>
          <button type="button" className={styles.quietButton} disabled={pending || uploading} aria-pressed={preview} onClick={togglePreview}>{preview ? "Back to editor" : "Preview"}</button>
          <button type="button" className={styles.quietButton} disabled={pending || uploading} onClick={() => { setPublishing(false); setSettings(true); }}>Post settings</button>
          <button ref={saveRef} type="submit" name="intent" value="save" className={styles.saveButton} disabled={pending || uploading}>{publishState === "published" ? "Save changes" : "Save draft"}</button>
          {publishState !== "published" && <button type="button" className={styles.primary} disabled={pending || uploading} onClick={() => { setPublishing(true); setSettings(true); }}>Publish</button>}
        </div>
      </header>
      {state.error && <p className={styles.noticeError} role="alert">{state.error}</p>}
      {state.success && !dirty && <p className={styles.noticeSuccess} role="status">{state.success}</p>}
      <div hidden={preview}>
        <fieldset disabled={pending || uploading} className={styles.canvas} dir={locale === "ar" ? "rtl" : "ltr"}>
          <section className={styles.coverSection} aria-label="Cover photo">
            {cover ? <>
              <div className={styles.coverSectionHeading}><span>Cover photo</span><button type="button" onClick={openCover}>Change cover photo</button></div>
              <button type="button" className={styles.canvasCover} aria-label="Edit cover photo" onClick={openCover}><Image src={cover} alt={coverAlt || "Selected cover photo"} fill sizes="(max-width: 850px) 100vw, 760px" unoptimized /></button>
            </> : <button type="button" className={styles.addCover} onClick={openCover}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="m3 17 5-5 4 4 4-6 5 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
              <span><strong>Add cover photo</strong><small>The main image for your article and blog listing.</small></span>
            </button>}
          </section>
          <label className={styles.srOnly} htmlFor="story-title">Article title</label><textarea ref={titleRef} id="story-title" className={styles.title} value={title} onChange={e => { setTitle(e.target.value); setDirty(true); if (!manualSlug) setSlug(slugify(e.target.value)); }} maxLength={160} rows={1} placeholder={locale === "ar" ? "عنوان المقال" : "Your story starts here"} dir="auto" />
          <label className={styles.srOnly} htmlFor="story-intro">Short introduction</label><textarea ref={introRef} id="story-intro" className={styles.intro} value={excerpt} onChange={e => { setExcerpt(e.target.value); setDirty(true); }} maxLength={320} rows={1} placeholder={locale === "ar" ? "مقدمة قصيرة تجذب القارئ…" : "Add a short introduction that draws your reader in…"} dir="auto" />
          <RichTextEditor initialBody={body} onChange={value => { setBody(value); setDirty(true); }} onBusyChange={setUploading} disabled={pending || preview} locale={locale} />
          <footer className={styles.canvasFooter}><span>{wordCount} {wordCount === 1 ? "word" : "words"} · {readingMinutes(body)} min read</span><span>By {draft.author}</span></footer>
        </fieldset>
      </div>
      {preview && <div ref={previewRef} className={styles.preview}><BlogArticle post={draft} preview /></div>}
      {coverDialog && <EditorDialog title="Cover photo" dismissible={!pending} onClose={() => setCoverDialog(false)}>
        <fieldset className={styles.settingsFields} disabled={pending}>
          <p className={styles.panelIntro}>This image appears at the top of your article and on its blog card.</p>
          {coverFields}
          <button type="button" className={styles.primary} disabled={pending} onClick={() => setCoverDialog(false)}>Done</button>
        </fieldset>
      </EditorDialog>}
      {settings && <EditorDialog title={publishing ? "Ready to publish?" : "Post settings"} side dismissible={!pending} onClose={() => { if (!pending) setSettings(false); }}>
        <fieldset className={styles.settingsFields} disabled={pending || uploading} onChange={() => setDirty(true)}>
          {publishing && <p className={styles.panelIntro}>Publishing makes this article visible to everyone on the website.</p>}
          {coverFields}
          <div className={styles.settingPair}><label className={styles.field}>Category<select value={category} onChange={e => setCategory(e.target.value as typeof category)}>{CATEGORIES.map(item => <option key={item}>{item}</option>)}</select></label><label className={styles.field}>Language<select value={locale} onChange={e => setLocale(e.target.value as "en" | "ar")}><option value="en">English</option><option value="ar">العربية</option></select></label></div>
          <label className={styles.field}>Blog URL<input value={slug} onChange={e => { setManualSlug(true); setSlug(e.target.value); }} maxLength={100} placeholder="your-story" /><small>{locale === "ar" ? "/ar" : ""}/blogs/{slug || "your-story"}{publishState === "published" ? " · Changing this changes the public link." : ""}</small></label>
          {publishing && <div className={styles.publishCheck}>{missing.length ? <><strong>A few details to finish</strong><p>{missing.join(", ")}. You can save a draft at any time.</p></> : <><strong>Everything is ready</strong><p>Your article has its title, introduction, text and cover.</p></>}</div>}
          {state.error && <p className={styles.error} role="alert">{state.error}</p>}
          <div className={styles.panelActions}>
            {publishing ? <button type="submit" name="intent" value="publish" className={styles.primary} disabled={!!missing.length}>{pending ? "Publishing…" : "Publish article"}</button> : <button type="button" className={styles.primary} onClick={() => setSettings(false)}>Done</button>}
            {publishState === "published" && <button type="submit" name="intent" value="unpublish" className={styles.quietButton}>Move to draft</button>}
          </div>
          {publishState === "published" && <Link className={styles.publicLink} href={blogPath(draft)} target="_blank" rel="noopener noreferrer">Open published article ↗</Link>}
        </fieldset>
      </EditorDialog>}
    </form>
    {leaveOpen && <EditorDialog title="Leave this story?" onClose={() => setLeaveOpen(false)}><div className={styles.dialogFields}><p>Your latest changes haven’t been saved.</p><div className={styles.buttons}><button type="button" className={styles.primary} onClick={() => setLeaveOpen(false)}>Keep writing</button><Link href="/team/blogs" className={styles.quietButton} onClick={() => setDirty(false)}>Leave without saving</Link></div></div></EditorDialog>}
  </main>;
}
