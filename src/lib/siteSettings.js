import { createPublicClient, publicCatalogEnabled } from "@/lib/supabase/publicClient";
import { site as staticSite } from "@/data/site";

// Falls back to the static values in data/site.js whenever the DB is
// unreachable or contact settings haven't been saved from /admin yet.
export const DEFAULT_CONTACT = {
  logoUrl: "",
  whatsapp: staticSite.whatsapp,
  whatsappDisplay: staticSite.whatsappDisplay,
  email: staticSite.email,
  facebook: staticSite.facebook,
  instagram: staticSite.instagram,
  location: staticSite.location,
};

export async function getContactPublic() {
  if (publicCatalogEnabled) {
    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase.from("site_settings").select("contact").eq("id", 1).maybeSingle();
      if (!error && data?.contact) {
        return { ...DEFAULT_CONTACT, ...data.contact };
      }
    } catch {
      // fall through to defaults
    }
  }

  return DEFAULT_CONTACT;
}
