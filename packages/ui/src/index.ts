// Tailwind CSS
import './tailwind.css';

// Components (Styled by default)
export {
  StyledButton as Button,
  buttonVariants,
} from './components/button';
export type {
  StyledButtonProps as ButtonProps,
  ButtonProps as HeadlessButtonProps,
} from './components/button';

// Theme
export {
  ThemeProvider,
  useTheme,
  defineTheme,
  generateThemeCss,
  defaultLightTheme,
  defaultDarkTheme,
} from './theme';
export type {
  Theme,
  ThemeConfig,
  ThemeColors,
  ThemeProviderProps,
} from './theme';

// Utils
export { cn } from './lib/cn';
