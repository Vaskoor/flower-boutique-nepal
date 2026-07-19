// app/thank-you/page.tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <Navbar />
      <div className="pt-32 pb-16 flex items-center justify-center min-h-[70vh]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-[#4CAF50]" />
            </div>
            <h1 className="text-4xl font-bold text-[#222222] mb-4">Thank You! 🎉</h1>
            <p className="text-[#777777] text-lg mb-3">
              Your order has been placed successfully.
            </p>
            <p className="text-[#777777] mb-8">
              We&apos;ve sent a confirmation email with your order details.
              You will receive a delivery notification shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button className="gap-2 bg-[#E91E63] hover:bg-[#C2185B]">
                  <ShoppingBag className="w-4 h-4" /> Continue Shopping
                </Button>
              </Link>
              <Link href="/track-order">
                <Button variant="outline" className="gap-2">
                  Track Order <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}