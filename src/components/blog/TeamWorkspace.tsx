"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./Team.module.css";
export function TeamWorkspace({ children, heading }: {children: ReactNode; heading: ReactNode}) {
  const editor = /^\/team\/blogs\/[^/]+$/.test(usePathname());
  return editor ? <>{children}</> : <main id="main" tabIndex={-1} className={styles.workspace}>{heading}{children}</main>;
}
