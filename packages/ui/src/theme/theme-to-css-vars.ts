import type { ThemeConfig } from './types';

/**
 * Convert ThemeConfig to CSS variables object
 */
export function themeToCssVars(
  theme: ThemeConfig,
): Record<string, string> {
  const cssVars: Record<string, string> = {};

  // Colors
  if (theme.colors) {
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        cssVars[`--color-${key}`] = value;
      } else if (typeof value === 'object' && value !== null) {
        if ('DEFAULT' in value) {
          cssVars[`--color-${key}`] = value.DEFAULT;
        }
        if ('foreground' in value) {
          cssVars[`--color-${key}-foreground`] = value.foreground;
        }
      }
    });
  }

  // Radius
  if (theme.radius) {
    Object.entries(theme.radius).forEach(([key, value]) => {
      cssVars[`--radius-${key}`] = value;
    });
  }

  // Font sizes
  if (theme.fontSize) {
    Object.entries(theme.fontSize).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const [size, config] = value;
        cssVars[`--text-${key}`] = size;
        if (config.lineHeight) {
          cssVars[`--leading-${key}`] = config.lineHeight;
        }
      } else {
        cssVars[`--text-${key}`] = value;
      }
    });
  }

  // Font families
  if (theme.fontFamily) {
    Object.entries(theme.fontFamily).forEach(([key, value]) => {
      cssVars[`--font-${key}`] = value.join(', ');
    });
  }

  // Font weights
  if (theme.fontWeight) {
    Object.entries(theme.fontWeight).forEach(([key, value]) => {
      cssVars[`--font-weight-${key}`] = value;
    });
  }

  // Shadows
  if (theme.shadows) {
    Object.entries(theme.shadows).forEach(([key, value]) => {
      cssVars[`--shadow-${key}`] = value;
    });
  }

  // Z-index
  if (theme.zIndex) {
    Object.entries(theme.zIndex).forEach(([key, value]) => {
      cssVars[`--z-${key}`] = value.toString();
    });
  }

  // Animation
  if (theme.animation) {
    if (theme.animation.duration) {
      Object.entries(theme.animation.duration).forEach(
        ([key, value]) => {
          cssVars[`--duration-${key}`] = value;
        },
      );
    }
    if (theme.animation.ease) {
      Object.entries(theme.animation.ease).forEach(([key, value]) => {
        cssVars[`--ease-${key}`] = value;
      });
    }
  }

  // Spacing (Tailwind v4 compatible)
  if (theme.spacing) {
    Object.entries(theme.spacing).forEach(([key, value]) => {
      cssVars[`--spacing-${key}`] = value;
    });
  }

  return cssVars;
}

/**
 * Apply CSS variables to an element
 */
export function applyCssVars(
  element: HTMLElement,
  cssVars: Record<string, string>,
): void {
  Object.entries(cssVars).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
}

/**
 * Remove CSS variables from an element
 */
export function removeCssVars(
  element: HTMLElement,
  keys: string[],
): void {
  keys.forEach((key) => {
    element.style.removeProperty(key);
  });
}

/**
 * Format CSS variables object to CSS string
 * Useful for build-time CSS generation
 *
 * @example
 * ```ts
 * const cssVars = themeToCssVars(myTheme);
 * const cssString = formatCssVars(cssVars);
 * console.log(cssString);
 * // Output:
 * //   --color-primary: oklch(0.5 0.2 250);
 * //   --color-primary-foreground: oklch(1 0 0);
 * ```
 */
export function formatCssVars(
  cssVars: Record<string, string>,
): string {
  return Object.entries(cssVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
}

/**
 * Generate CSS variables string from theme config
 * Combines themeToCssVars + formatCssVars for convenience
 *
 * @example
 * ```ts
 * import { defineTheme, generateThemeCss } from '@poodle-kit/ui/theme';
 *
 * const myTheme = defineTheme({ colors: { ... } });
 * const cssString = generateThemeCss(myTheme);
 * console.log(cssString);
 * // Output:
 * //   --color-primary: oklch(0.5 0.2 250);
 * //   --color-primary-foreground: oklch(1 0 0);
 * ```
 */
export function generateThemeCss(theme: ThemeConfig): string {
  const cssVars = themeToCssVars(theme);
  return formatCssVars(cssVars);
}
