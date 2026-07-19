"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import SectionHeader from "./SectionHeader";

const images = [
  "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=300&h=300&fit=croph=500https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=300&h=300&fit=cropfit=crop",
  "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400https://images.unsplash.com/photo-1566928401-5b9b77a6b8e7?w=300&h=300&fit=croph=500https://images.unsplash.com/photo-1566928401-5b9b77a6b8e7?w=300&h=300&fit=cropfit=crop",
  "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=300&h=300&fit=croph=500https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=300&h=300&fit=cropfit=crop",
  "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400https://images.unsplash.com/photo-1587578867323-1f9e0d42b17e?w=300&h=300&fit=croph=500https://images.unsplash.com/photo-1587578867323-1f9e0d42b17e?w=300&h=300&fit=cropfit=crop",
  "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400https://images.unsplash.com/photo-1591886960571-74d43a9e4166?w=300&h=300&fit=croph=500https://images.unsplash.com/photo-1591886960571-74d43a9e4166?w=300&h=300&fit=cropfit=crop",
  "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=300&h=300&fit=croph=500https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=300&h=300&fit=cropfit=crop",
];

export default function InstagramGallery() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Follow Us @sumanflorals"
          subtitle="Get inspired by our daily floral creations"
        />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
          {images.map((src, index) => (
            <motion.a
              key={index}
              href="https://instagram.com/sumanflorals"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <Image src={src} alt={`Instagram post ${index + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="150px" />
              <div className="absolute inset-0 bg-[#E91E63]/0 group-hover:bg-[#E91E63]/60 transition-colors flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
