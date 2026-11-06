# NEXPLAY — ENJOY LIVE

Production-ready mobile gaming, livestream and entertainment frontend built with Next.js 15, React 19 and TypeScript.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- GSAP
- Lucide Icons
- CSS variables, glass morphism and GPU-accelerated animation

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production validation:

```bash
npm run lint
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env.local`, then set the real destinations:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_REGISTER_URL`
- `NEXT_PUBLIC_LINE_OA_URL`
- `NEXT_PUBLIC_CLAIM_PROMO_URL`
- `NEXT_PUBLIC_SUPPORT_URL`
- `NEXT_PUBLIC_FACEBOOK_URL`
- `NEXT_PUBLIC_INSTAGRAM_URL`

When an external URL is not configured, the related control is safely disabled instead of navigating to `#`.

The promotion cards already use each streamer's `NEXT_PUBLIC_*_CLAIM_PROMO_URL`.
An external destination is opened only after the visitor presses the CTA, so
adding these links does not add a network request or meaningful weight to the
initial landing-page load.

`NEXT_PUBLIC_*` values are compiled into the client build. To change a public
link after deployment, edit the corresponding Cloudflare build variable and
redeploy. If link changes need to go live without a rebuild, move the streamer
configuration to a runtime store such as Cloudflare KV or D1 in a later backend
phase.

## Routes

- `/` — premium animated homepage
- `/promotions` — all promotions
- `/follow` — LINE, livestream schedule and follow benefits
- `/holden` — Holden white/blue landing page
- `/holden/promotions` and `/holden/follow`
- `/lily` — Lily white/red landing page
- `/lily/promotions` and `/lily/follow`

## Multi-streamer setup

All streamer pages reuse the same components and promotion functionality.
Streamer-specific names, colors, images, follower labels and links live in
`data/streamers.ts`. Permanent visual assets live under
`public/streamers/<slug>/`.

To add another streamer:

1. Add a new `StreamerConfig` entry in `data/streamers.ts`.
2. Add the slug to `STREAMER_SLUGS`.
3. Add `hero.webp` and `avatar.webp` under `public/streamers/<slug>/`.
4. Add that streamer's public URL variables to `.env.example` and `.env.local`.

Only one development server and one shared codebase are required.

## Project structure

```text
app/                    Next.js routes, metadata and global design system
components/             app shell, homepage and secondary experiences
data/promotions.ts      promotion content
data/streamers.ts       per-streamer theme, content and link configuration
lib/links.ts            environment-backed business links
public/images/          permanent local visual assets
public/streamers/       streamer-specific hero and avatar assets
public/og-v2.png        social sharing card for the redesigned product
```

## Motion and accessibility

- GSAP drives the hero entrance, parallax and floating artwork.
- Framer Motion drives interactive cards, route content and modal transitions.
- Touch targets, focus states, semantic labels and reduced-motion preferences are supported.

## Deploy

Cloudflare Workers with the OpenNext adapter is the recommended target for this
Next.js application because it preserves the option to add authentication and
backend routes later.

1. Add the official `@opennextjs/cloudflare` adapter and Wrangler.
2. Configure the Worker and run its Cloudflare preview.
3. Add all required public link values as Cloudflare build variables.
4. Deploy first to a `workers.dev` preview URL.
5. Attach the production domain or subdomain only after the real links,
   backend contract and compliance checks are complete.
