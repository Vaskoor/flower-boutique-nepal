"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Flower2, Heart, Leaf, Award, Users } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/sections/SectionHeader";
import { useTranslation } from "@/lib/useTranslation";

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="text-[#E91E63] font-medium text-sm tracking-wider uppercase">Our Story</span>
              <h1 className="text-4xl md:text-5xl font-bold text-[#222222] mt-3 mb-6 leading-tight">
                Bringing Joy Through Flowers Since 2018
              </h1>
              <p className="text-[#777777] leading-relaxed mb-6">
                Suman Florals began as a small flower stall in Thamel, Kathmandu, with a simple dream: to make premium floral arrangements accessible to every Nepali household. What started as a passion project has blossomed into Nepal's most trusted online flower boutique.
              </p>
              <p className="text-[#777777] leading-relaxed mb-6">
                Today, we deliver handcrafted bouquets across 11 cities in Nepal, from the bustling streets of Kathmandu to the serene lakeside of Pokhara. Our team of 25 expert florists works tirelessly to ensure every arrangement tells a story of love, celebration, and connection.
              </p>
              <div className="flex gap-8">
                <div>
                  <p className="text-3xl font-bold text-[#E91E63]">25K+</p>
                  <p className="text-sm text-[#777777]">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#E91E63]">11</p>
                  <p className="text-sm text-[#777777]">Cities Served</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#E91E63]">8</p>
                  <p className="text-sm text-[#777777]">Years of Service</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=800&h=1000&fit=crop" alt="Our flower shop" fill className="object-cover" sizes="50vw" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl">
                <Flower2 className="w-8 h-8 text-[#E91E63] mb-2" />
                <p className="font-bold text-[#222222]">Nepal's #1</p>
                <p className="text-sm text-[#777777]">Online Flower Boutique</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-[#FFF9FB] rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-[#222222] mb-4">Our Mission</h3>
              <p className="text-[#777777] leading-relaxed">To spread happiness and strengthen human connections through the timeless language of flowers. We strive to make every delivery a memorable experience, combining traditional Nepali floral artistry with modern convenience.</p>
            </div>
            <div className="bg-[#FFF9FB] rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-[#222222] mb-4">Our Vision</h3>
              <p className="text-[#777777] leading-relaxed">To become Nepal's most beloved floral brand, recognized for exceptional quality, sustainable practices, and heartfelt service. We envision a Nepal where no celebration is complete without a Suman Florals bouquet.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
