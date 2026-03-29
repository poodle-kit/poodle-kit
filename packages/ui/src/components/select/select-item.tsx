import { forwardRef, useEffect, type ReactNode } from 'react';
import { useListItem, useMergeRefs } from '@floating-ui/react';
import { cn } from '../../lib/cn';
import { CheckIcon } from '../../icons';
import { useSelectContext } from './select';

/* -------------------------------------------------------------------------------------------------
 * SelectItem
 * -----------------------------------------------------------------------------------------------*/

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  /** 트리거에 표시할 텍스트. children이 string이 아닐 때 사용 */
  textValue?: string;
  children: ReactNode;
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  (
    { value, disabled, textValue, children, className, ...props },
    forwardedRef,
  ) => {
    const ctx = useSelectContext('SelectItem');

    const displayLabel =
      textValue ?? (typeof children === 'string' ? children : value);
    const { ref: listItemRef, index } = useListItem({
      label: disabled ? null : displayLabel,
    });
    const ref = useMergeRefs([listItemRef, forwardedRef]);

    const isActive = ctx.activeIndex === index;
    const isSelected = ctx.value === value;

    // 선택된 아이템이 마운트되면 selectedIndex와 selectedLabel을 동기화
    // ctx.value이 변경될 때마다 동기화하는 대신, 아이템이 마운트될 때 한 번만 동기화하여 성능 최적화
    useEffect(() => {
      if (isSelected) {
        ctx.setSelectedIndex(index);
        ctx.setSelectedLabel(displayLabel);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSelected, index, displayLabel]);

    const handleSelect = () => {
      if (disabled) return;
      ctx.onValueChange(value);
      ctx.setSelectedIndex(index);
      ctx.setSelectedLabel(displayLabel);
      ctx.onOpenChange(false);
    };

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled || undefined}
        tabIndex={isActive ? 0 : -1}
        data-highlighted={isActive ? '' : undefined}
        data-selected={isSelected ? '' : undefined}
        data-disabled={disabled ? '' : undefined}
        className={cn(
          'relative flex cursor-default select-none items-center rounded-sm',
          ' py-1.5 pl-8 pr-2 text-sm outline-none',
          'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
          'data-disabled:pointer-events-none data-disabled:opacity-50',
          className,
        )}
        {...ctx.getItemProps({
          ...props,
          onClick: handleSelect,
          onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleSelect();
            }
            props.onKeyDown?.(e);
          },
        })}
      >
        <SelectItemIndicator isSelected={isSelected} />
        {children}
      </div>
    );
  },
);

SelectItem.displayName = 'SelectItem';

/* -------------------------------------------------------------------------------------------------
 * SelectItemIndicator
 * -----------------------------------------------------------------------------------------------*/

export interface SelectItemIndicatorProps {
  isSelected?: boolean;
  className?: string;
}

function SelectItemIndicator({
  isSelected,
  className,
}: SelectItemIndicatorProps) {
  return (
    <span
      className={cn(
        'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
        className,
      )}
    >
      {isSelected && <CheckIcon className="h-4 w-4" />}
    </span>
  );
}

SelectItemIndicator.displayName = 'SelectItemIndicator';

export { SelectItem, SelectItemIndicator };
