# Product Requirements Document: perryjauld.dev

## 1. Product Overview

perryjauld.dev is a personal website, blog, and portfolio for Perry J Auld. The site serves as a public home base for writing, project showcases, experiments, and personal or professional notes. It is designed to be lightweight, static-first, easy to maintain, and visually distinctive.

The current product is an early but functional version of a personal publishing platform. It prioritizes simple navigation, markdown-based content authoring, a recognizable visual identity, and reader comfort features such as theme and text-size controls.

## 2. Product Goals

- Provide a canonical personal web presence for Perry J Auld.
- Publish blog posts from local markdown files without a CMS.
- Showcase projects and experiments through a portfolio page.
- Keep the site fast, static, and deployable on Vercel.
- Maintain a visually memorable interface using video background, glass styling, and organic rounded layout forms.
- Support comfortable reading through dark mode, font-size controls, responsive layout, reduced-motion handling, and accessible navigation.

## 3. Target Audience

- Readers interested in Perry's writing, projects, and experiments.
- Potential collaborators, employers, clients, or peers reviewing Perry's work.
- Perry as the site owner and author, needing a low-friction way to publish new content.

## 4. Current Product Surface

### Home

Route: `/`

The home page introduces the site with the name "Perry J Auld", brief welcome copy, and quick links to the blog and portfolio.

### Blog Index

Route: `/blog`

The blog index lists all markdown posts from `src/content/blog/`, sorted newest-first by front matter date. Each entry displays title, formatted date, and optional excerpt.

### Blog Detail

Route: `/blog/[slug]`

Individual posts are rendered from markdown through mdsvex. Each post includes front matter metadata, markdown-rendered body content, and contextual post navigation around the current post.

### Portfolio

Route: `/portfolio`

The portfolio page currently renders a local array of projects. Each project can include title, description, technology tags, and an optional external link.

### Global Layout

Every route shares a fixed visual shell:

- Background video from `static/media/rocky-coast.mp4`.
- Overlay for readability.
- Desktop sidebar navigation.
- Mobile pull-down navigation.
- Home icon area.
- Header/banner area with desktop reader controls.
- Main content container with glass styling.
- Mobile reader controls inside the mobile navigation menu.
- Skip link for keyboard users.

## 5. Functional Requirements

### Content Authoring

- Authors can add a blog post by creating a markdown file in `src/content/blog/`.
- Blog markdown files must include front matter with at least:
  - `title`
  - `date`
  - `excerpt`
- The filename becomes the public slug, for example `welcome.md` maps to `/blog/welcome`.
- Blog posts are automatically discovered with Vite `import.meta.glob`.
- Blog lists and navigation sort posts by date descending.
- Blog content discovery, slug mapping, single-post lookup, and date sorting are centralized in a shared content helper.

### Navigation

- Users can navigate between Home, Blog, and Portfolio from global navigation.
- The Blog navigation item supports child links for discovered blog posts.
- Active route state is reflected visually and with `aria-current`.
- Mobile users can open and close a compact navigation menu.
- Navigating closes the mobile menu and resets expanded sections to match the current route.
- Navigation UI is split into small components for the shell, leaf links, expandable sections, blog submenu, and mobile toggle.

### Blog Reading Experience

- Blog index must show an empty state when no posts exist.
- Blog detail pages must render markdown content as Svelte components through mdsvex.
- Detail pages must return 404 when a slug has no matching markdown file.
- Blog detail pages must include a link back to all posts.
- Blog detail pages must show contextual nearby posts in a compact navigation list.
- Markdown-rendered headings, lists, code blocks, inline code, and blockquotes must receive readable site styling.
- Blog post article rendering, markdown styling, and nearby-post navigation are separate reusable components.

### Theme Control

- Users can toggle between light and dark themes.
- Theme preference is stored in `localStorage`.
- The initial theme is applied before Svelte hydration to reduce flashing.
- If no stored preference exists, the site uses the system color scheme.

### Text Size Control

- Users can cycle text size between normal, large, and extra large.
- Font-size preference is stored in `localStorage`.
- The initial font-size preference is applied before Svelte hydration.

