"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { occasions } from "@/lib/data";

export default function Occasions() {
  return (
    <section className="py-20 bg-[#FFF9FB]">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Flowers for Every Occasion"
          subtitle="Find the perfect bouquet for birthdays, anniversaries, festivals, and more"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {occasions.map((occasion, index) => (
            <motion.div
              key={occasion.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link href={`/shop?occasion=${occasion.slug}`} className="group block">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
                  <Image
                    src={occasion.image}
                    alt={occasion.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white font-semibold text-xl text-center px-4">{occasion.name}</h3>
                  </div>
                </div>
                <p className="text-sm text-[#777777] text-center group-hover:text-[#E91E63] transition-colors">{occasion.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
