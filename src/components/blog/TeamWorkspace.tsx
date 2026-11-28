"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./Team.module.css";
export function TeamWorkspace({ children, heading }: {children: ReactNode; heading: ReactNode}) {
  const path = usePathname();
  const editor = /^\/team\/blogs\/[^/]+$/.test(path) && path !== "/team/blogs/import";
  return editor ? <>{children}</> : <main id="main" tabIndex={-1} className={styles.workspace}>{heading}{children}</main>;
}
