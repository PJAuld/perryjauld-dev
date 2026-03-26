<!-- Home Icon Component -->
<div class="home-icon"></div>

<style lang="scss">
  /* Home icon area in the top-left corner. */
  .home-icon {
    background: var(--glass-bg-light);
    backdrop-filter: var(--glass-blur-light); /* Creates frosted glass effect */
    -webkit-backdrop-filter: var(--glass-blur-light); /* Safari support */
    border-bottom: 1px solid var(--glass-border-medium); /* Subtle border for definition */
    border-bottom-right-radius: var(--corner-rounding); /* Custom organic corner shape */
    box-shadow: var(--glass-shadow-default);
    transform: translateZ(0); /* Force GPU compositing to prevent iOS blur delay */
    position: fixed; /* Stays in place during scroll */
    top: 0;
    left: 0;
    height: var(--layout-header-height);
    width: var(--layout-sidebar-width);
    view-transition-name: none; /* Exclude from view transitions */
  }

  @media (max-width: 768px) {
    .home-icon {
      display: none;
    }
  }
</style>
