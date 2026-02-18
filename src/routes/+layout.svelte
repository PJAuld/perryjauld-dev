<!-- Root Layout Component -->
<script>
  import { onMount } from 'svelte';
  import { onNavigate } from '$app/navigation';
  import favicon from '$lib/assets/favicon.svg';
  import './styles.scss';

  // Reactive state for the background video source URL
  let backgroundVideoSrc = $state(''); // initialized empty; set on mount
  let { children } = $props(); // slot content

  /**
   * Reads the --background-video CSS variable, parses the URL,
   *     and sets as the background video source.
   */
  onMount(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const rawSrc = rootStyles.getPropertyValue('--background-video').trim();

    // Extract URL from CSS variable; may be in url('...') format
    const STRING_IN_URL_TAG = /^url\(['"]?(.+?)['"]?\)$/;
    const match = rawSrc.match(STRING_IN_URL_TAG);
    backgroundVideoSrc = match ? match[1] : rawSrc;
  });

  /**
   * Uses View Transition API to create fade effects between pages.
   *     If the browser doesn't support view transitions, navigation proceeds 
   *     normally without animation.
   * @param {Object} navigation - SvelteKit navigation object
   * @returns {Promise<void>|undefined} Promise resolving when transition completes
   */
  onNavigate((navigation) => {
    // Check if browser supports View Transition API
    if (!document.startViewTransition) return;

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
  autoplay
  muted
  loop
  playsinline
  aria-hidden="true"
  poster="/media/background-image.jpeg"
>
  {#if backgroundVideoSrc}
    <source src={backgroundVideoSrc} type="video/mp4" />
  {/if}
</video>

<div class="video-overlay" aria-hidden="true"></div>

<div class="layout-container">
  <div class="home-icon"></div>

  <nav class="nav-bar">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/portfolio">Portfolio</a></li>
    </ul>
  </nav>

  <div class="title-banner"></div>

  <div class="body-content">
    <div class="page-content">
      {@render children()}
    </div>
  </div>
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
    animation: video-fade var(--animation-video-fade) ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      display: none;
    }
  }

  @keyframes video-fade {
    0% { opacity: 0; }
    3% { opacity: 1; }
    97% { opacity: 1; }
    100% { opacity: 0; } 
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

  /* Decorative home icon area in the top-left corner. */
  .home-icon {
    background: var(--glass-bg-light);
    backdrop-filter: var(--glass-blur-light); /* Creates frosted glass effect */
    -webkit-backdrop-filter: var(--glass-blur-light); /* Safari support */
    border-bottom: 1px solid var(--glass-border-medium); /* Subtle border for definition */
    border-bottom-right-radius: var(--corner-rounding); /* Custom organic corner shape */
    box-shadow: var(--glass-shadow-default);
    position: fixed; /* Stays in place during scroll */
    top: 0;
    left: 0;
    height: var(--layout-header-height);
    width: var(--layout-sidebar-width);
  }

  /* Main navigation sidebar. */
  .nav-bar {
    background: var(--glass-bg-medium);
    backdrop-filter: var(--glass-blur-heavy); /* Frosted glass blur effect */
    -webkit-backdrop-filter: var(--glass-blur-heavy); /* Safari compatibility */
    border-right: 1px solid var(--glass-border-light); /* Subtle separator */
    border-top-right-radius: var(--corner-rounding); /* Organic corner shape */
    box-shadow: var(--glass-shadow-nav);
    color: var(--color-text);
    position: fixed; /* Sidebar stays visible during scroll */
    top: var(--layout-sidebar-offset); /* Below home icon plus gap */
    left: 0;
    height: calc(100vh - var(--layout-sidebar-offset)); /* Full height minus top spacing */
    width: var(--layout-sidebar-width);
    padding: var(--spacing-md);

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
      transition: background-color var(--transition-link), backdrop-filter var(--transition-link);

      &:hover {
        background-color: var(--glass-bg-hover);
        backdrop-filter: var(--glass-blur-hover);
        text-decoration: none; /* Remove underline */
      }
    }
  }

  /* Decorative header space above content. */
  .title-banner {
    background: var(--glass-bg-light);
    backdrop-filter: var(--glass-blur-light); /* Creates frosted glass effect */
    -webkit-backdrop-filter: var(--glass-blur-light); /* Safari support */
    border-bottom: 1px solid var(--glass-border-medium);
    border-left: 1px solid var(--glass-border-medium);
    border-bottom-left-radius: var(--corner-rounding);
    box-shadow: var(--glass-shadow-default);
    height: var(--layout-header-height);
    margin-bottom: var(--layout-gap-sm); /* Gap before body content */
    margin-left: var(--layout-content-offset); /* Aligns with nav bar width plus gap */
  }

  /* Main body containing all page content. */
  .body-content {
    background: var(--glass-bg-medium);
    backdrop-filter: var(--glass-blur-heavy); /* Creates frosted glass effect */
    -webkit-backdrop-filter: var(--glass-blur-heavy); /* Safari compatibility */
    border-left: 1px solid var(--glass-border-light);
    border-top-left-radius: var(--corner-rounding);
    box-shadow: var(--glass-shadow-body);
    margin-left: var(--layout-content-offset); /* Offset by nav bar width */
    margin-top: var(--layout-gap-md); /* Space from title banner */
    min-height: calc(100vh - var(--layout-sidebar-offset));
    height: 100%;

    /* Page content wrapper - target for view transitions. Match parent values */
    .page-content {
      border-top-left-radius: var(--corner-rounding);
      height: 100%;
      min-height: inherit;
      view-transition-name: main-content; /* Enable view transitions */
    }
  }

  /* Mobile responsive for small screens. */
  @media (max-width: 768px) {
    /* Hide background video and overlay */
    .background-video, .video-overlay {
      display: none;
    }
    
    /* Make glassmorphism elements more opaque for better readability. */
    .body-content, .nav-bar, .home-icon {
      background: var(--glass-bg-heavy);
      backdrop-filter: none; /* Remove blur with no video */
      -webkit-backdrop-filter: none;
    }

    .body-content {
      border-top-left-radius: 0; /* Remove corner radius for full-width */
      margin-left: 0; /* Full width */
      margin-top: var(--layout-mobile-content-offset); /* Space below nav bar */
    }

    .home-icon, .title-banner {
      display: none;
    }

    .nav-bar {
      border-top-right-radius: 0; /* Remove sidebar corner */
      padding: var(--layout-gap-md);
      position: fixed;
      top: 0;
      height: var(--layout-mobile-nav-height);
      width: 100%;
      z-index: var(--z-index-content);
      
      ul {
        flex-direction: row; /* Stack links horizontally */
        justify-content: center; /* Center links in available space */
      }
    }
  }

  /* View transition animations */
  @media (prefers-reduced-motion: no-preference) {
    ::view-transition-old(main-content) {
      animation-name: fade-out;
      animation-duration: var(--transition-view-duration);
      animation-timing-function: ease-in-out;
    }

    ::view-transition-new(main-content) {
      animation-name: fade-in;
      animation-duration: var(--transition-view-duration);
      animation-delay: var(--transition-view-duration);
      animation-timing-function: ease-in-out;
    }

    @keyframes fade-out {
      to { opacity: 0; }
    }

    @keyframes fade-in {
      from { opacity: 0; }
    }
  }
</style>
