"use client";

import { useEffect, type RefObject } from "react";

/**
 * Everything that can hold focus, minus the things that currently cannot:
 * disabled controls, and anything a parent has marked `inert` or hidden.
 * `[tabindex="-1"]` is deliberately excluded — those are focus *targets*, like
 * the `<main>` the skip link points at, not tab stops.
 */
const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function focusableWithin(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) =>
      !el.hasAttribute("inert") &&
      !el.closest("[inert]") &&
      el.offsetWidth + el.offsetHeight > 0
  );
}

/**
 * Holds keyboard focus inside `container` while `active`, and puts it back
 * where it came from on close.
 *
 * Both overlays on this site — the header's mobile drawer and the project
 * gallery's lightbox — used to let Tab walk straight out into the page behind
 * them. In the lightbox's case that page was covered by an opaque backdrop, so
 * a keyboard user was tabbing through controls they could not see; and the
 * lightbox announced `aria-modal="true"`, which promises exactly the
 * containment it did not have.
 *
 * Restoring focus matters as much as trapping it. Closing either overlay used
 * to drop the caret at the top of the document, so a visitor who opened the
 * ninth photograph of a gallery had to tab back through the whole page to
 * reach the tenth.
 */
export function useFocusTrap(
  container: RefObject<HTMLElement | null>,
  active: boolean,
  /**
   * Where to send focus on close. Defaults to whatever had it when the trap
   * opened, which is nearly always the control that opened the overlay.
   */
  returnTo?: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!active) return;
    const root = container.current;
    if (!root) return;

    const previous = document.activeElement as HTMLElement | null;
    // Read now, not in the cleanup: by then the ref may have moved on, and the
    // element we want is the one that was current when the overlay opened.
    const returnTarget = returnTo?.current ?? previous;

    // Focus the first thing inside, unless the overlay has already placed
    // focus itself (the lightbox autofocuses its close button).
    if (!root.contains(document.activeElement)) {
      const first = focusableWithin(root)[0];
      (first ?? root).focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusableWithin(root);
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement as HTMLElement | null;

      // Wrap at both ends, and pull focus back in if it has escaped — which
      // it can, if the browser moved it to the address bar and back.
      if (event.shiftKey && (current === first || !root.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !root.contains(current))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      // Only if it is still in the document — the trigger may have unmounted.
      if (returnTarget?.isConnected) returnTarget.focus();
    };
  }, [active, container, returnTo]);
}
