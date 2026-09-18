import Hero from "@/components/home/Hero";
import ProductsShowcase from "@/components/home/ProductsShowcase";
import FoilCollection from "@/components/home/FoilCollection";
import BubbleSection from "@/components/home/BubbleSection";
import FeatureStrip from "@/components/home/FeatureStrip";
import InspirationGallery from "@/components/home/InspirationGallery";
import Testimonials from "@/components/home/Testimonials";
import FaqSection from "@/components/home/FaqSection";
import Newsletter from "@/components/home/Newsletter";
import Reveal from "@/components/ui/Reveal";
import { getAllProducts } from "@/lib/catalog";
import { getHomeContentPublic } from "@/lib/homeContent";
import { getContactPublic } from "@/lib/siteSettings";

export const revalidate = 0;

export default async function HomePage() {
  const [products, homeContent, contact] = await Promise.all([getAllProducts(), getHomeContentPublic(), getContactPublic()]);
  const visibility = homeContent.sectionVisibility;
  const featuredProducts = products.filter((p) => p.featured);
  const foilFeatured =
    featuredProducts.find((p) => p.category === "foil-balloons") || products.find((p) => p.category === "foil-balloons");
  const showcaseProducts = [...featuredProducts, ...products.filter((p) => !p.featured)];

  return (
    <>
      {visibility.hero && <Hero slides={homeContent.heroSlides} />}
      <Reveal>
        <ProductsShowcase products={showcaseProducts} content={homeContent.accessories} />
      </Reveal>
      {visibility.foil && (
        <Reveal>
          <FoilCollection featured={foilFeatured} content={homeContent.foil} />
        </Reveal>
      )}
      {visibility.bubble && (
        <Reveal>
          <BubbleSection content={homeContent.bubble} />
        </Reveal>
      )}
      {visibility.features && (
        <Reveal>
          <FeatureStrip features={homeContent.featureStrip} />
        </Reveal>
      )}
      {visibility.gallery && (
        <Reveal>
          <InspirationGallery setups={homeContent.gallery} heading={homeContent.galleryHeading} />
        </Reveal>
      )}
      {visibility.testimonials && (
        <Reveal>
          <Testimonials testimonials={homeContent.testimonials} heading={homeContent.testimonialsHeading} />
        </Reveal>
      )}
      {visibility.faqs && (
        <Reveal>
          <FaqSection faqs={homeContent.faqs} heading={homeContent.faqsHeading} phone={contact.whatsapp} />
        </Reveal>
      )}
      {visibility.newsletter && (
        <Reveal>
          <Newsletter content={homeContent.newsletter} />
        </Reveal>
      )}
    </>
  );
}
