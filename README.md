# perryjauld.dev

Personal website, blog, and portfolio showcase built with SvelteKit.

## Features

- 📝 Markdown-based blog system
- 💼 Portfolio showcase
- 🎨 Modular SCSS styling with centralized design tokens
- 🌓 Persistent theme and text-size reader controls
- ✅ Full test coverage (Vitest + Playwright)
- 🚀 Deployed on Vercel

## Tech Stack

- **SvelteKit** - Modern web framework
- **mdsvex** - Markdown support with remark/rehype plugins
- **SCSS** - Styling
- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **Vercel** - Deployment

## Project Structure

```
src/
├── app.scss              # Global stylesheet entrypoint
├── app.html              # HTML shell; includes the inline theme-init script
├── content/
│   └── blog/             # Markdown blog posts (*.md); each file is a post
├── lib/
│   ├── assets/           # Static assets imported by components (e.g. favicon.svg)
│   ├── blog/             # Blog-specific pure helpers and tests
│   ├── components/       # Reusable Svelte components grouped by concern
│   ├── content/          # Content discovery/loading helpers
│   ├── styles/           # SCSS tokens, themes, base styles, and utilities
│   └── utils/            # Pure JavaScript utility modules (format, theme, etc.)
└── routes/
    ├── +layout.js         # Root layout load function (enables prerendering)
    ├── +layout.svelte     # Root layout shell composition
    ├── +page.svelte       # Home page
    ├── blog/
    │   ├── +page.js       # Reuses layout-loaded blog post metadata
    │   ├── +page.svelte   # Blog listing page
    │   └── [slug]/
    │       ├── +page.js   # Loads a single post by slug
    │       └── +page.svelte # Composes blog post article and navigation
    └── portfolio/
        └── +page.svelte   # Portfolio page
```

### Directory conventions

| Directory | Purpose |
|---|---|
| `src/content/blog/` | Add new blog posts here as `*.md` files with YAML front matter (`title`, `date`, `excerpt`) |
| `src/lib/assets/` | Place static assets that need to be imported (e.g. SVGs). Files referenced directly from `static/` don't belong here |
| `src/lib/blog/` | Blog-specific pure helpers, such as contextual post navigation |
| `src/lib/components/` | Svelte components grouped by app shell, blog, navigation, preferences, and shared surfaces |
| `src/lib/content/` | Content loading/discovery helpers for markdown-backed content |
| `src/lib/styles/` | Global SCSS partials for tokens, themes, base rules, and utilities |
| `src/lib/utils/` | Framework-agnostic JavaScript utility functions with corresponding `*.test.js` unit tests |
| `src/routes/` | SvelteKit file-based routes; each folder maps to a URL segment |
| `static/` | Publicly served files (images, fonts, `robots.txt`); reference via absolute URL (e.g. `/media/bg.jpg`) |
| `tests/` | Playwright end-to-end tests |

## Developing

Start the development server:

```sh
npm run dev
```

## Building

Create a production build:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Testing

Run unit tests:

```sh
npm run test
```

Run e2e tests:

```sh
npm run test:e2e
```

## Deployment

This project is configured for deployment on Vercel using the `@sveltejs/adapter-vercel` adapter.
