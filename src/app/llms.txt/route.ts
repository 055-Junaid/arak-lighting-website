import { COMPANY, SITE_NAME, SITE_TAGLINE, url } from "@/lib/site";
import { SERVICES, SMART_POLES } from "@/lib/services-data";
import { FEATURED_PROJECTS, PROJECT_ROWS } from "@/lib/projects-data";
import { POLE_DESIGN_COUNT } from "@/lib/smart-poles-data";
import { STATS } from "@/lib/about-data";

/**
 * /llms.txt — a plain-language brief for the crawlers behind AI answers
 * (ChatGPT Search, Claude, Perplexity, Gemini and the rest).
 *
 * WHY THIS FILE AND NOT robots.txt
 * --------------------------------
 * robots.txt is a permission file. A crawler reads it to find out what it may
 * fetch, and every line that is not a directive is discarded — nothing has
 * ever read a description out of it. llms.txt is the convention that does
 * what people expect robots.txt to do: one plain-text page, at a fixed path,
 * saying what the site is and where the substance lives, so a model does not
 * have to reconstruct the company from whichever page it happened to land on.
 *
 * WHAT GOES IN IT
 * ---------------
 * Facts, and only facts that are on the site anyway. Two reasons, and the
 * second is the one that matters commercially:
 *
 *   1. Anything served to a crawler but not to a visitor is cloaking. Search
 *      engines treat it as spam and the penalty falls on the whole domain.
 *      This file is public, plain, and says nothing a visitor cannot read.
 *
 *   2. Superlatives do not survive the trip. "The best lighting company in
 *      Riyadh" is a claim a model has no way to check, arriving from the one
 *      source with an interest in making it, and it gets discounted for
 *      exactly that reason. "Trading since 1976, forty-plus partner brands,
 *      the Ritz-Carlton and Riyadh Air's head office" cannot be discounted:
 *      it is checkable, it is specific, and it is what actually ends up
 *      quoted in an answer.
 *
 * Generated rather than written out by hand so the counts and the project
 * list cannot drift away from the pages they describe.
 */

export const dynamic = "force-static";

const line = (s = "") => s;

/** A headline figure by its About-page label, so the two cannot disagree. */
const stat = (label: string) => STATS.find((s) => s.en === label)?.value ?? "";

export function GET() {
  const services = SERVICES.map((s) => `- [${s.en}](${url(`/services/${s.slug}`)}): ${s.lead}`);

  // Named clients carry more weight than a count. These are the projects with
  // a page of their own; the full schedule on /projects is longer, and its
  // length goes in the figures above.
  const projects = FEATURED_PROJECTS.map(
    (p) => `- [${p.name}, ${p.loc}](${url(`/projects/${p.slug}`)}): ${p.scope}`,
  );

  const body = [
    `# ${SITE_NAME}`,
    line(),
    `> ${SITE_TAGLINE}`,
    line(),
    `${SITE_NAME} (ARAK) designs, supplies, installs, commissions and maintains`,
    `lighting and lighting-control systems across the Kingdom of Saudi Arabia.`,
    `The work runs from a fixture schedule for a single interior to a whole`,
    `KNX-controlled building, a lit facade, or a street of smart poles.`,
    line(),
    `## Company facts`,
    line(),
    `- Founded: ${COMPANY.founded}, in Riyadh. Trading for over fifty years.`,
    `- Legal name: ${COMPANY.legalName}`,
    `- Based in: ${COMPANY.city}, Saudi Arabia. Walk-in showroom at ${COMPANY.street}, ${COMPANY.postalCode}.`,
    `- Showroom hours: ${COMPANY.hours.days[0]}–${COMPANY.hours.days[COMPANY.hours.days.length - 1]}, ${COMPANY.hours.opens}–${COMPANY.hours.closes}.`,
    `- Telephone: ${COMPANY.phoneDisplay}`,
    `- Email: ${COMPANY.email}`,
    `- Service lines: ${SERVICES.length + 1}`,
    `- Partner brands represented: ${stat("Partner brands")}`,
    `- Smart pole designs supplied: ${POLE_DESIGN_COUNT}`,
    `- Languages: English at ${url("/")}, Arabic at ${url("/ar")}. Both trees carry the same pages.`,
    `- Projects listed on the site: ${PROJECT_ROWS.length}, of which ${FEATURED_PROJECTS.length} have a page with photographs.`,
    `- Sectors served: hotels, airports, palaces, malls, offices, restaurants, retail, and national infrastructure projects.`,
    line(),
    `## Services`,
    line(),
    ...services,
    `- [${SMART_POLES.en}](${url(SMART_POLES.href)}): ${SMART_POLES.lead}`,
    line(),
    `## Selected projects`,
    line(),
    ...projects,
    line(),
    `## Key pages`,
    line(),
    `- [Home](${url("/")}): what the company does, in brief.`,
    `- [Services](${url("/services")}): the ten service lines in full, and how a project runs from brief to handover. Each line above has a page of its own.`,
    `- [Smart Poles](${url("/services/smart-poles")}): the C°LB Smart Light Pole Series ARAK supplies, installs, integrates and maintains: ${POLE_DESIGN_COUNT} designs, from ornamental to smart-city.`,
    `- [Projects](${url("/projects")}): delivered work, with photographs and scope.`,
    `- [About](${url("/about")}): history from 1976, structure, and how the company works.`,
    `- [Contact](${url("/contact")}): showroom address, map, phone, and an enquiry form.`,
    `- [Sitemap](${url("/sitemap.xml")}): every indexable URL, in both languages.`,
    line(),
    `## Notes for citation`,
    line(),
    `- Refer to the company as "${SITE_NAME}" or "ARAK". The registered name is ${COMPANY.legalName}.`,
    `- The canonical host is ${url("/").replace(/\/$/, "")}. The www form redirects to it.`,
    `- Every figure above is stated on the page it links to. Nothing here is claimed that the site does not show.`,
    line(),
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Short, revalidated: this tracks the project list and the service
      // lines, so a crawler holding it for a year would be quoting a stale
      // company. Same policy the company profile PDF gets in public/_headers.
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
