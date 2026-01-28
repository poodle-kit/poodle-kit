/**
 * Default Theme Tokens
 *
 * This is a reference implementation showing how to define themes.
 * Copy this pattern to your project and customize the values.
 *
 * @example
 * ```tsx
 * // your-app/src/theme/my-theme.ts
 * import { defineTheme } from '@poodle-kit/ui/theme';
 *
 * export const myLightTheme = defineTheme({
 *   colors: {
 *     primary: { DEFAULT: 'oklch(0.5 0.2 250)', foreground: 'oklch(1 0 0)' },
 *     // ... your custom colors
 *   },
 *   radius: { md: '0.5rem' },
 * });
 *
 * export const myDarkTheme = defineTheme({
 *   colors: {
 *     primary: { DEFAULT: 'oklch(0.7 0.2 250)', foreground: 'oklch(0.09 0 0)' },
 *     // ... your custom colors
 *   },
 *   radius: { md: '0.5rem' },
 * });
 * ```
 *
 * Then use in your app:
 * ```tsx
 * import { ThemeProvider } from '@poodle-kit/ui';
 * import { myLightTheme, myDarkTheme } from './theme/my-theme';
 *
 * <ThemeProvider config={myLightTheme} darkConfig={myDarkTheme}>
 *   <App />
 * </ThemeProvider>
 * ```
 */

import { defineTheme } from '../types';

/**
 * Default Light Theme
 * Clean neutral design with black primary color
 */
export const defaultLightTheme = defineTheme({
  colors: {
    background: 'oklch(1 0 0)',
    foreground: 'oklch(0.09 0 0)',

    primary: {
      DEFAULT: 'oklch(0.09 0 0)',
      foreground: 'oklch(0.98 0 0)',
    },

    secondary: {
      DEFAULT: 'oklch(0.96 0 0)',
      foreground: 'oklch(0.09 0 0)',
    },

    muted: {
      DEFAULT: 'oklch(0.96 0 0)',
      foreground: 'oklch(0.45 0 0)',
    },

    accent: {
      DEFAULT: 'oklch(0.96 0 0)',
      foreground: 'oklch(0.09 0 0)',
    },

    destructive: {
      DEFAULT: 'oklch(0.576 0.204 27.325)',
      foreground: 'oklch(0.98 0 0)',
    },

    border: 'oklch(0.90 0 0)',
    input: 'oklch(0.90 0 0)',
    ring: 'oklch(0.09 0 0)',
  },

  radius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
});

/**
 * Default Dark Theme
 * Clean neutral design with white primary color
 */
export const defaultDarkTheme = defineTheme({
  colors: {
    background: 'oklch(0.09 0 0)',
    foreground: 'oklch(0.98 0 0)',

    primary: {
      DEFAULT: 'oklch(0.98 0 0)',
      foreground: 'oklch(0.09 0 0)',
    },

    secondary: {
      DEFAULT: 'oklch(0.17 0 0)',
      foreground: 'oklch(0.98 0 0)',
    },

    muted: {
      DEFAULT: 'oklch(0.17 0 0)',
      foreground: 'oklch(0.65 0 0)',
    },

    accent: {
      DEFAULT: 'oklch(0.17 0 0)',
      foreground: 'oklch(0.98 0 0)',
    },

    destructive: {
      DEFAULT: 'oklch(0.701 0.191 29.234)',
      foreground: 'oklch(0.98 0 0)',
    },

    border: 'oklch(0.27 0 0)',
    input: 'oklch(0.27 0 0)',
    ring: 'oklch(0.98 0 0)',
  },

  radius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
});
