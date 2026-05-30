# Structure, Organization, and Modularity Audit

Date: 2026-05-29

## Scope

This audit reviews the current file structure, component boundaries, global styling, and content-loading organization for the SvelteKit personal site. It uses the current Svelte and SvelteKit docs as a guide:

- SvelteKit project structure: https://svelte.dev/docs/kit/project-structure
- SvelteKit routing and route-local files: https://svelte.dev/docs/kit/routing
- SvelteKit `$lib` alias: https://svelte.dev/docs/kit/%24lib
- Svelte scoped styles: https://svelte.dev/docs/svelte/scoped-styles
- Svelte global styles: https://svelte.dev/docs/svelte/global-styles
- SvelteKit static assets and performance: https://svelte.dev/docs/kit/performance
- SvelteKit image handling: https://svelte.dev/docs/kit/images

## Executive Summary

The site is organized well enough for its current size, and the broad SvelteKit shape is sound: routes live in `src/routes`, shared components and utilities live in `src/lib`, markdown content is separated from route code, and tests are split between unit tests and Playwright tests.

The main modularity debt is concentrated in four places:

1. `src/lib/components/nav_bar.svelte` is doing too many jobs in one 442-line component.
2. Blog post discovery, metadata mapping, and sorting are repeated in three load files.
3. `src/routes/styles.scss` is an app-wide stylesheet living inside the route tree and mixing tokens, reset, base typography, utilities, and app shell concerns.
4. `src/routes/blog/[slug]/+page.svelte` mixes pure navigation calculation, markdown article rendering, and post navigation UI.

None of these are emergencies, but they are exactly the seams that will start slowing you down once the blog has more posts, the portfolio has more projects, or the navigation expands.

## What Is Already In Good Shape

- `src/routes/` correctly maps to the app's public routes.
- `src/lib/components/` is already used for shared shell components.
- `src/lib/utils/` is a sensible home for pure JavaScript helpers.
- `src/content/blog/` keeps markdown authoring separate from app code.
- Component-local styles are generally scoped inside `.svelte` files, which matches Svelte's default style model.
- `src/app.html` is being used appropriately for pre-hydration theme and font-size initialization.
- The app is using Svelte 5 syntax (`$props`, `$state`, `$derived`, `$effect`) rather than older component APIs.

## Findings

### P1: Move and split the global stylesheet

Current state:

- `src/routes/+layout.svelte` imports `./styles.scss`.
- `src/routes/styles.scss` contains design tokens, dark theme variables, font-size overrides, reset styles, base element styles, skip-link styles, and the shared `.glass-card` utility.

Why it matters:

- SvelteKit's route directory is primarily for routes, layouts, and route-local colocated files. A site-wide stylesheet inside `src/routes` works technically, but it makes the file look route-specific when it is really application infrastructure.
- Svelte scopes component styles by default. The more global element rules you add, the easier it becomes for unrelated components and markdown output to inherit styling accidentally.
- The file is already 295 lines and spans multiple concerns.

Recommendation:

- Move the app-wide stylesheet to `src/app.scss` or `src/lib/styles/app.scss`.
- Keep a single stylesheet import in `src/routes/+layout.svelte`.
- Split the stylesheet into partials:

```text
src/
|-- app.scss
`-- lib/
    `-- styles/
        |-- tokens.scss
        |-- themes.scss
        |-- base.scss
        `-- utilities.scss
