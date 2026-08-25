"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { POLES, POLE_FAMILIES, isPoleFamily, type PoleFamily } from "@/lib/smart-poles-data";
import { localePath } from "@/lib/site";
import { useLang } from "@/lib/lang";
import styles from "./page.module.css";

/**
 * The filter chips and the grid of twenty designs.
 *
 * The filter is mirrored into the query string so a filtered view can be
 * linked, bookmarked and reached with the back button — but it is read
 * through `history` rather than `useSearchParams`, deliberately. That hook
 * opts its whole subtree out of static prerendering, which would have cost
 * this grid its server-rendered HTML: twenty product links that search
 * engines and no-JS visitors would then never see. Here the full series is
 * in the static markup and the filter is pure enhancement on top.
 */
export function PoleSeries({ ar }: { ar: boolean }) {
  const { lang } = useLang();
  // Always "all" on the server, so the markup a crawler gets is the whole
  // catalogue. The URL is read after mount, below.
  const [family, setFamily] = useState<PoleFamily | "all">("all");

  useEffect(() => {
    const sync = () => {
      const value = new URLSearchParams(window.location.search).get("family") ?? undefined;
      setFamily(isPoleFamily(value) ? value : "all");
    };
    // Once on mount to pick up a shared link, then on every history move so
    // the back button steps through filters instead of leaving the grid on
    // whatever was last clicked.
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const poles = useMemo(
    () => (family === "all" ? POLES : POLES.filter((p) => p.family === family)),
    [family]
  );

  const selectFamily = (next: PoleFamily | "all") => {
    setFamily(next);
    const params = new URLSearchParams(window.location.search);
    if (next === "all") params.delete("family");
    else params.set("family", next);
    const query = params.toString();
    // replaceState rather than pushState: filtering is not a destination, and
    // stacking one history entry per chip would make Back feel broken.
    // Written by hand rather than through the router so the page keeps its
    // scroll position — re-filtering should not move the reader.
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}#designs`
    );
  };

  return (
    <>
      <Reveal>
        <div className={styles.filters}>
          {POLE_FAMILIES.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => selectFamily(f.id)}
              aria-pressed={family === f.id}
              className={`${styles.filter} ${family === f.id ? styles.filterOn : ""}`}
            >
              {ar ? f.ar : f.en}
            </button>
          ))}
        </div>
      </Reveal>

      <div className={styles.series}>
        {poles.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 70}>
            <Link href={localePath(`/services/smart-poles/${p.slug}`, lang)} className={styles.pole}>
              <div className={styles.poleArt}>
                <Image
                  src={`/smart-poles/${p.slug}.jpg`}
                  alt={
                    ar
                      ? `عمود ${p.name} الذكي، ${p.arTagline}`
                      : `${p.name} smart pole, ${p.tagline.toLowerCase()}`
                  }
                  fill
                  sizes="(max-width: 680px) 50vw, (max-width: 1080px) 33vw, 24vw"
                />
              </div>
              <div className={styles.poleMeta}>
                <h3 className={styles.poleName}>{p.name}</h3>
                <p className={styles.poleTag}>{ar ? p.arTagline : p.tagline}</p>
                <span className={styles.poleMore}>{ar ? "التفاصيل" : "View detail"}</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
