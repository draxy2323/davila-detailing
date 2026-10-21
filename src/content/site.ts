/**
 * ─────────────────────────────────────────────────────────────────────────
 *  DAVILA DETAILING CO. — SITE CONTENT
 *  Everything a non-developer is likely to change lives in this one file:
 *  contact details, service copy, prices, FAQ answers, photos and reviews.
 *
 *  Rules this file follows on purpose:
 *   • Only verified business facts are filled in.
 *   • Anything not yet confirmed is `null` or an empty list, and the site
 *     either hides it or shows a clearly labelled placeholder.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type SiteImage = {
  /** Path inside /public, e.g. "/images/gallery/interior-1-after.jpg" */
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const business = {
  name: "Davila Detailing Co.",
  shortName: "Davila Detailing",
  tagline: "We come to you!",
  phoneDisplay: "(609) 613-3772",
  phoneHref: "tel:+16096133772",
  phoneE164: "+16096133772",
  email: "daviladetailing@yahoo.com",
  serviceArea: "Mercer County, NJ, and surrounding areas",
  serviceAreaLong: "Mercer County, New Jersey, and surrounding areas",
  /**
   * Social profiles. Leave empty until real profiles exist — the footer only
   * renders links that are listed here.
   * Example: { label: "Instagram", href: "https://instagram.com/yourhandle" }
   */
  social: [] as { label: string; href: string }[],
  /** Not displayed until confirmed. Example: "Mon–Sat, 8am–6pm" */
  hours: null as string | null,
};

export const logo = {
  src: "/brand/logo-1200.webp",
  alt: "Davila Detailing Co. logo — a glossy red sports car with a wash bucket and spray bottle above chrome lettering",
  width: 1200,
  height: 766,
};

/**
 * Optional hero photo. When null, the hero shows the brand illustration from
 * the logo. Add a wide (at least 2000px) photo of your own work and set it here.
 */
export const heroImage: SiteImage | null = null;

export type ServiceSlug = "interior" | "exterior" | "ceramic-coating" | "other";

export type Service = {
  slug: ServiceSlug;
  title: string;
  /** Short card copy. Keep it to ~2 sentences. */
  description: string;
  highlights: string[];
  /** e.g. "Starting at $___". Leave null to hide pricing entirely. */
  price: string | null;
  /** Add your own photo here; until then a labelled placeholder is shown. */
  image: SiteImage | null;
};

export const services: Service[] = [
  {
    slug: "interior",
    title: "Interior Detailing",
    description:
      "A thorough clean and refresh of your cabin — the seats, carpets, panels and surfaces you see and touch every day — so your vehicle feels cared for again.",
    highlights: ["Seats, carpets & mats", "Dash, console & door panels", "Interior glass & touch points"],
    price: null,
    image: null,
  },
  {
    slug: "exterior",
    title: "Exterior Detailing",
    description:
      "Careful exterior cleaning that lifts road grime and brings back gloss, helping your vehicle look clean, sharp and well presented wherever you park it.",
    highlights: ["Hand wash & dry", "Wheels & tires", "Exterior glass & trim"],
    price: null,
    image: null,
  },
  {
    slug: "ceramic-coating",
    title: "Ceramic Coating",
    description:
      "A protective coating for your paint that can deepen gloss, help repel water and contaminants, and make routine washing easier. We'll talk through what to expect for your vehicle before you book.",
    highlights: ["Enhanced gloss & depth", "Water-beading surface", "Easier upkeep between washes"],
    price: null,
    image: null,
  },
  {
    slug: "other",
    title: "Additional Services",
    description:
      "Need something specific? Tell us what your vehicle needs and we'll let you know how we can help.",
    // EDIT: replace these with the extra services you actually offer.
    highlights: ["[Add a service you offer]", "[Add a service you offer]", "Just ask — tell us what you need"],
    price: null,
    image: null,
  },
];

export const serviceOptions: { value: ServiceSlug | "not-sure"; label: string }[] = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "not-sure", label: "Not sure yet — help me choose" },
];

export type GalleryCategory = "interior" | "exterior" | "ceramic-coating";

export type GalleryItem = {
  category: GalleryCategory;
  title: string;
  /** Your real before/after photos of the same vehicle and angle. */
  before: SiteImage | null;
  after: SiteImage | null;
};

export const galleryCategories: { value: GalleryCategory; label: string }[] = [
  { value: "interior", label: "Interior" },
  { value: "exterior", label: "Exterior" },
  { value: "ceramic-coating", label: "Ceramic Coating" },
];

/**
 * Gallery slots. Each one shows a labelled placeholder until you add photos.
 * Only use photos of vehicles you actually detailed.
 */
export const gallery: GalleryItem[] = [
  { category: "interior", title: "Interior refresh", before: null, after: null },
  { category: "interior", title: "Seats & carpets", before: null, after: null },
  { category: "exterior", title: "Exterior wash & gloss", before: null, after: null },
  { category: "exterior", title: "Wheels & tires", before: null, after: null },
  { category: "ceramic-coating", title: "Ceramic coating finish", before: null, after: null },
  { category: "ceramic-coating", title: "Paint gloss & beading", before: null, after: null },
];

export type Testimonial = {
  quote: string;
  name: string; // e.g. "Maria G." — only with the customer's permission
  vehicle?: string;
  source?: string; // e.g. "Google review"
};

/**
 * Real customer reviews only. While this list is empty the section is hidden
 * on the live site and shown as a labelled placeholder in development.
 */
export const testimonials: Testimonial[] = [];

export type Faq = { question: string; answer: string; needsOwnerInput?: boolean };

export const faqs: Faq[] = [
  {
    question: "What is mobile detailing?",
    answer:
      "Mobile detailing means we bring the detailing service to you. Instead of dropping your vehicle off at a shop, we come to your home or another suitable location and detail it on-site, so you can get on with your day.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We provide mobile detailing throughout Mercer County, New Jersey, and surrounding areas. If you're not sure whether we reach your location, send a quote request with your ZIP code or give us a call and we'll confirm availability.",
  },
  {
    question: "What detailing services are available?",
    answer:
      "We offer interior detailing, exterior detailing and ceramic coating, plus additional services on request. Tell us what you're looking for in your quote request and we'll recommend the right option for your vehicle.",
  },
  {
    question: "How do I request a quote?",
    answer:
      "Fill out the quote form on this page with your vehicle and the service you need — photos help — or call us at (609) 613-3772. We'll follow up to talk through options and arrange a time.",
  },
  {
    question: "How long does detailing take?",
    // EDIT: replace with your typical timeframes.
    answer:
      "[Owner to confirm] Timing depends on the service, the size of the vehicle and its condition. We'll give you an estimate when we confirm your quote.",
    needsOwnerInput: true,
  },
  {
    question: "How should I prepare my vehicle?",
    // EDIT: confirm or adjust this guidance (e.g. water/power access requirements).
    answer:
      "[Owner to confirm] Please remove personal belongings and valuables from the vehicle before your appointment, and let us know about any areas of concern. We'll confirm any other requirements for your location — such as parking or space to work — when we schedule.",
    needsOwnerInput: true,
  },
  {
    question: "What should I know before requesting ceramic coating?",
    // EDIT: add your prep process, expected longevity and aftercare guidance.
    answer:
      "Ceramic coating is a protective layer for your paint, and results depend on the condition of the paint beforehand. It can enhance gloss and make washing easier, but it doesn't make a vehicle scratch-proof and still needs proper care. [Owner to confirm: paint-prep process, expected durability and aftercare instructions.]",
    needsOwnerInput: true,
  },
];

/** Navigation shared by the header and footer. */
export const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];
