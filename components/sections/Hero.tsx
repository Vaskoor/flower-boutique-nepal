"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Truck,
  Clock,
  ShieldCheck,
  Flower2,
  Star,
} from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#fdf6f3",
        paddingTop: isMobile ? "60px" : "0",
        paddingBottom: isMobile ? "60px" : "0",
        minHeight: isMobile ? "auto" : "100dvh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ── Decorative soft glows ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            top: "-10%",
            right: "-5%",
            width: "600px",
            height: "600px",
            background: "rgba(218,121,138,0.05)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "-15%",
            left: "-10%",
            width: "500px",
            height: "500px",
            background: "rgba(253,239,242,0.6)",
            filter: "blur(80px)",
          }}
        />
        {/* Subtle dot pattern */}
        <div
          className="absolute hidden lg:block"
          style={{
            top: "15%",
            left: "4%",
            width: "120px",
            height: "120px",
            backgroundImage:
              "radial-gradient(circle, rgba(218,121,138,0.08) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div
        className="relative z-10 w-full"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile ? "0 16px" : "0 50px",
        }}
      >
        <div
          className="grid items-center"
          style={{
            gridTemplateColumns: isMobile
              ? "1fr"
              : "5fr 7fr",
            gap: isMobile ? "40px" : "60px",
            alignItems: "center",
          }}
        >
          {/* ══════════════════════════════════
              LEFT — Text Column
              ══════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            style={{
              textAlign: isMobile ? "center" : "left",
              paddingTop: isMobile ? "20px" : "40px",
              paddingBottom: isMobile ? "0" : "40px",
            }}
          >
            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="inline-flex items-center gap-2 mb-6"
              style={{
                backgroundColor:
                  "var(--COLOR-PRIMARY-FADE, rgba(218,121,138,0.05))",
                padding: "6px 16px",
                borderRadius: "var(--RADIUS, 300px)",
                border: "1px solid var(--COLOR-PRIMARY-FADE-HOVER, rgba(218,121,138,0.1))",
              }}
            >
              <span
                className="inline-block rounded-full"
                style={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: "var(--COLOR-PRIMARY, #da798a)",
                  animation: "heroPulse 2s infinite",
                }}
              />
              <span
                style={{
                  fontFamily:
                    "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--COLOR-PRIMARY, #da798a)",
                }}
              >
                {t("hero.tagline")}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease }}
              style={{
                fontFamily:
                  "var(--FONT-STACK-HEADING, var(--font-cardo), Cardo, serif)",
                fontWeight: 400,
                lineHeight: 1.05,
                color: "var(--COLOR-TEXT-DARK, #000000)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                marginBottom: "20px",
              }}
            >
              {t("hero.title")}{" "}
              <em
                style={{
                  color: "var(--COLOR-PRIMARY, #da798a)",
                  fontStyle: "italic",
                }}
              >
                {t("hero.titleHighlight")}
              </em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease }}
              style={{
                fontFamily:
                  "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
                fontSize: "16px",
                lineHeight: 1.8,
                color: "var(--COLOR-TEXT-LIGHT, #646464)",
                maxWidth: "440px",
                marginBottom: "32px",
                marginLeft: isMobile ? "auto" : "0",
                marginRight: isMobile ? "auto" : "0",
              }}
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease }}
              className="flex flex-wrap gap-3"
              style={{
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              <button
                onClick={() => router.push("/shop")}
                style={{
                  fontFamily:
                    "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                  fontSize: "var(--BTN-FONT-SIZE, 13px)",
                  fontWeight: "var(--BTN-FONT-WEIGHT, 500)",
                  letterSpacing: "var(--BTN-LETTER-SPACING, 0.1em)",
                  textTransform: "uppercase",
                  padding: "15px 36px",
                  borderRadius: "var(--RADIUS, 300px)",
                  backgroundColor:
                    "var(--BTN-PRIMARY-BG-COLOR, #e78596)",
                  color: "var(--BTN-PRIMARY-TEXT-COLOR, #ffffff)",
                  border: "2px solid var(--BTN-PRIMARY-BG-COLOR, #e78596)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--BTN-PRIMARY-BG-COLOR-BRIGHTER, #e37084)";
                  e.currentTarget.style.borderColor =
                    "var(--BTN-PRIMARY-BG-COLOR-BRIGHTER, #e37084)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 24px rgba(218,121,138,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--BTN-PRIMARY-BG-COLOR, #e78596)";
                  e.currentTarget.style.borderColor =
                    "var(--BTN-PRIMARY-BG-COLOR, #e78596)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {t("hero.shopNow")}
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() =>
                  router.push("/shop?category=festivals")
                }
                style={{
                  fontFamily:
                    "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                  fontSize: "var(--BTN-FONT-SIZE, 13px)",
                  fontWeight: "var(--BTN-FONT-WEIGHT, 500)",
                  letterSpacing: "var(--BTN-LETTER-SPACING, 0.1em)",
                  textTransform: "uppercase",
                  padding: "15px 36px",
                  borderRadius: "var(--RADIUS, 300px)",
                  backgroundColor: "transparent",
                  color: "var(--COLOR-TEXT, #212121)",
                  border: "2px solid var(--COLOR-TEXT, #212121)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--COLOR-TEXT, #212121)";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color =
                    "var(--COLOR-TEXT, #212121)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Flower2 className="w-4 h-4" />
                {t("hero.festivalCollection")}
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease }}
              className="flex flex-wrap gap-6 mt-10"
              style={{
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              {[
                { icon: Truck, label: t("hero.sameDay") },
                { icon: Clock, label: t("hero.orderBy") },
                { icon: ShieldCheck, label: t("hero.freshness") },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2"
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor:
                        "var(--COLOR-PRIMARY-FADE, rgba(218,121,138,0.05))",
                      color: "var(--COLOR-PRIMARY, #da798a)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      style={{ width: "14px", height: "14px" }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily:
                        "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
                      fontSize: "12px",
                      fontWeight: 500,
                      color:
                        "var(--COLOR-TEXT-LIGHT, #646464)",
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ══════════════════════════════════
              RIGHT — Asymmetric Image Grid
              ══════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="relative"
            style={{
              height: isMobile ? "420px" : "580px",
            }}
          >
            {/* ── Main large image (left) ── */}
            <div
              className="absolute overflow-hidden"
              style={{
                top: 0,
                left: 0,
                width: isMobile ? "100%" : "62%",
                height: isMobile ? "100%" : "100%",
                borderRadius: "20px",
                boxShadow:
                  "0 25px 60px rgba(218,121,138,0.12), 0 8px 24px rgba(0,0,0,0.05)",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=700&h=900&fit=crop"
                alt="Elegant pink rose bouquet"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                style={{ borderRadius: 0 }}
              />
            </div>

            {/* ── Top-right smaller image (overlapping) ── */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.35, ease }}
                className="absolute overflow-hidden"
                style={{
                  top: "0",
                  right: "0",
                  width: "44%",
                  height: "48%",
                  borderRadius: "20px",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.08)",
                  border: "4px solid #fdf6f3",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500&h=500&fit=crop"
                  alt="Luxury flower arrangement"
                  fill
                  className="object-cover"
                  priority
                  sizes="30vw"
                  style={{ borderRadius: 0 }}
                />
                {/* Floating label */}
                <div
                  className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    borderRadius: "var(--RADIUS, 300px)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <span style={{ fontSize: "12px" }}>✨</span>
                  <span
                    style={{
                      fontFamily:
                        "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color:
                        "var(--COLOR-PRIMARY, #da798a)",
                    }}
                  >
                    Premium
                  </span>
                </div>
              </motion.div>
            )}

            {/* ── Bottom-right small image (overlapping) ── */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease }}
                className="absolute overflow-hidden"
                style={{
                  bottom: "0",
                  right: "0",
                  width: "44%",
                  height: "48%",
                  borderRadius: "20px",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.08)",
                  border: "4px solid #fdf6f3",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=500&h=500&fit=crop"
                  alt="Mixed seasonal bouquet"
                  fill
                  className="object-cover"
                  priority
                  sizes="30vw"
                  style={{ borderRadius: 0 }}
                />
                {/* Bestseller badge */}
                <div
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    borderRadius: "var(--RADIUS, 300px)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <span style={{ fontSize: "12px" }}>🌸</span>
                  <span
                    style={{
                      fontFamily:
                        "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color:
                        "var(--COLOR-SALE-TEXT, #af7b88)",
                    }}
                  >
                    Bestseller
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
        style={{
          height: "80px",
          background:
            "linear-gradient(to top, #fdf6f3 0%, transparent 100%)",
        }}
      />

      {/* ── Keyframe ── */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<style>@keyframes heroPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.5)}}</style>`,
        }}
      />
    </section>
  );
}