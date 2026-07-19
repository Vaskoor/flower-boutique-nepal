"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Package, ArrowRight, Sparkles, Flower2, Gift } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const boxOptions = [
  { icon: Flower2, label: "Pick Your Flowers" },
  { icon: Sparkles, label: "Choose Add-ons" },
  { icon: Gift, label: "Add a Message" },
];

export default function CustomBox() {
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
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative overflow-hidden"
          style={{
            borderRadius: "24px",
            backgroundColor: "#fffaf6",
            border: "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
            transition:
              "border-color 0.4s ease, box-shadow 0.5s ease",
            borderColor: hovered
              ? "var(--COLOR-PRIMARY, #da798a)"
              : "var(--COLOR-BORDER, rgb(240,240,240))",
            boxShadow: hovered
              ? "0 20px 60px rgba(218,121,138,0.1), 0 4px 12px rgba(0,0,0,0.03)"
              : "0 2px 10px rgba(0,0,0,0.03)",
          }}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ minHeight: isMobile ? "auto" : "420px" }}
          >
            {/* ── Left: Visual side ── */}
            <div
              className="relative overflow-hidden"
              style={{
                minHeight: isMobile ? "240px" : "100%",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=700&h=500&fit=crop"
                alt="Custom flower box"
                fill
                className="object-cover"
                style={{
                  borderRadius: 0,
                  transform: hovered
                    ? "scale(1.04)"
                    : "scale(1)",
                  transition:
                    "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Gradient overlay on image */}
              <div
                className="absolute inset-0 md:hidden"
                style={{
                  background:
                    "linear-gradient(to top, rgba(255,250,246,0.95) 0%, rgba(255,250,246,0.4) 50%, transparent 100%)",
                }}
              />

              {/* Floating badge on image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease,
                }}
                className="absolute top-5 left-5 z-10"
              >
                <div
                  className="flex items-center gap-2 px-4 py-2"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    borderRadius: "var(--RADIUS, 300px)",
                    border: "1px solid rgba(255,255,255,0.5)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                  }}
                >
                  <Package
                    style={{
                      width: "14px",
                      height: "14px",
                      color: "var(--COLOR-PRIMARY, #da798a)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily:
                        "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--COLOR-PRIMARY, #da798a)",
                    }}
                  >
                    Custom Builder
                  </span>
                </div>
              </motion.div>
            </div>

            {/* ── Right: Content side ── */}
            <div
              className="relative z-10 flex flex-col justify-center"
              style={{
                padding: isMobile
                  ? "0 24px 32px"
                  : "48px 56px",
              }}
            >
              {/* Overline */}
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.15,
                  ease,
                }}
                className="inline-block mb-4"
                style={{
                  fontFamily:
                    "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--COLOR-PRIMARY, #da798a)",
                }}
              >
                Make It Personal
              </motion.span>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease,
                }}
                style={{
                  fontFamily:
                    "var(--FONT-STACK-HEADING, var(--font-cardo), Cardo, serif)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  color: "var(--COLOR-TEXT-DARK, #000000)",
                  fontSize: isMobile
                    ? "clamp(24px, 6vw, 30px)"
                    : "clamp(28px, 3vw, 38px)",
                  marginBottom: "14px",
                }}
              >
                Build Your Own{" "}
                <em
                  style={{
                    color: "var(--COLOR-PRIMARY, #da798a)",
                    fontStyle: "italic",
                  }}
                >
                  Gift Box
                </em>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.25,
                  ease,
                }}
                style={{
                  fontFamily:
                    "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
                  fontSize: "15px",
                  lineHeight: 1.75,
                  color: "var(--COLOR-TEXT-LIGHT, #646464)",
                  maxWidth: "420px",
                  marginBottom: "28px",
                }}
              >
                Choose from roses, lilies, carnations, orchids and more.
                Add chocolates, a teddy bear, or a handwritten card —
                we&apos;ll arrange it all in a beautiful luxury box.
              </motion.p>

              {/* Mini steps */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  ease,
                }}
                className="flex flex-wrap gap-4 mb-8"
              >
                {boxOptions.map((step, i) => {
                  const StepIcon = step.icon;
                  return (
                    <div
                      key={step.label}
                      className="flex items-center gap-2"
                    >
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          backgroundColor:
                            "var(--COLOR-PRIMARY-FADE, rgba(218,121,138,0.05))",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <StepIcon
                          style={{
                            width: "13px",
                            height: "13px",
                            color:
                              "var(--COLOR-PRIMARY, #da798a)",
                            strokeWidth: 1.5,
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontFamily:
                            "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
                          fontSize: "13px",
                          fontWeight: 500,
                          color:
                            "var(--COLOR-TEXT, #212121)",
                        }}
                      >
                        {step.label}
                      </span>
                      {i < boxOptions.length - 1 && (
                        <span
                          style={{
                            color: "var(--COLOR-BORDER-DARK, #bdbdbd)",
                            fontSize: "12px",
                          }}
                        >
                          →
                        </span>
                      )}
                    </div>
                  );
                })}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.35,
                  ease,
                }}
              >
                <Link href="/customize" className="inline-block">
                  <span
                    className="inline-flex items-center gap-2"
                    style={{
                      fontFamily:
                        "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                      fontSize:
                        "var(--BTN-FONT-SIZE, 13px)",
                      fontWeight:
                        "var(--BTN-FONT-WEIGHT, 500)",
                      letterSpacing:
                        "var(--BTN-LETTER-SPACING, 0.1em)",
                      textTransform: "uppercase",
                      padding: "15px 36px",
                      borderRadius:
                        "var(--RADIUS, 300px)",
                      backgroundColor: hovered
                        ? "var(--BTN-PRIMARY-BG-COLOR-BRIGHTER, #e37084)"
                        : "var(--BTN-PRIMARY-BG-COLOR, #e78596)",
                      color: "var(--BTN-PRIMARY-TEXT-COLOR, #ffffff)",
                      border: `2px solid var(--BTN-PRIMARY-BG-COLOR, #e78596)`,
                      transition:
                        "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                      transform: hovered
                        ? "translateY(-2px)"
                        : "translateY(0)",
                      boxShadow: hovered
                        ? "0 6px 24px rgba(218,121,138,0.35)"
                        : "none",
                    }}
                  >
                    Start Customizing
                    <ArrowRight
                      className="w-4 h-4"
                      style={{
                        transform: hovered
                          ? "translateX(3px)"
                          : "translateX(0)",
                        transition:
                          "transform 0.3s ease",
                      }}
                    />
                  </span>
                </Link>
              </motion.div>

              {/* Price hint */}
              <p
                className="mt-4"
                style={{
                  fontFamily:
                    "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
                  fontSize: "12px",
                  color:
                    "var(--COLOR-FOOTER-TEXT-A35, rgba(33,33,33,0.35))",
                }}
              >
                Starting from NPR 1,200 · Free box with 5+ items
              </p>
            </div>
          </div>

          {/* ── Decorative corner accent ── */}
          <div
            className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 100% 0%, var(--COLOR-PRIMARY-FADE-HOVER, rgba(218,121,138,0.1)) 0%, transparent 70%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}