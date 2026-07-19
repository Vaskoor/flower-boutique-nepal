"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { storeLocations } from "@/lib/data";
import { useTranslation } from "@/lib/useTranslation";

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <Navbar />
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-[#222222] mb-4">Get In Touch</h1>
            <p className="text-[#777777] max-w-2xl mx-auto">We'd love to hear from you. Whether you have a question about our flowers, need help with an order, or want to discuss a custom arrangement.</p>
          </motion.div>
        </div>
      </section>
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: MapPin, title: "Visit Us", info: "Thamel Marg, Kathmandu 44600", sub: "Nepal" },
              { icon: Phone, title: "Call Us", info: "+977 1-4412345", sub: "Sun-Fri, 8AM - 8PM" },
              { icon: Mail, title: "Email Us", info: "hello@sumanflorals.com", sub: "We reply within 24 hours" },
              { icon: Clock, title: "Business Hours", info: "Sun - Fri: 8AM - 8PM", sub: "Sat: 9AM - 6PM" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E91E63]/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[#E91E63]" />
                </div>
                <h4 className="font-semibold text-[#222222] mb-1">{item.title}</h4>
                <p className="text-sm text-[#222222]">{item.info}</p>
                <p className="text-xs text-[#777777]">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-8 shadow-card">
              <h2 className="text-2xl font-bold text-[#222222] mb-2">Send Us a Message</h2>
              <p className="text-[#777777] mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Name</label>
                    <Input placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone</label>
                    <Input placeholder="+977 98XXXXXXXX" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input placeholder="How can we help?" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea placeholder="Tell us more about your inquiry..." rows={5} />
                </div>
                <Button className="w-full gap-2">
                  <Send className="w-4 h-4" /> Send Message
                </Button>
              </form>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-[#F0E0E5] rounded-2xl h-64 mb-6 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-[#E91E63] mx-auto mb-2" />
                  <p className="text-[#777777] font-medium">Google Maps Integration</p>
                  <p className="text-sm text-[#777777]">Thamel, Kathmandu, Nepal</p>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-4">Our Stores</h3>
              <div className="space-y-4">
                {storeLocations.map((store) => (
                  <div key={store.id} className="bg-white rounded-xl p-4 shadow-card">
                    <h4 className="font-medium text-[#222222]">{store.name}</h4>
                    <p className="text-sm text-[#777777] mt-1">{store.address}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-[#777777]">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {store.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <MessageCircle className="w-12 h-12 text-[#E91E63] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#222222] mb-2">Still Have Questions?</h2>
          <p className="text-[#777777] mb-6">Check out our comprehensive FAQ section for quick answers to common questions.</p>
          <Button variant="outline">Visit FAQ Page</Button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
