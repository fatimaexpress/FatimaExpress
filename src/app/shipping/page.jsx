import PolicyLayout from "@/components/policy/PolicyLayout";
import { FREE_DELIVERY_THRESHOLD, DUBAI_DELIVERY_FEE, COURIER_FEE } from "@/lib/shipping";
import { getContactPublic } from "@/lib/siteSettings";
import { Clock, MapPin, PackageCheck, Truck } from "lucide-react";

export const metadata = {
  title: "Shipping & Delivery",
  description: "Delivery coverage, charges and processing times for Fatima Express orders across the UAE.",
};

const HIGHLIGHTS = [
  { title: "All 7 Emirates", desc: "Dubai, Abu Dhabi, Sharjah & more" },
  { title: "Free Dubai Delivery", desc: `On orders over AED ${FREE_DELIVERY_THRESHOLD}` },
  { title: "Fast Dispatch", desc: "Processed within 1–2 business days" },
];

const sectionHeading = "flex items-center gap-3 border-b border-purple-100 pb-2.5 font-display text-lg font-extrabold text-slate-950 sm:text-xl";
const iconClass = "h-5 w-5 shrink-0 text-purple-600 sm:h-6 sm:w-6";

export default async function ShippingPolicyPage() {
  const contact = await getContactPublic();
  return (
    <PolicyLayout title="Shipping & Delivery" updated="September 2026" icon={Truck} highlights={HIGHLIGHTS} contact={contact}>
      <p className="text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
        <strong className="font-bold text-purple-700">Fatima Express</strong> delivers wholesale foil balloons, bubble balloons and
        party equipment across the United Arab Emirates. Here&apos;s how our delivery process works.
      </p>

      <div className="pt-2">
        <h2 className={sectionHeading}>
          <Clock className={iconClass} />
          1. Order Processing Time
        </h2>
        <p className="mt-3 leading-relaxed">
          Orders are typically processed and prepared for dispatch within <strong>1–2 business days</strong> of payment or Cash on
          Delivery confirmation. You&apos;ll be contacted on the phone number provided at checkout if there&apos;s any delay.
        </p>
      </div>

      <div className="pt-2">
        <h2 className={sectionHeading}>
          <MapPin className={iconClass} />
          2. Delivery Coverage & Charges
        </h2>
        <p className="mt-3 leading-relaxed">
          We deliver across all seven emirates — Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
          <li>
            <strong>Dubai:</strong> Free delivery on orders of <strong>AED {FREE_DELIVERY_THRESHOLD}</strong> and above. Orders below
            this amount carry a flat delivery fee of <strong>AED {DUBAI_DELIVERY_FEE}</strong>.
          </li>
          <li>
            <strong>Other Emirates:</strong> A courier delivery fee of <strong>AED {COURIER_FEE}</strong> applies, calculated at
            checkout.
          </li>
        </ul>
      </div>

      <div className="pt-2">
        <h2 className={sectionHeading}>
          <PackageCheck className={iconClass} />
          3. Balloon-Safe Packaging
        </h2>
        <p className="mt-3 leading-relaxed">
          Foil and bubble balloons are shipped uninflated and flat-packed to protect them in transit, along with any accessories
          ordered. Pre-inflated balloon bouquets and helium-filled items are prepared closer to your delivery slot to preserve
          float time — please share your event date in the order notes if timing matters.
        </p>
      </div>

      <div className="border-t border-purple-100 pt-4 text-sm text-slate-500 sm:text-base">
        Have a question about your delivery? Reach us at{" "}
        <a href={`mailto:${contact.email}`} className="font-bold text-purple-700 underline">
          {contact.email}
        </a>{" "}
        or WhatsApp <span className="font-bold text-purple-700">{contact.whatsappDisplay}</span> with your order reference.
      </div>
    </PolicyLayout>
  );
}
