"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { whatsappLink } from "@/data/site";

export default function WhatsAppFloatButton({ phone }) {
  const pathname = usePathname();

  // Hidden on product detail pages — it would overlap the sticky mobile
  // Add to Cart bar there. `/shop/` (not bare `/shop`) targets only
  // `/shop/[slug]`, leaving the shop listing page unaffected.
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/shop/") || !phone) return null;

  return (
    <a
      href={whatsappLink(undefined, phone)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform duration-200 hover:scale-110 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
