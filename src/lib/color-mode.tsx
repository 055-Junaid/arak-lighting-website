"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Site-wide colour switch. The whole site rests in black and white — the
 * lighting is "off" — and this flips every photograph, logo and map back to
 * full colour, the way a lighting company turns a room on.
 *
 * The state lives on <html data-color="on|off"> so a single global rule in
 * globals.css can override every per-component grayscale filter at once,
 * without each component having to subscribe to anything. This module is the
 * external store React reads that DOM state from, which is also what lets a
 * saved choice hydrate cleanly: the server always renders "off", and React
 * swaps to the stored value right after hydration.
 */

export const COLOR_MODE_STORAGE_KEY = "arak-color";
/** Remembers whether the visitor has ever worked the switch, so the nudge
 *  animation runs for first-timers only and never nags a returning one. */
export const COLOR_MODE_SEEN_KEY = "arak-color-seen";

/**
 * Runs before first paint (injected in the root layout) so a returning
 * visitor who left the lights on never sees a flash of grayscale.
 */
export const COLOR_MODE_BOOT_SCRIPT = `(function(){try{if(localStorage.getItem("${COLOR_MODE_STORAGE_KEY}")==="on"){document.documentElement.setAttribute("data-color","on")}}catch(e){}})()`;

const listeners = new Set<() => void>();

function read(key: string, match: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(key) === match;
  } catch {
    // Private browsing or blocked storage — fall back to the defaults.
    return false;
  }
}

let colorOn = read(COLOR_MODE_STORAGE_KEY, "on");
let seen = read(COLOR_MODE_SEEN_KEY, "1");

/**
 * useSyncExternalStore needs a snapshot that is stable by identity between
 * reads, so both flags are packed into one string rather than an object.
 */
let snapshot = `${colorOn ? "on" : "off"}|${seen ? "seen" : "new"}`;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const getSnapshot = () => snapshot;
// Lights off and no nudge on the server: the nudge starts a beat after
// hydration, once we know whether this visitor has met the switch before.
const getServerSnapshot = () => "off|seen";

function setColor(next: boolean) {
  colorOn = next;
  seen = true;
  snapshot = `${colorOn ? "on" : "off"}|seen`;
  document.documentElement.setAttribute("data-color", next ? "on" : "off");
  try {
    localStorage.setItem(COLOR_MODE_STORAGE_KEY, next ? "on" : "off");
    localStorage.setItem(COLOR_MODE_SEEN_KEY, "1");
  } catch {
    // Non-fatal: the switch still works for this session.
  }
  listeners.forEach((listener) => listener());
}

export function useColorMode() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const color = state.startsWith("on");
  const toggleColor = useCallback(() => setColor(!colorOn), []);
  return {
    color,
    toggleColor,
    /** True only while the lights are off and the visitor has never touched
     *  the switch — drives the attention pulse. */
    nudge: !color && state.endsWith("new"),
  };
}
