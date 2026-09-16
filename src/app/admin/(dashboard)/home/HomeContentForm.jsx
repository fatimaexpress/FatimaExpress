"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { Droplets, Eye, EyeOff, Gift, HelpCircle, Images, LoaderCircle, MessageSquareQuote, Package, Plus, Search, ShieldCheck, Sparkles, Star, Trash2, X } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import { updateHomeContent } from "@/actions/admin/homeContent";
import { themes } from "@/data/products";
import { DEFAULT_SECTION_VISIBILITY } from "@/lib/homeContent";

const inputClass =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";
const labelClass = "mb-1.5 block text-xs font-semibold text-slate-600";

const BLANK_SLIDE = {
  eyebrow: "Celebrate Every Moment",
  badge1: "Wholesale Pricing",
  badge2: "Delivery Across UAE",
  floatingBadgeTitle: "Wholesale Supply",
  floatingBadgeSubtitle: "Across UAE",
  heading_line1: "Premium Balloons",
  heading_line2: "For Every Occasion",
  description: "",
  image: "",
  mobileImage: "",
  ctaText: "Shop All Collection",
  ctaLink: "/shop",
};

const BLANK_FOIL_SLIDE = { image: "", title: "", specs: [""], productSlug: "", productName: "" };
const BLANK_STEP = { image: "", copy: "" };
const BLANK_TESTIMONIAL = { name: "", role: "", quote: "", rating: 5, avatar: "" };
const BLANK_FAQ = { question: "", answer: "" };

