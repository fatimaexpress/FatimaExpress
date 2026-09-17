"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { site, whatsappLink } from "@/data/site";

export default function Footer({ contact = site }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="relative bg-[#030B21] text-slate-200 font-sans border-t border-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-5">
        {/* Brand Column */}
        <div className="lg:col-span-1.5">
          <div className="rounded-2xl bg-white/95 p-3 w-fit">
            <Logo src={contact.logoUrl} />
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate-300 max-w-sm font-medium">
            Your one-stop shop for premium foil balloons, bubble balloons &amp; party accessories to make every celebration unforgettable.
          </p>
          <div className="mt-6 flex gap-3.5">
            <a
              href={contact.facebook}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-200 hover:border-transparent hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:scale-110"
              aria-label="Facebook"
            >
              <FacebookIcon size={18} />
            </a>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-200 hover:border-transparent hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:scale-110"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href={whatsappLink(undefined, contact.whatsapp)}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-200 hover:border-transparent hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:scale-110"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={18} />
            </a>
          </div>
        </div>

        {/* Shop Column */}
        <div>
          <h4 className="text-base sm:text-lg font-black text-white tracking-wide">Shop</h4>
          <ul className="mt-4 space-y-3 text-base text-slate-300 font-medium">
            <li><Link href="/shop?category=foil-balloons" className="hover:text-white transition-colors">Foil Balloons</Link></li>
            <li><Link href="/shop?category=bubble-balloons" className="hover:text-white transition-colors">Bubble Balloons</Link></li>
            <li><Link href="/shop?category=accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            <li><Link href="/shop" className="hover:text-white transition-colors">Themes</Link></li>
            <li><Link href="/shop" className="hover:text-white transition-colors">Deals</Link></li>
          </ul>
        </div>

        {/* Customer Service Column */}
        <div>
          <h4 className="text-base sm:text-lg font-black text-white tracking-wide">Customer Service</h4>
          <ul className="mt-4 space-y-3 text-base text-slate-300 font-medium">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping &amp; Delivery</Link></li>
            <li><Link href="/returns" className="hover:text-white transition-colors">Returns &amp; Refunds</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>

        {/* Information Column */}
        <div>
          <h4 className="text-base sm:text-lg font-black text-white tracking-wide">Information</h4>
          <ul className="mt-4 space-y-3 text-base text-slate-300 font-medium">
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
            <li><Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
          </ul>
        </div>

        {/* Contact Us Column */}
        <div>
          <h4 className="text-base sm:text-lg font-black text-white tracking-wide">Contact Us</h4>
          <ul className="mt-4 space-y-3.5 text-base text-slate-300 font-medium">
            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-purple-400" />
              <a href={whatsappLink(undefined, contact.whatsapp)} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                {contact.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-purple-400" />
              <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                {contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} className="shrink-0 text-purple-400" />
              <span>{contact.location}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-base text-slate-300 font-medium">
        <p>© {new Date().getFullYear()} {site.name}. All Rights Reserved.</p>
        <p className="mt-1.5 text-sm text-slate-400">Globex Party Distributor UAE is managed and operated by Fatima Express.</p>
        <p className="mt-1.5 text-sm text-slate-400">
          Developed by{" "}
          <a
            href="https://www.nexa-solutions.in/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-slate-300 transition-colors hover:text-white"
          >
            Nexa Solutions
          </a>
        </p>
      </div>
    </footer>
  );
}
