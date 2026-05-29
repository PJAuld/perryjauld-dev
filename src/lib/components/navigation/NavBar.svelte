<script>
	import { page } from '$app/state';
	import FontSizeToggle from '$lib/components/font_size_toggle.svelte';
	import ThemeToggle from '$lib/components/theme_toggle.svelte';
	import MobileNavToggle from './MobileNavToggle.svelte';
	import NavItem from './NavItem.svelte';
	import NavSection from './NavSection.svelte';
	import { NAV_ITEMS, getAutoExpanded } from './nav-items.js';

	let {
		currentTheme = 'light',
		onToggle = () => {},
		currentFontSize = 'normal',
		onFontSizeToggle = () => {},
	} = $props();

	let expandedSections = $state(getAutoExpanded(page.url.pathname));
	let mobileMenuOpen = $state(false);

	$effect(() => {
		const path = page.url.pathname;
		mobileMenuOpen = false;
		expandedSections = getAutoExpanded(path);
	});

	const toggleSection = (path) => {
		expandedSections = {
			...expandedSections,
			[path]: !expandedSections[path],
		};
	};

	const toggleMobileMenu = () => {
		mobileMenuOpen = !mobileMenuOpen;
	};

	const isActive = (path) => {
		const current = page.url.pathname;
		if (path === '/') { return current === '/'; }
		return current === path || current.startsWith(path + '/');
	};

	const navPosts = $derived(page.data?.navPosts ?? []);
</script>

<nav class="nav-bar" aria-label="Main navigation">
	<MobileNavToggle isOpen={mobileMenuOpen} onToggle={toggleMobileMenu} />

	<div
		id="nav-content"
		class="nav-content"
		class:nav-content--open={mobileMenuOpen}
	>
		<ul class="nav-list">
			{#each NAV_ITEMS as item}
				<li class="nav-item">
					{#if item.hasChildren}
						<NavSection
							{item}
							active={isActive(item.path)}
							current={page.url.pathname === item.path}
							expanded={!!expandedSections[item.path]}
							posts={navPosts}
							{isActive}
							onToggle={toggleSection}
						/>
					{:else}
						<NavItem
							{item}
							active={isActive(item.path)}
							current={page.url.pathname === item.path}
						/>
					{/if}
				</li>
			{/each}
		</ul>

		<div class="mobile-controls">
			<div class="mobile-controls-inner">
				<FontSizeToggle {currentFontSize} onToggle={onFontSizeToggle} />
				<ThemeToggle {currentTheme} {onToggle} />
			</div>
		</div>
	</div>
</nav>

<style lang="scss">
	.nav-bar {
		-webkit-backdrop-filter: var(--glass-blur-heavy);
		backdrop-filter: var(--glass-blur-heavy);
		background: var(--glass-bg-medium);
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

	.mobile-controls {
		display: none;
	}

	@media (max-width: 768px) {
		.nav-bar {
			-webkit-backdrop-filter: var(--glass-blur-mobile);
			align-items: center;
			backdrop-filter: var(--glass-blur-mobile);
			background: var(--color-bg-secondary);
			border-bottom: 1px solid var(--glass-border-light);
			border-bottom-left-radius: var(--corner-rounding);
			border-left: 1px solid var(--glass-border-light);
			border-right: 1px solid var(--glass-border-light);
			border-top-right-radius: 0;
			box-shadow: var(--glass-shadow-mobile-nav);
			flex-direction: row;
			height: var(--layout-mobile-nav-height);
			justify-content: center;
			left: var(--layout-gap-sm);
			overflow: visible;
			padding: 0;
			top: 0;
			width: calc(100% - var(--layout-gap-sm));
			z-index: 100;
		}

		.nav-content {
			-webkit-backdrop-filter: blur(24px) saturate(200%);
			backdrop-filter: blur(24px) saturate(200%);
			background: rgba(245, 245, 245, 0.95);
			border: none;
			border-bottom-left-radius: var(--corner-rounding);
			border-top-left-radius: var(--corner-rounding);
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
				border-bottom: 1px solid var(--glass-border-light);
				border-left: 1px solid var(--glass-border-light);
				border-right: 1px solid var(--glass-border-light);
				box-shadow: var(--glass-shadow-mobile-nav);
				max-height: 80vh;
				overflow-y: auto;
				padding: var(--spacing-sm);
			}
		}

		.mobile-controls {
			border-top: 1px solid var(--glass-border-light);
			display: block;
			padding-top: var(--spacing-xs);

			.mobile-controls-inner {
				height: 56px;
				position: relative;
			}
		}

		:global([data-theme="dark"]) {
			.nav-bar {
				background: var(--color-bg-secondary);
				border-bottom: 1px solid var(--color-border);
				border-left: 1px solid var(--color-border);
				border-right: 1px solid var(--color-border);
				box-shadow: var(--glass-shadow-mobile-nav);
			}

			.nav-content {
				background: rgba(10, 10, 10, 0.92);
			}

			.nav-content.nav-content--open {
				border-bottom: 1px solid var(--color-border);
				border-left: 1px solid var(--color-border);
				border-right: 1px solid var(--color-border);
				box-shadow: var(--glass-shadow-mobile-nav);
			}
		}
	}
</style>
