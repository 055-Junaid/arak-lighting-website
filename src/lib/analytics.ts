/**
 * Google Analytics 4.
 *
 * Search Console already reports what people SEARCHED for and whether they
 * clicked through. What it cannot report is what happened next — which service
 * page they actually read, how long they stayed, whether they ever reached the
 * enquiry form. That is the half this measures, and the pair is what turns
 * "we appear for 'guest room management system' and get no clicks" from an
 * observation into a decision about what to write.
 *
 * The tag is loaded once, in RootShell, because both language trees render
 * through it. Google's own instructions say to paste the snippet "in the code
 * of every page", which is advice for a site made of HTML files; here there is
 * no such thing as every page, and one component covers all of them.
 */

/**
 * The measurement id, from the environment.
 *
 * `NEXT_PUBLIC_` because the tag runs in the browser. That makes the id public,
 * which is fine and unavoidable — Google prints it in a copy-paste box and it
 * is visible in any view-source. It names a property to write into; it grants
 * nothing and reads nothing.
 *
 * So the reason it is an environment variable is NOT secrecy. It is that an
 * unset value renders no tag at all, which is what keeps local development and
 * every Netlify deploy preview out of the production numbers. Without that
 * guard, a quiet week's "sessions" would be mostly us.
 *
 * Set it in Netlify (Site configuration -> Environment variables) as well —
 * .env.example is a record of what the build expects, it is not read.
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
