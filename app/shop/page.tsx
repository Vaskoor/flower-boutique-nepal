"use client";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  Grid3X3,
  List,
  Search,
  X,
  ChevronDown,
  Flower2,
  Heart,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/sections/ProductCard";
import { products, categories, flowerTypes, colors, occasionsList } from "@/lib/data";
import { useTranslation } from "@/lib/useTranslation";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Nepal-specific filter data ── */
const shopCategories = [
  { slug: "all", name: "All Flowers", count: 48 },
  { slug: "bouquets", name: "Bouquets", count: 18 },
  { slug: "flower-boxes", name: "Flower Boxes", count: 12 },
  { slug: "garlands", name: "Garlands & Mala", count: 8 },
  { slug: "plant-gifts", name: "Plant Gifts", count: 6 },
  { slug: "cake-combos", name: "Cake Combos", count: 4 },
];

const shopOccasions = [
  "All Occasions",
  "Birthday",
  "Anniversary",
  "Dashain",
  "Tihar",
  "Teej",
  "Wedding",
  "Sympathy",
  "Congratulations",
];

const shopFlowerTypes = [
  "Roses",
  "Lilies",
  "Orchids",
  "Sunflowers",
  "Marigold",
  "Carnations",
  "Tulips",
  "Jasmine",
];

const shopColors = [
  "Red",
  "Pink",
  "White",
  "Yellow",
  "Purple",
  "Orange",
  "Mixed",
];

/* ── Filter Pill ── */
function FilterPill({
  label,
  active,
  onClick,
  count,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily:
          "var(--FONT-STACK-BODY, var(--font-libre-franklin), 'Libre Franklin', sans-serif)",
        fontSize: "13px",
        fontWeight: active ? 500 : 400,
        color: active
          ? "var(--COLOR-PRIMARY-OPPOSITE, #ffffff)"
          : "var(--COLOR-TEXT, #212121)",
        backgroundColor: active
          ? "var(--COLOR-PRIMARY, #da798a)"
          : "transparent",
        border: active
          ? "1px solid var(--COLOR-PRIMARY, #da798a)"
          : "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
        borderRadius: "var(--RADIUS, 300px)",
        padding: "8px 18px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor =
            "var(--COLOR-PRIMARY, #da798a)";
          e.currentTarget.style.color =
            "var(--COLOR-PRIMARY, #da798a)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor =
            "var(--COLOR-BORDER, rgb(240,240,240))";
          e.currentTarget.style.color =
            "var(--COLOR-TEXT, #212121)";
        }
      }}
    >
      {label}
      {count !== undefined && (
        <span
          style={{
            fontSize: "11px",
            opacity: active ? 0.8 : 0.5,
          }}
        >
          ({count})
        </span>
      )}
    </button>
  );
}

