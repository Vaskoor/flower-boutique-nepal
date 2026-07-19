"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Truck,
  Clock,
  Flower2,
  ShieldCheck,
  Headphones,
  Leaf,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SectionHeader from "./SectionHeader";

const features = [
  {
    icon: Truck,
    title: "Same-Day Delivery",
    desc: "Order before 2 PM across 11 cities in Nepal",
    stat: "11",
    statLabel: "Cities",
  },
  {
    icon: Flower2,
    title: "Farm Fresh",
    desc: "Hand-selected stems from local growers daily",
    stat: "70%",
    statLabel: "Local",
  },
  {
    icon: ShieldCheck,
    title: "Freshness Guarantee",
    desc: "Free replacement within 24 hours, no questions",
    stat: "24h",
    statLabel: "Policy",
  },
  {
    icon: Clock,
    title: "Live Tracking",
    desc: "Real-time SMS and email alerts on every order",
    stat: "Live",
    statLabel: "Tracking",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Nepali-speaking team, always a message away",
    stat: "24/7",
    statLabel: "Care",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious",
    desc: "Zero plastic, biodegradable wraps only",
    stat: "Zero",
    statLabel: "Plastic",
  },
];

function FeatureCard({
  feature,
  index,
  isActive,
  onClick,
}: {
  feature: (typeof features)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-400
        ${isActive
          ? "bg-white shadow-[0_4px_24px_rgba(233,30,99,0.10)] ring-1 ring-[#E91E63]/15"
          : "bg-white/50 border border-[#F0E0E5]/60 hover:border-[#E91E63]/20 hover:bg-white hover:shadow-soft"
        }
        group
      `}
    >
      <div className="relative p-5 sm:p-6">
        {/* Compact top row */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`
              w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300
              ${isActive
                ? "bg-[#E91E63] shadow-md shadow-[#E91E63]/20"
                : "bg-[#E91E63]/8 group-hover:bg-[#E91E63]/12"
              }
            `}
          >
            <feature.icon
              className={`w-5 h-5 transition-colors duration-300 ${
                isActive ? "text-white" : "text-[#E91E63]"
              }`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-[15px] text-[#222222] leading-tight">
              {feature.title}
            </h3>
          </div>
          <div className="text-right shrink-0 pl-2">
            <span className="block text-lg font-bold text-[#E91E63] leading-none">
              {feature.stat}
            </span>
            <span className="text-[10px] text-[#777777] uppercase tracking-wider">
              {feature.statLabel}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[13px] text-[#777777] leading-relaxed pl-[52px]">
          {feature.desc}
        </p>

        {/* Subtle bottom accent on active */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E91E63]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ originX: 0 }}
        />
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentActive = hoveredIndex !== null ? hoveredIndex : activeIndex;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -280 : 280,
        behavior: "smooth",
      });
    }
  };

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Why Choose Us"
          subtitle="Trusted by 25,000+ customers across Nepal since 2018"
        />

        {/* Desktop & Tablet: Compact Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <FeatureCard
                feature={feature}
                index={index}
                isActive={currentActive === index}
                onClick={() => setActiveIndex(index)}
              />
            </div>
          ))}
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="sm:hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#777777]">
              Swipe to explore
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => scroll("left")}
                className="w-7 h-7 rounded-full bg-[#FFF9FB] border border-[#F0E0E5] flex items-center justify-center active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-[#777777]" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-7 h-7 rounded-full bg-[#FFF9FB] border border-[#F0E0E5] flex items-center justify-center active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-3.5 h-3.5 text-[#777777]" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="snap-start shrink-0 w-[78vw] max-w-[300px]"
              >
                <FeatureCard
                  feature={feature}
                  index={index}
                  isActive={currentActive === index}
                  onClick={() => setActiveIndex(index)}
                />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  scrollRef.current?.scrollTo({
                    left: index * 300,
                    behavior: "smooth",
                  });
                }}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === index
                    ? "w-5 h-1.5 bg-[#E91E63]"
                    : "w-1.5 h-1.5 bg-[#E91E63]/20"
                }`}
                aria-label={`Feature ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Compact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-8 sm:mt-10 text-center"
        >
          <a
            href="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E91E63] text-white rounded-xl text-sm font-medium hover:bg-[#C2185B] active:scale-95 transition-all shadow-md shadow-[#E91E63]/15"
          >
            Shop Now <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}