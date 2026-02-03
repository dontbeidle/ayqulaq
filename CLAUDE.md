# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ayqulaq is a static website for children's fairy tales and stories in Qaraqalpaq language, built with Jekyll 4.3. The site is hosted at ayqulaq.uz via GitHub Pages.

## Build Commands

```bash
bundle install                  # Install dependencies
bundle exec jekyll serve        # Dev server at localhost:4000
bundle exec jekyll build        # Production build to _site/
```

## Architecture

### Layout Hierarchy

`default.html` is the base layout (includes head, header, main content, footer, and animations.js). `home.html` and `tale.html` extend it. All tales in `_tales/` automatically use the `tale` layout via `_config.yml` defaults.

### Translation System

All UI text is centralized in `_data/translations.json` (Qaraqalpaq language). Templates access it via `site.data.translations`. Never hardcode UI strings in templates — always add keys to translations.json.

Top-level keys: `site`, `nav`, `hero`, `home`, `tales`, `tale`, `about`, `footer`, `legal`, `meta`.

### Tales Collection

Tales are markdown files in `_tales/` with URLs generated as `/tales/:title/`. Front matter fields:

- `title` (required), `author` (optional, has a default), `subtitle`, `icon` (HTML entity)
- `category` — used for filtering on the tales listing page
- `reading_time`, `age_range` — displayed on cards and tale pages
- `featured: true` — shows on homepage (first 3 featured tales displayed)
- `moral` — displayed in a styled aside box at the end
- `image` — optional hero image; falls back to a colored circle with the icon

### Animation System

Scroll-triggered animations use `data-animate` attribute on elements. `assets/js/animations.js` uses Intersection Observer to add `.is-visible` class on scroll. Continuous CSS animations (twinkle, float, moonGlow) are defined in `_sass/_animations.scss`. The JS file also handles: card hover effects, category filtering, smooth scroll, reading progress bar (tale pages only), mobile nav toggle, and `prefers-reduced-motion` support.

### Styling

- SCSS variables in `_sass/_variables.scss` — warm cream/brown/gold color palette
- Fonts: Noto Serif (headings), Noto Sans (body) via Google Fonts
- Entry point: `assets/css/main.scss` imports all partials
- SCSS partials map to UI sections: `_header`, `_hero`, `_cards`, `_tale`, `_footer`, `_pages`
- Responsive breakpoints: 768px (tablet), 480px (mobile)

### SVG Animals

Hero section includes animated SVG animals in `_includes/animals/` (currently bear.svg). These use SVG gradients, filters, and CSS keyframe animations for entrance and idle effects.
