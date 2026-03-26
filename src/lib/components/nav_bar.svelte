<!-- Navigation Bar Component -->
<nav class="nav-bar">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/portfolio">Portfolio</a></li>
  </ul>
</nav>

<style lang="scss">
  /* Main navigation sidebar. */
  .nav-bar {
    background: var(--glass-bg-medium);
    backdrop-filter: var(--glass-blur-heavy); /* Frosted glass blur effect */
    -webkit-backdrop-filter: var(--glass-blur-heavy); /* Safari compatibility */
    border-right: 1px solid var(--glass-border-light); /* Subtle separator */
    border-top-right-radius: var(--corner-rounding); /* Organic corner shape */
    box-shadow: var(--glass-shadow-nav);
    color: var(--color-text);
    transform: translateZ(0); /* Force GPU compositing to prevent iOS blur delay */
    position: fixed; /* Sidebar stays visible during scroll */
    top: var(--layout-sidebar-offset); /* Below home icon plus gap */
    left: 0;
    height: calc(100vh - var(--layout-sidebar-offset)); /* Full height minus top spacing */
    width: var(--layout-sidebar-width);
    padding: var(--spacing-md);
    view-transition-name: none; /* Exclude from view transitions */

    ul {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
      list-style: none; /* Remove default bullets */
    }

    a {
      display: block; /* Makes entire area clickable */
      border-radius: var(--radius-link);
      color: var(--color-text);
      padding: var(--spacing-xs);
      padding-left: var(--padding-link-left);
      transition:
        background-color var(--transition-link),
        backdrop-filter var(--transition-link);

      &:hover {
        backdrop-filter: var(--glass-blur-hover);
        text-decoration: none; /* Remove underline */
      }
    }
  }

  @media (max-width: 768px) {
    .nav-bar {
      background: var(--color-bg-secondary);
      backdrop-filter: var(--glass-blur-mobile);
      -webkit-backdrop-filter: var(--glass-blur-mobile);
      border-bottom: 1px solid var(--glass-border-light);
      border-left: 1px solid var(--glass-border-light);
      border-right: 1px solid var(--glass-border-light);
      border-bottom-left-radius: var(--corner-rounding);
      border-top-right-radius: 0;
      box-shadow: var(--glass-shadow-mobile-nav);
      padding: var(--spacing-sm) var(--layout-gap-md);
      position: fixed;
      top: 0;
      left: var(--layout-gap-sm);
      height: var(--layout-mobile-nav-height);
      width: 100%;
      z-index: var(--z-index-content);

      ul {
        flex-direction: row; /* Stack links horizontally */
        gap: var(--spacing-md);
        justify-content: center; /* Center links in available space */
      }

      a {
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--radius-mobile-nav-link);

        &:hover {
          backdrop-filter: var(--glass-blur-mobile-hover);
          -webkit-backdrop-filter: var(--glass-blur-mobile-hover);
        }
      }
    }
  }

  /* Dark mode styles for mobile */
  @media (max-width: 768px) {
    :global([data-theme="dark"]) {
      .nav-bar {
        background: var(--color-bg-secondary);
        border-bottom: 1px solid var(--color-border);
        border-left: 1px solid var(--color-border);
        border-right: 1px solid var(--color-border);
        box-shadow: var(--glass-shadow-mobile-nav);
      }
    }
  }
</style>
