"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Clock, ArrowRight, Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { blogPosts } from "@/lib/data";
import { useTranslation } from "@/lib/useTranslation";

const ease = [0.16, 1, 0.3, 1] as const;

export default function BlogPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const featured = blogPosts.find((p) => p.featured);
  const others = blogPosts.filter((p) => !p.featured);

  const filtered = searchQuery.trim()
    ? others.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : others;

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--COLOR-BG, #ffffff)",
      }}
    >
      <Navbar />

      {/* ══════════════════════════════════
          PAGE HEADER
          ══════════════════════════════════ */}
      <div
        style={{
          backgroundColor: "var(--COLOR-BG, #ffffff)",
          borderBottom: "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
          paddingTop: isMobile ? "100px" : "120px",
          paddingBottom: "40px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: isMobile ? "0 16px" : "0 50px",
            textAlign: "center",
          }}
        >
          {/* Breadcrumb */}
          <div
            className="flex items-center justify-center gap-2 mb-5"
            style={{
              fontFamily:
                "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
              fontSize: "12px",
              color: "var(--COLOR-TEXT-LIGHT, #646464)",
            }}
          >
            <a
              href="/"
              style={{
                color: "var(--COLOR-TEXT-LIGHT, #646464)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color =
                  "var(--COLOR-PRIMARY, #da798a)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  "var(--COLOR-TEXT-LIGHT, #646464)";
              }}
            >
              Home
            </a>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: "var(--COLOR-TEXT, #212121)" }}>
              Blog
            </span>
          </div>

          {/* Heading */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
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
            Our Journal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            style={{
              fontFamily:
                "var(--FONT-STACK-HEADING, var(--font-cardo), Cardo, serif)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--COLOR-TEXT-DARK, #000000)",
              fontSize: isMobile
                ? "clamp(28px, 6vw, 36px)"
                : "clamp(32px, 4vw, 48px)",
              marginBottom: "16px",
            }}
          >
            Stories & Inspiration from the{" "}
            <em
              style={{
                color: "var(--COLOR-PRIMARY, #da798a)",
                fontStyle: "italic",
              }}
            >
              World of Flowers
            </em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="mx-auto"
            style={{
              fontFamily:
                "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
              fontSize: "16px",
              lineHeight: 1.75,
              color: "var(--COLOR-TEXT-LIGHT, #646464)",
              maxWidth: "520px",
              marginBottom: "36px",
            }}
          >
            Flower care tips, gifting guides, festival inspirations,
            and behind-the-scenes stories from our Nepali florists
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mx-auto"
            style={{
              position: "relative",
              maxWidth: "440px",
              width: "100%",
            }}
          >
            <Search
              style={{
                position: "absolute",
                left: "18px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "17px",
                height: "17px",
                color: "var(--COLOR-TEXT-LIGHT, #646464)",
                pointerEvents: "none",
              }}
            />
            <input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 44px 14px 48px",
                border: "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
                borderRadius: "var(--RADIUS, 300px)",
                fontFamily:
                  "var(--FONT-STACK-BODY, var(--font-libre-franklin), 'Libre Franklin', sans-serif)",
                fontSize: "15px",
                fontWeight: 300,
                color: "var(--COLOR-TEXT, #212121)",
                backgroundColor: "transparent",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor =
                  "var(--COLOR-PRIMARY, #da798a)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor =
                  "var(--COLOR-BORDER, rgb(240,240,240))";
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════
          FEATURED POST
          ══════════════════════════════════ */}
      {featured && (
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: isMobile
              ? "32px 16px 0"
              : "48px 50px 0",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <Link
              href={`/blog/${featured.slug}`}
              className="group block"
              style={{ textDecoration: "none" }}
            >
              <div
                className="grid"
                style={{
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : "1.1fr 1fr",
                  gap: isMobile ? "0" : "0",
                  borderRadius: "20px",
                  overflow: "hidden",
                  backgroundColor: "#ffffff",
                  border: "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
                  boxShadow:
                    "0 2px 10px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02)",
                  transition:
                    "box-shadow 0.4s ease, border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 16px 48px rgba(218,121,138,0.1), 0 4px 12px rgba(0,0,0,0.04)";
                  e.currentTarget.style.borderColor =
                    "var(--COLOR-PRIMARY, #da798a)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 10px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02)";
                  e.currentTarget.style.borderColor =
                    "var(--COLOR-BORDER, rgb(240,240,240))";
                }}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: isMobile
                      ? "16 / 10"
                      : "auto",
                    minHeight: isMobile
                      ? "220px"
                      : "420px",
                  }}
                >
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes={
                      isMobile
                        ? "100vw"
                        : "50vw"
                    }
                    style={{
                      borderRadius: 0,
                      transition:
                        "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to right, transparent 60%, rgba(255,255,255,0.3) 100%)",
                    }}
                  />
                </div>

                {/* Content */}
                <div
                  style={{
                    padding: isMobile
                      ? "28px 24px"
                      : "48px 48px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {/* Category badge */}
                  <span
                    style={{
                      fontFamily:
                        "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--COLOR-SALE-TEXT, #af7b88)",
                      backgroundColor:
                        "var(--COLOR-SALE-BG, #f9dee5)",
                      padding: "5px 14px",
                      borderRadius:
                        "var(--RADIUS, 300px)",
                      display: "inline-block",
                      width: "fit-content",
                      marginBottom: "20px",
                    }}
                  >
                    {featured.category}
                  </span>

                  {/* Title */}
                  <h2
                    style={{
                      fontFamily:
                        "var(--FONT-STACK-HEADING, var(--font-cardo), Cardo, serif)",
                      fontWeight: 400,
                      lineHeight: 1.2,
                      color:
                        "var(--COLOR-TEXT-DARK, #000000)",
                      fontSize: isMobile
                        ? "24px"
                        : "clamp(26px, 2.5vw, 34px)",
                      marginBottom: "16px",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {featured.title}
                  </h2>

                  {/* Excerpt */}
                  <p
                    style={{
                      fontFamily:
                        "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
                      fontSize: "15px",
                      lineHeight: 1.8,
                      color:
                        "var(--COLOR-TEXT-LIGHT, #646464)",
                      marginBottom: "28px",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {featured.excerpt}
                  </p>

                  {/* Meta row */}
                  <div
                    className="flex items-center gap-5"
                    style={{
                      fontFamily:
                        "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
                      fontSize: "13px",
                      color:
                        "var(--COLOR-TEXT-LIGHT, #646464)",
                    }}
                  >
                    <span
                      className="flex items-center gap-2"
                      style={{ fontWeight: 500 }}
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
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12px",
                            lineHeight: 1,
                          }}
                        >
                          ✍️
                        </span>
                      </div>
                      {featured.author}
                    </span>
                    <span
                      className="flex items-center gap-1.5"
                      style={{ opacity: 0.7 }}
                    >
                      <Calendar
                        style={{
                          width: "13px",
                          height: "13px",
                        }}
                      />
                      {featured.date || "Dec 2024"}
                    </span>
                    <span
                      className="flex items-center gap-1.5"
                      style={{ opacity: 0.7 }}
                    >
                      <Clock
                        style={{
                          width: "13px",
                          height: "13px",
                        }}
                      />
                      {featured.readTime}
                    </span>
                  </div>

                  {/* Read more */}
                  <div
                    className="flex items-center gap-2 mt-6"
                    style={{
                      opacity: 0,
                      transform: "translateY(8px)",
                      transition:
                        "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s",
                    }}
                  >
                    <span
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
                        color:
                          "var(--COLOR-PRIMARY, #da798a)",
                      }}
                    >
                      Read Article
                    </span>
                    <ArrowRight
                      style={{
                        width: "15px",
                        height: "15px",
                        color:
                          "var(--COLOR-PRIMARY, #da798a)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Hover effect for featured card */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                .group:hover img {
                  transform: scale(1.04) !important;
                }
                .group:hover > div > div:last-child > div:last-child {
                  opacity: 1 !important;
                  transform: translateY(0) !important;
                }
              `,
            }}
          />
        </div>
      )}

      {/* ══════════════════════════════════
          POST GRID
          ══════════════════════════════════ */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile
            ? "32px 16px 80px"
            : "56px 50px 100px",
        }}
      >
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-12"
        >
          <span
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
            Latest Articles
          </span>
        </motion.div>

        {/* Grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${isMobile ? 1 : 3}, 1fr)`,
            gap: isMobile
              ? "24px"
              : "var(--LAYOUT-GUTTER, 32px)",
          }}
        >
          {filtered.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: (index % 6) * 0.08,
                ease,
              }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block"
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    backgroundColor: "#ffffff",
                    border: "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
                    transition:
                      "box-shadow 0.4s ease, border-color 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 12px 36px rgba(218,121,138,0.08), 0 4px 12px rgba(0,0,0,0.03)";
                    e.currentTarget.style.borderColor =
                      "var(--COLOR-PRIMARY, #da798a)";
                    e.currentTarget.style.transform =
                      "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor =
                      "var(--COLOR-BORDER, rgb(240,240,240))";
                    e.currentTarget.style.transform =
                      "translateY(0)";
                  }}
                >
                  {/* Image */}
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "16 / 10" }}
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes={
                        isMobile
                          ? "100vw"
                          : "33vw"
                      }
                      style={{
                        borderRadius: 0,
                        transition:
                          "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ padding: "24px" }}>
                    {/* Category */}
                    <span
                      style={{
                        fontFamily:
                          "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color:
                          "var(--COLOR-SALE-TEXT, #af7b88)",
                        backgroundColor:
                          "var(--COLOR-SALE-BG, #f9dee5)",
                        padding: "3px 10px",
                        borderRadius:
                          "var(--RADIUS, 300px)",
                        display: "inline-block",
                        marginBottom: "14px",
                      }}
                    >
                      {post.category}
                    </span>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily:
                          "var(--FONT-STACK-HEADING, var(--font-cardo), Cardo, serif)",
                        fontSize: "19px",
                        fontWeight: 400,
                        lineHeight: 1.3,
                        color:
                          "var(--COLOR-TEXT-DARK, #000000)",
                        marginBottom: "10px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      style={{
                        fontFamily:
                          "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
                        fontSize: "14px",
                        lineHeight: 1.7,
                        color:
                          "var(--COLOR-TEXT-LIGHT, #646464)",
                        marginBottom: "18px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Divider */}
                    <div
                      style={{
                        height: "1px",
                        backgroundColor:
                          "var(--COLOR-BORDER-HAIRLINE, #f7f7f7)",
                        marginBottom: "16px",
                      }}
                    />

                    {/* Meta */}
                    <div
                      className="flex items-center justify-between"
                      style={{
                        fontFamily:
                          "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
                        fontSize: "12px",
                        color:
                          "var(--COLOR-FOOTER-TEXT-A35, rgba(33,33,33,0.35))",
                      }}
                    >
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1">
                        <Clock
                          style={{
                            width: "11px",
                            height: "11px",
                          }}
                        />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && searchQuery.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
            style={{ padding: "60px 20px" }}
          >
            <p
              style={{
                fontFamily:
                  "var(--FONT-STACK-HEADING, var(--font-cardo), Cardo, serif)",
                fontSize: "20px",
                color: "var(--COLOR-TEXT-DARK, #000000)",
                marginBottom: "8px",
              }}
            >
              No articles found for &ldquo;{searchQuery}&rdquo;
            </p>
            <p
              style={{
                fontFamily:
                  "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
                fontSize: "14px",
                color: "var(--COLOR-TEXT-LIGHT, #646464)",
                marginBottom: "20px",
              }}
            >
              Try a different search term
            </p>
            <button
              onClick={() => setSearchQuery("")}
              style={{
                fontFamily:
                  "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                fontSize: "var(--BTN-FONT-SIZE, 13px)",
                fontWeight: "var(--BTN-FONT-WEIGHT, 500)",
                letterSpacing: "var(--BTN-LETTER-SPACING, 0.1em)",
                textTransform: "uppercase",
                padding: "12px 28px",
                borderRadius: "var(--RADIUS, 300px)",
                backgroundColor: "transparent",
                color: "var(--COLOR-TEXT, #212121)",
                border: "2px solid var(--COLOR-TEXT, #212121)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--COLOR-TEXT, #212121)";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "transparent";
                e.currentTarget.style.color =
                  "var(--COLOR-TEXT, #212121)";
              }}
            >
              Clear Search
            </button>
          </motion.div>
        )}
      </div>

      {/* ══════════════════════════════════
          NEWSLETTER CTA
          ══════════════════════════════════ */}
      <div
        style={{
          backgroundColor: "var(--COLOR-PRIMARY-LIGHT, #fdeff2)",
          padding: isMobile ? "48px 16px" : "64px 50px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center"
          style={{
            maxWidth: "540px",
            margin: "0 auto",
          }}
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
            Stay Inspired
          </span>
          <h2
            style={{
              fontFamily:
                "var(--FONT-STACK-HEADING, var(--font-cardo), Cardo, serif)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--COLOR-TEXT-DARK, #000000)",
              fontSize: "clamp(24px, 3vw, 32px)",
              marginBottom: "14px",
            }}
          >
            Get Floral Tips in Your Inbox
          </h2>
          <p
            style={{
              fontFamily:
                "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
              fontSize: "15px",
              lineHeight: 1.75,
              color: "var(--COLOR-TEXT-LIGHT, #646464)",
              marginBottom: "28px",
            }}
          >
            Weekly flower care guides, gifting ideas, and exclusive
            offers — delivered straight to your inbox.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <input
              type="email"
              placeholder="Your email address"
              style={{
                width: "100%",
                maxWidth: "320px",
                padding: "13px 20px",
                border: "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
                borderRadius: "var(--RADIUS, 300px)",
                fontFamily:
                  "var(--FONT-STACK-BODY, var(--font-libre-franklin), 'Libre Franklin', sans-serif)",
                fontSize: "14px",
                fontWeight: 300,
                color: "var(--COLOR-TEXT, #212121)",
                backgroundColor: "rgba(255,255,255,0.8)",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor =
                  "var(--COLOR-PRIMARY, #da798a)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor =
                  "var(--COLOR-BORDER, rgb(240,240,240))";
              }}
            />
            <button
              style={{
                fontFamily:
                  "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                fontSize: "var(--BTN-FONT-SIZE, 13px)",
                fontWeight: "var(--BTN-FONT-WEIGHT, 500)",
                letterSpacing: "var(--BTN-LETTER-SPACING, 0.1em)",
                textTransform: "uppercase",
                padding: "13px 32px",
                borderRadius: "var(--RADIUS, 300px)",
                backgroundColor:
                  "var(--BTN-PRIMARY-BG-COLOR, #e78596)",
                color: "var(--BTN-PRIMARY-TEXT-COLOR, #ffffff)",
                border: "2px solid var(--BTN-PRIMARY-BG-COLOR, #e78596)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--BTN-PRIMARY-BG-COLOR-BRIGHTER, #e37084)";
                e.currentTarget.style.borderColor =
                  "var(--BTN-PRIMARY-BG-COLOR-BRIGHTER, #e37084)";
                e.currentTarget.style.transform =
                  "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(218,121,138,0.3)";
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
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}