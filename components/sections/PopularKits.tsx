"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Nepal-specific product data ── */
const popularBouquets = [
  {
    id: 1,
    name: "Red Rose Bouquet — 12 Stems",
    slug: "red-rose-bouquet-12",
    price: 1850,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=500&h=500&fit=crop",
    badge: "Bestseller",
    badgeType: "default" as const,
  },
  {
    id: 2,
    name: "White Lily Arrangement",
    slug: "white-lily-arrangement",
    price: 2200,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=500&h=500&fit=crop",
    badge: "New",
    badgeType: "default" as const,
  },
  {
    id: 3,
    name: "Marigold Garland Set — 5 Pcs",
    slug: "marigold-garland-set",
    price: 650,
    comparePrice: 850,
    image:
      "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=500&h=500&fit=crop",
    badge: "Tihar Special",
    badgeType: "sale" as const,
  },
  {
    id: 4,
    name: "Mixed Seasonal Basket",
    slug: "mixed-seasonal-basket",
    price: 1500,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=500&h=500&fit=crop",
    badge: null,
    badgeType: "default" as const,
  },
  {
    id: 5,
    name: "Purple Orchid Luxury Box",
    slug: "purple-orchid-luxury-box",
    price: 3500,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500&h=500&fit=crop",
    badge: "Premium",
    badgeType: "default" as const,
  },
  {
    id: 6,
    name: "Sunflower Cheer Bouquet",
    slug: "sunflower-cheer-bouquet",
    price: 1200,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?w=500&h=500&fit=crop",
    badge: null,
    badgeType: "default" as const,
  },
  {
    id: 7,
    name: "Cake & Flower Combo",
    slug: "cake-flower-combo",
    price: 2800,
    comparePrice: 3400,
    image:
      "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=500&h=500&fit=crop",
    badge: "Popular",
    badgeType: "sale" as const,
  },
  {
    id: 8,
    name: "Lali Gurans Tribute",
    slug: "lali-gurans-tribute",
    price: 2000,
    comparePrice: null,
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=500&h=500&fit=crop",
    badge: "Nepal's Flower",
    badgeType: "default" as const,
  },
];

/* ── Format price helper ── */
function formatPrice(amount: number) {
  return `NPR ${amount.toLocaleString()}`;
}

/* ══════════════════════════════════
   Popular Bouquets Section
   ══════════════════════════════════ */
