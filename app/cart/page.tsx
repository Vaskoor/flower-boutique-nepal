"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2, Minus, Plus, ArrowRight, Gift, Tag, Truck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/context";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const [coupon, setCoupon] = useState("");
  const [giftWrap, setGiftWrap] = useState(false);
  const [cardMessage, setCardMessage] = useState("");

  const subtotal = totalPrice;
  const shipping = subtotal > 2000 ? 0 : 150;
  const tax = Math.round(subtotal * 0.13);
  const giftWrapFee = giftWrap ? 200 : 0;
  const total = subtotal + shipping + tax + giftWrapFee;

  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-[#222222] mb-2">Shopping Cart</h1>
          <p className="text-[#777777] mb-8">{cart.length} items in your cart</p>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-[#777777] mb-4">Your cart is empty</p>
              <Link href="/shop">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-4 flex gap-4 shadow-card"
                  >
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-medium text-[#222222] truncate">{item.name}</h3>
                          <p className="text-xs text-[#777777] mt-0.5">{item.size} | {item.wrapping}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="text-[#777777] hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#F0E0E5] rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)} 
                            className="p-2 hover:bg-[#FFF9FB]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)} 
                            className="p-2 hover:bg-[#FFF9FB]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-semibold text-[#E91E63]">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Gift Options */}
                <div className="bg-white rounded-2xl p-6 shadow-card">
                  <h3 className="font-semibold mb-4 flex items-center gap-2"><Gift className="w-5 h-5 text-[#E91E63]" /> Gift Options</h3>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} className="w-4 h-4 rounded border-[#F0E0E5] text-[#E91E63]" />
                      <span className="text-sm">Add premium gift wrapping (+Rs. 200)</span>
                    </label>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Greeting Card Message</label>
                      <Textarea placeholder="Write your message..." value={cardMessage} onChange={(e) => setCardMessage(e.target.value)} className="text-sm" />
                    </div>
                  </div>
                </div>

                <Link href="/shop" className="inline-flex items-center gap-2 text-[#E91E63] text-sm font-medium hover:gap-3 transition-all">
                  <ArrowRight className="w-4 h-4 rotate-180" /> Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-card sticky top-32">
                  <h3 className="font-semibold text-lg mb-6">Order Summary</h3>

                  {/* Coupon */}
                  <div className="flex gap-2 mb-6">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
                      <Input placeholder="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} className="pl-10 text-sm" />
                    </div>
                    <Button variant="outline" size="sm">Apply</Button>
                  </div>

                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between text-[#777777]">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#777777]">
                      <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Shipping</span>
                      <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between text-[#777777]">
                      <span>Tax (13%)</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    {giftWrapFee > 0 && (
                      <div className="flex justify-between text-[#777777]">
                        <span>Gift Wrapping</span>
                        <span>{formatPrice(giftWrapFee)}</span>
                      </div>
                    )}
                    <div className="border-t border-[#F0E0E5] pt-3 flex justify-between font-semibold text-[#222222] text-base">
                      <span>Total</span>
                      <span className="text-[#E91E63]">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full gap-2 mb-3">
                      Proceed to Checkout <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <p className="text-xs text-[#777777] text-center">Shipping & taxes calculated at checkout</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
