import PolicyLayout from "@/components/policy/PolicyLayout";
import { getContactPublic } from "@/lib/siteSettings";
import { AlertTriangle, CheckCircle2, PackageOpen, RotateCcw } from "lucide-react";

export const metadata = {
  title: "Returns & Exchanges",
  description: "Eligibility, timelines and process for returning or exchanging Fatima Express orders.",
};

const HIGHLIGHTS = [
  { title: "7-Day Window", desc: "For unopened, unused items" },
  { title: "Free Replacement", desc: "For damaged or incorrect items" },
  { title: "Easy Process", desc: "Request via WhatsApp or email" },
];

const sectionHeading = "flex items-center gap-3 border-b border-purple-100 pb-2.5 font-display text-lg font-extrabold text-slate-950 sm:text-xl";
const iconClass = "h-5 w-5 shrink-0 text-purple-600 sm:h-6 sm:w-6";

export default async function ReturnsPolicyPage() {
  const contact = await getContactPublic();
  return (
    <PolicyLayout title="Returns & Exchanges" updated="September 2026" icon={RotateCcw} highlights={HIGHLIGHTS} contact={contact}>
      <p className="text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
        We want every order to arrive exactly as expected. If something isn&apos;t right, here&apos;s how returns and exchanges
        work at <strong className="font-bold text-purple-700">Fatima Express</strong>.
      </p>

      <div className="pt-2">
        <h2 className={sectionHeading}>
          <PackageOpen className={iconClass} />
          1. Eligibility Window
        </h2>
        <p className="mt-3 leading-relaxed">
          Unopened, unused foil balloon packs and accessories in their original packaging can be returned or exchanged within{" "}
          <strong>7 days of delivery</strong>.
        </p>
        <div className="mt-4 flex items-start gap-3.5 rounded-2xl border border-amber-200 bg-amber-50 p-4.5 shadow-sm">
          <AlertTriangle size={22} className="mt-0.5 shrink-0 text-amber-600" />
          <div>
            <strong className="mb-1 block text-sm font-extrabold uppercase tracking-wide text-amber-700">Important — Balloon Products</strong>
            <p className="text-sm leading-relaxed text-slate-700">
              For hygiene and safety reasons, we cannot accept returns of <strong>inflated balloons, opened helium canisters, or
              used balloon pumps/accessories</strong>. Please inspect your order before inflating or using any item.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <h2 className={sectionHeading}>
          <AlertTriangle className={iconClass} />
          2. Damaged, Defective or Incorrect Items
        </h2>
        <p className="mt-3 leading-relaxed">
          If your order arrives damaged, defective, or different from what you ordered, contact us within{" "}
          <strong>48 hours of delivery</strong> with photos of the item and packaging. Once verified, we&apos;ll arrange a{" "}
          <strong>free replacement</strong> or process a refund — whichever you prefer.
        </p>
      </div>

      <div className="pt-2">
        <h2 className={sectionHeading}>
          <CheckCircle2 className={iconClass} />
          3. How To Request a Return
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
          <li>Message us on WhatsApp or email with your order reference and reason for return.</li>
          <li>Our team will confirm eligibility and arrange pickup or drop-off, where applicable.</li>
          <li>Once the returned item is inspected, we&apos;ll process your exchange or refund — see our Refund Policy for timelines.</li>
        </ul>
      </div>

      <div className="border-t border-purple-100 pt-4 text-sm text-slate-500 sm:text-base">
        To start a return, email{" "}
        <a href={`mailto:${contact.email}`} className="font-bold text-purple-700 underline">
          {contact.email}
        </a>{" "}
        or WhatsApp <span className="font-bold text-purple-700">{contact.whatsappDisplay}</span>.
      </div>
    </PolicyLayout>
  );
}