```

Suggested split:

- `tokens.scss`: spacing, typography, radii, shadows, z-indexes, layout dimensions.
- `themes.scss`: `:root`, `[data-theme="dark"]`, and `[data-font-size]` rules.
- `base.scss`: reset, `html`, `body`, base text/link rules, focus styles.
- `utilities.scss`: `.glass-card`, `.skip-link`, and future utility classes.

Also clean up while moving:

- `--background-image`, `--background-video`, `--animation-video-fade`, `--glass-blur-mobile-hover`, and `--radius-mobile-nav-link` appear unused.
- `[data-theme="dark"] html` does not match the `html` element when the attribute is on `html`; use `html[data-theme="dark"]` if that rule is intended to apply.

### P1: Extract shared blog content loading

Current state:

- `import.meta.glob('/src/content/blog/*.md')` appears in:
  - `src/routes/+layout.js`
  - `src/routes/blog/+page.js`
  - `src/routes/blog/[slug]/+page.js`
- Each file repeats metadata loading, path slicing, and date sorting.

Why it matters:

- The same content contract is implemented three times.
- Changes to slug rules, front matter validation, sorting, drafts, or future tags would need to be made in multiple places.
- The blog index currently duplicates data that the layout already loads for `navPosts`.

Recommendation:

Create a blog content module:

```text
src/lib/content/blog.js
```

Candidate API:

```js
export async function getAllPostMetadata() {}
export async function getPostBySlug(slug) {}
export function sortPostsByDateDesc(posts) {}
export function slugFromContentPath(path) {}
```

Then route load files become thin adapters:

- `src/routes/+layout.js` calls `getAllPostMetadata()` for nav data.
- `src/routes/blog/+page.js` either calls the same function or reuses layout data through `parent()`.
- `src/routes/blog/[slug]/+page.js` calls `getPostBySlug(slug)` and `getAllPostMetadata()`.

### P1: Split `nav_bar.svelte`

Current state:

`src/lib/components/nav_bar.svelte` is 442 lines and currently owns:

- Navigation item data.
- Active route matching.
- Expanded section state.
- Mobile menu state.
- Mobile toggle button markup.
- Desktop nav markup.
- Blog submenu markup.
- Reader controls placement for mobile.
- Caret icon markup.
- Desktop and mobile nav styling.
- Dark-mode mobile overrides.

Why it matters:

- It is the hardest component to reason about in the codebase.
- It mixes reusable navigation behavior with site-specific data and presentation details.
- Testing smaller parts, such as active link behavior or blog submenu rendering, is harder than it needs to be.

Recommendation:

Split it into a small navigation folder:

```text
src/lib/components/navigation/
|-- NavBar.svelte
|-- NavItem.svelte
|-- NavSection.svelte
|-- BlogSubnav.svelte
|-- MobileNavToggle.svelte
`-- nav-items.js
```

Suggested responsibilities:

- `NavBar.svelte`: state orchestration, route awareness, layout wrapper.
- `NavItem.svelte`: simple leaf link.
- `NavSection.svelte`: parent link plus expand/collapse button.
- `BlogSubnav.svelte`: renders discovered blog post links.
- `MobileNavToggle.svelte`: open/close button and label.
- `nav-items.js`: source of truth for Home, Blog, Portfolio.

Keep styles component-scoped where possible. If the mobile and desktop styling still feels large, consider `NavContent.svelte` and `MobileControls.svelte` as a second pass.

### P1: Split blog detail page responsibilities

Current state:

`src/routes/blog/[slug]/+page.svelte` contains:

- Pure contextual navigation calculation.
- Article header rendering.
- Markdown component rendering.
- Nearby-post navigation markup.
- Markdown element styling.
- Post navigation styling.

Why it matters:

- `getNavContext` is pure logic, but it is trapped inside a Svelte page component.
- The post navigation UI is substantial enough to deserve a name.
- Markdown content styling is likely to grow as the blog gains more content types.

Recommendation:

Extract:

```text
src/lib/blog/navigation.js
src/lib/components/blog/PostArticle.svelte
src/lib/components/blog/PostNavigation.svelte
src/lib/components/blog/MarkdownContent.svelte
```

Or, if these remain blog-route-only, colocate under `src/routes/blog/`:

```text
src/routes/blog/PostArticle.svelte
src/routes/blog/PostNavigation.svelte
src/routes/blog/MarkdownContent.svelte
```

