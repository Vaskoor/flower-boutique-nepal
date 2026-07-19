import { products, reviews } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductClient from "@/components/product/ProductClient";

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug) || products[0];
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-[#777777] mb-6">
            <a href="/" className="hover:text-[#E91E63]">Home</a>
            <span className="text-[#777777]">/</span>
            <a href="/shop" className="hover:text-[#E91E63]">Shop</a>
            <span className="text-[#777777]">/</span>
            <span className="text-[#222222]">{product.name}</span>
          </div>

          <ProductClient
            product={product}
            relatedProducts={relatedProducts}
            reviews={reviews}
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
