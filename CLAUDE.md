# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ayqulaq is a static website for children's fairy tales and stories, built with Ruby and Jekyll. The name means "moon" — a gentle light guiding children through the night. The design follows a minimalist aesthetic with elegant animations.

## Build Commands

```bash
# Install dependencies
bundle install

# Run local development server
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

## Architecture

### Directory Structure
- `_tales/` - Markdown files for fairy tales (uses custom collection)
- `_layouts/` - Page templates: `default.html`, `home.html`, `tale.html`
- `_includes/` - Reusable components: header, footer, tale-card, animals/
- `_sass/` - SCSS partials organized by component
- `_data/` - Data files including translations
- `assets/` - CSS entry point and JavaScript

### Translation System

All website UI text is stored in `_data/translations.json` for easy localization. To translate:

1. Copy `_data/translations.json` to a new file (e.g., `translations_fr.json`)
2. Translate all string values
3. Update templates to use the new file or implement language switching

Access translations in templates via `site.data.translations`:
```liquid
{{ site.data.translations.nav.home }}
{{ site.data.translations.hero.title_line1 }}
```

Translation structure:
- `site` - Site-wide metadata (title, description, tagline)
- `nav` - Navigation links
- `hero` - Homepage hero section
- `home` - Homepage sections
- `tales` - Tales listing page
- `tale` - Individual tale page
- `about` - About page content
- `footer` - Footer text
- `meta` - Default values

### Creating New Tales

Add a markdown file to `_tales/` with this front matter:

```yaml
---
title: "Tale Title"
subtitle: "Optional subtitle"
icon: "&#9733;"  # HTML entity for decorative icon
category: "Friendship"
reading_time: "5 min read"
age_range: "4-8"
featured: true  # Shows on homepage
moral: "The lesson of the story"
---
```

### SVG Animals

Hero section includes animated SVG animals in `_includes/animals/`. Each uses gradients, filters, and proper layering for a polished look.

### Styling

- SCSS variables in `_sass/_variables.scss` control colors, typography, spacing
- Animations defined in `_sass/_animations.scss`
- Main CSS entry point: `assets/css/main.scss`
- Fonts: Cormorant Garamond (display), Quicksand (body)

### Animations

- Scroll-triggered animations use `data-animate` attribute
- JavaScript in `assets/js/animations.js` handles Intersection Observer and interactivity
- Key animations: fadeInUp, twinkle, float, moonGlow, animalBounce, animalFloat
