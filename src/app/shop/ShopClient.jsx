"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BadgePercent, ChevronDown, ChevronLeft, ChevronRight, Filter, PackageCheck, RotateCcw, Search, SlidersHorizontal, Sparkles, Truck, X } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import BalloonVisual from "@/components/product/BalloonVisual";
import { getAllCategories, getAllProducts } from "@/lib/catalog";
import { shapes, themes, colorSwatches } from "@/data/products";

const sortOptions = [
  { value: "featured", label: "Featured Collections" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Customer Favorites" },
];

const trustBadges = [
  { icon: BadgePercent, label: "Wholesale Pricing" },
  { icon: Truck, label: "UAE-Wide Delivery" },
  { icon: PackageCheck, label: "Bulk Order Ready" },
];

function FilterGroup({ title, children }) {
  return (
    <div className="border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
      <h3 className="mb-3.5 text-sm font-bold text-slate-800">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Pill({ active, children, onClick, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center justify-between w-full rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
        active
          ? "bg-purple-700 text-white shadow-md shadow-purple-500/25 scale-[1.01]"
          : "bg-slate-50/80 text-slate-700 hover:bg-purple-50/80 hover:text-purple-900 border border-slate-200/60 hover:border-purple-200"
      }`}
    >
      <span className="truncate">{children}</span>
      {count !== undefined && (
        <span
          className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
            active ? "bg-white/20 text-white backdrop-blur-sm" : "bg-slate-200/80 text-slate-600"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

export default function ShopClient() {
  const params = useSearchParams();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(params.get("q") ?? "");
  const query = searchInput.trim().toLowerCase();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getAllCategories(), getAllProducts()]).then(([cats, prods]) => {
      if (cancelled) return;
      setCategories(cats);
      setProducts(prods);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const ITEMS_PER_PAGE = 12;
  const [page, setPage] = useState(Number(params.get("page")) || 1);

  const [category, setCategory] = useState(params.get("category") ?? "");
  const [shape, setShape] = useState(params.get("shape") ?? "");
  const [theme, setTheme] = useState(params.get("theme") ?? "");
  const [color, setColor] = useState("");
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Re-sync from the URL whenever it actually changes (e.g. searching again
  // from the navbar while already on this page) — a plain `useState` only
  // reads the params once on mount, so without this a second navbar search
  // would update the address bar but leave the results/input stuck on the
  // first query.
  const paramsKey = params.toString();
  useEffect(() => {
    setSearchInput(params.get("q") ?? "");
    setCategory(params.get("category") ?? "");
    setShape(params.get("shape") ?? "");
    setTheme(params.get("theme") ?? "");
    // Page reset is already handled by the filterKey check below once these
    // state updates land.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey]);

  const filterKey = `${category}|${shape}|${theme}|${color}|${query}|${sort}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setPage(1);
  }

  // Keep the URL in sync with the current filters/page (without adding a
  // history entry per change) so opening a product from page 2 and hitting
  // the browser Back button lands back on page 2 instead of resetting to
  // page 1 — the product detail page is a real navigation, so Back returns
  // to whatever URL this replace left behind.
  useEffect(() => {
    const sp = new URLSearchParams();
    if (category) sp.set("category", category);
    if (shape) sp.set("shape", shape);
    if (theme) sp.set("theme", theme);
    if (query) sp.set("q", searchInput.trim());
    if (page > 1) sp.set("page", String(page));
    const next = sp.toString();
    router.replace(next ? `/shop?${next}` : "/shop", { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, shape, theme, query, page]);

  useEffect(() => {
    if (!filtersOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [filtersOpen]);

  const filtered = useMemo(() => {
    let list = products.filter((product) => {
      if (category && product.category !== category) return false;
      if (shape && product.shape !== shape) return false;
      if (theme) {
        const productThemes = (product.theme || "").split(",").map((t) => t.trim());
        if (!productThemes.includes(theme)) return false;
      }
      if (color && !product.colors?.some((c) => c.name === color)) return false;
      if (query) {
        const haystack = `${product.name} ${product.short} ${product.sku} ${product.category}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    if (sort === "featured") list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    return list;
  }, [products, category, shape, theme, color, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  // Coming back (browser Back) from a product detail page — jump straight to
  // that product's card instead of leaving the visitor at the top of the
  // page they'd have to re-scroll through.
  useEffect(() => {
    if (loading) return;
    let targetSlug;
    try {
      targetSlug = sessionStorage.getItem("shopReturnSlug");
    } catch {
      return;
    }
    if (!targetSlug || !paginated.some((p) => p.slug === targetSlug)) return;
    const el = document.getElementById(`product-card-${targetSlug}`);
    el?.scrollIntoView({ block: "center" });
    try {
      sessionStorage.removeItem("shopReturnSlug");
    } catch {
      // ignore
    }
  }, [loading, paginated]);

  const activeCount = [category, shape, theme, color, query].filter(Boolean).length;
  const clearAll = () => {
    setCategory("");
    setShape("");
    setTheme("");
    setColor("");
    setSearchInput("");
    setPage(1);
  };

  const currentCategory = categories.find((c) => c.slug === category);

  const filterPanel = (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-purple-100/80 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#6D28D9] via-[#7E22CE] to-[#D946EF] text-white shadow-md shadow-purple-500/20">
            <Filter size={15} />
          </span>
          <div>
            <span className="block text-sm font-extrabold text-[#0F172A]">Filter By</span>
            <span className="block text-xs font-semibold text-slate-500">
              {activeCount > 0 ? `${activeCount} filter${activeCount > 1 ? "s" : ""} active` : "Refine your selection"}
            </span>
          </div>
        </div>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 border border-rose-200/60 px-3 py-1.5 rounded-full flex items-center gap-1 transition-transform hover:scale-105 shrink-0"
          >
            <RotateCcw size={11} /> Clear
          </button>
        )}
      </div>

      <FilterGroup title="Categories">
        <div className="space-y-1.5">
          <Pill active={!category} onClick={() => setCategory("")} count={products.length}>
            All Categories
          </Pill>
          {categories.map((item) => {
            const count = products.filter((p) => p.category === item.slug).length;
            return (
              <Pill key={item.slug} active={category === item.slug} onClick={() => setCategory(item.slug)} count={count}>
                {item.name}
              </Pill>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Balloon Shape">
        <div className="grid grid-cols-2 gap-1.5">
          <Pill active={!shape} onClick={() => setShape("")}>
            Any
          </Pill>
          {shapes.map((item) => (
            <Pill key={item.slug} active={shape === item.slug} onClick={() => setShape(item.slug)}>
              {item.name}
            </Pill>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Theme / Event">
        <div className="grid grid-cols-2 gap-1.5">
          <Pill active={!theme} onClick={() => setTheme("")}>
            Any
          </Pill>
          {themes.map((item) => (
            <Pill key={item.slug} active={theme === item.slug} onClick={() => setTheme(item.slug)}>
              {item.name}
            </Pill>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Filter By Color">
        <div className="flex flex-wrap gap-2.5 pt-1">
          {colorSwatches.map((swatch) => (
            <button
              key={swatch.name}
              type="button"
              onClick={() => setColor(color === swatch.name ? "" : swatch.name)}
              title={swatch.name}
              aria-label={swatch.name}
              className={`group relative h-7 w-7 rounded-full border-2 transition-all duration-300 ${
                color === swatch.name
                  ? "border-[#7E22CE] scale-125 shadow-lg ring-4 ring-purple-200"
                  : "border-white shadow-sm hover:scale-115"
              }`}
              style={{ backgroundColor: swatch.hex }}
            >
              {color === swatch.name && (
                <span className="absolute inset-0 grid place-items-center text-white text-xs font-bold drop-shadow-md">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </FilterGroup>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF5F8]/40 pb-24 font-sans">
      {/* ── HERO BANNER ─────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F8] via-purple-50/30 to-[#FFF5F8]/60 border-b border-pink-100/80 py-12 lg:py-16">
        {/* Glowing Ambient Blobs */}
        <div className="pointer-events-none absolute -left-16 -top-24 h-96 w-96 rounded-full bg-pink-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-20 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl" />

        {/* Floating Animated Balloons Visual Accent */}
        <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 items-end gap-6 lg:flex xl:right-20">
          <div className="animate-float opacity-90 drop-shadow-2xl" style={{ animationDelay: "0s" }}>
            <BalloonVisual visual={{ kind: "heart", color: "#EC4899" }} size={110} />
          </div>
          <div className="animate-float mb-10 opacity-85 drop-shadow-2xl" style={{ animationDelay: "0.7s" }}>
            <BalloonVisual visual={{ kind: "star", color: "#EAB308" }} size={85} />
          </div>
          <div className="animate-float opacity-80 drop-shadow-2xl" style={{ animationDelay: "0.4s" }}>
            <BalloonVisual visual={{ kind: "round", color: "#A855F7" }} size={95} />
          </div>
        </div>

        <div className="container-page relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500">
            <Link href="/" className="hover:text-[#7E22CE] transition-colors">Home</Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-[#0F172A] font-extrabold">{currentCategory?.name ?? "Shop All"}</span>
          </nav>

          <div className="mt-5 max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-200/90 bg-white/90 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#7E22CE] shadow-xs backdrop-blur-xs">
              <Sparkles size={13} className="text-yellow-500 fill-yellow-500" /> Wholesale Balloon Supply
            </span>

            <h1 className="mt-3.5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-[#0F172A]">
              {query ? (
                <span>Results for <span className="bg-gradient-to-r from-[#6D28D9] via-[#9333EA] to-[#E11D48] bg-clip-text text-transparent">"{query}"</span></span>
              ) : (
                <span>
                  {currentCategory?.name ? currentCategory.name : "Explore Wholesale"}{" "}
                  <span className="bg-gradient-to-r from-[#6D28D9] via-[#9333EA] to-[#E11D48] bg-clip-text text-transparent">
                    {currentCategory?.name ? "Collection" : "Balloons & Decor"}
                  </span>
                </span>
              )}
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg font-medium">
              {currentCategory?.blurb ??
                "Get bulk pricing on foil balloons, bubble balloons, and accessories with fast dispatch across all seven UAE emirates."}
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {trustBadges.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-pink-100 bg-white/95 px-3.5 py-1.5 text-xs font-extrabold text-[#0F172A] shadow-xs backdrop-blur-xs hover:border-purple-200 transition"
                >
                  <Icon size={14} className="text-[#7E22CE]" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY CATEGORY BAR ─────────────────── */}
      {categories.length > 0 && (
        <div className="sticky top-16 z-30 border-b border-pink-100/80 bg-white/90 backdrop-blur-md shadow-xs">
          <div className="container-page no-scrollbar flex items-center gap-2.5 overflow-x-auto py-3">
            <button
              type="button"
              onClick={() => setCategory("")}
              className={`shrink-0 rounded-full px-5 py-2.5 text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                !category
                  ? "bg-gradient-to-r from-[#6D28D9] via-[#7E22CE] to-[#8B5CF6] text-white shadow-md shadow-purple-500/25 scale-[1.02]"
                  : "bg-slate-100/90 text-slate-700 hover:bg-purple-50 hover:text-purple-900 border border-slate-200/60"
              }`}
            >
              All Products ({products.length})
            </button>
            {categories.map((item) => {
              const count = products.filter((p) => p.category === item.slug).length;
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setCategory(item.slug)}
                  className={`shrink-0 rounded-full px-5 py-2.5 text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                    category === item.slug
                      ? "bg-gradient-to-r from-[#6D28D9] via-[#7E22CE] to-[#8B5CF6] text-white shadow-md shadow-purple-500/25 scale-[1.02]"
                      : "bg-slate-100/90 text-slate-700 hover:bg-purple-50 hover:text-purple-900 border border-slate-200/60"
                  }`}
                >
                  {item.name} <span className="ml-1 opacity-80">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── MAIN CATALOG SECTION ───────────────────────── */}
      <div className="container-page py-8 lg:py-10">
        {/* Search bar */}
        <div className="mb-4 rounded-3xl bg-white/95 border border-pink-100/90 p-2 shadow-sm backdrop-blur-md">
          <div className="relative flex items-center">
            <Search size={18} className="pointer-events-none absolute left-4 text-slate-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search balloons, pumps, ribbons…"
              className="w-full rounded-2xl bg-transparent py-3 pl-11 pr-11 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:bg-purple-50/40"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                className="absolute right-3.5 grid h-7 w-7 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Controls bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white/95 border border-pink-100/90 p-4 sm:px-6 shadow-sm backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-700">
              Showing <span className="text-[#7E22CE] font-black">{filtered.length}</span> Products
            </span>

            {query && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/90 border border-emerald-200 px-3.5 py-1 text-xs font-extrabold text-emerald-900">
                &ldquo;{searchInput.trim()}&rdquo;
                <button onClick={() => setSearchInput("")} className="hover:text-emerald-950"><X size={12} /></button>
              </span>
            )}
            {category && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100/90 border border-purple-200 px-3.5 py-1 text-xs font-extrabold text-[#7E22CE]">
                {currentCategory?.name ?? category}
                <button onClick={() => setCategory("")} className="hover:text-purple-900"><X size={12} /></button>
              </span>
            )}
            {shape && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-100/90 border border-pink-200 px-3.5 py-1 text-xs font-extrabold text-pink-900">
                {shape}
                <button onClick={() => setShape("")} className="hover:text-pink-950"><X size={12} /></button>
              </span>
            )}
            {theme && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100/90 border border-indigo-200 px-3.5 py-1 text-xs font-extrabold text-indigo-900">
                {theme}
                <button onClick={() => setTheme("")} className="hover:text-indigo-950"><X size={12} /></button>
              </span>
            )}
            {color && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3.5 py-1 text-xs font-extrabold text-slate-800">
                {color}
                <button onClick={() => setColor("")} className="hover:text-slate-600"><X size={12} /></button>
              </span>
            )}
            {activeCount > 0 && (
              <button onClick={clearAll} className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-200 px-3.5 py-1 text-xs font-bold text-rose-600 hover:bg-rose-100 transition">
                <RotateCcw size={11} /> Clear all
              </button>
            )}
          </div>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-purple-50 border border-purple-200 px-4 py-2.5 text-xs sm:text-sm font-bold text-[#7E22CE] hover:border-purple-300 transition lg:hidden shadow-2xs"
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeCount > 0 && (
                <span className="ml-0.5 grid h-5 w-5 place-items-center rounded-full bg-[#7E22CE] text-xs text-white font-bold">{activeCount}</span>
              )}
            </button>

            <div className="relative min-w-0 flex-1 sm:flex-none">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full min-w-0 appearance-none rounded-2xl border border-slate-200/90 bg-slate-50/90 py-2.5 pl-4 pr-9 text-xs sm:text-sm font-bold text-[#0F172A] outline-none transition hover:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-50"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>
          </div>
        </div>

        {/* Sidebar & Product Grid */}
        <div className="grid gap-8 lg:grid-cols-[270px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-32 overflow-hidden rounded-3xl border border-pink-100/90 bg-white/95 shadow-sm backdrop-blur-md">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#6D28D9] via-[#7E22CE] to-[#E11D48]" />
              <div className="p-6">{filterPanel}</div>
            </div>
          </aside>

          <main>
            {loading ? (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse overflow-hidden rounded-3xl border border-pink-100 bg-white p-3">
                    <div className="aspect-square rounded-2xl bg-purple-50/70" />
                    <div className="space-y-3 p-4">
                      <div className="h-3 w-1/3 rounded-full bg-slate-100" />
                      <div className="h-4 w-5/6 rounded-full bg-slate-200" />
                      <div className="h-3 w-2/3 rounded-full bg-slate-100" />
                      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
                        <div className="h-6 w-20 rounded-full bg-slate-200" />
                        <div className="h-10 w-24 rounded-2xl bg-purple-100" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-purple-200 bg-white p-12 text-center shadow-xs">
                <div className="mx-auto w-fit">
                  <BalloonVisual visual={{ kind: "round", color: "#c4b5fd" }} size={80} />
                </div>
                <p className="mt-6 text-2xl font-extrabold text-[#0F172A]">No products found</p>
                <p className="mt-2 text-xs sm:text-sm font-medium text-slate-500 max-w-xs mx-auto">
                  Try clearing some filters or searching for another term.
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-6 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#7E22CE] px-8 py-3 text-xs font-bold text-white shadow-lg shadow-purple-500/30 hover:scale-105 transition"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {paginated.map((product, index) => (
                    <div
                      key={product.id}
                      id={`product-card-${product.slug}`}
                      className="animate-fade-up h-full flex flex-col"
                      style={{ animationDelay: `${Math.min(index, 8) * 0.05}s` }}
                      onClick={(e) => {
                        if (e.target.closest("button")) return;
                        try {
                          sessionStorage.setItem("shopReturnSlug", product.slug);
                        } catch {
                          // ignore storage failures (private mode etc.)
                        }
                      }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* ── PAGINATION CONTROLS ───────────────── */}
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80 pt-8">
                    <p className="text-xs sm:text-sm font-bold text-slate-500">
                      Showing <span className="font-extrabold text-[#0F172A]">{(page - 1) * ITEMS_PER_PAGE + 1}</span>–<span className="font-extrabold text-[#0F172A]">{Math.min(page * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="font-extrabold text-[#0F172A]">{filtered.length}</span> products
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={page === 1}
                        onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 380, behavior: "smooth" }); }}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-purple-300 hover:text-[#7E22CE] hover:shadow-sm disabled:opacity-40 disabled:pointer-events-none"
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={18} />
                      </button>

                      {Array.from({ length: totalPages }).map((_, i) => {
                        const pNum = i + 1;
                        const active = pNum === page;
                        return (
                          <button
                            key={pNum}
                            type="button"
                            onClick={() => { setPage(pNum); window.scrollTo({ top: 380, behavior: "smooth" }); }}
                            className={`h-10 w-10 rounded-2xl text-xs font-black transition-all duration-200 ${
                              active
                                ? "bg-gradient-to-r from-[#6D28D9] to-[#7E22CE] text-white shadow-md shadow-purple-500/25 scale-105"
                                : "border border-slate-200 bg-white text-slate-700 hover:border-purple-300 hover:text-[#7E22CE]"
                            }`}
                          >
                            {pNum}
                          </button>
                        );
                      })}

                      <button
                        type="button"
                        disabled={page === totalPages}
                        onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 380, behavior: "smooth" }); }}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-purple-300 hover:text-[#7E22CE] hover:shadow-sm disabled:opacity-40 disabled:pointer-events-none"
                        aria-label="Next page"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* ── MOBILE FILTER — FULL-PAGE OVERLAY ───────────────── */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[80] flex flex-col bg-white lg:hidden">
          <div className="h-1.5 w-full shrink-0 bg-gradient-to-r from-[#6D28D9] via-[#7E22CE] to-[#E11D48]" />
          <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4">
            <p className="text-lg font-black text-[#0F172A]">Filter Products</p>
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              aria-label="Close filters"
              className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 hover:bg-slate-200 transition"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">{filterPanel}</div>

          <div className="shrink-0 border-t border-slate-100 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="w-full rounded-full bg-gradient-to-r from-[#6D28D9] via-[#7E22CE] to-[#8B5CF6] py-3.5 text-xs font-bold text-white shadow-lg shadow-purple-500/25 hover:bg-purple-800 transition"
            >
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
