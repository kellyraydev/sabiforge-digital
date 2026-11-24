/**
 * Project Blueprints: one declarative file describes a concept project's whole preview site, and a
 * generic renderer assembles it (src/pages/preview/[...path].astro). Inspired by WordPress Studio
 * Blueprints: lightweight, declarative, shareable. Adding a project is one blueprint file.
 *
 * Images are referenced by file name and resolved from src/assets/projects/<slug>/. A missing image
 * renders a themed placeholder (never a blank box), so a blueprint is reviewable before the art
 * exists. The required images per project are listed in docs/IMAGE-REQUESTS.md for the Grok bot.
 */
import type { ConceptBasis } from '@/data/concepts';

/** Font keys map to already self-hosted families (src/styles/global.css). No new dependencies. */
export type FontKey = 'inter' | 'outfit' | 'instrument-serif' | 'bricolage' | 'jetbrains-mono';

export interface Theme {
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  accent: string;
  accentInk: string;
  display: FontKey;
  body: FontKey;
  radius: string;
}

export interface Cta {
  label: string;
  to: string;
}

export interface ImageRef {
  /** File under src/assets/projects/<slug>/, e.g. 'hero.webp'. */
  file: string;
  /** Alt text. Required: a preview with real art still needs accessible descriptions. */
  alt: string;
}

/** Islands a section may mount for real interactivity. Extend as reusable islands are added. */
export type SectionIsland = 'enquiry-bag';

export type Section =
  | {
      type: 'hero';
      eyebrow?: string;
      headline: string;
      sub?: string;
      image?: ImageRef;
      cta?: Cta;
      secondaryCta?: Cta;
    }
  | {
      type: 'feature-grid';
      title?: string;
      intro?: string;
      items: { title: string; body: string }[];
    }
  | {
      type: 'product-grid';
      title?: string;
      intro?: string;
      products: { name: string; caption?: string; image?: ImageRef }[];
      island?: SectionIsland;
    }
  | { type: 'gallery'; title?: string; images: ImageRef[] }
  | { type: 'cta'; headline: string; sub?: string; cta?: Cta };

export interface BlueprintPage {
  /** Served at /preview/<slug><path>. '/' is the project home. */
  path: string;
  title: string;
  sections: Section[];
}

export interface Blueprint {
  slug: string;
  name: string;
  /** client = owner-approved real work; reference = uncommissioned; fictional = invented brand. */
  basis: ConceptBasis;
  tagline: string;
  theme: Theme;
  /** Subdomain label for a future custom-domain share (e.g. aura.studio.example). */
  share: { subdomain: string; noindex: boolean };
  /** Nav labels paired with page paths, in order. Defaults to every page's title. */
  nav?: { label: string; to: string }[];
  pages: BlueprintPage[];
}

/** Identity helper: keeps blueprint files type-checked and greppable. */
export function defineBlueprint(blueprint: Blueprint): Blueprint {
  return blueprint;
}

const fontStacks: Record<FontKey, string> = {
  inter: "'Inter Variable', system-ui, sans-serif",
  outfit: "'Outfit Variable', system-ui, sans-serif",
  'instrument-serif': "'Instrument Serif', Georgia, serif",
  bricolage: "'Bricolage Grotesque Variable', system-ui, sans-serif",
  'jetbrains-mono': "'JetBrains Mono Variable', ui-monospace, monospace",
};

/** Inline CSS custom properties for a blueprint's theme, applied on the preview wrapper. */
export function themeStyle(theme: Theme): string {
  return [
    `--bp-bg:${theme.bg}`,
    `--bp-surface:${theme.surface}`,
    `--bp-ink:${theme.ink}`,
    `--bp-muted:${theme.muted}`,
    `--bp-accent:${theme.accent}`,
    `--bp-accent-ink:${theme.accentInk}`,
    `--bp-radius:${theme.radius}`,
    `--bp-display:${fontStacks[theme.display]}`,
    `--bp-body:${fontStacks[theme.body]}`,
  ].join(';');
}

/** Images for every project, globbed eagerly so a present file swaps in with no code change. */
const projectImages = import.meta.glob<string>('/src/assets/projects/*/*.{webp,jpg,jpeg,png,svg}', {
  eager: true,
  import: 'default',
});

export function projectImage(slug: string, file: string): string | undefined {
  return projectImages[`/src/assets/projects/${slug}/${file}`];
}

/** How a project's preview links are shared, for the index and docs. */
export function previewPath(slug: string, path = '/'): string {
  return `/preview/${slug}${path === '/' ? '' : path}`;
}
