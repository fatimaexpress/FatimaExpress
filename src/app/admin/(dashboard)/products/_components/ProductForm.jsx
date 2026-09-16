"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Boxes, ImagePlus, LoaderCircle, Package, Palette, Percent, Plus, Ruler, Tag, Trash2, X } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import { colorSwatches, shapes, themes } from "@/data/products";

const BADGE_PRESETS = ["Bestseller", "New", "Top rated", "Value kit", "Pro pick"];

const SHAPE_TO_VISUAL_KIND = {
  heart: "heart",
  round: "round",
  star: "star",
  "number-letter": "number",
};

const inputClass =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";
const labelClass = "mb-1.5 block text-xs font-semibold text-slate-600";
const panelClass = "rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-xs";

function ChipField({ name, value, onChange, options, placeholder, allowClear = true, multiple = false }) {
  const chipClass = (active) =>
    `rounded-full border px-2.5 py-1 text-[11px] font-semibold transition ${
      active ? "border-brand-700 bg-brand-50 text-brand-800" : "border-slate-200 text-slate-500 hover:border-slate-300"
    }`;
  const selectedValues = multiple ? value.split(",").map((v) => v.trim()).filter(Boolean) : [];
  const isActive = (optValue) => (multiple ? selectedValues.includes(optValue) : value === optValue);
  const toggleValue = (optValue) => {
    if (!multiple) {
      onChange(optValue);
      return;
    }
    const next = selectedValues.includes(optValue)
      ? selectedValues.filter((v) => v !== optValue)
      : [...selectedValues, optValue];
    onChange(next.join(", "));
  };

  return (
    <>
      <input name={name} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputClass} />
      <div className="mt-2 flex flex-wrap gap-1.5">
        {allowClear && (
          <button type="button" onClick={() => onChange("")} className={chipClass(value === "")}>
            None
          </button>
        )}
        {options.map((opt) => (
          <button key={opt.value} type="button" onClick={() => toggleValue(opt.value)} className={chipClass(isActive(opt.value))}>
            {opt.label}
          </button>
        ))}
      </div>
    </>
  );
}

function normalizeColors(colors) {
  return (colors ?? []).map((c) => ({
    name: c.name || "",
    hex: c.hex || "#8b5cf6",
    images: c.images?.length ? c.images : c.image_url ? [c.image_url] : [],
  }));
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-100 bg-brand-50 text-brand-700 shadow-xs">
        <Icon size={17} />
      </span>
      <h2 className="font-display text-lg font-bold text-ink">{children}</h2>
    </div>
  );
}

