"use client";
import { useActionState } from "react";
import { loginAction } from "@/lib/blog/actions";
import shared from "./Blogs.module.css";
import styles from "./Team.module.css";
export function TeamLogin() {
  const [state, action, pending] = useActionState(loginAction, {});
  return <form action={action} className={styles.form}>
    <label className={styles.field}>Work email<input type="email" name="email" autoComplete="username" maxLength={254} required /></label>
    <label className={styles.field}>Password<input type="password" name="password" autoComplete="current-password" maxLength={256} required /></label>
    {state.error && <p className={styles.error} role="alert">{state.error}</p>}
    <button className={shared.button} disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
    <p className={styles.hint}>Access is managed by your website administrator. There is no public registration.</p>
  </form>;
}
