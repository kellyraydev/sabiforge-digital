import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';

/**
 * One island for every concept demo. Each demo is code-split with React.lazy, so a demo's
 * JavaScript loads only on its own /work/<slug>/demo page. T1-T10 add one line each.
 */
const registry: Record<string, LazyExoticComponent<ComponentType>> = {
  'corporate-digital-modernization': lazy(() => import('./demos/CorporateRedesignDemo')),
};

export default function DemoIsland({ slug }: { slug: string }) {
  const Demo = registry[slug];
  if (!Demo) return <p role="alert">This demo is not available yet.</p>;
  return (
    <Suspense
      fallback={
        <p className="p-8 text-center text-sm opacity-70" aria-live="polite">
          Loading the demo…
        </p>
      }
    >
      <Demo />
    </Suspense>
  );
}

export const demoSlugs = Object.keys(registry);
