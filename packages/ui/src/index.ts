// Tailwind CSS
import './tailwind.css';

// Components
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';

// Theme
export { ThemeProvider, useTheme } from './theme';
export type {
  Theme,
  ThemeConfig,
  ThemeColors,
  ThemeProviderProps,
} from './theme';
