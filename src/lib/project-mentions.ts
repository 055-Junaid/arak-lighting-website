import { SERVICES } from "./services-data";
import { getServiceDetail, type ServicePhoto } from "./service-details";

/**
 * What the service pages already say about one project.
 *
 * Project pages were the thinnest on the site, about 65 words each, and on
 * 2026-11-01 Google had not indexed Four Points at all. Yet the service pages
 * describe these same buildings photo by photo: "Seder Head Quarter, Riyadh:
 * the approach paving, lit from the columns along the kerb". None of that
 * reached the project's own page. This gathers it, so the project page says
 * what was lit and how, and links each line back to the service it proves.
 *
 * Only photo captions of the form "Project, City: what the photo shows" are
 * used. A caption describes the photograph it sits under, so it is true of
 * this project. Captions that only restate the scope ("…, where ARAK
 * supplied…") repeat the page's own intro and are left out. So is a service
 * that merely shows the project as a card: listing projection mapping on a
 * hotel page because the hotel's card appears on that service page would
 * claim work nobody has described.
 */
export interface ProjectMention {
  slug: string;
  en: string;
  ar: string;
  notes: { en: string; ar: string }[];
}

/** "Seder Head Quarter, Riyadh: the approach paving…" → "The approach paving…" */
function withoutName(caption: string) {
  const rest = caption.slice(caption.indexOf(": ") + 2);
  return rest.charAt(0).toUpperCase() + rest.slice(1);
}

/** Arabic captions use the same colon, with or without a space after it. */
function withoutArName(caption: string) {
  const at = caption.indexOf(":");
  return at > 0 ? caption.slice(at + 1).trim() : caption;
}

export function projectMentions(projectSlug: string): ProjectMention[] {
  const prefix = `/projects/${projectSlug}/`;
  const out: ProjectMention[] = [];
  for (const service of SERVICES) {
    const detail = getServiceDetail(service.slug);
    if (!detail) continue;
    const photos: ServicePhoto[] = [
      detail.hero,
      ...detail.gallery,
      ...(detail.applications ?? []).map((a) => a.image),
    ].filter((p) => p.src.startsWith(prefix) && p.caption.includes(": "));
    const seen = new Set<string>();
    const notes = photos
      .filter((p) => (seen.has(p.caption) ? false : (seen.add(p.caption), true)))
      .map((p) => ({ en: withoutName(p.caption), ar: withoutArName(p.arCaption) }));
    if (!notes.length) continue;
    out.push({ slug: service.slug, en: service.en, ar: service.ar, notes });
  }
  return out.sort((a, b) => b.notes.length - a.notes.length);
}