function ProductPicker({ products, slide, onLink, onClear }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = (
    query.trim() ? products.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase())) : products
  ).slice(0, 8);

  return (
    <div>
      {slide.productSlug ? (
        <div className="flex items-center justify-between gap-2 rounded-xl border border-brand-200 bg-brand-50 px-3.5 py-2.5">
          <span className="truncate text-xs font-bold text-brand-800">{slide.productName || slide.productSlug}</span>
          <button type="button" onClick={onClear} className="shrink-0 rounded-full p-1 text-brand-400 hover:bg-white hover:text-red-600">
            <X size={13} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              placeholder="Search product by name…"
              className={`${inputClass} pl-9`}
            />
          </div>
          {open && filtered.length > 0 && (
            <div className="absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-slate-200 bg-white shadow-lg">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onMouseDown={() => onLink(p)}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs hover:bg-slate-50"
                >
                  {p.image_url ? (
                    <Image src={p.image_url} alt="" width={28} height={28} className="h-7 w-7 shrink-0 rounded-lg object-cover" />
                  ) : (
                    <span className="h-7 w-7 shrink-0 rounded-lg bg-slate-100" />
                  )}
                  <span className="truncate font-medium text-slate-700">{p.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const TABS = [
  { id: "hero", label: "Hero Banners", icon: Sparkles },
  { id: "foil", label: "Foil Balloons", icon: Sparkles },
  { id: "bubble", label: "Bubble & Specialty", icon: Droplets },
  { id: "accessories", label: "Accessories", icon: Package },
  { id: "features", label: "Trust Badges", icon: ShieldCheck },
  { id: "gallery", label: "Gallery", icon: Images },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
  { id: "newsletter", label: "Newsletter", icon: Gift },
];

function SectionTitle({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700 shadow-sm">
        <Icon size={16} />
      </span>
      <h2 className="font-display text-lg font-bold">{children}</h2>
    </div>
  );
}

export default function HomeContentForm({ content, products = [] }) {
  const [state, formAction, pending] = useActionState(updateHomeContent, {});
  const [activeTab, setActiveTab] = useState("hero");
  const [sectionVisibility, setSectionVisibility] = useState({ ...DEFAULT_SECTION_VISIBILITY, ...content.sectionVisibility });

  const toggleSectionVisibility = (id) => (e) => {
    e.stopPropagation();
    setSectionVisibility((current) => ({ ...current, [id]: !current[id] }));
  };

  const [heroSlides, setHeroSlides] = useState(content.heroSlides?.length ? content.heroSlides : [BLANK_SLIDE]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [foil, setFoil] = useState(content.foil);
  const [foilSlides, setFoilSlides] = useState(content.foil.slides?.length ? content.foil.slides : []);
  const [activeFoilSlide, setActiveFoilSlide] = useState(0);
  const [bubble, setBubble] = useState(content.bubble);
  const [bubbleFeatures, setBubbleFeatures] = useState(content.bubble.features);
  const [bubbleSteps, setBubbleSteps] = useState(content.bubble.steps);
  const [accessories, setAccessories] = useState(content.accessories);
  const [featureStrip, setFeatureStrip] = useState(content.featureStrip);
  const [galleryHeading, setGalleryHeading] = useState(content.galleryHeading);
  const [gallery, setGallery] = useState(content.gallery);
  const [testimonialsHeading, setTestimonialsHeading] = useState(content.testimonialsHeading);
  const [testimonials, setTestimonials] = useState(content.testimonials);
  const [faqsHeading, setFaqsHeading] = useState(content.faqsHeading);
  const [faqs, setFaqs] = useState(content.faqs);
  const [newsletter, setNewsletter] = useState(content.newsletter);

  const setFoilField = (field) => (e) => setFoil((current) => ({ ...current, [field]: e.target.value }));
  const setBubbleField = (field) => (e) => setBubble((current) => ({ ...current, [field]: e.target.value }));
  const setAccessoriesField = (field) => (e) => setAccessories((current) => ({ ...current, [field]: e.target.value }));
  const setGalleryHeadingField = (field) => (e) => setGalleryHeading((current) => ({ ...current, [field]: e.target.value }));
  const setTestimonialsHeadingField = (field) => (e) => setTestimonialsHeading((current) => ({ ...current, [field]: e.target.value }));
  const setFaqsHeadingField = (field) => (e) => setFaqsHeading((current) => ({ ...current, [field]: e.target.value }));
  const setNewsletterField = (field) => (e) => setNewsletter((current) => ({ ...current, [field]: e.target.value }));

  const updateFeature = (idx, field, value) =>
    setFeatureStrip((current) => current.map((item, i) => (i === idx ? { ...item, [field]: value } : item)));

  const updateGalleryItem = (idx, field, value) =>
    setGallery((current) => current.map((item, i) => (i === idx ? { ...item, [field]: value } : item)));

  const updateTestimonial = (idx, field, value) =>
    setTestimonials((current) => current.map((item, i) => (i === idx ? { ...item, [field]: value } : item)));

  const updateFaq = (idx, field, value) =>
    setFaqs((current) => current.map((item, i) => (i === idx ? { ...item, [field]: value } : item)));

  const updateSlide = (idx, field, value) =>
    setHeroSlides((current) => current.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));

  const addSlide = () => {
    setHeroSlides((current) => [...current, { ...BLANK_SLIDE, description: "", image: "" }]);
    setActiveSlide(heroSlides.length);
  };

  const removeSlide = (idx) => {
    if (heroSlides.length <= 1) return;
    setHeroSlides((current) => current.filter((_, i) => i !== idx));
    setActiveSlide((current) => (current >= idx ? Math.max(0, current - 1) : current));
  };

  const updateFoilSlide = (idx, field, value) =>
    setFoilSlides((current) => current.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));

  const addFoilSlide = () => {
    setFoilSlides((current) => [...current, { ...BLANK_FOIL_SLIDE, specs: [""] }]);
    setActiveFoilSlide(foilSlides.length);
  };

  const removeFoilSlide = (idx) => {
    setFoilSlides((current) => current.filter((_, i) => i !== idx));
    setActiveFoilSlide((current) => (current >= idx ? Math.max(0, current - 1) : current));
  };

  const updateFoilSlideSpec = (slideIdx, specIdx, value) =>
    setFoilSlides((current) =>
      current.map((s, i) => (i === slideIdx ? { ...s, specs: s.specs.map((sp, si) => (si === specIdx ? value : sp)) } : s)),
    );

  const addFoilSlideSpec = (slideIdx) =>
    setFoilSlides((current) => current.map((s, i) => (i === slideIdx ? { ...s, specs: [...s.specs, ""] } : s)));

  const removeFoilSlideSpec = (slideIdx, specIdx) =>
    setFoilSlides((current) =>
      current.map((s, i) => (i === slideIdx ? { ...s, specs: s.specs.filter((_, si) => si !== specIdx) } : s)),
    );

  const linkFoilSlideProduct = (slideIdx, product) =>
    setFoilSlides((current) =>
      current.map((s, i) =>
        i === slideIdx
          ? {
              ...s,
              productSlug: product.slug,
              productName: product.name,
              title: s.title || product.name,
              image: s.image || product.image_url || "",
            }
          : s,
      ),
    );

  const unlinkFoilSlideProduct = (slideIdx) =>
    setFoilSlides((current) => current.map((s, i) => (i === slideIdx ? { ...s, productSlug: "", productName: "" } : s)));

  const updateBubbleFeature = (idx, field, value) =>
    setBubbleFeatures((current) => current.map((f, i) => (i === idx ? { ...f, [field]: value } : f)));

  const updateBubbleStep = (idx, field, value) =>
    setBubbleSteps((current) => current.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));

  return (
    <form action={formAction} className="mt-6">
      <input type="hidden" name="sectionVisibility" value={JSON.stringify(sectionVisibility)} />
      <input type="hidden" name="heroSlides" value={JSON.stringify(heroSlides)} />
      <input type="hidden" name="foil_eyebrow" value={foil.eyebrow} />
      <input type="hidden" name="foil_heading" value={foil.heading} />
      <input
        type="hidden"
        name="foil_slides"
        value={JSON.stringify(foilSlides.map((s) => ({ ...s, specs: s.specs.filter((sp) => sp.trim()) })))}
      />
      <input type="hidden" name="bubble_eyebrow" value={bubble.eyebrow} />
      <input type="hidden" name="bubble_heading" value={bubble.heading} />
      <input type="hidden" name="bubble_description" value={bubble.description} />
      <input type="hidden" name="bubble_image" value={bubble.image || ""} />
      <input type="hidden" name="bubble_buttonText" value={bubble.buttonText} />
      <input type="hidden" name="bubble_features" value={JSON.stringify(bubbleFeatures)} />
      <input type="hidden" name="bubble_howToHeading" value={bubble.howToHeading} />
      <input type="hidden" name="bubble_howToBadge" value={bubble.howToBadge} />
      <input type="hidden" name="bubble_steps" value={JSON.stringify(bubbleSteps)} />
      <input type="hidden" name="accessories_eyebrow" value={accessories.eyebrow} />
      <input type="hidden" name="accessories_heading" value={accessories.heading} />
      <input type="hidden" name="featureStrip" value={JSON.stringify(featureStrip)} />
      <input type="hidden" name="galleryHeading_eyebrow" value={galleryHeading.eyebrow} />
      <input type="hidden" name="galleryHeading_heading" value={galleryHeading.heading} />
      <input type="hidden" name="gallery" value={JSON.stringify(gallery)} />
      <input type="hidden" name="testimonialsHeading_eyebrow" value={testimonialsHeading.eyebrow} />
      <input type="hidden" name="testimonialsHeading_heading" value={testimonialsHeading.heading} />
      <input type="hidden" name="testimonials" value={JSON.stringify(testimonials)} />
      <input type="hidden" name="faqsHeading_eyebrow" value={faqsHeading.eyebrow} />
      <input type="hidden" name="faqsHeading_heading" value={faqsHeading.heading} />
      <input type="hidden" name="faqs" value={JSON.stringify(faqs)} />
      <input type="hidden" name="newsletter_heading" value={newsletter.heading} />
      <input type="hidden" name="newsletter_subtext" value={newsletter.subtext} />
      <input type="hidden" name="newsletter_image" value={newsletter.image || ""} />

      {/* Section tabs */}
      <div className="no-scrollbar sticky top-0 z-20 -mx-1 mb-6 flex gap-1.5 overflow-x-auto border-b border-slate-100 bg-slate-50/80 px-1 py-2 backdrop-blur">
        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          const visible = sectionVisibility[tab.id] !== false;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl py-2.5 pl-3.5 pr-2 text-sm font-semibold transition ${
                active ? "bg-gradient-to-r from-brand-700 to-brand-800 text-white shadow-sm" : "text-slate-600 hover:bg-white hover:text-brand-700"
              } ${visible ? "" : "opacity-50"}`}
            >
              <tab.icon size={15} className={active ? "text-white" : "text-slate-400"} />
              {tab.label}
              <span
                role="button"
                tabIndex={0}
                onClick={toggleSectionVisibility(tab.id)}
                onKeyDown={(e) => e.key === "Enter" && toggleSectionVisibility(tab.id)(e)}
                title={visible ? "Visible on homepage — click to hide" : "Hidden from homepage — click to show"}
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg transition ${
                  active ? "hover:bg-white/20" : "hover:bg-slate-200"
                }`}
              >
                {visible ? <Eye size={13} /> : <EyeOff size={13} className={active ? "text-white/70" : "text-slate-400"} />}
              </span>
            </button>
          );
        })}
      </div>

      <div className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-xs">
        {/* Hero Banner(s) */}
        {activeTab === "hero" && (
          <div>
            <div className="flex items-center justify-between">
              <SectionTitle icon={Sparkles}>Hero Banners</SectionTitle>
              <button
                type="button"
                onClick={addSlide}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 hover:underline"
              >
                <Plus size={14} />
                Add banner
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Add multiple banners to rotate through automatically on the homepage — great for running a few promotions at once.
            </p>

            {/* Slide tabs */}
            <div className="mt-4 flex flex-wrap gap-2 border-b border-slate-100 pb-4">
              {heroSlides.map((slide, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`group flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-xs font-bold transition ${
                    activeSlide === idx
                      ? "border-brand-700 bg-brand-50 text-brand-800"
                      : "border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  Banner {idx + 1}
                  {heroSlides.length > 1 && (
                    <span
                      role="button"
                      tabIndex={-1}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSlide(idx);
                      }}
                      className="rounded-full p-0.5 text-slate-300 hover:bg-red-50 hover:text-red-600"
                      aria-label={`Remove banner ${idx + 1}`}
                    >
                      <X size={12} />
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Active slide panel */}
            {heroSlides[activeSlide] && (
              <div key={activeSlide} className="mt-4 grid gap-5 lg:grid-cols-[240px_1fr]">
                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>Photo (desktop)</label>
                    <ImageUploader
                      value={heroSlides[activeSlide].image}
                      onChange={(url) => updateSlide(activeSlide, "image", url)}
                      previewClassName="aspect-[16/9] w-full"
                    />
                    <p className="mt-1.5 text-[11px] text-slate-400">Wide banner photo — matches the homepage hero (16:9).</p>
                  </div>

                  <div>
                    <label className={labelClass}>Photo (mobile)</label>
                    <ImageUploader
                      value={heroSlides[activeSlide].mobileImage}
                      onChange={(url) => updateSlide(activeSlide, "mobileImage", url)}
                      previewClassName="aspect-[9/16] w-full max-w-[160px]"
                    />
                    <p className="mt-1.5 text-[11px] text-slate-400">
                      Optional portrait crop (9:16) shown on phones. Leave empty to reuse the desktop photo.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Badge 1 (left pill)</label>
                    <input
                      value={heroSlides[activeSlide].badge1}
                      onChange={(e) => updateSlide(activeSlide, "badge1", e.target.value)}
                      className={inputClass}
                      placeholder="Wholesale Pricing"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Badge 2 (right pill)</label>
                    <input
                      value={heroSlides[activeSlide].badge2}
                      onChange={(e) => updateSlide(activeSlide, "badge2", e.target.value)}
                      className={inputClass}
                      placeholder="Delivery Across UAE"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Eyebrow text</label>
                    <input
                      value={heroSlides[activeSlide].eyebrow}
                      onChange={(e) => updateSlide(activeSlide, "eyebrow", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Heading line 1</label>
                    <input
                      value={heroSlides[activeSlide].heading_line1}
                      onChange={(e) => updateSlide(activeSlide, "heading_line1", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Heading line 2 (gradient)</label>
                    <input
                      value={heroSlides[activeSlide].heading_line2}
                      onChange={(e) => updateSlide(activeSlide, "heading_line2", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Description</label>
                    <textarea
                      rows={3}
                      value={heroSlides[activeSlide].description}
                      onChange={(e) => updateSlide(activeSlide, "description", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Button text</label>
                    <input
                      value={heroSlides[activeSlide].ctaText}
                      onChange={(e) => updateSlide(activeSlide, "ctaText", e.target.value)}
                      className={inputClass}
                      placeholder="Shop All Collection"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Button link</label>
                    <input
                      value={heroSlides[activeSlide].ctaLink}
                      onChange={(e) => updateSlide(activeSlide, "ctaLink", e.target.value)}
                      className={inputClass}
                      placeholder="/shop"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Floating badge title (bottom-right, desktop)</label>
                    <input
                      value={heroSlides[activeSlide].floatingBadgeTitle}
                      onChange={(e) => updateSlide(activeSlide, "floatingBadgeTitle", e.target.value)}
                      className={inputClass}
                      placeholder="Wholesale Supply"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Floating badge subtitle</label>
                    <input
                      value={heroSlides[activeSlide].floatingBadgeSubtitle}
                      onChange={(e) => updateSlide(activeSlide, "floatingBadgeSubtitle", e.target.value)}
                      className={inputClass}
                      placeholder="Across UAE"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Foil Balloons Collection */}
        {activeTab === "foil" && (
          <div>
            <SectionTitle icon={Sparkles}>Foil Balloons Section</SectionTitle>
            <p className="mt-1 text-xs text-slate-500">
              The shape/theme grid comes from your catalogue automatically. The featured banner is a slider — add a few
              slides below, each linked to a real product.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Eyebrow text</label>
                <input value={foil.eyebrow} onChange={setFoilField("eyebrow")} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Heading</label>
                <input value={foil.heading} onChange={setFoilField("heading")} className={inputClass} />
              </div>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold">Featured Banner Slides</h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Leave empty to auto-show a featured product from your catalogue instead.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addFoilSlide}
                  className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-brand-700 hover:underline"
                >
                  <Plus size={14} />
                  Add slide
                </button>
              </div>

              {foilSlides.length === 0 ? (
                <button
                  type="button"
                  onClick={addFoilSlide}
                  className="mt-4 flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-8 text-slate-400 transition hover:border-brand-400 hover:text-brand-600"
                >
                  <Sparkles size={22} />
                  <span className="text-xs font-semibold">No slides yet — add your first one</span>
                </button>
              ) : (
                <>
                  <div className="mt-4 flex flex-wrap gap-2 border-b border-slate-100 pb-4">
                    {foilSlides.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveFoilSlide(idx)}
                        className={`group flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-xs font-bold transition ${
                          activeFoilSlide === idx
                            ? "border-brand-700 bg-brand-50 text-brand-800"
                            : "border-slate-200 text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        Slide {idx + 1}
                        <span
                          role="button"
                          tabIndex={-1}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFoilSlide(idx);
                          }}
                          className="rounded-full p-0.5 text-slate-300 hover:bg-red-50 hover:text-red-600"
                          aria-label={`Remove slide ${idx + 1}`}
                        >
                          <X size={12} />
                        </span>
                      </button>
                    ))}
                  </div>

                  {foilSlides[activeFoilSlide] && (
                    <div key={activeFoilSlide} className="mt-4 grid gap-5 lg:grid-cols-[200px_1fr]">
                      <div>
                        <label className={labelClass}>Photo</label>
                        <ImageUploader
                          value={foilSlides[activeFoilSlide].image}
                          onChange={(url) => updateFoilSlide(activeFoilSlide, "image", url)}
                          previewClassName="aspect-square w-full"
                        />
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className={labelClass}>Title</label>
                          <input
                            value={foilSlides[activeFoilSlide].title}
                            onChange={(e) => updateFoilSlide(activeFoilSlide, "title", e.target.value)}
                            placeholder='e.g. 32" Number Foil Balloon (0–9)'
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className={labelClass}>Link to product</label>
                          <ProductPicker
                            products={products}
                            slide={foilSlides[activeFoilSlide]}
                            onLink={(p) => linkFoilSlideProduct(activeFoilSlide, p)}
                            onClear={() => unlinkFoilSlideProduct(activeFoilSlide)}
                          />
                          <p className="mt-1.5 text-[11px] text-slate-400">
                            The &quot;Shop Now&quot; button on this slide will open the linked product&apos;s page.
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <label className={labelClass}>Spec bullets</label>
                            <button
                              type="button"
                              onClick={() => addFoilSlideSpec(activeFoilSlide)}
                              className="mb-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-brand-700 hover:underline"
                            >
                              <Plus size={12} />
                              Add line
                            </button>
                          </div>
                          <div className="space-y-2">
                            {foilSlides[activeFoilSlide].specs.map((spec, specIdx) => (
                              <div key={specIdx} className="flex gap-2">
                                <input
                                  value={spec}
                                  onChange={(e) => updateFoilSlideSpec(activeFoilSlide, specIdx, e.target.value)}
                                  placeholder="e.g. Inflated Size: 18 inch / 45 cm"
                                  className={inputClass}
                                />
                                <button
                                  type="button"
                                  onClick={() => removeFoilSlideSpec(activeFoilSlide, specIdx)}
                                  className="shrink-0 rounded-xl p-3 text-slate-400 hover:bg-red-50 hover:text-red-600"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Bubble & Specialty */}
        {activeTab === "bubble" && (
          <div>
            <SectionTitle icon={Droplets}>Bubble &amp; Specialty Section</SectionTitle>
            <div className="mt-4 grid gap-5 lg:grid-cols-[240px_1fr]">
              <div>
                <label className={labelClass}>Photo</label>
                <ImageUploader
                  value={bubble.image}
                  onChange={(url) => setBubble((c) => ({ ...c, image: url }))}
                  previewClassName="aspect-square w-full"
                />
                <p className="mt-1.5 text-[11px] text-slate-400">Square photo (1:1) — matches this section&apos;s showcase image.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Eyebrow text</label>
                  <input value={bubble.eyebrow} onChange={setBubbleField("eyebrow")} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Heading</label>
                  <input value={bubble.heading} onChange={setBubbleField("heading")} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Description</label>
                  <textarea rows={4} value={bubble.description} onChange={setBubbleField("description")} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Button text</label>
                  <input value={bubble.buttonText} onChange={setBubbleField("buttonText")} className={inputClass} />
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <h3 className="text-sm font-bold">Feature List</h3>
              <p className="mt-0.5 text-xs text-slate-500">The 3 rows shown under the description (icons stay fixed).</p>
              <div className="mt-3 space-y-2.5">
                {bubbleFeatures.map((feature, idx) => (
                  <div key={idx} className="flex gap-2.5">
                    <input
                      value={feature.title}
                      onChange={(e) => updateBubbleFeature(idx, "title", e.target.value)}
                      placeholder="Title"
                      className={inputClass}
                    />
                    <input
                      value={feature.copy}
                      onChange={(e) => updateBubbleFeature(idx, "copy", e.target.value)}
                      placeholder="Description"
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold">How-To Card</h3>
                <button
                  type="button"
                  onClick={() => setBubbleSteps((current) => [...current, { ...BLANK_STEP }])}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 hover:underline"
                >
                  <Plus size={14} />
                  Add step
                </button>
              </div>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Card heading</label>
                  <input value={bubble.howToHeading} onChange={setBubbleField("howToHeading")} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Card badge</label>
                  <input value={bubble.howToBadge} onChange={setBubbleField("howToBadge")} className={inputClass} placeholder="Step-by-step" />
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {bubbleSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-100 p-3.5">
                    <span className="mt-1.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-purple-700 text-xs font-bold text-white">
                      {idx + 1}
                    </span>
                    <div className="shrink-0">
                      <ImageUploader
                        value={step.image}
                        onChange={(url) => updateBubbleStep(idx, "image", url)}
                        previewClassName="h-16 w-20"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={step.copy}
                      onChange={(e) => updateBubbleStep(idx, "copy", e.target.value)}
                      placeholder="Step description"
                      className={`${inputClass} flex-1`}
                    />
                    <button
                      type="button"
                      onClick={() => setBubbleSteps((current) => current.filter((_, i) => i !== idx))}
                      className="mt-1.5 shrink-0 rounded-xl p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Accessories */}
        {activeTab === "accessories" && (
          <div>
            <SectionTitle icon={Package}>Our Products Section</SectionTitle>
            <p className="mt-1 text-xs text-slate-500">
              This text is used for the &ldquo;Our Products&rdquo; showcase near the top of the homepage — products
              shown there are pulled from your catalogue automatically. (Also feeds the separate Accessories row,
              which is hidden by default — see its eye icon on the tab above.)
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Eyebrow text</label>
                <input value={accessories.eyebrow} onChange={setAccessoriesField("eyebrow")} className={inputClass} placeholder="Shop The Collection" />
              </div>
              <div>
                <label className={labelClass}>Heading</label>
                <input value={accessories.heading} onChange={setAccessoriesField("heading")} className={inputClass} placeholder="Our Products" />
              </div>
            </div>
          </div>
        )}

        {/* Feature strip */}
        {activeTab === "features" && (
          <div>
            <SectionTitle icon={ShieldCheck}>Trust Badges Strip</SectionTitle>
            <p className="mt-1 text-xs text-slate-500">The 5-icon row shown between Accessories and the inspiration gallery.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {featureStrip.map((item, idx) => (
                <div key={idx} className="space-y-2 rounded-xl border border-slate-100 p-3.5">
                  <input
                    value={item.title}
                    onChange={(e) => updateFeature(idx, "title", e.target.value)}
                    placeholder="Title"
                    className={inputClass}
                  />
                  <input
                    value={item.copy}
                    onChange={(e) => updateFeature(idx, "copy", e.target.value)}
                    placeholder="Short description"
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {activeTab === "gallery" && (
          <div>
            <div className="flex items-center justify-between">
              <SectionTitle icon={Images}>Get Inspired Gallery</SectionTitle>
              <button
                type="button"
                onClick={() => setGallery((current) => [...current, { title: "", theme: "birthday", image: "" }])}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 hover:underline"
              >
                <Plus size={14} />
                Add card
              </button>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Eyebrow text</label>
                <input value={galleryHeading.eyebrow} onChange={setGalleryHeadingField("eyebrow")} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Heading</label>
                <input value={galleryHeading.heading} onChange={setGalleryHeadingField("heading")} className={inputClass} />
              </div>
            </div>

            <p className="mt-5 text-[11px] text-slate-400">Cards are square (1:1) on the homepage — photos are cropped to fit.</p>
            <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {gallery.map((item, idx) => (
                <div key={idx} className="space-y-2.5 rounded-xl border border-slate-100 p-4">
                  <ImageUploader
                    value={item.image}
                    onChange={(url) => updateGalleryItem(idx, "image", url)}
                    previewClassName="aspect-square w-full"
                    folder="fatima-express/gallery"
                  />
                  <input
                    value={item.title}
                    onChange={(e) => updateGalleryItem(idx, "title", e.target.value)}
                    placeholder="Card title"
                    className={inputClass}
                  />
                  <select value={item.theme} onChange={(e) => updateGalleryItem(idx, "theme", e.target.value)} className={inputClass}>
                    {themes.map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setGallery((current) => current.filter((_, i) => i !== idx))}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:underline"
                  >
                    <Trash2 size={13} />
                    Remove card
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials */}
        {activeTab === "testimonials" && (
          <div>
            <div className="flex items-center justify-between">
              <SectionTitle icon={MessageSquareQuote}>Customer Testimonials</SectionTitle>
              <button
                type="button"
                onClick={() => setTestimonials((current) => [...current, { ...BLANK_TESTIMONIAL }])}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 hover:underline"
              >
                <Plus size={14} />
                Add testimonial
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Auto-slides on the homepage — customers see one at a time, rotating every few seconds.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Eyebrow text</label>
                <input value={testimonialsHeading.eyebrow} onChange={setTestimonialsHeadingField("eyebrow")} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Heading</label>
                <input value={testimonialsHeading.heading} onChange={setTestimonialsHeadingField("heading")} className={inputClass} />
              </div>
            </div>

            <div className="mt-5 space-y-4 border-t border-slate-100 pt-5">
              {testimonials.map((item, idx) => (
                <div key={idx} className="grid gap-4 rounded-xl border border-slate-100 p-4 lg:grid-cols-[100px_1fr]">
                  <div>
                    <label className={labelClass}>Photo</label>
                    <ImageUploader
                      value={item.avatar}
                      onChange={(url) => updateTestimonial(idx, "avatar", url)}
                      previewClassName="aspect-square w-full"
                    />
                    <p className="mt-1.5 text-[11px] text-slate-400">Optional — falls back to a generic avatar.</p>
                  </div>

                  <div className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        value={item.name}
                        onChange={(e) => updateTestimonial(idx, "name", e.target.value)}
                        placeholder="Customer name"
                        className={inputClass}
                      />
                      <input
                        value={item.role}
                        onChange={(e) => updateTestimonial(idx, "role", e.target.value)}
                        placeholder="Role / location (optional)"
                        className={inputClass}
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={item.quote}
                      onChange={(e) => updateTestimonial(idx, "quote", e.target.value)}
                      placeholder="What they said…"
                      className={inputClass}
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, starIdx) => {
                          const value = starIdx + 1;
                          const active = value <= (item.rating ?? 5);
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => updateTestimonial(idx, "rating", value)}
                              aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                              className="p-0.5"
                            >
                              <Star size={18} className={active ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-200"} />
                            </button>
                          );
                        })}
                      </div>
                      <button
                        type="button"
                        onClick={() => setTestimonials((current) => current.filter((_, i) => i !== idx))}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:underline"
                      >
                        <Trash2 size={13} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {testimonials.length === 0 && (
                <button
                  type="button"
                  onClick={() => setTestimonials((current) => [...current, { ...BLANK_TESTIMONIAL }])}
                  className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-8 text-slate-400 transition hover:border-brand-400 hover:text-brand-600"
                >
                  <MessageSquareQuote size={22} />
                  <span className="text-xs font-semibold">No testimonials yet — add your first one</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* FAQs */}
        {activeTab === "faqs" && (
          <div>
            <div className="flex items-center justify-between">
              <SectionTitle icon={HelpCircle}>Frequently Asked Questions</SectionTitle>
              <button
                type="button"
                onClick={() => setFaqs((current) => [...current, { ...BLANK_FAQ }])}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 hover:underline"
              >
                <Plus size={14} />
                Add FAQ
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Shown on the homepage as an accordion — customers click a question to reveal the answer.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Eyebrow text</label>
                <input value={faqsHeading.eyebrow} onChange={setFaqsHeadingField("eyebrow")} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Heading</label>
                <input value={faqsHeading.heading} onChange={setFaqsHeadingField("heading")} className={inputClass} />
              </div>
            </div>

            <div className="mt-5 space-y-4 border-t border-slate-100 pt-5">
              {faqs.map((item, idx) => (
                <div key={idx} className="space-y-3 rounded-xl border border-slate-100 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <input
                      value={item.question}
                      onChange={(e) => updateFaq(idx, "question", e.target.value)}
                      placeholder="Question"
                      className={`${inputClass} font-semibold`}
                    />
                    <button
                      type="button"
                      onClick={() => setFaqs((current) => current.filter((_, i) => i !== idx))}
                      className="mt-2.5 inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-red-500 hover:underline"
                    >
                      <Trash2 size={13} />
                      Remove
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={item.answer}
                    onChange={(e) => updateFaq(idx, "answer", e.target.value)}
                    placeholder="Answer…"
                    className={inputClass}
                  />
                </div>
              ))}
              {faqs.length === 0 && (
                <button
                  type="button"
                  onClick={() => setFaqs((current) => [...current, { ...BLANK_FAQ }])}
                  className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-8 text-slate-400 transition hover:border-brand-400 hover:text-brand-600"
                >
                  <HelpCircle size={22} />
                  <span className="text-xs font-semibold">No FAQs yet — add your first one</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Newsletter */}
        {activeTab === "newsletter" && (
          <div>
            <SectionTitle icon={Gift}>Newsletter Banner</SectionTitle>
            <p className="mt-1 text-xs text-slate-500">Shown at the bottom of the homepage above the footer.</p>
            <div className="mt-4 grid gap-5 lg:grid-cols-[200px_1fr]">
              <div>
                <label className={labelClass}>Photo</label>
                <ImageUploader
                  value={newsletter.image}
                  onChange={(url) => setNewsletter((c) => ({ ...c, image: url }))}
                  previewClassName="aspect-square w-full"
                />
              </div>
              <div className="grid gap-4">
                <div>
                  <label className={labelClass}>Heading</label>
                  <input value={newsletter.heading} onChange={setNewsletterField("heading")} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Subtext</label>
                  <input value={newsletter.subtext} onChange={setNewsletterField("subtext")} className={inputClass} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {state.error && <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{state.error}</p>}
      {state.success && <p className="mt-6 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">Home page updated.</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-700 to-brand-800 px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {pending && <LoaderCircle size={16} className="animate-spin" />}
        Save Home Page
      </button>
    </form>
  );
}
