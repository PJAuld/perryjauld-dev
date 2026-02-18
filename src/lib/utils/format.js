/**
 * Formats a date or date-like string into a date string in "Month Day, Year" format.
 * @param {Date|string} date - The date to format, either as a Date object or ISO string
 * @returns {string} The formatted date string in "Month Day, Year" format
 * @example
 * formatDate('2026-02-13') // Returns "February 13, 2026"
 * formatDate(new Date('2026-02-13')) // Returns "February 13, 2026"
 */
export function formatDate(date) {
	const dateObj = typeof date === 'string' ? new Date(date) : date;
	return dateObj.toLocaleDateString('en-US', {
	  year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
