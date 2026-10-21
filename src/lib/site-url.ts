/**
 * Public URL of the deployed site, used for canonical links, Open Graph images,
 * the sitemap and structured data. Set NEXT_PUBLIC_SITE_URL once you have a
 * domain (e.g. https://www.example.com). On Vercel the production URL is used
 * automatically until then. Never shown as business contact information.
 */
function resolve() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "";
}

export const siteUrl = resolve();
