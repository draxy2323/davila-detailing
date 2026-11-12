import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { business } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Davila Detailing Co. handles the information you share through our website, Facebook and Instagram.",
  alternates: { canonical: "/privacy" },
};

// Have this reviewed for your situation. It describes how the business works today:
// website booking form delivered by email, Facebook/Instagram lead forms and
// messages, and no analytics or ad trackers on the website itself.
export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" className="bg-ink pb-24 pt-32 lg:pt-40">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:text-white [&_p]:mt-4 [&_p]:text-steel [&_li]:text-steel">
          <p className="eyebrow !mt-0">Legal</p>
          <h1 className="display mt-3 text-5xl text-white sm:text-6xl">Privacy Policy</h1>
          <p>
            This policy explains how {business.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles information you
            provide through our website, our Facebook and Instagram pages, and our ads on those platforms.
          </p>
          <p className="text-sm">Last updated: November 2026</p>

          <h2>Information we collect</h2>
          <p>
            When you request a booking on our website, or fill out a form in one of our Facebook or Instagram ads, we
            collect the details you enter: your name, phone number, email address (if provided), vehicle type, the
            service you&rsquo;re interested in, your town, your preferred date, and any notes. If you message us on
            Facebook, Instagram, by text or by email, we receive what you send us.
          </p>

          <h2>How we use it</h2>
          <p>
            We use this information only to respond to you: to confirm your price, check that we serve your area,
            schedule your appointment, and follow up about that service. We do not sell, rent or share your
            information with anyone else, and we don&rsquo;t use it for unrelated marketing.
          </p>

          <h2>How it&rsquo;s delivered and stored</h2>
          <p>
            Website booking requests are sent to our business email through an email delivery provider. Information
            from Facebook and Instagram lead forms and messages is collected by Meta under its own privacy policy and
            made available to us through our Meta business account. We keep this information only as long as needed
            to respond and to keep reasonable business records.
          </p>

          <h2>Cookies & tracking</h2>
          <p>
            This website does not use advertising trackers or analytics cookies. Facebook and Instagram may use
            cookies and similar technologies under Meta&rsquo;s own policies when you view or interact with our ads.
          </p>

          <h2>Your choices</h2>
          <p>
            To ask what information we hold about you, or to have it deleted, contact us at{" "}
            <a href={`mailto:${business.email}`} className="text-white underline decoration-red underline-offset-4">
              {business.email}
            </a>{" "}
            or{" "}
            <a href={business.phoneHref} className="text-white underline decoration-red underline-offset-4">
              {business.phoneDisplay}
            </a>
            .
          </p>

          <p className="!mt-12 text-sm">
            <Link href="/" className="text-white underline decoration-red underline-offset-4">
              &larr; Back to home
            </Link>
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
