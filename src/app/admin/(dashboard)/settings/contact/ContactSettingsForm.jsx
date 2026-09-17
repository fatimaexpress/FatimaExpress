"use client";

import { useActionState, useState } from "react";
import { ImagePlus, LoaderCircle, MapPin, Phone, Share2 } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import { updateContactSettings } from "@/actions/admin/contact";

const inputClass =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";
const labelClass = "mb-1.5 block text-xs font-semibold text-slate-600";
const sectionClass = "rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-xs";

export default function ContactSettingsForm({ contact }) {
  const [state, formAction, pending] = useActionState(updateContactSettings, {});
  const [logoUrl, setLogoUrl] = useState(contact.logoUrl || null);

  return (
    <form action={formAction} className="mt-6 max-w-xl space-y-6">
      <input type="hidden" name="logoUrl" value={logoUrl || ""} />

      <section className={sectionClass}>
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-100 bg-brand-50 text-brand-700 shadow-xs">
            <ImagePlus size={17} />
          </span>
          <h2 className="font-display text-lg font-bold">Site Logo</h2>
        </div>
        <div className="mt-4">
          <ImageUploader value={logoUrl} onChange={setLogoUrl} previewClassName="h-16 w-48" folder="fatima-express/branding" />
          <p className="mt-2 text-xs text-slate-400">Shown in the header and footer across the site. Leave empty to use the default logo.</p>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-100 bg-brand-50 text-brand-700 shadow-xs">
            <Phone size={17} />
          </span>
          <h2 className="font-display text-lg font-bold">Contact Details</h2>
        </div>

        <div className="mt-4 space-y-5">
          <div>
            <label className={labelClass}>WhatsApp / phone number (with country code)</label>
            <input required name="whatsapp" defaultValue={contact.whatsapp} className={inputClass} placeholder="+971569515903" />
            <p className="mt-1 text-xs text-slate-400">Used to build every WhatsApp chat link across the site.</p>
          </div>

          <div>
            <label className={labelClass}>Phone number — display format</label>
            <input name="whatsappDisplay" defaultValue={contact.whatsappDisplay} className={inputClass} placeholder="+971 56 951 5903" />
            <p className="mt-1 text-xs text-slate-400">Shown to customers in the footer and contact page. Leave blank to reuse the number above.</p>
          </div>

          <div>
            <label className={labelClass}>Email address</label>
            <input required type="email" name="email" defaultValue={contact.email} className={inputClass} placeholder="sales@fatimaexpress.ae" />
          </div>

          <div>
            <label className={`${labelClass} flex items-center gap-1.5`}>
              <MapPin size={12} />
              Address / location
            </label>
            <input name="location" defaultValue={contact.location} className={inputClass} placeholder="Dubai, United Arab Emirates" />
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 shadow-xs">
            <Share2 size={17} />
          </span>
          <h2 className="font-display text-lg font-bold">Social Links</h2>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <label className={labelClass}>Facebook URL</label>
            <input name="facebook" defaultValue={contact.facebook} className={inputClass} placeholder="https://www.facebook.com/..." />
          </div>
          <div>
            <label className={labelClass}>Instagram URL</label>
            <input name="instagram" defaultValue={contact.instagram} className={inputClass} placeholder="https://www.instagram.com/..." />
          </div>
        </div>
      </section>

      {state.error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{state.error}</p>}
      {state.success && <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">Contact details saved.</p>}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-700 to-brand-800 px-7 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {pending && <LoaderCircle size={16} className="animate-spin" />}
        Save Settings
      </button>
    </form>
  );
}
