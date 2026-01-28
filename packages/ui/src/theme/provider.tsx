import React, { createContext, useEffect, useState } from 'react';
import type {
  Theme,
  ThemeProviderProps,
  ThemeProviderState,
} from './types';

export const ThemeContext = createContext<
  ThemeProviderState | undefined
>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'poodle-ui-theme',
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

    if (customThemes[actualTheme]?.cssVars) {
      Object.entries(customThemes[actualTheme].cssVars!).forEach(
        ([key, value]) => {
          root.style.setProperty(key, value);
        },
      );
    }
  }, [theme, customThemes, enableColorSchemeSync]);

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
