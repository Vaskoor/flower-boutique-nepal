"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flower2, Sparkles, Crown } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const bouquets = [
  {
    level: "Classic",
    title: "Hand-tied seasonal bouquets for everyday moments",
    description:
      "Beautifully arranged with locally sourced blooms from Ilam and Dhading. Perfect for birthdays, thank-yous, or just because.",
    cta: "Shop Classic",
    link: "/shop?category=classic-bouquets",
    image:
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=500&h=600&fit=crop",
    priceFrom: "NPR 850",
    accentColor: "var(--COLOR-PRIMARY-LIGHT, #fdeff2)",
    icon: Flower2,
  },
  {
    level: "Premium",
    title: "Luxury arrangements for the ones who matter most",
    description:
      "Curated with imported roses, orchids, and lilies. Ideal for anniversaries, proposals, and making a lasting impression.",
    cta: "Shop Premium",
    link: "/shop?category=premium-bouquets",
    image:
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500&h=600&fit=crop",
    priceFrom: "NPR 2,500",
    accentColor: "var(--COLOR-PRIMARY-FADE-HOVER, rgba(218,121,138,0.1))",
    icon: Sparkles,
  },
  {
    level: "Signature",
    title: "Bespoke creations by our master florists",
    description:
      "One-of-a-kind designs for weddings, corporate events, and grand celebrations. Consultation included with every order.",
    cta: "Shop Signature",
    link: "/shop?category=signature-bouquets",
    image:
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=500&h=600&fit=crop",
    priceFrom: "NPR 5,000",
    accentColor: "var(--COLOR-PRIMARY-FADE, rgba(218,121,138,0.05))",
    icon: Crown,
  },
];

