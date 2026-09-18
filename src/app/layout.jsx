import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import WhatsAppFloatButton from "@/components/layout/WhatsAppFloatButton";
import { site } from "@/data/site";
import { getContactPublic } from "@/lib/siteSettings";
import { getAllCategories } from "@/lib/catalog";
import { SITE_URL } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — Wholesale Foil, Bubble & Party Balloons in UAE`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "foil balloons Dubai",
    "bubble balloons UAE",
    "wholesale party supplies Dubai",
    "balloon pump UAE",
    "party decorations Dubai",
    "Globex Party Distributor UAE",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: SITE_URL,
    siteName: site.name,
    type: "website",
    locale: "en_AE",
  },
  icons: {
    // Query param cache-busts the browser's (very sticky) favicon cache —
    // bump it any time favicon.png is replaced so visitors actually see the
    // new one instead of the one their browser cached before.
    icon: "/favicon.png?v=2",
    shortcut: "/favicon.png?v=2",
    apple: "/favicon.png?v=2",
  },
};

export default async function RootLayout({ children }) {
  const [contact, categories] = await Promise.all([getContactPublic(), getAllCategories()]);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: "Globex Party Distributor UAE",
    url: SITE_URL,
    logo: contact.logoUrl || `${SITE_URL}/logo.png`,
    description: site.description,
    email: contact.email,
    telephone: contact.whatsapp,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    sameAs: [contact.facebook, contact.instagram].filter(Boolean),
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <AuthProvider>
          <CartProvider>
            <Navbar categories={categories} logoUrl={contact.logoUrl} />
            <main>{children}</main>
            <Footer contact={contact} />
            <CartDrawer />
            <WhatsAppFloatButton phone={contact.whatsapp} />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
