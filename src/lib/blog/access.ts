import "server-only";

// The repository is public, so employee emails live in BLOG_TEAM_EMAILS rather
// than in source. An unset or empty value approves nobody.
function approvedPublishers() {
  return new Set((process.env.BLOG_TEAM_EMAILS || "").split(",").map(email => email.trim().toLowerCase()).filter(Boolean));
}

export function isApprovedPublisher(email: string) {
  return approvedPublishers().has(email.trim().toLowerCase());
}
