/**
 * CSS custom-property contract for the crfrsr Design System.
 *
 * This is the single source of truth for the `--crfrsr-*` variables that the
 * shipped component CSS reads. `ThemeProvider` applies these at runtime for the
 * active mode; the static defaults in `tokens.css` mirror the light/dark output
 * of this function (keep them in sync when the palette changes).
 */

import { ColorMode } from './colors';
import { createTheme } from './theme';

export function getCssVariables(mode: ColorMode = 'light'): Record<string, string> {
  const theme = createTheme(mode);
  const c = theme.colors;
  const t = theme.typography;

  return {
    // Colors
    '--crfrsr-color-primary': c.primary,
    '--crfrsr-color-primary-light': c.primaryLight,
    '--crfrsr-color-primary-dark': c.primaryDark,
    '--crfrsr-color-text-on-primary': c.textOnPrimary,
    '--crfrsr-color-secondary': c.secondary,
    '--crfrsr-color-secondary-light': c.secondaryLight,
    '--crfrsr-color-secondary-dark': c.secondaryDark,
    '--crfrsr-color-success': c.success,
    '--crfrsr-color-warning': c.warning,
    '--crfrsr-color-error': c.error,
    '--crfrsr-color-info': c.info,
    '--crfrsr-color-background': c.background,
    '--crfrsr-color-surface': c.surface,
    '--crfrsr-color-surface-hover': c.surfaceHover,
    '--crfrsr-color-text': c.text,
    '--crfrsr-color-text-secondary': c.textSecondary,
    '--crfrsr-color-text-disabled': c.textDisabled,
    '--crfrsr-color-border': c.border,
    '--crfrsr-color-divider': c.divider,
    '--crfrsr-color-focus-ring': c.focusRing,
    '--crfrsr-color-overlay': c.overlay,

    // Typography
    '--crfrsr-font-family-base': t.fontFamily.base,
    '--crfrsr-font-family-mono': t.fontFamily.mono,
    '--crfrsr-font-size-xs': t.fontSize.xs,
    '--crfrsr-font-size-sm': t.fontSize.sm,
    '--crfrsr-font-size-base': t.fontSize.base,
    '--crfrsr-font-size-lg': t.fontSize.lg,
    '--crfrsr-font-size-xl': t.fontSize.xl,
    '--crfrsr-font-size-2xl': t.fontSize['2xl'],
    '--crfrsr-font-size-3xl': t.fontSize['3xl'],
    '--crfrsr-font-size-4xl': t.fontSize['4xl'],
    '--crfrsr-font-weight-normal': String(t.fontWeight.normal),
    '--crfrsr-font-weight-medium': String(t.fontWeight.medium),
    '--crfrsr-font-weight-semibold': String(t.fontWeight.semibold),
    '--crfrsr-font-weight-bold': String(t.fontWeight.bold),
    '--crfrsr-line-height-tight': String(t.lineHeight.tight),
    '--crfrsr-line-height-normal': String(t.lineHeight.normal),
    '--crfrsr-line-height-relaxed': String(t.lineHeight.relaxed),

    // Radius
    '--crfrsr-radius-sm': theme.radius.sm,
    '--crfrsr-radius-md': theme.radius.md,
    '--crfrsr-radius-lg': theme.radius.lg,
    '--crfrsr-radius-full': theme.radius.full,

    // Spacing (numeric tokens are emitted as px)
    '--crfrsr-spacing-xs': `${theme.spacing.xs}px`,
    '--crfrsr-spacing-sm': `${theme.spacing.sm}px`,
    '--crfrsr-spacing-md': `${theme.spacing.md}px`,
    '--crfrsr-spacing-lg': `${theme.spacing.lg}px`,
    '--crfrsr-spacing-xl': `${theme.spacing.xl}px`,
    '--crfrsr-spacing-2xl': `${theme.spacing['2xl']}px`,

    // Shadow
    '--crfrsr-shadow-sm': theme.shadow.sm,
    '--crfrsr-shadow-md': theme.shadow.md,
  };
}
