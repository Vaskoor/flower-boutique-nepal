"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const testimonials = [
  {
    id: 1,
    name: "Aarati Shrestha",
    location: "Kathmandu",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    comment:
      "I ordered a red rose bouquet for my husband's birthday and it arrived absolutely stunning. The flowers were so fresh — you could smell them through the box! Best floral service in KTM.",
    rating: 5,
    occasion: "Birthday",
  },
  {
    id: 2,
    name: "Rajesh Thapa",
    location: "Pokhara",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    comment:
      "Sent marigold garlands to my family in Pokhara for Tihar. They arrived next-day in perfect condition. My mother said they were the most beautiful malas she's ever seen. Will definitely order again.",
    rating: 5,
    occasion: "Tihar",
  },
  {
    id: 3,
    name: "Sneha Maharjan",
    location: "Lalitpur",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    comment:
      "We used Phool Nepal for our wedding reception — 20 table centerpieces and 6 bridal bouquets. Everything was beyond our expectations. The team was so patient with all our changes!",
    rating: 5,
    occasion: "Wedding",
  },
  {
    id: 4,
    name: "Bikash Gurung",
    location: "Chitwan",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    comment:
      "I wanted to surprise my girlfriend on our anniversary while I was abroad. The team arranged a midnight delivery with a handwritten card. She was in tears — thank you for making it possible!",
    rating: 5,
    occasion: "Anniversary",
  },
  {
    id: 5,
    name: "Priya Tamang",
    location: "Bhaktapur",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    comment:
      "The cake and flower combo was such a great deal. Both the chocolate cake and the lily arrangement were top quality. My friend loved her birthday surprise. Highly recommend this combo!",
    rating: 4,
    occasion: "Birthday",
  },
  {
    id: 6,
    name: "Sujan Karki",
    location: "Biratnagar",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    comment:
      "Ordered a Lali Gurans tribute arrangement for my father's memorial. It was handled with so much care and respect. The flowers were fresh and the arrangement was dignified. Thank you.",
    rating: 5,
    occasion: "Memorial",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          style={{
            width: "14px",
            height: "14px",
            color:
              i < count
                ? "var(--COLOR-PRIMARY, #da798a)"
                : "var(--COLOR-BORDER, #f0f0f0)",
            fill:
              i < count
                ? "var(--COLOR-PRIMARY, #da798a)"
                : "none",
            strokeWidth: i < count ? 0 : 1.5,
          }}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    setVisibleCount(isMobile ? 1 : 3);
  }, [isMobile]);

  const visible = testimonials.slice(0, visibleCount);
  const hasMore = visibleCount < testimonials.length;

  return (
    <section
      style={{
        backgroundColor: "var(--COLOR-BG, #ffffff)",
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
          className="text-center mb-14"
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
            Testimonials
          </span>
          <h2
            style={{
              fontFamily:
                "var(--FONT-STACK-HEADING, var(--font-cardo), Cardo, serif)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--COLOR-TEXT-DARK, #000000)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              marginBottom: "16px",
            }}
          >
            Words from{" "}
            <em
              style={{
                color: "var(--COLOR-PRIMARY, #da798a)",
                fontStyle: "italic",
              }}
            >
              Happy Hearts
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
              maxWidth: "520px",
            }}
          >
            Real stories from real customers across Nepal who trusted us
            with their most special moments
          </p>
        </motion.div>

        {/* ── Testimonial Cards ── */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${isMobile ? 1 : 3}, 1fr)`,
            gap: isMobile ? "16px" : "var(--LAYOUT-GUTTER, 32px)",
          }}
        >
          {visible.map((testimonial, index) => {
            const isHovered = hoveredCard === testimonial.id;

            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease,
                }}
                onMouseEnter={() => setHoveredCard(testimonial.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "20px",
                  padding: isMobile ? "28px 24px" : "36px 32px",
                  border: isHovered
                    ? "1px solid var(--COLOR-PRIMARY, #da798a)"
                    : "1px solid var(--COLOR-BORDER, rgb(240,240,240))",
                  boxShadow: isHovered
                    ? "0 16px 48px rgba(218,121,138,0.1), 0 4px 12px rgba(0,0,0,0.04)"
                    : "0 2px 10px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02)",
                  transform: isHovered
                    ? "translateY(-4px)"
                    : "translateY(0)",
                  transition:
                    "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* ── Top row: Quote icon + Occasion tag ── */}
                <div
                  className="flex items-start justify-between mb-5"
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      backgroundColor:
                        "var(--COLOR-PRIMARY-FADE, rgba(218,121,138,0.05))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Quote
                      style={{
                        width: "20px",
                        height: "20px",
                        color:
                          "var(--COLOR-PRIMARY, #da798a)",
                        opacity: 0.6,
                        fill: "var(--COLOR-PRIMARY, #da798a)",
                        fillOpacity: 0.15,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily:
                        "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color:
                        "var(--COLOR-SALE-TEXT, #af7b88)",
                      backgroundColor:
                        "var(--COLOR-SALE-BG, #f9dee5)",
                      padding: "4px 12px",
                      borderRadius:
                        "var(--RADIUS, 300px)",
                    }}
                  >
                    {testimonial.occasion}
                  </span>
                </div>

                {/* ── Stars ── */}
                <div className="mb-4">
                  <StarRating count={testimonial.rating} />
                </div>

                {/* ── Comment ── */}
                <p
                  className="flex-1 mb-6"
                  style={{
                    fontFamily:
                      "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color:
                      "var(--COLOR-TEXT, #212121)",
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{testimonial.comment}&rdquo;
                </p>

                {/* ── Divider ── */}
                <div
                  style={{
                    height: "1px",
                    backgroundColor:
                      "var(--COLOR-BORDER-HAIRLINE, #f7f7f7)",
                    marginBottom: "18px",
                  }}
                />

                {/* ── Author row ── */}
                <div
                  className="flex items-center gap-3"
                >
                  <div
                    className="relative shrink-0"
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "2px solid var(--COLOR-PRIMARY-LIGHT, #fdeff2)",
                    }}
                  >
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      style={{ borderRadius: 0 }}
                      sizes="44px"
                    />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily:
                          "var(--FONT-STACK-HEADING, var(--font-cardo), Cardo, serif)",
                        fontSize: "15px",
                        fontWeight: 400,
                        color:
                          "var(--COLOR-TEXT-DARK, #000000)",
                        lineHeight: 1.3,
                      }}
                    >
                      {testimonial.name}
                    </p>
                    <p
                      style={{
                        fontFamily:
                          "var(--FONT-STACK-PARA, var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif)",
                        fontSize: "12px",
                        color:
                          "var(--COLOR-TEXT-LIGHT, #646464)",
                      }}
                    >
                      {testimonial.location}, Nepal
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Load More Button ── */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="text-center mt-12"
          >
            <button
              onClick={() =>
                setVisibleCount((prev) =>
                  Math.min(prev + 3, testimonials.length)
                )
              }
              className="inline-flex items-center gap-2"
              style={{
                fontFamily:
                  "var(--FONT-STACK-BUTTON, var(--font-dm-sans), 'DM Sans', sans-serif)",
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
                cursor: "pointer",
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
              Read More Reviews
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}