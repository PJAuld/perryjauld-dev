/* Font size utility functions for managing text size accessibility. */

const FONT_SIZE_KEY = 'font-size-preference';
export const FONT_SIZE_NORMAL = 'normal';
export const FONT_SIZE_LARGE = 'large';
export const FONT_SIZE_X_LARGE = 'x-large';

export const FONT_SIZES = [
  FONT_SIZE_NORMAL,
  FONT_SIZE_LARGE,
  FONT_SIZE_X_LARGE,
];

/**
 * Saves the font size preference to localStorage.
 * @param {string} size - The font size to store
 */
export const setStoredFontSize = (size) => {
  if (typeof window === 'undefined') { return; }

  try {
    localStorage.setItem(FONT_SIZE_KEY, size);
  }
  catch (err) {
    console.warn('Unable to save font size to localStorage:', err);
  }
};

/**
 * Applies the font size by setting the data-font-size attribute on the
 * document element.
 * @param {string} size - The font size to apply
 */
export const applyFontSize = (size) => {
  if (typeof document === 'undefined') { return; }

  document.documentElement.setAttribute('data-font-size', size);
};

/**
 * Returns the next font size in the cycle.
 * @param {string} current - The current font size
 * @returns {string} The next font size
 */
export const nextFontSize = (current) => {
  const index = FONT_SIZES.indexOf(current);
  return FONT_SIZES[(index + 1) % FONT_SIZES.length];
};
