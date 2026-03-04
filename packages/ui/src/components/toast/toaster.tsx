'use client';

/**
 * Toaster — 토스트 컨테이너 컴포넌트
 *
 * 역할:
 *   - useSyncExternalStore로 store 구독 (useEffect 불필요)
 *   - createPortal로 document.body에 직접 렌더 (z-index 충돌 / layout 영향 없음)
 *   - position에 따라 화면 위치 결정
 *   - maxToasts 초과분 잘라내기 (오래된 것부터 숨김)
 *
 * 사용법:
 *   앱 최상단에 한 번만 배치한다. Provider 불필요.
 *
 *   <Toaster position="bottom-right" />
 */

import { useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'motion/react';
import { cn } from '../../lib/cn';
import { store } from './store';
import { ToastItem } from './toast-item';
import type { Toast, ToastPosition, ToasterProps } from './types';

/** 포지션 → Tailwind fixed 클래스 맵핑 */
const positionClasses: Record<ToastPosition, string> = {
  'top-left': 'top-4 left-4 items-start',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'top-right': 'top-4 right-4 items-end',
  'bottom-left': 'bottom-4 left-4 items-start',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-4 right-4 items-end',
};

/**
 * document.body SSR 여부 확인용 no-op subscriber.
 * useSyncExternalStore의 server snapshot에서 null을 반환해 SSR 시 portal을 건너뛴다.
 */
const noopSubscribe = () => () => {};

export function Toaster({
  position = 'bottom-right',
  maxToasts = 5,
  defaultDuration = 4000,
}: ToasterProps) {
  // store.subscribe는 (toasts: Toast[]) => void 형태이므로,
  // useSyncExternalStore가 요구하는 () => void 형태로 래핑한다.
  const subscribe = useCallback(
    (onStoreChange: () => void) =>
      store.subscribe(() => onStoreChange()),
    [],
  );

  const toasts = useSyncExternalStore<Toast[]>(
    subscribe,
    store.getToasts,
    () => [], // SSR snapshot: 서버에서는 빈 배열
  );

  // SSR 안전: server에서는 null, client에서만 document.body 반환
  const body = useSyncExternalStore(
    noopSubscribe,
    () => document.body,
    () => null,
  );

  if (!body) return null;

  // 스택 순서:
  //   bottom-* → 최신 토스트가 하단(코너 방향)에 위치 → 배열 끝 N개 사용
  //   top-*    → 최신 토스트가 상단(코너 방향)에 위치 → 배열 뒤집어서 앞 N개 사용
  const isBottom = position.startsWith('bottom');
  const visibleToasts = isBottom
    ? toasts.slice(-maxToasts)
    : [...toasts].reverse().slice(0, maxToasts);

  return createPortal(
    <div
      data-toast-container
      className={cn(
        'fixed z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none',
        // pointer-events-none: 컨테이너 자체는 클릭 통과
        // 각 ToastItem은 내부적으로 pointer-events-auto 적용
        positionClasses[position],
      )}
    >
      <AnimatePresence initial={false}>
        {visibleToasts.map((t) => (
          <ToastItem
            key={t.id}
            toast={t}
            defaultDuration={defaultDuration}
          />
        ))}
      </AnimatePresence>
    </div>,
    body,
  );
}
