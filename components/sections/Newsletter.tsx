"use client";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#E91E63] to-[#C2185B]">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Mail className="w-12 h-12 text-white/80 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Stay Blooming</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Subscribe to our newsletter for exclusive offers, seasonal collections, and floral inspiration delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="h-12 bg-white/20 border-white/30 text-white placeholder:text-white/60"
            />
            <Button className="h-12 bg-white text-[#E91E63] hover:bg-white/90 gap-2">
              Subscribe <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-white/60 text-xs mt-4">No spam, ever. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}
