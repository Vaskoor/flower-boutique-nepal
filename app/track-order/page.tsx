"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const orderSteps = [
  { status: "completed", label: "Order Placed", time: "Jul 15, 2026 - 10:30 AM", desc: "Your order has been confirmed" },
  { status: "completed", label: "Processing", time: "Jul 15, 2026 - 11:00 AM", desc: "Flowers are being arranged by our florists" },
  { status: "completed", label: "Out for Delivery", time: "Jul 15, 2026 - 2:00 PM", desc: "Your bouquet is on its way" },
  { status: "current", label: "Near Destination", time: "Jul 15, 2026 - 3:15 PM", desc: "Delivery partner is 5 minutes away" },
  { status: "pending", label: "Delivered", time: "Estimated: 3:30 PM", desc: "Expected delivery time" },
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("SF-2026-78432");
  const [searched, setSearched] = useState(true);

  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#222222] mb-4">Track Your Order</h1>
            <p className="text-[#777777]">Enter your order ID to see the real-time status of your delivery</p>
          </div>

          {/* Search */}
          <div className="flex gap-3 mb-12 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
              <Input value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="Enter order ID (e.g., SF-2026-XXXXX)" className="pl-11" />
            </div>
            <Button onClick={() => setSearched(true)}>Track</Button>
          </div>

          {searched && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Order Info */}
              <div className="bg-white rounded-2xl p-6 shadow-card mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-[#777777]">Order ID</p>
                    <p className="font-semibold text-[#222222]">{orderId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#777777]">Estimated Delivery</p>
                    <p className="font-semibold text-[#E91E63]">Today, 3:30 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#777777]">
                  <MapPin className="w-4 h-4" />
                  <span>Delivering to: Lazimpat, Kathmandu</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-semibold text-lg mb-6">Delivery Progress</h3>
                <div className="space-y-0">
                  {orderSteps.map((step, index) => (
                    <div key={step.label} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.status === "completed" ? "bg-[#4CAF50] text-white" : step.status === "current" ? "bg-[#E91E63] text-white ring-4 ring-[#E91E63]/20" : "bg-[#F0E0E5] text-[#777777]"}`}>
                          {step.status === "completed" ? <CheckCircle className="w-5 h-5" /> : step.status === "current" ? <Truck className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                        </div>
                        {index < orderSteps.length - 1 && <div className={`w-0.5 h-16 ${step.status === "completed" ? "bg-[#4CAF50]" : "bg-[#F0E0E5]"}`} />}
                      </div>
                      <div className="pb-8">
                        <p className={`font-medium ${step.status === "current" ? "text-[#E91E63]" : "text-[#222222]"}`}>{step.label}</p>
                        <p className="text-sm text-[#777777]">{step.desc}</p>
                        <p className="text-xs text-[#777777] mt-1">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
