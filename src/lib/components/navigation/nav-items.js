export const NAV_ITEMS = [
	{ label: 'Home', path: '/' },
	{ label: 'Blog', path: '/blog', hasChildren: true },
	{ label: 'Portfolio', path: '/portfolio' },
];

export function getAutoExpanded(path) {
	const next = {};

	NAV_ITEMS.forEach((item) => {
		if (item.hasChildren && (path === item.path || path.startsWith(item.path + '/'))) {
			next[item.path] = true;
		}
	});

	return next;
}
