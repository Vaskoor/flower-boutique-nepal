"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Flower2,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  ChevronDown,
  Heart,
  Truck,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/useTranslation";

/* ── Mobile accordion for link columns ── */
function FooterAccordion({
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
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full py-3 lg:hidden group/acc"
        aria-expanded={open}
      >
        <span
          className="text-[13px] font-semibold tracking-[0.1em] uppercase"
          style={{ color: "var(--COLOR-FOOTER-TEXT, #212121)" }}
        >
          {title}
        </span>
        <ChevronDown
          className="w-4 h-4 transition-transform duration-300"
          style={{
            color: "var(--COLOR-FOOTER-TEXT-A75, rgba(33,33,33,0.75))",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      <h4
        className="hidden lg:block text-[13px] font-semibold tracking-[0.1em] uppercase mb-5"
        style={{
          color: "var(--COLOR-FOOTER-TEXT, #212121)",
          fontFamily: "var(--BTN-FONT-STACK, 'DM Sans', sans-serif)",
        }}
      >
        {title}
      </h4>

      <div className="hidden lg:block">{children}</div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <div className="pb-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Link with sliding underline ── */
function FooterLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`relative inline-block leading-relaxed group/lnk transition-colors duration-300 ${className}`}
      style={{ color: "var(--COLOR-FOOTER-TEXT-A75, rgba(33,33,33,0.75))" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.color =
          "var(--COLOR-PRIMARY, #da798a)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.color =
          "var(--COLOR-FOOTER-TEXT-A75, rgba(33,33,33,0.75))")
      }
    >
      {children}
      <span
        className="absolute bottom-0 left-0 h-[1.5px] w-0 group-hover/lnk:w-full transition-all duration-300 ease-out"
        style={{ backgroundColor: "var(--COLOR-PRIMARY, #da798a)" }}
      />
    </Link>
  );
}

/* ── Social icon (circle border style matching CSS) ── */
function SocialIcon({
  icon: Icon,
  href,
  label,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  href: string;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        border: `1px solid ${hovered ? "var(--COLOR-PRIMARY, #da798a)" : "var(--COLOR-FOOTER-BORDER, #212121)"}`,
        color: hovered ? "#ffffff" : "var(--COLOR-FOOTER-TEXT, #212121)",
        backgroundColor: hovered ? "var(--COLOR-PRIMARY, #da798a)" : "transparent",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <Icon className="w-[16px] h-[16px]" />
    </a>
  );
}

/* ── Payment badge ── */
function PaymentBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center justify-center px-2.5 py-1 rounded text-[10px] font-bold tracking-wide"
      style={{
        backgroundColor: "#ffffff",
        color: "var(--COLOR-TEXT-LIGHT, #646464)",
        border: "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
        fontFamily: "var(--BTN-FONT-STACK, 'DM Sans', sans-serif)",
      }}
    >
      {label}
    </span>
  );
}

/* ── Trust pill ── */
function TrustPill({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2.5 py-2.5">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{
          backgroundColor: "var(--COLOR-PRIMARY-FADE, rgba(218,121,138,0.05))",
          color: "var(--COLOR-PRIMARY, #da798a)",
        }}
      >
        <Icon className="w-[15px] h-[15px]" />
      </div>
      <span
        className="text-[13px] leading-snug"
        style={{
          color: "var(--COLOR-FOOTER-TEXT-A75, rgba(33,33,33,0.75))",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {text}
      </span>
    </div>
  );
}

/* ══════════════════════════════════
   Footer
   ══════════════════════════════════ */
