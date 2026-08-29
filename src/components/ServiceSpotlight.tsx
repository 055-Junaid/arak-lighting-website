"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { useLang } from "@/lib/lang";
import { localePath } from "@/lib/site";
import type { Service } from "@/lib/services-data";
import styles from "./ServiceSpotlight.module.css";

/**
 * Numbered index on the left, one large panel on the right that swaps as you
 * hover or focus a line. Every panel stays mounted so the stage never resizes
 * and the copy stays in the document.
 *
 * Below 1080px the two columns stack, so the panel sits directly under the
 * index and a tap scrolls it into view.
 *
 * The index stays buttons rather than links: the panel swaps on hover, so a
 * row of plain links would navigate before you had read the preview. Clicking
 * a line that is already on stage does open its page, which on a mouse means
 * one click (hover has already selected it) and on a touch screen means tap to
 * preview, tap again to go in.
 *
 * The panel itself is clickable end to end for the same destination. The link
 * at its foot stays the keyboard and screen-reader route, and a click that
 * lands on a text selection or on the link is left alone.
 */
export function ServiceSpotlight({ services, ar }: { services: Service[]; ar: boolean }) {
  const { lang } = useLang();
  const router = useRouter();
  const [active, setActive] = useState(0);
  // Panels whose photograph has been needed at least once. Starts with the
  // one that renders on load.
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  // Which line was on stage when the press started. Clicking a button focuses
  // it first, and focus selects — so by the time the click lands, `active` is
  // always the line under the pointer and could not tell a mouse click (hover
  // already previewed it) from a first tap on a touch screen (which has not).
  const pressed = useRef<number | null>(null);
  // `active` mirrored synchronously: a hover and the press that follows it can
  // land before React has re-rendered, and the press has to read what is on
  // stage now, not what was on stage a render ago.
  const activeNow = useRef(0);
  const stage = useRef<HTMLDivElement>(null);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = services.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  };

  const hrefFor = (index: number) => localePath(`/services/${services[index].slug}`, lang);

  const select = (index: number, scrollIntoView = false) => {
    activeNow.current = index;
    setActive(index);
    setSeen((current) => (current.has(index) ? current : new Set(current).add(index)));
    // The panel's link is visibility:hidden until its panel is on stage, so it
    // never comes into view for the router to prefetch on its own.
    router.prefetch(hrefFor(index));
    if (scrollIntoView && window.matchMedia("(max-width: 1080px)").matches) {
      stage.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  /**
   * Clicking the line that was already on stage opens it. With a mouse that is
   * the first click, because hovering has put it on stage; with a finger the
   * first tap brings up the panel and the second one goes in. A keyboard press
   * leaves `pressed` unset and goes straight in, since arrowing to a line has
   * already previewed it.
   */
  const onTabClick = (index: number) => {
    const wasOnStage =
      pressed.current === null ? activeNow.current === index : pressed.current === index;
    pressed.current = null;
    if (wasOnStage) router.push(hrefFor(index));
    else select(index, true);
  };

  /** Anywhere on the panel opens it, short of a real link or a text selection. */
  const onPanelClick = (event: MouseEvent<HTMLDivElement>, index: number) => {
    if (active !== index) return;
    if ((event.target as HTMLElement).closest("a, button")) return;
    if (window.getSelection()?.toString()) return;
    router.push(hrefFor(index));
  };

  return (
    <div className={styles.spotlight}>
      <div className={styles.index} role="tablist" aria-orientation="vertical">
        {services.map((service, i) => (
          <button
            key={service.slug}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`svc-tab-${service.slug}`}
            aria-selected={active === i}
            aria-controls={`svc-panel-${service.slug}`}
            tabIndex={active === i ? 0 : -1}
            className={`${styles.tab} ${active === i ? styles.tabOn : ""}`}
            onPointerDown={() => {
              pressed.current = activeNow.current;
            }}
            onMouseEnter={() => select(i)}
            onFocus={() => select(i)}
            onClick={() => onTabClick(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className={styles.tabNo}>{service.no}</span>
            <span className={styles.tabName}>{ar ? service.ar : service.en}</span>
          </button>
        ))}
        {/* One hint, two wordings: hovering is meaningless on a touch screen,
            where the first tap is what brings a panel up. CSS picks between
            them so both stay in the markup and neither depends on JavaScript
            guessing the device. */}
        <p className={styles.hint}>
          <span className={styles.hintPointer}>
            {ar
              ? "مرّر المؤشر للتفاصيل، واضغط لفتح صفحة الخدمة"
              : "Hover a line for the detail, click to open its page"}
          </span>
          <span className={styles.hintTouch}>
            {ar
              ? "اضغط لعرض التفاصيل، ثم اضغط مرة أخرى لفتح صفحة الخدمة"
              : "Tap a line for the detail, tap again to open its page"}
          </span>
        </p>
      </div>

      <div className={styles.stage} ref={stage}>
        {services.map((service, i) => (
          <div
            key={service.slug}
            role="tabpanel"
            id={`svc-panel-${service.slug}`}
            aria-labelledby={`svc-tab-${service.slug}`}
            className={`${styles.panel} ${active === i ? styles.panelOn : ""}`}
            onClick={(e) => onPanelClick(e, i)}
          >
            <div className={styles.panelPhoto}>
              {/* Only the panel on stage carries its photograph. All ten
                  panels stay mounted so the stage never resizes and the copy
                  stays in the document — but mounting ten <Image>s meant the
                  browser fetched nine backdrops nobody was looking at, every
                  one of them a full-width project photo. `seen` keeps a panel's
                  image once it has been shown, so going back to a service is
                  instant rather than re-fetching.

                  Low quality is deliberate and invisible: this sits at 13%
                  opacity behind a white wash. */}
              {seen.has(i) && (
                <Image
                  src={service.photo}
                  alt=""
                  aria-hidden="true"
                  fill
                  quality={45}
                  sizes="(max-width: 1080px) 100vw, 55vw"
                />
              )}
            </div>
            <div className={styles.panelWash} />
            <div className={styles.panelBody}>
              <div className={styles.panelNo}>{service.no}</div>
              <h3 className={styles.panelTitle}>{ar ? service.ar : service.en}</h3>
              <p className={styles.panelLead}>{ar ? service.arLead : service.lead}</p>
              <p className={styles.panelText}>{ar ? service.arBody : service.body}</p>
              <ul className={styles.panelList}>
                {(ar ? service.arIncludes : service.includes).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link
                href={hrefFor(i)}
                className={styles.panelCta}
                // Only the panel on stage is reachable: the others are
                // visibility:hidden, which already takes them out of the tab
                // order, but this says so to anything that reads the tree.
                tabIndex={active === i ? 0 : -1}
              >
                {ar ? `تفاصيل ${service.ar}` : `Inside ${service.en}`}
                <span aria-hidden="true">{ar ? "←" : "→"}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
