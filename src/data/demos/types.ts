export interface ReviewStep {
  /** Which kind of decision this is, e.g. Layout, Conversion path, Accessibility. */
  focus: string;
  title: string;
  body: string;
}

export interface DemoDefinition {
  /** Must match a concept id in src/data/concepts.ts. */
  slug: string;
  title: string;
  intro: string;
  /**
   * Height reserved for the demo before it loads, so the page does not jump (CLS).
   * base: phones; sm: 640px and wider; lg: 1024px and wider (defaults to sm). Match the demo's tallest default view.
   */
  reserve: { base: string; sm: string; lg?: string };
  /** Guided walkthrough shown in review mode. */
  review: ReviewStep[];
}
