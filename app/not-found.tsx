"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flower2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-[#FFF9FB] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-24 h-24 bg-[#E91E63]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Flower2 className="w-12 h-12 text-[#E91E63]" />
        </div>
        <h1 className="text-6xl font-bold text-[#E91E63] mb-2">404</h1>
        <h2 className="text-2xl font-bold text-[#222222] mb-4">Page Not Found</h2>
        <p className="text-[#777777] mb-8">
          Oops! It seems this page has wilted away. The bouquet you are looking for might have been moved or does not exist.
        </p>
        <Link href="/">
          <Button className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}
