import {
  type InputHTMLAttributes,
  forwardRef,
  type ReactNode,
} from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/cn';

/**
 * 상태(state)와 크기(size)에 따른 input 스타일 변형
 *
 * state:
 *   - default: 기본 포커스 링
 *   - error: 빨간 테두리 + 포커스 링
 *   - success: 초록 테두리 + 포커스 링
 */
const inputVariants = cva(
  'flex w-full rounded-[var(--radius-md)] border border-input bg-background text-sm placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-10 px-3 py-2',
        sm: 'h-9 px-2 text-xs',
        lg: 'h-11 px-4',
      },
      state: {
        default: 'focus-visible:ring-ring',
        error: 'border-danger focus-visible:ring-danger',
        success: 'border-success focus-visible:ring-success',
      },
    },
    defaultVariants: {
      size: 'default',
      state: 'default',
    },
  },
);

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  /** input 크기 */
  size?: 'default' | 'sm' | 'lg';
  /** 라벨 텍스트 */
  label?: string;
  /** 에러 상태 — 빨간 테두리, aria-invalid 자동 설정 */
  error?: boolean;
  /** 성공 상태 — 초록 테두리 */
  success?: boolean;
  /** 좌측 아이콘 (ReactNode) */
  leftIcon?: ReactNode;
  /** 우측 아이콘 (ReactNode) */
  rightIcon?: ReactNode;
  /** 좌측 아이콘 클릭 핸들러 — 없으면 아이콘이 클릭 불가 */
  onLeftIconClick?: () => void;
  /** 우측 아이콘 클릭 핸들러 — 없으면 아이콘이 클릭 불가 */
  onRightIconClick?: () => void;
  /** wrapper div에 적용할 className */
  className?: string;
  /** input 요소에만 적용할 className */
  inputClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputClassName,
      size,
      error,
      success,
      label,
      id,
      leftIcon,
      rightIcon,
      onLeftIconClick,
      onRightIconClick,
      required,
      disabled,
      ...props
    },
    ref,
  ) => {
    // error > success > default 우선순위로 state 결정
    const state = error ? 'error' : success ? 'success' : 'default';

    return (
      <div className={cn('flex flex-col gap-1', className)}>
        {/* 라벨 — required이면 * 표시 */}
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'text-sm font-medium',
              disabled && 'opacity-50',
            )}
          >
            {label}
            {required && (
              <span className="ml-1 text-danger" aria-label="필수">
                *
              </span>
            )}
          </label>
        )}

        {/* input + 아이콘을 감싸는 relative 컨테이너 */}
        <div className="relative">
          {/* 좌측 아이콘 — onLeftIconClick 없으면 pointer-events-none */}
          {leftIcon && (
            <button
              type="button"
              disabled={disabled || !onLeftIconClick}
              aria-label="left icon"
              className={cn(
                'absolute left-3 top-1/2 z-10 -translate-y-1/2',
                onLeftIconClick && !disabled
                  ? 'cursor-pointer'
                  : 'pointer-events-none cursor-default',
                disabled && 'opacity-50',
              )}
              onClick={() => !disabled && onLeftIconClick?.()}
            >
              {leftIcon}
            </button>
          )}

          <input
            id={id}
            ref={ref}
            required={required}
            disabled={disabled}
            // error 상태일 때 스크린리더가 invalid 필드로 인식
            aria-invalid={error || undefined}
            className={cn(
              inputVariants({ size, state }),
              // 아이콘이 있을 때 텍스트가 아이콘에 가리지 않도록 패딩 추가
              leftIcon && 'pl-9',
              rightIcon && 'pr-9',
              inputClassName,
            )}
            {...props}
          />

          {/* 우측 아이콘 — onRightIconClick 없으면 pointer-events-none */}
          {rightIcon && (
            <button
              type="button"
              disabled={disabled || !onRightIconClick}
              aria-label="right icon"
              className={cn(
                'absolute right-3 top-1/2 z-10 -translate-y-1/2',
                onRightIconClick && !disabled
                  ? 'cursor-pointer'
                  : 'pointer-events-none cursor-default',
                disabled && 'opacity-50',
              )}
              onClick={() => !disabled && onRightIconClick?.()}
            >
              {rightIcon}
            </button>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input, inputVariants };
