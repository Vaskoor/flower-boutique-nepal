"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function PromoBanner() {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      style={{
        backgroundColor: "var(--COLOR-BG, #ffffff)",
        paddingTop: isMobile ? "40px" : "60px",
        paddingBottom: isMobile ? "40px" : "60px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile ? "0 16px" : "0 50px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative overflow-hidden"
          style={{
            borderRadius: "20px",
            minHeight: isMobile ? "auto" : "220px",
          }}
        >
          {/* ── Background image with overlay ── */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1563241527-3004b7be0ee9?w=1200&h=400&fit=crop"
              alt="Festival flowers"
              fill
              className="object-cover"
              style={{
                borderRadius: 0,
                transform: hovered ? "scale(1.03)" : "scale(1)",
                transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                filter: "brightness(0.85)",
              }}
              sizes="(max-width: 1400px) 100vw, 1400px"
            />
            {/* Gradient overlay — warm pink tones matching theme */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(218,121,138,0.92) 0%, rgba(211,112,131,0.88) 40%, rgba(199,95,115,0.82) 100%)",
              }}
            />
            {/* Soft texture overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.12) 0%, transparent 60%)",
              }}
            />
          </div>

          {/* ── Decorative floating elements ── */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: "rgba(255,255,255,0.06)",
              filter: "blur(40px)",
              transform: "translate(30%, -40%)",
            }}
          />
          <div
            className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: "rgba(255,255,255,0.04)",
              filter: "blur(30px)",
              transform: "translate(-20%, 40%)",
            }}
          />

          {/* ── Content ── */}
          <div
            className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{
              padding: isMobile ? "32px 24px" : "48px 56px",
            }}
          >
            {/* Left — Text */}
            <div
              className="flex-1"
              style={{
                textAlign: isMobile ? "center" : "left",
              }}
            >
              {/* Tag */}
              <div
                className="inline-flex items-center gap-2 mb-4"
                style={{
                  backgroundColor: "rgba(255,255,255,0.18)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  padding: "5px 14px",
                  borderRadius: "var(--RADIUS, 300px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <Sparkles
                  className="w-3.5 h-3.5"
                  style={{ color: "#ffffff" }}
                />
                <span
                  style={{
                    fontFamily:
                      "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#ffffff",
                  }}
                >
                  Festival Special
                </span>
              </div>

              {/* Heading */}
              <h2
                style={{
                  fontFamily:
                    "var(--FONT-STACK-HEADING, var(--font-cardo), Cardo, serif)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  color: "#ffffff",
                  fontSize: isMobile
                    ? "clamp(24px, 6vw, 32px)"
                    : "clamp(28px, 3vw, 40px)",
                  marginBottom: "10px",
                }}
              >
                Dashain & Tihar{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    opacity: 0.92,
                  }}
                >
                  Collections
                </em>
              </h2>

              {/* Description */}
              <p
                style={{
                  fontFamily:
                    "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
                  fontSize: isMobile ? "14px" : "16px",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.88)",
                  maxWidth: "480px",
                  margin: isMobile ? "0 auto" : "0",
                }}
              >
                Traditional marigold garlands, makhamali malas, and
                godawari flower sets — handcrafted for Nepal&apos;s
                biggest celebrations
              </p>
            </div>

            {/* Right — CTA Button */}
            <div
              className="shrink-0"
              style={{
                width: isMobile ? "100%" : "auto",
              }}
            >
              <Link href="/shop?category=festivals" className="block">
                <span
                  className="inline-flex items-center justify-center gap-2"
                  style={{
                    fontFamily:
                      "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                    fontSize: "var(--BTN-FONT-SIZE, 13px)",
                    fontWeight: "var(--BTN-FONT-WEIGHT, 500)",
                    letterSpacing: "var(--BTN-LETTER-SPACING, 0.1em)",
                    textTransform: "uppercase",
                    padding: "15px 36px",
                    borderRadius: "var(--RADIUS, 300px)",
                    backgroundColor: hovered
                      ? "rgba(255,255,255,0.95)"
                      : "#ffffff",
                    color: "var(--COLOR-PRIMARY, #da798a)",
                    border: "2px solid #ffffff",
                    width: isMobile ? "100%" : "auto",
                    transition:
                      "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: hovered
                      ? "translateY(-2px)"
                      : "translateY(0)",
                    boxShadow: hovered
                      ? "0 8px 28px rgba(0,0,0,0.15)"
                      : "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  Shop Festivals
                  <ArrowRight
                    className="w-4 h-4"
                    style={{
                      transform: hovered
                        ? "translateX(3px)"
                        : "translateX(0)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </span>
              </Link>

              {/* Sub-text under button (desktop only) */}
              {!isMobile && (
                <p
                  className="text-center mt-3"
                  style={{
                    fontFamily:
                      "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  Free delivery on orders above NPR 1,500
                </p>
              )}
            </div>
          </div>

          {/* ── Bottom accent line ── */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[3px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
              opacity: hovered ? 1 : 0.5,
              transition: "opacity 0.4s ease",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}