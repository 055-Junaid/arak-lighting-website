"use client";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ComponentProps } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import { Table, TableCell, TableHeader, TableRow } from "@tiptap/extension-table";
import { uploadBlogImageAction } from "@/lib/blog/actions";
import { editorDocument } from "@/lib/blog/editor-content";
import { encodeRichBody, safeBlogLink } from "@/lib/blog/rich-text";
import { CursorInsertMenu, type InsertBlock } from "./CursorInsertMenu";
import { EditorIcon } from "./EditorIcon";
import { EditorDialog } from "./EditorDialog";
import styles from "./Editor.module.css";


const appendMenuToBody = () => document.body;

export function RichTextEditor({ initialBody, onChange, onBusyChange, disabled, locale }: { initialBody: string; onChange: (body: string) => void; onBusyChange: (busy: boolean) => void; disabled: boolean; locale: "en" | "ar" }) {
  const [initialDocument] = useState(() => editorDocument(initialBody));
  const [imageOpen, setImageOpen] = useState(false);
  const [imageAlt, setImageAlt] = useState("");
  const [imageError, setImageError] = useState("");
  const [formattingFocused, setFormattingFocused] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const [href, setHref] = useState("");
  const [linkError, setLinkError] = useState("");
  const file = useRef<HTMLInputElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const bubbleOptions = useMemo(() => ({
    strategy: "absolute" as const, placement: "top" as const, offset: 12,
    flip: {padding: {top: 160, right: 12, bottom: 12, left: 12}}, shift: {padding: 12},
    onUpdate: () => {
      const bubble = bubbleRef.current;
      const selection = window.getSelection();
      if (!bubble || !selection?.rangeCount || selection.isCollapsed) return;
      const text = selection.getRangeAt(0).getBoundingClientRect();
      const box = bubble.getBoundingClientRect();
      bubble.dataset.side = box.top >= text.bottom ? "below" : "above";
      const x = Math.max(16, Math.min(box.width - 16, text.left + text.width / 2 - box.left));
      bubble.style.setProperty("--arrow-x", `${x}px`);
    },
  }), []);
  const selectionReference = useCallback(() => {
    const selection = window.getSelection();
    if (!selection?.rangeCount || selection.isCollapsed) return null;
    const range = selection.getRangeAt(0);
    return { getBoundingClientRect: () => range.getBoundingClientRect(), getClientRects: () => range.getClientRects() };
  }, []);
  const showFormatting = useCallback<NonNullable<ComponentProps<typeof BubbleMenu>["shouldShow"]>>(({editor, state, element}) => !disabled && editor.isEditable && (editor.isFocused || element.contains(document.activeElement)) && !state.selection.empty && !!state.doc.textBetween(state.selection.from, state.selection.to).trim() && !editor.isActive("image") && !editor.isActive("table"), [disabled]);
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] }, code: false, codeBlock: false, strike: false, underline: false, orderedList: false, horizontalRule: false, link: { openOnClick: false, autolink: false, isAllowedUri: url => safeBlogLink(url) } }),
      ImageExtension.configure({ allowBase64: false }),
      Table.configure({ resizable: false }), TableRow, TableCell.extend({content: "paragraph+"}), TableHeader.extend({content: "paragraph+"}),
    ],
    content: initialDocument,
    editorProps: { attributes: { role: "textbox", "aria-label": "Article body", "aria-multiline": "true", "data-placeholder": "Tell your story…", dir: "auto" },
      // Paste images through our authenticated upload flow; never embed remote images.
      transformPastedHTML: html => html.replace(/<img\b[^>]*>/gi, ""),
    },
    onUpdate: ({ editor }) => onChange(encodeRichBody(editor.getJSON())),
  });
  useLayoutEffect(() => {
    if (!editor) return;
    const updateFocus = () => setFormattingFocused(editor.view.dom.contains(document.activeElement) || !!bubbleRef.current?.contains(document.activeElement));
    updateFocus();
    document.addEventListener("focusin", updateFocus);
    return () => document.removeEventListener("focusin", updateFocus);
  }, [editor]);
  useEffect(() => { editor?.setEditable(!disabled && !uploading, false); }, [editor, disabled, uploading]);
  if (!editor) return <div className={styles.loading}>Opening your writing canvas…</div>;
  async function uploadImage() {
    const upload = file.current?.files?.[0];
    if (!upload || !imageAlt.trim()) { setImageError("Choose an image and add a short description."); return; }
    if (upload.size > 5 * 1024 * 1024) { setImageError("Choose an image smaller than 5 MB."); return; }
    setUploading(true); onBusyChange(true); setImageError("");
    try {
      const data = new FormData(); data.set("image", upload);
      const result = await uploadBlogImageAction(data);
      if (!result.url || result.error) { setImageError(result.error || "The image could not be uploaded."); return; }
      if (editor) {
        const position = editor.state.selection.$from;
        if (position.depth > 1) {
          const after = position.after(1);
          editor.chain().insertContentAt(after, [{type: "image", attrs: {src: result.url, alt: imageAlt.trim()}}, {type: "paragraph"}]).focus(after).run();
        } else editor.chain().focus().setImage({src: result.url, alt: imageAlt.trim()}).run();
      }
      setImageOpen(false); setImageAlt("");
    } catch { setImageError("The image could not be uploaded. Try again."); }
    finally { setUploading(false); onBusyChange(false); }
  }
  function insertTable() {
    if (!editor) return;
    const position = editor.state.selection.$from;
    if (position.depth > 1) {
      const content = Array.from({length: 3}, (_, row) => ({type: "tableRow", content: Array.from({length: 2}, () => ({type: row === 0 ? "tableHeader" : "tableCell", content: [{type: "paragraph"}]}))}));
      const after = position.after(1);
      editor.chain().insertContentAt(after, [{type: "table", content}, {type: "paragraph"}]).focus(after).run();
    } else editor.chain().focus().insertTable({rows: 3, cols: 2, withHeaderRow: true}).run();
  }
  function openLink() { setHref(editor?.getAttributes("link").href || ""); setLinkError(""); setLinkOpen(true); }
  return <div className={styles.bodyEditor} data-locale={locale}>
    <CursorInsertMenu editor={editor} disabled={disabled || uploading} onInsert={(kind: InsertBlock) => {
      if (kind === "image") { setImageError(""); setImageAlt(""); setImageOpen(true); }
      if (kind === "heading") editor.chain().focus().toggleHeading({level: 2}).run();
      if (kind === "subheading") editor.chain().focus().toggleHeading({level: 3}).run();
      if (kind === "list") editor.chain().focus().toggleBulletList().run();
      if (kind === "quote") editor.chain().focus().toggleBlockquote().run();
      if (kind === "table") insertTable();
    }}/>
    <div className={styles.history} role="group" aria-label="Editing history"><button type="button" className={styles.iconButton} aria-label="Undo" title="Undo" disabled={disabled || !editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>↶</button><button type="button" className={styles.iconButton} aria-label="Redo" title="Redo" disabled={disabled || !editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>↷</button></div>
    <BubbleMenu hidden={disabled || uploading || !formattingFocused} editor={editor} appendTo={appendMenuToBody} getReferencedVirtualElement={selectionReference} className={styles.selectionPopover} updateDelay={0} options={bubbleOptions} shouldShow={showFormatting}>
      <div ref={bubbleRef} className={styles.bubble} role="toolbar" aria-label="Format selected text">
        <button type="button" aria-label="Bold" title="Bold" aria-pressed={editor.isActive("bold")} onPointerDown={event => event.preventDefault()} onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></button>
        <button type="button" aria-label="Italic" title="Italic" aria-pressed={editor.isActive("italic")} onPointerDown={event => event.preventDefault()} onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></button>
        <button type="button" aria-label="Add link" title="Link" aria-pressed={editor.isActive("link")} onPointerDown={event => event.preventDefault()} onClick={openLink}><EditorIcon name="link"/></button>
        <span className={styles.bubbleDivider} aria-hidden="true"/>
        <button type="button" aria-label="Turn into heading" title="Heading" aria-pressed={editor.isActive("heading", {level: 2})} onPointerDown={event => event.preventDefault()} onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}><span className={styles.headingTool}>T</span></button>
        <button type="button" aria-label="Turn into subheading" title="Subheading" aria-pressed={editor.isActive("heading", {level: 3})} onPointerDown={event => event.preventDefault()} onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}><span className={styles.subheadingTool}>T</span></button>
        <button type="button" aria-label="Turn into quote" title="Quote" aria-pressed={editor.isActive("blockquote")} onPointerDown={event => event.preventDefault()} onClick={() => editor.chain().focus().toggleBlockquote().run()}><EditorIcon name="quote"/></button>
      </div>
    </BubbleMenu>
    {editor.isActive("table") && <div className={styles.contextTools} role="group" aria-label="Table options">
      <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()}>+ Row</button><button type="button" disabled={(() => { const pos = editor.state.selection.$from; for (let depth = pos.depth; depth > 0; depth--) if (pos.node(depth).type.name === "tableRow") return pos.node(depth).childCount >= 8; return true; })()} onClick={() => editor.chain().focus().addColumnAfter().run()}>+ Column</button><button type="button" onClick={() => editor.chain().focus().deleteRow().run()}>Remove row</button><button type="button" disabled={(() => { const pos = editor.state.selection.$from; for (let depth = pos.depth; depth > 0; depth--) if (pos.node(depth).type.name === "tableRow") return pos.node(depth).childCount <= 2; return true; })()} onClick={() => editor.chain().focus().deleteColumn().run()}>Remove column</button><button type="button" onClick={() => editor.chain().focus().deleteTable().run()}>Delete table</button>
    </div>}
    {editor.isActive("image") && <div className={styles.contextTools}><button type="button" onClick={() => { setImageAlt(editor.getAttributes("image").alt || ""); setImageError(""); setImageOpen(true); }}>Edit image description</button><button type="button" onClick={() => editor.chain().focus().deleteSelection().run()}>Remove image</button></div>}
    <EditorContent editor={editor} className={styles.richText} />
    {imageOpen && <EditorDialog returnFocusTo={editor.view.dom} title={editor.isActive("image") ? "Image description" : "Add an image"} dismissible={!uploading} onClose={() => { if (!uploading) setImageOpen(false); }}>
      <div className={styles.dialogFields}>
        {!editor.isActive("image") && <label className={styles.field}>Choose image<input ref={file} type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} /><small>JPG, PNG or WebP, up to 5 MB.</small></label>}
        <label className={styles.field}>Image description<input value={imageAlt} onChange={e => setImageAlt(e.target.value)} maxLength={240} disabled={uploading} placeholder="What does this image show?" /><small>Used as the caption and for readers using screen readers.</small></label>
        {imageError && <p className={styles.error} role="alert">{imageError}</p>}
        <button type="button" className={styles.primary} disabled={uploading} onClick={() => { if (editor.isActive("image")) { editor.chain().focus().updateAttributes("image", {alt: imageAlt}).run(); setImageOpen(false); } else void uploadImage(); }}>{uploading ? "Uploading…" : editor.isActive("image") ? "Save description" : "Insert image"}</button>
      </div>
    </EditorDialog>}
    {linkOpen && <EditorDialog returnFocusTo={editor.view.dom} title="Add a link" onClose={() => setLinkOpen(false)}><div className={styles.dialogFields}>
      <label className={styles.field}>Link URL<input value={href} onChange={e => setHref(e.target.value)} placeholder="https://" type="url" /></label>
      {linkError && <p className={styles.error} role="alert">{linkError}</p>}
      <div className={styles.buttons}><button type="button" className={styles.primary} onClick={() => { if (!safeBlogLink(href.trim())) { setLinkError("Enter a valid website address, email link, or page path."); return; } editor.chain().focus().extendMarkRange("link").setLink({href: href.trim()}).run(); setLinkOpen(false); }}>Apply link</button><button type="button" className={styles.quietButton} onClick={() => { editor.chain().focus().extendMarkRange("link").unsetLink().run(); setLinkOpen(false); }}>Remove link</button></div>
    </div></EditorDialog>}
  </div>;
}
