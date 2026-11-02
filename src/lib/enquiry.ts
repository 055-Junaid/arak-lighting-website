/**
 * Where the enquiry form sends what a visitor types.
 *
 * The form used to build a `mailto:` URL and hand it to the visitor's own mail
 * client. That works right up until the visitor has no mail client configured —
 * plain Chrome on Windows without Outlook, a locked-down corporate machine,
 * anyone on webmail who never registered a `mailto:` handler — and then the
 * enquiry is simply gone. No error, no record, nothing to follow up. These are
 * exactly the procurement and consultant users this site is written for.
 *
 * So the form posts instead. The endpoint is a Google Apps Script Web App that
 * appends a row to the enquiries Sheet; see `docs/enquiries-apps-script.gs` for
 * the script and the deployment steps.
 */

/**
 * The deployed Web App's `/exec` URL, from the environment.
 *
 * `NEXT_PUBLIC_` because the POST is made from the browser. That makes the URL
 * public, which is fine and unavoidable for a form endpoint — it accepts
 * writes, never reads, and the Sheet behind it is not exposed. The spam guards
 * below are what stand in for the secrecy the URL does not have.
 */
export const ENQUIRY_ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ?? "";

/**
 * Where an enquiry goes when the visitor left the marketing box ticked: the
 * ARAK marketing app, which files them as a marketing contact (the group
 * "Website enquiries"). Both values ship in the page and are not secrets: the
 * key only names which workspace this site belongs to, and the app accepts
 * posts from arak-sa.com alone. Overridable per deployment.
 */
export const SIGNUP_ENDPOINT =
  process.env.NEXT_PUBLIC_SIGNUP_ENDPOINT ?? "https://marketing-main-ten.vercel.app/api/email/website-signup";
export const SIGNUP_KEY = process.env.NEXT_PUBLIC_SIGNUP_KEY ?? "arak_site_cf63094877b1933864ef";

/** Where enquiries are addressed. The fallback, and the address on the page. */
export const INBOX = "info@arak-sa.com";

/**
 * Name of the honeypot field. It is a real input, positioned off-screen and
 * hidden from assistive tech, that a person never sees and never fills. Most
 * form spam is submitted by scripts that fill every field they find, so a
 * non-empty value here is a reliable bot signal.
 *
 * Named to look worth filling: a field called "honeypot" is one a bot can learn
 * to skip.
 */
export const TRAP_FIELD = "company-website";

/**
 * Minimum time, in milliseconds, between the form appearing and it being
 * submitted. Nobody reads six fields and writes a project brief in under three
 * seconds; a script does it instantly.
 */
export const MIN_FILL_MS = 3000;

export type Enquiry = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  brief: string;
  /**
   * Which channel brought the visitor here, recorded in the language of the
   * form it was chosen on: the Arabic option files its Arabic wording, the
   * English one its English. The Sheet keeps what was actually said rather
   * than a normalised code, so one channel appears under two spellings.
   * Empty when the question was skipped, which it may be.
   */
  heardFrom: string;
  /**
   * What they typed when they chose "Other". Optional even then: choosing
   * "Other" and writing nothing is a real answer, and records as "Other" with
   * this left blank.
   */
  heardFromDetail: string;
  /** Which side of the site the enquiry came from, so replies go out in kind. */
  lang: "en" | "ar";
  /** The page it was sent from, for attribution. */
  source: string;
};

/**
 * Posts an enquiry to the Sheet.
 *
 * Sent as `text/plain` deliberately. It is one of the three content types the
 * browser will send cross-origin without a preflight `OPTIONS` request, and
 * Apps Script Web Apps cannot answer a preflight — asking for
 * `application/json` here fails in the browser before the request is ever made.
 * The body is still JSON; `doPost` reads it from `e.postData.contents`.
 */
export async function sendEnquiry(enquiry: Enquiry): Promise<void> {
  if (!ENQUIRY_ENDPOINT) {
    throw new Error("NEXT_PUBLIC_ENQUIRY_ENDPOINT is not set");
  }

  const response = await fetch(ENQUIRY_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(enquiry),
    redirect: "follow",
  });

  if (!response.ok) throw new Error(`Enquiry endpoint returned ${response.status}`);

  // Apps Script answers 200 even for a handled failure, so the body decides.
  const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;
  if (!result?.ok) throw new Error("Enquiry endpoint reported a failure");
}

/**
 * The `mailto:` the page falls back to when the POST fails or the endpoint is
 * not configured yet. Not the primary path any more, but a visitor who has
 * written a brief should never lose it to a network error.
 */
export function mailtoFallback(enquiry: Enquiry): string {
  const ar = enquiry.lang === "ar";
  const line = (label: string, value: string) => (value ? `${label}: ${value}\n` : "");

  const subject = ar
    ? `طلب استشارة إضاءة: ${enquiry.projectType}`
    : `Lighting enquiry: ${enquiry.projectType}`;

  // "Other: saw the van on Olaya" reads better than two separate lines, and
  // collapses to plain "Other" when nothing was typed.
  const heard = enquiry.heardFromDetail
    ? `${enquiry.heardFrom}: ${enquiry.heardFromDetail}`
    : enquiry.heardFrom;

  const body = ar
    ? `الاسم: ${enquiry.name}\n` +
      line("الجهة", enquiry.company) +
      `البريد الإلكتروني: ${enquiry.email}\n` +
      line("الهاتف", enquiry.phone) +
      `نوع المشروع: ${enquiry.projectType}\n` +
      line("كيف عرفنا", heard) +
      `\nموجز المشروع:\n${enquiry.brief}\n`
    : `Name: ${enquiry.name}\n` +
      line("Company", enquiry.company) +
      `Email: ${enquiry.email}\n` +
      line("Phone", enquiry.phone) +
      `Project type: ${enquiry.projectType}\n` +
      line("Heard about us", heard) +
      `\nBrief:\n${enquiry.brief}\n`;

  return `mailto:${INBOX}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Adds the visitor to ARAK's marketing emails, when they left the box ticked.
 *
 * Never allowed to cost the enquiry anything: it is sent after the Sheet post
 * succeeded, it is not awaited by the form, and a failure is swallowed. The
 * enquiry itself is what matters; missing one newsletter contact does not.
 * `text/plain` for the same reason as `sendEnquiry`: no preflight.
 */
export function sendMarketingSignup(enquiry: Enquiry): void {
  if (!SIGNUP_ENDPOINT || !SIGNUP_KEY) return;
  fetch(SIGNUP_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      key: SIGNUP_KEY,
      consent: true,
      name: enquiry.name,
      email: enquiry.email,
      company: enquiry.company,
      phone: enquiry.phone,
      projectType: enquiry.projectType,
      lang: enquiry.lang,
      page: enquiry.source,
    }),
    // Survives the visitor navigating away straight after pressing Send.
    keepalive: true,
  }).catch(() => {});
}
