# Road2Resell — Rebrand / Experience Edition

This is a substantial visual and interaction redesign built on the existing React + Vite application. It is not a replacement backend or a new storefront platform.

## Experience architecture

- Editorial, product-led homepage with a pointer-reactive hero composition.
- Long-form scroll story with a sticky stage and three scroll-progress chapters.
- Device index with eight image-led categories and staggered reveal interactions.
- Dedicated sell, buy, quality, process, quote, FAQ and closing brand chapters.
- Shared brand navigation, mega-menu, responsive mobile navigation and footer.
- Rebuilt category landing-page system for phones, laptops, tablets, gaming consoles, gaming PCs, cameras, drones, smartwatches, headphones and other devices.
- Reduced-motion support and responsive layouts.

## Existing commerce and lead flows

The existing Shop page and its Supabase catalogue, cart, Stripe checkout / verification flow and order handling were intentionally left intact. The Formspree quote endpoint is retained in `QuoteFormSection.tsx`. Existing Google Analytics and Google Tag Manager IDs are retained.

## Images and typography

The new art direction uses high-resolution Pexels photography served from Pexels' image CDN. The URLs request large responsive renditions (typically 1400–2400px wide) and load lazily below the fold. These are live CDN references, not bundled image binaries; an internet connection is required to display them. Pexels identifies the selected source photographs as free-to-use on their photo pages. The Pexels licence permits free use; see https://www.pexels.com/license/.

Typography uses Google Fonts (Manrope, DM Sans and DM Mono) with system fallbacks. The site remains usable if font loading fails.

## Setup

1. Extract the ZIP.
2. Open a terminal in the folder containing `package.json`.
3. Copy `.env.example` to `.env` and add the existing public Supabase project URL and anon key used by the current storefront.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Verify the Shop product feed, cart, Stripe checkout and order-confirmation flow, then submit a test quote through Formspree.
6. Run `npm run build` before deploying to Vercel.

Never place a Supabase service-role key or Stripe secret key in Vite client environment variables.

## Design and UX research references

The design work was informed by ecommerce UX research and product-led storytelling references, not by copying a template:

- Baymard's Apple ecommerce UX benchmark covers 29 desktop and 26 mobile page types, including navigation, product listing, product detail, cart and checkout. https://baymard.com/ux-benchmark/case-studies/apple
- Baymard's product-page research emphasizes that product detail pages are high-impact decision points and that imagery, condition clarity, filtering and supporting information matter to conversion. https://baymard.com/ecommerce-design-examples/41-product-page
- Pexels licence and media source pages are documented above.

## Important validation note

The execution environment used to prepare this archive could not complete a clean npm dependency installation, so a production Vite build was not available for verification here. Run `npm install` and `npm run build` locally before deployment. The original source ZIP included the existing lockfile; no backend secrets are packaged in this archive.

### Pexels image references used in the experience

- Hero electronics flat lay — https://www.pexels.com/photo/black-gadgets-on-a-black-surface-3981749/
- Smartphone studio close-up — https://www.pexels.com/photo/sleek-modern-smartphone-with-stylus-on-black-background-36324071/
- Smartphone on dark surface — https://www.pexels.com/photo/black-iphone-on-black-surface-6278761/
- Laptop on clean surface — https://www.pexels.com/photo/photo-of-laptop-on-white-surface-6968093/
- MacBook Pro workspace — https://www.pexels.com/photo/macbook-pro-102061/
- Xbox console — https://www.pexels.com/photo/close-up-shot-of-a-game-console-10997627/
- Gaming console and controller — https://www.pexels.com/photo/xbox-and-controller-16776031/
- Headphones — https://www.pexels.com/photo/close-up-of-headphones-18743222/
- Drone in flight — https://www.pexels.com/photo/photo-of-a-flying-drone-20339624/
- DSLR camera — https://www.pexels.com/photo/close-up-shot-of-a-dslr-camera-4243662/
- Smartwatch — https://www.pexels.com/photo/close-up-of-huawei-smartwatch-on-wrist-32977237/
- Tablet and smartphone — https://www.pexels.com/photo/a-tablet-and-a-smartphone-on-a-wooden-table-10535365/
