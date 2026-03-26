<!-- Body Content Component -->
<script>
  let { children } = $props();
</script>

<div class="body-content">
  <div class="page-content">
    {@render children()}
  </div>
</div>

<style lang="scss">
  /* Main body containing all page content. */
  .body-content {
    background: var(--glass-bg-medium);
    backdrop-filter: var(--glass-blur-heavy); /* Creates frosted glass effect */
    -webkit-backdrop-filter: var(--glass-blur-heavy); /* Safari compatibility */
    border-left: 1px solid var(--glass-border-light);
    border-top-left-radius: var(--corner-rounding);
    box-shadow: var(--glass-shadow-body);
    transform: translateZ(0); /* Force GPU compositing to prevent iOS blur delay */
    margin-left: var(--layout-content-offset); /* Offset by nav bar width */
    margin-top: var(--layout-gap-md); /* Space from title banner */
    min-height: calc(100vh - var(--layout-sidebar-offset));
    height: 100%;

    /* Page content wrapper - target for view transitions. Match parent values */
    .page-content {
      border-top-left-radius: var(--corner-rounding);
      height: 100%;
      min-height: inherit;
    }
  }

  @media (max-width: 768px) {
    .body-content {
      background: var(--color-bg-secondary);
      backdrop-filter: var(--glass-blur-mobile);
      -webkit-backdrop-filter: var(--glass-blur-mobile);
      border-left: 1px solid var(--glass-border-light);
      border-right: 1px solid var(--glass-border-light);
      border-top: 1px solid var(--glass-border-light);
      border-top-left-radius: var(--corner-rounding);
      box-shadow: var(--glass-shadow-mobile-body);
      margin-left: var(--layout-gap-sm);
      margin-top: calc(var(--layout-mobile-nav-height) + var(--layout-gap-sm)); /* Align below nav bar */
      min-height: calc(100vh - var(--layout-mobile-nav-height)); /* Full height minus nav bar */

      .page-content {
        border-top-left-radius: var(--corner-rounding);
        border-top-right-radius: var(--corner-rounding);
      }
    }
  }

  /* Dark mode styles for mobile */
  @media (max-width: 768px) {
    :global([data-theme="dark"]) {
      .body-content {
        background: var(--color-bg-secondary);
        border-left: 1px solid var(--color-border);
        border-right: 1px solid var(--color-border);
        border-top: 1px solid var(--color-border);
        box-shadow: var(--glass-shadow-mobile-body);
      }
    }
  }
</style>
