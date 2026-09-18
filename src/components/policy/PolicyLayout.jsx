import Link from "next/link";
import { CheckCircle2, ChevronRight, FileText, HelpCircle, Mail, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { whatsappLink } from "@/data/site";
import { DEFAULT_CONTACT } from "@/lib/siteSettings";

const POLICY_LINKS = [
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Returns & Exchanges", href: "/returns" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function PolicyLayout({ title, updated, icon: Icon = FileText, highlights = [], contact = DEFAULT_CONTACT, children }) {
  return (
    <div className="relative overflow-hidden bg-[#FAF8FF] py-12 sm:py-16">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-purple-200/25 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent" />

      <div className="container-page relative max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="transition-colors hover:text-purple-700">
            Home
          </Link>
          <ChevronRight size={13} className="text-purple-300" />
          <span className="text-purple-700">Policies</span>
        </nav>

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-3xl border border-purple-200 bg-white text-purple-700 shadow-md sm:h-20 sm:w-20">
            <Icon size={32} strokeWidth={1.5} />
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-purple-700 shadow-sm">
            <Sparkles size={13} />
            Fatima Express Policies
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-slate-950 sm:text-5xl">{title}</h1>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold text-slate-500">
            Last updated {updated}
          </p>
        </div>

        {/* Quick policy nav */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {POLICY_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-xs transition hover:border-purple-300 hover:text-purple-700"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Highlights */}
        {highlights.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3.5 rounded-2xl border border-purple-100 bg-white p-4.5 shadow-sm">
                <CheckCircle2 size={22} className="shrink-0 text-purple-600" />
                <div>
                  <p className="text-sm font-extrabold text-slate-950">{item.title}</p>
                  <p className="mt-0.5 text-xs font-medium text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="relative mt-8 overflow-hidden rounded-[2rem] border border-purple-100 bg-white p-6 shadow-xl shadow-purple-950/5 sm:p-10">
          <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#6D28D9] via-[#9333EA] to-[#D946EF]" />

          <div className="relative space-y-6 text-sm leading-relaxed text-slate-700 sm:text-base">{children}</div>

          {/* CTA */}
          <div className="mt-10 rounded-3xl border border-purple-100 bg-gradient-to-r from-purple-50 via-pink-50 to-white p-6 sm:p-8">
            <div className="flex flex-col gap-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div>
                <div className="inline-flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-widest text-purple-700 sm:justify-start">
                  <HelpCircle size={16} />
                  Need Assistance?
                </div>
                <h4 className="mt-1 font-display text-xl font-extrabold text-slate-950">We&apos;re Here To Help</h4>
                <p className="mt-1 text-sm text-slate-600">
                  Questions about {title.toLowerCase()}? Our team responds promptly.
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <a
                  href={whatsappLink(`Hi Fatima Express, I have a question about your ${title}.`, contact.whatsapp)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#9333EA] px-6 py-3 text-sm font-bold text-white shadow-glow transition-all hover:-translate-y-0.5"
                >
                  <WhatsAppIcon size={16} />
                  WhatsApp Us
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center justify-center gap-2 rounded-full border border-purple-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-xs transition hover:border-purple-300 hover:text-purple-700"
                >
                  <Mail size={16} className="text-purple-600" />
                  Email Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
