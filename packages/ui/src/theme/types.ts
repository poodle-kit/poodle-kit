export type Theme = 'light' | 'dark' | 'system' | string;

export type ColorValue =
  | string
  | {
      DEFAULT: string;
      foreground: string;
    };

export interface ThemeColors {
  // Page & Container colors
  background?: ColorValue;
  foreground?: ColorValue;
  muted?: ColorValue;
  accent?: ColorValue;
  card?: ColorValue;
  popover?: ColorValue;

  // Brand & Action colors
  primary?: ColorValue;
  secondary?: ColorValue;

  // Semantic colors
  info?: ColorValue;
  danger?: ColorValue;
  warning?: ColorValue;
  success?: ColorValue;
  destructive?: ColorValue;

  // Border & Input colors
  border?: ColorValue;
  input?: ColorValue;
  ring?: ColorValue;

  // Custom colors
  [key: string]: ColorValue | undefined;
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
  /** Custom theme configuration for light mode */
  config?: ThemeConfig;
  /** Custom theme configuration for dark mode */
  darkConfig?: ThemeConfig;
  /** Legacy: Custom theme definitions (deprecated, use config instead) */
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
