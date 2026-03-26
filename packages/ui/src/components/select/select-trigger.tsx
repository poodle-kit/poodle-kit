import { forwardRef, type ReactNode } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';
import { useSelectContext } from './select';

/* -------------------------------------------------------------------------------------------------
 * SelectTrigger
 * -----------------------------------------------------------------------------------------------*/

const selectTriggerVariants = cva(
  [
    'flex h-10 w-full items-center justify-between gap-2 rounded-[var(--radius-md)]',
    'border border-input bg-background px-3 py-2 text-sm',
    'ring-offset-background transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=open]:ring-2 data-[state=open]:ring-ring data-[state=open]:ring-offset-2',
  ],
  {
    variants: {},
    defaultVariants: {},
  },
);

export interface SelectTriggerProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof selectTriggerVariants> {}

const SelectTrigger = forwardRef<
  HTMLButtonElement,
  SelectTriggerProps
>(({ className, children, ...props }, forwardedRef) => {
  const ctx = useSelectContext('SelectTrigger');
  const ref = useMergeRefs([ctx.refs.setReference, forwardedRef]);

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      disabled={ctx.disabled}
      data-state={ctx.open ? 'open' : 'closed'}
      className={cn(selectTriggerVariants({ className }))}
      {...ctx.getReferenceProps(props as React.HTMLProps<Element>)}
    >
      {children}
      <ChevronDownIcon
        className={cn(
          'h-4 w-4 shrink-0 opacity-50 transition-transform duration-200',
          {
            'rotate-180': ctx.open,
          },
        )}
      />
    </button>
  );
});

SelectTrigger.displayName = 'SelectTrigger';

/* -------------------------------------------------------------------------------------------------
 * SelectValue
 * -----------------------------------------------------------------------------------------------*/

export interface SelectValueProps {
  placeholder?: string;
  children?: ReactNode;
  className?: string;
}

function SelectValue({
  placeholder,
  children,
  className,
}: SelectValueProps) {
  const ctx = useSelectContext('SelectValue');

  const display =
    children ??
    ctx.selectedLabel ??
    (ctx.value !== undefined ? ctx.value : undefined);

  return (
    <span
      className={cn(
        'pointer-events-none flex-1 truncate text-left',
        className,
      )}
    >
      {display !== undefined ? (
        display
      ) : (
        <span className="text-muted-foreground">{placeholder}</span>
      )}
    </span>
  );
}

SelectValue.displayName = 'SelectValue';

/* -------------------------------------------------------------------------------------------------
 * ChevronDownIcon (inline SVG — no lucide-react dependency)
 * -----------------------------------------------------------------------------------------------*/

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export { SelectTrigger, SelectValue, selectTriggerVariants };
