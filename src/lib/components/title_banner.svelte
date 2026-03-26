<!-- Title Banner Component -->
<script>
  import ThemeToggle from '$lib/components/theme_toggle.svelte';

  let { currentTheme, onToggle } = $props();
</script>

<div class="title-banner">
  <ThemeToggle {currentTheme} {onToggle} />
</div>

<style lang="scss">
  /* Decorative header space above content. */
  .title-banner {
    background: var(--glass-bg-light);
    backdrop-filter: var(--glass-blur-light); /* Creates frosted glass effect */
    -webkit-backdrop-filter: var(--glass-blur-light); /* Safari support */
    border-bottom: 1px solid var(--glass-border-medium);
    border-left: 1px solid var(--glass-border-medium);
    border-bottom-left-radius: var(--corner-rounding);
    box-shadow: var(--glass-shadow-default);
    transform: translateZ(0); /* Force GPU compositing to prevent iOS blur delay */
    height: var(--layout-header-height);
    margin-bottom: var(--layout-gap-sm); /* Gap before body content */
    margin-left: var(--layout-content-offset); /* Aligns with nav bar width plus gap */
    position: relative; /* For absolutely positioned toggle button */
    view-transition-name: none; /* Exclude from view transitions */
  }

  @media (max-width: 768px) {
    /* Repurpose title banner as subtle gradient accent bar */
    .title-banner {
      display: none;
    }
  }
</style>
