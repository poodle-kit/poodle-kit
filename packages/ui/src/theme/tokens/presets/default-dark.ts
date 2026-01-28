import { defineTheme } from '../../types';

export const defaultDarkTheme = defineTheme({
  colors: {
    background: 'oklch(0.15 0 0)',
    foreground: 'oklch(0.98 0 0)',

    primary: {
      DEFAULT: 'oklch(0.55 0.16 250)',
      foreground: 'oklch(0.98 0 0)',
    },

    secondary: {
      DEFAULT: 'oklch(0.2 0 0)',
      foreground: 'oklch(0.98 0 0)',
    },

    muted: {
      DEFAULT: 'oklch(0.2 0 0)',
      foreground: 'oklch(0.65 0 0)',
    },

    accent: {
      DEFAULT: 'oklch(0.2 0 0)',
      foreground: 'oklch(0.98 0 0)',
    },

    destructive: {
      DEFAULT: 'oklch(0.55 0.22 25)',
      foreground: 'oklch(0.98 0 0)',
    },

    border: 'oklch(0.27 0 0)',
    input: 'oklch(0.27 0 0)',
    ring: 'oklch(0.55 0.16 250)',
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

export default defaultDarkTheme;
