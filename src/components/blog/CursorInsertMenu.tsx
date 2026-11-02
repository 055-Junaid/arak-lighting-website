"use client";
import { useCallback, useEffect, useLayoutEffect, useId, useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import { EditorIcon, type EditorIconName } from "./EditorIcon";
import styles from "./Editor.module.css";
export type InsertBlock = "image" | "heading" | "subheading" | "list" | "quote" | "table";
const tools: {kind: InsertBlock; label: string; icon: EditorIconName}[] = [
  {kind: "image", label: "Insert image", icon: "image"},
  {kind: "heading", label: "Insert heading", icon: "heading"},
  {kind: "subheading", label: "Insert subheading", icon: "subheading"},
  {kind: "list", label: "Insert bullet list", icon: "list"},
  {kind: "quote", label: "Insert quote", icon: "quote"},
  {kind: "table", label: "Insert table", icon: "table"},
];
export function CursorInsertMenu({editor, disabled, onInsert}: {editor: Editor; disabled: boolean; onInsert: (kind: InsertBlock) => void}) {
  const [anchor, setAnchor] = useState({top: 0, visible: false});
  const [open, setOpen] = useState(false);
  const rail = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const openRef = useRef(false);
  const insertionPosition = useRef(1);
  const setMenuOpen = useCallback((value: boolean) => { openRef.current = value; setOpen(value); }, []);
  const keyboardOpen = useRef(false);
  const menuId = useId();
  useLayoutEffect(() => {
    let scheduled = false;
    let disposed = false;
    const editorDOM = editor.view.dom;
    const update = () => {
      scheduled = false;
      if (!rail.current) return;
      if (editor.isDestroyed) return;
      const {selection} = editor.state;
      const focused = editor.isFocused || rail.current.contains(document.activeElement);
      const usable = !disabled && editor.isEditable && (openRef.current || (focused && selection.empty && selection.$from.parent.isTextblock && !selection.$from.parent.textContent.trim() && !editor.isActive("table")));
      if (!usable || !editor.view.dom.offsetWidth) {
        setAnchor(previous => previous.visible ? {...previous, visible: false} : previous);
        setMenuOpen(false);
        return;
      }
      const owner = rail.current.parentElement;
      if (!owner) return;
      const caret = editor.view.coordsAtPos(openRef.current ? Math.min(insertionPosition.current, editor.state.doc.content.size) : selection.from);
      const toolbar = editor.view.dom.closest("main")?.querySelector("header");
      const visible = caret.bottom > (toolbar?.getBoundingClientRect().bottom || 0) + 4 && caret.top < window.innerHeight - 12;
      const top = caret.top + (caret.bottom - caret.top) / 2 - owner.getBoundingClientRect().top;
      setAnchor(previous => previous.top === top && previous.visible === visible ? previous : {top, visible});
    };
    const schedule = () => { if (!scheduled) { scheduled = true; queueMicrotask(() => { if (!disposed) update(); }); } };
    const shortcut = (event: KeyboardEvent) => {
      if (event.altKey && event.key === "Enter" && !disabled) {
        if (!editor.state.selection.empty) return;
        event.preventDefault();
        const position = editor.state.selection.$from;
        if (position.parent.textContent.trim() && position.depth) {
          const after = position.after(1);
          editor.chain().insertContentAt(after, {type: "paragraph"}).setTextSelection(after + 1).run();
        }
        insertionPosition.current = editor.state.selection.from;
        keyboardOpen.current = true;
        setMenuOpen(true);
        schedule();
      } else if (openRef.current && !["Tab", "Shift", "Control", "Alt", "Meta", "Escape"].includes(event.key)) setMenuOpen(false);
    };
    editor.on("selectionUpdate", schedule).on("transaction", schedule).on("focus", schedule).on("blur", schedule);
    editorDOM.addEventListener("keydown", shortcut);
    document.addEventListener("focusin", schedule);
    window.addEventListener("scroll", schedule, true); window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule); observer.observe(editor.view.dom);
    schedule();
    return () => {
      disposed = true; observer.disconnect();
      editor.off("selectionUpdate", schedule).off("transaction", schedule).off("focus", schedule).off("blur", schedule);
      editorDOM.removeEventListener("keydown", shortcut);
      document.removeEventListener("focusin", schedule);
      window.removeEventListener("scroll", schedule, true); window.removeEventListener("resize", schedule);
    };
  }, [editor, disabled, setMenuOpen]);
  useLayoutEffect(() => {
    if (open && anchor.visible && keyboardOpen.current) {
      keyboardOpen.current = false;
      trigger.current?.focus({preventScroll: true});
    }
  }, [open, anchor.visible]);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => { if (!rail.current?.contains(event.target as Node)) setMenuOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { event.preventDefault(); setMenuOpen(false); editor.view.focus(); } };
    document.addEventListener("pointerdown", outside); document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [open, editor, setMenuOpen]);
  return <div ref={rail} className={styles.cursorInsert} hidden={!anchor.visible} style={{top: anchor.top}} data-open={open}>
    <button ref={trigger} type="button" className={styles.cursorPlus} aria-label={open ? "Close insert menu" : "Insert content"} title={open ? "Close insert menu" : "Insert content (Alt+Enter)"} aria-expanded={open} aria-controls={menuId} onMouseDown={event => event.preventDefault()} onClick={() => { insertionPosition.current = editor.state.selection.from; setMenuOpen(!openRef.current); if (open) editor.view.focus(); }}><EditorIcon name={open ? "close" : "plus"}/></button>
    {open && <div id={menuId} className={styles.inlineInsertOptions} role="toolbar" aria-label="Insert content">
      {tools.map(tool => <button key={tool.kind} type="button" aria-label={tool.label} title={tool.label} onMouseDown={event => event.preventDefault()} onClick={() => { editor.commands.setTextSelection(insertionPosition.current); setMenuOpen(false); onInsert(tool.kind); }}><EditorIcon name={tool.icon}/></button>)}
    </div>}
  </div>;
}
