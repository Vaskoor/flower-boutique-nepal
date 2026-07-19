"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  Phone,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Flower2,
} from "lucide-react";
import { useScrollPosition } from "@/lib/hooks";
import { useLanguage, useCart } from "@/lib/context";
import { useTranslation } from "@/lib/useTranslation";
import { navCategories } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { locale, setLocale } = useLanguage();
  const { totalItems } = useCart();
  const { t } = useTranslation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/search?q=${encodeURIComponent(searchQuery.trim())}`
      );
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "np" : "en");
  };

  const langLabel = locale === "en" ? "EN" : "नेपाली";

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [router]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMegaMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const getItemLink = (item: string, groupTitle: string) => {
    const occasionGroups = ["By Occasion", "Festivals"];
    if (occasionGroups.includes(groupTitle)) {
      return `/shop?occasion=${item.toLowerCase()}`;
    }
    return `/shop?category=${item.toLowerCase()}`;
  };

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/shop", label: t("nav.shop"), hasMega: true },
    { href: "/about", label: t("nav.about") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <>
      {/* ══════════════════════════════════
          ANNOUNCEMENT BAR
          ══════════════════════════════════ */}
      <div
        style={{
          backgroundColor: "var(--COLOR-PRIMARY, #da798a)",
          color: "#ffffff",
          position: "relative",
          zIndex: 60,
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "9px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <p
            style={{
              fontFamily:
                "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.04em",
            }}
          >
            🌸 {t("nav.freeDelivery")}
          </p>
          <div
            className="hidden md:flex items-center gap-4"
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "11px",
                opacity: 0.85,
              }}
            >
              <MapPin style={{ width: "12px", height: "12px" }} />
              {t("nav.kathmandu")}
            </span>
            <span style={{ opacity: 0.4 }}>|</span>
            <button
              onClick={toggleLanguage}
              style={{
                background: "none",
                border: "none",
                color: "#ffffff",
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                opacity: 0.85,
              }}
            >
              {langLabel}
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          MAIN NAVIGATION
          ══════════════════════════════════ */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: isScrolled
            ? "rgba(255,255,255,0.95)"
            : "var(--COLOR-HEADER-BG, #ffffff)",
          backdropFilter: isScrolled
            ? "blur(16px)"
            : "none",
          WebkitBackdropFilter: isScrolled
            ? "blur(16px)"
            : "none",
          borderBottom: isScrolled
            ? "1px solid var(--COLOR-BORDER, rgb(240,240,240))"
            : "1px solid transparent",
          height: "var(--menu-height, 62px)",
          transition:
            "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: isScrolled
            ? "0 1px 12px rgba(0,0,0,0.04)"
            : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 50px",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* ── Left: Mobile menu + Logo ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexShrink: 0,
            }}
          >
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              style={{
                background: "none",
                border: "none",
                color: "var(--COLOR-HEADER-LINK, #212121)",
                padding: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Menu style={{ width: "22px", height: "22px" }} />
            </button>

            <Link
              href="/"
              className="flex items-center gap-2.5"
              style={{ textDecoration: "none", flexShrink: 0 }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor:
                    "var(--COLOR-PRIMARY, #da798a)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  flexShrink: 0,
                }}
              >
                <Flower2 style={{ width: "16px", height: "16px" }} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: 1.1,
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "var(--FONT-STACK-HEADING, var(--font-cardo), Cardo, serif)",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--COLOR-TEXT-DARK, #000000)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Suman Florals
                </span>
                <span
                  style={{
                    fontFamily:
                      "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                    fontSize: "9px",
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--COLOR-TEXT-LIGHT, #646464)",
                  }}
                >
                  Premium Boutique
                </span>
              </div>
            </Link>
          </div>

          {/* ── Center: Nav links (left-aligned after logo) ── */}
          <nav
            className="hidden lg:flex items-center"
            style={{
              gap: "28px",
              marginLeft: "44px",
              flexShrink: 0,
            }}
          >
            {navLinks.map((link) =>
              link.hasMega ? (
                <div
                  key={link.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setMegaMenuOpen(true)}
                  onMouseLeave={() => setMegaMenuOpen(false)}
                >
                  <button
                    className="flex items-center gap-1"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily:
                        "var(--FONT-STACK-BODY, var(--font-libre-franklin), 'Libre Franklin', sans-serif)",
                      fontSize: "14px",
                      fontWeight: 400,
                      letterSpacing: "0.02em",
                      color:
                        "var(--COLOR-HEADER-LINK, #212121)",
                      padding: "4px 0",
                      position: "relative",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color =
                        "var(--COLOR-HEADER-LINK-HOVER, rgba(33,33,33,0.7))";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color =
                        "var(--COLOR-HEADER-LINK, #212121)";
                    }}
                  >
                    {link.label}
                    <ChevronDown
                      style={{
                        width: "14px",
                        height: "14px",
                        transition: "transform 0.3s ease",
                        transform: megaMenuOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  </button>

                  {/* ── Mega Menu (left-aligned to button) ── */}
                  <AnimatePresence>
                    {megaMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25, ease }}
                        style={{
                          position: "absolute",
                          top: "calc(100% + 12px)",
                          left: "0",
                          width: "660px",
                          backgroundColor: "#ffffff",
                          borderRadius: "20px",
                          boxShadow:
                            "0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)",
                          border:
                            "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
                          padding: "28px",
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(4, 1fr)",
                          gap: "24px",
                          zIndex: 100,
                        }}
                      >
                        {navCategories.map((cat) => (
                          <div key={cat.title}>
                            <h4
                              style={{
                                fontFamily:
                                  "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                                fontSize: "11px",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color:
                                  "var(--COLOR-PRIMARY, #da798a)",
                                marginBottom: "14px",
                                paddingBottom: "10px",
                                borderBottom:
                                  "1px solid var(--COLOR-BORDER-HAIRLINE, #f7f7f7)",
                              }}
                            >
                              {cat.title}
                            </h4>
                            <ul
                              style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                              }}
                            >
                              {cat.items.map((item) => (
                                <li
                                  key={item}
                                  style={{
                                    marginBottom: "9px",
                                  }}
                                >
                                  <Link
                                    href={getItemLink(
                                      item,
                                      cat.title
                                    )}
                                    style={{
                                      fontFamily:
                                        "var(--FONT-STACK-BODY, var(--font-libre-franklin), 'Libre Franklin', sans-serif)",
                                      fontSize: "13px",
                                      fontWeight: 400,
                                      color:
                                        "var(--COLOR-TEXT-LIGHT, #646464)",
                                      textDecoration:
                                        "none",
                                      transition:
                                        "color 0.2s ease",
                                      display:
                                        "inline-block",
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
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        {/* Quick ship banner */}
                        <div
                          style={{
                            gridColumn: "1 / -1",
                            marginTop: "4px",
                            paddingTop: "14px",
                            borderTop:
                              "1px solid var(--COLOR-BORDER-HAIRLINE, #f7f7f7)",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Link
                            href="/shop?tag=quick-ship"
                            style={{
                              textDecoration: "none",
                              padding: "11px 28px",
                              backgroundColor: "#ffd735",
                              borderRadius: "8px",
                              transition:
                                "background-color 0.2s ease",
                              display: "inline-flex",
                              alignItems: "center",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "#F0C400";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "#ffd735";
                            }}
                          >
                            <span
                              style={{
                                fontFamily:
                                  "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                                fontSize: "12px",
                                fontWeight: 600,
                                letterSpacing: "0.04em",
                                color: "#2b2b2b",
                              }}
                            >
                              ⚡ Quick Ship Flowers
                            </span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily:
                      "var(--FONT-STACK-BODY, var(--font-libre-franklin), 'Libre Franklin', sans-serif)",
                    fontSize: "14px",
                    fontWeight: 400,
                    letterSpacing: "0.02em",
                    color:
                      "var(--COLOR-HEADER-LINK, #212121)",
                    textDecoration: "none",
                    padding: "4px 0",
                    position: "relative",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color =
                      "var(--COLOR-HEADER-LINK-HOVER, rgba(33,33,33,0.7))";
                    const underline =
                      e.currentTarget.querySelector("span");
                    if (underline)
                      underline.style.width = "100%";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color =
                      "var(--COLOR-HEADER-LINK, #212121)";
                    const underline =
                      e.currentTarget.querySelector("span");
                    if (underline)
                      underline.style.width = "0";
                  }}
                >
                  {link.label}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      left: 0,
                      height: "1.5px",
                      backgroundColor:
                        "var(--COLOR-PRIMARY, #da798a)",
                      width: 0,
                      transition: "width 0.3s ease",
                    }}
                  />
                </Link>
              )
            )}
          </nav>

          {/* ── Spacer pushes actions to far right ── */}
          <div style={{ flex: 1 }} />

          {/* ── Right: Actions ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              flexShrink: 0,
            }}
          >
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              style={{
                background: "none",
                border: "none",
                color: "var(--COLOR-HEADER-LINK, #212121)",
                padding: "8px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color =
                  "var(--COLOR-PRIMARY, #da798a)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  "var(--COLOR-HEADER-LINK, #212121)";
              }}
            >
              <Search style={{ width: "19px", height: "19px" }} />
            </button>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="hidden sm:flex"
              style={{
                background: "none",
                border: "none",
                color: "var(--COLOR-HEADER-LINK, #212121)",
                padding: "8px",
                borderRadius: "50%",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color =
                  "var(--COLOR-PRIMARY, #da798a)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  "var(--COLOR-HEADER-LINK, #212121)";
              }}
            >
              <Heart style={{ width: "19px", height: "19px" }} />
            </Link>

            <a
              href="tel:01-5900123"
              aria-label="Call us"
              className="hidden sm:flex"
              style={{
                background: "none",
                border: "none",
                color: "var(--COLOR-HEADER-LINK, #212121)",
                padding: "8px",
                borderRadius: "50%",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s ease",
                textDecoration: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color =
                  "var(--COLOR-PRIMARY, #da798a)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  "var(--COLOR-HEADER-LINK, #212121)";
              }}
            >
              <Phone style={{ width: "19px", height: "19px" }} />
            </a>

            <Link
              href="/cart"
              aria-label="Cart"
              style={{
                background: "none",
                border: "none",
                color: "var(--COLOR-HEADER-LINK, #212121)",
                padding: "8px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s ease",
                textDecoration: "none",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color =
                  "var(--COLOR-PRIMARY, #da798a)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  "var(--COLOR-HEADER-LINK, #212121)";
              }}
            >
              <ShoppingBag style={{ width: "19px", height: "19px" }} />
              {totalItems > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    minWidth: "17px",
                    height: "17px",
                    borderRadius: "50%",
                    backgroundColor:
                      "var(--COLOR-PRIMARY, #da798a)",
                    color: "#ffffff",
                    fontSize: "10px",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily:
                      "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                    lineHeight: 1,
                    padding: "0 4px",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════
          SEARCH OVERLAY
          ══════════════════════════════════ */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSearchOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.3)",
                zIndex: 90,
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 95,
                backgroundColor: "rgba(255,255,255,0.98)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderBottom:
                  "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
                boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  maxWidth: "600px",
                  margin: "0 auto",
                  padding: "24px 20px",
                }}
              >
                <form onSubmit={handleSearch}>
                  <div style={{ position: "relative" }}>
                    <Search
                      style={{
                        position: "absolute",
                        left: "18px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "20px",
                        height: "20px",
                        color:
                          "var(--COLOR-TEXT-LIGHT, #646464)",
                      }}
                    />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={t("nav.search")}
                      value={searchQuery}
                      onChange={(e) =>
                        setSearchQuery(e.target.value)
                      }
                      style={{
                        width: "100%",
                        padding: "16px 48px 16px 52px",
                        border: "2px solid var(--COLOR-BORDER, rgb(240,240,240))",
                        borderRadius:
                          "var(--RADIUS, 300px)",
                        fontFamily:
                          "var(--FONT-STACK-BODY, var(--font-libre-franklin), 'Libre Franklin', sans-serif)",
                        fontSize: "16px",
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
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        padding: "6px",
                        color:
                          "var(--COLOR-TEXT-LIGHT, #646464)",
                        cursor: "pointer",
                        display: "flex",
                      }}
                    >
                      <X style={{ width: "18px", height: "18px" }} />
                    </button>
                  </div>
                </form>

                <div
                  className="flex flex-wrap gap-2 justify-center"
                  style={{ marginTop: "20px" }}
                >
                  {[
                    "Roses",
                    "Lilies",
                    "Marigold",
                    "Bouquets",
                    "Dashain Special",
                    "Cake Combo",
                  ].map((tag) => (
                    <Link
                      key={tag}
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      onClick={() => setSearchOpen(false)}
                      style={{
                        padding: "8px 18px",
                        backgroundColor:
                          "var(--COLOR-LINK-FADE, rgba(33,33,33,0.05))",
                        borderRadius:
                          "var(--RADIUS, 300px)",
                        fontFamily:
                          "var(--FONT-STACK-BODY, var(--font-libre-franklin), 'Libre Franklin', sans-serif)",
                        fontSize: "13px",
                        color: "var(--COLOR-TEXT, #212121)",
                        textDecoration: "none",
                        transition:
                          "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "var(--COLOR-LINK-FADE-HOVER, rgba(33,33,33,0.1))";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "var(--COLOR-LINK-FADE, rgba(33,33,33,0.05))";
                      }}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════
          MOBILE MENU DRAWER
          ══════════════════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.4)",
                zIndex: 100,
              }}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                width: "320px",
                maxWidth: "85vw",
                backgroundColor:
                  "var(--COLOR-MENU-BG, #ffffff)",
                zIndex: 110,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 24px",
                  borderBottom:
                    "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
                }}
              >
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor:
                        "var(--COLOR-PRIMARY, #da798a)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                    }}
                  >
                    <Flower2
                      style={{ width: "14px", height: "14px" }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily:
                        "var(--FONT-STACK-HEADING, var(--font-cardo), Cardo, serif)",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "var(--COLOR-TEXT-DARK, #000000)",
                    }}
                  >
                    Suman Florals
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "8px",
                    color: "var(--COLOR-TEXT, #212121)",
                    display: "flex",
                    cursor: "pointer",
                  }}
                >
                  <X style={{ width: "22px", height: "22px" }} />
                </button>
              </div>

              <nav style={{ flex: 1, padding: "8px 24px" }}>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.hasMega ? "/shop" : link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: "block",
                      fontFamily:
                        "var(--FONT-STACK-HEADING, var(--font-cardo), Cardo, serif)",
                      fontSize: "22px",
                      fontWeight: 400,
                      color: "var(--COLOR-MENU-LINK, #212121)",
                      textDecoration: "none",
                      padding: "14px 0",
                      borderBottom:
                        "1px solid var(--COLOR-BORDER-HAIRLINE, #f7f7f7)",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color =
                        "var(--COLOR-PRIMARY, #da798a)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color =
                        "var(--COLOR-MENU-LINK, #212121)";
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div
                style={{
                  padding: "20px 24px",
                  borderTop:
                    "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
                }}
              >
                <a
                  href="tel:01-5900123"
                  className="flex items-center justify-center gap-3"
                  style={{
                    textDecoration: "none",
                    padding: "13px 20px",
                    borderRadius: "var(--RADIUS, 300px)",
                    backgroundColor:
                      "var(--COLOR-PRIMARY-FADE, rgba(218,121,138,0.05))",
                    border:
                      "1px solid var(--COLOR-PRIMARY-FADE-HOVER, rgba(218,121,138,0.1))",
                    marginBottom: "12px",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--COLOR-PRIMARY-FADE-HOVER, rgba(218,121,138,0.1))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--COLOR-PRIMARY-FADE, rgba(218,121,138,0.05))";
                  }}
                >
                  <Phone
                    style={{
                      width: "16px",
                      height: "16px",
                      color: "var(--COLOR-PRIMARY, #da798a)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily:
                        "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      color: "var(--COLOR-TEXT, #212121)",
                    }}
                  >
                    Call: 01-5900123
                  </span>
                </a>

                <button
                  onClick={toggleLanguage}
                  style={{
                    width: "100%",
                    padding: "10px 20px",
                    borderRadius: "var(--RADIUS, 300px)",
                    backgroundColor: "transparent",
                    border:
                      "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
                    fontFamily:
                      "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    color: "var(--COLOR-TEXT-LIGHT, #646464)",
                    cursor: "pointer",
                    transition: "border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--COLOR-PRIMARY, #da798a)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "var(--COLOR-BORDER, rgb(240,240,240))";
                  }}
                >
                  Switch to{" "}
                  {locale === "en" ? "नेपाली" : "English"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}