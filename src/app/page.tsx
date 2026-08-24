"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { PhotoSlot } from "@/components/PhotoSlot";
import { VendorBelt } from "@/components/VendorBelt";
import styles from "./page.module.css";

export default function HomePage() {
  const { lang } = useLang();

  return (
    <main>
      <section style={{ position: "relative", height: "min(88vh,900px)", minHeight: "620px", overflow: "hidden", background: "#FFFFFF" }}>
        <div style={{ position: "absolute", inset: "0" }}>
          <PhotoSlot src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop" alt="Hero — dark architectural interior, dramatic lighting (landscape, 2400×1400)" />
        </div>
        <div style={{ position: "absolute", inset: "0", background: "linear-gradient(100deg,#FFFFFF 3%,rgba(255,255,255,.92) 38%,rgba(255,255,255,.3) 80%)", pointerEvents: "none" }}></div>
        <div style={{ position: "absolute", top: "0", left: "22%", width: "1px", height: "100%", background: "linear-gradient(180deg,rgba(17,17,17,0) 0%,rgba(17,17,17,.32) 45%,rgba(17,17,17,0) 100%)", animation: "beam 6s ease-in-out infinite", pointerEvents: "none" }}></div>
        <div style={{ position: "relative", height: "100%", maxWidth: "1360px", margin: "0 auto", padding: "0 48px", display: "flex", flexDirection: "column", justifyContent: "center", pointerEvents: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "30px" }}>
            <div style={{ width: "52px", height: "1px", background: "#111111" }}></div>
            <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "حلول الإضاءة الذكية · الرياض" : "Smart Lighting Solutions · Riyadh"}</span>
          </div>
          <h1 style={{ font: "600 clamp(46px,7vw,104px)/0.98 var(--font-sora),sans-serif", letterSpacing: "-0.035em", color: "#111111", margin: "0", maxWidth: "15ch", textWrap: "balance" }}>{lang === "ar" ? "نُضيء المملكة منذ عام ١٩٧٦" : "Lighting the Kingdom since 1976"}</h1>
          <p style={{ font: "300 clamp(17px,1.5vw,21px)/1.6 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)", margin: "34px 0 0", maxWidth: "52ch" }}>
            Forty-five years of fixtures, lighting design, KNX controls and home automation — delivered across hotels, airports, palaces and national projects.
          </p>
          <div style={{ display: "flex", gap: "14px", marginTop: "46px", pointerEvents: "auto" }}>
            <Link href="/contact" style={{ font: "500 12px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFFFFF", background: "#111111", padding: "19px 30px", cursor: "pointer" }} className={styles.h1}>{lang === "ar" ? "احجز استشارة إضاءة" : "Book a lighting consultation"}</Link>
            <Link href="/projects" style={{ font: "500 12px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".14em", textTransform: "uppercase", color: "#111111", border: "1px solid rgba(17,17,17,.28)", padding: "19px 30px", cursor: "pointer" }} className={styles.h2}>{lang === "ar" ? "عرض المشاريع" : "View projects"}</Link>
          </div>
        </div>
      </section>
      <section style={{ borderBlock: "1px solid rgba(17,17,17,.13)", display: "block" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          <div style={{ padding: "46px 0", borderInlineEnd: "1px solid rgba(17,17,17,.13)" }}>
            <div style={{ font: "300 clamp(40px,4vw,58px)/1 var(--font-sora),sans-serif", color: "#111111", letterSpacing: "-0.03em" }}>
              1976
            </div>
            <div style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(17,17,17,.62)", marginTop: "14px" }}>{lang === "ar" ? "سنة التأسيس" : "Founded"}</div>
          </div>
          <div style={{ padding: "46px 0 46px 46px", borderInlineEnd: "1px solid rgba(17,17,17,.13)" }}>
            <div style={{ font: "300 clamp(40px,4vw,58px)/1 var(--font-sora),sans-serif", color: "#111111", letterSpacing: "-0.03em" }}>
              45
              <span style={{ color: "#111111" }}>
                +
              </span>
            </div>
            <div style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(17,17,17,.62)", marginTop: "14px" }}>{lang === "ar" ? "سنوات من الخبرة" : "Years of know-how"}</div>
          </div>
          <div style={{ padding: "46px 0 46px 46px", borderInlineEnd: "1px solid rgba(17,17,17,.13)" }}>
            <div style={{ font: "300 clamp(40px,4vw,58px)/1 var(--font-sora),sans-serif", color: "#111111", letterSpacing: "-0.03em" }}>
              36
            </div>
            <div style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(17,17,17,.62)", marginTop: "14px" }}>{lang === "ar" ? "ماركة عالمية شريكة" : "Partner brands"}</div>
          </div>
          <div style={{ padding: "46px 0 46px 46px" }}>
            <div style={{ font: "300 clamp(40px,4vw,58px)/1 var(--font-sora),sans-serif", color: "#111111", letterSpacing: "-0.03em" }}>
              9
            </div>
            <div style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(17,17,17,.62)", marginTop: "14px" }}>{lang === "ar" ? "خطوط خدمة" : "Service lines"}</div>
          </div>
        </div>
      </section>
      <section style={{ maxWidth: "1360px", margin: "0 auto", padding: "130px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(0,1fr)", gap: "96px", alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "34px" }}>
              <div style={{ width: "34px", height: "1px", background: "#111111" }}></div>
              <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "من نحن" : "Who we are"}</span>
            </div>
            <h2 style={{ font: "600 clamp(32px,4vw,58px)/1.06 var(--font-sora),sans-serif", letterSpacing: "-0.03em", color: "#111111", margin: "0", maxWidth: "20ch" }}>{lang === "ar" ? "نتألق منذ عام ١٩٧٦" : "Shining brightly since 1976"}</h2>
            <p style={{ font: "400 17px/1.75 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.68)", margin: "36px 0 0", maxWidth: "62ch" }}>
              “ARAK” 
              <span style={{ color: "#111111" }}>
                أراك
              </span>
               — I See You in Arabic — is a Lighting Company and a Smart Lighting Solutions Provider that started as an extension of Abdul Rahman Abdul Kadir Corporation in 1976 and is now a pioneering Saudi Establishment that embodies Saudi values.
            </p>
            <p style={{ font: "400 17px/1.75 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.68)", margin: "26px 0 0", maxWidth: "62ch" }}>
              From supplying lighting fixtures to installing full-on Home Automation Systems, we pride ourselves to have successfully marked the industry with more than 45 years of know-how, leadership, and shimmering lights.
            </p>
            <p style={{ font: "400 17px/1.75 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.68)", margin: "26px 0 0", maxWidth: "62ch" }}>
              Throughout the years, ARAK has positioned itself alongside the industry’s pioneering national companies, becoming a certified partner of several reputable international companies, such as Philips.
            </p>
            <Link href="/about" style={{ display: "inline-flex", alignItems: "center", gap: "12px", font: "500 12px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".16em", textTransform: "uppercase", color: "#111111", marginTop: "44px", cursor: "pointer", borderBottom: "1px solid rgba(17,17,17,.3)", paddingBottom: "8px" }} className={styles.h3}>{lang === "ar" ? "قصتنا الكاملة" : "Our full story →"}</Link>
          </div>
          <div style={{ height: "560px" }}>
            <PhotoSlot src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1800&auto=format&fit=crop" alt="Showroom or fixture detail (portrait, 1200×1600)" />
          </div>
        </div>
      </section>
      <section style={{ borderTop: "1px solid rgba(17,17,17,.13)", background: "#F6F5F3" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "120px 48px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px", flexWrap: "wrap", marginBottom: "74px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "30px" }}>
                <div style={{ width: "34px", height: "1px", background: "#111111" }}></div>
                <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "ما نقدمه" : "What we do"}</span>
              </div>
              <h2 style={{ font: "600 clamp(32px,4vw,58px)/1.06 var(--font-sora),sans-serif", letterSpacing: "-0.03em", color: "#111111", margin: "0" }}>{lang === "ar" ? "خدماتنا" : "Our services"}</h2>
            </div>
            <p style={{ font: "400 16px/1.7 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "0", maxWidth: "44ch" }}>
              Specification, supply, commissioning and after-sale support — under one contract, from one Riyadh team.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", columnGap: "clamp(28px,3.6vw,60px)" }}>
            <div style={{ padding: "32px 0 40px", borderTop: "1px solid rgba(17,17,17,.18)", display: "flex", flexDirection: "column", minHeight: "158px" }} className={styles.h4}>
              <span style={{ font: "400 12px/1 var(--font-sora),sans-serif", color: "rgba(17,17,17,.45)", letterSpacing: ".14em" }}>
                01
              </span>
              <h3 style={{ font: "500 23px/1.25 var(--font-sora),sans-serif", color: "#111111", margin: "20px 0 0", letterSpacing: "-0.01em" }}>{lang === "ar" ? "الإضاءة الداخلية" : "Indoor Lighting"}</h3>
              <p style={{ font: "400 15px/1.65 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.62)", margin: "14px 0 0" }}>
                Decorative and architectural fittings for residential, hospitality and commercial interiors.
              </p>
            </div>
            <div style={{ padding: "32px 0 40px", borderTop: "1px solid rgba(17,17,17,.18)", display: "flex", flexDirection: "column", minHeight: "158px" }} className={styles.h5}>
              <span style={{ font: "400 12px/1 var(--font-sora),sans-serif", color: "rgba(17,17,17,.45)", letterSpacing: ".14em" }}>
                02
              </span>
              <h3 style={{ font: "500 23px/1.25 var(--font-sora),sans-serif", color: "#111111", margin: "20px 0 0", letterSpacing: "-0.01em" }}>{lang === "ar" ? "تصميم الإضاءة" : "Lighting Design"}</h3>
              <p style={{ font: "400 15px/1.65 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.62)", margin: "14px 0 0" }}>
                Photometric studies, layouts and fixture schedules developed with consultants and architects.
              </p>
            </div>
            <div style={{ padding: "32px 0 40px", borderTop: "1px solid rgba(17,17,17,.18)", display: "flex", flexDirection: "column", minHeight: "158px" }} className={styles.h6}>
              <span style={{ font: "400 12px/1 var(--font-sora),sans-serif", color: "rgba(17,17,17,.45)", letterSpacing: ".14em" }}>
                03
              </span>
              <h3 style={{ font: "500 23px/1.25 var(--font-sora),sans-serif", color: "#111111", margin: "20px 0 0", letterSpacing: "-0.01em" }}>{lang === "ar" ? "إضاءة الواجهات" : "Facade Lighting"}</h3>
              <p style={{ font: "400 15px/1.65 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.62)", margin: "14px 0 0" }}>
                Exterior schemes that give buildings a night identity, engineered for the Saudi climate.
              </p>
            </div>
            <div style={{ padding: "32px 0 40px", borderTop: "1px solid rgba(17,17,17,.18)", display: "flex", flexDirection: "column", minHeight: "158px" }} className={styles.h7}>
              <span style={{ font: "400 12px/1 var(--font-sora),sans-serif", color: "rgba(17,17,17,.45)", letterSpacing: ".14em" }}>
                04
              </span>
              <h3 style={{ font: "500 23px/1.25 var(--font-sora),sans-serif", color: "#111111", margin: "20px 0 0", letterSpacing: "-0.01em" }}>{lang === "ar" ? "الإضاءة الخارجية" : "Outdoor Lighting"}</h3>
              <p style={{ font: "400 15px/1.65 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.62)", margin: "14px 0 0" }}>
                Streets, landscapes, car parks and compounds — from bollards to high-mast poles.
              </p>
            </div>
            <div style={{ padding: "32px 0 40px", borderTop: "1px solid rgba(17,17,17,.18)", display: "flex", flexDirection: "column", minHeight: "158px" }} className={styles.h8}>
              <span style={{ font: "400 12px/1 var(--font-sora),sans-serif", color: "rgba(17,17,17,.45)", letterSpacing: ".14em" }}>
                05
              </span>
              <h3 style={{ font: "500 23px/1.25 var(--font-sora),sans-serif", color: "#111111", margin: "20px 0 0", letterSpacing: "-0.01em" }}>{lang === "ar" ? "أنظمة التحكم بالإضاءة" : "Lighting Controls"}</h3>
              <p style={{ font: "400 15px/1.65 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.62)", margin: "14px 0 0" }}>
                KNX/EIB systems, scene control, daylight and presence sensing, energy management.
              </p>
            </div>
            <div style={{ padding: "32px 0 40px", borderTop: "1px solid rgba(17,17,17,.18)", display: "flex", flexDirection: "column", minHeight: "158px" }} className={styles.h9}>
              <span style={{ font: "400 12px/1 var(--font-sora),sans-serif", color: "rgba(17,17,17,.45)", letterSpacing: ".14em" }}>
                06
              </span>
              <h3 style={{ font: "500 23px/1.25 var(--font-sora),sans-serif", color: "#111111", margin: "20px 0 0", letterSpacing: "-0.01em" }}>{lang === "ar" ? "تركيب الإضاءة" : "Lighting Installation"}</h3>
              <p style={{ font: "400 15px/1.65 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.62)", margin: "14px 0 0" }}>
                Site installation, commissioning and handover by our own technical crews.
              </p>
            </div>
            <div style={{ padding: "32px 0 40px", borderTop: "1px solid rgba(17,17,17,.18)", display: "flex", flexDirection: "column", minHeight: "158px" }} className={styles.h10}>
              <span style={{ font: "400 12px/1 var(--font-sora),sans-serif", color: "rgba(17,17,17,.45)", letterSpacing: ".14em" }}>
                07
              </span>
              <h3 style={{ font: "500 23px/1.25 var(--font-sora),sans-serif", color: "#111111", margin: "20px 0 0", letterSpacing: "-0.01em" }}>{lang === "ar" ? "إدارة المشاريع" : "Project Management"}</h3>
              <p style={{ font: "400 15px/1.65 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.62)", margin: "14px 0 0" }}>
                Procurement, logistics and programme tracking across multi-phase national projects.
              </p>
            </div>
            <div style={{ padding: "32px 0 40px", borderTop: "1px solid rgba(17,17,17,.18)", display: "flex", flexDirection: "column", minHeight: "158px" }} className={styles.h11}>
              <span style={{ font: "400 12px/1 var(--font-sora),sans-serif", color: "rgba(17,17,17,.45)", letterSpacing: ".14em" }}>
                08
              </span>
              <h3 style={{ font: "500 23px/1.25 var(--font-sora),sans-serif", color: "#111111", margin: "20px 0 0", letterSpacing: "-0.01em" }}>{lang === "ar" ? "الإسقاط الضوئي ثلاثي الأبعاد" : "3D Projection Mapping"}</h3>
              <p style={{ font: "400 15px/1.65 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.62)", margin: "14px 0 0" }}>
                Projected media for events, launches and cultural venues, mapped to real geometry.
              </p>
            </div>
            <div style={{ padding: "32px 0 40px", borderTop: "1px solid rgba(17,17,17,.18)", display: "flex", flexDirection: "column", minHeight: "158px" }} className={styles.h12}>
              <span style={{ font: "400 12px/1 var(--font-sora),sans-serif", color: "rgba(17,17,17,.45)", letterSpacing: ".14em" }}>
                09
              </span>
              <h3 style={{ font: "500 23px/1.25 var(--font-sora),sans-serif", color: "#111111", margin: "20px 0 0", letterSpacing: "-0.01em" }}>{lang === "ar" ? "أنظمة الأتمتة المنزلية" : "Home Automation Systems"}</h3>
              <p style={{ font: "400 15px/1.65 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.62)", margin: "14px 0 0" }}>
                Lighting, curtains, HVAC, intercom, smart locks and networks on one interface.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section style={{ borderTop: "1px solid rgba(17,17,17,.13)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)" }}>
          <div style={{ position: "relative", alignSelf: "stretch", minHeight: "640px" }}>
            <PhotoSlot src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1800&auto=format&fit=crop" alt="KNX panel, touch interface or hotel guest room (portrait, 1400×1800)" />
          </div>
          <div style={{ padding: "120px clamp(48px,6vw,110px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "30px" }}>
              <div style={{ width: "34px", height: "1px", background: "#111111" }}></div>
              <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "الأنظمة الذكية" : "Smart systems"}</span>
            </div>
            <h2 style={{ font: "600 clamp(30px,3.2vw,46px)/1.1 var(--font-sora),sans-serif", letterSpacing: "-0.03em", color: "#111111", margin: "0", maxWidth: "22ch" }}>{lang === "ar" ? "أنظمة التحكم بالإضاءة والأتمتة المنزلية" : "Lighting Controls & Home Automation Systems"}</h2>
            <div style={{ marginTop: "52px", display: "flex", flexDirection: "column", gap: "40px" }}>
              <div style={{ borderTop: "1px solid rgba(17,17,17,.14)", paddingTop: "26px" }}>
                <h3 style={{ font: "500 19px/1.3 var(--font-sora),sans-serif", color: "#111111", margin: "0" }}>
                  KNX / EIB
                </h3>
                <p style={{ font: "400 15px/1.7 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "14px 0 0" }}>
                  Our KNX/EIB products are based on the simple yet proven KNX/EIB technology, which is now considered a worldwide standard for building control and all types of smart automation of commercial, residential, or industrial buildings — covering lighting and shutter control, heating, ventilation, security and energy management.
                </p>
              </div>
              <div style={{ borderTop: "1px solid rgba(17,17,17,.14)", paddingTop: "26px" }}>
                <h3 style={{ font: "500 19px/1.3 var(--font-sora),sans-serif", color: "#111111", margin: "0" }}>
                  Guest Room Management System
                </h3>
                <p style={{ font: "400 15px/1.7 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "14px 0 0" }}>
                  The GRMS provides an innovative and efficient way to control the lighting, cooling/heating, curtains, and Hotel Room Services through intuitive buttons, touch screens, or panel interfaces.
                </p>
              </div>
              <div style={{ borderTop: "1px solid rgba(17,17,17,.14)", paddingTop: "26px" }}>
                <h3 style={{ font: "500 19px/1.3 var(--font-sora),sans-serif", color: "#111111", margin: "0" }}>
                  Lighting Control System
                </h3>
                <p style={{ font: "400 15px/1.7 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "14px 0 0" }}>
                  Seamless control and monitoring of all lighting circuits in the building and outdoor lightings — chosen for major projects of all sizes for its flexibility, robustness, wide interfacing capabilities, and significant potential for energy saving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ borderTop: "1px solid rgba(17,17,17,.13)", background: "#F6F5F3" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "120px 48px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px", flexWrap: "wrap", marginBottom: "70px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "30px" }}>
                <div style={{ width: "34px", height: "1px", background: "#111111" }}></div>
                <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "أعمالنا" : "Selected work"}</span>
              </div>
              <h2 style={{ font: "600 clamp(32px,4vw,58px)/1.06 var(--font-sora),sans-serif", letterSpacing: "-0.03em", color: "#111111", margin: "0" }}>{lang === "ar" ? "مشاريع مختارة" : "Projects"}</h2>
            </div>
            <Link href="/projects" style={{ font: "500 12px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".16em", textTransform: "uppercase", color: "#111111", cursor: "pointer", borderBottom: "1px solid rgba(17,17,17,.3)", paddingBottom: "8px" }} className={styles.h13}>{lang === "ar" ? "جميع المراجع" : "All project references →"}</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "28px" }}>
            <div>
              <div style={{ height: "400px" }}>
                <PhotoSlot src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1800&auto=format&fit=crop" alt="The Ritz-Carlton, Riyadh" />
              </div>
              <div style={{ paddingTop: "24px", borderTop: "1px solid rgba(17,17,17,.14)", marginTop: "24px" }}>
                <h3 style={{ font: "500 21px/1.3 var(--font-sora),sans-serif", color: "#111111", margin: "0" }}>
                  The Ritz-Carlton
                </h3>
                <p style={{ font: "400 14px/1.6 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.58)", margin: "10px 0 0" }}>
                  Riyadh · Supply of light fittings
                </p>
              </div>
            </div>
            <div>
              <div style={{ height: "400px" }}>
                <PhotoSlot src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop" alt="King Fahad International Airport, Dammam" />
              </div>
              <div style={{ paddingTop: "24px", borderTop: "1px solid rgba(17,17,17,.14)", marginTop: "24px" }}>
                <h3 style={{ font: "500 21px/1.3 var(--font-sora),sans-serif", color: "#111111", margin: "0" }}>
                  King Fahad International Airport
                </h3>
                <p style={{ font: "400 14px/1.6 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.58)", margin: "10px 0 0" }}>
                  Dammam · Supply & installation of light fittings
                </p>
              </div>
            </div>
            <div>
              <div style={{ height: "400px" }}>
                <PhotoSlot src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1800&auto=format&fit=crop" alt="Four Points by Sheraton, Riyadh" />
              </div>
              <div style={{ paddingTop: "24px", borderTop: "1px solid rgba(17,17,17,.14)", marginTop: "24px" }}>
                <h3 style={{ font: "500 21px/1.3 var(--font-sora),sans-serif", color: "#111111", margin: "0" }}>
                  Four Points by Sheraton
                </h3>
                <p style={{ font: "400 14px/1.6 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.58)", margin: "10px 0 0" }}>
                  Riyadh · KNX lighting control systems
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ borderTop: "1px solid rgba(17,17,17,.13)" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "120px 48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "80px", alignItems: "start" }}>
            <div style={{ position: "sticky", top: "130px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "30px" }}>
                <div style={{ width: "34px", height: "1px", background: "#111111" }}></div>
                <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "الماركات" : "Brands"}</span>
              </div>
              <h2 style={{ font: "600 clamp(30px,3.2vw,46px)/1.08 var(--font-sora),sans-serif", letterSpacing: "-0.03em", color: "#111111", margin: "0" }}>{lang === "ar" ? "شركاؤنا" : "Our partners"}</h2>
              <p style={{ font: "400 16px/1.7 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "26px 0 0" }}>
                A certified partner of reputable international manufacturers, from decorative houses to control platforms.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h14}>
                Philips
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h15}>
                ABB
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h16}>
                Lutron
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h17}>
                Zennio
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h18}>
                Hager
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h19}>
                Leviton
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h20}>
                GEWISS
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h21}>
                Interra
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h22}>
                Reggiani
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h23}>
                LEDS C4
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h24}>
                Disano Illuminazione
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h25}>
                LUG
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h26}>
                planlicht
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h27}>
                Arkoslight
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h28}>
                RZB Lighting
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h29}>
                Trevos
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h30}>
                Zalux
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h31}>
                Fumagalli
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h32}>
                Norlys
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h33}>
                JISO Iluminación
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h34}>
                Viokef Lighting
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h35}>
                Lucio
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h36}>
                LuxeLED
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h37}>
                LipaLight
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h38}>
                C°LB
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h39}>
                C-Luce
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h40}>
                Hormen
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h41}>
                espica
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h42}>
                Niviss
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h43}>
                p.u.k.
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h44}>
                ACB
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h45}>
                Vetreria Artistica Rosa
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h46}>
                ESP
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h47}>
                Denko
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h48}>
                TM Technologie
              </span>
              <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", border: "1px solid rgba(17,17,17,.14)", padding: "15px 19px" }} className={styles.h49}>
                EML
              </span>
            </div>
          </div>
        </div>
      </section>
      <section style={{ borderTop: "1px solid rgba(17,17,17,.13)", background: "#F6F5F3" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "120px 48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "80px", alignItems: "start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "30px" }}>
                <div style={{ width: "34px", height: "1px", background: "#111111" }}></div>
                <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "الثقة" : "Trusted by"}</span>
              </div>
              <h2 style={{ font: "600 clamp(30px,3.2vw,46px)/1.08 var(--font-sora),sans-serif", letterSpacing: "-0.03em", color: "#111111", margin: "0" }}>{lang === "ar" ? "عملاؤنا" : "Our clients"}</h2>
              <p style={{ font: "400 16px/1.7 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "26px 0 0" }}>
                A few of the hotels, banks, ministries, hospitals and universities we have supplied.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", columnGap: "clamp(32px,4vw,72px)" }}>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                The Ritz-Carlton
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Four Seasons Hotels and Resorts
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Mövenpick Hotels & Resorts
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Four Points by Sheraton
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Burj Rafal Hotel
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Makarem
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Alawwal Bank
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Bank Aljazira
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Emirates NBD
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                King Faisal Specialist Hospital & Research Centre
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                King Saud University
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Ministry of Environment, Water & Agriculture
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Ministry of National Guard
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Royal Saudi Air Force
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Alsalam Aerospace Industries
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                DACO — Dammam Airports Company
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                FLOW — Riyadh Metro Operator
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Al Bawani
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Commitco for Construction
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Alkhorayef Commercial
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Tamimi Group of Companies
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Almajal G4S
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Altakhassusi
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                SACO
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Panda
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Cartier
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Jodur
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Al Rafi
              </div>
              <div style={{ padding: "16px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "58px" }}>
                Solitaire
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ borderTop: "1px solid rgba(17,17,17,.13)" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "120px 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "30px" }}>
            <div style={{ width: "34px", height: "1px", background: "#111111" }}></div>
            <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "الاعتماد" : "Accreditation"}</span>
          </div>
          <h2 style={{ font: "600 clamp(30px,3.2vw,46px)/1.08 var(--font-sora),sans-serif", letterSpacing: "-0.03em", color: "#111111", margin: "0 0 60px" }}>{lang === "ar" ? "مورد معتمد لدى" : "Registered vendor with"}</h2>
          <VendorBelt />
          <div style={{ marginTop: "96px", borderTop: "1px solid rgba(17,17,17,.13)", paddingTop: "70px" }}>
            <h3 style={{ font: "500 13px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".24em", textTransform: "uppercase", color: "rgba(17,17,17,.58)", margin: "0 0 40px" }}>{lang === "ar" ? "نعمل مع" : "We work with"}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", columnGap: "clamp(28px,3.6vw,60px)" }}>
              <div style={{ padding: "18px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "62px" }}>
                Government Entities
              </div>
              <div style={{ padding: "18px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "62px" }}>
                Semi Government Entities
              </div>
              <div style={{ padding: "18px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "62px" }}>
                Airports and Hotels
              </div>
              <div style={{ padding: "18px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "62px" }}>
                Facilities Management Companies
              </div>
              <div style={{ padding: "18px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "62px" }}>
                Residential Contractors
              </div>
              <div style={{ padding: "18px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "62px" }}>
                Commercial Contractors
              </div>
              <div style={{ padding: "18px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "62px" }}>
                Industrial Contractors
              </div>
              <div style={{ padding: "18px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "62px" }}>
                Architectural and Lighting Consultants
              </div>
              <div style={{ padding: "18px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "62px" }}>
                Electrical Consultants
              </div>
              <div style={{ padding: "18px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "62px" }}>
                Real Estate Developers
              </div>
              <div style={{ padding: "18px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "62px" }}>
                Oil and Gas Industry
              </div>
              <div style={{ padding: "18px 0", borderTop: "1px solid rgba(17,17,17,.11)", font: "400 15px/1.45 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.78)", display: "flex", alignItems: "center", minHeight: "62px" }}>
                ESCO’s
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ background: "#111111" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "130px 48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <blockquote style={{ font: "300 clamp(30px,4.4vw,62px)/1.14 var(--font-sora),sans-serif", letterSpacing: "-0.03em", color: "#FFFFFF", margin: "0", maxWidth: "24ch", textWrap: "balance" }}>
            Light is not so much something that reveals as it is itself the revelation.
          </blockquote>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "44px" }}>
            <div style={{ width: "34px", height: "1px", background: "rgba(255,255,255,.5)" }}></div>
            <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".28em", textTransform: "uppercase", color: "rgba(255,255,255,.7)" }}>
              James Turrell
            </span>
          </div>
        </div>
      </section>
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: "0", background: "radial-gradient(120% 90% at 50% -10%,rgba(17,17,17,.07) 0%,rgba(255,255,255,0) 62%)", pointerEvents: "none" }}></div>
        <div style={{ position: "relative", maxWidth: "1360px", margin: "0 auto", padding: "140px 48px", textAlign: "center" }}>
          <h2 style={{ font: "600 clamp(34px,4.6vw,68px)/1.06 var(--font-sora),sans-serif", letterSpacing: "-0.035em", color: "#111111", margin: "0 auto", maxWidth: "22ch", textWrap: "balance" }}>{lang === "ar" ? "لنُضئ مشروعك القادم" : "Let’s light your next project"}</h2>
          <p style={{ font: "300 clamp(16px,1.4vw,20px)/1.65 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "28px auto 0", maxWidth: "52ch" }}>
            Send us drawings, a fixture schedule, or just the brief. Our Riyadh team will come back with a lighting study and a quotation.
          </p>
          <Link href="/contact" style={{ display: "inline-block", font: "500 12px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFFFFF", background: "#111111", padding: "21px 36px", marginTop: "48px", cursor: "pointer" }} className={styles.h76}>{lang === "ar" ? "احجز استشارة إضاءة" : "Book a lighting consultation"}</Link>
        </div>
      </section>

    </main>
  );
}
