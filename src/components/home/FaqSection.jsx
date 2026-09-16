"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles, ThumbsUp, CheckCircle2, ArrowRight } from "lucide-react";
import { DEFAULT_HOME_CONTENT } from "@/lib/homeContent";

function WhatsAppIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export default function FaqSection({ faqs, heading }) {
  const items = faqs?.length ? faqs : DEFAULT_HOME_CONTENT.faqs;
  const { eyebrow, heading: title } = heading ?? DEFAULT_HOME_CONTENT.faqsHeading;

  const [openIdx, setOpenIdx] = useState(0);
  const [helpfulFeedback, setHelpfulFeedback] = useState({});

  const handleHelpfulClick = (idx, e) => {
    e.stopPropagation();
    setHelpfulFeedback((prev) => ({ ...prev, [idx]: true }));
  };

  if (!items?.length) return null;

  return (
    <section className="relative overflow-hidden py-14 lg:py-20 font-sans bg-slate-50/50">
      
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-purple-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-pink-100/60 blur-3xl" />
      
      <div className="container-page relative max-w-4xl">
        
        {/* Section Header */}
        <div className="mb-10 text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FCE7F3] px-4 py-1.5 font-display text-base font-bold text-[#D946EF] shadow-2xs">
            <Sparkles size={14} className="text-[#EAB308] fill-[#EAB308] animate-pulse" />
            {eyebrow || "Got Questions?"}
          </span>

          <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0F172A]">
            {title || "Frequently Asked Questions"}
          </h2>
          
          <p className="mt-2.5 text-base sm:text-base font-medium text-slate-600 max-w-lg leading-relaxed">
            Quick answers about UAE delivery, wholesale discounts, payment options, and balloon supplies.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {items.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const isHelpful = helpfulFeedback[idx];

            return (
              <div
                key={idx}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-2 border-[#7E22CE] bg-white shadow-xl shadow-purple-900/5 transform translate-y-0"
                    : "border-slate-200/90 bg-white shadow-2xs hover:border-purple-300 hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-4.5 sm:p-5 text-left group gap-4"
                >
                  <div className="flex items-center gap-3.5 shrink min-w-0">
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-base font-extrabold shadow-2xs transition-all duration-200 ${
                        isOpen
                          ? "bg-[#7E22CE] text-white rotate-3 scale-105"
                          : "bg-purple-100 text-[#7E22CE] group-hover:bg-[#7E22CE] group-hover:text-white"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span className="font-display text-base sm:text-base font-extrabold text-[#0F172A] leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 bg-[#7E22CE] text-white shadow-sm"
                        : "bg-purple-50 text-[#7E22CE] group-hover:bg-[#7E22CE] group-hover:text-white"
                    }`}
                  >
                    <ChevronDown size={18} strokeWidth={2.5} />
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-purple-50 p-4.5 sm:p-6 pt-3 bg-[#FFF5F8]/40 animate-fadeIn">
                    <div className="border-l-4 border-[#7E22CE] pl-4 py-1 text-base sm:text-base font-medium leading-relaxed text-slate-700">
                      {faq.answer}
                    </div>

                    {/* Interactive Feedback & WhatsApp Strip */}
                    <div className="mt-4 pt-3 border-t border-purple-100/60 flex flex-wrap items-center justify-between gap-3 text-sm sm:text-base">
                      <div className="flex items-center gap-2 text-slate-500 font-medium">
                        <span className="whitespace-nowrap">Helpful?</span>
                        <button
                          type="button"
                          onClick={(e) => handleHelpfulClick(idx, e)}
                          className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap px-2.5 py-1 rounded-full border transition-all ${
                            isHelpful
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold"
                              : "bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-[#7E22CE]"
                          }`}
                        >
                          {isHelpful ? (
                            <>
                              <CheckCircle2 size={13} className="text-emerald-600" />
                              <span>Yes, thanks!</span>
                            </>
                          ) : (
                            <>
                              <ThumbsUp size={12} />
                              <span>Yes</span>
                            </>
                          )}
                        </button>
                      </div>

                      <Link
                        href={`https://wa.me/971500000000?text=${encodeURIComponent(`Hi, I have a question about: "${faq.question}"`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-bold text-[#25D366] hover:text-[#20ba5a] hover:underline"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Need custom help? Chat on WhatsApp</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom VIP Help CTA Card */}
        <div className="mt-10 rounded-2xl border border-pink-200/80 bg-[#FFF5F8] p-5 sm:p-6 text-center flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm relative overflow-hidden">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 mb-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-extrabold text-emerald-700">UAE Support Online</span>
            </div>
            <h4 className="text-base sm:text-base font-extrabold text-[#0F172A]">Still have a specific question or custom order requirement?</h4>
            <p className="text-base font-medium text-slate-600 mt-1">
              Our Dubai customer support team is active Saturday–Thursday with typical replies in ~15 mins.
            </p>
          </div>

          <Link
            href="https://wa.me/971500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] px-6 py-3 font-display text-base sm:text-base font-extrabold text-white shadow-lg shadow-emerald-600/20 transition-all hover:scale-105 shrink-0 active:scale-95"
          >
            <WhatsAppIcon className="w-5 h-5 text-white" />
            <span>Chat Live on WhatsApp</span>
          </Link>
        </div>

      </div>
    </section>
  );
}


