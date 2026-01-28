import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  label?: string;
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  'inline-flex items-center justify-center rounded-lg font-semibold ' +
  'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
};

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring shadow-sm',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-ring border border-border',
  ghost:
    'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring',
  danger:
    'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-ring shadow-sm',
};

// className 합치기(외부 라이브러리 없이)
function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export function Button({
  label,
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cx(
        base,
        sizes[size],
        variants[variant],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {children || label}
    </button>
  );
}
