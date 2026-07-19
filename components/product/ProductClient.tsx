"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, Share2, Truck, ShieldCheck, Clock, ChevronRight, Minus, Plus, ShoppingBag, Gift, Cake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/context";
import ProductCard from "@/components/sections/ProductCard";
import type { Product } from "@/lib/data";

interface ProductClientProps {
  product: Product;
  relatedProducts: Product[];
  reviews: any[];
}

export default function ProductClient({ product, relatedProducts, reviews }: ProductClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedWrap, setSelectedWrap] = useState(0);
  const [selectedRibbon, setSelectedRibbon] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "delivery">("details");
  const [addOns, setAddOns] = useState({ chocolate: false, teddy: false, cake: false, balloons: false });
  const { addToCart } = useCart();

  const currentPrice = product.sizes[selectedSize]?.price || product.price;

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white mb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <Image
                  src={product.images[selectedImage] || product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>
            {product.isNew && <Badge className="absolute top-4 left-4 bg-[#4CAF50]">New Arrival</Badge>}
            {product.originalPrice && (
              <Badge className="absolute top-4 right-4 bg-[#FFD700] text-[#222222]">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${selectedImage === i ? "border-[#E91E63]" : "border-transparent"}`}
              >
                <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-[#222222] mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-[#777777]">({product.reviewCount} reviews)</span>
                <span className="text-[#777777]">|</span>
                <span className={`text-sm ${product.inStock ? "text-[#4CAF50]" : "text-red-500"}`}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-[#F0E0E5] flex items-center justify-center hover:border-[#E91E63] hover:text-[#E91E63] transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full border border-[#F0E0E5] flex items-center justify-center hover:border-[#E91E63] hover:text-[#E91E63] transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-[#E91E63]">{formatPrice(currentPrice)}</span>
            {product.originalPrice && (
              <span className="text-xl text-[#777777] line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <p className="text-[#777777] leading-relaxed mb-6">{product.description}</p>

          {/* Size Selector */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Size</h4>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSize(i)}
                  className={`px-4 py-2 rounded-lg border text-sm transition-all ${selectedSize === i ? "border-[#E91E63] bg-[#E91E63]/5 text-[#E91E63] font-medium" : "border-[#F0E0E5] text-[#777777] hover:border-[#E91E63]"}`}
                >
                  {size.label} &mdash; {formatPrice(size.price)}
                </button>
              ))}
            </div>
          </div>

          {/* Wrapping Options */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Wrapping</h4>
            <div className="flex flex-wrap gap-2">
              {product.wrappingOptions.map((wrap, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedWrap(i)}
                  className={`px-4 py-2 rounded-lg border text-sm transition-all ${selectedWrap === i ? "border-[#E91E63] bg-[#E91E63]/5 text-[#E91E63] font-medium" : "border-[#F0E0E5] text-[#777777] hover:border-[#E91E63]"}`}
                >
                  {wrap.label} {wrap.price > 0 && `+${formatPrice(wrap.price)}`}
                </button>
              ))}
            </div>
          </div>

          {/* Ribbon Color */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Ribbon Color</h4>
            <div className="flex gap-2">
              {product.ribbonColors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedRibbon(i)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${selectedRibbon === i ? "border-[#E91E63] scale-110" : "border-transparent"}`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Add-ons</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "chocolate", label: "Chocolates", price: 499, icon: Gift },
                { key: "teddy", label: "Teddy Bear", price: 799, icon: Gift },
                { key: "cake", label: "Cake (1lb)", price: 1299, icon: Cake },
                { key: "balloons", label: "Balloons", price: 399, icon: Gift },
              ].map((addon) => (
                <button
                  key={addon.key}
                  onClick={() => setAddOns((prev) => ({ ...prev, [addon.key]: !prev[addon.key as keyof typeof prev] }))}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${addOns[addon.key as keyof typeof addOns] ? "border-[#E91E63] bg-[#E91E63]/5" : "border-[#F0E0E5] hover:border-[#E91E63]"}`}
                >
                  <addon.icon className="w-5 h-5 text-[#E91E63]" />
                  <div className="text-left">
                    <p className="text-sm font-medium">{addon.label}</p>
                    <p className="text-xs text-[#777777]">+{formatPrice(addon.price)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Greeting Card */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Greeting Card Message</h4>
            <Textarea placeholder="Write a heartfelt message..." className="text-sm" />
          </div>

          {/* Quantity & Actions */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center border border-[#F0E0E5] rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-[#FFF9FB] transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-[#FFF9FB] transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <Button
              size="lg"
              className="gap-2 flex-1 min-w-[200px]"
              onClick={() => addToCart({
                id: product.id,
                name: product.name,
                price: currentPrice,
                quantity: quantity,
                image: product.image,
                size: product.sizes[selectedSize]?.label || "Standard",
                wrapping: product.wrappingOptions[selectedWrap]?.label || "Standard",
              })}
            >
              <ShoppingBag className="w-5 h-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1 min-w-[200px]">
              Buy Now
            </Button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded-xl">
            <div className="text-center">
              <Truck className="w-5 h-5 text-[#E91E63] mx-auto mb-1" />
              <p className="text-xs text-[#777777]">Free Delivery</p>
            </div>
            <div className="text-center">
              <ShieldCheck className="w-5 h-5 text-[#E91E63] mx-auto mb-1" />
              <p className="text-xs text-[#777777]">Fresh Guarantee</p>
            </div>
            <div className="text-center">
              <Clock className="w-5 h-5 text-[#E91E63] mx-auto mb-1" />
              <p className="text-xs text-[#777777]">Same Day</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-6 border-b border-[#F0E0E5] mb-8">
          {(["details", "reviews", "delivery"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium capitalize transition-colors relative ${activeTab === tab ? "text-[#E91E63]" : "text-[#777777] hover:text-[#222222]"}`}
            >
              {tab}
              {activeTab === tab && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E91E63]" />}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "details" && (
            <motion.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Product Details</h3>
                  <p className="text-[#777777] leading-relaxed mb-6">{product.description}</p>
                  <h4 className="font-semibold mb-3">Flower Meanings</h4>
                  <div className="space-y-3">
                    {product.flowerMeanings.map((fm, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-xl">
                        <div className="w-2 h-2 rounded-full bg-[#E91E63] mt-2 shrink-0" />
                        <div>
                          <p className="font-medium text-sm">{fm.flower}</p>
                          <p className="text-xs text-[#777777]">{fm.meaning}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4">What&apos;s Included</h3>
                  <ul className="space-y-2 text-sm text-[#777777]">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#E91E63]" /> Fresh flowers hand-arranged by expert florists</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#E91E63]" /> Premium wrapping of your choice</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#E91E63]" /> Care instructions card</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#E91E63]" /> Free greeting card with custom message</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#E91E63]" /> Flower food packet for longer freshness</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "reviews" && (
            <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <div className="bg-white rounded-2xl p-6 text-center">
                    <p className="text-5xl font-bold text-[#222222]">{product.rating}</p>
                    <div className="flex justify-center gap-1 my-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-[#FFD700] text-[#FFD700]" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-[#777777]">{product.reviewCount} reviews</p>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                          <Image src={review.avatar} alt={review.name} fill className="object-cover" sizes="40px" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{review.name}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-[#FFD700] text-[#FFD700]" : "text-gray-300"}`} />
                              ))}
                            </div>
                            <span className="text-xs text-[#777777]">{review.date}</span>
                          </div>
                        </div>
                        {review.verified && <Badge variant="success" className="ml-auto text-xs">Verified</Badge>}
                      </div>
                      <p className="text-sm text-[#777777]">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "delivery" && (
            <motion.div key="delivery" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-6">
                  <h4 className="font-semibold mb-4">Delivery Information</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-[#E91E63] mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">{product.deliveryTime} Delivery</p>
                        <p className="text-xs text-[#777777]">Orders before 2 PM for same-day delivery in Kathmandu Valley</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#E91E63] mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Delivery Hours</p>
                        <p className="text-xs text-[#777777]">Sunday to Friday: 9 AM - 7 PM, Saturday: 10 AM - 5 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#E91E63] mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Freshness Guarantee</p>
                        <p className="text-xs text-[#777777]">If your flowers arrive damaged, we&apos;ll replace them free of charge</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6">
                  <h4 className="font-semibold mb-4">Delivery Locations</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Butwal", "Biratnagar", "Dharan", "Chitwan", "Nepalgunj", "Janakpur", "Hetauda"].map((city) => (
                      <div key={city} className="flex items-center gap-2 text-sm text-[#777777]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
                        {city}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-[#222222] mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
