"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { DEFAULT_CONTACT } from "@/lib/siteSettings";

export async function getContactSettings() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("site_settings").select("contact").eq("id", 1).maybeSingle();
  return { ...DEFAULT_CONTACT, ...data?.contact };
}

export async function updateContactSettings(_prevState, formData) {
  const supabase = createAdminClient();

  const whatsapp = (formData.get("whatsapp") || "").trim();
  const whatsappDisplay = (formData.get("whatsappDisplay") || "").trim() || whatsapp;

  const contact = {
    logoUrl: (formData.get("logoUrl") || "").trim(),
    whatsapp,
    whatsappDisplay,
    email: (formData.get("email") || "").trim(),
    facebook: (formData.get("facebook") || "").trim(),
    instagram: (formData.get("instagram") || "").trim(),
    location: (formData.get("location") || "").trim(),
  };

  if (!contact.whatsapp) return { error: "WhatsApp / phone number is required." };
  if (!contact.email) return { error: "Email is required." };

  const { error } = await supabase
    .from("site_settings")
    .upsert({ id: 1, contact, updated_at: new Date().toISOString() });

  if (error) return { error: error.message };

  revalidatePath("/admin/settings/contact");
  revalidatePath("/", "layout");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/checkout");
  revalidatePath("/shop", "layout");

  return { success: true };
}
