"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, ShoppingBag, Heart, MapPin, Bell, Settings, Package, Star, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sidebarItems = [
  { icon: ShoppingBag, label: "My Orders", href: "/account/orders", count: 12 },
  { icon: Heart, label: "Wishlist", href: "/wishlist", count: 8 },
  { icon: MapPin, label: "Saved Addresses", href: "/account/addresses", count: 3 },
  { icon: Bell, label: "Notifications", href: "/account/notifications", count: 5 },
  { icon: Settings, label: "Profile Settings", href: "/account", count: 0 },
];

const recentOrders = [
  { id: "SF-2026-78432", date: "Jul 15, 2026", status: "Delivered", total: 2499, items: 1 },
  { id: "SF-2026-78101", date: "Jul 10, 2026", status: "Delivered", total: 5798, items: 2 },
  { id: "SF-2026-77945", date: "Jul 5, 2026", status: "Cancelled", total: 1899, items: 1 },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-[#222222] mb-8">My Account</h1>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#F0E0E5]">
                  <div className="w-14 h-14 rounded-full bg-[#E91E63]/10 flex items-center justify-center">
                    <User className="w-7 h-7 text-[#E91E63]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#222222]">Sunita Sharma</p>
                    <p className="text-sm text-[#777777]">sunita@email.com</p>
                  </div>
                </div>
                <nav className="space-y-1">
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FFF9FB] transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-[#777777] group-hover:text-[#E91E63] transition-colors" />
                        <span className="text-sm text-[#222222]">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.count > 0 && <span className="text-xs bg-[#E91E63]/10 text-[#E91E63] px-2 py-0.5 rounded-full">{item.count}</span>}
                        <ChevronRight className="w-4 h-4 text-[#777777]" />
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Orders", value: "12", icon: Package },
                  { label: "Wishlist Items", value: "8", icon: Heart },
                  { label: "Reviews Given", value: "5", icon: Star },
                  { label: "Reward Points", value: "450", icon: Star },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-5 shadow-card text-center"
                  >
                    <stat.icon className="w-6 h-6 text-[#E91E63] mx-auto mb-2" />
                    <p className="text-2xl font-bold text-[#222222]">{stat.value}</p>
                    <p className="text-xs text-[#777777]">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Recent Orders</h3>
                  <Link href="/account/orders" className="text-sm text-[#E91E63] hover:underline">View All</Link>
                </div>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-[#FFF9FB] rounded-xl">
                      <div>
                        <p className="font-medium text-[#222222]">{order.id}</p>
                        <p className="text-xs text-[#777777]">{order.date} | {order.items} item{order.items > 1 ? "s" : ""}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={order.status === "Delivered" ? "success" : "destructive"} className="mb-1">{order.status}</Badge>
                        <p className="font-semibold text-sm">Rs. {order.total.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
