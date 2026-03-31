<!-- Navigation Bar Component -->
<script>
  import { page } from '$app/state';
  import FontSizeToggle from '$lib/components/font_size_toggle.svelte';
  import ThemeToggle from '$lib/components/theme_toggle.svelte';

  let {
    currentTheme = 'light',
    onToggle = () => {},
    currentFontSize = 'normal',
    onFontSizeToggle = () => {},
  } = $props();

  /* Nav data structure — only sections with hasChildren get a caret */
  const NAV_ITEMS = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog', hasChildren: true },
    { label: 'Portfolio', path: '/portfolio' },
  ];

  /** Returns the set of sections that should be auto-expanded for a given path. */
  const getAutoExpanded = (path) => {
    const next = {};
    NAV_ITEMS.forEach((item) => {
      if (
        item.hasChildren &&
        (path === item.path || path.startsWith(item.path + '/'))
      ) {
        next[item.path] = true;
      }
    });
    return next;
  };

  // Initialize with the current path so SSR output is correct
  let expandedSections = $state(getAutoExpanded(page.url.pathname));
  let mobileMenuOpen = $state(false);

  /**
   * On each page navigation: close the mobile menu and reset expanded sections
   * to only show the section containing the current page.
   */
  $effect(() => {
    const path = page.url.pathname;
    mobileMenuOpen = false;
    expandedSections = getAutoExpanded(path);
  });

  /** Toggle a collapsible nav section open/closed. */
  const toggleSection = (path) => {
    expandedSections = {
      ...expandedSections,
      [path]: !expandedSections[path],
    };
  };

  const toggleMobileMenu = () => {
    mobileMenuOpen = !mobileMenuOpen;
  };

  /**
   * Returns true when the given nav path matches the current URL.
   * For '/', only matches exactly. For others, also matches sub-paths.
   */
  const isActive = (path) => {
    const current = page.url.pathname;
    if (path === '/') { return current === '/'; }
    return current === path || current.startsWith(path + '/');
  };

  /** Converts a URL slug into title-case label text. */
  const formatSlug = (slug) =>
    slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  /**
   * Derives breadcrumb items from the current URL path.
   * Uses page.data.meta.title for blog post slugs when available.
   */
  const breadcrumbs = $derived.by(() => {
    const path = page.url.pathname;
    const crumbs = [{ label: 'Home', path: '/' }];
    if (path === '/') { return crumbs; }

    const segments = path.split('/').filter(Boolean);
    let current = '';

    segments.forEach((segment) => {
      current += '/' + segment;
      if (current === '/blog') {
        crumbs.push({ label: 'Blog', path: '/blog' });
      }
      else if (current === '/portfolio') {
        crumbs.push({ label: 'Portfolio', path: '/portfolio' });
      }
      else if (current.startsWith('/blog/')) {
        const title = page.data?.meta?.title || formatSlug(segment);
        crumbs.push({ label: title, path: current });
      }
      else {
        crumbs.push({ label: formatSlug(segment), path: current });
      }
    });

    return crumbs;
  });
</script>

<!-- Desktop sidebar / Mobile pull-down nav -->
<nav
  class="nav-bar"
  aria-label="Main navigation"