export default function ProductForm({ action, product, categories }) {
  const [state, formAction, pending] = useActionState(action, {});

  const [imageUrl, setImageUrl] = useState(product?.image_url || null);
  const [colors, setColors] = useState(normalizeColors(product?.colors));
  const [sizes, setSizes] = useState(product?.sizes?.length ? product.sizes : [{ label: "", price: "" }]);
  const [specs, setSpecs] = useState(product?.specs?.length ? product.specs : [{ label: "", value: "" }]);
  const [bulkPricing, setBulkPricing] = useState(product?.bulk_pricing?.length ? product.bulk_pricing : []);
  const [variantStock, setVariantStock] = useState(product?.variant_stock?.length ? product.variant_stock : []);
  const [shape, setShape] = useState(product?.shape || "");
  const [theme, setTheme] = useState(product?.theme || "");
  const [badge, setBadge] = useState(product?.badge || "");
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  const accentColor = colors[0]?.hex || product?.visual?.color || "#8b5cf6";
  const visual = { kind: SHAPE_TO_VISUAL_KIND[shape] || "round", color: accentColor };

  const addColor = (preset) => {
    setColors((current) => [...current, { name: preset?.name || "", hex: preset?.hex || "#8b5cf6", images: [] }]);
    setActiveColorIndex(colors.length);
  };
  const updateColor = (idx, field, value) =>
    setColors((current) => current.map((c, i) => (i === idx ? { ...c, [field]: value } : c)));
  const removeColor = (idx) => {
    setColors((current) => current.filter((_, i) => i !== idx));
    setActiveColorIndex((current) => (current >= idx ? Math.max(0, current - 1) : current));
  };
  const addColorImage = (idx, url) =>
    setColors((current) => current.map((c, i) => (i === idx ? { ...c, images: [...c.images, url] } : c)));
  const removeColorImage = (idx, imgIdx) =>
    setColors((current) =>
      current.map((c, i) => (i === idx ? { ...c, images: c.images.filter((_, ii) => ii !== imgIdx) } : c)),
    );

  const updateSize = (idx, field, value) =>
    setSizes((current) => current.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));
  const updateSpec = (idx, field, value) =>
    setSpecs((current) => current.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));
  const updateBulkTier = (idx, field, value) =>
    setBulkPricing((current) => current.map((t, i) => (i === idx ? { ...t, [field]: value } : t)));

  const cleanSizes = () => sizes.filter((s) => s.label).map((s) => ({ label: s.label, price: Number(s.price) || 0 }));
  const cleanSpecs = () => specs.filter((s) => s.label && s.value);
  const cleanColors = () =>
    colors.filter((c) => c.name && c.hex).map((c) => ({ name: c.name, hex: c.hex, images: c.images, image_url: c.images[0] || null }));
  const cleanBulkPricing = () =>
    bulkPricing
      .filter((t) => Number(t.minQty) > 0 && Number(t.discountPercent) > 0)
      .map((t) => ({ minQty: Number(t.minQty), discountPercent: Number(t.discountPercent) }))
      .sort((a, b) => a.minQty - b.minQty);

  // Variant stock — tracked per size+colour combo once the product has at
  // least one real size or colour; falls back to a plain stock quantity
  // input otherwise.
  const activeSizeLabels = [...new Set(sizes.map((s) => s.label).filter(Boolean))];
  const activeColorNames = [...new Set(colors.map((c) => c.name).filter(Boolean))];
  const hasVariants = activeSizeLabels.length > 0 || activeColorNames.length > 0;
  const variantRows = activeSizeLabels.length ? activeSizeLabels : [null];
  const variantCols = activeColorNames.length ? activeColorNames : [null];

  const variantKey = (size, color) => `${size || ""}__${color || ""}`;
  const variantMap = new Map(variantStock.map((v) => [variantKey(v.size, v.color), v.stock]));
  const getVariantStock = (size, color) => variantMap.get(variantKey(size, color)) ?? "";
  const updateVariantStock = (size, color, value) => {
    const stock = value === "" ? "" : Math.max(0, Number(value) || 0);
    setVariantStock((current) => {
      const key = variantKey(size, color);
      const idx = current.findIndex((v) => variantKey(v.size, v.color) === key);
      if (idx >= 0) return current.map((v, i) => (i === idx ? { ...v, stock } : v));
      return [...current, { size: size || null, color: color || null, stock }];
    });
  };

  const cleanVariantStock = () =>
    hasVariants
      ? variantRows.flatMap((size) =>
          variantCols.map((color) => ({ size, color, stock: Number(getVariantStock(size, color)) || 0 })),
        )
      : [];
  const totalVariantStock = cleanVariantStock().reduce((sum, v) => sum + v.stock, 0);

  return (
    <div>
      <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-700">
        <ArrowLeft size={15} />
        Back to products
      </Link>

      <h1 className="mt-4 font-display text-2xl font-bold sm:text-3xl">{product ? "Edit Product" : "New Product"}</h1>

      <form action={formAction} className="mt-6 space-y-6">
        {product && <input type="hidden" name="id" value={product.id} />}
        <input type="hidden" name="colors" value={JSON.stringify(cleanColors())} />
        <input type="hidden" name="sizes" value={JSON.stringify(cleanSizes())} />
        <input type="hidden" name="specs" value={JSON.stringify(cleanSpecs())} />
        <input type="hidden" name="bulk_pricing" value={JSON.stringify(cleanBulkPricing())} />
        <input type="hidden" name="variant_stock" value={JSON.stringify(cleanVariantStock())} />
        <input type="hidden" name="visual" value={JSON.stringify(visual)} />
        <input type="hidden" name="image_url" value={imageUrl || ""} />

        {state.error && <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{state.error}</p>}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-6 lg:col-span-2">
            <div className={panelClass}>
              <SectionTitle icon={Tag}>Basic Info</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Product name</label>
                  <input required name="name" defaultValue={product?.name} className={inputClass} placeholder="e.g. Heart Foil Balloon" />
                </div>
                <div>
                  <label className={labelClass}>SKU</label>
                  <input name="sku" defaultValue={product?.sku || ""} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Category</label>
                  <select name="category_id" defaultValue={product?.category_id || ""} className={inputClass}>
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Shape</label>
                  <ChipField
                    name="shape"
                    value={shape}
                    onChange={setShape}
                    placeholder="e.g. heart, round, star…"
                    options={shapes.map((s) => ({ value: s.slug, label: s.name }))}
                  />
                </div>
                <div>
                  <label className={labelClass}>Theme</label>
                  <ChipField
                    name="theme"
                    value={theme}
                    onChange={setTheme}
                    placeholder="e.g. birthday, wedding…"
                    options={themes.map((t) => ({ value: t.slug, label: t.name }))}
                    multiple
                  />
                  <p className="mt-1.5 text-[11px] text-slate-400">
                    Pick more than one (or comma-separate them) to show this product under multiple theme filters.
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Short description (shown on product cards)</label>
                  <input name="short" defaultValue={product?.short || ""} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Full description</label>
                  <textarea name="description" rows={4} defaultValue={product?.description || ""} className={inputClass} />
                </div>
              </div>
            </div>

            <div className={panelClass}>
              <SectionTitle icon={Percent}>Pricing &amp; Stock</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Base price (AED)</label>
                  <input type="number" step="0.01" name="price" defaultValue={product?.price ?? ""} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Compare-at price</label>
                  <input type="number" step="0.01" name="compare_at" defaultValue={product?.compare_at ?? ""} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Stock quantity{hasVariants ? " (auto)" : ""}</label>
                  {hasVariants ? (
                    <>
                      <div className={`${inputClass} flex items-center justify-between bg-slate-50 text-slate-600`}>
                        <span className="font-bold">{totalVariantStock}</span>
                        <a href="#variant-stock" className="text-xs font-semibold text-brand-600 hover:underline">
                          Set below ↓
                        </a>
                      </div>
                      <input type="hidden" name="stock_quantity" value={totalVariantStock} />
                    </>
                  ) : (
                    <input type="number" name="stock_quantity" defaultValue={product?.stock_quantity ?? 100} className={inputClass} />
                  )}
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="flex items-center gap-1.5 text-sm font-bold">
                      <Percent size={15} className="text-brand-600" />
                      Bulk Pricing
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Quantity discounts, e.g. 50+ pcs = 10% off, 100+ pcs = 20% off. Leave empty for no bulk discount.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBulkPricing((current) => [...current, { minQty: "", discountPercent: "" }])}
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-brand-700 hover:underline"
                  >
                    <Plus size={14} />
                    Add tier
                  </button>
                </div>
                {bulkPricing.length === 0 ? (
                  <p className="mt-4 text-xs text-slate-400">No bulk discount tiers — every quantity is charged the normal price.</p>
                ) : (
                  <div className="mt-4 space-y-2.5">
                    {bulkPricing.map((tier, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <div className="flex-1">
                          <input
                            type="number"
                            min="1"
                            value={tier.minQty}
                            onChange={(e) => updateBulkTier(idx, "minQty", e.target.value)}
                            placeholder="Min qty, e.g. 50"
                            className={inputClass}
                          />
                        </div>
                        <div className="relative flex-1">
                          <input
                            type="number"
                            min="1"
                            max="99"
                            value={tier.discountPercent}
                            onChange={(e) => updateBulkTier(idx, "discountPercent", e.target.value)}
                            placeholder="Discount %"
                            className={inputClass}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setBulkPricing((current) => current.filter((_, i) => i !== idx))}
                          className="shrink-0 rounded-xl p-3 text-slate-400 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={panelClass}>
              <SectionTitle icon={Ruler}>Sizes &amp; Specs</SectionTitle>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold">Sizes</h3>
                <button
                  type="button"
                  onClick={() => setSizes((current) => [...current, { label: "", price: "" }])}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 hover:underline"
                >
                  <Plus size={14} />
                  Add size
                </button>
              </div>
              <div className="mt-3 space-y-2.5">
                {sizes.map((size, idx) => (
                  <div key={idx} className="flex gap-2.5">
                    <input
                      value={size.label}
                      onChange={(e) => updateSize(idx, "label", e.target.value)}
                      placeholder='e.g. 18"'
                      className={inputClass}
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={size.price}
                      onChange={(e) => updateSize(idx, "price", e.target.value)}
                      placeholder="Price"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setSizes((current) => current.filter((_, i) => i !== idx))}
                      className="shrink-0 rounded-xl p-3 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold">Specifications</h3>
                  <button
                    type="button"
                    onClick={() => setSpecs((current) => [...current, { label: "", value: "" }])}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 hover:underline"
                  >
                    <Plus size={14} />
                    Add spec
                  </button>
                </div>
                <div className="mt-3 space-y-2.5">
                  {specs.map((spec, idx) => (
                    <div key={idx} className="flex gap-2.5">
                      <input
                        value={spec.label}
                        onChange={(e) => updateSpec(idx, "label", e.target.value)}
                        placeholder="Label, e.g. Material"
                        className={inputClass}
                      />
                      <input
                        value={spec.value}
                        onChange={(e) => updateSpec(idx, "value", e.target.value)}
                        placeholder="Value"
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={() => setSpecs((current) => current.filter((_, i) => i !== idx))}
                        className="shrink-0 rounded-xl p-3 text-slate-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={panelClass}>
              <SectionTitle icon={Palette}>Colours</SectionTitle>
              <p className="-mt-2 mb-4 text-xs text-slate-500">
                Each colour gets its own tab — add as many photos as you like for it (first photo is used as the cover).
              </p>

              {colors.length === 0 ? (
                <button
                  type="button"
                  onClick={() => addColor()}
                  className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-8 text-slate-400 transition hover:border-brand-400 hover:text-brand-600"
                >
                  <Palette size={22} />
                  <span className="text-xs font-semibold">No colours yet — add your first one</span>
                </button>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
                    {colors.map((c, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveColorIndex(idx)}
                        className={`group flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-xs font-bold transition ${
                          activeColorIndex === idx
                            ? "border-brand-700 bg-brand-50 text-brand-800"
                            : "border-slate-200 text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                        {c.name || `Colour ${idx + 1}`}
                        {c.images.length > 0 && (
                          <span
                            className={`rounded-full px-1.5 text-[10px] font-bold ${
                              activeColorIndex === idx ? "bg-brand-100 text-brand-700" : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {c.images.length}
                          </span>
                        )}
                        <span
                          role="button"
                          tabIndex={-1}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeColor(idx);
                          }}
                          className="rounded-full p-0.5 text-slate-300 hover:bg-red-50 hover:text-red-600"
                          aria-label={`Remove ${c.name || "colour"}`}
                        >
                          <X size={12} />
                        </span>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => addColor()}
                      className="inline-flex items-center gap-1 rounded-full border-2 border-dashed border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-500 hover:border-brand-300 hover:text-brand-700"
                    >
                      <Plus size={14} />
                      Add colour
                    </button>
                  </div>

                  {colors[activeColorIndex] && (
                    <div key={activeColorIndex} className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>Colour name</label>
                        <input
                          value={colors[activeColorIndex].name}
                          onChange={(e) => updateColor(activeColorIndex, "name", e.target.value)}
                          placeholder="e.g. Rose Gold"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Hex colour</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={colors[activeColorIndex].hex}
                            onChange={(e) => updateColor(activeColorIndex, "hex", e.target.value)}
                            className="h-11 w-14 shrink-0 cursor-pointer rounded-xl border border-slate-200 p-1"
                            aria-label="Pick colour"
                          />
                          <input
                            value={colors[activeColorIndex].hex}
                            onChange={(e) => updateColor(activeColorIndex, "hex", e.target.value)}
                            maxLength={7}
                            className={`${inputClass} font-mono uppercase`}
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className={labelClass}>Photos for this colour ({colors[activeColorIndex].images.length})</label>
                        <div className="flex flex-wrap gap-3">
                          {colors[activeColorIndex].images.map((img, imgIdx) => (
                            <div key={imgIdx} className="group relative h-24 w-24 overflow-hidden rounded-xl border border-slate-200">
                              <Image src={img} alt="" fill sizes="96px" className="object-cover" />
                              {imgIdx === 0 && (
                                <span className="absolute left-1 top-1 rounded-full bg-brand-700 px-1.5 py-0.5 text-[9px] font-bold text-white">
                                  Cover
                                </span>
                              )}
                              <button
                                type="button"
                                onClick={() => removeColorImage(activeColorIndex, imgIdx)}
                                className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
                                aria-label="Remove photo"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                          <ImageUploader value={null} onChange={(url) => url && addColorImage(activeColorIndex, url)} previewClassName="h-24 w-24" />
                        </div>
                        {colors[activeColorIndex].images.length === 0 && (
                          <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                            <ImagePlus size={13} />
                            No photos yet — falls back to the main product photo.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Quick add from presets</p>
                <div className="flex flex-wrap gap-2">
                  {colorSwatches.map((s) => (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => addColor(s)}
                      className="flex items-center gap-1.5 rounded-full border-2 border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-brand-300"
                    >
                      <span className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ backgroundColor: s.hex }} />
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {hasVariants && (
              <div id="variant-stock" className={`${panelClass} scroll-mt-6`}>
                <SectionTitle icon={Boxes}>Stock by Variant</SectionTitle>
                <p className="-mt-2 mb-4 text-xs text-slate-500">
                  You added {activeSizeLabels.length && activeColorNames.length ? "sizes and colours" : activeSizeLabels.length ? "sizes" : "colours"}{" "}
                  above — set how many of each are in stock. The total feeds the "Stock quantity" field automatically.
                </p>

                {activeSizeLabels.length && activeColorNames.length ? (
                  <div className="overflow-x-auto rounded-xl border border-slate-100">
                    <table className="w-full min-w-[420px] border-collapse text-sm">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="sticky left-0 bg-slate-50 px-3 py-2.5 text-left text-xs font-bold text-slate-400"></th>
                          {activeColorNames.map((color) => (
                            <th key={color} className="px-2 py-2.5 text-center text-xs font-bold text-slate-600">
                              {color}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {activeSizeLabels.map((size, idx) => (
                          <tr key={size} className={idx % 2 ? "bg-white" : "bg-slate-50/40"}>
                            <td className="sticky left-0 bg-inherit px-3 py-1.5 text-xs font-bold text-slate-600">{size}</td>
                            {activeColorNames.map((color) => (
                              <td key={color} className="px-1.5 py-1.5">
                                <input
                                  type="number"
                                  min="0"
                                  value={getVariantStock(size, color)}
                                  onChange={(e) => updateVariantStock(size, color, e.target.value)}
                                  placeholder="0"
                                  className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-center text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {(activeSizeLabels.length ? activeSizeLabels : activeColorNames).map((label) => (
                      <div key={label} className="flex items-center gap-2.5">
                        <span className="flex-1 truncate text-sm font-semibold text-slate-600">{label}</span>
                        <input
                          type="number"
                          min="0"
                          value={activeSizeLabels.length ? getVariantStock(label, null) : getVariantStock(null, label)}
                          onChange={(e) =>
                            activeSizeLabels.length
                              ? updateVariantStock(label, null, e.target.value)
                              : updateVariantStock(null, label, e.target.value)
                          }
                          placeholder="0"
                          className="w-28 rounded-lg border border-slate-200 px-3 py-1.5 text-center text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <p className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500">
                  Total stock
                  <span className="text-sm font-bold text-brand-700">{totalVariantStock}</span>
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className={panelClass}>
              <SectionTitle icon={Package}>Visibility</SectionTitle>
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Badge</label>
                  <ChipField
                    name="badge"
                    value={badge}
                    onChange={setBadge}
                    placeholder="e.g. Bestseller, Limited Stock, 20% Off…"
                    options={BADGE_PRESETS.map((b) => ({ value: b, label: b }))}
                  />
                </div>
                <label className="flex items-center gap-2.5 text-sm font-medium">
                  <input type="checkbox" name="is_active" defaultChecked={product?.is_active ?? true} className="h-4 w-4 rounded accent-brand-700" />
                  Active (visible in shop)
                </label>
                <label className="flex items-center gap-2.5 text-sm font-medium">
                  <input type="checkbox" name="is_featured" defaultChecked={product?.is_featured ?? true} className="h-4 w-4 rounded accent-brand-700" />
                  Featured (shown on homepage)
                </label>
              </div>
            </div>

            <div className={panelClass}>
              <SectionTitle icon={ImagePlus}>Cover Photo *</SectionTitle>
              <p className="-mt-2 mb-3 text-xs text-slate-500">Required — this is the main image shown on product cards and listings.</p>
              <ImageUploader value={imageUrl} onChange={setImageUrl} previewClassName="aspect-square w-full" />
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">
          <Link href="/admin/products" className="text-sm font-semibold text-slate-500 hover:text-brand-700">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-700 to-brand-800 px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
          >
            {pending && <LoaderCircle size={16} className="animate-spin" />}
            {product ? "Save Changes" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
