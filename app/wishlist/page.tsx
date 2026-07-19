"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/sections/ProductCard";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/lib/context";
import { products } from "@/lib/data";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const wishlistItems = products.filter((p) => wishlist.includes(p.id));

  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#222222]">My Wishlist</h1>
              <p className="text-[#777777]">{wishlistItems.length} items saved</p>
            </div>
            <Link href="/shop">
              <Button variant="outline" className="gap-2">
                <ArrowRight className="w-4 h-4 rotate-180" /> Continue Shopping
              </Button>
            </Link>
          </div>

          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 text-[#F0E0E5] mx-auto mb-4" />
              <p className="text-lg text-[#777777] mb-4">Your wishlist is empty</p>
              <Link href="/shop"><Button>Start Shopping</Button></Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
