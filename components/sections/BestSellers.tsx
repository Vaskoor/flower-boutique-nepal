"use client";
import SectionHeader from "./SectionHeader";
import ProductCard from "./ProductCard";
import { products } from "@/lib/data";

export default function BestSellers() {
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Best Sellers"
          subtitle="Our customers' favorite bouquets — tried, tested, and loved"
          link={{ href: "/shop", label: "View All Best Sellers" }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
