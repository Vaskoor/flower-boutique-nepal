"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  link?: { href: string; label: string };
}

export default function SectionHeader({ title, subtitle, link }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-[#222222] mb-3">{title}</h2>
      {subtitle && <p className="text-[#777777] max-w-2xl mx-auto">{subtitle}</p>}
      {link && (
        <Link href={link.href} className="inline-flex items-center gap-2 text-[#E91E63] font-medium mt-4 hover:gap-3 transition-all">
          {link.label} <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </motion.div>
  );
}
