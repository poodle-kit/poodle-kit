'use client';

/**
 * ToastItem — 개별 토스트 UI 컴포넌트
 *
 * 구조:
 *   [아이콘?] [제목 + 설명?] [닫기버튼?]
 *
 * - icon prop이 있으면 우선 사용, 없으면 type 아이콘으로 대체
 * - description이 있으면 제목 아래에 작은 글씨로 표시
 * - dismissible=true 일 때만 닫기 버튼 노출
 *
 * 애니메이션: CSS @keyframes (motion 의존성 없음)
 *   - 마운트: animate-toast-enter (theme.css에 정의)
 *   - 언마운트: exiting 상태 → animate-toast-exit → 300ms 후 store에서 제거
 *
 * 스타일링: shadcn/sonner rich-colors 방식
 *   - bg-{type}/15 + text-{type} + border-{type}/25
 *   - default는 bg-background 사용
 */

import { useCallback, useEffect, useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/cn';
import { store } from './store';
import type { Toast, ToastType } from './types';

// ─── Type Icons ───────────────────────────────────────────────────────────────

function CheckCircleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function XCircleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

function TriangleAlertIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function InfoCircleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

const typeIcons: Partial<Record<ToastType, React.ReactNode>> = {
  success: <CheckCircleIcon />,
  error: <XCircleIcon />,
  warning: <TriangleAlertIcon />,
  info: <InfoCircleIcon />,
};

// ─── Variants ─────────────────────────────────────────────────────────────────

const toastVariants = cva(
  'flex items-start gap-3 w-full rounded-lg border px-4 py-3.5 shadow-sm text-[13px] font-medium leading-5 pointer-events-auto',
  {
    variants: {
      type: {
        default: 'bg-background text-foreground border-border',
        success: 'bg-success/15 text-success border-success/25',
        error: 'bg-danger/15 text-danger border-danger/25',
        warning: 'bg-warning/15 text-warning border-warning/25',
        info: 'bg-info/15 text-info border-info/25',
      },
    },
    defaultVariants: { type: 'default' },
  },
);

// ─── Component ────────────────────────────────────────────────────────────────

interface ToastItemProps {
  toast: Toast;
  /** Toaster에서 전달하는 기본 duration. toast 개별 duration이 없을 때 사용 */
  defaultDuration: number;
}

export function ToastItem({
  toast,
  defaultDuration,
}: ToastItemProps) {
  const {
    id,
    title,
    description,
    icon,
    type = 'default',
    duration = defaultDuration,
    dismissible,
  } = toast;

  // exiting=true → CSS exit 애니메이션 재생 → 300ms 후 store에서 제거
  const [exiting, setExiting] = useState(false);

  const dismiss = useCallback(() => setExiting(true), []);

  // exit 애니메이션이 끝난 뒤 실제로 store에서 제거
  useEffect(() => {
    if (!exiting) return;
    const timer = setTimeout(() => store.removeToast(id), 300);
    return () => clearTimeout(timer);
  }, [exiting, id]);

  // 자동 소멸 타이머
  // 마운트 시점에 이미 경과한 시간을 빼고 남은 시간만큼만 대기한다.
  // → maxToasts 초과로 숨겨졌다가 다시 보여지는 경우에도 정확히 만료됨
  useEffect(() => {
    if (!duration || duration === Infinity) return;
    const elapsed = Date.now() - toast.createdAt;
    const remaining = Math.max(0, duration - elapsed);
    const timer = setTimeout(dismiss, remaining);
    return () => clearTimeout(timer);
  }, [id, duration, toast.createdAt, dismiss]);

  // 좌측 아이콘: icon prop 우선, 없으면 타입 아이콘
  const leftIcon = icon ?? typeIcons[type as ToastType];

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cn(
        toastVariants({ type: type as ToastType }),
        exiting ? 'animate-toast-exit' : 'animate-toast-enter',
      )}
    >
      {/* 좌측 아이콘 */}
      {leftIcon && <span className="shrink-0 mt-px">{leftIcon}</span>}

      {/* 콘텐츠: 제목 + 설명 */}
      <div className="flex-1 min-w-0">
        <p>{title}</p>
        {description && (
          <p className="text-[12px] font-normal opacity-70 mt-0.5">
            {description}
          </p>
        )}
      </div>

      {/* 닫기 버튼 — dismissible=true 일 때만 표시 */}
      {dismissible && (
        <button
          type="button"
          aria-label="닫기"
          onClick={dismiss}
          className="shrink-0 mt-px opacity-50 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
