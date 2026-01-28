export type Theme = 'light' | 'dark' | 'system' | string;

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: {
    DEFAULT: string;
    foreground: string;
  };
  secondary: {
    DEFAULT: string;
    foreground: string;
  };
  muted: {
    DEFAULT: string;
    foreground: string;
  };
  accent: {
    DEFAULT: string;
    foreground: string;
  };
  destructive: {
    DEFAULT: string;
    foreground: string;
  };
  border: string;
  input: string;
  ring: string;
  [key: string]: string | { DEFAULT: string; foreground: string };
}

export interface ThemeConfig {
  colors: ThemeColors;
  spacing?: Record<string, string>;
  radius?: Record<string, string>;
  fontSize?: Record<
    string,
    string | [string, { lineHeight: string; letterSpacing?: string }]
  >;
  fontFamily?: Record<string, string[]>;
  fontWeight?: Record<string, string>;
  shadows?: Record<string, string>;
  zIndex?: Record<string, string>;
  animation?: {
    duration?: Record<string, string>;
    ease?: Record<string, string>;
  };
  [key: string]: unknown;
}

export interface CustomThemeDefinition {
  dark?: boolean;
  cssVars?: Record<string, string>;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  customThemes?: Record<string, CustomThemeDefinition>;
  enableColorSchemeSync?: boolean;
}

export interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export function defineTheme<T extends ThemeConfig>(config: T): T {
  return config;
}
