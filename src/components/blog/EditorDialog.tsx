"use client";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import styles from "./Editor.module.css";
export function EditorDialog({ title, children, onClose, side = false, dismissible = true, returnFocusTo }: { title: string; children: ReactNode; onClose: () => void; side?: boolean; dismissible?: boolean; returnFocusTo?: HTMLElement }) {
  const ref = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (returnFocusTo) returnFocus.current = returnFocusTo;
    else if (!returnFocus.current) returnFocus.current = document.activeElement as HTMLElement | null;
    if (!dialog.open) dialog.showModal();
    return () => queueMicrotask(() => {
      if (!dialog.isConnected && returnFocus.current?.isConnected && !document.querySelector("dialog[open]")) returnFocus.current.focus({preventScroll: true});
    });
  }, [returnFocusTo]);
  return <dialog ref={ref} className={`${styles.dialog} ${side ? styles.settingsDialog : ""}`} aria-label={title} onCancel={event => { event.preventDefault(); if (dismissible) onClose(); }} onClose={onClose} onClick={event => {
    if (!dismissible || event.target !== event.currentTarget) return;
    const box = event.currentTarget.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onClose();
  }}>
    <div className={styles.dialogHeading}><h2>{title}</h2><button type="button" className={styles.iconButton} aria-label={`Close ${title.toLowerCase()}`} disabled={!dismissible} onClick={onClose}>×</button></div>{children}
  </dialog>;
}
