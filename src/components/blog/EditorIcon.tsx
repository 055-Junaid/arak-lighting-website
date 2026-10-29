import type { ReactNode } from "react";
export type EditorIconName = "plus" | "close" | "image" | "heading" | "subheading" | "list" | "quote" | "table" | "link";
export function EditorIcon({ name }: {name: EditorIconName}) {
  const paths: Record<EditorIconName, ReactNode> = {
    plus: <path d="M12 5v14M5 12h14" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    image: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8" cy="9" r="1.5"/><path d="m3 16 5-5 4 4 4-6 5 7"/></>,
    heading: <><path d="M4 5v14M14 5v14M4 12h10M18 15l2-1v6M18 20h4"/></>,
    subheading: <><path d="M3 5v14M13 5v14M3 12h10M17 15c0-2 5-2 5 0 0 2-5 3-5 5h5"/></>,
    list: <><path d="M9 6h12M9 12h12M9 18h12"/><circle cx="4" cy="6" r=".8"/><circle cx="4" cy="12" r=".8"/><circle cx="4" cy="18" r=".8"/></>,
    quote: <><path d="M10 6C5 7 3 11 3 17h7v-7H6M21 6c-5 1-7 5-7 11h7v-7h-4"/></>,
    table: <><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 10h18M3 15h18M10 4v16"/></>,
    link: <><path d="m10 14 4-4M9 16l-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0M15 8l1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
