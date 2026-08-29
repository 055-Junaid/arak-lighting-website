"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFocusTrap } from "@/lib/focus-trap";
import { useLang } from "@/lib/lang";
import { localePath, routeOf } from "@/lib/site";
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
  const { lang } = useLang();
  const ar = lang === "ar";

  // The language lives in the URL, so switching it is a navigation to the
  // same page in the other locale rather than a state flip. Crossing between
  // the two root layouts is a full document load, which is what we want here:
  // <html lang> and dir have to change with it.
  const route = routeOf(pathname);
  const otherHref = localePath(route, ar ? "en" : "ar");
  const [open, setOpen] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Holds Tab inside the header — logo, language link, burger and the drawer's
  // own links — while the drawer is open, and hands focus back to the burger
  // when it closes. Without it, tabbing past the last drawer link walked into
  // the page underneath, which is covered by the scrim and cannot be seen.
  useFocusTrap(headerRef, open, burger);

  // Escape closes it and hands focus back to the button that opened it, so a
  // keyboard user is not dropped at the top of the document. Back/forward
  // closes it too — the drawer links close themselves on click, but a history
  // move is the one navigation they don't see.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // Focus goes back to the burger when the trap tears down.
      setOpen(false);
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
    <header className={styles.header} ref={headerRef}>
      <div className={styles.inner}>
        <Link href={localePath("/", lang)} className={styles.logo} aria-label="ARAK Lighting Solutions, home">
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
              href={localePath(item.href, lang)}
              aria-current={route === item.href ? "page" : undefined}
              className={`${styles.navLink} ${route === item.href ? styles.navLinkOn : ""}`}
            >
              {ar ? item.ar : item.en}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          {/* A real link, not a button: it changes the URL, so it has to be
              middle-clickable, copyable, and followable by a crawler — which
              is also how Google discovers the other language. hrefLang tells
              it what it will find there. */}
          <Link
            href={otherHref}
            className={styles.langToggle}
            lang={ar ? "en" : "ar"}
            hrefLang={ar ? "en" : "ar"}
            aria-label={ar ? "Switch to English" : "التبديل إلى العربية"}
          >
            {ar ? "EN" : "ع"}
          </Link>

          <Link href={localePath("/contact", lang)} className={styles.cta}>
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
                href={localePath(item.href, lang)}
                onClick={() => setOpen(false)}
                aria-current={route === item.href ? "page" : undefined}
                className={`${styles.drawerLink} ${route === item.href ? styles.drawerLinkOn : ""}`}
              >
                {ar ? item.ar : item.en}
              </Link>
            ))}
            <Link href={localePath("/contact", lang)} onClick={() => setOpen(false)} className={styles.drawerCta}>
              {ar ? "احجز استشارة إضاءة" : "Book a consultation"}
            </Link>
          </nav>
        </>
      )}
    </header>
  );
}
