<!-- Root Layout Component -->
<script>
  import { onMount } from 'svelte';
  import { onNavigate } from '$app/navigation';
  import favicon from '$lib/assets/favicon.svg';
  import BodyContent from '$lib/components/body_content.svelte';
  import HomeIcon from '$lib/components/home_icon.svelte';
  import NavBar from '$lib/components/nav_bar.svelte';
  import TitleBanner from '$lib/components/title_banner.svelte';
  import {
    THEME_DARK,
    THEME_LIGHT,
    applyTheme,
    setStoredTheme,
  } from '$lib/utils/theme.js';
  import {
    FONT_SIZE_NORMAL,
    applyFontSize,
    nextFontSize,
    setStoredFontSize,
  } from '$lib/utils/font_size.js';
  import './styles.scss';

  // Reactive state for the background video source URL
  let backgroundVideoSrc = $state(''); // initialized empty; set on mount
  let currentTheme = $state(THEME_LIGHT); // initialized to light; updated on mount
  let currentFontSize = $state(FONT_SIZE_NORMAL); // initialized to normal; updated on mount
  let isMobile = $state(false); // Track if device is mobile
  let { children } = $props(); // slot content

  /**
   * Reads the --background-video CSS variable, parses the URL,
   *     and sets as the background video source.
   * Also initializes the theme and font size state from data attributes.
   */
  onMount(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const rawSrc = rootStyles.getPropertyValue('--background-video').trim();

    // Extract URL from CSS variable; may be in url('...') format
    const STRING_IN_URL_TAG = /^url\(['"]?(.+?)['"]?\)$/;
    const match = rawSrc.match(STRING_IN_URL_TAG);
    backgroundVideoSrc = match ? match[1] : rawSrc;

    // Read initial theme from data-theme attribute set by app.html script
    currentTheme = document.documentElement.dataset.theme || THEME_LIGHT;

    // Read initial font size from data-font-size attribute set by app.html script
    currentFontSize = document.documentElement.getAttribute('data-font-size') || FONT_SIZE_NORMAL;

    // Detect mobile and apply blur immediately to prevent flash
    isMobile = window.innerWidth <= 768;
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

<video
  class="background-video"
  style={isMobile ? 'filter: blur(2px);' : ''}
  autoplay
  muted
  loop
  playsinline
  aria-hidden="true"
  poster="/media/rocky-coast.jpeg"
>
  <source src="/media/rocky-coast.mp4" type="video/mp4" />
</video>

<div class="video-overlay" aria-hidden="true"></div>

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
  .background-video {
    position: fixed; /* Stays fixed in the viewport */
    inset: 0;
    height: 100%;
    width: 100%; 
    object-fit: cover; /* Ensures video fills container while maintaining aspect ratio */
    pointer-events: none; /* Prevents interaction with video */
    z-index: var(--z-index-background); /* Places video behind all content */

    @media (prefers-reduced-motion: reduce) {
      display: none;
    }
  }

  /* Adds subtle darkening to improve text readability and create depth. */
  .video-overlay { 
    background: var(--video-overlay-bg);
    inset: 0;
    position: fixed;
    pointer-events: none;
    z-index: var(--z-index-background);
  }

  /* Creates a new stacking context above the background layers. */
  .layout-container {
    position: relative;
    z-index: var(--z-index-content); /* Positions content above video and overlay */
    min-height: 100vh; /* Ensures layout fills viewport even with minimal content */
  }

  /* Mobile responsive for small screens. */
  @media (max-width: 768px) {
    /* Adjust overlay for better mobile readability */
    .video-overlay {
      background: var(--video-overlay-mobile-bg);
    }

    .layout-container {
      min-height: calc(100vh - var(--layout-mobile-nav-height)); /* Full height minus nav bar */
    }
  }
</style>
