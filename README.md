# perryjauld.dev

Personal website, blog, and portfolio showcase built with SvelteKit.

## Features

- 📝 Markdown-based blog system
- 💼 Portfolio showcase
- 🎨 SCSS styling
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
├── app.html              # HTML shell; includes the inline theme-init script
├── content/
│   └── blog/             # Markdown blog posts (*.md); each file is a post
├── lib/
│   ├── assets/           # Static assets imported by components (e.g. favicon.svg)
│   ├── components/       # Reusable Svelte components shared across routes
│   └── utils/            # Pure JavaScript utility modules (format, theme, etc.)
└── routes/
    ├── styles.scss        # Global styles, CSS custom properties, and shared classes
    ├── +layout.js         # Root layout load function (enables prerendering)
    ├── +layout.svelte     # Root layout: background video, nav, theme toggle
    ├── +page.svelte       # Home page
    ├── blog/
    │   ├── +page.js       # Loads and sorts all blog post metadata
    │   ├── +page.svelte   # Blog listing page
    │   └── [slug]/
    │       ├── +page.js   # Loads a single post by slug
    │       └── +page.svelte # Individual blog post page
    └── portfolio/
        └── +page.svelte   # Portfolio page
```

### Directory conventions

| Directory | Purpose |
|---|---|
| `src/content/blog/` | Add new blog posts here as `*.md` files with YAML front matter (`title`, `date`, `excerpt`) |
| `src/lib/assets/` | Place static assets that need to be imported (e.g. SVGs). Files referenced directly from `static/` don't belong here |
| `src/lib/components/` | Svelte components used in more than one route |
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
