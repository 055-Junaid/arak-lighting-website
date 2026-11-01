"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Reports taps on phone and email links to GA4.
 *
 * One listener on the document rather than an onClick on each link: the
 * number and the address appear in the footer, on the contact page, on the
 * error page and in the form's fallback, and a link added next year should be
 * counted without anyone remembering to wire it up. Capture phase, so a link
 * whose own handler stops propagation is still seen.
 */
export function ContactClicks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      // Where on the page it was, so the footer number and the contact page
      // number can be told apart without sending the number itself.
      const params = {
        link_location: link.closest("footer") ? "footer" : window.location.pathname,
      };
      if (href.startsWith("tel:")) trackEvent("phone_click", params);
      else if (href.startsWith("mailto:")) trackEvent("email_click", params);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
