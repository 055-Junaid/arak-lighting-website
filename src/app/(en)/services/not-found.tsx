import { NotFound } from "@/components/NotFound";

/**
 * Catches `notFound()` from /services/[slug] — a service line that does not
 * exist. Sits at the section rather than in the route group so it resolves as
 * a nested boundary and renders inside the locale layout, keeping the header,
 * the footer and the colour switch.
 *
 * The smart-poles section has its own copy of this one level down, so a bad
 * pole slug is still answered there.
 */
export default function SectionNotFound() {
  return <NotFound lang="en" />;
}
