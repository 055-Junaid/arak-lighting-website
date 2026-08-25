"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang";
import styles from "./Header.module.css";

type NavItem = { href: "/" | "/about" | "/services" | "/projects" | "/contact"; en: string; ar: string };

const NAV: NavItem[] = [
  { href: "/", en: "Home", ar: "الرئيسية" },
  { href: "/about", en: "About", ar: "عن الشركة" },
  { href: "/services", en: "Services", ar: "خدماتنا" },
  { href: "/projects", en: "Projects", ar: "مشاريعنا" },
  { href: "/contact", en: "Contact", ar: "اتصل بنا" },
];

export function Header() {
  const pathname = usePathname();
  const { lang, toggleLang } = useLang();
  const ar = lang === "ar";
  const [open, setOpen] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);

  // Escape closes it and hands focus back to the button that opened it, so a
  // keyboard user is not dropped at the top of the document. Back/forward
  // closes it too — the drawer links close themselves on click, but a history
  // move is the one navigation they don't see.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      burger.current?.focus();
    };
    const onPop = () => setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("popstate", onPop);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPop);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // A viewport that grows past the breakpoint puts the full nav back on
  // screen; leaving `open` set would keep the drawer stacked on top of it.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 961px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="ARAK Lighting Solutions — home">
          {/* Sized in Header.module.css rather than inline, so the 520px rule
              can shrink it. Setting only one axis inline is what Next warns
              about; the module sets both. */}
          <Image
            src="/arak-logo-black.png"
            alt="ARAK Lighting Solutions"
            height={58}
            width={166}
            priority
          />
        </Link>

        <nav className={styles.nav} aria-label={ar ? "التنقل الرئيسي" : "Main"}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`${styles.navLink} ${pathname === item.href ? styles.navLinkOn : ""}`}
            >
              {ar ? item.ar : item.en}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={toggleLang}
            className={styles.langToggle}
            lang={ar ? "en" : "ar"}
            aria-label={ar ? "Switch to English" : "التبديل إلى العربية"}
          >
            {ar ? "EN" : "ع"}
          </button>

          <Link href="/contact" className={styles.cta}>
            {ar ? "احجز استشارة إضاءة" : "Book a consultation"}
          </Link>

          <button
            ref={burger}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`${styles.burger} ${open ? styles.burgerOn : ""}`}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={ar ? (open ? "إغلاق القائمة" : "فتح القائمة") : open ? "Close menu" : "Open menu"}
          >
            <span className={styles.burgerBars} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <>
          {/* Dismiss target. A button rather than a bare div so it is reachable
              by keyboard and announced, instead of being a trap for anyone not
              using a pointer. */}
          <button
            type="button"
            className={styles.scrim}
            onClick={() => setOpen(false)}
            aria-label={ar ? "إغلاق القائمة" : "Close menu"}
          />
          <nav id="site-menu" className={styles.drawer} aria-label={ar ? "التنقل الرئيسي" : "Main"}>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`${styles.drawerLink} ${pathname === item.href ? styles.drawerLinkOn : ""}`}
              >
                {ar ? item.ar : item.en}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className={styles.drawerCta}>
              {ar ? "احجز استشارة إضاءة" : "Book a consultation"}
            </Link>
          </nav>
        </>
      )}
    </header>
  );
}
