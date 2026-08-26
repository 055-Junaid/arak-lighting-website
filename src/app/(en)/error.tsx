"use client";

import { useEffect } from "react";
import { ErrorBody } from "@/components/ErrorBody";

/**
 * Error boundary for the English tree. Renders inside this group's root
 * layout, so the header and footer survive a fault in the page below them.
 */
export default function EnglishError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // The digest is the only handle on the server-side stack, which is not
    // sent to the browser. Logging it here is what makes a report actionable.
    console.error("Unhandled error", error.digest ?? error);
  }, [error]);

  return <ErrorBody lang="en" reset={reset} />;
}
