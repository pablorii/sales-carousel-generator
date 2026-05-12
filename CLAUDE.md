# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Running the app

No build step — open `index.html` directly in a browser, or serve it with any static file server:

```
npx serve .
# or
python -m http.server 8080
```

The app calls the Anthropic API directly from the browser using `anthropic-dangerous-allow-browser: true`. Users must provide their own API key (stored in `localStorage` under the key `scg_api_key`).

## Architecture

Three files, no framework, no dependencies:

- **`index.html`** — layout: left panel (form inputs), right panel (carousel preview + export actions).
- **`style.css`** — all styles. Uses CSS custom properties (`:root` vars) for the dark theme. Carousel slide themes are data-attribute-driven (`data-theme="hook|problem|solution|feature|proof|cta|default"`), each with its own gradient.
- **`script.js`** — all logic. Key sections:
  - `generate()` — reads form, calls Claude API (`claude-sonnet-4-6`), parses JSON response.
  - `buildPrompt()` — constructs the prompt; Claude must return a bare JSON array of slide objects (no markdown fences).
  - `parseSlides()` — tolerant JSON parser that strips code fences and falls back to regex extraction.
  - `renderCarousel()` — builds the interactive preview in-page.
  - `buildExportHTML()` — produces a fully self-contained single-file HTML export (all CSS + JS inlined).

## Slide data model

Each slide object returned by Claude:

```js
{
  theme: "hook" | "problem" | "solution" | "feature" | "proof" | "cta" | "default",
  tag: string,          // short label shown above headline
  headline: string,     // may contain <em> for accent colour
  body: string | null,  // paragraph copy (mutually exclusive with bullets)
  bullets: string[] | null,
  cta: string | null    // button label, only on last slide
}
```

## Key constraint

The Claude API call includes the non-standard header `anthropic-dangerous-allow-browser: true`, which is required for direct browser-to-API calls. Without it Anthropic's API rejects the request. Keep this header whenever the fetch call is made from a browser context.
