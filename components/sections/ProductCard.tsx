"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useWishlist, useCart } from "@/lib/context";
import type { Product } from "@/lib/data";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const liked = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      size: product.sizes[0]?.label || "Standard",
      wrapping: product.wrappingOptions[0]?.label || "Standard",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-500">
        {/* Image */}
        <Link href={`/product/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge className="bg-[#4CAF50]">New</Badge>}
            {product.isBestseller && <Badge className="bg-[#E91E63]">Best Seller</Badge>}
            {product.originalPrice && (
              <Badge variant="secondary" className="bg-[#FFD700] text-[#222222]">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>
          {/* Quick actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product.id);
              }}
              className={`w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center transition-colors ${
                liked ? "text-[#E91E63]" : "hover:bg-[#E91E63] hover:text-white"
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            </button>
          </div>
          {/* Quick add */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button onClick={handleAddToCart} className="w-full gap-2">
              <ShoppingBag className="w-4 h-4" /> Quick Add
            </Button>
          </div>
        </Link>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" />
            <span className="text-xs text-[#777777]">{product.rating} ({product.reviewCount})</span>
          </div>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-medium text-[#222222] group-hover:text-[#E91E63] transition-colors line-clamp-1">{product.name}</h3>
          </Link>
          <p className="text-xs text-[#777777] mt-0.5">{product.deliveryTime} Delivery</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-semibold text-[#E91E63]">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-[#777777] line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
