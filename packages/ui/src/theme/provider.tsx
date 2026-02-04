import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import type {
  Theme,
  ThemeProviderProps,
  ThemeProviderState,
} from './types';
import { themeToCssVars, applyCssVars } from './theme-to-css-vars';

export const ThemeContext = createContext<
  ThemeProviderState | undefined
>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'poodle-ui-theme',
  config,
  darkConfig,
  customThemes = {},
  enableColorSchemeSync = true,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme;
    }
    try {
      return (
        (localStorage.getItem(storageKey) as Theme) || defaultTheme
      );
    } catch {
      return defaultTheme;
    }
  });

  // Convert theme configs to CSS variables (memoized)
  const lightCssVars = useMemo(
    () => (config ? themeToCssVars(config) : null),
    [config],
  );

  const darkCssVars = useMemo(
    () => (darkConfig ? themeToCssVars(darkConfig) : null),
    [darkConfig],
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(
      'light',
      'dark',
      ...Object.keys(customThemes),
    );

    let actualTheme: string;

    if (theme === 'system') {
      actualTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
    } else {
      actualTheme = theme;
    }

    root.classList.add(actualTheme);

    if (enableColorSchemeSync) {
      const isDark =
        actualTheme === 'dark' || customThemes[actualTheme]?.dark;
      root.style.colorScheme = isDark ? 'dark' : 'light';
    }

    // Apply custom theme config (priority: config > customThemes)
    if (actualTheme === 'light' && lightCssVars) {
      applyCssVars(root, lightCssVars);
    } else if (actualTheme === 'dark' && darkCssVars) {
      applyCssVars(root, darkCssVars);
    } else if (customThemes[actualTheme]?.cssVars) {
      // Legacy support for customThemes
      Object.entries(customThemes[actualTheme].cssVars!).forEach(
        ([key, value]) => {
          root.style.setProperty(key, value);
        },
      );
    }
  }, [
    theme,
    lightCssVars,
    darkCssVars,
    customThemes,
    enableColorSchemeSync,
  ]);

  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );
    const handler = () => {
      setTheme('system');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  const handleSetTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch {
      // localStorage not available
    }
    setTheme(newTheme);
  };

  const value: ThemeProviderState = {
    theme,
    setTheme: handleSetTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
