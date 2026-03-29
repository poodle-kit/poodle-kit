import {
  forwardRef,
  useId,
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';

/* -------------------------------------------------------------------------------------------------
 * SelectGroupContext
 * -----------------------------------------------------------------------------------------------*/

const SelectGroupContext = createContext<{ labelId: string } | null>(
  null,
);

function useSelectGroupContext() {
  return useContext(SelectGroupContext);
}

/* -------------------------------------------------------------------------------------------------
 * SelectGroup
 * -----------------------------------------------------------------------------------------------*/

export interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className, children, ...props }, ref) => {
    const labelId = useId();

    return (
      <SelectGroupContext.Provider value={{ labelId }}>
        <div
          ref={ref}
          role="group"
          aria-labelledby={labelId}
          className={cn('py-1', className)}
          {...props}
        >
          {children}
        </div>
      </SelectGroupContext.Provider>
    );
  },
);

SelectGroup.displayName = 'SelectGroup';

/* -------------------------------------------------------------------------------------------------
 * SelectLabel
 * 옵션 그룹의 레이블을 표시하는 컴포넌트입니다.
 * -----------------------------------------------------------------------------------------------*/

export interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, children, ...props }, ref) => {
    const groupCtx = useSelectGroupContext();

    return (
      <div
        ref={ref}
        id={groupCtx?.labelId}
        className={cn(
          'px-2 py-1.5 text-xs font-semibold text-muted-foreground',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

SelectLabel.displayName = 'SelectLabel';

/* -------------------------------------------------------------------------------------------------
 * SelectSeparator
 * - 옵션 그룹 사이에 구분선을 추가하는 컴포넌트입니다.
 * -----------------------------------------------------------------------------------------------*/

export type SelectSeparatorProps =
  React.HTMLAttributes<HTMLDivElement>;

const SelectSeparator = forwardRef<
  HTMLDivElement,
  SelectSeparatorProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    aria-orientation="horizontal"
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));

SelectSeparator.displayName = 'SelectSeparator';

export { SelectGroup, SelectLabel, SelectSeparator };
