"use client";

import { useLang } from "@/lib/lang";
import { PhotoSlot } from "@/components/PhotoSlot";
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
          Hotels, airports, hospitals, universities, palaces and national facilities across the Kingdom. Supplied, installed and commissioned.
        </p>
      </section>

      <section style={{ maxWidth: "1360px", margin: "0 auto", padding: "80px 48px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "24px" }}>
          <div style={{ height: "320px" }}>
            <PhotoSlot src="https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1800&auto=format&fit=crop" alt="Hospitality project" />
          </div>
          <div style={{ height: "320px" }}>
            <PhotoSlot src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1800&auto=format&fit=crop" alt="Aviation / infrastructure project" />
          </div>
          <div style={{ height: "320px" }}>
            <PhotoSlot src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1800&auto=format&fit=crop" alt="Residential / palace project" />
          </div>
        </div>
      </section>

      <section style={{ maxWidth: "1360px", margin: "0 auto", padding: "90px 48px 130px" }}>
        <ProjectsTable />
      </section>
    </main>
  );
}
