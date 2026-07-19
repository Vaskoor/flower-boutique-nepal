"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function FestivalBanner() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400https://images.unsplash.com/photo-1563241527-3004b7be0ee9?w=1200&h=500&fit=croph=500https://images.unsplash.com/photo-1563241527-3004b7be0ee9?w=1200&h=500&fit=cropfit=crop"
              alt="Festival flowers"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#C2185B]/90 to-[#E91E63]/70" />
          </div>
          <div className="relative py-16 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm mb-4">Festival Collection</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Dashain & Tihar Specials</h2>
              <p className="text-white/90 max-w-lg">Traditional marigold garlands, makhamali, and godawari sets. Celebrate Nepal's biggest festivals with authentic floral arrangements.</p>
            </div>
            <Link href="/shop?category=festivals">
              <Button variant="secondary" size="lg" className="gap-2 bg-white text-[#E91E63] hover:bg-white/90">
                Shop Festival Flowers <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