/* ── Filter Section (collapsible) ── */
function FilterSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        borderBottom: "1px solid var(--COLOR-BORDER-HAIRLINE, #f7f7f7)",
        paddingBottom: open ? "20px" : "0",
        marginBottom: open ? "20px" : "0",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "14px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontFamily:
              "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--COLOR-TEXT-DARK, #000000)",
          }}
        >
          {title}
        </span>
        <ChevronDown
          style={{
            width: "16px",
            height: "16px",
            color: "var(--COLOR-TEXT-LIGHT, #646464)",
            transition: "transform 0.3s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            style={{ overflow: "hidden" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════
   LIST VIEW CARD (horizontal layout)
   ══════════════════════════════════ */
function ListCard({
  product,
  index,
}: {
  product: (typeof products)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const salePrice = product.originalPrice
    ? product.price
    : null;
  const displayPrice = salePrice || product.price;
  const originalPrice = salePrice ? product.originalPrice : null;

  const handleCardClick = () => {
    router.push(`/product/${product.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: (index % 6) * 0.06,
        ease,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        role="link"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCardClick();
          }
        }}
        style={{
          display: "flex",
          gap: "0",
          borderRadius: "14px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          border: hovered
            ? "1px solid var(--COLOR-PRIMARY, #da798a)"
            : "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
          boxShadow: hovered
            ? "0 8px 28px rgba(218,121,138,0.08), 0 2px 8px rgba(0,0,0,0.03)"
            : "none",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          transition:
            "border-color 0.3s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          textDecoration: "none",
          color: "inherit",
          cursor: "pointer",
        }}
      >
        {/* ── Image column ── */}
        <div
          style={{
            position: "relative",
            width: "140px",
            minWidth: "140px",
            aspectRatio: "1 / 1",
            backgroundColor: "#f9f5f3",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 120px, 140px"
            style={{
              borderRadius: 0,
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition:
                "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          {/* Badge */}
          {product.badge && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                backgroundColor:
                  "var(--COLOR-SALE-BG, #f9dee5)",
                color: "var(--COLOR-SALE-TEXT, #af7b88)",
                fontFamily:
                  "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "3px 10px",
                borderRadius: "var(--RADIUS, 300px)",
                zIndex: 2,
              }}
            >
              {product.badge}
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              zIndex: 2,
              transition:
                "transform 0.3s ease, box-shadow 0.3s ease",
              transform: hovered ? "scale(1.1)" : "scale(1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(0,0,0,0.08)";
            }}
          >
            <Heart
              style={{
                width: "14px",
                height: "14px",
                color: "var(--COLOR-TEXT, #212121)",
              }}
            />
          </button>

          {/* Quick Add overlay */}
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              right: "0",
              padding: "8px",
              zIndex: 2,
              transform: hovered
                ? "translateY(0)"
                : "translateY(100%)",
              transition:
                "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <span
              className="flex items-center justify-center gap-1.5 w-full"
              style={{
                padding: "9px 12px",
                backgroundColor:
                  "var(--COLOR-TEXT-DARK, #000000)",
                color: "#ffffff",
                borderRadius: "var(--RADIUS, 300px)",
                fontFamily:
                  "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                transition: "background-color 0.2s ease",
                cursor: "pointer",
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
              }}
            >
              <ShoppingBag
                style={{ width: "12px", height: "12px" }}
              />
              Add to Cart
            </span>
          </div>
        </div>

        {/* ── Content column ── */}
        <div
          style={{
            flex: 1,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          {/* Title */}
          <h3
            style={{
              fontFamily:
                "var(--FONT-STACK-HEADING, var(--font-cardo), Cardo, serif)",
              fontSize: "17px",
              fontWeight: 400,
              lineHeight: 1.3,
              color: "var(--COLOR-TEXT-DARK, #000000)",
              marginBottom: "6px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.name}
          </h3>

          {/* Description (if available) */}
          {product.excerpt && (
            <p
              style={{
                fontFamily:
                  "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
                fontSize: "13px",
                lineHeight: 1.65,
                color:
                  "var(--COLOR-TEXT-LIGHT, #646464)",
                marginBottom: "12px",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {product.excerpt}
            </p>
          )}

          {/* Price row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                fontFamily:
                  "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                fontSize: "16px",
                fontWeight: 600,
                color: salePrice
                  ? "var(--COLOR-SALE, #d20000)"
                  : "var(--COLOR-TEXT, #212121)",
              }}
            >
              NPR {displayPrice.toLocaleString()}
            </span>
            {originalPrice && (
              <span
                style={{
                  fontFamily:
                    "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                  fontSize: "14px",
                  color:
                    "var(--COLOR-TEXT-LIGHT, #646464)",
                  textDecoration: "line-through",
                }}
              >
                NPR {originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Category + Occasion tags */}
          <div
            className="flex flex-wrap gap-1.5"
            style={{ marginBottom: "14px" }}
          >
            {product.category && (
              <span
                style={{
                  fontFamily:
                    "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--COLOR-TEXT-LIGHT, #646464)",
                  backgroundColor:
                    "var(--COLOR-LINK-FADE, rgba(33,33,33,0.05))",
                  padding: "3px 10px",
                  borderRadius:
                    "var(--RADIUS, 300px)",
                }}
              >
                {product.category}
              </span>
            )}
            {product.occasion &&
              product.occasion.slice(0, 2).map((occ) => (
                <span
                  key={occ}
                  style={{
                    fontFamily:
                      "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--COLOR-TEXT-LIGHT, #646464)",
                    backgroundColor:
                      "var(--COLOR-LINK-FADE, rgba(33,33,33,0.05))",
                    padding: "3px 10px",
                    borderRadius:
                      "var(--RADIUS, 300px)",
                  }}
                >
                  {occ}
                </span>
              ))}
          </div>

          {/* Action row */}
          <div
            className="flex items-center gap-3"
            style={{ marginTop: "auto" }}
          >
            <span
              className="flex items-center gap-1.5"
              style={{
                fontFamily:
                  "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--COLOR-TEXT, #212121)",
                textDecoration: "none",
                transition: "color 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color =
                  "var(--COLOR-PRIMARY, #da798a)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  "var(--COLOR-TEXT, #212121)";
              }}
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/product/${product.slug}`);
              }}
            >
              View Details
              <span
                style={{
                  display: "inline-block",
                  transition:
                    "transform 0.3s ease",
                }}
              >
                →
              </span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════
   Shop Content
   ══════════════════════════════════ */
function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const occasionParam = searchParams.get("occasion");
  const { t } = useTranslation();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    categoryParam || "all"
  );
  const [selectedOccasion, setSelectedOccasion] = useState(
    occasionParam || "all"
  );
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsTablet(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTablet(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
    if (occasionParam) setSelectedOccasion(occasionParam);
  }, [categoryParam, occasionParam]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesOccasion =
      selectedOccasion === "all" ||
      product.occasion.some(
        (o) => o.toLowerCase() === selectedOccasion.toLowerCase()
      );
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesOccasion && matchesPrice;
  });

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedOccasion !== "all" ||
    searchQuery !== "" ||
    priceRange[0] > 0 ||
    priceRange[1] < 10000;

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedOccasion("all");
    setPriceRange([0, 10000]);
    setSelectedType("all");
    setSelectedColor("all");
  };

  /* ── Filter sidebar content (shared between desktop & mobile) ── */
  const filterContent = (
    <div>
      {/* Active filter summary */}
      {hasActiveFilters && (
        <div
          className="flex items-center justify-between"
          style={{
            padding: "12px 16px",
            backgroundColor: "var(--COLOR-PRIMARY-FADE, rgba(218,121,138,0.05))",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontFamily:
                "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
              fontSize: "13px",
              color: "var(--COLOR-TEXT-LIGHT, #646464)",
            }}
          >
            {filteredProducts.length} result
            {filteredProducts.length !== 1 ? "s" : ""}
          </span>
          <button
            onClick={clearFilters}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily:
                "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--COLOR-PRIMARY, #da798a)",
              letterSpacing: "0.05em",
              padding: "4px 0",
            }}
          >
            Clear all
          </button>
        </div>
      )}

      {/* Category */}
      <FilterSection title="Category" defaultOpen={true}>
        <div className="flex flex-wrap gap-2">
          {shopCategories.map((cat) => (
            <FilterPill
              key={cat.slug}
              label={cat.name}
              count={cat.count}
              active={selectedCategory === cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Occasion */}
      <FilterSection title="Occasion">
        <div className="flex flex-wrap gap-2">
          {shopOccasions.map((occ) => (
            <FilterPill
              key={occ}
              label={occ}
              active={
                selectedOccasion ===
                (occ === "All Occasions" ? "all" : occ.toLowerCase())
              }
              onClick={() =>
                setSelectedOccasion(
                  occ === "All Occasions" ? "all" : occ.toLowerCase()
                )
              }
            />
          ))}
        </div>
      </FilterSection>

      {/* Flower Type */}
      <FilterSection title="Flower Type">
        <div className="flex flex-wrap gap-2">
          <FilterPill
            label="All Types"
            active={selectedType === "all"}
            onClick={() => setSelectedType("all")}
          />
          {shopFlowerTypes.map((type) => (
            <FilterPill
              key={type}
              label={type}
              active={selectedType === type.toLowerCase()}
              onClick={() => setSelectedType(type.toLowerCase())}
            />
          ))}
        </div>
      </FilterSection>

      {/* Color */}
      <FilterSection title="Color">
        <div className="flex flex-wrap gap-2">
          <FilterPill
            label="All Colors"
            active={selectedColor === "all"}
            onClick={() => setSelectedColor("all")}
          />
          {shopColors.map((color) => (
            <FilterPill
              key={color}
              label={color}
              active={selectedColor === color.toLowerCase()}
              onClick={() => setSelectedColor(color.toLowerCase())}
            />
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div
          className="flex items-center gap-3"
          style={{ marginTop: "4px" }}
        >
          <span
            style={{
              fontFamily:
                "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
              fontSize: "12px",
              color: "var(--COLOR-TEXT-LIGHT, #646464)",
            }}
          >
            NPR
          </span>
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            style={{
              width: "90px",
              padding: "9px 12px",
              border: "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
              borderRadius: "var(--RADIUS-SELECT, 22px)",
              fontFamily:
                "var(--FONT-STACK-BODY, var(--font-libre-franklin), 'Libre Franklin', sans-serif)",
              fontSize: "14px",
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
          <span
            style={{
              color: "var(--COLOR-BORDER-DARK, #bdbdbd)",
              fontSize: "14px",
            }}
          >
            —
          </span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            style={{
              width: "90px",
              padding: "9px 12px",
              border: "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
              borderRadius: "var(--RADIUS-SELECT, 22px)",
              fontFamily:
                "var(--FONT-STACK-BODY, var(--font-libre-franklin), 'Libre Franklin', sans-serif)",
              fontSize: "14px",
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
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* ══════════════════════════════════
          PAGE HEADER
          ══════════════════════════════════ */}
      <div
        style={{
          backgroundColor: "var(--COLOR-BG, #ffffff)",
          borderBottom: "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
          paddingTop: isMobile ? "90px" : "110px",
          paddingBottom: "28px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: isMobile ? "0 16px" : "0 50px",
          }}
        >
          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 mb-4"
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
            <span
              style={{ color: "var(--COLOR-TEXT, #212121)" }}
            >
              {t("shop.title")}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily:
                "var(--FONT-STACK-HEADING, var(--font-cardo), Cardo, serif)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--COLOR-TEXT-DARK, #000000)",
              fontSize: isMobile ? "28px" : "36px",
              marginBottom: "8px",
            }}
          >
            {t("shop.title")}
          </h1>
          <p
            style={{
              fontFamily:
                "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
              fontSize: "15px",
              color: "var(--COLOR-TEXT-LIGHT, #646464)",
            }}
          >
            {filteredProducts.length} beautiful arrangements
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════
          TOOLBAR
          ══════════════════════════════════ */}
      <div
        style={{
          backgroundColor: "var(--COLOR-BG, #ffffff)",
          borderBottom: "1px solid var(--COLOR-BORDER-HAIRLINE, #f7f7f7)",
          position: "sticky",
          top: "var(--menu-height, 62px)",
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: isMobile ? "12px 16px" : "12px 50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {/* Left: Filter toggle + View mode */}
          <div
            className="flex items-center gap-2"
            style={{ flexShrink: 0 }}
          >
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="inline-flex items-center gap-2"
              style={{
                fontFamily:
                  "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                fontSize: "var(--BTN-FONT-SIZE, 13px)",
                fontWeight: "var(--BTN-FONT-WEIGHT, 500)",
                letterSpacing: "var(--BTN-LETTER-SPACING, 0.1em)",
                textTransform: "uppercase",
                padding: "9px 18px",
                borderRadius: "var(--RADIUS, 300px)",
                backgroundColor: hasActiveFilters
                  ? "var(--COLOR-PRIMARY, #da798a)"
                  : "transparent",
                color: hasActiveFilters
                  ? "var(--COLOR-PRIMARY-OPPOSITE, #ffffff)"
                  : "var(--COLOR-TEXT, #212121)",
                border: hasActiveFilters
                  ? "1px solid var(--COLOR-PRIMARY, #da798a)"
                  : "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                if (!hasActiveFilters) {
                  e.currentTarget.style.borderColor =
                    "var(--COLOR-PRIMARY, #da798a)";
                  e.currentTarget.style.color =
                    "var(--COLOR-PRIMARY, #da798a)";
                }
              }}
              onMouseLeave={(e) => {
                if (!hasActiveFilters) {
                  e.currentTarget.style.borderColor =
                    "var(--COLOR-BORDER, rgb(240,240,240))";
                  e.currentTarget.style.color =
                    "var(--COLOR-TEXT, #212121)";
                }
              }}
            >
              <SlidersHorizontal
                style={{ width: "14px", height: "14px" }}
              />
              {t("shop.filters")}
            </button>

            {/* View mode toggle (desktop only) */}
            {!isMobile && (
              <div
                className="flex items-center overflow-hidden"
                style={{
                  border: "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
                  borderRadius: "10px",
                }}
              >
                <button
                  onClick={() => setViewMode("grid")}
                  style={{
                    padding: "8px 10px",
                    background: viewMode === "grid"
                      ? "var(--COLOR-PRIMARY, #da798a)"
                      : "transparent",
                    color:
                      viewMode === "grid"
                        ? "#ffffff"
                        : "var(--COLOR-TEXT-LIGHT, #646464)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Grid3X3
                    style={{ width: "16px", height: "16px" }}
                  />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  style={{
                    padding: "8px 10px",
                    background: viewMode === "list"
                      ? "var(--COLOR-PRIMARY, #da798a)"
                      : "transparent",
                    color:
                      viewMode === "list"
                        ? "#ffffff"
                        : "var(--COLOR-TEXT-LIGHT, #646464)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    transition: "all 0.2s ease",
                  }}
                >
                  <List
                    style={{ width: "16px", height: "16px" }}
                  />
                </button>
              </div>
            )}
          </div>

          {/* Right: Search */}
          <div
            style={{
              position: "relative",
              width: isMobile ? "100%" : "280px",
              flexShrink: isMobile ? 1 : 0,
              order: isMobile ? 10 : 0,
            }}
          >
            <Search
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "16px",
                height: "16px",
                color: "var(--COLOR-TEXT-LIGHT, #646464)",
                pointerEvents: "none",
              }}
            />
            <input
              placeholder="Search flowers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 36px 10px 40px",
                border: "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
                borderRadius: "var(--RADIUS, 300px)",
                fontFamily:
                  "var(--FONT-STACK-BODY, var(--font-libre-franklin), 'Libre Franklin', sans-serif)",
                fontSize: "14px",
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
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  padding: "4px",
                  cursor: "pointer",
                  color: "var(--COLOR-TEXT-LIGHT, #646464)",
                  display: "flex",
                }}
              >
                <X
                  style={{ width: "14px", height: "14px" }}
                />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          MAIN CONTENT
          ══════════════════════════════════ */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile ? "24px 16px 60px" : "32px 50px 80px",
          display: "flex",
          gap: isMobile ? "0" : "40px",
        }}
      >
        {/* ── Desktop Sidebar ── */}
        {!isMobile && (
          <AnimatePresence initial={false}>
            {filtersOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease }}
                style={{
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <div style={{ width: "280px" }}>
                  {filterContent}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        )}

        {/* ── Product Grid / List ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Active filter pills row (mobile) */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-6 lg:hidden">
              {selectedCategory !== "all" && (
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5"
                  style={{
                    backgroundColor:
                      "var(--COLOR-SALE-BG, #f9dee5)",
                    color: "var(--COLOR-SALE-TEXT, #af7b88)",
                    borderRadius: "var(--RADIUS, 300px)",
                    fontFamily:
                      "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                    fontSize: "11px",
                    fontWeight: 600,
                  }}
                >
                  {shopCategories.find(
                    (c) => c.slug === selectedCategory
                  )?.name || selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("all")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "0",
                      color: "inherit",
                      display: "flex",
                    }}
                  >
                    <X style={{ width: "12px", height: "12px" }} />
                  </button>
                </span>
              )}
              {selectedOccasion !== "all" && (
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5"
                  style={{
                    backgroundColor:
                      "var(--COLOR-SALE-BG, #f9dee5)",
                    color: "var(--COLOR-SALE-TEXT, #af7b88)",
                    borderRadius: "var(--RADIUS, 300px)",
                    fontFamily:
                      "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                    fontSize: "11px",
                    fontWeight: 600,
                  }}
                >
                  {selectedOccasion.charAt(0).toUpperCase() + selectedOccasion.slice(1)}
                  <button
                    onClick={() => setSelectedOccasion("all")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "0",
                      color: "inherit",
                      display: "flex",
                    }}
                  >
                    <X style={{ width: "12px", height: "12px" }} />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5"
                  style={{
                    backgroundColor:
                      "var(--COLOR-SALE-BG, #f9dee5)",
                    color: "var(--COLOR-SALE-TEXT, #af7b88)",
                    borderRadius: "var(--RADIUS, 300px)",
                    fontFamily:
                      "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                    fontSize: "11px",
                    fontWeight: 600,
                  }}
                >
                  &ldquo;{searchQuery}&rdquo;
                  <button
                    onClick={() => setSearchQuery("")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "0",
                      color: "inherit",
                      display: "flex",
                    }}
                  >
                    <X style={{ width: "12px", height: "12px" }} />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* ── GRID VIEW ── */}
          {viewMode === "grid" && (
            <div
              className="grid"
              style={{
                gridTemplateColumns: isMobile
                  ? "repeat(2, 1fr)"
                  : isTablet
                    ? "repeat(2, 1fr)"
                    : "repeat(3, 1fr)",
                gap: isMobile
                  ? "16px"
                  : isTablet
                    ? "20px"
                    : "var(--LAYOUT-GUTTER, 32px)",
              }}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: (index % 6) * 0.06,
                    ease,
                  }}
                >
                  <ProductCard
                    product={product}
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* ── LIST VIEW ── */}
          {viewMode === "list" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: isMobile
                  ? "14px"
                  : "16px",
              }}
            >
              {filteredProducts.map((product, index) => (
                <ListCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div
              className="text-center"
              style={{ padding: "80px 20px" }}
            >
              <Flower2
                style={{
                  width: "48px",
                  height: "48px",
                  color: "var(--COLOR-BORDER-DARK, #bdbdbd)",
                  margin: "0 auto 20px",
                  display: "block",
                }}
              />
              <h3
                style={{
                  fontFamily:
                    "var(--FONT-STACK-HEADING, var(--font-cardo), Cardo, serif)",
                  fontSize: "22px",
                  fontWeight: 400,
                  color: "var(--COLOR-TEXT-DARK, #000000)",
                  marginBottom: "10px",
                }}
              >
                No flowers found
              </h3>
              <p
                style={{
                  fontFamily:
                    "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
                  fontSize: "15px",
                  color: "var(--COLOR-TEXT-LIGHT, #646464)",
                  marginBottom: "24px",
                  lineHeight: "1.7",
                }}
              >
                Try adjusting your filters or search term to find
                what you&apos;re looking for.
              </p>
              <button
                onClick={clearFilters}
                style={{
                  fontFamily:
                    "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                  fontSize: "var(--BTN-FONT-SIZE, 13px)",
                  fontWeight: "var(--BTN-FONT-WEIGHT, 500)",
                  letterSpacing: "var(--BTN-LETTER-SPACING, 0.1em)",
                  textTransform: "uppercase",
                  padding: "13px 32px",
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
                {t("shop.clear")}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════
          MOBILE FILTER DRAWER
          ══════════════════════════════════ */}
      <AnimatePresence>
        {isMobile && filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setFiltersOpen(false)}
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
                width: "340px",
                maxWidth: "88vw",
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
                  position: "sticky",
                  top: 0,
                  backgroundColor:
                    "var(--COLOR-MENU-BG, #ffffff)",
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                    fontSize: "14px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--COLOR-TEXT-DARK, #000000)",
                  }}
                >
                  {t("shop.filters")}
                </span>
                <button
                  onClick={() => setFiltersOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "8px",
                    cursor: "pointer",
                    color: "var(--COLOR-TEXT, #212121)",
                    display: "flex",
                  }}
                >
                  <X
                    style={{
                      width: "22px",
                      height: "22px",
                    }}
                  />
                </button>
              </div>

              <div
                style={{
                  padding: "8px 24px 32px",
                  flex: 1,
                }}
              >
                {filterContent}
              </div>

              <div
                style={{
                  padding: "20px 24px",
                  borderTop:
                    "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
                  position: "sticky",
                  bottom: 0,
                  backgroundColor:
                    "var(--COLOR-MENU-BG, #ffffff)",
                }}
              >
                <button
                  onClick={() => setFiltersOpen(false)}
                  style={{
                    width: "100%",
                    fontFamily:
                      "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                    fontSize: "var(--BTN-FONT-SIZE, 13px)",
                    fontWeight:
                      "var(--BTN-FONT-WEIGHT, 500)",
                    letterSpacing:
                      "var(--BTN-LETTER-SPACING, 0.1em)",
                    textTransform: "uppercase",
                    padding: "14px 24px",
                    borderRadius:
                      "var(--RADIUS, 300px)",
                    backgroundColor:
                      "var(--BTN-PRIMARY-BG-COLOR, #e78596)",
                    color: "var(--BTN-PRIMARY-TEXT-COLOR, #ffffff)",
                    border: "2px solid var(--BTN-PRIMARY-BG-COLOR, #e78596)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--BTN-PRIMARY-BG-COLOR-BRIGHTER, #e37084)";
                    e.currentTarget.style.borderColor =
                      "var(--BTN-PRIMARY-BOC-COLOR-BRIGHTER, #e37084)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--BTN-PRIMARY-BG-COLOR, #e78596)";
                    e.currentTarget.style.borderColor =
                      "var(--BTN-PRIMARY-BG-COLOR, #e78596)";
                  }}
                >
                  Show {filteredProducts.length} Result
                  {filteredProducts.length !== 1 ? "s" : ""}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ══════════════════════════════════
   Page Wrapper
   ══════════════════════════════════ */
export default function ShopPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--COLOR-BG, #ffffff)",
      }}
    >
      <Navbar />
      <Suspense
        fallback={
          <div
            style={{
              paddingTop: "140px",
              textAlign: "center",
              fontFamily:
                "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
              fontSize: "15px",
              color: "var(--COLOR-TEXT-LIGHT, #646464)",
            }}
          >
            Loading...
          </div>
        }
      >
        <ShopContent />
      </Suspense>
      <Footer />
    </main>
  );
}