export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      className="relative"
      style={{
        backgroundColor: "var(--COLOR-FOOTER-BG-ACCENT, #fceced)",
        paddingTop: "57px",
        paddingBottom: "65px",
      }}
    >
      {/* Top gradient accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--COLOR-PRIMARY, #da798a) 50%, transparent 100%)",
          opacity: 0.5,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-10 gap-x-8 lg:gap-x-6 mb-14">
          {/* ── Brand Column ── */}
          <div className="lg:col-span-4 lg:pr-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-5 group/brand"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: "var(--COLOR-PRIMARY, #da798a)",
                  color: "#ffffff",
                }}
              >
                <Flower2 className="w-[16px] h-[16px]" />
              </div>
              <span
                className="text-[22px] tracking-tight"
                style={{
                  fontFamily: "var(--FONT-STACK-HEADING, Cardo, serif)",
                  fontWeight: 700,
                  color: "var(--COLOR-FOOTER-TEXT, #212121)",
                }}
              >
                Phool Nepal
              </span>
            </Link>

            <p
              className="text-sm leading-[1.8] mb-6 max-w-[300px]"
              style={{
                color:
                  "var(--COLOR-FOOTER-TEXT-A75, rgba(33,33,33,0.75))",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {t("footer.brand")}
            </p>

            {/* Trust pills */}
            <div className="mb-6 space-y-0">
              <TrustPill icon={Truck} text="Same-day delivery in KTM Valley" />
              <TrustPill icon={ShieldCheck} text="Freshness guaranteed or refund" />
              <TrustPill icon={Clock} text="Orders before 12 PM dispatched same day" />
            </div>

            <div className="flex gap-2.5">
              <SocialIcon icon={Facebook} href="#" label="Facebook" />
              <SocialIcon icon={Instagram} href="#" label="Instagram" />
              <SocialIcon icon={Youtube} href="#" label="YouTube" />
            </div>
          </div>

          {/* ── Shop Column ── */}
          <div className="lg:col-span-2">
            <FooterAccordion title={t("footer.quickLinks")} defaultOpen>
              <ul className="space-y-3 text-sm">
                <li>
                  <FooterLink href="/shop">{t("footer.shopAll")}</FooterLink>
                </li>
                <li>
                  <FooterLink href="/shop?cat=bouquets">
                    Bouquets
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/shop?cat=boxes">
                    Flower Boxes
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/shop?cat=garlands">
                    Garlands & Mala
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/shop?cat=plants">
                    Plant Gifts
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/shop?cat=combos">
                    Cake Combos
                  </FooterLink>
                </li>
              </ul>
            </FooterAccordion>
          </div>

          {/* ── Occasions Column ── */}
          <div className="lg:col-span-2">
            <FooterAccordion title="Occasions">
              <ul className="space-y-3 text-sm">
                <li>
                  <FooterLink href="/shop?occasion=birthday">
                    {t("footer.birthday")}
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/shop?occasion=anniversary">
                    {t("footer.anniversary")}
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/shop?occasion=dashain">
                    Dashain Special
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/shop?occasion=tihar">
                    Tihar / Deepawali
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/shop?occasion=teej">
                    Teej
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/shop?occasion=wedding">
                    Wedding
                  </FooterLink>
                </li>
              </ul>
            </FooterAccordion>
          </div>

          {/* ── Contact Column ── */}
          <div className="lg:col-span-2">
            <FooterAccordion title={t("footer.contactUs")}>
              <ul className="space-y-4 text-sm">
                <li
                  className="flex items-start gap-3"
                  style={{
                    color:
                      "var(--COLOR-FOOTER-TEXT-A75, rgba(33,33,33,0.75))",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  <MapPin
                    className="w-4 h-4 mt-[3px] shrink-0"
                    style={{ color: "var(--COLOR-PRIMARY, #da798a)", opacity: 0.6 }}
                  />
                  <span className="leading-relaxed">{t("footer.address")}</span>
                </li>
                <li>
                  <a
                    href={`tel:${t("footer.phone")}`}
                    className="flex items-center gap-3 transition-colors duration-300"
                    style={{
                      color:
                        "var(--COLOR-FOOTER-TEXT-A75, rgba(33,33,33,0.75))",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color =
                        "var(--COLOR-PRIMARY, #da798a)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        "var(--COLOR-FOOTER-TEXT-A75, rgba(33,33,33,0.75))")
                    }
                  >
                    <Phone
                      className="w-4 h-4 shrink-0"
                      style={{ color: "var(--COLOR-PRIMARY, #da798a)", opacity: 0.6 }}
                    />
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {t("footer.phone")}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${t("footer.email")}`}
                    className="flex items-center gap-3 transition-colors duration-300"
                    style={{
                      color:
                        "var(--COLOR-FOOTER-TEXT-A75, rgba(33,33,33,0.75))",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color =
                        "var(--COLOR-PRIMARY, #da798a)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        "var(--COLOR-FOOTER-TEXT-A75, rgba(33,33,33,0.75))")
                    }
                  >
                    <Mail
                      className="w-4 h-4 shrink-0"
                      style={{ color: "var(--COLOR-PRIMARY, #da798a)", opacity: 0.6 }}
                    />
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {t("footer.email")}
                    </span>
                  </a>
                </li>
              </ul>

              <div
                className="mt-5 pt-4 text-sm space-y-1"
                style={{
                  borderTop: "1px solid rgba(33,33,33,0.1)",
                  color: "var(--COLOR-FOOTER-TEXT-A35, rgba(33,33,33,0.35))",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                <p>{t("footer.hours")}</p>
                <p>{t("footer.hoursSat")}</p>
              </div>
            </FooterAccordion>
          </div>

          {/* ── Newsletter Column ── */}
          <div className="lg:col-span-2">
            <h4
              className="text-[13px] font-semibold tracking-[0.1em] uppercase mb-5"
              style={{
                color: "var(--COLOR-FOOTER-TEXT, #212121)",
                fontFamily: "var(--BTN-FONT-STACK, 'DM Sans', sans-serif)",
              }}
            >
              {t("footer.newsletter")}
            </h4>
            <p
              className="text-sm leading-[1.7] mb-4"
              style={{
                color:
                  "var(--COLOR-FOOTER-TEXT-A75, rgba(33,33,33,0.75))",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {t("footer.newsletterDesc")}
            </p>
            <div className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="h-11 text-sm"
                style={{
                  borderRadius: "var(--RADIUS, 300px)",
                  backgroundColor: "rgba(255,255,255,0.7)",
                  border: "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
                  color: "var(--COLOR-TEXT, #212121)",
                  fontFamily: "'Libre Franklin', sans-serif",
                  fontWeight: 300,
                }}
              />
              <button
                className="h-11 px-5 text-sm font-medium shrink-0 transition-all duration-300"
                style={{
                  borderRadius: "var(--RADIUS, 300px)",
                  backgroundColor: "var(--BTN-PRIMARY-BG-COLOR, #e78596)",
                  color: "var(--BTN-PRIMARY-TEXT-COLOR, #ffffff)",
                  fontFamily: "var(--BTN-FONT-STACK, 'DM Sans', sans-serif)",
                  fontSize: "var(--BTN-FONT-SIZE, 13px)",
                  fontWeight: "var(--BTN-FONT-WEIGHT, 500)",
                  letterSpacing: "var(--BTN-LETTER-SPACING, 0.1em)",
                  textTransform: "var(--BTN-UPPERCASE, uppercase) as uppercase",
                  border: `2px solid var(--BTN-PRIMARY-BG-COLOR, #e78596)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--BTN-PRIMARY-BG-COLOR-BRIGHTER, #e37084)";
                  e.currentTarget.style.borderColor =
                    "var(--BTN-PRIMARY-BG-COLOR-BRIGHTER, #e37084)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(218,121,138,0.35)";
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
                {t("newsletter.button")}
              </button>
            </div>
          </div>
        </div>

        {/* ── Payment Methods Row ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span
            className="text-[11px] uppercase tracking-widest mr-2"
            style={{
              color: "var(--COLOR-FOOTER-TEXT-A35, rgba(33,33,33,0.35))",
              fontFamily: "var(--BTN-FONT-STACK, 'DM Sans', sans-serif)",
              fontWeight: 600,
            }}
          >
            Pay With
          </span>
          <PaymentBadge label="eSewa" />
          <PaymentBadge label="Khalti" />
          <PaymentBadge label="IME Pay" />
          <PaymentBadge label="ConnectIPS" />
          <PaymentBadge label="Cash" />
        </div>

        {/* ── Bottom Bar ── */}
        <div
          className="pt-6 pb-2"
          style={{
            borderTop: "1px solid var(--COLOR-FOOTER-BORDER, #212121)",
            opacity: 0.25,
          }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p
              className="text-xs order-2 sm:order-1 flex items-center gap-1.5"
              style={{
                color:
                  "var(--COLOR-FOOTER-TEXT-A35, rgba(33,33,33,0.35))",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              © {new Date().getFullYear()} Phool Nepal. Made with
              <Heart
                className="w-3 h-3 inline"
                style={{ color: "var(--COLOR-PRIMARY, #da798a)" }}
                fill="var(--COLOR-PRIMARY, #da798a)"
              />
              in Kathmandu
            </p>
            <div className="flex items-center gap-4 order-1 sm:order-2">
              <FooterLink
                href="/privacy"
                className="text-xs"
              >
                {t("footer.privacy")}
              </FooterLink>
              <span
                className="text-xs"
                style={{
                  color:
                    "var(--COLOR-FOOTER-TEXT-A35, rgba(33,33,33,0.35))",
                }}
              >
                ·
              </span>
              <FooterLink
                href="/terms"
                className="text-xs"
              >
                {t("footer.terms")}
              </FooterLink>
              <span
                className="text-xs"
                style={{
                  color:
                    "var(--COLOR-FOOTER-TEXT-A35, rgba(33,33,33,0.35))",
                }}
              >
                ·
              </span>
              <FooterLink
                href="/shipping"
                className="text-xs"
              >
                {t("footer.shipping")}
              </FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}