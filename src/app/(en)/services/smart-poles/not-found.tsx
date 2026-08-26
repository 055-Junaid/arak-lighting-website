import { NotFound } from "@/components/NotFound";

/**
 * Catches `notFound()` from this section's [slug] route — a project or pole
 * that does not exist. It lives at the section rather than in the route group
 * so it resolves as a nested boundary and renders inside the locale layout,
 * keeping the header, the footer and the colour switch.
 */
export default function SectionNotFound() {
  return <NotFound lang="en" />;
}