Add unit tests for `getPostNavContext`, especially first post, middle post, last post, one post, and empty list cases.

### P2: Extract background media from the root layout

Current state:

`src/routes/+layout.svelte` owns theme state, font-size state, page transitions, background video markup, mobile blur state, nav shell, title banner, and body content.

Why it matters:

- The root layout is the right place to compose global shell pieces, but it should stay mostly orchestration.
- The background video and overlay are a distinct visual component.
- `isMobile` is set once on mount and will not update if the viewport is resized. This can be handled with CSS instead.

Recommendation:

Create:

```text
src/lib/components/app/BackgroundMedia.svelte
```

Move the video and overlay markup/styles into it. Replace the JS-driven mobile blur with a media query:

```scss
@media (max-width: 768px) {
  .background-video {
    filter: blur(2px);
  }
}
```

This would let `+layout.svelte` drop the `isMobile` state entirely.

### P2: Consolidate reader controls

Current state:

- `TitleBanner` renders `FontSizeToggle` and `ThemeToggle` for desktop.
- `NavBar` renders the same two controls inside the mobile menu.
- Positioning assumptions for each toggle are embedded inside each toggle component.

Why it matters:

- Toggle components are less reusable because they absolutely position themselves.
- The parent containers should decide layout placement; the controls should only render buttons.

Recommendation:

Create a wrapper:

```text
src/lib/components/preferences/ReaderControls.svelte
```

Then:

- `TitleBanner` renders `<ReaderControls variant="desktop" />`.
- The mobile nav renders `<ReaderControls variant="mobile" />`.
- `ThemeToggle` and `FontSizeToggle` become layout-neutral buttons.

Longer term, consider centralizing preference logic in:

```text
src/lib/preferences/theme.js
src/lib/preferences/font-size.js
src/lib/preferences/index.js
```

### P2: Extract portfolio data and card UI when it grows

Current state:

`src/routes/portfolio/+page.svelte` contains both the portfolio data array and the project-card UI.

Why it matters:

- This is acceptable for one project.
- Once there are several projects, edits to content and edits to layout will compete in the same file.

Recommendation:

When adding more than one or two projects, move to:

```text
src/lib/content/projects.js
src/lib/components/portfolio/ProjectCard.svelte
```

If projects become richer, use markdown or another content format:

```text
src/content/projects/*.md
```

### P2: Decide between global utility classes and primitive components

Current state:

`.glass-card` is a global class used across home, blog, portfolio, and post navigation.

Why it matters:

- A single global utility is fine for now.
- As card variants grow, class composition can become unclear, especially if every route adds local overrides.

Recommendation:

Keep `.glass-card` as a utility if it remains purely visual.

Introduce components if card semantics start repeating:

```text
src/lib/components/ui/Card.svelte
src/lib/components/ui/Tag.svelte
```

A good threshold: create the component when you need repeated markup, ARIA attributes, slots, or variants, not just a shared background/border style.

### P2: Normalize component naming and folders

Current state:

Component files use snake case:

- `nav_bar.svelte`
- `theme_toggle.svelte`
- `font_size_toggle.svelte`
- `title_banner.svelte`

Why it matters:

- Svelte accepts this.
- Svelte docs and common ecosystem convention use PascalCase component filenames, which makes imports and component usage visually line up.

Recommendation:

Use PascalCase for component files going forward:

```text
NavBar.svelte
ThemeToggle.svelte
FontSizeToggle.svelte
TitleBanner.svelte
BodyContent.svelte
HomeIcon.svelte
```

This can be done in the same refactor as the navigation split to avoid churn.

### P3: Improve tool and generated-file hygiene

Current state:

- `test-results/.last-run.json` is tracked.
- `.DS_Store` is ignored, including `static/.DS_Store`, but ignored OS files still exist locally.
- `@sveltejs/adapter-auto` is listed in `package.json`, but `svelte.config.js` uses `@sveltejs/adapter-vercel`.

