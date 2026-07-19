"use client";
import SectionHeader from "./SectionHeader";
import ProductCard from "./ProductCard";
import { products } from "@/lib/data";

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.isNew || p.isBestseller).slice(0, 4);
  return (
    <section className="py-20 bg-[#FFF9FB]">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Featured Bouquets"
          subtitle="Handpicked by our florists — the most loved arrangements this season"
          link={{ href: "/shop", label: "Shop All Bouquets" }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
