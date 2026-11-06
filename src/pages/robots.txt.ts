import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('/sitemap-index.xml', site).href;
  const siteEnvironment = process.env.SITE_ENV ?? 'development';
  const rules =
    siteEnvironment === 'production'
      ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`
      : 'User-agent: *\nDisallow: /\n';
  return new Response(rules, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
