// Tailwind CSS
import './tailwind.css';

// Components
export { Button, buttonVariants } from './components/button';

export {
  Select,
  SelectTrigger,
  SelectValue,
  selectTriggerVariants,
  SelectContent,
  selectContentVariants,
  SelectItem,
  SelectItemIndicator,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from './components/select';

export type {
  SelectProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectContentProps,
  SelectItemProps,
  SelectItemIndicatorProps,
  SelectGroupProps,
  SelectLabelProps,
  SelectSeparatorProps,
} from './components/select';
export type { ButtonProps } from './components/button';

export {
  Input,
  inputVariants,
  InputMessage,
} from './components/input';

export type {
  InputProps,
  InputMessageProps,
} from './components/input';

export {
  ImageUploader,
  imageUploaderVariants,
  useImageUploader,
} from './components/image-uploader';

export type {
  ImageUploaderProps,
  ExistingImage,
  NewImageFile,
  UseImageUploaderOptions,
  UseImageUploaderReturn,
  ImageUploaderError,
} from './components/image-uploader';

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
