# ARAK Lighting Solutions

The company site for ARAK Lighting Solutions, Riyadh. Next.js 16 (App Router),
English at the root and Arabic under `/ar`, deployed to Netlify.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # next build
npm run start    # serve the production build locally
npm run lint
```

## Deployment

Netlify, from this repository. Netlify detects Next.js and installs its Next.js
runtime (the OpenNext Netlify adapter) at build time — it is deliberately not a
dependency here, so Netlify can keep it current with each Next.js release.

Build settings live in `netlify.toml` (`next build` → `.next`). The Node version
comes from `.node-version`.

DNS is managed at GoDaddy, which points at Netlify; GoDaddy is the registrar
only.

## Images

Images are the thing most likely to be got wrong here, so the rules are written
down rather than inferred.

**Logos** (`public/clients`, `public/brands`, `public/vendors`) are pre-sized
WebP, served straight from the CDN with `unoptimized`. They are never sent
through `next/image`. There are 84 of them on the home page, and each one that
went through the optimiser would cost an image transformation to save almost
nothing. Regenerate with:

```bash
node scripts/optimise-logos.mjs
```

**Photographs** are capped at 2048px, which is the largest entry in
`images.deviceSizes` in `next.config.ts`. Never store a source wider than the
widest width the site will serve — the extra pixels are fetched and discarded on
every transform. Re-run after adding photos:

```bash
node scripts/optimise-photos.mjs
```

Both scripts back originals up to `_originals/` (gitignored) before touching
anything, and both are safe to re-run.

**`public/_headers`** sets browser caching for these static files. Read the
comment at the top of it before replacing any image: the paths are marked
`immutable`, so a changed picture needs a new filename. Re-compressing an
existing image in place is fine, since it is the same picture.

**Open Graph** card assets are inlined as base64 in `src/lib/og-assets.ts`
rather than read from disk, because serverless bundles only carry the files
Next's output tracing found. Regenerate with `node scripts/build-og-assets.mjs`.

## 404s and errors

This site has two root layouts — one per language route group — which is the
case Next names for `global-not-found.js`, so `experimental.globalNotFound` is
on in `next.config.ts`. The pieces:

- `src/app/global-not-found.tsx` — URLs matching no route at all. It bypasses
  layout rendering, so it carries its own `<html>`, stylesheet and fonts.
- `src/app/(ar)/ar/[...rest]/` — a catch-all that throws `notFound()`, so an
  unmatched `/ar/*` URL is answered in Arabic instead of falling through to
  the English global page.
- `projects/not-found.tsx` and `services/smart-poles/not-found.tsx` in both
  trees — a slug that does not exist.
- `error.tsx` per tree, plus `global-error.tsx` for a fault in a root layout.

All of them render `NotFound` or `ErrorBody`, so the copy is written once.

Security headers are set in `next.config.ts` rather than `public/_headers`,
because that file only covers responses served from the publish directory —
read the comment at the top of it. There is deliberately no
Content-Security-Policy: a useful one needs per-request nonces for the
colour-mode boot script, and therefore middleware on every route.

## Notes

`AGENTS.md` is written and re-added by `next dev`; commit it with your work
rather than stripping it from the diff.
