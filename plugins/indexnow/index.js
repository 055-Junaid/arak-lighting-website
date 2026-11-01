/**
 * IndexNow: tell Bing (and Yandex, Seznam, Naver) the site changed, the
 * minute a production deploy goes live.
 *
 * WHY BING MATTERS HERE
 * ---------------------
 * ChatGPT's search reads Bing's index, not Google's, and ChatGPT already sends
 * arak-sa.com about one visit for every four Google sends. Bing otherwise
 * finds changes on its own schedule, which on a site this small can be weeks.
 * Google does not take part in IndexNow; Search Console is still how Google
 * is asked.
 *
 * WHAT IT SENDS
 * -------------
 * Every URL in the LIVE sitemap, read after the deploy rather than built from
 * the source, so the list is exactly what visitors can now reach. 88 URLs, a
 * few deploys a month: well inside what IndexNow expects.
 *
 * It never fails a deploy. The site is already live by the time this runs,
 * and a refused ping is worth a line in the deploy log, not a red build.
 *
 * The key is public by design: IndexNow proves ownership by fetching
 * public/<key>.txt from the site and comparing the two.
 */
const KEY = "a8b1d3fcca2ca85eb23ffdad0b41cdb2";
const SITE = "https://arak-sa.com";

module.exports = {
  async onSuccess({ utils }) {
    // Deploy previews and branch deploys are not the site.
    if (process.env.CONTEXT !== "production") return;

    try {
      const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
      const urlList = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()))];
      if (!urlList.length) {
        utils.status.show({ title: "IndexNow skipped", summary: "The live sitemap listed no URLs." });
        return;
      }
      const res = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          host: new URL(SITE).host,
          key: KEY,
          keyLocation: `${SITE}/${KEY}.txt`,
          urlList,
        }),
      });
      // 200 and 202 both mean accepted; 202 is "key not verified yet", which
      // is what the very first submission after adding the key file returns.
      utils.status.show({
        title: res.ok ? "IndexNow sent" : "IndexNow refused",
        summary: `${urlList.length} URLs, HTTP ${res.status}`,
      });
    } catch (err) {
      utils.status.show({ title: "IndexNow failed", summary: String(err && err.message ? err.message : err) });
    }
  },
};
