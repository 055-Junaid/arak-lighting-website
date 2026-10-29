# ARAK blog publishing

This branch contains a working local blog and an employee publishing workspace.
Development is on the `feature/internal-blogs` branch. Production launch requires
separate approval and the shared storage/company sign-in integration described below.

## What visitors see

- `/blogs`: a featured story, article grid, search, and category filters.
- `/blogs/<slug>`: cover, title, introduction, author, date, reading time, and article.
- `/ar/blogs` and `/ar/blogs/<slug>`: Arabic pages with right-to-left layout.
- Blog links in the website header and footer, in both languages.

An article belongs to its selected language. English articles are not automatically
translated into Arabic. Switching language from an article opens the other
language's listing, avoiding a link to a translation that does not exist.

The three design examples appear only in development. They are labeled as samples
and excluded from the sitemap. Production has an honest empty state until a
production content provider is connected.

## Employee workflow

1. Sign in at `/team/login` using an explicitly approved account.
2. Open **Create a blog** in `/team/blogs`.
3. Write directly on the canvas: title, short introduction, and article.
4. Use **Add cover photo** above the title to choose the main image and its description.
   Use **Post settings** for the category, language, URL, and publishing details.
5. Use **Preview** to check the actual article layout, including unsaved edits.
   It opens at the beginning; **Back to editor** returns to your writing position.
6. **Save draft** keeps the article private. **Publish article** makes it public.
7. Published articles can be edited with **Save changes**, or removed from the
   public website with **Move to draft**.

Approved members publish directly. There is no approval queue or public sign-up.
The visual editor supports paragraphs, headings, bold/italic text, links, bullet lists, pull quotes,
tables, and inline images. Select text for the formatting toolbar. The **+** follows the cursor on an empty
article line and expands into a row of block tools. The article uses a reading layout with automatic contents navigation. White is
the default; a Light/Dark control remembers each visitor's preference.
Formatting is visible while writing. Font sizes and colours follow the article design,
so employees do not need to style each post. Undo/redo and normal editing shortcuts work.
Drafts save explicitly with **Save draft** or Cmd/Ctrl+S; the header shows unsaved changes.
Publishing opens a final details check. It is not a Word or PDF importer.

## Run locally and add employees

From the `site-controls` checkout:

```sh
npm run dev -- --hostname 127.0.0.1 --port 3010
node scripts/blog-team.mjs add employee@company.com "Employee Name"
```

The account command prompts for a local password of 12–256 characters. Password
input is hidden. Do not reuse a real company password for development. Refresh
`/team/login` after adding the first member.

```sh
node scripts/blog-team.mjs list
node scripts/blog-team.mjs remove employee@company.com
```

Adding an existing email resets that account's password and revokes previous
sessions. Removing an account revokes its sessions on the next request. Members
can edit all articles; new articles take the signed-in member's name as author.

## Local storage and access

All runtime state is under the ignored `.blog-data/` folder:

- `posts.json`: drafts and published articles.
- `media/`: uploaded covers, decoded and re-encoded as WebP with a 2048 px limit.
- `team.json`: staff email/name, salted scrypt password hashes, and a signing key.

Keep this directory private. It is not a public folder and is not committed.
Back it up if you use the local workspace for real drafts. Copying the Git branch
alone does not copy its content or accounts.

Every content mutation checks the current member on the server. Sessions are
HTTP-only, same-site cookies, signed and valid for eight hours. Next Server Actions
provide the same-origin check for writes. Upload and post validations run on the
server. A draft article returns 404 publicly; its cover and inline images are available only
to authenticated members until they are used by a published article. Media responses
are not cached. Private routes are noindex and excluded from the sitemap.

Atomic file replacement and an exclusive writer lock protect local writes. A stale
editor cannot overwrite a newer save. If the server is forcibly stopped while
saving and reports a stale lock, stop the server, remove `.blog-data/write.lock`,
and restart it. Simultaneous CLI account changes are not supported.

The local server binds to this computer only. Local accounts, sample articles,
and local content storage are disabled when `NODE_ENV` is `production`.
This is intentional: this website deploys to Netlify, whose function filesystem
must not be used as a shared blog database. A production build is a deployment
check, not a way to preview the local CMS; use `npm run dev` for that.

## Verification

`npm run build` checks the full website. With the development server running,
`node scripts/check-blog-access.mjs http://127.0.0.1:3010` checks public routes,
private routes, draft and upload visibility, and signed/expired/tampered sessions.
The integration check is read-only and restricted to localhost.

## What is needed before going live

Keep this public design and employee workflow, and replace the local adapters in
`src/lib/blog/storage.ts`, `auth.ts`, and the upload handling in `actions.ts`:

1. Connect the company's chosen identity provider, using its existing Google or
   Microsoft accounts if available. Grant publishing only to an explicit employee
   allowlist or group; an email domain alone should not grant access.
2. Store articles in a shared database or managed CMS, and covers in object storage.
   Preserve public/draft access checks and media visibility when moving to draft.
3. Use the identity provider's session, account recovery, access revocation, and
   rate limiting. Add an audit trail and content backups for shared team use.
4. Migrate approved real content, verify permissions in a deployment preview, and
   test publishing without redeploying the website.

Those choices need the company's identity/hosting setup. No external service,
subscription, company account, or live infrastructure was created for this work.

A concrete proposed backend and administrator/publisher access model is recorded
in [the live storage and access plan](blog-production-plan.md). That document is a
proposal; the local version has not been connected to a hosted service.

## Article formatting

- Write normal paragraphs directly; press Enter for a new paragraph.
- Select text to reveal a floating toolbar with **Bold**, **Italic**, **Link**,
  **Heading**, **Subheading**, and **Quote**. Active formatting stays highlighted.
- On an empty article line, select the **+** beside the cursor to add images,
  headings/subheadings, lists, quotes, or a table. **Alt+Enter** opens these tools
  from the keyboard; from a line of text, it creates a new block below. Escape
  closes the tools and returns to writing.
- Headings automatically create the public article contents navigation.
- Tables have editable cells and contextual row/column controls (2–8 columns).
- Images require a description, which is also displayed as the public caption.
  Images inserted while working in a table/list are placed after that block.
- The cover photo stays visible above the title in the editor, with **Change cover photo**
  to replace it. It is separate from images inserted into the article body.
- Image, cover, link, and leave-confirmation dialogs are centred in the viewport.
  Post settings and publishing details use a right-side panel.
- Uploaded draft images remain private until used by a published post.
- Font-family, colour, arbitrary font sizing, embeds, and code tools are omitted.

New edits use a versioned structured document string in `body`; existing Markdown
posts open in the visual editor and convert on the next text edit. The renderer
accepts only supported text marks and local images. Raw HTML is never rendered.
Links accept only HTTP(S), email links, and local paths/anchors.

The private preview renders the same article design as the public page. Articles
without section headings use a centred reading column; articles with headings
include the contents navigation. Inline images retain their natural proportions. Desktop
readers get a sticky contents column; phone readers get a collapsible contents
list. The public content-map button opens the complete section list with keyboard
support. Navigation, footer, and the logo follow the selected blog appearance on public blog pages.
The Light/Dark appearance control is separate from the existing Lights on/off
photography colour switch; it does not change image saturation.

Parser and media-reference checks:
`node --test scripts/blog-content.test.mjs`. This includes old-post conversion,
rich-document save/reopen, link safety, and media-reference checks.
