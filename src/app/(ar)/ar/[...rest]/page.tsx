import { notFound } from "next/navigation";

/**
 * Catch-all for unmatched URLs under /ar.
 *
 * Without it, /ar/anything falls through to `global-not-found`, which is a
 * single English document — an Arabic visitor following a stale link would be
 * answered in the wrong language. Throwing `notFound()` here keeps the request
 * inside the Arabic tree, so the Arabic 404 and its layout answer instead.
 *
 * English needs no equivalent: `global-not-found` is already English.
 */
export default function ArabicCatchAll(): never {
  notFound();
}
