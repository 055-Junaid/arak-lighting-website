"use client";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import { ContactClicks } from "@/components/ContactClicks";

/**
 * The GA4 tag and click tracking, everywhere except the private team
 * workspace: staff visits would inflate the numbers, and draft titles must not
 * leave the site. The disable flag also covers a staff member who arrives at
 * /team by a client-side link after the tag has loaded on a public page.
 */
export function SiteAnalytics() {
  const team = usePathname().startsWith("/team");
  useLayoutEffect(() => { (window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`] = team; }, [team]);
  if (!GA_MEASUREMENT_ID || team) return null;
  return <><ContactClicks /><GoogleAnalytics gaId={GA_MEASUREMENT_ID} /></>;
}
