/**
 * toast() 공개 API
 *
 * store.addToast()의 편의 래퍼.
 * 함수이면서 동시에 메서드를 가지는 구조:
 *
 *   toast("제목")                                        — default 타입
 *   toast("제목", { description: "설명" })
 *   toast.success("저장됨")
 *   toast.error("오류", { description: "...", dismissible: true })
 *   toast.warning("주의")
 *   toast.info("안내")
 *   toast.dismiss(id)                                    — 수동 제거
 *
 * 반환값: 생성된 toast의 id (dismiss에 활용 가능)
 */

import { store } from './store';
import type { ToastOptions } from './types';

function createToast(
  title: string,
  options: ToastOptions = {},
): string {
  const id = crypto.randomUUID();
  store.addToast({ id, title, createdAt: Date.now(), ...options });
  return id;
}

function toastFn(title: string, options?: ToastOptions): string {
  return createToast(title, options);
}

toastFn.success = (
  title: string,
  options?: Omit<ToastOptions, 'type'>,
): string => createToast(title, { ...options, type: 'success' });

toastFn.error = (
  title: string,
  options?: Omit<ToastOptions, 'type'>,
): string => createToast(title, { ...options, type: 'error' });

toastFn.warning = (
  title: string,
  options?: Omit<ToastOptions, 'type'>,
): string => createToast(title, { ...options, type: 'warning' });

toastFn.info = (
  title: string,
  options?: Omit<ToastOptions, 'type'>,
): string => createToast(title, { ...options, type: 'info' });

/** id로 특정 토스트를 즉시 제거 */
toastFn.dismiss = (id: string): void => store.removeToast(id);

export const toast = toastFn;
