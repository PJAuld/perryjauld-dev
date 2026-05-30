<!-- Root Layout Component -->
<script>
  import { onMount } from 'svelte';
  import { onNavigate } from '$app/navigation';
  import favicon from '$lib/assets/favicon.svg';
  import BackgroundMedia from '$lib/components/app/BackgroundMedia.svelte';
  import BodyContent from '$lib/components/body_content.svelte';
  import HomeIcon from '$lib/components/home_icon.svelte';
  import NavBar from '$lib/components/navigation/NavBar.svelte';
  import TitleBanner from '$lib/components/title_banner.svelte';
  import { THEME_DARK, THEME_LIGHT, applyTheme, setStoredTheme } from '$lib/utils/theme.js';
  import { FONT_SIZE_NORMAL, applyFontSize, nextFontSize, setStoredFontSize } from '$lib/utils/font_size.js';
  import '../app.scss';

  let currentTheme = $state(THEME_LIGHT); // initialized to light; updated on mount
  let currentFontSize = $state(FONT_SIZE_NORMAL); // initialized to normal; updated on mount
  let { children } = $props(); // slot content

  /**
   * Initializes the theme and font size state from data attributes.
   */
  onMount(() => {
    // Read initial theme from data-theme attribute set by app.html script
    currentTheme = document.documentElement.dataset.theme || THEME_LIGHT;

    // Read initial font size from data-font-size attribute set by app.html script
    currentFontSize = document.documentElement.getAttribute('data-font-size') || FONT_SIZE_NORMAL;
  });

  /**
   * Toggles between light and dark themes. Saves theme to localStorage
   */
  const toggleTheme = () => {
    const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    currentTheme = newTheme;
    applyTheme(newTheme);
    setStoredTheme(newTheme);
  };

  /**
   * Cycles to the next font size. Saves preference to localStorage.
   */
  const toggleFontSize = () => {
    const newSize = nextFontSize(currentFontSize);
    currentFontSize = newSize;
    applyFontSize(newSize);
    setStoredFontSize(newSize);
  };

  /**
   * Uses View Transition API to create fade effects between pages.
   *     If the browser doesn't support view transitions, or the user prefers
   *     reduced motion, navigation proceeds normally without animation.
   * @param {Object} navigation - SvelteKit navigation object
   * @returns {Promise<void>|undefined} Promise resolving when transition completes
   */
  onNavigate((navigation) => {
    // Check if browser supports View Transition API
    if (!document.startViewTransition) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Wrap navigation in a view transition
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Perry J Auld</title>
</svelte:head>

<BackgroundMedia />

<div class="layout-container">
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <HomeIcon />
  <NavBar
    {currentTheme}
    onToggle={toggleTheme}
    {currentFontSize}
    onFontSizeToggle={toggleFontSize}
  />
  <TitleBanner {currentTheme} onToggle={toggleTheme} {currentFontSize} onFontSizeToggle={toggleFontSize} />
  <BodyContent>
    {@render children()}
  </BodyContent>
</div>

<style lang="scss">
  /* Creates a new stacking context above the background layers. */
  .layout-container {
    position: relative;
    z-index: var(--z-index-content); /* Positions content above video and overlay */
    min-height: 100vh; /* Ensures layout fills viewport even with minimal content */
  }

  /* Mobile responsive for small screens. */
  @media (max-width: 768px) {
    .layout-container {
      min-height: calc(100vh - var(--layout-mobile-nav-height)); /* Full height minus nav bar */
    }
  }
</style>
