import PolicyLayout from "@/components/policy/PolicyLayout";
import { getContactPublic } from "@/lib/siteSettings";
import { Banknote, Clock, CreditCard, XCircle } from "lucide-react";

export const metadata = {
  title: "Refund Policy",
  description: "How and when refunds are issued for cancelled or returned Fatima Express orders.",
};

const HIGHLIGHTS = [
  { title: "5–7 Day Processing", desc: "Once a refund is approved" },
  { title: "Free Cancellations", desc: "Anytime before dispatch" },
  { title: "Bank Transfer Refund", desc: "Sent to the account you provide" },
];

const sectionHeading = "flex items-center gap-3 border-b border-purple-100 pb-2.5 font-display text-lg font-extrabold text-slate-950 sm:text-xl";
const iconClass = "h-5 w-5 shrink-0 text-purple-600 sm:h-6 sm:w-6";

export default async function RefundPolicyPage() {
  const contact = await getContactPublic();
  return (
    <PolicyLayout title="Refund Policy" updated="September 2026" icon={Banknote} highlights={HIGHLIGHTS} contact={contact}>
      <p className="text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
        This policy explains when refunds are issued and how long they take once a return, cancellation, or replacement request
        is approved.
      </p>

      <div className="pt-2">
        <h2 className={sectionHeading}>
          <XCircle className={iconClass} />
          1. Order Cancellations
        </h2>
        <p className="mt-3 leading-relaxed">
          Orders can be cancelled free of charge any time <strong>before dispatch</strong>. Once an order has been handed over
          for delivery, it can no longer be cancelled — please arrange a return instead once it arrives.
        </p>
      </div>

      <div className="pt-2">
        <h2 className={sectionHeading}>
          <Clock className={iconClass} />
          2. Refund Timeline
        </h2>
        <p className="mt-3 leading-relaxed">
          Once a cancellation, return, or replacement request is approved, refunds are processed within{" "}
          <strong>5–7 business days</strong>.
        </p>
      </div>

      <div className="pt-2">
        <h2 className={sectionHeading}>
          <CreditCard className={iconClass} />
          3. How Refunds Are Issued
        </h2>
        <p className="mt-3 leading-relaxed">
          All orders are Cash on Delivery, so refunds are issued via bank transfer to an account you provide, since no online
          payment was collected upfront.
        </p>
      </div>

      <div className="border-t border-purple-100 pt-4 text-sm text-slate-500 sm:text-base">
        Questions about a refund already in progress? Email{" "}
        <a href={`mailto:${contact.email}`} className="font-bold text-purple-700 underline">
          {contact.email}
        </a>{" "}
        with your order reference, or WhatsApp <span className="font-bold text-purple-700">{contact.whatsappDisplay}</span>.
      </div>
    </PolicyLayout>
  );
}
