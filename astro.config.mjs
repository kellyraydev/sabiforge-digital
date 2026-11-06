// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// The production domain has not been confirmed yet. Set SITE_URL in the
// staging/production environment so canonical URLs and OG tags resolve.
const site = process.env.SITE_URL ?? 'http://localhost:4321';

export default defineConfig({
  site,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
