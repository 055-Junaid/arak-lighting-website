"use client";

import { useLang } from "@/lib/lang";
import { PhotoSlot } from "@/components/PhotoSlot";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  const { lang } = useLang();

  return (
    <main>
      <section style={{ maxWidth: "1360px", margin: "0 auto", padding: "110px 48px 130px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "34px" }}>
          <div style={{ width: "52px", height: "1px", background: "#111111" }}></div>
          <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "تواصل معنا" : "Contact"}</span>
        </div>
        <h1 style={{ font: "600 clamp(40px,5.6vw,84px)/1.02 var(--font-sora),sans-serif", letterSpacing: "-0.035em", color: "#111111", margin: "0", maxWidth: "18ch", textWrap: "balance" }}>{lang === "ar" ? "احجز استشارة إضاءة" : "Book a lighting consultation"}</h1>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "90px", marginTop: "80px", alignItems: "start" }}>
          <ContactForm />

          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, borderTop: "1px solid rgba(17,17,17,.16)" }}>
              <div style={{ padding: "26px 0", borderBottom: "1px solid rgba(17,17,17,.14)" }}>
                <div style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(17,17,17,.62)" }}>{lang === "ar" ? "العنوان" : "Address"}</div>
                <div style={{ font: "400 17px/1.6 var(--font-plex-sans),sans-serif", color: "#111111", marginTop: "12px" }}>
                  Exit 2, Northern Ring Branch Road, Hittin
                  <br />
                  Riyadh 13513, Kingdom of Saudi Arabia
                </div>
              </div>
              <div style={{ padding: "26px 0", borderBottom: "1px solid rgba(17,17,17,.14)" }}>
                <div style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(17,17,17,.62)" }}>{lang === "ar" ? "الهاتف" : "Phone"}</div>
                <a href="tel:+966114411131" style={{ display: "inline-block", font: "400 19px/1.4 var(--font-plex-sans),sans-serif", color: "#111111", marginTop: "12px" }}>
                  +966 11 441 1131
                </a>
              </div>
              <div style={{ padding: "26px 0", borderBottom: "1px solid rgba(17,17,17,.14)" }}>
                <div style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(17,17,17,.62)" }}>{lang === "ar" ? "البريد الإلكتروني" : "Email"}</div>
                <a href="mailto:info@arak-sa.com" style={{ display: "inline-block", font: "400 19px/1.4 var(--font-plex-sans),sans-serif", color: "#111111", marginTop: "12px" }}>
                  info@arak-sa.com
                </a>
              </div>
              <div style={{ padding: "26px 0", borderBottom: "1px solid rgba(17,17,17,.14)" }}>
                <div style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(17,17,17,.62)" }}>{lang === "ar" ? "الموقع" : "Web"}</div>
                <a href="https://www.arak-sa.com" style={{ display: "inline-block", font: "400 19px/1.4 var(--font-plex-sans),sans-serif", color: "#111111", marginTop: "12px" }}>
                  www.arak-sa.com
                </a>
              </div>
              <div style={{ padding: "26px 0" }}>
                <div style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(17,17,17,.62)" }}>{lang === "ar" ? "تابعنا" : "Social"}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "16px" }}>
                  <span style={{ font: "400 14px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.75)", border: "1px solid rgba(17,17,17,.16)", padding: "13px 16px" }}>@Araklighting</span>
                  <span style={{ font: "400 14px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.75)", border: "1px solid rgba(17,17,17,.16)", padding: "13px 16px" }}>araklighting</span>
                  <span style={{ font: "400 14px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.75)", border: "1px solid rgba(17,17,17,.16)", padding: "13px 16px" }}>Arak-sa</span>
                </div>
              </div>
            </div>
            <div style={{ height: "280px", marginTop: "34px" }}>
              <PhotoSlot src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1800&auto=format&fit=crop" alt="Map or showroom exterior (landscape, 1600×900)" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