export default function BouquetSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
        paddingTop: isMobile ? "50px" : "75px",
        paddingBottom: isMobile ? "50px" : "75px",
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
          className="text-center mb-14"
        >
          <span
            className="inline-block mb-3"
            style={{
              fontFamily:
                "var(--BTN-FONT-STACK, 'DM Sans', sans-serif)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--COLOR-PRIMARY, #da798a)",
            }}
          >
            Our Bouquet Collections
          </span>
          <h2
            style={{
              fontFamily:
                "var(--FONT-STACK-HEADING, Cardo, serif)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--COLOR-TEXT-DARK, #000000)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              marginBottom: "16px",
            }}
          >
            Something Beautiful for
            <br />
            <em
              style={{
                color: "var(--COLOR-PRIMARY, #da798a)",
                fontStyle: "italic",
              }}
            >
              Every Occasion
            </em>
          </h2>
          <p
            className="mx-auto"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "16px",
              lineHeight: 1.75,
              color: "var(--COLOR-TEXT-LIGHT, #646464)",
              maxWidth: "520px",
            }}
          >
            From simple hand-ties to grand statement pieces — crafted fresh
            daily and delivered across Nepal
          </p>
        </motion.div>

        {/* ── Bouquet Cards ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {bouquets.map((bouquet, index) => {
            const IconComp = bouquet.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={bouquet.level}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease,
                }}
                className="group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link href={bouquet.link} className="block">
                  <div
                    className="relative overflow-hidden"
                    style={{
                      borderRadius: "20px",
                      backgroundColor: bouquet.accentColor,
                      border: isHovered
                        ? "1px solid var(--COLOR-PRIMARY, #da798a)"
                        : "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
                      transform: isHovered
                        ? "translateY(-6px)"
                        : "translateY(0)",
                      boxShadow: isHovered
                        ? "0 16px 48px rgba(218,121,138,0.12), 0 4px 12px rgba(0,0,0,0.04)"
                        : "none",
                      transition:
                        "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.3s ease",
                    }}
                  >
                    {/* ── Image Area ── */}
                    <div
                      className="relative overflow-hidden"
                      style={{
                        aspectRatio: "5 / 4",
                        borderBottom:
                          "1px solid var(--COLOR-BORDER-HAIRLINE, #f7f7f7)",
                      }}
                    >
                      <Image
                        src={bouquet.image}
                        alt={bouquet.level + " bouquet"}
                        fill
                        className="object-cover"
                        style={{
                          borderRadius: 0,
                          transform: isHovered
                            ? "scale(1.06)"
                            : "scale(1)",
                          transition:
                            "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />

                      {/* Level badge — top left */}
                      <div
                        className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.92)",
                          backdropFilter: "blur(8px)",
                          WebkitBackdropFilter: "blur(8px)",
                          borderRadius: "var(--RADIUS, 300px)",
                          border: "1px solid rgba(255,255,255,0.6)",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                        }}
                      >
                        <IconComp
                          className="w-3.5 h-3.5"
                          style={{
                            color:
                              "var(--COLOR-PRIMARY, #da798a)",
                          }}
                        />
                        <span
                          style={{
                            fontFamily:
                              "var(--BTN-FONT-STACK, 'DM Sans', sans-serif)",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color:
                              "var(--COLOR-PRIMARY, #da798a)",
                          }}
                        >
                          {bouquet.level}
                        </span>
                      </div>

                      {/* Price badge — top right */}
                      <div
                        className="absolute top-4 right-4 px-3 py-1.5"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.92)",
                          backdropFilter: "blur(8px)",
                          WebkitBackdropFilter: "blur(8px)",
                          borderRadius: "var(--RADIUS, 300px)",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily:
                              "var(--BTN-FONT-STACK, 'DM Sans', sans-serif)",
                            fontSize: "11px",
                            fontWeight: 600,
                            color:
                              "var(--COLOR-TEXT-LIGHT, #646464)",
                          }}
                        >
                          From{" "}
                          <span
                            style={{
                              fontWeight: 700,
                              color:
                                "var(--COLOR-TEXT-DARK, #000000)",
                            }}
                          >
                            {bouquet.priceFrom}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* ── Content Area ── */}
                    <div
                      className="p-6 sm:p-7"
                      style={{
                        borderBottom:
                          "1px solid var(--COLOR-BORDER-HAIRLINE, #f7f7f7)",
                      }}
                    >
                      <h3
                        className="mb-2"
                        style={{
                          fontFamily:
                            "var(--FONT-STACK-HEADING, Cardo, serif)",
                          fontSize: "22px",
                          fontWeight: 400,
                          lineHeight: 1.25,
                          color:
                            "var(--COLOR-TEXT-DARK, #000000)",
                        }}
                      >
                        {bouquet.title}
                      </h3>
                      <p
                        style={{
                          fontFamily:
                            "'Plus Jakarta Sans', sans-serif",
                          fontSize: "14px",
                          lineHeight: 1.7,
                          color:
                            "var(--COLOR-TEXT-LIGHT, #646464)",
                        }}
                      >
                        {bouquet.description}
                      </p>
                    </div>

                    {/* ── CTA Area ── */}
                    <div className="p-5 sm:p-6 pt-0">
                      <span
                        className="inline-flex items-center justify-center w-full gap-2"
                        style={{
                          fontFamily:
                            "var(--BTN-FONT-STACK, 'DM Sans', sans-serif)",
                          fontSize:
                            "var(--BTN-FONT-SIZE, 13px)",
                          fontWeight:
                            "var(--BTN-FONT-WEIGHT, 500)",
                          letterSpacing:
                            "var(--BTN-LETTER-SPACING, 0.1em)",
                          textTransform: "uppercase",
                          padding: "13px 24px",
                          borderRadius:
                            "var(--RADIUS, 300px)",
                          backgroundColor: isHovered
                            ? "var(--COLOR-TEXT, #212121)"
                            : "#ffffff",
                          color: isHovered
                            ? "#ffffff"
                            : "var(--COLOR-TEXT, #212121)",
                          border:
                            "2px solid var(--COLOR-TEXT, #212121)",
                          transition:
                            "background-color 0.3s ease, color 0.3s ease",
                        }}
                      >
                        {bouquet.cta}
                        <ArrowRight
                          className="w-3.5 h-3.5"
                          style={{
                            transform: isHovered
                              ? "translateX(3px)"
                              : "translateX(0)",
                            transition:
                              "transform 0.3s ease",
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="text-center mt-12"
        >
          <p
            className="mb-5"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "15px",
              color: "var(--COLOR-TEXT-LIGHT, #646464)",
            }}
          >
            Not sure which to pick?{" "}
            <Link
              href="/contact"
              style={{
                color: "var(--COLOR-PRIMARY, #da798a)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Talk to our florist
            </Link>{" "}
            for a free consultation
          </p>
          <Link href="/shop" className="inline-block">
            <span
              className="inline-flex items-center gap-2"
              style={{
                fontFamily:
                  "var(--BTN-FONT-STACK, 'DM Sans', sans-serif)",
                fontSize: "var(--BTN-FONT-SIZE, 13px)",
                fontWeight: "var(--BTN-FONT-WEIGHT, 500)",
                letterSpacing: "var(--BTN-LETTER-SPACING, 0.1em)",
                textTransform: "uppercase",
                padding: "14px 36px",
                borderRadius: "var(--RADIUS, 300px)",
                backgroundColor:
                  "var(--BTN-PRIMARY-BG-COLOR, #e78596)",
                color: "var(--BTN-PRIMARY-TEXT-COLOR, #ffffff)",
                border: `2px solid var(--BTN-PRIMARY-BG-COLOR, #e78596)`,
                transition:
                  "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--BTN-PRIMARY-BG-COLOR-BRIGHTER, #e37084)";
                e.currentTarget.style.borderColor =
                  "var(--BTN-PRIMARY-BG-COLOR-BRIGHTER, #e37084)";
                e.currentTarget.style.transform =
                  "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(218,121,138,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--BTN-PRIMARY-BG-COLOR, #e78596)";
                e.currentTarget.style.borderColor =
                  "var(--BTN-PRIMARY-BG-COLOR, #e78596)";
                e.currentTarget.style.transform =
                  "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              View All Bouquets
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}