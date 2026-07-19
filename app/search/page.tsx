"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/sections/ProductCard";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/data";

const trendingSearches = ["Red Roses", "Dashain Garlands", "Wedding Bouquets", "Sunflowers", "Orchids", "Teej Flowers"];
const popularFlowers = ["Roses", "Lilies", "Sunflowers", "Orchids", "Peonies", "Marigold"];

function SearchContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState<typeof products>([]);

  useEffect(() => {
    if (queryParam) {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(queryParam.toLowerCase()) ||
        p.category.toLowerCase().includes(queryParam.toLowerCase()) ||
        p.occasion.some((o) => o.toLowerCase().includes(queryParam.toLowerCase()))
      );
      setResults(filtered);
      setQuery(queryParam);
    } else {
      setResults([]);
      setQuery("");
    }
  }, [queryParam]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 1) {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.category.toLowerCase().includes(value.toLowerCase()) ||
        p.occasion.some((o) => o.toLowerCase().includes(value.toLowerCase()))
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#222222] mb-4">Search</h1>
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#777777]" />
          <Input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for flowers, bouquets, occasions..."
            className="pl-12 h-14 text-lg"
            autoFocus
          />
          {query && (
            <button onClick={() => { setQuery(""); setResults([]); }} className="absolute right-4 top-1/2 -translate-y-1/2">
              <X className="w-5 h-5 text-[#777777]" />
            </button>
          )}
        </div>
      </div>

      {query.length > 1 ? (
        <div>
          <p className="text-sm text-[#777777] mb-4">{results.length} results for "{query}"</p>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#777777]">No results found. Try a different search term.</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Trending Searches */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[#E91E63]" />
              <h3 className="font-semibold text-[#222222]">Trending Searches</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="px-4 py-2 bg-white rounded-full text-sm text-[#777777] border border-[#F0E0E5] hover:border-[#E91E63] hover:text-[#E91E63] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Flowers */}
          <div>
            <h3 className="font-semibold text-[#222222] mb-4">Popular Flowers</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularFlowers.map((flower, index) => (
                <motion.button
                  key={flower}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSearch(flower)}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-card transition-all text-center"
                >
                  <p className="font-medium text-[#222222]">{flower}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <Navbar />
      <div className="pt-32 pb-16">
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
          <SearchContent />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
