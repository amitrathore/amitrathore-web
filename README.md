# Amit Rathore — personal site

Static personal essay deployed by the existing GitHub Pages workflow on pushes to `main`.

- `index.html`: essay, reference chronology, bibliography, patents, and Life’s 65 keywords. Life remains the final substantive section.
- `assets/site.css`: responsive editorial design; `assets/site.js`: optional legacy-hash and disclosure navigation.
- `assets/images/portrait.webp`: web derivative of the existing portrait. `personal-card-v2.png`: 1200 × 630 sharing card.
- `tests/life-keywords.json`: original keyword spelling and order. Keywords are currently plain list entries with stable IDs, ready for future content.

## Checks

Serve this directory with `python3 -m http.server 8771`. With Playwright available, run:

```sh
PLAYWRIGHT_CHANNEL=chrome node tests/site.cjs
```

Set `PLAYWRIGHT_MODULE` to an existing Playwright installation if it is not locally installed. `TEST_BASE_URL` overrides the preview URL. Screenshots are written to `/private/tmp`.

## Timeline decisions

- Owner-confirmed: Awake Market began in 2020; Shoptype was spun out in 2024.
- US influencer-commerce patent US12118528B2: granted October 15, 2024; international publication in 2021.
- Authentic-media application US20240356906A1: published October 24, 2024; notice of allowance mailed June 2, 2026. No claim of an issued 2026 patent is made without an identified grant record.
- Early employer dates and older patent/publication entries are retained from the previous personal site. They have not been silently normalized to the condensed AwakeVC biography.
- Prior project copy is retained under “Earlier project notes,” separated from the current essay. The pre-existing removal of Shoptype Capital/Chat links is preserved.
