"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import type { Service } from "@/lib/services-data";
import styles from "./ServiceSpotlight.module.css";

/**
 * Numbered index on the left, one large panel on the right that swaps as you
 * hover or focus a line. Every panel stays mounted so the stage never resizes
 * and the copy stays in the document.
 *
 * Below 1080px the two columns stack, so the panel sits directly under the
 * index and a tap scrolls it into view.
 */
export function ServiceSpotlight({ services, ar }: { services: Service[]; ar: boolean }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
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
    setActive(next);
    tabs.current[next]?.focus();
  };

  const select = (index: number, scrollIntoView = false) => {
    setActive(index);
    if (scrollIntoView && window.matchMedia("(max-width: 1080px)").matches) {
      stage.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
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
            onMouseEnter={() => select(i)}
            onFocus={() => select(i)}
            onClick={() => select(i, true)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className={styles.tabNo}>{service.no}</span>
            <span className={styles.tabName}>{ar ? service.ar : service.en}</span>
          </button>
        ))}
        <p className={styles.hint}>
          {ar ? "مرّر المؤشر أو اضغط للتفاصيل" : "Hover or tap a line for the detail"}
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
          >
            <div className={styles.panelPhoto}>
              <Image
                src={service.photo}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 1080px) 100vw, 55vw"
              />
            </div>
            <div className={styles.panelWash} />
            <div className={styles.panelBody}>
              <div className={styles.panelNo}>{service.no}</div>
              <h3 className={styles.panelTitle}>{ar ? service.ar : service.en}</h3>
              <p className={styles.panelLead}>{service.lead}</p>
              <p className={styles.panelText}>{service.body}</p>
              <ul className={styles.panelList}>
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
