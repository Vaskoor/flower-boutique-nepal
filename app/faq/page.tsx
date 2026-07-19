"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, HelpCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/data";
import { useTranslation } from "@/lib/useTranslation";

const categories = ["All", "Delivery", "Products", "Payment", "Returns", "Corporate", "Orders", "Sustainability"];

export default function FAQPage() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <HelpCircle className="w-12 h-12 text-[#E91E63] mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-[#222222] mb-4">Frequently Asked Questions</h1>
            <p className="text-[#777777]">Find answers to common questions about our flowers, delivery, and services</p>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
            <Input placeholder="Search questions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-11" />
          </div>

          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${activeCategory === cat ? "bg-[#E91E63] text-white" : "bg-white text-[#777777] hover:bg-[#E91E63]/10"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Accordion type="single" collapsible className="space-y-3">
              {filteredFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="bg-white rounded-xl px-6 border-none shadow-sm">
                  <AccordionTrigger className="text-left font-medium text-[#222222] hover:text-[#E91E63] py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#777777] pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {filteredFaqs.length === 0 && (
              <p className="text-center text-[#777777] py-8">No questions found matching your search.</p>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
