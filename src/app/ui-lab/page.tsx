"use client";

/**
 * SCRATCH — not linked from anywhere, deleted before this branch merges.
 * Three ways to structure the partners / clients / accreditation block,
 * rendered at real width with the real marks.
 */

import Image from "next/image";
import { useState } from "react";
import { ACCREDITATION, BRANDS, CLIENT_GROUPS, CLIENTS, type Mark } from "./data";
import styles from "./lab.module.css";

function Logo({ mark, className }: { mark: Mark; className?: string }) {
  return (
    <Image
      src={`${mark.base}/${mark.file}`}
      alt={mark.name}
      title={mark.name}
      width={220}
      height={90}
      unoptimized={mark.file?.endsWith(".svg")}
      className={`${styles.logo} ${className ?? ""}`}
    />
  );
}

export default function UiLab() {
  const [tab, setTab] = useState<"clients" | "brands" | "accred">("accred");
  const tabbed = tab === "accred" ? ACCREDITATION : tab === "clients" ? CLIENTS : BRANDS;

  return (
    <main>
      {/* ── A: three tiers stacked, scale carries the hierarchy ───── */}
      <section className={styles.band}>
        <div className={styles.shell}>
          <p className={styles.tag}>Option A — one block, three tiers, scale carries the hierarchy</p>
          <div className={styles.head}>
            <div>
              <span className={styles.eyebrow}>Credentials</span>
              <h2 className={styles.h2}>Who we work for</h2>
            </div>
            <p className={styles.note}>
              Registered with the Kingdom&rsquo;s giga-projects, supplying its hotels, ministries
              and hospitals, and carrying forty-one manufacturer lines.
            </p>
          </div>

          <div className={styles.tier}>
            <div className={styles.tierHead}>
              <span className={styles.tierLabel}>Registered vendor with</span>
              <span className={styles.tierCount}>13</span>
            </div>
            <div className={styles.rowLarge}>
              {ACCREDITATION.map((m) => (
                <span key={m.name} className={styles.cellLarge}>
                  <Logo mark={m} />
                </span>
              ))}
            </div>
          </div>

          <div className={styles.tier}>
            <div className={styles.tierHead}>
              <span className={styles.tierLabel}>Clients</span>
              <span className={styles.tierCount}>33</span>
            </div>
            <div className={styles.rowMid}>
              {CLIENTS.map((m) => (
                <span key={m.name} className={styles.cellMid}>
                  <Logo mark={m} />
                </span>
              ))}
            </div>
          </div>

          <div className={styles.tier}>
            <div className={styles.tierHead}>
              <span className={styles.tierLabel}>Brands we carry</span>
              <span className={styles.tierCount}>41</span>
            </div>
            <div className={styles.rowSmall}>
              {BRANDS.map((m) => (
                <span key={m.name} className={styles.cellSmall}>
                  <Logo mark={m} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── D: A, but clients set as type instead of seals ────────── */}
      <section className={`${styles.band} ${styles.bandAlt}`}>
        <div className={styles.shell}>
          <p className={styles.tag}>
            Option D — as A, but the client tier is set as type, because most of those marks are seals
          </p>
          <div className={styles.head}>
            <div>
              <span className={styles.eyebrow}>Credentials</span>
              <h2 className={styles.h2}>Who we work for</h2>
            </div>
            <p className={styles.note}>
              Registered with the Kingdom&rsquo;s giga-projects, supplying its hotels, ministries
              and hospitals, and carrying forty-one manufacturer lines.
            </p>
          </div>

          <div className={styles.tier}>
            <div className={styles.tierHead}>
              <span className={styles.tierLabel}>Registered vendor with</span>
              <span className={styles.tierCount}>13</span>
            </div>
            <div className={styles.rowLarge}>
              {ACCREDITATION.map((m) => (
                <span key={m.name} className={styles.cellLarge}>
                  <Logo mark={m} />
                </span>
              ))}
            </div>
          </div>

          <div className={styles.tier}>
            <div className={styles.tierHead}>
              <span className={styles.tierLabel}>Clients</span>
              <span className={styles.tierCount}>33</span>
            </div>
            <div className={styles.nameCols}>
              {CLIENT_GROUPS.map((g) => (
                <div key={g.label} className={styles.nameCol}>
                  <span className={styles.nameColLabel}>{g.label}</span>
                  <ul className={styles.nameList}>
                    {g.names.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.tier}>
            <div className={styles.tierHead}>
              <span className={styles.tierLabel}>Brands we carry</span>
              <span className={styles.tierCount}>41</span>
            </div>
            <div className={styles.rowSmall}>
              {BRANDS.map((m) => (
                <span key={m.name} className={styles.cellSmall}>
                  <Logo mark={m} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── B: one block, segmented control ───────────────────────── */}
      <section className={`${styles.band} ${styles.bandAlt}`}>
        <div className={styles.shell}>
          <p className={styles.tag}>Option B — one block, segmented control</p>
          <div className={styles.head}>
            <div>
              <span className={styles.eyebrow}>Credentials</span>
              <h2 className={styles.h2}>Who we work for</h2>
            </div>
            <div className={styles.segs} role="tablist">
              {([
                ["accred", "Accreditation", 13],
                ["clients", "Clients", 33],
                ["brands", "Brands", 41],
              ] as const).map(([key, label, n]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={`${styles.seg} ${tab === key ? styles.segOn : ""}`}
                >
                  {label}
                  <span className={styles.segNum}>{n}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.rowMid}>
            {tabbed.map((m) => (
              <span key={m.name} className={styles.cellMid}>
                <Logo mark={m} />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── C: accreditation feature + two quiet rows ─────────────── */}
      <section className={styles.band}>
        <div className={styles.shell}>
          <p className={styles.tag}>Option C — accreditation as a feature, the rest as quiet rows</p>
          <div className={styles.feature}>
            <div className={styles.featureCopy}>
              <span className={styles.eyebrow}>Accreditation</span>
              <h2 className={styles.h2Small}>
                Registered vendor with the Kingdom&rsquo;s giga-projects
              </h2>
              <p className={styles.note}>
                Prequalified and registered with thirteen national developers and operators,
                which is what lets us bid the work in the first place.
              </p>
            </div>
            <div className={styles.featureGrid}>
              {ACCREDITATION.map((m) => (
                <span key={m.name} className={styles.cellLarge}>
                  <Logo mark={m} />
                </span>
              ))}
            </div>
          </div>

          <div className={styles.quiet}>
            <div className={styles.quietRow}>
              <span className={styles.quietLabel}>
                Clients <span className={styles.tierCount}>33</span>
              </span>
              <div className={styles.rowSmall}>
                {CLIENTS.slice(0, 12).map((m) => (
                  <span key={m.name} className={styles.cellSmall}>
                    <Logo mark={m} />
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.quietRow}>
              <span className={styles.quietLabel}>
                Brands <span className={styles.tierCount}>41</span>
              </span>
              <div className={styles.rowSmall}>
                {BRANDS.slice(0, 12).map((m) => (
                  <span key={m.name} className={styles.cellSmall}>
                    <Logo mark={m} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
