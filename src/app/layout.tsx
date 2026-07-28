import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_CONFIG, FAQS, TESTIMONIALS } from "@/data/siteData";

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "hearing loss supplement | Hear O Care",
    template: "%s | Hear O Care",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "hearing loss supplement",
    "sensorineural hearing loss",
    "tinnitus supplement",
    "hear o care",
    "hearing health",
    "natural ear supplement",
    "inner ear hair cell support",
    "auditory cortex nerve support",
    "vitamin D3 hearing loss",
    "L-Glutathione ear health",
    "acetyl L carnitine hearing",
  ],
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      "en-US": SITE_CONFIG.url,
    },
  },
  applicationName: "Hear O Care",
  authors: [{ name: "Hear O Care Medical & Nutrition Team", url: SITE_CONFIG.url }],
  publisher: "Hear O Care India",
  category: "Health & Supplements",
  openGraph: {
    title: "hearing loss supplement | Hear O Care",
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
        width: 1229,
        height: 819,
        alt: "Hear O Care Hearing Loss Supplement",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@hearocare",
    creator: "@hearocare",
    title: "hearing loss supplement | Hear O Care",
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Comprehensive Schema.org JSON-LD Graph for Advanced SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}/#website`,
        url: SITE_CONFIG.url,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        inLanguage: "en-US",
        publisher: {
          "@id": `${SITE_CONFIG.url}/#organization`,
        },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${SITE_CONFIG.url}/?s={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
        logo: {
          "@type": "ImageObject",
          inLanguage: "en-US",
          "@id": `${SITE_CONFIG.url}/#logo`,
          url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
          caption: SITE_CONFIG.name,
        },
        image: {
          "@id": `${SITE_CONFIG.url}/#logo`,
        },
        sameAs: [SITE_CONFIG.social.facebook, SITE_CONFIG.social.twitter],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: SITE_CONFIG.contact.phone,
            contactType: "customer service",
            email: SITE_CONFIG.contact.email,
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          },
        ],
      },
      {
        "@type": "Product",
        "@id": `${SITE_CONFIG.url}/#product`,
        name: "Hear O Care Hearing Supplement",
        description: SITE_CONFIG.description,
        image: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
        sku: "HOC-SUPP-60",
        mpn: "HEAR-O-CARE-CAPSULES",
        brand: {
          "@type": "Brand",
          name: "Hear O Care",
        },
        offers: {
          "@type": "Offer",
          url: SITE_CONFIG.amazonUrl,
          priceCurrency: "INR",
          priceValidUntil: "2027-12-31",
          itemCondition: "https://schema.org/NewCondition",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "Amazon India",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "420",
          bestRating: "5",
          worstRating: "1",
        },
        review: TESTIMONIALS.map((t) => ({
          "@type": "Review",
          author: { "@type": "Person", name: t.name },
          reviewRating: { "@type": "Rating", ratingValue: t.rating.toString(), bestRating: "5" },
          reviewBody: t.quote,
        })),
      },
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_CONFIG.url}/#medicalpage`,
        url: SITE_CONFIG.url,
        name: "Sensorineural Hearing Loss & Tinnitus Supplement",
        description: "Nutritional awareness and antioxidant support for sensorineural hearing loss and inner ear cell longevity.",
        aspect: ["Prevention", "Treatment", "Overview"],
        about: {
          "@type": "MedicalCondition",
          name: "Sensorineural Hearing Loss",
          possibleTreatment: [
            { "@type": "MedicalTherapy", name: "Antioxidant Supplementation (L-Glutathione, Alpha Lipoic Acid)" },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_CONFIG.url}/#faq`,
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <html lang="en-US" className="scroll-smooth">
      <head>
        <link rel="canonical" href={SITE_CONFIG.url} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-white text-slate-900 selection:bg-pink-500 selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
