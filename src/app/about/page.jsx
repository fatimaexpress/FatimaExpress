import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  Boxes,
  Check,
  MapPin,
  PackageCheck,
  Quote,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";
import BalloonVisual from "@/components/product/BalloonVisual";
import { emirates, whatsappLink } from "@/data/site";
import { getContactPublic } from "@/lib/siteSettings";
import { getAboutContentPublic } from "@/lib/aboutContent";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export const metadata = {
  title: "About Us",
  description:
    "Fatima Express is a UAE-based wholesale supplier of premium foil balloons, bubble balloons and professional balloon equipment. Globex Party Distributor UAE is managed and operated by Fatima Express.",
};

const statIcons = [MapPin, Boxes, Truck, ShieldCheck];

const offerMeta = [
  { icon: Sparkles, visual: { kind: "heart", color: "#e8bcae" }, accent: "bg-rose-500", bg: "bg-rose-50", iconColor: "text-rose-600" },
  { icon: Boxes, visual: { kind: "bubble", color: "#bcdcff" }, accent: "bg-blue-500", bg: "bg-blue-50", iconColor: "text-blue-600" },
  { icon: Wrench, visual: { kind: "pump", color: "#d9b352" }, accent: "bg-amber-500", bg: "bg-amber-50", iconColor: "text-amber-600" },
];

const reasonIcons = [PackageCheck, Check, Truck];

