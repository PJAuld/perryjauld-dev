/* Theme utility functions for managing light/dark mode. */

const THEME_KEY = 'theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';

/**
 * Detects the user's system theme preference.
 * @returns {string} 'dark' if dark mode is preferred, otherwise 'light'
 */
const getSystemTheme = () => {
  const prefersDark = window?.matchMedia('(prefers-color-scheme: dark)')?.matches;
  
  if (prefersDark) { return THEME_DARK; }
  return THEME_LIGHT;
};

/**
 * Reads the stored theme preference from localStorage.
 * @returns {string|null} The stored theme ('light' or 'dark'), or null if not set
 */
const getStoredTheme = () => {
  if (typeof window === 'undefined') { return null; }
  
  try {
    return localStorage.getItem(THEME_KEY);
  }
  catch (err) {
    console.warn('Unable to access localStorage:', err);
    return null;
  }
};

/**
 * Saves the theme preference to localStorage.
 * @param {string} theme - The theme to store ('light' or 'dark')
 */
const setStoredTheme = (theme) => {
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
const applyTheme = (theme) => {
  if (typeof document === 'undefined') { return; }

  document.documentElement.dataset.theme = theme;
};

export {
  THEME_KEY,
  THEME_LIGHT,
  THEME_DARK,
  getSystemTheme,
  getStoredTheme,
  setStoredTheme,
  applyTheme,
};
