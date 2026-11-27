# Saffron & Linen Catering

An editorial food-magazine website ("The Menu Issue") for **Saffron & Linen Catering**, a London event and corporate caterer cooking from a railway-arch kitchen in Bermondsey SE1. Built with Next.js static export, Tailwind CSS v4, self-hosted variable fonts and bespoke inline SVG editorial artwork.

All business details, menus and suppliers in this gallery template are fictitious sample data. Replace them with your own details before publishing.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Cover hero, seasonal contents list, four quick questions, dietary legend, delivery preview, quote process, editor's letter and `FoodEstablishment` JSON-LD |
| `/menus/` | Interactive menu finder (guests, dietary marks, delivery zone, service style), printed comparison spread and alternating magazine menu spreads |
| `/delivery/` | Postcode district look-up, London zone ring map, zone tariff table, service windows (`06:30–23:30`) and venue access checklist |
| `/kitchen/` | Feature story, supplier credits, allergen & labelling protocol, and staffing/linen hire note |
| `/contact/` | Hosted Jamstacks support form when configured, visible email & phone, office hours with live `Europe/London` open badge, and enquiry checklist |
| `/404.html` | Themed "Missing from the table" static error page |

## Make it yours (file ownership & frequent edits)

| File | Owns |
| --- | --- |
| `content/menus.ts` | Menus, indicative prices (`pricePerHeadPence`), min/max guests, lead times, `available` flag, `availabilityNote` and dishes with dietary IDs |
| `content/zones.ts` | Delivery zones, explicit postcode districts (Zones 1–2), area prefixes (Zones 3–4), delivery fees (`deliveryFeePence`), guest minimums and extra notice days |
| `content/dietary.ts` | The five printed dietary roundel codes (`V`, `VE`, `GF`, `DF`, `NM`) and legend notes |
| `content/business.ts` | Business name, masthead wordmark, home issue line (`issueLine`), email, phone, Bermondsey location text, office hours, allergen statement and enquiry checklist |
| `app/page.tsx`, `app/<route>/page.tsx` | Page-specific headings, standfirsts, prose and calls to action |
| `site.config.json` | Public site name, meta description, domain, `timeZone` (`Europe/London`) and Jamstacks form integration |
| `app/tailwind.input.css` | Light ("morning press") and dark ("after service") tokens, linen textures and editorial typography |
| `lib/structured-data.ts` | `FoodEstablishment` JSON-LD derived from `content/` |
| `app/sitemap.ts` | Public static routes |

### Most frequent owner edits

- **Update a menu price or availability**: edit `pricePerHeadPence` (integer GBP pence, e.g. `1950` for £19.50) or `available` / `availabilityNote` in `content/menus.ts`, then run `npm run check`. Home contents, the `/menus/` comparison spread, menu spreads and JSON-LD update automatically.
- **Change the seasonal issue line**: edit `business.issueLine` in `content/business.ts`.
- **Update delivery zones or fees**: edit `districts` or `deliveryFeePence` in `content/zones.ts`.
- **Edit page copy**: edit JSX children directly in `app/page.tsx`, `app/menus/page.tsx`, `app/delivery/page.tsx`, `app/kitchen/page.tsx` or `app/contact/page.tsx`.

## Typography and licences

- **Ibarra Real Nova** (`@fontsource-variable/ibarra-real-nova`, SIL Open Font License 1.1) — roman and italic variable serif for headlines, masthead, drop caps and oversized numerals.
- **Sofia Sans** (`@fontsource-variable/sofia-sans`, SIL Open Font License 1.1) — variable sans-serif for body copy, tracked uppercase kickers, folios and tabular price figures.

## Local preview and checks

Requires Node 24 or later and npm.

```sh
npm ci
npm run dev      # local development server
npm run check    # unit tests, Next typegen + tsc, and static export build
npm start        # serve the static export in out/
```

Project-path export verification:

```sh
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

## Public configuration & Contact contract

`site.config.json` holds public configuration only (`name`, `description`, `domain`, `timeZone`, `jamstacks.siteId`, `jamstacks.cdnUrl`). Never place secrets or credentials there.

On `/contact/`, when `JAMSTACKS_SITE` (or `site.config.json`'s `jamstacks.siteId`) is set, the page renders one `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap. Without a site ID, no embed script loads and the direct email fallback is shown. Email (`hello@saffronandlinen.example`) and phone remain visible in both states, and navigation to and from `/contact/` uses full-document loads via `SiteLink`.

## Publishing assets

`jamstacks/` contains gallery-only metadata and screenshots and can be deleted in customer repositories without affecting builds, tests or GitHub Pages deployments. After a fresh normal build, gallery screenshots are verified separately with:

```sh
node --test jamstacks/config.test.mjs
```
