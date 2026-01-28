import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  Button as ButtonPrimitive,
  type ButtonProps,
} from './button';
import { cn } from '../../lib/cn';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-[var(--radius-md)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-[var(--radius-md)] px-3',
        lg: 'h-11 rounded-[var(--radius-md)] px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface StyledButtonProps
  extends ButtonProps, VariantProps<typeof buttonVariants> {}

export const StyledButton = forwardRef<
  HTMLButtonElement,
  StyledButtonProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <ButtonPrimitive
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
});

StyledButton.displayName = 'StyledButton';
