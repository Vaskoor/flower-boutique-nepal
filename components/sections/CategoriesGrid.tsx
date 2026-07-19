"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { categories } from "@/lib/data";
import { useTranslation } from "@/lib/useTranslation";

export default function CategoriesGrid() {
  const { t } = useTranslation();
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title={t("categories.title")}
          subtitle={t("categories.subtitle")}
          link={{ href: "/shop", label: t("categories.viewAll") }}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link href={`/shop?category=${category.slug}`} className="group block">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                    <p className="text-white/80 text-sm">{category.count} products</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
