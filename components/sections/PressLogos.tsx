"use client";
import { motion } from "framer-motion";

const pressLogos = [
  "The Kathmandu Post",
  "Himalayan Times",
  "Republica",
  "Ekantipur",
  "Setopati",
  "Nagarik",
];

export default function PressLogos() {
  return (
    <section
      className="py-5 border-t border-b"
      style={{
        backgroundColor: "var(--COLOR-PRIMARY, #da798a)",
        borderColor: "transparent",
      }}
    >
      <div className="container">
        <p
          className="text-center text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "#ffffff", fontFamily: "var(--BTN-FONT-STACK, 'DM Sans', sans-serif)" }}
        >
          As Featured In
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {pressLogos.map((logo, index) => (
            <motion.span
              key={logo}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.06,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-sm md:text-base font-bold uppercase tracking-wider select-none"
              style={{
                color: "#ffffff",
                opacity: 0.85,
                fontFamily: "var(--FONT-STACK-HEADING, Cardo, serif)",
                letterSpacing: "0.06em",
              }}
              whileHover={{ opacity: 1, scale: 1.04 }}
            >
              {logo}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}