"use client";

import { useLang } from "@/lib/lang";
import { PhotoSlot } from "@/components/PhotoSlot";
import styles from "./page.module.css";

export default function ServicesPage() {
  const { lang } = useLang();

  return (
    <main>
      <section style={{ maxWidth: "1360px", margin: "0 auto", padding: "110px 48px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "34px" }}>
          <div style={{ width: "52px", height: "1px", background: "#111111" }}></div>
          <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "خدماتنا" : "Services"}</span>
        </div>
        <h1 style={{ font: "600 clamp(40px,5.6vw,88px)/1.02 var(--font-sora),sans-serif", letterSpacing: "-0.035em", color: "#111111", margin: "0", maxWidth: "18ch", textWrap: "balance" }}>{lang === "ar" ? "من التوريد إلى التشغيل" : "From supply to commissioning"}</h1>
        <p style={{ font: "300 clamp(17px,1.5vw,21px)/1.65 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.68)", margin: "34px 0 0", maxWidth: "58ch" }}>
          Nine service lines that cover a project end to end — specify the scheme, supply the fittings, wire the control system, and stay on for after-sale support.
        </p>
      </section>
      <section style={{ maxWidth: "1360px", margin: "0 auto", padding: "100px 48px 0" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1.1fr", gap: "48px", padding: "44px 0", borderTop: "1px solid rgba(17,17,17,.14)", alignItems: "start" }} className={styles.h1}>
            <span style={{ font: "300 34px/1 var(--font-sora),sans-serif", color: "#111111" }}>
              01
            </span>
            <h3 style={{ font: "500 clamp(24px,2.2vw,32px)/1.2 var(--font-sora),sans-serif", color: "#111111", margin: "0", letterSpacing: "-0.02em" }}>
              Indoor Lighting
            </h3>
            <p style={{ font: "400 16px/1.72 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "0" }}>
              Decorative and architectural fittings for villas, palaces, hotels, offices and retail — sourced from our European partner houses and stocked for Saudi projects.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1.1fr", gap: "48px", padding: "44px 0", borderTop: "1px solid rgba(17,17,17,.14)", alignItems: "start" }} className={styles.h2}>
            <span style={{ font: "300 34px/1 var(--font-sora),sans-serif", color: "#111111" }}>
              02
            </span>
            <h3 style={{ font: "500 clamp(24px,2.2vw,32px)/1.2 var(--font-sora),sans-serif", color: "#111111", margin: "0", letterSpacing: "-0.02em" }}>
              Lighting Design
            </h3>
            <p style={{ font: "400 16px/1.72 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "0" }}>
              Concept studies, calculations and fixture schedules produced alongside architects, lighting consultants and electrical engineers.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1.1fr", gap: "48px", padding: "44px 0", borderTop: "1px solid rgba(17,17,17,.14)", alignItems: "start" }} className={styles.h3}>
            <span style={{ font: "300 34px/1 var(--font-sora),sans-serif", color: "#111111" }}>
              03
            </span>
            <h3 style={{ font: "500 clamp(24px,2.2vw,32px)/1.2 var(--font-sora),sans-serif", color: "#111111", margin: "0", letterSpacing: "-0.02em" }}>
              Facade Lighting
            </h3>
            <p style={{ font: "400 16px/1.72 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "0" }}>
              Exterior and architectural schemes with IP-rated, heat-tolerant hardware suited to Gulf conditions.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1.1fr", gap: "48px", padding: "44px 0", borderTop: "1px solid rgba(17,17,17,.14)", alignItems: "start" }} className={styles.h4}>
            <span style={{ font: "300 34px/1 var(--font-sora),sans-serif", color: "#111111" }}>
              04
            </span>
            <h3 style={{ font: "500 clamp(24px,2.2vw,32px)/1.2 var(--font-sora),sans-serif", color: "#111111", margin: "0", letterSpacing: "-0.02em" }}>
              Outdoor Lighting
            </h3>
            <p style={{ font: "400 16px/1.72 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "0" }}>
              Roads, landscapes, compounds, car parks and sports areas — bollards, poles, floodlights and in-ground fittings.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1.1fr", gap: "48px", padding: "44px 0", borderTop: "1px solid rgba(17,17,17,.14)", alignItems: "start" }} className={styles.h5}>
            <span style={{ font: "300 34px/1 var(--font-sora),sans-serif", color: "#111111" }}>
              05
            </span>
            <h3 style={{ font: "500 clamp(24px,2.2vw,32px)/1.2 var(--font-sora),sans-serif", color: "#111111", margin: "0", letterSpacing: "-0.02em" }}>
              Lighting Controls
            </h3>
            <p style={{ font: "400 16px/1.72 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "0" }}>
              KNX/EIB control of every lighting circuit indoors and out, with scenes, sensors, dimming and energy monitoring.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1.1fr", gap: "48px", padding: "44px 0", borderTop: "1px solid rgba(17,17,17,.14)", alignItems: "start" }} className={styles.h6}>
            <span style={{ font: "300 34px/1 var(--font-sora),sans-serif", color: "#111111" }}>
              06
            </span>
            <h3 style={{ font: "500 clamp(24px,2.2vw,32px)/1.2 var(--font-sora),sans-serif", color: "#111111", margin: "0", letterSpacing: "-0.02em" }}>
              Lighting Installation
            </h3>
            <p style={{ font: "400 16px/1.72 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "0" }}>
              Installation, configuration, commissioning and handover carried out by ARAK technical teams.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1.1fr", gap: "48px", padding: "44px 0", borderTop: "1px solid rgba(17,17,17,.14)", alignItems: "start" }} className={styles.h7}>
            <span style={{ font: "300 34px/1 var(--font-sora),sans-serif", color: "#111111" }}>
              07
            </span>
            <h3 style={{ font: "500 clamp(24px,2.2vw,32px)/1.2 var(--font-sora),sans-serif", color: "#111111", margin: "0", letterSpacing: "-0.02em" }}>
              Project Management
            </h3>
            <p style={{ font: "400 16px/1.72 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "0" }}>
              Submittals, procurement, logistics and site coordination across multi-phase and multi-city programmes.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1.1fr", gap: "48px", padding: "44px 0", borderTop: "1px solid rgba(17,17,17,.14)", alignItems: "start" }} className={styles.h8}>
            <span style={{ font: "300 34px/1 var(--font-sora),sans-serif", color: "#111111" }}>
              08
            </span>
            <h3 style={{ font: "500 clamp(24px,2.2vw,32px)/1.2 var(--font-sora),sans-serif", color: "#111111", margin: "0", letterSpacing: "-0.02em" }}>
              3D Projection Mapping
            </h3>
            <p style={{ font: "400 16px/1.72 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "0" }}>
              Projected content mapped to building geometry for openings, seasons and cultural programming.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 1.1fr", gap: "48px", padding: "44px 0", borderBlock: "1px solid rgba(17,17,17,.14)", alignItems: "start" }} className={styles.h9}>
            <span style={{ font: "300 34px/1 var(--font-sora),sans-serif", color: "#111111" }}>
              09
            </span>
            <h3 style={{ font: "500 clamp(24px,2.2vw,32px)/1.2 var(--font-sora),sans-serif", color: "#111111", margin: "0", letterSpacing: "-0.02em" }}>
              Home Automation Systems
            </h3>
            <p style={{ font: "400 16px/1.72 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "0" }}>
              Lighting, curtains, HVAC, IP intercom, smart locks, WiFi and network systems delivered as one commissioned system.
            </p>
          </div>
        </div>
      </section>
      <section style={{ maxWidth: "1360px", margin: "0 auto", padding: "110px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "80px", alignItems: "start" }}>
          <div>
            <h2 style={{ font: "600 clamp(28px,3vw,44px)/1.1 var(--font-sora),sans-serif", letterSpacing: "-0.025em", color: "#111111", margin: "0", maxWidth: "20ch" }}>{lang === "ar" ? "أنظمة التحكم والأتمتة" : "Controls & automation, in detail"}</h2>
            <div style={{ marginTop: "44px", display: "flex", flexDirection: "column", gap: "34px" }}>
              <div style={{ borderTop: "1px solid rgba(17,17,17,.14)", paddingTop: "24px" }}>
                <h3 style={{ font: "500 19px/1.3 var(--font-sora),sans-serif", color: "#111111", margin: "0" }}>
                  KNX / EIB technology
                </h3>
                <p style={{ font: "400 15px/1.7 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "12px 0 0" }}>
                  A worldwide standard for building control across commercial, residential and industrial buildings. The product range covers lighting and shutter control, heating, ventilation, security and energy management.
                </p>
              </div>
              <div style={{ borderTop: "1px solid rgba(17,17,17,.14)", paddingTop: "24px" }}>
                <h3 style={{ font: "500 19px/1.3 var(--font-sora),sans-serif", color: "#111111", margin: "0" }}>
                  Guest Room Management System
                </h3>
                <p style={{ font: "400 15px/1.7 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "12px 0 0" }}>
                  Ensures all guests’ room needs are satisfied — lighting, cooling/heating, curtains and hotel room services through intuitive buttons, touch screens or panel interfaces.
                </p>
              </div>
              <div style={{ borderTop: "1px solid rgba(17,17,17,.14)", paddingTop: "24px" }}>
                <h3 style={{ font: "500 19px/1.3 var(--font-sora),sans-serif", color: "#111111", margin: "0" }}>
                  Lighting Control System
                </h3>
                <p style={{ font: "400 15px/1.7 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "12px 0 0" }}>
                  Flexible, robust and widely interfaceable, with significant potential for energy saving on projects of any size.
                </p>
              </div>
            </div>
          </div>
          <div style={{ height: "660px" }}>
            <PhotoSlot src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1800&auto=format&fit=crop" alt="Control panel, touch screen or commissioning on site (portrait, 1200×1600)" />
          </div>
        </div>
      </section>

    </main>
  );
}
