# Road2Resell 5.0 — Expanded Site Edition

This update expands the Road2Resell site into a larger, more useful destination with deeper category pages, dedicated smartphone brand pages and practical customer guides.

## New routes

### Smartphone brand destinations
- `/phones/iphone`
- `/phones/samsung`
- `/phones/google-pixel`
- `/phones/motorola`

Each brand destination includes device-family coverage, a model/condition checklist, brand-specific assessment considerations, FAQs, cross-links and the existing quote form.

### Company and process pages
- `/how-it-works`
- `/about`
- `/contact`

### Customer guides
- `/guides/phone-selling-checklist`
- `/guides/device-data-and-privacy`
- `/guides/device-condition-guide`

### Expanded category pages
All device category pages now include a deeper device-preparation guide and an expanded FAQ section. The phone category also has a dedicated brand directory.

## Run locally

1. Extract this ZIP. `package.json` is in the extracted root.
2. Copy `.env.example` to `.env` and add the existing public frontend Supabase URL and anon key used by your project.
3. Run:

```bash
npm install
npm run dev
```

4. Before deployment, run `npm run build`.

## Existing commerce integrations

The existing Shop, Supabase product catalogue, POS sync assumptions, Stripe checkout/order verification, Formspree quote form and analytics configuration have been retained. This update adds content routes and navigation; it does not replace the commerce backend.

## Important

- Never put Supabase service-role keys or Stripe secret keys in frontend `.env` values.
- Product photographs are remotely loaded from Pexels image URLs. A network connection is required for these images to appear.
- Brand/model examples are illustrative coverage guides, not a promise that every model is accepted. Device review remains subject to confirmation.