export default function PopularBouquets() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (toastMsg) {
      const t = setTimeout(() => setToastMsg(null), 2200);
      return () => clearTimeout(t);
    }
  }, [toastMsg]);

  const toggleWish = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setToastMsg("Removed from wishlist");
      } else {
        next.add(id);
        setToastMsg("❤️ Added to wishlist");
      }
      return next;
    });
  };

  /* Column count based on breakpoint */
  const colCount = isMobile ? 2 : 4;
  const gutter = isMobile ? "16px" : "var(--LAYOUT-GUTTER, 32px)";

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
          className="text-center mb-12"
        >
          <span
            className="inline-block mb-3"
            style={{
              fontFamily: "var(--BTN-FONT-STACK, 'DM Sans', sans-serif)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--COLOR-PRIMARY, #da798a)",
            }}
          >
            Bestsellers
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
            Fresh Picks{" "}
            <em
              style={{
                color: "var(--COLOR-PRIMARY, #da798a)",
                fontStyle: "italic",
              }}
            >
              This Week
            </em>
          </h2>
          <p
            className="mx-auto"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "16px",
              lineHeight: 1.75,
              color: "var(--COLOR-TEXT-LIGHT, #646464)",
              maxWidth: "560px",
            }}
          >
            Hand-arranged with locally sourced flowers from Ilam and Dhading
          </p>
        </motion.div>

        {/* ── Product Grid ── */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${colCount}, 1fr)`,
            gap: gutter,
          }}
        >
          {popularBouquets.map((product, index) => {
            const isHovered = hoveredId === product.id;
            const isWished = wishlist.has(product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.06,
                  ease,
                }}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ position: "relative", cursor: "pointer" }}
              >
                <Link href={`/product/${product.slug}`} className="block">
                  {/* ── Image Container ── */}
                  <div
                    className="relative overflow-hidden"
                    style={{
                      aspectRatio: "1 / 1",
                      borderRadius: "6px",
                      backgroundColor: "#f9f5f3",
                      marginBottom: "14px",
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      style={{
                        borderRadius: 0,
                        transform: isHovered
                          ? "scale(1.05)"
                          : "scale(1)",
                        transition:
                          "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                        filter: "brightness(1.0)",
                      }}
                      sizes={
                        isMobile
                          ? "50vw"
                          : "25vw"
                      }
                    />

                    {/* ── Sale / Category Badge ── */}
                    {product.badge && (
                      <div
                        className="absolute top-2.5 left-2.5 z-[2]"
                        style={{
                          backgroundColor:
                            product.badgeType === "sale"
                              ? "var(--COLOR-SALE-BG, #f9dee5)"
                              : "var(--COLOR-SALE-BG, #f9dee5)",
                          color:
                            "var(--COLOR-SALE-TEXT, #af7b88)",
                          fontFamily:
                            "var(--BTN-FONT-STACK, 'DM Sans', sans-serif)",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          padding: "4px 12px",
                          borderRadius:
                            "var(--RADIUS, 300px)",
                        }}
                      >
                        {product.badge}
                      </div>
                    )}

                    {/* ── Wishlist Button ── */}
                    <button
                      onClick={(e) => toggleWish(product.id, e)}
                      className="absolute top-2.5 right-2.5 z-[2] flex items-center justify-center"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: isWished
                          ? "var(--COLOR-PRIMARY-LIGHT, #fdeff2)"
                          : "#ffffff",
                        boxShadow:
                          "0 2px 8px rgba(0,0,0,0.08)",
                        color: isWished
                          ? "var(--COLOR-PRIMARY, #da798a)"
                          : "var(--COLOR-TEXT, #212121)",
                        transition:
                          "all 0.3s ease",
                        transform: isHovered
                          ? "scale(1.1)"
                          : "scale(1)",
                      }}
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        className="w-[15px] h-[15px]"
                        fill={
                          isWished
                            ? "var(--COLOR-PRIMARY, #da798a)"
                            : "none"
                        }
                        strokeWidth={isWished ? 0 : 1.5}
                      />
                    </button>

                    {/* ── Quick Add (slides up on hover) ── */}
                    <div
                      className="absolute bottom-0 left-0 right-0 z-[2] p-3"
                      style={{
                        transform: isHovered
                          ? "translateY(0)"
                          : "translateY(100%)",
                        transition:
                          "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      <span
                        className="flex items-center justify-center gap-2 w-full"
                        style={{
                          padding: "11px 16px",
                          backgroundColor:
                            "var(--COLOR-TEXT-DARK, #000000)",
                          color: "#ffffff",
                          borderRadius:
                            "var(--RADIUS, 300px)",
                          fontFamily:
                            "var(--BTN-FONT-STACK, 'DM Sans', sans-serif)",
                          fontSize: "12px",
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          transition:
                            "background-color 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "var(--COLOR-PRIMARY, #da798a)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "var(--COLOR-TEXT-DARK, #000000)";
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setToastMsg(
                            `🌸 ${product.name} added to cart`
                          );
                        }}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Add to Cart
                      </span>
                    </div>
                  </div>

                  {/* ── Product Info ── */}
                  <h4
                    className="mb-1"
                    style={{
                      fontFamily:
                        "var(--FONT-STACK-HEADING, Cardo, serif)",
                      fontSize: "15px",
                      fontWeight: 400,
                      lineHeight: 1.3,
                      color:
                        "var(--COLOR-TEXT-DARK, #000000)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.name}
                  </h4>

                  {/* ── Price Row ── */}
                  <div
                    className="flex items-center gap-2"
                    style={{
                      fontFamily:
                        "var(--BTN-FONT-STACK, 'DM Sans', sans-serif)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: product.comparePrice
                          ? "var(--COLOR-SALE, #d20000)"
                          : "var(--COLOR-TEXT, #212121)",
                      }}
                    >
                      {formatPrice(product.price)}
                    </span>
                    {product.comparePrice && (
                      <span
                        style={{
                          fontSize: "14px",
                          color:
                            "var(--COLOR-TEXT-LIGHT, #646464)",
                          textDecoration: "line-through",
                        }}
                      >
                        {formatPrice(product.comparePrice)}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ── View All Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="text-center mt-12"
        >
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
                backgroundColor: "transparent",
                color: "var(--COLOR-TEXT, #212121)",
                border: "2px solid var(--COLOR-TEXT, #212121)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--COLOR-TEXT, #212121)";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.transform =
                  "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "transparent";
                e.currentTarget.style.color =
                  "var(--COLOR-TEXT, #212121)";
                e.currentTarget.style.transform =
                  "translateY(0)";
              }}
            >
              View All Bouquets
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* ── Toast Notification ── */}
      <div
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5"
        style={{
          backgroundColor: "var(--COLOR-TEXT-DARK, #000000)",
          color: "#ffffff",
          borderRadius: "12px",
          fontFamily: "var(--BTN-FONT-STACK, 'DM Sans', sans-serif)",
          fontSize: "14px",
          fontWeight: 500,
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          transform: toastMsg ? "translateY(0)" : "translateY(120%)",
          opacity: toastMsg ? 1 : 0,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: toastMsg ? "auto" : "none",
        }}
      >
        {toastMsg}
      </div>
    </section>
  );
}