# Making ARAK a known entity

The site now describes ARAK in structured data: the organisation, its ten
service lines (each with its own `Service` node) and its projects. Search engines
and AI assistants trust that more when sources *other than our own site* say
the same thing. Two of those are free and are ours to create. Both need a
person signed in, so they are not done from code.

"arak" alone is also an Iranian city and a drink. That is why searches for the
bare name rank us at about position 6.5. An entity with its own record is how
Google learns which Arak a searcher means.

## 1. Google Business Profile

The showroom (Exit 2, Northern Ring Branch Road, Hittin, Riyadh) is what
answers "lighting stores riyadh", "light shop near me" and
"محلات انارة الرياض". Those searches show the map pack before any website.

1. Open <https://business.google.com> with the company Google account. Claim
   the existing listing if Maps already shows one (the site links to
   <https://maps.app.goo.gl/yH6eHRJu1mLRuFqm6>).
2. Use exactly the name, address, phone and hours the site uses
   (`COMPANY` in `src/lib/site.ts`). A mismatch splits the entity.
3. Primary category: **Lighting store**. Add **Lighting consultant** and
   **Lighting contractor**.
4. Website: `https://arak-sa.com`. Add the services, both languages, and
   project photographs.

## 2. Wikidata item

1. Sign in at <https://www.wikidata.org> and choose **Create a new Item**.
2. Label "ARAK Lighting Solutions", Arabic label "أراك للإضاءة", description
   "Saudi lighting company, Riyadh, founded 1976". Aliases: Arak Lighting,
   ARAK, شركة أراك للإضاءة.
3. Statements:

   | Property | Value |
   |---|---|
   | instance of (P31) | business (Q4830453) |
   | country (P17) | Saudi Arabia (Q851) |
   | headquarters location (P159) | Riyadh (Q3692) |
   | inception (P571) | 1976 |
   | official website (P856) | https://arak-sa.com |
   | industry (P452) | search "lighting" and pick the matching item |
   | Instagram username (P2003) | araklighting |
   | LinkedIn company ID (P4264) | araklighting |
   | X username (P2002) | araklighting |

   Add the official website as a reference on each statement. Wikidata removes
   unreferenced company items.
4. Send the new item's URL (`https://www.wikidata.org/wiki/Q…`) so it can be
   added to the Organization's `sameAs` in `src/components/StructuredData.tsx`.
   Add it there, not to `SOCIALS`, which also draws the footer icons.

## 3. After the deploy

Paste a service page and a project page into
<https://search.google.com/test/rich-results> and
<https://validator.schema.org>. Both should report the Organization, Service,
FAQPage and BreadcrumbList with no errors.