export default async function AboutPage() {
  const [contact, content] = await Promise.all([getContactPublic(), getAboutContentPublic()]);
  const { hero, stats, story, offers, reasons, delivery, ctaBanner } = content;

  return (
    <div className="font-sans bg-[#FAF9FC] text-slate-950 min-h-screen">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28 border-b border-slate-200/70">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-purple-100/60 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 top-0 h-64 w-64 rounded-full bg-purple-50 blur-3xl" />

        {/* Floating 3D Balloon visuals */}
        <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 items-end gap-6 lg:flex xl:right-16">
          <div className="animate-float opacity-90 drop-shadow-xl" style={{ animationDelay: "0s" }}>
            <BalloonVisual visual={{ kind: "heart", color: "#f472b6" }} size={115} />
          </div>
          <div className="animate-float mb-10 opacity-80 drop-shadow-xl" style={{ animationDelay: "0.7s" }}>
            <BalloonVisual visual={{ kind: "star", color: "#fbbf24" }} size={90} />
          </div>
          <div className="animate-float opacity-85 drop-shadow-xl" style={{ animationDelay: "0.4s" }}>
            <BalloonVisual visual={{ kind: "bubble", color: "#bcdcff" }} size={125} />
          </div>
        </div>

        <div className="container-page relative z-10 max-w-6xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#7E22CE]">
            <Sparkles size={15} className="text-[#7E22CE]" /> {hero.badge}
          </p>

          <h1 className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] max-w-3xl text-slate-900">
            {hero.heading}
          </h1>

          <p className="mt-5 max-w-2xl text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed font-medium">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={hero.ctaLink || "/shop"}
              className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 rounded-2xl bg-[#7E22CE] hover:bg-[#6B21A8] px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base lg:text-lg font-extrabold text-white shadow-lg shadow-purple-200 transition-all duration-300 active:scale-95"
            >
              {hero.ctaText}
              <ArrowRight size={18} className="shrink-0" />
            </Link>
            <a
              href={whatsappLink(undefined, contact.whatsapp)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 rounded-2xl border border-slate-300 bg-white px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base lg:text-lg font-bold text-slate-800 transition duration-300 hover:border-[#7E22CE] hover:text-[#7E22CE] hover:shadow-sm active:scale-95"
            >
              <WhatsAppIcon size={20} className="text-emerald-600 shrink-0" />
              Talk to Sales
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div className="container-page relative z-10 max-w-6xl mt-14 sm:mt-16 grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-4">
          {stats.map(({ value, label }, index) => {
            const Icon = statIcons[index] ?? statIcons[0];
            return (
              <div
                key={label}
                className="group rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-md"
              >
                <Icon size={22} className="text-[#7E22CE] transition-transform duration-300 group-hover:scale-110" />
                <p className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-slate-900">{value}</p>
                <p className="mt-1 text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">{label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── OUR STORY ─────────────────────────────────────── */}
      <section className="container-page max-w-6xl py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Balloon photo */}
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 overflow-hidden rounded-3xl border border-purple-100/80 shadow-lg bg-[#FFF5F8]">
              <Image
                src={story.image}
                alt="A bouquet of premium foil and bubble balloons"
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover object-top"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -left-3.5 bottom-6 z-10 rounded-2xl border border-purple-100/90 bg-white/95 px-5 py-3.5 shadow-xl backdrop-blur-md">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#7E22CE]">{story.badgeLabel}</p>
              <p className="mt-0.5 text-base sm:text-lg font-black text-slate-900">{story.badgeValue}</p>
            </div>
          </div>

          <div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#7E22CE] font-sans">
              {story.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              {story.heading}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              {story.paragraph}
            </p>

            <p className="mt-3 text-sm text-slate-500 font-medium">
              Globex Party Distributor UAE is managed and operated by Fatima Express.
            </p>

            <div className="mt-6 flex items-start gap-4 rounded-3xl border border-purple-100/80 bg-white p-5 sm:p-6 shadow-xs">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-purple-100 text-[#7E22CE] font-bold">
                <Quote size={20} />
              </span>
              <p className="text-sm sm:text-base italic leading-relaxed text-slate-800 font-medium pt-0.5">
                {story.quote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE OFFER ─────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-20 lg:py-24 border-y border-slate-200/60 shadow-2xs">
        <div className="container-page max-w-6xl">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#7E22CE] font-sans">
            Catalogue
          </p>
          <h2 className="mt-2 font-display text-2xl sm:text-4xl font-black text-slate-900">
            What We Offer
          </h2>

          <div className="mt-8 sm:mt-10 grid gap-6 md:grid-cols-3">
            {offers.map(({ title, copy }, index) => {
              const meta = offerMeta[index] ?? offerMeta[0];
              const Icon = meta.icon;
              return (
                <div
                  key={title}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-[#FAF9FC] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-900/10"
                >
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${meta.accent}`} />

                  {/* Background balloon watermark */}
                  <div className="absolute -right-5 -top-5 opacity-[0.08] transition-all duration-500 group-hover:opacity-[0.16] group-hover:scale-110">
                    <BalloonVisual visual={meta.visual} size={120} />
                  </div>

                  <span className={`relative grid h-12 w-12 place-items-center rounded-2xl ${meta.bg} shadow-2xs`}>
                    <Icon size={22} className={meta.iconColor} />
                  </span>
                  <h3 className="relative mt-5 text-lg sm:text-xl font-black text-slate-900">{title}</h3>
                  <p className="relative mt-2 text-sm sm:text-base leading-relaxed text-slate-700 font-medium">{copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────── */}
      <section className="container-page max-w-6xl py-14 sm:py-20 lg:py-24">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#7E22CE] font-sans">
          The Difference
        </p>
        <h2 className="mt-2 font-display text-2xl sm:text-4xl font-black text-slate-900">
          Why Choose Us
        </h2>

        <div className="mt-8 sm:mt-10 grid gap-6 md:grid-cols-3">
          {reasons.map(({ title, copy }, index) => {
            const Icon = reasonIcons[index] ?? reasonIcons[0];
            return (
              <div
                key={title}
                className="relative rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-900/10"
              >
                <span className="absolute right-6 top-6 text-4xl font-black text-purple-100 select-none">
                  0{index + 1}
                </span>
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-purple-50 text-[#7E22CE] shadow-2xs">
                  <Icon size={22} />
                </span>
                <h3 className="relative mt-5 text-lg sm:text-xl font-black text-slate-900">{title}</h3>
                <p className="relative mt-2 text-sm sm:text-base leading-relaxed text-slate-700 font-medium">{copy}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── DELIVERY ──────────────────────────────────────── */}
      <section id="delivery" className="bg-white border-t border-slate-200/60 py-14 sm:py-20 lg:py-24 scroll-mt-24">
        <div className="container-page max-w-6xl">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#7E22CE] font-sans">
            {delivery.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-2xl sm:text-4xl font-black text-slate-900">
            {delivery.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            {delivery.description}
          </p>

          <div className="mt-8 sm:mt-10 grid gap-6 md:grid-cols-3">
            {delivery.tiers.map((tier, index) => (
              <div
                key={tier.title}
                className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 ${
                  index === 0
                    ? "border-2 border-purple-200 bg-purple-50/60 shadow-xs hover:shadow-md"
                    : "border border-slate-200/80 bg-[#FAF9FC] hover:bg-white hover:border-purple-300 hover:shadow-xl"
                }`}
              >
                {index === 0 && (
                  <div className="pointer-events-none absolute -right-4 -top-4 text-purple-200/70">
                    <Award size={90} />
                  </div>
                )}
                {tier.badge && (
                  <span className="mb-4 inline-block rounded-full bg-emerald-500 px-3.5 py-1 text-xs font-black uppercase text-white tracking-widest shadow-md shadow-emerald-500/25">
                    {tier.badge}
                  </span>
                )}
                <h3 className="relative text-lg sm:text-xl font-black text-slate-900">
                  {tier.title}
                </h3>
                <p className="relative mt-2 text-sm sm:text-base leading-relaxed font-medium text-slate-700">
                  {tier.copy}
                </p>
              </div>
            ))}
          </div>

          {/* Emirates chips */}
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-2.5 sm:gap-3">
            {emirates.map((e) => (
              <span
                key={e.value}
                className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50/60 px-4.5 py-2.5 text-sm sm:text-base font-bold text-slate-900 transition hover:bg-purple-100 hover:border-purple-200"
              >
                <MapPin size={15} className="text-[#7E22CE]" />
                {e.label}
              </span>
            ))}
          </div>

          {/* Sexy Light Theme CTA Banner */}
          <div className="relative mt-12 sm:mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-[#FFF5F8] via-[#FDF2F8] to-[#F5F3FF] p-8 sm:p-12 lg:p-14 border border-purple-200/90 shadow-xl shadow-purple-900/5">
            {/* Ambient Background Glowing Blobs */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-pink-300/30 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 h-80 w-80 rounded-full bg-purple-300/25 blur-3xl" />

            <div className="relative z-10 max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#D946EF] px-4 py-1.5 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white shadow-md shadow-purple-500/20">
                <Sparkles size={14} className="text-amber-300 fill-amber-300" />
                {ctaBanner.badge}
              </span>
              
              <h3 className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
                {ctaBanner.heading}
              </h3>
              
              <p className="mt-3.5 text-slate-700 text-base sm:text-lg leading-relaxed font-medium max-w-2xl">
                {ctaBanner.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={whatsappLink(undefined, contact.whatsapp)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap shrink-0 rounded-2xl bg-emerald-500 hover:bg-emerald-600 px-7 sm:px-9 py-4 text-sm sm:text-base lg:text-lg font-extrabold text-white shadow-lg shadow-emerald-200 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <WhatsAppIcon size={22} className="shrink-0" />
                  <span>Chat on WhatsApp</span>
                </a>
                
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap shrink-0 rounded-2xl border border-purple-200 bg-white hover:bg-purple-50 px-7 sm:px-9 py-4 text-sm sm:text-base lg:text-lg font-extrabold text-[#7E22CE] shadow-sm transition-all duration-300 hover:border-purple-300 hover:scale-105 active:scale-95"
                >
                  <span>Send an enquiry</span>
                  <ArrowRight size={18} className="shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