### Motion and Visual Comfort

- Page transitions use the View Transition API when available.
- Page transitions are disabled when users prefer reduced motion.
- Background video is hidden when users prefer reduced motion.
- Mobile rendering applies stronger readability treatment over the background through CSS media queries.

## 6. Non-Functional Requirements

### Performance

- The site should remain static-first and fast to load.
- Pages are prerendered where possible.
- Background media should not block access to content.
- Content should remain readable if video playback is unavailable.

### Accessibility

- The site must include a skip link to main content.
- Interactive controls require accessible labels.
- Focus-visible styles must be present.
- Navigation state should be exposed with ARIA attributes.
- Reduced-motion preferences must be respected.
- Reader controls should persist across sessions.

### Responsiveness

- Desktop layout uses a fixed sidebar and offset content area.
- Mobile layout uses a top navigation bar with dropdown content.
- Content cards and project grids should adapt to available width.

### Maintainability

- Shared UI belongs in `src/lib/components/`.
- Pure helper logic belongs in `src/lib/utils/` or a domain-specific helper folder such as `src/lib/blog/`.
- Shared content loading belongs in `src/lib/content/`.
- Route-specific UI and load functions remain in `src/routes/`.
- Blog content remains separate from application code under `src/content/blog/`.
- Global styling and design tokens are centralized through `src/app.scss` and partials in `src/lib/styles/`.

## 7. Design Direction

The visual identity is built around a coastal video backdrop, translucent glass surfaces, organic corner radii, and restrained blue accent colors. The design should feel personal and exploratory while still being readable enough for long-form posts.

Key design conventions:

- Use glass-style containers for nav, header, cards, and body surfaces.
- Use CSS custom properties for theme, spacing, layout dimensions, typography, shadows, and radii.
- Preserve the contrast between background media and readable foreground content.
- Keep the site owner identity prominent on the home page.
- Keep the blog reading view calmer and narrower than the home or portfolio views.

## 8. Information Architecture

```text
/
|-- blog/
|   `-- [slug]/
`-- portfolio/
```

Primary navigation:

- Home
- Blog
  - Dynamically discovered post links
- Portfolio

Content storage:

