"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flower2, Palette, Heart, Truck } from "lucide-react";
import { useTranslation } from "@/lib/useTranslation";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Steps() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const steps = [
    {
      icon: Flower2,
      title: "Choose Your Style",
      description:
        "Select from fresh blooms, premium artificial flowers, or our signature ribbon bouquets — perfect for Dashain, Tihar, weddings, and everyday gifting.",
    },
    {
      icon: Palette,
      title: "Customize Your Bouquet",
      description:
        "Pick the size, colours, wrapping, ribbon, and add-ons like chocolates, teddy bears, or a heartfelt greeting card.",
    },
    {
      icon: Heart,
      title: "We Prepare With Love",
      description:
        "Our expert florists hand-craft your arrangement using the freshest flowers or the finest artificial materials, ensuring every detail is perfect.",
    },
    {
      icon: Truck,
      title: "Delivered to Your Door",
      description:
        "Enjoy same-day delivery across Kathmandu Valley and next-day delivery to Pokhara, Biratnagar, Chitwan, and 11 other cities in Nepal.",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "#fffaf6",
        paddingTop: isMobile ? "50px" : "100px",
        paddingBottom: isMobile ? "50px" : "100px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile ? "0 16px" : "0 50px",
        }}
      >
        {/* ── Section Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-14 lg:mb-20"
        >
          <span
            className="inline-block mb-3"
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
            How It Works
          </span>
          <h2
            style={{
              fontFamily:
                "var(--FONT-STACK-HEADING, var(--font-cardo), Cardo, serif)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--COLOR-TEXT-DARK, #000000)",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              marginBottom: "16px",
            }}
          >
            Create Your Perfect Bouquet in{" "}
            <em
              style={{
                color: "var(--COLOR-PRIMARY, #da798a)",
                fontStyle: "italic",
              }}
            >
              4 Simple Steps
            </em>
          </h2>
          <p
            className="mx-auto"
            style={{
              fontFamily:
                "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
              fontSize: "16px",
              lineHeight: 1.75,
              color: "var(--COLOR-TEXT-LIGHT, #646464)",
              maxWidth: "580px",
            }}
          >
            From fresh roses to artificial silk flowers and elegant ribbon
            bouquets — we make it easy to craft a gift that speaks from the
            heart.
          </p>
        </motion.div>

        {/* ── Steps Grid ── */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(4, 1fr)",
            gap: isMobile ? "0" : "0",
          }}
        >
          {steps.map((step, index) => {
            const IconComp = step.icon;
            const isHovered = hoveredStep === index;
            const isLast = index === steps.length - 1;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease,
                }}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                className="relative"
                style={{
                  textAlign: "center",
                  padding: isMobile ? "28px 20px" : "0 20px",
                }}
              >
                {/* ── Connector line (desktop only, between steps) ── */}
                {!isLast && !isMobile && (
                  <div
                    className="absolute top-[40px] pointer-events-none"
                    style={{
                      left: "calc(50% + 36px)",
                      right: "calc(-50% + 36px)",
                      height: "1.5px",
                      background:
                        "linear-gradient(90deg, var(--COLOR-PRIMARY, #da798a) 0%, var(--COLOR-BORDER, #f0f0f0) 100%)",
                      opacity: isHovered ? 0.8 : 0.4,
                      transition: "opacity 0.4s ease",
                    }}
                  />
                )}

                {/* ── Vertical connector (mobile only) ── */}
                {!isLast && isMobile && (
                  <div
                    className="absolute left-1/2 pointer-events-none"
                    style={{
                      top: "calc(28px + 40px + 20px)",
                      bottom: "0",
                      width: "1.5px",
                      transform: "translateX(-50%)",
                      background:
                        "linear-gradient(to bottom, var(--COLOR-PRIMARY, #da798a) 0%, var(--COLOR-BORDER, #f0f0f0) 100%)",
                      opacity: 0.35,
                    }}
                  />
                )}

                {/* ── Step number circle ── */}
                <div
                  className="relative mx-auto mb-5"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: isHovered
                      ? "var(--COLOR-PRIMARY, #da798a)"
                      : "var(--COLOR-PRIMARY-FADE, rgba(218,121,138,0.05))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition:
                      "background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: isHovered
                      ? "scale(1.08)"
                      : "scale(1)",
                    boxShadow: isHovered
                      ? "0 8px 28px rgba(218,121,138,0.25)"
                      : "none",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <IconComp
                    style={{
                      width: "30px",
                      height: "30px",
                      color: isHovered
                        ? "#ffffff"
                        : "var(--COLOR-PRIMARY, #da798a)",
                      transition: "color 0.4s ease",
                      strokeWidth: 1.3,
                    }}
                  />

                  {/* Small step number badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-4px",
                      right: "-4px",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: isHovered
                        ? "#ffffff"
                        : "var(--COLOR-PRIMARY, #da798a)",
                      color: isHovered
                        ? "var(--COLOR-PRIMARY, #da798a)"
                        : "#ffffff",
                      fontFamily:
                        "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                      fontSize: "11px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                      transition:
                        "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* ── Title ── */}
                <h3
                  style={{
                    fontFamily:
                      "var(--FONT-STACK-HEADING, var(--font-cardo), Cardo, serif)",
                    fontSize: "20px",
                    fontWeight: 400,
                    lineHeight: 1.3,
                    color: "var(--COLOR-TEXT-DARK, #000000)",
                    marginBottom: "10px",
                    transition: "color 0.3s ease",
                  }}
                >
                  {step.title}
                </h3>

                {/* ── Description ── */}
                <p
                  style={{
                    fontFamily:
                      "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
                    fontSize: "14px",
                    lineHeight: 1.75,
                    color: "var(--COLOR-TEXT-LIGHT, #646464)",
                    maxWidth: isMobile ? "320px" : "260px",
                    margin: "0 auto",
                  }}
                >
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}