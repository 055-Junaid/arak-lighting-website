"use client";

import { setBlogTheme, useBlogTheme } from "@/lib/blog/theme";
import styles from "./BlogThemeSwitch.module.css";

export function BlogThemeSwitch({ ar = false }: { ar?: boolean }) {
  const theme = useBlogTheme();
  return <div className={styles.switch} role="group" aria-label={ar ? "مظهر المدونة" : "Blog appearance"}>
    <button type="button" aria-pressed={theme === "light"} onClick={() => setBlogTheme("light")}>
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="3" stroke="currentColor" /><path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.6 3.6 5 5M15 15l1.4 1.4M3.6 16.4 5 15M15 5l1.4-1.4" stroke="currentColor" /></svg>
      {ar ? "فاتح" : "Light"}
    </button>
    <button type="button" aria-pressed={theme === "dark"} onClick={() => setBlogTheme("dark")}>
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M16.5 11.6A7 7 0 0 1 8.4 3.5a7 7 0 1 0 8.1 8.1Z" stroke="currentColor" strokeLinejoin="round" /></svg>
      {ar ? "داكن" : "Dark"}
    </button>
  </div>;
}
