"use client";

import { useSyncExternalStore } from "react";
import { BLOG_THEME_KEY } from "./theme-config";

export type BlogTheme = "light" | "dark";
const CHANGE_EVENT = "arak-blog-theme-change";

function snapshot(): BlogTheme {
  return document.documentElement.getAttribute("data-blog-theme") === "dark" ? "dark" : "light";
}
function subscribe(notify: () => void) {
  const storage = (event: StorageEvent) => {
    if (event.key !== BLOG_THEME_KEY && event.key !== null) return;
    document.documentElement.setAttribute("data-blog-theme", event.newValue === "dark" ? "dark" : "light");
    notify();
  };
  window.addEventListener(CHANGE_EVENT, notify);
  window.addEventListener("storage", storage);
  return () => { window.removeEventListener(CHANGE_EVENT, notify); window.removeEventListener("storage", storage); };
}
export function setBlogTheme(theme: BlogTheme) {
  document.documentElement.setAttribute("data-blog-theme", theme);
  try { localStorage.setItem(BLOG_THEME_KEY, theme); } catch { /* Still works for this page if storage is unavailable. */ }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
export function useBlogTheme() { return useSyncExternalStore(subscribe, snapshot, () => "light" as const); }
