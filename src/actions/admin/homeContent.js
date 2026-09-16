"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { DEFAULT_HOME_CONTENT } from "@/lib/homeContent";

function normalizeHeroSlides(content) {
  if (content?.heroSlides?.length) return content.heroSlides;
  if (content?.hero) return [content.hero];
  return DEFAULT_HOME_CONTENT.heroSlides;
}

export async function getHomeContent() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("site_settings").select("home_content").eq("id", 1).maybeSingle();
  const content = data?.home_content;

  return {
    sectionVisibility: { ...DEFAULT_HOME_CONTENT.sectionVisibility, ...content?.sectionVisibility },
    heroSlides: normalizeHeroSlides(content).map((slide) => ({ ...DEFAULT_HOME_CONTENT.heroSlides[0], ...slide })),
    foil: {
      ...DEFAULT_HOME_CONTENT.foil,
      ...content?.foil,
      slides: content?.foil?.slides?.length ? content.foil.slides : [],
    },
    bubble: {
      ...DEFAULT_HOME_CONTENT.bubble,
      ...content?.bubble,
      features: content?.bubble?.features?.length ? content.bubble.features : DEFAULT_HOME_CONTENT.bubble.features,
      steps: content?.bubble?.steps?.length ? content.bubble.steps : DEFAULT_HOME_CONTENT.bubble.steps,
    },
    accessories: { ...DEFAULT_HOME_CONTENT.accessories, ...content?.accessories },
    featureStrip: content?.featureStrip?.length ? content.featureStrip : DEFAULT_HOME_CONTENT.featureStrip,
    galleryHeading: { ...DEFAULT_HOME_CONTENT.galleryHeading, ...content?.galleryHeading },
    gallery: content?.gallery?.length ? content.gallery : DEFAULT_HOME_CONTENT.gallery,
    testimonialsHeading: { ...DEFAULT_HOME_CONTENT.testimonialsHeading, ...content?.testimonialsHeading },
    testimonials: content?.testimonials?.length ? content.testimonials : DEFAULT_HOME_CONTENT.testimonials,
    faqsHeading: { ...DEFAULT_HOME_CONTENT.faqsHeading, ...content?.faqsHeading },
    faqs: content?.faqs?.length ? content.faqs : DEFAULT_HOME_CONTENT.faqs,
    newsletter: { ...DEFAULT_HOME_CONTENT.newsletter, ...content?.newsletter },
  };
}

export async function updateHomeContent(_prevState, formData) {
  const supabase = createAdminClient();

  const accessories = {
    eyebrow: formData.get("accessories_eyebrow") || "",
    heading: formData.get("accessories_heading") || "",
  };

  const galleryHeading = {
    eyebrow: formData.get("galleryHeading_eyebrow") || "",
    heading: formData.get("galleryHeading_heading") || "",
  };

  const testimonialsHeading = {
    eyebrow: formData.get("testimonialsHeading_eyebrow") || "",
    heading: formData.get("testimonialsHeading_heading") || "",
  };

  const faqsHeading = {
    eyebrow: formData.get("faqsHeading_eyebrow") || "",
    heading: formData.get("faqsHeading_heading") || "",
  };

  const newsletter = {
    heading: formData.get("newsletter_heading") || "",
    subtext: formData.get("newsletter_subtext") || "",
    image: formData.get("newsletter_image") || "",
  };

  let gallery;
  let featureStrip;
  let heroSlides;
  let foilSlides;
  let bubbleFeatures;
  let bubbleSteps;
  let testimonials;
  let faqs;
  let sectionVisibility;
  try {
    gallery = JSON.parse(formData.get("gallery") || "[]");
    featureStrip = JSON.parse(formData.get("featureStrip") || "[]");
    heroSlides = JSON.parse(formData.get("heroSlides") || "[]");
    foilSlides = JSON.parse(formData.get("foil_slides") || "[]");
    bubbleFeatures = JSON.parse(formData.get("bubble_features") || "[]");
    bubbleSteps = JSON.parse(formData.get("bubble_steps") || "[]");
    testimonials = JSON.parse(formData.get("testimonials") || "[]");
    faqs = JSON.parse(formData.get("faqs") || "[]");
    sectionVisibility = JSON.parse(formData.get("sectionVisibility") || "{}");
  } catch {
    return { error: "Invalid gallery, feature strip, hero slide, foil slide, bubble, testimonial or FAQ data." };
  }

  const foil = {
    eyebrow: formData.get("foil_eyebrow") || "",
    heading: formData.get("foil_heading") || "",
    slides: foilSlides,
  };

  const bubble = {
    eyebrow: formData.get("bubble_eyebrow") || "",
    heading: formData.get("bubble_heading") || "",
    description: formData.get("bubble_description") || "",
    image: formData.get("bubble_image") || "",
    buttonText: formData.get("bubble_buttonText") || "",
    features: bubbleFeatures,
    howToHeading: formData.get("bubble_howToHeading") || "",
    howToBadge: formData.get("bubble_howToBadge") || "",
    steps: bubbleSteps,
  };

  // Guard against a stale/empty submission (e.g. a form left open from before
  // this page supported multiple slides) silently wiping out the hero —
  // fall back to whatever is already saved instead of rejecting the save.
  if (!heroSlides.length) {
    const { data: existing } = await supabase.from("site_settings").select("home_content").eq("id", 1).maybeSingle();
    heroSlides = normalizeHeroSlides(existing?.home_content);
  }

  const { error } = await supabase.from("site_settings").upsert({
    id: 1,
    home_content: {
      sectionVisibility: { ...DEFAULT_HOME_CONTENT.sectionVisibility, ...sectionVisibility },
      heroSlides,
      foil,
      bubble,
      accessories,
      featureStrip,
      galleryHeading,
      gallery,
      testimonialsHeading,
      testimonials,
      faqsHeading,
      faqs,
      newsletter,
    },
    updated_at: new Date().toISOString(),
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/home");
  revalidatePath("/");
  return { success: true };
}
