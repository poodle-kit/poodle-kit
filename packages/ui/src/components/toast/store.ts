/**
 * Toast 전역 store
 *
 * React Context 없이 모듈 레벨 변수로 상태를 관리한다.
 * 앱 전체에서 하나의 인스턴스를 공유하므로 Provider 없이 어디서든 toast() 호출 가능.
 *
 * 구조:
 *   toasts[]      — 현재 표시 중인 토스트 목록
 *   listeners[]   — 상태 변경 시 호출할 구독자 목록 (Toaster가 등록)
 *
 * 흐름:
 *   addToast / removeToast → emit() → listeners 호출 → Toaster 리렌더
 */

import type { Toast } from './types';

// React 트리 외부의 모듈 레벨 변수 — 앱 전체 공유
let toasts: Toast[] = [];
let listeners: Array<(toasts: Toast[]) => void> = [];

/** 현재 toasts 스냅샷을 모든 구독자에게 전달 */
function emit() {
  const snapshot = [...toasts];
  listeners.forEach((l) => l(snapshot));
}

export const store = {
  /** 토스트 추가 후 구독자에게 알림 */
  addToast(toast: Toast): void {
    toasts = [...toasts, toast];
    emit();
  },

  /** id로 토스트 제거 후 구독자에게 알림 */
  removeToast(id: string): void {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  },

  /**
   * 구독 등록. 반환값(언구독 함수)을 useEffect cleanup에서 호출해야 한다.
   *
   * @example
   * useEffect(() => {
   *   return store.subscribe(setToasts); // 반환값이 cleanup
   * }, []);
   */
  subscribe(listener: (toasts: Toast[]) => void): () => void {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  /** 현재 toasts 복사본 반환 (useState 초기값용) */
  getToasts(): Toast[] {
    return [...toasts];
  },
};
