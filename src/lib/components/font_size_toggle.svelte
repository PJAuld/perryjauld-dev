<!-- Font Size Toggle Component -->
<script>
  import {
    FONT_SIZE_NORMAL,
    FONT_SIZE_LARGE,
    FONT_SIZE_X_LARGE,
  } from '$lib/utils/font_size.js';

  let { currentFontSize = FONT_SIZE_NORMAL, onToggle = () => {} } = $props();

  const LABELS = {
    [FONT_SIZE_NORMAL]: 'Normal text size',
    [FONT_SIZE_LARGE]: 'Large text size',
    [FONT_SIZE_X_LARGE]: 'Extra large text',
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
    border-radius: 50%;
    box-shadow: var(--glass-shadow-default);
    color: var(--color-text);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    padding: 0;
    position: absolute;
    bottom: 12px;
    right: 64px;
    overflow: hidden;
    transform: translateZ(0);
    transition:
      width var(--transition-duration) ease,
      border-radius var(--transition-duration) ease,
      padding var(--transition-duration) ease,
      background var(--transition-duration) ease,
      box-shadow var(--transition-duration) ease;

    &:hover {
      background: var(--glass-bg-hover);
      backdrop-filter: var(--glass-blur-hover);
      -webkit-backdrop-filter: var(--glass-blur-hover);
      box-shadow: var(--glass-shadow-default);
      width: 160px;
      border-radius: 20px;
      padding: 0 0.75rem;
    }

    &:active {
      transform: scale(0.95);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }

  .font-size-icon {
    font-weight: 700;
    font-size: 1rem;
    line-height: 1;
    flex-shrink: 0;
  }

  .font-size-label {
    font-size: 0.7rem;
    white-space: nowrap;
    max-width: 0;
    overflow: hidden;
    opacity: 0;
    margin-left: 0;
    transition:
      max-width var(--transition-duration) ease,
      opacity var(--transition-duration) ease,
      margin-left var(--transition-duration) ease;
  }

  .font-size-toggle:hover .font-size-label {
    max-width: 150px;
    opacity: 1;
    margin-left: 0.4rem;
  }

  @media (max-width: 768px) {
    .font-size-toggle {
      height: 36px;
      width: 36px;
      bottom: 8px;
      right: 56px;

      &:hover {
        width: 160px;
      }
    }

    .font-size-icon {
      font-size: 0.9rem;
    }
  }
</style>
