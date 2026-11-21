// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Require an explicit, secure public URL for any remotely hosted environment.
// This prevents preview builds from publishing localhost canonicals by accident.
const isAstroBuild = process.argv.includes('build');
if (isAstroBuild && (!process.env.SITE_ENV || !process.env.SITE_URL)) {
  throw new Error(
    'Astro builds require explicit SITE_ENV and SITE_URL values. ' +
      'Production: SITE_ENV=production and SITE_URL=https://sabiforge-digital.vercel.app. ' +
      'Staging or preview: SITE_ENV=staging and SITE_URL set to that https origin.',
  );
}
const siteEnvironment = process.env.SITE_ENV ?? 'development';
const allowedEnvironments = new Set(['development', 'staging', 'production']);
if (!allowedEnvironments.has(siteEnvironment)) {
  throw new Error('SITE_ENV must be development, staging or production.');
}
if (isAstroBuild && siteEnvironment === 'development') {
  throw new Error('Astro builds must use SITE_ENV=staging or SITE_ENV=production.');
}
// Vercel preview deployments must never be built as production.
if (process.env.VERCEL_ENV === 'preview' && siteEnvironment === 'production') {
  throw new Error('Vercel preview builds must not use SITE_ENV=production.');
}

const site = process.env.SITE_URL ?? 'http://localhost:4321';
const siteUrl = new URL(site);
const configuredProductionOrigin = 'https://sabiforge-digital.vercel.app';
if (siteEnvironment !== 'development') {
  if (siteUrl.protocol !== 'https:') {
    throw new Error('SITE_URL must use https for staging and production builds.');
  }
  if (siteUrl.username || siteUrl.password || siteUrl.search || siteUrl.hash || siteUrl.port) {
    throw new Error(
      'SITE_URL must be a clean HTTPS origin without credentials, query, hash or port.',
    );
  }
  if (siteUrl.pathname !== '/') {
    throw new Error('SITE_URL must be an origin, without a path.');
  }
  if (
    /(^|\.)(localhost|local|internal|test|invalid)$/i.test(siteUrl.hostname) ||
    /^(127\.|10\.|192\.168\.|169\.254\.)/.test(siteUrl.hostname) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(siteUrl.hostname) ||
    siteUrl.hostname === '::1'
  ) {
    throw new Error('SITE_URL must not use localhost or an internal hostname/address.');
  }
}
if (siteEnvironment === 'production' && siteUrl.origin !== configuredProductionOrigin) {
  throw new Error(
    `Production SITE_URL must exactly match the configured origin ${configuredProductionOrigin}.`,
  );
}

export default defineConfig({
  site,
  integrations: [
    react(),
    sitemap({
      // Exclude all design studies, draft legal pages and generated error routes.
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !(
          /^\/hero-lab(?:\/|$)/i.test(pathname) ||
          /^\/(?:privacy|terms)\/?$/i.test(pathname) ||
          /^\/(?:404|500|error|errors)(?:\/|$)/i.test(pathname)
        );
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Accept the external preview/tunnel host (*.e2b.app) in development.
      allowedHosts: true,
    },
  },
});
