import { createPublicClient, publicCatalogEnabled } from "@/lib/supabase/publicClient";

// Matches the seed inserted in supabase/schema.sql — used whenever the DB is
// unreachable or home_content hasn't been set yet, so the homepage always
// has something sensible to render.
const DEFAULT_HERO_SLIDE = {
  eyebrow: "Wholesale Balloon Supplier",
  badge1: "Wholesale Pricing",
  badge2: "Delivery Across UAE",
  floatingBadgeTitle: "Wholesale Supply",
  floatingBadgeSubtitle: "Across UAE",
  heading_line1: "Bulk Orders For",
  heading_line2: "Events & Retail",
  description:
    "Planning a big event or stocking your store? Get wholesale pricing on foil balloons, bubble balloons and accessories with fast delivery across all seven emirates.",
  image: "/hero-balloon-stage.jpg",
  // Optional portrait (9:16) crop shown on phones instead of the wide banner
  // photo above — falls back to `image` when an admin hasn't uploaded one.
  mobileImage: "",
  ctaText: "Get Wholesale Pricing",
  ctaLink: "/contact",
};

// Lets an admin hide a whole homepage section without deleting its content.
// "accessories" defaults to hidden since its content now lives inside the
// merged "Our Products" showcase instead of its own section.
export const DEFAULT_SECTION_VISIBILITY = {
  hero: true,
  foil: true,
  bubble: true,
  accessories: false,
  features: true,
  gallery: true,
  testimonials: true,
  faqs: true,
  newsletter: true,
};

