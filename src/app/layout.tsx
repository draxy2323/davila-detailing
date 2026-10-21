import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { business, faqs, logo, services } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const title = "Mobile Car Detailing in Mercer County, NJ | Davila Detailing Co.";
const description =
  "Davila Detailing Co. brings professional mobile car detailing to Mercer County, NJ, and surrounding areas — interior detailing, exterior detailing and ceramic coating at your location. We come to you! Call (609) 613-3772.";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: title, template: "%s | Davila Detailing Co." },
  description,
  applicationName: business.name,
  keywords: [
    "mobile detailing Mercer County NJ",
    "mobile car detailing near me",
    "interior car detailing",
    "exterior car detailing",
    "ceramic coating Mercer County NJ",
    "mobile auto detailing Ewing NJ",
  ],
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: business.name,
    title: "Davila Detailing Co. — Premium Mobile Car Detailing",
    description:
      "Interior detailing, exterior detailing and ceramic coating delivered to your location in Mercer County, NJ, and surrounding areas. We come to you!",
  },
  twitter: {
    card: "summary_large_image",
    title: "Davila Detailing Co. — Premium Mobile Car Detailing",
    description: "Mobile detailing across Mercer County, NJ, and surrounding areas. We come to you!",
  },
  formatDetection: { telephone: true, email: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

// Structured data uses verified details only: no address, hours or ratings.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  "@id": siteUrl ? `${siteUrl}/#business` : undefined,
  name: business.name,
  slogan: business.tagline,
  description,
  telephone: business.phoneE164,
  email: business.email,
  url: siteUrl || undefined,
  image: siteUrl ? `${siteUrl}${logo.src}` : undefined,
  logo: siteUrl ? `${siteUrl}${logo.src}` : undefined,
  areaServed: [
    { "@type": "AdministrativeArea", name: "Mercer County, New Jersey" },
    { "@type": "City", name: "Ewing, New Jersey" },
  ],
  sameAs: business.social.map((s) => s.href),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Mobile detailing services",
    itemListElement: services
      .filter((s) => s.slug !== "other")
      .map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.description } })),
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs
    .filter((f) => !f.needsOwnerInput)
    .map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`no-js ${barlow.variable} ${barlowCondensed.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('no-js')" }} />
        <JsonLd data={jsonLd} />
        <JsonLd data={faqJsonLd} />
      </head>
      <body className="min-h-screen overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
