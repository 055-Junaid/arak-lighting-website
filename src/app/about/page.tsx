"use client";

import { useLang } from "@/lib/lang";
import { PhotoSlot } from "@/components/PhotoSlot";

export default function AboutPage() {
  const { lang } = useLang();

  return (
    <main>
      <section style={{ maxWidth: "1360px", margin: "0 auto", padding: "110px 48px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "34px" }}>
          <div style={{ width: "52px", height: "1px", background: "#111111" }}></div>
          <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "عن الشركة" : "About"}</span>
        </div>
        <h1 style={{ font: "600 clamp(40px,5.6vw,88px)/1.02 var(--font-sora),sans-serif", letterSpacing: "-0.035em", color: "#111111", margin: "0", maxWidth: "20ch", textWrap: "balance" }}>{lang === "ar" ? "حضور سعودي رائد في مجال الإضاءة" : "A pioneering Saudi presence in light"}</h1>
      </section>
      <section style={{ maxWidth: "1360px", margin: "0 auto", padding: "90px 48px 0" }}>
        <div style={{ height: "min(60vh,620px)" }}>
          <PhotoSlot src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1800&auto=format&fit=crop" alt="Office, showroom or team photograph (landscape, 2400×1200)" />
        </div>
      </section>
      <section style={{ maxWidth: "1360px", margin: "0 auto", padding: "110px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "80px", alignItems: "start" }}>
          <div>
            <h2 style={{ font: "500 13px/1.4 var(--font-plex-sans),sans-serif", letterSpacing: ".24em", textTransform: "uppercase", color: "#6E6E6B", margin: "0" }}>{lang === "ar" ? "كلمة المؤسس" : "Message from the Founder"}</h2>
          </div>
          <div>
            <p style={{ font: "300 clamp(19px,1.8vw,25px)/1.62 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.82)", margin: "0", maxWidth: "62ch" }}>
              With a long history and legacy of 40+ years, ARAK Lighting became a leading national company in the field of lighting. Throughout the years, with hard work and persistence, the company has positioned itself alongside the industry’s pioneering national companies, becoming a certified partner of several reputable international brands. Due to elevated knowledge and big love for lights, ARAK Lighting became an embodiment of the highest standards in the lighting industry that strives to keep climbing up the ladder of excellence, quality and a forever growing interest in all new light technologies.
            </p>
            <p style={{ font: "400 17px/1.75 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.62)", margin: "34px 0 0", maxWidth: "62ch" }}>
              Being a leading national company, ARAK Lighting keeps innovating internally and growing with its mission and values. The company keeps expanding its product portfolio in the field of lighting and lighting controls to continue offering the best customer experience solutions in line with the Kingdom’s 2030 vision.
            </p>
            <p style={{ font: "500 clamp(19px,1.7vw,24px)/1.5 var(--font-sora),sans-serif", color: "#111111", margin: "44px 0 0", maxWidth: "44ch", letterSpacing: "-0.015em" }}>
              Ease your mind with us and know that ARAK Lighting will forever be there to light your way!
            </p>
            <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid rgba(17,17,17,.16)", display: "inline-block" }}>
              <span style={{ font: "500 12px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(17,17,17,.7)" }}>
                Abdul Rahman Abdul Kader
              </span>
            </div>
          </div>
        </div>
      </section>
      <section style={{ borderTop: "1px solid rgba(17,17,17,.13)", background: "#F6F5F3" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "110px 48px", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", columnGap: "clamp(40px,5vw,100px)" }}>
          <div style={{ borderTop: "1px solid rgba(17,17,17,.18)", paddingTop: "34px" }}>
            <h2 style={{ font: "600 clamp(28px,3vw,42px)/1.1 var(--font-sora),sans-serif", letterSpacing: "-0.025em", color: "#111111", margin: "0" }}>{lang === "ar" ? "رؤيتنا" : "Our Vision"}</h2>
            <p style={{ font: "400 17px/1.75 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.64)", margin: "28px 0 0" }}>
              Is to become the leader in the Lighting Industry nationally and regionally — and the go-to Smart Lighting Solutions Provider in KSA. We, at ARAK, aim to expand to new markets and regions, through partnering with high-end international brands and constantly upgrading our services & diversifying our products.
            </p>
          </div>
          <div style={{ borderTop: "1px solid rgba(17,17,17,.18)", paddingTop: "34px" }}>
            <h2 style={{ font: "600 clamp(28px,3vw,42px)/1.1 var(--font-sora),sans-serif", letterSpacing: "-0.025em", color: "#111111", margin: "0" }}>{lang === "ar" ? "مهمتنا" : "Our Mission"}</h2>
            <p style={{ font: "400 17px/1.75 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.64)", margin: "28px 0 0" }}>
              Is to always offer state-of-the-art products and service in compliance with the highest of international standards. We aim to continuously deliver cutting-edge products and services, consistently adhering to the most stringent global benchmarks. Our unwavering dedication to upholding the highest international standards remains at the core of our commitment to excellence.
            </p>
          </div>
        </div>
      </section>
      <section style={{ borderTop: "1px solid rgba(17,17,17,.13)" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "110px 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "30px" }}>
            <div style={{ width: "34px", height: "1px", background: "#111111" }}></div>
            <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "قيمنا" : "Our values"}</span>
          </div>
          <h2 style={{ font: "600 clamp(32px,4vw,58px)/1.06 var(--font-sora),sans-serif", letterSpacing: "-0.03em", color: "#111111", margin: "0 0 74px" }}>{lang === "ar" ? "لماذا أراك؟" : "Why ARAK?"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "64px 80px" }}>
            <div style={{ borderTop: "1px solid rgba(17,17,17,.16)", paddingTop: "28px" }}>
              <h3 style={{ font: "500 24px/1.25 var(--font-sora),sans-serif", color: "#111111", margin: "0", letterSpacing: "-0.015em" }}>{lang === "ar" ? "الشفافية" : "Transparency"}</h3>
              <p style={{ font: "400 16px/1.72 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "18px 0 0" }}>
                We strive to always work with the best quality providers in the market. And because transparency is one of our assets at ARAK, we put great effort into showcasing all features of our products and breaking down all processes of our services so our esteemed clients would rest assured they are in great hands.
              </p>
            </div>
            <div style={{ borderTop: "1px solid rgba(17,17,17,.16)", paddingTop: "28px" }}>
              <h3 style={{ font: "500 24px/1.25 var(--font-sora),sans-serif", color: "#111111", margin: "0", letterSpacing: "-0.015em" }}>{lang === "ar" ? "الإبداع" : "Creativity"}</h3>
              <p style={{ font: "400 16px/1.72 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "18px 0 0" }}>
                Because even the most successful recipe for greatness can’t be complete without a dash of creativity and a load of passion. Simply put, we see our work as the craftsmanship that requires exquisite attention to detail, beauty, and efficiency.
              </p>
            </div>
            <div style={{ borderTop: "1px solid rgba(17,17,17,.16)", paddingTop: "28px" }}>
              <h3 style={{ font: "500 24px/1.25 var(--font-sora),sans-serif", color: "#111111", margin: "0", letterSpacing: "-0.015em" }}>{lang === "ar" ? "التمكين" : "Empowerment"}</h3>
              <p style={{ font: "400 16px/1.72 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "18px 0 0" }}>
                We, at ARAK, believe in the limitless potential of our employees. And since we are always keen on reinforcing our 45+ years of hands-on expertise, we regularly encourage them to tap into that potential through engaging them in seminars, fostering personal and professional growth.
              </p>
            </div>
            <div style={{ borderTop: "1px solid rgba(17,17,17,.16)", paddingTop: "28px" }}>
              <h3 style={{ font: "500 24px/1.25 var(--font-sora),sans-serif", color: "#111111", margin: "0", letterSpacing: "-0.015em" }}>{lang === "ar" ? "الجودة" : "Quality"}</h3>
              <p style={{ font: "400 16px/1.72 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "18px 0 0" }}>
                We provide nothing but the best products offered worldwide and nothing but the best pre-sale and post-sale services. Our commitment to excellence extends beyond just products and services; it permeates every aspect of our customer experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section style={{ borderTop: "1px solid rgba(17,17,17,.13)", background: "#F6F5F3" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "110px 48px", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "80px", alignItems: "center" }}>
          <div>
            <h2 style={{ font: "600 clamp(28px,3vw,44px)/1.1 var(--font-sora),sans-serif", letterSpacing: "-0.025em", color: "#111111", margin: "0" }}>{lang === "ar" ? "رعاية الموظفين" : "Good care of employees"}</h2>
            <p style={{ font: "400 17px/1.75 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.64)", margin: "28px 0 0" }}>
              We, at ARAK, has always taken good care of our employees by helping them obtain the best skills through workshops and assessments and providing them with high-level courses to help them extend their knowledge and thus providing the best and most appropriate services to each and every client.
            </p>
            <p style={{ font: "400 17px/1.75 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.64)", margin: "24px 0 0" }}>
              Hard work and effort had always been recognizable by the company — the reason why the workplace environment is professional and friendly, and why everyone has a special role in achieving the goals of the company.
            </p>
          </div>
          <div style={{ height: "520px" }}>
            <PhotoSlot src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1800&auto=format&fit=crop" alt="Team at work / warehouse / site (portrait, 1200×1500)" />
          </div>
        </div>
      </section>

    </main>
  );
}