export const DEFAULT_HOME_CONTENT = {
  sectionVisibility: DEFAULT_SECTION_VISIBILITY,
  heroSlides: [DEFAULT_HERO_SLIDE],
  foil: {
    eyebrow: "Foil Balloons Collection",
    heading: "Find The Perfect Foil Balloon",
    // Empty by default — the homepage falls back to auto-picking a featured
    // foil product until an admin configures slides here.
    slides: [],
  },
  bubble: {
    eyebrow: "Bubble & Specialty Balloons",
    heading: "Crystal Clear. Stunning Inside & Out.",
    description:
      "Our stretchy bubble balloons are made from durable, crystal-clear TPU — perfect for creative decorations, gift reveals and long-lasting float.",
    image: "https://res.cloudinary.com/b0g8psvq/image/upload/f_auto,q_auto,w_600/fatima-express/products/feather-filled-bubble.jpg",
    buttonText: "Explore Bubble Balloons",
    features: [
      { title: "Helium Compatible", copy: "Floats beautifully with helium for long-lasting display." },
      { title: "Durable & Reusable", copy: "Strong, stretchable & tear-resistant TPU material." },
      { title: "Pre-Stretch Before Use", copy: "Stretch the balloon gently as shown for best float results." },
    ],
    howToHeading: "How To Pre-Stretch",
    howToBadge: "Step-by-step",
    steps: [
      {
        copy: "Take the uninflated bubble balloon.",
        image: "https://res.cloudinary.com/b0g8psvq/image/upload/f_auto,q_auto,w_200/fatima-express/products/bobo-balloon-pack.jpg",
      },
      {
        copy: "Stretch it gently in every direction.",
        image: "https://res.cloudinary.com/b0g8psvq/image/upload/f_auto,q_auto,w_200/fatima-express/products/bobo-balloon-pack.jpg",
      },
      {
        copy: "Now it's ready to fill with air or helium!",
        image: "https://res.cloudinary.com/b0g8psvq/image/upload/f_auto,q_auto,w_200/fatima-express/products/crystal-clear-bubble-balloon.jpg",
      },
    ],
  },
  accessories: {
    eyebrow: "Essential Inflation & Accessories",
    heading: "Everything You Need, All In One Place",
  },
  featureStrip: [
    { title: "Premium Quality", copy: "Carefully selected high quality products" },
    { title: "Wide Variety", copy: "Huge range of shapes, themes & colors" },
    { title: "Secure Payments", copy: "100% safe & secure checkout" },
    { title: "Fast Shipping", copy: "Quick delivery at your doorstep" },
    { title: "Customer Support", copy: "We're here to help you anytime" },
  ],
  galleryHeading: {
    eyebrow: "Get Inspired",
    heading: "Decorations That Speak Volumes",
  },
  gallery: [
    { title: "Birthday Backdrop", theme: "birthday", image: "https://res.cloudinary.com/b0g8psvq/image/upload/f_auto,q_auto,w_500/fatima-express/gallery/birthday-backdrop.png" },
    { title: "Blush Balloon Arch", theme: "wedding", image: "https://res.cloudinary.com/b0g8psvq/image/upload/f_auto,q_auto,w_500/fatima-express/gallery/blush-arch.png" },
    { title: "Baby Shower Set", theme: "birthday", image: "https://res.cloudinary.com/b0g8psvq/image/upload/f_auto,q_auto,w_500/fatima-express/gallery/baby-shower.png" },
    { title: "Jungle Party", theme: "animal", image: "https://res.cloudinary.com/b0g8psvq/image/upload/f_auto,q_auto,w_500/fatima-express/gallery/jungle-party.png" },
    { title: "Love Wall", theme: "wedding", image: "https://res.cloudinary.com/b0g8psvq/image/upload/f_auto,q_auto,w_500/fatima-express/gallery/love-wall.png" },
  ],
  testimonialsHeading: {
    eyebrow: "Real Buyer Reviews",
    heading: "Trusted By UAE Decorators & Retailers",
  },
  testimonials: [
    {
      name: "Sarah Al Mansoori",
      role: "Founder, Event Crafters Dubai",
      location: "Business Bay, Dubai",
      purchase: "500x Foil & Arch Set",
      quote: "We ordered 500+ foil balloons for a corporate gala in Dubai. Zero defective pieces, helium float lasted over 6 days! Same-day delivery saved our timeline.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: "Ahmed Raza",
      role: "Owner, Party Land Store",
      location: "Al Majaz, Sharjah",
      purchase: "Wholesale Bobo Pack",
      quote: "Finding a consistent balloon supplier in UAE was tough until Fatima Express. Bulk rates are unbeatable and WhatsApp order dispatch is super fast!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: "Mariam Al Hashmi",
      role: "Lead Decorator, Celebration Studio",
      location: "Al Khalidiya, Abu Dhabi",
      purchase: "Crystal Bobo & Feathers",
      quote: "The crystal clear bubble balloons are absolute top tier. Stretchy TPU material floats so long without leaking. Our clients were thrilled!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: "Tariq Mahmood",
      role: "Retail Manager, Joyful Kids Store",
      location: "City Centre, Ajman",
      purchase: "Monthly Retail Restock",
      quote: "Monthly restocks are smooth and dependable. Clean retail packaging, zero damage in transit, and pricing gives us great retail profit margins.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    },
  ],
  faqsHeading: {
    eyebrow: "Got Questions?",
    heading: "Frequently Asked Questions",
  },
  faqs: [
    {
      question: "Do you offer wholesale or bulk pricing?",
      answer:
        "Yes — many products have automatic bulk discount tiers, and we also offer custom wholesale pricing for larger orders. Send us your requirement via the contact form or WhatsApp for a quote.",
    },
    {
      question: "Which areas in the UAE do you deliver to?",
      answer:
        "We deliver across all seven emirates — Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain. Delivery inside Dubai is free on orders of AED 1,000 and above.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We currently accept Cash on Delivery only — simply pay the driver in cash or by card when your order arrives.",
    },
    {
      question: "Are you a decoration service or a balloon supplier?",
      answer:
        "We're a wholesale supplier of premium foil balloons, bubble balloons and professional balloon equipment — not a decoration service. We supply the products decorators, event planners and retailers need to create their own setups.",
    },
    {
      question: "How fast will I get a response to my enquiry?",
      answer:
        "Our team typically replies within 2 hours during business hours (Saturday–Thursday, 9 AM–7 PM). For the fastest response, message us directly on WhatsApp.",
    },
  ],
  newsletter: {
    heading: "Special Offers & Party Ideas Straight To Your Inbox!",
    subtext: "Join our newsletter and get 10% off on your first order.",
    image: "/newsletter.png",
  },
};

function normalizeHeroSlides(content) {
  // New shape: an array of slides.
  if (content?.heroSlides?.length) {
    return content.heroSlides.map((slide) => ({ ...DEFAULT_HERO_SLIDE, ...slide }));
  }
  // Legacy shape: a single `hero` object — migrate it into a one-slide array.
  if (content?.hero) {
    return [{ ...DEFAULT_HERO_SLIDE, ...content.hero }];
  }
  return DEFAULT_HOME_CONTENT.heroSlides;
}

function mergeHomeContent(content) {
  return {
    sectionVisibility: { ...DEFAULT_SECTION_VISIBILITY, ...content?.sectionVisibility },
    heroSlides: normalizeHeroSlides(content),
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

export async function getHomeContentPublic() {
  if (publicCatalogEnabled) {
    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase.from("site_settings").select("home_content").eq("id", 1).maybeSingle();
      if (!error && data?.home_content) {
        return mergeHomeContent(data.home_content);
      }
    } catch {
      // fall through to defaults
    }
  }

  return DEFAULT_HOME_CONTENT;
}
