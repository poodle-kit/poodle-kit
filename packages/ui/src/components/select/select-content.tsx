import { forwardRef, type ReactNode } from 'react';
import {
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  useMergeRefs,
} from '@floating-ui/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';
import { useSelectContext } from './select';

/* -------------------------------------------------------------------------------------------------
 * SelectContent
 * -----------------------------------------------------------------------------------------------*/

const selectContentVariants = cva(
  [
    'z-50 min-w-32 overflow-hidden rounded-[var(--radius-md)]',
    'border border-input bg-background text-foreground shadow-md',
    'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  ],
  {
    variants: {},
    defaultVariants: {},
  },
);

export interface SelectContentProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof selectContentVariants> {
  children: ReactNode;
  container?: HTMLElement | null;
}

const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, container, ...props }, forwardedRef) => {
    const ctx = useSelectContext('SelectContent');
    const ref = useMergeRefs([ctx.refs.setFloating, forwardedRef]);

    if (!ctx.open) return null;

    return (
      <FloatingPortal root={container}>
        <FloatingFocusManager context={ctx.context} modal={false}>
          <div
            ref={ref}
            data-state={ctx.open ? 'open' : 'closed'}
            className={cn(selectContentVariants({ className }))}
            style={ctx.floatingStyles}
            {...ctx.getFloatingProps(props)}
          >
            <FloatingList
              elementsRef={ctx.listRef}
              labelsRef={ctx.listContentRef}
            >
              <div className="p-1">{children}</div>
            </FloatingList>
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    );
  },
);

SelectContent.displayName = 'SelectContent';

export { SelectContent, selectContentVariants };