Why it matters:

- Generated test artifacts create noisy diffs over time.
- Unused dependencies make the stack look less intentional.

Recommendation:

- Add `test-results/` to `.gitignore` and remove `test-results/.last-run.json` from git.
- Remove unused dependencies once confirmed with the lockfile.

## Recommended Target Structure

This is the shape I would aim for before adding many more posts or features:

```text
src/
|-- app.html
|-- app.scss
|-- content/
|   `-- blog/
|       `-- *.md
|-- lib/
|   |-- assets/
|   |-- components/
|   |   |-- app/
|   |   |   |-- AppShell.svelte
|   |   |   `-- BackgroundMedia.svelte
|   |   |-- blog/
|   |   |   |-- BlogList.svelte
|   |   |   |-- BlogPostCard.svelte
|   |   |   |-- MarkdownContent.svelte
|   |   |   |-- PostArticle.svelte
|   |   |   `-- PostNavigation.svelte
|   |   |-- navigation/
|   |   |   |-- BlogSubnav.svelte
|   |   |   |-- MobileNavToggle.svelte
|   |   |   |-- NavBar.svelte
|   |   |   |-- NavItem.svelte
|   |   |   |-- NavSection.svelte
|   |   |   `-- nav-items.js
|   |   |-- portfolio/
|   |   |   `-- ProjectCard.svelte
|   |   |-- preferences/
|   |   |   |-- FontSizeToggle.svelte
|   |   |   |-- ReaderControls.svelte
|   |   |   `-- ThemeToggle.svelte
|   |   `-- ui/
|   |       |-- Card.svelte
|   |       `-- Tag.svelte
|   |-- content/
|   |   |-- blog.js
|   |   `-- projects.js
|   |-- styles/
|   |   |-- base.scss
|   |   |-- themes.scss
|   |   |-- tokens.scss
|   |   `-- utilities.scss
|   `-- utils/
|       `-- format.js
`-- routes/
    |-- +layout.js
    |-- +layout.svelte
    |-- +page.svelte
    |-- blog/
    |   |-- +page.js
    |   |-- +page.svelte
    |   `-- [slug]/
    |       |-- +page.js
    |       `-- +page.svelte
    `-- portfolio/
        `-- +page.svelte
```

This is a target, not a mandate. I would not create every folder before it has real occupants. The first useful refactor is smaller:

1. Move/split global styles.
2. Extract blog content loading.
3. Split navigation.
4. Extract post navigation.
5. Extract background media.

## Suggested Refactor Order

### Phase 1: Low-risk structure cleanup

- Move `src/routes/styles.scss` to `src/app.scss`.
- Split style partials under `src/lib/styles/`.
- Fix the dark-theme selector and remove unused tokens.
- Add `test-results/` to `.gitignore` and untrack `test-results/.last-run.json`.

### Phase 2: Content loading

- Add `src/lib/content/blog.js`.
- Replace duplicated markdown discovery and sorting in load files.
- Add tests for slug extraction and post sorting.

### Phase 3: Navigation

- Rename `nav_bar.svelte` to `NavBar.svelte`.
- Extract `nav-items.js`.
- Extract `NavItem`, `NavSection`, `BlogSubnav`, and `MobileNavToggle`.
- Move mobile reader controls into a `ReaderControls` wrapper.

### Phase 4: Blog detail modularity

- Extract `getPostNavContext`.
- Extract `PostNavigation`.
- Extract `MarkdownContent`.
- Add unit tests for post navigation context.

### Phase 5: Portfolio and UI primitives

- Move projects to `src/lib/content/projects.js`.
- Extract `ProjectCard`.
- Introduce `Card` and `Tag` components only if variants or repeated markup justify them.

## Bottom Line

Your suspicion is right: the site is ready for a modularity pass. I would not explode every small page into many files yet, but the navigation, blog loading, blog detail view, background media, and global SCSS should be broken apart before the site grows much further.
