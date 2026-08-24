"use client";

import { useMemo, useState } from "react";
import { PROJECT_ROWS } from "@/lib/projects-data";
import styles from "./ProjectsTable.module.css";

type Filter = "all" | "fittings" | "controls";

function filterStyle(active: boolean) {
  return {
    color: active ? "#FFFFFF" : "rgba(17,17,17,.7)",
    background: active ? "#111111" : "transparent",
  };
}

export function ProjectsTable() {
  const [filter, setFilter] = useState<Filter>("all");

  const rows = useMemo(
    () => PROJECT_ROWS.filter((r) => filter === "all" || r.category === filter),
    [filter]
  );

  return (
    <>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
        <span
          onClick={() => setFilter("all")}
          style={{
            font: "500 11px/1 var(--font-plex-sans),sans-serif",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            padding: "13px 18px",
            cursor: "pointer",
            border: "1px solid rgba(17,17,17,.16)",
            ...filterStyle(filter === "all"),
          }}
        >
          All
        </span>
        <span
          onClick={() => setFilter("fittings")}
          style={{
            font: "500 11px/1 var(--font-plex-sans),sans-serif",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            padding: "13px 18px",
            cursor: "pointer",
            border: "1px solid rgba(17,17,17,.16)",
            ...filterStyle(filter === "fittings"),
          }}
        >
          Light fittings
        </span>
        <span
          onClick={() => setFilter("controls")}
          style={{
            font: "500 11px/1 var(--font-plex-sans),sans-serif",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            padding: "13px 18px",
            cursor: "pointer",
            border: "1px solid rgba(17,17,17,.16)",
            ...filterStyle(filter === "controls"),
          }}
        >
          Controls &amp; automation
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1.3fr 1.6fr",
          gap: "24px",
          padding: "0 4px 18px",
          borderBottom: "1px solid rgba(17,17,17,.28)",
        }}
      >
        <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(17,17,17,.58)" }}>
          Project
        </span>
        <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(17,17,17,.58)" }}>
          Location
        </span>
        <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(17,17,17,.58)" }}>
          Contractor / client
        </span>
        <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(17,17,17,.58)" }}>
          Scope
        </span>
      </div>

      {rows.map((row, i) => (
        <div
          key={`${row.name}-${row.loc}-${i}`}
          className={styles.row}
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1.3fr 1.6fr",
            gap: "24px",
            padding: "22px 4px",
            borderBottom: "1px solid rgba(17,17,17,.13)",
          }}
        >
          <span style={{ font: "400 15px/1.5 var(--font-plex-sans),sans-serif", color: "#111111" }}>{row.name}</span>
          <span style={{ font: "400 15px/1.5 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.62)" }}>{row.loc}</span>
          <span style={{ font: "400 15px/1.5 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.62)" }}>{row.client}</span>
          <span style={{ font: "400 15px/1.5 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.62)" }}>{row.scope}</span>
        </div>
      ))}

      <p style={{ font: "400 14px/1.6 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.52)", margin: "32px 0 0" }}>
        {rows.length} references listed. Full project list available on request.
      </p>
    </>
  );
}
