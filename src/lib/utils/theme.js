/* Theme utility functions for managing light/dark mode. */

const THEME_KEY = 'theme';
export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';

/**
 * Saves the theme preference to localStorage.
 * @param {string} theme - The theme to store ('light' or 'dark')
 */
export const setStoredTheme = (theme) => {
  if (typeof window === 'undefined') { return; }
  
  try {
    localStorage.setItem(THEME_KEY, theme);
  }
  catch (err) {
    console.warn('Unable to save to localStorage:', err);
  }
};

/**
 * Applies the theme by setting the data-theme attribute on the document element.
 * @param {string} theme - The theme to apply ('light' or 'dark')
 */
export const applyTheme = (theme) => {
  if (typeof document === 'undefined') { return; }

  document.documentElement.dataset.theme = theme;
};
