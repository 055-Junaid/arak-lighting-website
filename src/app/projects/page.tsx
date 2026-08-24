"use client";

import { useLang } from "@/lib/lang";
import { ProjectCards } from "@/components/ProjectCards";
import { ProjectsTable } from "@/components/ProjectsTable";

export default function ProjectsPage() {
  const { lang } = useLang();

  return (
    <main>
      <section style={{ maxWidth: "1360px", margin: "0 auto", padding: "110px 48px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "34px" }}>
          <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "مشاريعنا" : "Projects"}</span>
        </div>
        <h1 style={{ font: "600 clamp(40px,5.6vw,88px)/1.02 var(--font-sora),sans-serif", letterSpacing: "-0.035em", color: "#111111", margin: "0", maxWidth: "18ch", textWrap: "balance" }}>{lang === "ar" ? "مراجع المشاريع" : "Project references"}</h1>
        <p style={{ font: "300 clamp(17px,1.5vw,21px)/1.65 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.68)", margin: "34px 0 0", maxWidth: "58ch" }}>
          {lang === "ar"
            ? "فنادق ومطارات ومستشفيات وجامعات وقصور ومنشآت وطنية في مختلف أنحاء المملكة. توريدًا وتركيبًا وتشغيلًا."
            : "Hotels, airports, hospitals, universities, palaces and national facilities across the Kingdom. Supplied, installed and commissioned."}
        </p>
      </section>

      <section style={{ maxWidth: "1360px", margin: "0 auto", padding: "84px 48px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
          <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "أبرز المشاريع" : "Top projects"}</span>
          <span style={{ flex: 1, height: "1px", background: "rgba(17,17,17,.13)" }} />
        </div>
        <ProjectCards />
      </section>

      <section style={{ maxWidth: "1360px", margin: "0 auto", padding: "110px 48px 130px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
          <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "مشاريع أخرى" : "Further references"}</span>
          <span style={{ flex: 1, height: "1px", background: "rgba(17,17,17,.13)" }} />
        </div>
        <ProjectsTable />
      </section>
    </main>
  );
}
