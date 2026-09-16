import Link from "next/link";
import { Sparkles } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";

export default function ProductsShowcase({ products, content }) {
  if (!products?.length) return null;
  const eyebrow = content?.eyebrow || "Shop The Collection";
  const heading = content?.heading || "Our Products";

  return (
    <section className="relative overflow-hidden py-12 lg:py-16 font-sans">
      <div className="container-page">
        {/* Section Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FCE7F3] px-4 py-1.5 font-display text-base font-bold text-[#D946EF] shadow-2xs">
              <Sparkles size={13} className="text-[#EAB308] fill-[#EAB308]" />
              {eyebrow}
            </span>
            <h2 className="mt-2.5 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
              {heading}
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-[#7E22CE] hover:bg-[#6D28D9] px-5 py-2.5 font-display text-base font-bold text-white shadow-md shadow-purple-300/40 transition-all hover:shadow-lg hover:scale-102"
          >
            <span>View All Products</span>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
