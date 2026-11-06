// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The production domain has not been confirmed yet. Set SITE_URL in the
// staging/production environment so canonical URLs, sitemap and OG tags resolve.
const site = process.env.SITE_URL ?? 'http://localhost:4321';

export default defineConfig({
  site,
  integrations: [
    react(),
    sitemap({
      // Draft legal pages are noindex and stay out of the sitemap until the owner approves them.
      filter: (page) => !/\/(404|privacy|terms)\/?$/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
