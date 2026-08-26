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

## Notes

`AGENTS.md` is written and re-added by `next dev`; commit it with your work
rather than stripping it from the diff.
