import PolicyLayout from "@/components/policy/PolicyLayout";
import { getContactPublic } from "@/lib/siteSettings";
import { FileText, Scale, Shield, ShoppingBag } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern using the Fatima Express website and placing orders with us.",
};

const HIGHLIGHTS = [
  { title: "UAE Jurisdiction", desc: "Governed by the laws of the UAE" },
  { title: "AED Pricing", desc: "All prices listed in UAE Dirhams" },
  { title: "Wholesale Supplier", desc: "Products for resale & event use" },
];

const sectionHeading = "flex items-center gap-3 border-b border-purple-100 pb-2.5 font-display text-lg font-extrabold text-slate-950 sm:text-xl";
const iconClass = "h-5 w-5 shrink-0 text-purple-600 sm:h-6 sm:w-6";

export default async function TermsPage() {
  const contact = await getContactPublic();
  return (
    <PolicyLayout title="Terms & Conditions" updated="September 2026" icon={FileText} highlights={HIGHLIGHTS} contact={contact}>
      <p className="text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
        Welcome to <strong className="font-bold text-purple-700">Fatima Express</strong>. By browsing our website, creating an
        account, or placing an order, you agree to the following terms.
      </p>

      <div className="pt-2">
        <h2 className={sectionHeading}>
          <ShoppingBag className={iconClass} />
          1. Orders & Pricing
        </h2>
        <p className="mt-3 leading-relaxed">
          All prices are listed in UAE Dirhams (AED). We reserve the right to update prices, run promotions, or correct
          pricing errors before an order is confirmed. Bulk and wholesale pricing shown on product pages applies automatically
          at the listed quantity thresholds.
        </p>
      </div>

      <div className="pt-2">
        <h2 className={sectionHeading}>
          <Shield className={iconClass} />
          2. Product Descriptions
        </h2>
        <p className="mt-3 leading-relaxed">
          We do our best to accurately describe balloon sizes, materials, and included accessories. Actual colours may vary
          slightly due to display settings, and float times noted for helium products are estimates that depend on storage
          conditions.
        </p>
      </div>

      <div className="pt-2">
        <h2 className={sectionHeading}>
          <ShoppingBag className={iconClass} />
          3. Wholesale & Bulk Accounts
        </h2>
        <p className="mt-3 leading-relaxed">
          Wholesale and bulk pricing is intended for event businesses, decorators, and retailers purchasing for resale or
          professional use. We reserve the right to request business details for large wholesale enquiries.
        </p>
      </div>

      <div className="pt-2">
        <h2 className={sectionHeading}>
          <Scale className={iconClass} />
          4. Governing Law
        </h2>
        <p className="mt-3 leading-relaxed">
          These terms are governed by the laws of the United Arab Emirates. Any disputes will be subject to the exclusive
          jurisdiction of the courts of Dubai.
        </p>
      </div>

      <div className="border-t border-purple-100 pt-4 text-sm text-slate-500 sm:text-base">
        Questions about these terms? Email{" "}
        <a href={`mailto:${contact.email}`} className="font-bold text-purple-700 underline">
          {contact.email}
        </a>
        .
      </div>
    </PolicyLayout>
  );
}