>
  <!-- Mobile: hamburger / close button (hidden on desktop) -->
  <button
    class="mobile-toggle"
    onclick={toggleMobileMenu}
    aria-expanded={mobileMenuOpen}
    aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
    aria-controls="nav-content"
  >
    <span class="mobile-toggle-icon" aria-hidden="true">
      {#if mobileMenuOpen}✕{:else}☰{/if}
    </span>
  </button>

  <!-- Nav content: always visible on desktop; pull-down on mobile -->
  <div
    id="nav-content"
    class="nav-content"
    class:nav-content--open={mobileMenuOpen}
  >
    <ul class="nav-list">
      {#each NAV_ITEMS as item}
        <li class="nav-item">
          {#if item.hasChildren}
            <div class="nav-section">
              <a
                href={item.path}
                class="nav-link"
                class:nav-link--active={isActive(item.path)}
                aria-current={page.url.pathname === item.path ? 'page' : undefined}
              >
                {item.label}
              </a>
              <button
                class="caret-btn"
                class:caret-btn--expanded={expandedSections[item.path]}
                onclick={() => toggleSection(item.path)}
                aria-expanded={!!expandedSections[item.path]}
                aria-label={`${expandedSections[item.path] ? 'Collapse' : 'Expand'} ${item.label}`}
              >
                <svg
                  class="caret-icon"
                  viewBox="0 0 10 10"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M3 2 L7 5 L3 8"
                    stroke="currentColor"
                    fill="none"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          {:else}
            <a
              href={item.path}
              class="nav-link"
              class:nav-link--active={isActive(item.path)}
              aria-current={page.url.pathname === item.path ? 'page' : undefined}
            >
              {item.label}
            </a>
          {/if}
        </li>
      {/each}
    </ul>

    <!-- Breadcrumbs: shown when deeper than root -->
    {#if breadcrumbs.length > 1}
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {#each breadcrumbs as crumb, i}
            <li>
              {#if i < breadcrumbs.length - 1}
                <a href={crumb.path} class="crumb-link">{crumb.label}</a>
                <span class="crumb-sep" aria-hidden="true">›</span>
              {:else}
                <span class="crumb-current" aria-current="page">
                  {crumb.label}
                </span>
              {/if}
            </li>
          {/each}
        </ol>
      </nav>
    {/if}

    <!-- Mobile-only: accessibility and theme toggle buttons -->
    <div class="mobile-controls">
      <div class="mobile-controls-inner">
        <FontSizeToggle {currentFontSize} onToggle={onFontSizeToggle} />
        <ThemeToggle {currentTheme} {onToggle} />
      </div>
    </div>
  </div>
</nav>

<style lang="scss">
  /* ===== Desktop sidebar nav ===== */
  .nav-bar {
    background: var(--glass-bg-medium);
    backdrop-filter: var(--glass-blur-heavy);
    -webkit-backdrop-filter: var(--glass-blur-heavy);
    border-right: 1px solid var(--glass-border-light);
    border-top-right-radius: var(--corner-rounding);
    box-shadow: var(--glass-shadow-nav);
    color: var(--color-text);
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--layout-sidebar-offset));
    left: 0;
    padding: var(--spacing-md);
    position: fixed;
    top: var(--layout-sidebar-offset);
    transform: translateZ(0);
    view-transition-name: none;
    width: var(--layout-sidebar-width);
  }

  /* Hidden on desktop — shown only on mobile */
  .mobile-toggle {
    display: none;
  }

  .nav-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: var(--spacing-sm);
    overflow-y: auto;
  }

  .nav-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    list-style: none;
  }

  /* Flex row for a link + its caret button */
  .nav-section {
    align-items: center;
    display: flex;
    gap: 0;
  }

  .nav-link {
    border-radius: var(--radius-link);
    color: var(--color-text);
    display: block;
    flex: 1;
    padding: var(--spacing-xs);
    padding-left: var(--padding-link-left);
    text-decoration: none;
    transition:
      background-color var(--transition-link),
      backdrop-filter var(--transition-link);

    &:hover {
      backdrop-filter: var(--glass-blur-hover);
      background: var(--glass-bg-hover);
      text-decoration: none;
    }

    /* Highlight the active/current page link */
    &.nav-link--active {
      color: var(--color-primary);
      font-weight: 600;
    }
  }

  /* Caret toggle button for collapsible sections */
  .caret-btn {
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--radius-link);
    color: var(--color-text);
    cursor: pointer;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    padding: var(--spacing-xs);
    transition: color var(--transition-link);

    &:hover {
      background: var(--glass-bg-hover);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }

  .caret-icon {
    height: 12px;
    transition: transform 0.2s ease;
    width: 12px;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  /* Rotate caret 90° when expanded */
  .caret-btn--expanded .caret-icon {
    transform: rotate(90deg);
  }

  /* ===== Breadcrumbs ===== */
  .breadcrumbs {
    border-top: 1px solid var(--glass-border-light);
    font-size: 0.75rem;
    margin-top: auto;
    padding-top: var(--spacing-xs);

    ol {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: 0.1rem;
      list-style: none;
      padding: 0;
    }

    li {
      align-items: center;
      display: flex;
      gap: 0.1rem;
    }

    .crumb-link {
      color: var(--color-primary);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .crumb-sep {
      color: var(--color-text-muted);
    }

    .crumb-current {
      color: var(--color-text-muted);
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  /* Hidden on desktop — shown only inside the mobile dropdown */
  .mobile-controls {
    display: none;
  }

  /* ===== Mobile styles ===== */
  @media (max-width: 768px) {
    .nav-bar {
      align-items: center;
      background: var(--color-bg-secondary);
      backdrop-filter: var(--glass-blur-mobile);
      -webkit-backdrop-filter: var(--glass-blur-mobile);
      border-bottom: 1px solid var(--glass-border-light);
      border-bottom-left-radius: 0;
      border-left: 1px solid var(--glass-border-light);
      border-right: 1px solid var(--glass-border-light);
      border-top-right-radius: 0;
      box-shadow: var(--glass-shadow-mobile-nav);
      flex-direction: row;
      height: var(--layout-mobile-nav-height);
      left: var(--layout-gap-sm);
      overflow: visible;
      padding: 0;
      top: 0;
      width: calc(100% - var(--layout-gap-sm));
      z-index: 100;
    }

    .mobile-toggle {
      align-items: center;
      background: none;
      border: none;
      color: var(--color-text);
      cursor: pointer;
      display: flex;
      height: 100%;
      justify-content: center;
      padding: 0 var(--spacing-sm);

      &:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: -4px;
      }
    }

    .mobile-toggle-icon {
      font-size: 1.5rem;
      line-height: 1;
    }

    /* Pull-down dropdown panel */
    .nav-content {
      background: var(--color-bg-secondary);
      backdrop-filter: var(--glass-blur-mobile);
      -webkit-backdrop-filter: var(--glass-blur-mobile);
      border-bottom: 1px solid var(--glass-border-light);
      border-bottom-left-radius: var(--corner-rounding);
      border-left: 1px solid var(--glass-border-light);
      border-right: 1px solid var(--glass-border-light);
      box-shadow: var(--glass-shadow-mobile-nav);
      flex: none;
      gap: var(--spacing-xs);
      left: 0;
      max-height: 0;
      overflow: hidden;
      padding: 0;
      position: absolute;
      top: 100%;
      transition: max-height 0.3s ease;
      width: 100%;

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }

      &.nav-content--open {
        max-height: 80vh;
        overflow-y: auto;
        padding: var(--spacing-sm);
      }
    }

    /* Accessibility/theme toggles visible at bottom of mobile menu */
    .mobile-controls {
      border-top: 1px solid var(--glass-border-light);
      display: block;
      padding-top: var(--spacing-xs);

      .mobile-controls-inner {
        height: 56px;
        position: relative;
      }
    }

    /* Breadcrumbs flow naturally after nav links on mobile */
    .breadcrumbs {
      margin-top: 0;
    }
  }

  /* Dark mode mobile overrides */
  @media (max-width: 768px) {
    :global([data-theme="dark"]) {
      .nav-bar {
        background: var(--color-bg-secondary);
        border-bottom: 1px solid var(--color-border);
        border-left: 1px solid var(--color-border);
        border-right: 1px solid var(--color-border);
        box-shadow: var(--glass-shadow-mobile-nav);
      }

      .nav-content {
        background: var(--color-bg-secondary);
        border-bottom: 1px solid var(--color-border);
        border-left: 1px solid var(--color-border);
        border-right: 1px solid var(--color-border);
        box-shadow: var(--glass-shadow-mobile-nav);
      }
    }
  }
</style>
