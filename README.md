# Sanity + Next.js portfolio/blog scaffold

A minimal, forkable scaffold for portfolio/blog sites: Next.js (App Router) + an
embedded Sanity Studio, built around a page builder. Every page is assembled
from a small set of modules; styling is intentionally bare (black & white)
so a fork can layer on its own design system.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Sanity** (embedded Studio at `/studio`, Presentation tool for visual editing)
- **Tailwind CSS 4**
- **pnpm**

## Modules

`page` documents are built from an array of modules, rendered by
`components/modules/PageBuilder.tsx`:

- **Stage / Hero** — background image or video, headline, text, optional CTA
- **Text** — Portable Text, narrow/wide width
- **Text / Media** — image or video paired with text, left/right layout
- **Accordion** — expandable Q&A / title-content items
- **Item Grid** — repeatable cards (image, title, text, link), 2/3/4 columns
- **Media** — a single image or video, with an optional caption underneath
- **CTA** — heading, text, and a button, with an optional dark background

Add a new module by: adding a schema in `sanity/schemaTypes/objects/`,
registering it in `sanity/schemaTypes/index.ts` and the `page` document's
`modules` array, adding its shape to `sanity/lib/types.ts` and the
`moduleFields` GROQ projection in `sanity/lib/queries.ts`, writing a renderer
in `components/modules/`, and wiring it into `PageBuilder.tsx`.

## Setup

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Create a Sanity project** (this scaffold ships project-agnostic — no
   project is provisioned yet)

   ```bash
   pnpm dlx sanity@latest init
   ```

   Note the project ID and dataset name it gives you.

3. **Environment variables** — copy `.env.example` to `.env.local` and fill in:

   ```bash
   cp .env.example .env.local
   ```

   - `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` — from step 2
   - `SANITY_API_READ_TOKEN` — a token with **Viewer** access, created at
     [sanity.io/manage](https://www.sanity.io/manage) under your project's API
     settings. Used for draft mode and the Live Content API.

4. **Run it**

   ```bash
   pnpm dev
   ```

   - Site: [http://localhost:3000](http://localhost:3000)
   - Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

5. Create a `siteSettings` document (title, nav, footer) and at least one
   `page` document. A page with slug `index` (or an empty slug) is served at
   `/`; any other slug is served at `/<slug>`.

## Preview / Visual editing

Draft Mode + Sanity's Presentation tool are wired up out of the box:

- `/api/draft-mode/enable` enables Draft Mode (used by the Presentation tool's
  preview iframe)
- `/api/draft-mode/disable` disables it
- Content updates stream live via Sanity's **Live Content API**
  (`sanity/lib/live.ts`) — no revalidation webhook is required.

Open the Presentation tool from the Studio sidebar to click-to-edit content
in context.

## Deployment

The app has no platform-specific code — it deploys to any host that runs a
Node.js Next.js server (Vercel, Netlify, Cloudflare, a VPS, etc.). Set the
same environment variables from `.env.local` on your host.

## Project structure

```
app/
  (site)/[[...slug]]/page.tsx   catch-all page, resolves by slug
  (site)/layout.tsx             header + footer + live/preview wiring
  studio/[[...tool]]/           embedded Sanity Studio
  api/draft-mode/               preview enable/disable routes
sanity/
  schemaTypes/documents/        page, siteSettings
  schemaTypes/objects/          modules, link, seo, blockContent
  lib/                          client, live query, image, queries, types
components/
  modules/                      one renderer per module + PageBuilder
  layout/                       Header, Footer
  ui/                           CmsLink, SanityImage, PortableTextContent
```