```text
src/content/blog/
`-- *.md
```

## 9. Tech Stack

- Svelte 5 for component UI.
- SvelteKit 2 for routing, layout, load functions, prerendering, and app structure.
- Vite 7 for development and builds.
- mdsvex for markdown-as-Svelte rendering.
- remark-gfm for GitHub Flavored Markdown support.
- rehype-slug and rehype-autolink-headings for heading IDs and heading links.
- SCSS/Sass for styling.
- CSS custom properties for theming and design tokens.
- Vercel adapter for deployment.
- Vitest with jsdom for unit tests.
- Playwright for end-to-end tests.

## 10. Code Organization

### Root Config

- `package.json` defines scripts and dependencies.
- `svelte.config.js` configures SvelteKit, mdsvex, remark, rehype, and the Vercel adapter.
- `vite.config.js` configures the SvelteKit Vite plugin and Vitest.
- `playwright.config.js` builds and previews the app before E2E tests.
- `vercel.json` declares Vercel build settings.

### `src/routes/`

SvelteKit file-based routing lives here.

- `+layout.js` enables prerendering and loads blog metadata for global nav.
- `+layout.svelte` owns controls state and global shell composition.
- `+page.svelte` renders the home page.
- `blog/+page.js` reuses layout-loaded blog metadata.
- `blog/+page.svelte` renders the blog index.
- `blog/[slug]/+page.js` resolves a post by slug and loads all posts for context navigation.
- `blog/[slug]/+page.svelte` composes individual post article and nearby-post navigation components.
- `portfolio/+page.svelte` renders portfolio projects from a local static array.

### `src/lib/components/`

Reusable UI components live here.

- `app/BackgroundMedia.svelte` renders the shared background video and readability overlay.
- `blog/` contains markdown content, article, and post navigation components.
- `navigation/` contains the desktop/mobile nav shell, nav items, expandable sections, blog submenu, mobile toggle, and nav item data.
- `preferences/ReaderControls.svelte` composes theme and text-size controls for desktop and mobile placement.
- `title_banner.svelte` holds the desktop reader-controls placement.
- `body_content.svelte` wraps route content in the main glass panel.
- `home_icon.svelte` provides a desktop home link surface.
- `theme_toggle.svelte` renders and labels the layout-neutral light/dark toggle.
- `font_size_toggle.svelte` renders and labels the layout-neutral text-size control.

### `src/lib/content/`

Content discovery and mapping helpers live here.

- `blog.js` discovers markdown posts, maps content paths to slugs, sorts posts by date, and resolves posts by slug.
- `blog.test.js` covers slug extraction and non-mutating date sorting.

### `src/lib/blog/`

Blog-specific pure helper logic lives here.

- `navigation.js` computes nearby-post navigation context.
- `navigation.test.js` covers first, middle, last, one-post, empty-list, and missing-post cases.

### `src/lib/styles/`

Global styling partials live here and are imported by `src/app.scss`.

- `tokens.scss` defines design tokens and layout variables.
- `themes.scss` defines theme and font-size data-attribute overrides.
- `base.scss` defines reset, base element, typography, link, and focus rules.
- `utilities.scss` defines shared utility classes such as `.skip-link` and `.glass-card`.

### `src/lib/utils/`

Framework-agnostic helper logic lives here.

- `format.js` formats dates for display.
- `theme.js` applies and persists theme preference.
- `font_size.js` applies, cycles, and persists text-size preference.
- `format.test.js` covers date formatting.

### `src/content/blog/`

Markdown blog posts live here. The current content includes `welcome.md`, the first post introducing the site and its purpose.

### `static/`

Public assets served from the site root live here.

- `media/rocky-coast.mp4`
- `media/rocky-coast.jpeg`
- `media/background-image.jpeg`
- `robots.txt`

### `tests/`

Playwright tests cover basic page rendering, navigation, and blog-post viewing.

## 11. Current Testing Coverage

Unit coverage:

- Date formatting accepts both strings and Date objects.
- Blog content helper slug extraction and non-mutating date sorting.
- Blog post navigation context for empty, missing, first, middle, last, and one-post cases.

End-to-end coverage:

- Home page renders expected H1.
- Blog and portfolio navigation links work.
- Blog posts can be opened from the blog index when posts exist.

Recommended future coverage:

- Theme persistence.
- Font-size persistence and cycling.
- Mobile navigation open and close behavior.
- Blog 404 behavior for missing slugs.
- Markdown rendering of headings, code, blockquotes, and GFM features.

## 12. Deployment Model

The site is configured for Vercel deployment:

- Build command: `npm run build`
- Framework: SvelteKit
- Adapter: `@sveltejs/adapter-vercel`
- Output directory in `vercel.json`: `.svelte-kit/output`

The app also enables `prerender = true`, so the intended deployment model is static or static-like output for public pages.

## 13. Open Questions and Future Considerations

- Should post front matter be validated at build time?
- Should image handling and media optimization be formalized?
- Should search or filtering be added once the blog grows?
- Should the background media have an explicit poster fallback guarantee in source control?
- Should the site expose a public contact path or social links?
- Should accessibility tests be added to CI?

## 14. Roadmap

Near term:

- Standardize font size, spacing, and colors
- Add richer post metadata and validation.
- Add RSS, sitemap, and SEO metadata.
- Expand portfolio content beyond the site itself.
  - Move from a hardcoded array to markdown source.
- Add tests for reader controls and mobile navigation.
- Create logo SVG and favicon

Medium term:

- Add tags or categories for blog discovery.
- Add project detail pages or richer project cards.
- Add background video selection feature
- Introduce content previews, post hero assets, or related reading.

Long term:

- Support experiments as first-class routes or a separate section.
- Create a custom context menu (right click).
- Add search across posts and projects.
- Build a stronger publishing workflow around drafts, previews, and content validation.
