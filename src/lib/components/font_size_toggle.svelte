<!-- Font Size Toggle Component -->
<script>
  import {
    FONT_SIZE_NORMAL,
    FONT_SIZE_LARGE,
    FONT_SIZE_X_LARGE,
    nextFontSize,
  } from '$lib/utils/font_size.js';

  let { currentFontSize = FONT_SIZE_NORMAL, onToggle = () => {} } = $props();

  const LABELS = {
    [FONT_SIZE_NORMAL]: 'Normal text size',
    [FONT_SIZE_LARGE]: 'Large text size',
    [FONT_SIZE_X_LARGE]: 'Extra large text size',
  };

  const NEXT_LABELS = {
    [FONT_SIZE_NORMAL]: 'Increase text size to large',
    [FONT_SIZE_LARGE]: 'Increase text size to extra large',
    [FONT_SIZE_X_LARGE]: 'Reset text size to normal',
  };

  const ariaLabel = $derived(NEXT_LABELS[currentFontSize] || 'Change text size');
  const displayLabel = $derived(LABELS[currentFontSize] || 'Normal');
</script>

<button
  class="font-size-toggle"
  onclick={onToggle}
  aria-label={ariaLabel}
  title={ariaLabel}
>
  <span class="font-size-icon" aria-hidden="true">A</span>
  <span class="font-size-label">{displayLabel}</span>
</button>

<style lang="scss">
  .font-size-toggle {
    background: var(--glass-bg-light);
    backdrop-filter: var(--glass-blur-light);
    -webkit-backdrop-filter: var(--glass-blur-light);
    border: 1px solid var(--glass-border-medium);
    border-radius: 20px;
    box-shadow: var(--glass-shadow-default);
    color: var(--color-text);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.75rem;
    position: absolute;
    bottom: 12px;
    right: 64px;
    transform: translateZ(0);
    transition: all var(--transition-duration) ease;

    &:hover {
      background: var(--glass-bg-hover);
      backdrop-filter: var(--glass-blur-hover);
      -webkit-backdrop-filter: var(--glass-blur-hover);
      box-shadow: var(--glass-shadow-default);
    }
  }

  .font-size-icon {
    font-weight: 700;
    font-size: 1rem;
    line-height: 1;
  }

  .font-size-label {
    font-size: 0.7rem;
    white-space: nowrap;
  }
</style>
