import PolicyLayout from "@/components/policy/PolicyLayout";
import { getContactPublic } from "@/lib/siteSettings";
import { Database, Eye, Lock, ShieldCheck, UserCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description: "How Fatima Express collects, uses and protects your personal information.",
};

const HIGHLIGHTS = [
  { title: "No Data Selling", desc: "Your info is never sold to third parties" },
  { title: "Secure Checkout", desc: "Payment details are never stored on our servers" },
  { title: "Your Data, Your Rights", desc: "Request access or deletion anytime" },
];

const sectionHeading = "flex items-center gap-3 border-b border-purple-100 pb-2.5 font-display text-lg font-extrabold text-slate-950 sm:text-xl";
const iconClass = "h-5 w-5 shrink-0 text-purple-600 sm:h-6 sm:w-6";

export default async function PrivacyPolicyPage() {
  const contact = await getContactPublic();
  return (
    <PolicyLayout title="Privacy Policy" updated="September 2026" icon={ShieldCheck} highlights={HIGHLIGHTS} contact={contact}>
      <p className="text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
        <strong className="font-bold text-purple-700">Fatima Express</strong> (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;)
        respects your privacy. This policy explains what information we collect when you browse or order from us, and how we
        use and protect it.
      </p>

      <div className="pt-2">
        <h2 className={sectionHeading}>
          <Database className={iconClass} />
          1. Information We Collect
        </h2>
        <p className="mt-3 leading-relaxed">
          When you create an account, place an order, or contact us, we collect your name, email address, phone number, and
          delivery address.
        </p>
        <div className="mt-4 flex items-start gap-3.5 rounded-2xl border border-purple-100 bg-purple-50/60 p-4.5 shadow-sm">
          <Lock size={22} className="mt-0.5 shrink-0 text-purple-600" />
          <div>
            <strong className="mb-1 block text-sm font-extrabold uppercase tracking-wide text-purple-700">Payment Security</strong>
            <p className="text-sm leading-relaxed text-slate-700">
              We do not store your bank card or account details. All orders are Cash on Delivery, so no online payment
              details are ever collected or processed by us.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <h2 className={sectionHeading}>
          <Eye className={iconClass} />
          2. How We Use Your Data
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
          <li>Processing and delivering your orders.</li>
          <li>Sending order confirmations and updates via email or WhatsApp.</li>
          <li>Responding to enquiries submitted through our contact form.</li>
          <li>Improving our products and website — we never sell or rent your personal data to advertisers.</li>
        </ul>
      </div>

      <div className="pt-2">
        <h2 className={sectionHeading}>
          <Lock className={iconClass} />
          3. Cookies
        </h2>
        <p className="mt-3 leading-relaxed">
          We use functional cookies to keep you signed in and to remember items in your shopping cart. We do not run
          third-party advertising trackers on this site.
        </p>
      </div>

      <div className="pt-2">
        <h2 className={sectionHeading}>
          <UserCheck className={iconClass} />
          4. Your Rights
        </h2>
        <p className="mt-3 leading-relaxed">
          You can request access to, correction of, or deletion of your personal data at any time by contacting us at{" "}
          <a href={`mailto:${contact.email}`} className="font-bold text-purple-700 underline">
            {contact.email}
          </a>
          .
        </p>
      </div>
    </PolicyLayout>
  );
}
