// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Require an explicit, secure public URL for any remotely hosted environment.
// This prevents preview builds from publishing localhost canonicals by accident.
const siteEnvironment = process.env.SITE_ENV ?? 'development';
const allowedEnvironments = new Set(['development', 'staging', 'production']);
if (!allowedEnvironments.has(siteEnvironment)) {
  throw new Error('SITE_ENV must be development, staging or production.');
}

const site = process.env.SITE_URL ?? 'http://localhost:4321';
const siteUrl = new URL(site);
if (siteEnvironment !== 'development' && siteUrl.protocol !== 'https:') {
  throw new Error('SITE_URL must use https for staging and production builds.');
}
if (siteEnvironment === 'production' && /(^|\.)staging[.-]/i.test(siteUrl.hostname)) {
  throw new Error('Production SITE_URL must not use a staging hostname.');
}

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
